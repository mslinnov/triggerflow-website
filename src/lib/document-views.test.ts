import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseDocumentPath } from './document-views';

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
