import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

const load = (locale: string) =>
  JSON.parse(readFileSync(join(__dirname, '..', '..', '..', 'messages', `${locale}.json`), 'utf8')).howItWorksPage;
const keys = (o: unknown, path = ''): string[] =>
  o && typeof o === 'object' ? Object.entries(o).flatMap(([k, v]) => keys(v, `${path}${k}.`)) : [path];
const values = (o: unknown): string[] => (o && typeof o === 'object' ? Object.values(o).flatMap(values) : [String(o)]);

test('mêmes clés en français et en anglais', () => {
  assert.ok(load('fr'), 'espace de noms howItWorksPage absent');
  assert.deepEqual(keys(load('fr')).sort(), keys(load('en')).sort());
});

test('dix temps, chacun avec un titre et un texte', () => {
  for (const locale of ['fr', 'en']) {
    for (let i = 0; i < 10; i++) {
      const chapter = load(locale).chapters[i];
      assert.ok(chapter.title && chapter.text, `${locale} ${i}`);
    }
  }
  assert.equal(Object.keys(load('fr').chapters).length, 10);
});

test('aucun texte vide, aucun tiret cadratin', () => {
  for (const locale of ['fr', 'en']) {
    values(load(locale)).forEach((v) => {
      assert.ok(v.trim().length > 0);
      assert.ok(!v.includes('—'), v);
    });
  }
});
