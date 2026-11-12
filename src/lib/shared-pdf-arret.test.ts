import assert from 'node:assert/strict';
import { test } from 'node:test';
import { SlidingWindowLimiter } from './calendrier-rappel';
import { RelayGate, relaySharedPdf, type RelayConfig } from './shared-pdf';

/*
 * Arrêt du site, à part : après SIGTERM, le drapeau d'arrêt reste posé pour tout le processus.
 * Chaque fichier de test tourne dans le sien, les autres tests du relais (shared-pdf.test.ts)
 * n'en héritent pas.
 */

const PDF_BYTES = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34]); // %PDF-1.4

const reader = () => new Request('https://www.trigger-flow.com/api/doc/presentation/k7m2', { headers: { 'x-forwarded-for': '203.0.113.9' } });

const pdf = (body: BodyInit = PDF_BYTES) => new Response(body, { status: 200, headers: { 'Content-Type': 'application/pdf' } });

async function waitFor(condition: () => boolean): Promise<void> {
  for (let i = 0; i < 400 && !condition(); i++) await new Promise((resolve) => setTimeout(resolve, 5));
  assert.ok(condition(), 'attente dépassée');
}

test('relais d’un PDF : SIGTERM coupe les relais en cours, ceux encore en appel au backend ou en écriture ne commencent pas, sans quitter à la place de Next', async () => {
  // Next écoute SIGTERM sous next start et quitte une fois ses réponses closes : un écouteur le remplace ici.
  const next = () => undefined;
  process.on('SIGTERM', next);
  try {
    let answerBackend: ((response: Response) => void) | undefined;
    let endFile: (() => void) | undefined;
    const answers: Array<() => Promise<Response> | Response> = [
      // Encore en appel au backend.
      () => new Promise<Response>((resolve) => (answerBackend = resolve)),
      // Fichier en cours d'écriture : le backend n'a envoyé que le début.
      () =>
        pdf(
          new ReadableStream<Uint8Array>({
            start(controller) {
              controller.enqueue(PDF_BYTES.slice(0, 3));
              endFile = () => {
                controller.enqueue(PDF_BYTES.slice(3));
                controller.close();
              };
            },
          })
        ),
      // Déjà en lecture par son lecteur.
      () => pdf(),
    ];
    let calls = 0;
    const fetch = (async () => answers[calls++]()) as unknown as typeof globalThis.fetch;
    const gate = new RelayGate(10);
    const config: RelayConfig = { apiUrl: 'https://api.trigger-flow.test', secret: 's3cret', fetch, gate, limiter: new SlidingWindowLimiter(1_000, 60_000) };
    const listeners = process.listenerCount('SIGTERM');

    const enAppel = relaySharedPdf('presentation', 'k7m2', reader(), config);
    await waitFor(() => answerBackend !== undefined);
    // Premier relais du processus, pas encore servi : l'arrêt est déjà écouté.
    assert.equal(process.listenerCount('SIGTERM'), listeners + 1);
    const enEcriture = relaySharedPdf('presentation', 'k7m2', reader(), config);
    await waitFor(() => endFile !== undefined);
    const enLecture = await relaySharedPdf('presentation', 'k7m2', reader(), config);
    assert.equal(gate.size, 3);

    process.emit('SIGTERM');

    await assert.rejects(enLecture.arrayBuffer());
    // Les deux autres finissent leur appel, puis rendent leur place sans commencer : un relais
    // commencé après SIGTERM tiendrait le redémarrage jusqu'à ce que systemd tue le site.
    answerBackend!(pdf());
    endFile!();
    assert.equal((await enAppel).status, 503);
    assert.equal((await enEcriture).status, 503);
    assert.equal(gate.size, 0);

    // Un nouveau lecteur : « réessayez », sans rien demander au backend.
    assert.equal((await relaySharedPdf('presentation', 'k7m2', reader(), config)).status, 503);
    assert.equal(calls, 3);
  } finally {
    process.off('SIGTERM', next);
  }
});
