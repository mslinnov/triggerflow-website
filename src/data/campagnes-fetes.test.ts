import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { brand } from './brand';
import { hasFeteTemplate } from '../lib/campagnes-fetes';
import {
  CAMPAGNES_FETES,
  CAMPAGNES_FETES_EXCLUSIVES,
  FETES_CODES,
  FETES_EXCLUSIFS_CODES,
  TOUS_FETES_CODES,
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

const texts = [...[...CAMPAGNES_FETES, ...CAMPAGNES_FETES_EXCLUSIVES].flatMap((c) => [c.nom, c.periode, c.periodeCourte, c.objet, c.pourquoi]), ...strings(messages.campagnesFetes)];

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

test('3 modèles exclusifs : codes à part des 7, marqués exclusifs, reconnus par la route et exportés', () => {
  assert.deepEqual(
    CAMPAGNES_FETES_EXCLUSIVES.map((c) => c.code).sort(),
    [...FETES_EXCLUSIFS_CODES].sort(),
  );
  assert.deepEqual([...TOUS_FETES_CODES], [...FETES_CODES, ...FETES_EXCLUSIFS_CODES]);
  assert.equal(new Set(TOUS_FETES_CODES).size, 10);
  assert.ok(CAMPAGNES_FETES_EXCLUSIVES.every((c) => c.exclusif && c.style === FETES_STYLE && isFeteCode(c.code)));
  assert.ok(CAMPAGNES_FETES.every((c) => !c.exclusif));
  // Les trois fichiers (mjml, html, json) exportés par l'app : sans eux, ni aperçu ni « Copier le modèle ».
  assert.deepEqual(
    CAMPAGNES_FETES_EXCLUSIVES.filter((c) => !hasFeteTemplate(c)).map((c) => c.code),
    [],
  );
});

test('lien d’activation : écran « Créer à partir du modèle » de l’app, type et style fetes, UTM du site', () => {
  for (const c of [...CAMPAGNES_FETES, ...CAMPAGNES_FETES_EXCLUSIVES]) {
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
  // Jours cités par la maquette validée : 18 au 26 décembre, 20, 24, 31, 1er janvier, et le nombre de modèles (7, 3).
  // Rien d'autre (pas de %, d'€, de durée).
  const allowed = new Set(['1', '3', '7', '18', '20', '24', '26', '31']);
  const found = texts.flatMap((text) => text.match(/\d+/g) ?? []).filter((n) => !allowed.has(n));
  assert.deepEqual(found, []);
  assert.deepEqual(
    texts.filter((text) => /\d\s?(%|€|h\b|min\b|minutes?|heures?|semaines?|mois|nuits?)/i.test(text)),
    [],
  );
});

const composant = (fichier: string) => readFileSync(join(__dirname, '..', 'components', 'campagnes-fetes', fichier), 'utf8');

test('héros visible dès le rendu serveur : ni fondu GSAP sur le titre et les cartes, ni masquage en CSS', () => {
  const motion = composant('PageMotion.tsx');
  const heroTweens = motion.match(/\.(from|fromTo|set)\(all\('(\.cf-hero[^']*|\[data-h\]|h1|\.cf-sous|\.cf-actions|\.cf-carte-h)'\)[^;]*/g) ?? [];
  assert.deepEqual(heroTweens.filter((tween) => /autoAlpha|opacity|visibility/.test(tween)), []);
  const css = composant('campagnes-fetes.css');
  assert.deepEqual(css.match(/[^}]*\.cf-(hero|carte-h|sous|actions)[^{]*\{[^}]*(opacity:\s*0[;}]|visibility:\s*hidden)/g) ?? [], []);
});

test('aperçus d’e-mail : hauteur de l’iframe tirée de son cadre en CSS, sans attendre le script', () => {
  assert.match(composant('campagnes-fetes.css'), /\.cf-mail-if\{[^}]*height:calc\(100% \/ var\(--s\)\)/);
});
