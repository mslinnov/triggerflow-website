import assert from 'node:assert/strict';
import { test } from 'node:test';
import { brand } from '../data/brand';
import fr from '../../messages/fr.json';
import en from '../../messages/en.json';
import { applyBrandValues, brandValues, withBrandValues } from './brand-values';

test('faits de marque : seules les clés connues sont remplacées, les arguments ICU restent pour next-intl', () => {
  const values = brandValues('fr');
  const resolved = applyBrandValues(
    { title: '{pmsCompatibles} PMS', items: ['{count, plural, one {# hôtel} other {# hôtels}}', { label: '{name}' }], n: 3 },
    values,
  );
  assert.deepEqual(resolved, {
    title: `${brand.pmsCompatibles.fr} PMS`,
    items: ['{count, plural, one {# hôtel} other {# hôtels}}', { label: '{name}' }],
    n: 3,
  });
  assert.equal(applyBrandValues('{pmsCompatibles} PMS', brandValues('en')), `${brand.pmsCompatibles.en} PMS`);
});

test('messages chargés : plus aucun {pmsCompatibles}, le chiffre de brand.ts à la place', () => {
  for (const [locale, messages, value] of [
    ['fr', fr, brand.pmsCompatibles.fr],
    ['en', en, brand.pmsCompatibles.en],
  ] as const) {
    const raw = JSON.stringify(messages);
    const resolved = JSON.stringify(withBrandValues(locale, messages as Record<string, unknown>));
    assert.ok(raw.includes('{pmsCompatibles}'), `${locale} : les messages écrivent {pmsCompatibles}`);
    assert.ok(!resolved.includes('{pmsCompatibles}'), `${locale} : valeur posée au chargement`);
    assert.ok(resolved.includes(`${value} PMS`), `${locale} : « ${value} PMS » affiché`);
  }
});
