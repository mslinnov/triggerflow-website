import assert from 'node:assert/strict';
import { test } from 'node:test';
import { localServer } from './__fixtures__/local-server';
import { parseDocumentPath, recordDocumentView } from './document-views';

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

test('comptage d’une ouverture : une redirection du backend n’est pas suivie, le secret ne part jamais ailleurs', async () => {
  const ailleurs = await localServer((_, res) => {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end('{}');
  });
  const backendRedirige = await localServer((_, res) => {
    res.writeHead(307, { Location: `${ailleurs.url}/api/public-document-view` });
    res.end();
  });
  try {
    const request = new Request('https://www.trigger-flow.com/doc/parcours/k7m2', { headers: { 'x-forwarded-for': '203.0.113.9' } });

    // Le vrai fetch, vers deux serveurs de la machine : la base http://localhost est acceptée.
    await recordDocumentView('parcours', 'k7m2', request, 'fr', { apiUrl: backendRedirige.url, secret: 's3cret' });

    assert.equal(backendRedirige.hits.length, 1);
    assert.equal(ailleurs.hits.length, 0);
  } finally {
    await Promise.all([ailleurs.close(), backendRedirige.close()]);
  }
});
