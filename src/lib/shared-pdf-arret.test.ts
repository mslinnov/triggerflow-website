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

/** La promesse, ou un échec si elle ne se règle pas dans le délai. */
async function within<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([promise, new Promise<never>((_, reject) => (timer = setTimeout(() => reject(new Error(`pas réglée en ${ms} ms`)), ms)))]);
  } finally {
    clearTimeout(timer);
  }
}

test('relais d’un PDF : SIGTERM coupe les relais en cours, les appels au backend et les écritures du fichier, sans quitter à la place de Next', async () => {
  // Next écoute SIGTERM sous next start et quitte une fois ses réponses closes : un écouteur le remplace ici.
  const next = () => undefined;
  process.on('SIGTERM', next);
  const errors: string[] = [];
  const consoleError = console.error;
  console.error = (...args: unknown[]) => void errors.push(args.map(String).join(' '));
  try {
    const signals: AbortSignal[] = [];
    let fileStarted = false;
    const answers: Array<(signal: AbortSignal) => Promise<Response> | Response> = [
      // Encore en appel au backend : comme fetch, l'appel ne finit qu'annulé.
      (signal) =>
        new Promise<Response>((_, reject) => signal.addEventListener('abort', () => reject(new DOMException('annulé', 'AbortError')), { once: true })),
      // Fichier en cours d'écriture : le backend n'a envoyé que le début, et n'enverra rien d'autre.
      () =>
        pdf(
          new ReadableStream<Uint8Array>({
            start(controller) {
              controller.enqueue(PDF_BYTES.slice(0, 3));
              fileStarted = true;
            },
          })
        ),
      // Déjà en lecture par son lecteur.
      () => pdf(),
    ];
    let calls = 0;
    const fetch = (async (_url: string, init: RequestInit) => {
      signals.push(init.signal!);
      return answers[calls++](init.signal!);
    }) as unknown as typeof globalThis.fetch;
    const gate = new RelayGate(10);
    // Délais de 5 s : passé 1 s, seul l'arrêt a pu finir l'appel et l'écriture.
    const config: RelayConfig = {
      apiUrl: 'https://api.trigger-flow.test',
      secret: 's3cret',
      fetch,
      gate,
      limiter: new SlidingWindowLimiter(1_000, 60_000),
      timeoutMs: 5_000,
      bodyTimeoutMs: 5_000,
    };
    const listeners = process.listenerCount('SIGTERM');

    const enAppel = relaySharedPdf('presentation', 'k7m2', reader(), config);
    await waitFor(() => calls === 1);
    // Premier relais du processus, pas encore servi : l'arrêt est déjà écouté.
    assert.equal(process.listenerCount('SIGTERM'), listeners + 1);
    const enEcriture = relaySharedPdf('presentation', 'k7m2', reader(), config);
    await waitFor(() => fileStarted);
    const enLecture = await relaySharedPdf('presentation', 'k7m2', reader(), config);
    assert.equal(gate.size, 3);

    process.emit('SIGTERM');

    await assert.rejects(enLecture.arrayBuffer());
    // L'appel et l'écriture sont coupés aussitôt : l'arrêt n'attend ni le backend ni la fin du fichier.
    assert.equal((await within(enAppel, 1_000)).status, 503);
    assert.equal((await within(enEcriture, 1_000)).status, 503);
    assert.ok(signals[0].aborted && signals[1].aborted);
    assert.equal(gate.size, 0);
    // Coupés par l'arrêt, pas par une panne : rien dans les journaux.
    assert.deepEqual(errors, []);

    // Un nouveau lecteur : « réessayez », sans rien demander au backend.
    assert.equal((await relaySharedPdf('presentation', 'k7m2', reader(), config)).status, 503);
    assert.equal(calls, 3);
  } finally {
    console.error = consoleError;
    process.off('SIGTERM', next);
  }
});
