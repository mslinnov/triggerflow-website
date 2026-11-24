import { test } from 'node:test';
import assert from 'node:assert/strict';
import fr from '../../messages/fr.json';
import en from '../../messages/en.json';
import { COMPARISON_GROUPS, getFeature } from './pricing-comparison';
import { PLANS } from './pricing';

const features = COMPARISON_GROUPS.flatMap((g) => g.features);

test('chaque ligne a, en FR et en EN, un libellé, une phrase et un exemple, sans tiret cadratin', () => {
  for (const [locale, messages] of [['fr', fr], ['en', en]] as const) {
    const c = messages.pricing.comparison as {
      features: Record<string, string>;
      tooltips: Record<string, { what?: string; example?: string }>;
    };
    for (const { key } of features) {
      const texts = [c.features[key], c.tooltips[key]?.what, c.tooltips[key]?.example];
      for (const text of texts) {
        assert.ok(text && text.trim().length > 0, `${locale} ${key} : texte manquant`);
        assert.ok(!text.includes('—'), `${locale} ${key} : tiret cadratin`);
      }
    }
  }
});

test('première ligne : e-mails compris par mois, lus dans PLANS', () => {
  assert.equal(features[0].key, 'emails');
  assert.deepEqual(features[0].values, PLANS.map((p) => p.emailsPerMonth));
});

test('lignes ajoutées et décisions du 24/11', () => {
  const marketing = COMPARISON_GROUPS.find((g) => g.key === 'marketing')!.features.map((f) => f.key);
  assert.ok(marketing.includes('sendingDomain'), 'domaine d’envoi dans Marketing & ventes');
  assert.deepEqual(getFeature('sendingDomain').values, [false, true, true, true]);
  assert.deepEqual(getFeature('marketing').values, [false, true, true, true]);
  // Tests A/B : même droit que les conditions sur les interactions (AbTestGuard de l'app).
  assert.deepEqual(getFeature('abTests').values, getFeature('conditions').values);
  assert.deepEqual(getFeature('templateLibrary').values, [true, true, true, true]);
});

test('aucune valeur écrite en dur dans une langue : « illimité » passe par la traduction', () => {
  const texts = features.flatMap((f) => f.values).filter((v) => typeof v === 'string');
  assert.deepEqual([...new Set(texts)], ['unlimited']);
  assert.equal(fr.pricing.comparison.unlimited, 'illimités');
  assert.equal(en.pricing.comparison.unlimited, 'unlimited');
});
