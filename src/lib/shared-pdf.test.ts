import assert from 'node:assert/strict';
import { mkdtemp, open, readdir, rm, type FileHandle } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { setFlagsFromString } from 'node:v8';
import { runInNewContext } from 'node:vm';
import { HEAD } from '../app/api/doc/[document]/[slug]/route';
import { failurePage, RelayGate, relayConfigFromEnv, relaySharedPdf, type RelayConfig } from './shared-pdf';

type Call = { url: string; init: RequestInit };

function backend(answer: (call: Call) => Promise<Response> | Response) {
  const calls: Call[] = [];
  const fetch = (async (url: string, init: RequestInit) => {
    const call = { url, init };
    calls.push(call);
    return answer(call);
  }) as unknown as typeof globalThis.fetch;

  // Une porte par test : les corps laissés non lus d'un test ne prennent pas les places des autres.
  return { calls, config: { apiUrl: 'https://api.trigger-flow.test', secret: 's3cret', fetch, gate: new RelayGate(10) } satisfies RelayConfig };
}

const PDF_BYTES = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34]); // %PDF-1.4

const reader = (headers: Record<string, string> = {}) =>
  new Request('https://www.trigger-flow.com/api/doc/presentation/k7m2', {
    headers: {
      'user-agent': 'Mozilla/5.0 (Macintosh)',
      referer: 'https://mail.google.com/',
      'x-forwarded-for': '6.6.6.6, 203.0.113.9',
      ...headers,
    },
  });

const pdfResponse = (headers: Record<string, string> = {}) =>
  new Response(PDF_BYTES, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=presentation.pdf; filename*=utf-8\'\'Pr%C3%A9sentation.pdf',
      'Content-Length': String(PDF_BYTES.length),
      'Set-Cookie': 'laravel_session=abc',
      Server: 'Apache',
      ...headers,
    },
  });

test('relais d’un PDF : demande au backend avec le secret et l’adresse constatée par Apache, sans la langue', async () => {
  const { calls, config } = backend(() => pdfResponse());

  await relaySharedPdf('presentation', 'k7m2', reader(), config);

  assert.equal(calls.length, 1);
  const [{ url, init }] = calls;
  assert.equal(url, 'https://api.trigger-flow.test/api/public-shared-document');
  assert.equal(init.method, 'POST');
  const headers = init.headers as Record<string, string>;
  assert.equal(headers['X-TF-Doc-Secret'], 's3cret');
  // Le DERNIER membre : le premier est ce que le lecteur a écrit lui-même.
  assert.equal(headers['X-TF-Visitor-Ip'], '203.0.113.9');
  assert.deepEqual(JSON.parse(String(init.body)), {
    document: 'presentation',
    slug: 'k7m2',
    referer: 'https://mail.google.com/',
    user_agent: 'Mozilla/5.0 (Macintosh)',
  });
});

test('relais d’un PDF : adresse du lecteur inconnue, l’en-tête est omis plutôt que posé vide', async () => {
  const { calls, config } = backend(() => pdfResponse());

  await relaySharedPdf('presentation', 'k7m2', reader({ 'x-forwarded-for': 'pas-une-ip' }), config);

  assert.equal('X-TF-Visitor-Ip' in (calls[0].init.headers as Record<string, string>), false);
});

test('relais d’un PDF : le fichier passe tel quel, ouvert dans le navigateur, jamais gardé en cache, rien du backend ne fuit', async () => {
  const { config } = backend(() => pdfResponse());

  const response = await relaySharedPdf('presentation', 'k7m2', reader(), config);

  assert.equal(response.status, 200);
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), PDF_BYTES);
  assert.equal(response.headers.get('content-type'), 'application/pdf');
  assert.equal(response.headers.get('content-disposition'), "inline; filename*=utf-8''Pr%C3%A9sentation.pdf");
  assert.equal(response.headers.get('content-length'), String(PDF_BYTES.length));
  assert.equal(response.headers.get('cache-control'), 'private, no-store');
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow, noarchive, nosnippet');
  assert.equal(response.headers.get('set-cookie'), null);
  assert.equal(response.headers.get('server'), null);
});

test('relais d’un PDF : une demande de téléchargement du backend devient une ouverture dans le navigateur', async () => {
  const { config } = backend(() => pdfResponse({ 'Content-Disposition': 'attachment; filename=tarifs.pdf' }));

  const response = await relaySharedPdf('tarifs', 'k7m2', reader(), config);

  assert.equal(response.headers.get('content-disposition'), "inline; filename*=UTF-8''tarifs.pdf");
});

test('relais d’un PDF : un « ; » ou des guillemets dans le libellé ne cassent pas le nom du fichier', async () => {
  for (const [upstream, expected] of [
    // Laravel : nom simple entre guillemets, puis nom encodé. Seul l'encodé passe.
    [`inline; filename="Offre ; groupes 2027.pdf"; filename*=utf-8''Offre%20%3B%20groupes%202027.pdf`, "inline; filename*=utf-8''Offre%20%3B%20groupes%202027.pdf"],
    // Nom simple seul : réencodé.
    ['attachment; filename="Offre ; \\"VIP\\" (2027).pdf"', "inline; filename*=UTF-8''Offre%20%3B%20%22VIP%22%20%282027%29.pdf"],
    // Nom encodé mal formé : ignoré, le nom simple prend le relais.
    [`inline; filename="tarifs.pdf"; filename*=utf-8''bad"value`, "inline; filename*=UTF-8''tarifs.pdf"],
  ]) {
    const { config } = backend(() => pdfResponse({ 'Content-Disposition': upstream }));
    const response = await relaySharedPdf('tarifs', 'k7m2', reader(), config);

    assert.equal(response.headers.get('content-disposition'), expected, upstream);
  }
});

/** Un corps de backend instrumenté : lu jusqu'au bout ? annulé ? */
function trackedBody(chunks: Uint8Array[], { end = true } = {}) {
  const state = { fullyRead: false, cancelled: false };
  let index = 0;
  const stream = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (index < chunks.length) {
        controller.enqueue(chunks[index]);
        index += 1;
        return;
      }
      if (!end) return new Promise<void>(() => {});
      state.fullyRead = true;
      controller.close();
    },
    cancel() {
      state.cancelled = true;
    },
  });
  return { stream, state };
}

test('relais d’un PDF : le fichier est lu en entier avant de répondre, le backend est libéré tout de suite', async () => {
  const { stream, state } = trackedBody([PDF_BYTES.slice(0, 3), PDF_BYTES.slice(3)]);
  const { config } = backend(() => new Response(stream, { status: 200, headers: { 'Content-Type': 'application/pdf' } }));

  const response = await relaySharedPdf('presentation', 'k7m2', reader(), config);

  // Déjà lu au retour : le lecteur, lent ou pas, ne tient plus rien côté PHP.
  assert.equal(state.fullyRead, true);
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), PDF_BYTES);
  assert.equal(response.headers.get('content-length'), String(PDF_BYTES.length));
});

test('relais d’un PDF : plus lourd que la limite d’envoi, rien n’est relayé et le backend est coupé', async () => {
  // Annoncé trop lourd : refusé sans rien lire.
  const annonce = trackedBody([PDF_BYTES]);
  const { config: avecTaille } = backend(
    () => new Response(annonce.stream, { status: 200, headers: { 'Content-Type': 'application/pdf', 'Content-Length': '8' } })
  );
  assert.equal((await relaySharedPdf('presentation', 'k7m2', reader(), { ...avecTaille, maxBytes: 4 })).status, 503);
  assert.equal(annonce.state.cancelled, true);

  // Taille non annoncée, flux sans fin : la lecture s'arrête au dépassement.
  const flux = trackedBody([PDF_BYTES.slice(0, 3), PDF_BYTES.slice(3)], { end: false });
  const { config: sansTaille } = backend(() => new Response(flux.stream, { status: 200, headers: { 'Content-Type': 'application/pdf' } }));
  assert.equal((await relaySharedPdf('presentation', 'k7m2', reader(), { ...sansTaille, maxBytes: 4 })).status, 503);
  assert.equal(flux.state.cancelled, true);
  assert.equal(flux.state.fullyRead, false);
});

test('relais d’un PDF : un fichier qui n’arrive pas au bout est abandonné au bout du délai', async () => {
  const { stream, state } = trackedBody([PDF_BYTES.slice(0, 3)], { end: false });
  const { config } = backend(() => new Response(stream, { status: 200, headers: { 'Content-Type': 'application/pdf' } }));

  const started = Date.now();
  const response = await relaySharedPdf('presentation', 'k7m2', reader(), { ...config, bodyTimeoutMs: 30 });

  assert.equal(response.status, 503);
  assert.equal(state.cancelled, true);
  assert.ok(Date.now() - started < 2000);
});

test('relais d’un PDF : au-delà du plafond de relais simultanés, « réessayez » sans rien demander au backend', async () => {
  const gate = new RelayGate(2);
  const { calls, config } = backend(() => pdfResponse());
  const relay = () => relaySharedPdf('presentation', 'k7m2', reader(), { ...config, gate });

  const premier = await relay();
  const second = await relay();
  assert.equal(gate.size, 2);

  const refuse = await relay();
  assert.equal(refuse.status, 503);
  assert.equal(refuse.headers.get('retry-after'), '120');
  // Le lecteur refusé n'a pas été compté : le backend n'a rien reçu.
  assert.equal(calls.length, 2);

  // Un téléchargement terminé rend sa place.
  await premier.arrayBuffer();
  assert.equal(gate.size, 1);
  const suivant = await relay();
  assert.equal(suivant.status, 200);
  assert.equal(calls.length, 3);

  // Un téléchargement abandonné aussi.
  await second.body?.cancel();
  await suivant.arrayBuffer();
  assert.equal(gate.size, 0);
});

test('relais d’un PDF : un même visiteur ne prend pas toutes les places, les autres lecteurs passent', async () => {
  const gate = new RelayGate(10, 2);
  const { calls, config } = backend(() => pdfResponse());
  const relay = (ip: string) => relaySharedPdf('presentation', 'k7m2', reader({ 'x-forwarded-for': ip }), { ...config, gate });

  const ouverts = [await relay('203.0.113.9'), await relay('203.0.113.9')];
  const refuse = await relay('203.0.113.9');
  assert.equal(refuse.status, 503);
  assert.equal(calls.length, 2);

  // Un autre lecteur n'est pas puni pour lui.
  const autre = await relay('198.51.100.7');
  assert.equal(autre.status, 200);

  // Une place rendue lui revient.
  await ouverts[0].arrayBuffer();
  assert.equal((await relay('203.0.113.9')).status, 200);
});

test('relais d’un PDF : un refus du backend rend sa place tout de suite', async () => {
  const gate = new RelayGate(1);
  const { config } = backend(() => new Response('{}', { status: 404, headers: { 'Content-Type': 'application/json' } }));

  assert.equal((await relaySharedPdf('presentation', 'k7m2', reader(), { ...config, gate })).status, 404);
  assert.equal(gate.size, 0);
});

test('relais d’un PDF : le fichier attend sur le disque, relu par blocs, quelle que soit la lenteur du lecteur', async () => {
  const lourd = new Uint8Array(1024 * 1024).map((_, i) => i % 251);
  const { config } = backend(() => new Response(lourd, { status: 200, headers: { 'Content-Type': 'application/pdf' } }));

  const response = await relaySharedPdf('presentation', 'k7m2', reader(), config);
  const blocs: Uint8Array[] = [];
  const lecture = response.body!.getReader();
  for (let r = await lecture.read(); !r.done; r = await lecture.read()) blocs.push(r.value);

  // Jamais le fichier entier d'un coup : un lecteur lent ne retient qu'un bloc en mémoire.
  assert.ok(Math.max(...blocs.map((b) => b.byteLength)) <= 64 * 1024);
  assert.deepEqual(Buffer.concat(blocs), Buffer.from(lourd));
  assert.equal(response.headers.get('content-length'), String(lourd.length));
});

test('relais d’un PDF : le fichier temporaire ne reste jamais sur le disque, ni pendant, ni après, ni sur un refus', async () => {
  const dossier = await mkdtemp(join(tmpdir(), 'tf-doc-test-'));
  try {
    const { config } = backend(() => pdfResponse());
    const response = await relaySharedPdf('presentation', 'k7m2', reader(), { ...config, tmpDir: dossier });
    assert.deepEqual(await readdir(dossier), []);
    await response.arrayBuffer();
    assert.deepEqual(await readdir(dossier), []);

    const flux = trackedBody([PDF_BYTES.slice(0, 3), PDF_BYTES.slice(3)], { end: false });
    const { config: tropLourd } = backend(() => new Response(flux.stream, { status: 200, headers: { 'Content-Type': 'application/pdf' } }));
    assert.equal((await relaySharedPdf('presentation', 'k7m2', reader(), { ...tropLourd, maxBytes: 4, tmpDir: dossier })).status, 503);
    assert.deepEqual(await readdir(dossier), []);
  } finally {
    await rm(dossier, { recursive: true, force: true });
  }
});

test('relais d’un PDF : disque indisponible, « réessayez » sans rien demander au backend, et la place est rendue', async () => {
  const gate = new RelayGate(1);
  const { calls, config } = backend(() => pdfResponse());

  const response = await relaySharedPdf('presentation', 'k7m2', reader(), { ...config, gate, tmpDir: join(tmpdir(), 'tf-doc-absent', 'introuvable') });

  assert.equal(response.status, 503);
  assert.equal(gate.size, 0);
  // Le fichier temporaire est créé avant l'appel : le backend ne compte pas une ouverture jamais servie.
  assert.equal(calls.length, 0);
});

type Write = (buffer: Uint8Array, offset?: number, length?: number, position?: number | null) => Promise<{ bytesWritten: number }>;

/** Le prototype des descripteurs de node:fs/promises : de quoi simuler un disque qui écrit peu à peu. */
async function fileHandlePrototype(): Promise<{ write: Write }> {
  const dossier = await mkdtemp(join(tmpdir(), 'tf-doc-proto-'));
  try {
    const file: FileHandle = await open(join(dossier, 'x'), 'w');
    await file.close();
    return Object.getPrototypeOf(file);
  } finally {
    await rm(dossier, { recursive: true, force: true });
  }
}

test('relais d’un PDF : une écriture sur le disque qui ne prend qu’une partie du bloc est reprise, rien ne manque', async (t) => {
  const proto = await fileHandlePrototype();
  const write = proto.write;
  // Trois octets au plus par écriture : chaque bloc demande plusieurs passes.
  t.mock.method(proto, 'write', function (this: FileHandle, buffer: Uint8Array, offset = 0, length = buffer.byteLength - offset, position?: number | null) {
    return write.call(this, buffer, offset, Math.min(length, 3), position);
  });
  const { config } = backend(() => pdfResponse());

  const response = await relaySharedPdf('presentation', 'k7m2', reader(), config);

  assert.equal(response.status, 200);
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), PDF_BYTES);
});

test('relais d’un PDF : un disque qui n’écrit plus rien, « réessayez » plutôt qu’une boucle sans fin', { timeout: 5_000 }, async (t) => {
  const proto = await fileHandlePrototype();
  t.mock.method(proto, 'write', async () => ({ bytesWritten: 0 }));
  const gate = new RelayGate(1);
  const { config } = backend(() => pdfResponse());

  const response = await relaySharedPdf('presentation', 'k7m2', reader(), { ...config, gate });

  assert.equal(response.status, 503);
  assert.equal(gate.size, 0);
});

test('relais d’un PDF : un bloc écrit sur le disque quitte la mémoire, le fichier n’y est jamais en entier', async () => {
  setFlagsFromString('--expose-gc');
  const gc = runInNewContext('gc') as () => void;
  const BLOC = 1024 * 1024;
  const BLOCS = 16;
  let envoyes = 0;
  let auDernierBloc = Number.POSITIVE_INFINITY;

  gc();
  const avant = process.memoryUsage().arrayBuffers;
  // Chaque bloc naît à la demande : seuls ceux que le relais retient restent en mémoire.
  const corps = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (envoyes === BLOCS - 1) {
        gc();
        auDernierBloc = process.memoryUsage().arrayBuffers - avant;
      }
      if (envoyes === BLOCS) return controller.close();
      controller.enqueue(new Uint8Array(BLOC).fill(envoyes));
      envoyes += 1;
    },
  });
  const { config } = backend(() => new Response(corps, { status: 200, headers: { 'Content-Type': 'application/pdf' } }));

  const response = await relaySharedPdf('presentation', 'k7m2', reader(), config);
  await response.body?.cancel();

  assert.equal(envoyes, BLOCS);
  // Sans rien retenir, un ou deux blocs en vol ; en retenant chaque bloc lu, les 15 premiers.
  assert.ok(auDernierBloc < 4 * BLOC, `${(auDernierBloc / BLOC).toFixed(1)} Mo encore en mémoire au dernier bloc`);
});

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Un PDF de `blocks` blocs de 64 Ko, servi par le faux backend. */
const pdfOfBlocks = (blocks: number) => {
  const bytes = new Uint8Array(blocks * 64 * 1024).map((_, i) => i % 251);
  return { bytes, answer: () => new Response(bytes, { status: 200, headers: { 'Content-Type': 'application/pdf' } }) };
};

test('relais d’un PDF : un lecteur qui ne demande plus rien rend sa place au bout du délai d’inactivité', async () => {
  const gate = new RelayGate(1);
  const { config } = backend(() => pdfResponse());

  const response = await relaySharedPdf('presentation', 'k7m2', reader(), { ...config, gate, idleMs: 30 });
  assert.equal(gate.size, 1);
  // Dix fois le délai : une machine de CI chargée ne fait pas manquer la coupure.
  await pause(300);

  assert.equal(gate.size, 0);
  await assert.rejects(response.arrayBuffer());
});

test('relais d’un PDF : un lecteur lent mais actif n’est pas coupé, le délai repart à chaque bloc', async () => {
  const gate = new RelayGate(1);
  const { bytes, answer } = pdfOfBlocks(12);
  const { config } = backend(answer);

  const response = await relaySharedPdf('presentation', 'k7m2', reader(), { ...config, gate, idleMs: 300 });
  const lecture = response.body!.getReader();
  const blocs: Uint8Array[] = [];
  // Un bloc toutes les 30 ms : plus de 300 ms en tout, jamais 300 ms sans rien demander (dix fois
  // l'écart entre deux blocs, une machine de CI chargée ne coupe pas un lecteur actif).
  for (let r = await lecture.read(); !r.done; r = await lecture.read()) {
    blocs.push(r.value);
    await pause(30);
  }

  assert.deepEqual(Buffer.concat(blocs), Buffer.from(bytes));
  assert.equal(gate.size, 0);
});

test('relais d’un PDF : même actif, un téléchargement rend sa place passé le plafond total', async () => {
  const gate = new RelayGate(1);
  const { answer } = pdfOfBlocks(16);
  const { config } = backend(answer);

  const response = await relaySharedPdf('presentation', 'k7m2', reader(), { ...config, gate, idleMs: 1_000, maxRelayMs: 60 });
  const lecture = response.body!.getReader();
  await assert.rejects(async () => {
    for (let r = await lecture.read(); !r.done; r = await lecture.read()) await pause(20);
  });

  assert.equal(gate.size, 0);
});

test('relais d’un PDF : les adresses d’un même /64 IPv6 sont un seul visiteur', async () => {
  const gate = new RelayGate(10, 2);
  const { config } = backend(() => pdfResponse());
  const relay = (ip: string) => relaySharedPdf('presentation', 'k7m2', reader({ 'x-forwarded-for': ip }), { ...config, gate });

  assert.equal((await relay('2001:db8:1:2::a')).status, 200);
  assert.equal((await relay('2001:db8:1:2:ffff::b')).status, 200);
  // Une troisième adresse du même abonné : sa part est prise.
  assert.equal((await relay('2001:0db8:0001:0002:0:0:0:c')).status, 503);
  // Le /64 voisin est un autre abonné.
  assert.equal((await relay('2001:db8:1:3::a')).status, 200);
});

test('relais d’un PDF : le dossier temporaire se règle par SHARED_PDF_TMP_DIR, celui du système sinon', () => {
  const before = process.env.SHARED_PDF_TMP_DIR;
  try {
    process.env.SHARED_PDF_TMP_DIR = ' /var/tmp/tf-doc ';
    assert.equal(relayConfigFromEnv().tmpDir, '/var/tmp/tf-doc');
    process.env.SHARED_PDF_TMP_DIR = '';
    assert.equal(relayConfigFromEnv().tmpDir, undefined);
  } finally {
    if (before === undefined) delete process.env.SHARED_PDF_TMP_DIR;
    else process.env.SHARED_PDF_TMP_DIR = before;
  }
});

test('relais d’un PDF : sur un refus, le corps du backend est annulé, pas laissé ouvert', async () => {
  for (const status of [404, 500]) {
    const { stream, state } = trackedBody([new TextEncoder().encode('{"message":"Document introuvable."}')]);
    const { config } = backend(() => new Response(stream, { status, headers: { 'Content-Type': 'application/json' } }));

    await relaySharedPdf('presentation', 'k7m2', reader(), config);

    assert.equal(state.cancelled, true, String(status));
  }
});

test('relais d’un PDF : document introuvable pour le backend, page introuvable pour le lecteur', async () => {
  const { config } = backend(() => new Response('{"message":"Document introuvable."}', { status: 404, headers: { 'Content-Type': 'application/json' } }));

  const response = await relaySharedPdf('presentation', 'jamais-emis', reader(), config);

  assert.equal(response.status, 404);
  assert.match(response.headers.get('content-type') ?? '', /^text\/html/);
  assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow, noarchive, nosnippet');
  const html = await response.text();
  assert.match(html, /Document introuvable/);
  assert.match(html, /Document not found/);
  assert.doesNotMatch(html, /api\.trigger-flow/);
});

test('relais d’un PDF : jamais autre chose qu’un PDF sous cette adresse, même si le backend se trompe', async () => {
  const { config } = backend(() => new Response('<html>oups</html>', { status: 200, headers: { 'Content-Type': 'text/html' } }));

  const response = await relaySharedPdf('presentation', 'k7m2', reader(), config);

  assert.equal(response.status, 503);
  assert.doesNotMatch(await response.text(), /oups/);
});

test('relais d’un PDF : backend en erreur, secret refusé ou injoignable, page « momentanément indisponible »', async () => {
  for (const answer of [
    () => new Response('erreur', { status: 500 }),
    () => new Response('{"message":"Unauthenticated."}', { status: 401 }),
    () => Promise.reject(new TypeError('fetch failed')),
  ]) {
    const { config } = backend(answer);
    const response = await relaySharedPdf('presentation', 'k7m2', reader(), config);

    assert.equal(response.status, 503);
    assert.equal(response.headers.get('retry-after'), '120');
    assert.match(await response.text(), /momentanément indisponible/);
  }
});

test('relais d’un PDF : un backend qui ne répond pas est abandonné au bout du délai', async () => {
  const { config } = backend(
    ({ init }) =>
      new Promise<Response>((_, reject) => {
        init.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')));
      })
  );

  const started = Date.now();
  const response = await relaySharedPdf('presentation', 'k7m2', reader(), { ...config, timeoutMs: 30 });

  assert.equal(response.status, 503);
  assert.ok(Date.now() - started < 2000);
});

test('relais d’un PDF : sans secret, ou vers une base en clair, rien ne part', async () => {
  for (const override of [{ secret: undefined }, { apiUrl: undefined }, { apiUrl: 'http://api.trigger-flow.test' }]) {
    const { calls, config } = backend(() => pdfResponse());
    const response = await relaySharedPdf('presentation', 'k7m2', reader(), { ...config, ...override });

    assert.equal(response.status, 503);
    assert.equal(calls.length, 0);
  }
});

test('route des PDF : un HEAD est refusé sans rien demander au backend ni prendre de place', async () => {
  const response = HEAD();

  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'GET');
  assert.equal(await response.text(), '');
});

test('page d’échec : sobre, sans tiret cadratin, et jamais indexée', async () => {
  for (const status of [404, 503] as const) {
    const html = await failurePage(status).text();
    assert.doesNotMatch(html, /—/);
    assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
  }
});
