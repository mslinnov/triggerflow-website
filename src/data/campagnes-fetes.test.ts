import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { brand } from './brand';
import {
  CAMPAGNES_FETES,
  FETES_CODES,
  FETES_STYLE,
  feteActivateUrl,
  feteDemoUrl,
  feteFileUrl,
  fetePreviewUrl,
  isFeteCode,
} from './campagnes-fetes';

const messages = JSON.parse(readFileSync(join(__dirname, '..', '..', 'messages', 'fr.json'), 'utf8')) as { campagnesFetes: unknown };

/** Tous les textes d'une valeur JSON, à plat. */
function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

const texts = [...CAMPAGNES_FETES.flatMap((c) => [c.nom, c.periode, c.periodeCourte, c.objet, c.pourquoi]), ...strings(messages.campagnesFetes)];

test('7 campagnes, codes uniques, dans l’ordre d’envoi', () => {
  assert.equal(CAMPAGNES_FETES.length, 7);
  assert.deepEqual(
    CAMPAGNES_FETES.map((c) => c.code),
    [...FETES_CODES],
  );
  assert.equal(new Set(FETES_CODES).size, 7);
  assert.ok(CAMPAGNES_FETES.every((c) => isFeteCode(c.code) && c.style === FETES_STYLE));
  assert.ok(!isFeteCode('valentines_day'));
});

test('lien d’activation : écran « Créer à partir du modèle » de l’app, type et style fetes, UTM du site', () => {
  for (const c of CAMPAGNES_FETES) {
    const url = new URL(feteActivateUrl(c));
    assert.equal(`${url.origin}${url.pathname}`, 'https://app.trigger-flow.com/email-templates/library/activate');
    assert.equal(url.searchParams.get('type'), c.code);
    assert.equal(url.searchParams.get('style'), 'fetes');
    assert.equal(url.searchParams.get('utm_medium'), 'campagnes-fetes');
    assert.equal(url.searchParams.get('utm_content'), c.code);
    assert.ok(feteActivateUrl(c).startsWith(`https://app.trigger-flow.com/email-templates/library/activate?type=${c.code}&style=fetes`));
  }
});

test('démo : lien de la fiche démo avec UTM, aperçu et fichiers par la route du calendrier', () => {
  const demo = new URL(feteDemoUrl('page'));
  assert.equal(`${demo.origin}${demo.pathname}`, brand.demoUrl);
  assert.equal(demo.searchParams.get('utm_campaign'), 'campagnes-fetes');
  assert.equal(demo.searchParams.get('utm_content'), 'page');
  const [first] = CAMPAGNES_FETES;
  assert.equal(fetePreviewUrl(first), '/api/calendrier/modele/christmas_gift_voucher/apercu?theme=fetes');
  assert.equal(feteFileUrl(first, 'mjml', true), '/api/calendrier/modele/christmas_gift_voucher/mjml?theme=fetes&telecharger=1');
});

test('aucun tiret cadratin ni demi-cadratin dans les textes', () => {
  assert.ok(texts.length > 50);
  assert.deepEqual(
    texts.filter((text) => /[—–]/.test(text)),
    [],
  );
});

test('aucun chiffre inventé : seulement des dates du calendrier', () => {
  // Jours cités par la maquette validée : 18 au 26 décembre, 20, 24, 31, 1er janvier. Rien d'autre (pas de %, d'€, de durée).
  const allowed = new Set(['1', '7', '18', '20', '24', '26', '31']);
  const found = texts.flatMap((text) => text.match(/\d+/g) ?? []).filter((n) => !allowed.has(n));
  assert.deepEqual(found, []);
  assert.deepEqual(
    texts.filter((text) => /\d\s?(%|€|h\b|min\b|minutes?|heures?|semaines?|mois|nuits?)/i.test(text)),
    [],
  );
});
