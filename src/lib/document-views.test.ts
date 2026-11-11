import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseDocumentPath } from './document-views';
import { failurePage, relaySharedPdf, type RelayConfig } from './shared-pdf';

test('adresse d’un document : le Parcours reste une page du site, une autre clé bien formée est un PDF du CRM', () => {
  assert.deepEqual(parseDocumentPath('/doc/parcours/k7m2'), { kind: 'page', document: 'parcours', slug: 'k7m2' });
  assert.deepEqual(parseDocumentPath('/doc/presentation-2027/k7m2'), { kind: 'pdf', document: 'presentation-2027', slug: 'k7m2' });
  assert.deepEqual(parseDocumentPath('/doc/presentation/k7m2/'), { kind: 'pdf', document: 'presentation', slug: 'k7m2' });
});

test('adresse d’un document : tout le reste repart vers la page 404 du site, sans rien demander au backend', () => {
  for (const path of [
    '/doc/presentation', // pas de suffixe
    '/doc/presentation/k7/x', // segment en trop
    '/doc/Presentation/k7', // majuscules : le backend ne les émet jamais
    '/doc/presentation/K7',
    '/doc/a/k7', // clé d’un caractère
    `/doc/${'a'.repeat(51)}/k7`, // clé trop longue
    `/doc/presentation/${'k'.repeat(121)}`, // suffixe trop long
    '/doc/-presentation/k7',
    '/doc/pré/k7',
    '/docs/presentation/k7',
  ]) {
    assert.equal(parseDocumentPath(path), null, path);
  }
});

type Call = { url: string; init: RequestInit };

function backend(answer: (call: Call) => Promise<Response> | Response) {
  const calls: Call[] = [];
  const fetch = (async (url: string, init: RequestInit) => {
    const call = { url, init };
    calls.push(call);
    return answer(call);
  }) as unknown as typeof globalThis.fetch;

  return { calls, config: { apiUrl: 'https://api.trigger-flow.test', secret: 's3cret', fetch } satisfies RelayConfig };
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

test('page d’échec : sobre, sans tiret cadratin, et jamais indexée', async () => {
  for (const status of [404, 503] as const) {
    const html = await failurePage(status).text();
    assert.doesNotMatch(html, /—/);
    assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
  }
});
