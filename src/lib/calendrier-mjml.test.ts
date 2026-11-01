import assert from 'node:assert/strict';
import path from 'node:path';
import { test } from 'node:test';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { EXAMPLE_VARIABLES, TEMPS_FORT_CODES } from '../data/calendrier-marketing';
import { auditMjmlDir, fixedText, loadMjmlTemplate, loadMjmlThemes, MJML_DIR, toPreviewHtml } from './calendrier-mjml';

const FIXTURES = path.join(MJML_DIR, '__fixtures__');
const VALID = path.join(FIXTURES, 'valide');
const INVALID = path.join(FIXTURES, 'invalide');

test('modèles livrés, TOUS THÈMES (src/data/calendrier-mjml/<thème>) : trios complets, ni tiret cadratin ni chiffre promis hors champ', () => {
  assert.deepEqual(auditMjmlDir(), []);
  // Le thème par défaut couvre les 12 temps forts : la page ne retombe jamais sur le texte.
  assert.equal(TEMPS_FORT_CODES.filter((code) => loadMjmlTemplate(code)).length, 12);
});

test('le contrôle de contenu attrape un tiret cadratin et des chiffres promis en clair', () => {
  const issues = auditMjmlDir(INVALID);
  assert.ok(issues.some((i) => i.includes('moderne/black_friday_voucher.mjml') && i.includes('tiret cadratin')), issues.join('\n'));
  assert.ok(issues.some((i) => i.includes('black_friday_voucher.html') && i.includes('chiffre promis')), issues.join('\n'));
  assert.ok(issues.some((i) => i.includes('json objet') && i.includes('48 h')), issues.join('\n'));
  // Le même contenu en champs passe : la fixture valide n'a aucun problème.
  assert.deepEqual(auditMjmlDir(VALID), []);
});

test('chargement par thème : les trois fichiers, sinon rien ; thèmes livrés dans l’ordre', () => {
  const template = loadMjmlTemplate('valentines_day', 'moderne', VALID);
  assert.ok(template);
  assert.equal(template.theme, 'moderne');
  assert.match(template.mjml, /^<mjml>/);
  assert.equal(template.subject, '{{firstname}}, une nuit rien que pour vous deux');
  assert.equal(loadMjmlTemplate('black_friday_voucher', 'moderne', VALID), null);
  assert.equal(loadMjmlTemplate('valentines_day', 'editorial', VALID), null);
  // Soirée livré, Éditorial pas encore : seuls les deux premiers sont proposés.
  assert.deepEqual(loadMjmlThemes('valentines_day', VALID).map((t) => t.theme), ['moderne', 'soiree']);
  assert.match(loadMjmlTemplate('valentines_day', 'soiree', VALID)!.html, /soirée/);
  assert.deepEqual(loadMjmlThemes('black_friday_voucher', VALID), []);
});

test('fichiers mal rangés : hors thème ou thème inconnu signalés', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'calendrier-mjml-'));
  try {
    writeFileSync(path.join(dir, 'valentines_day.mjml'), '<mjml></mjml>');
    mkdirSync(path.join(dir, 'pastel'));
    const issues = auditMjmlDir(dir);
    assert.ok(issues.some((i) => i.includes('hors d') && i.includes('valentines_day.mjml')), issues.join('\n'));
    assert.ok(issues.some((i) => i.includes('pastel/ : thème inconnu')), issues.join('\n'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('aperçu : variables d’exemple, champs surlignés dans le texte, en clair dans les attributs, scripts retirés', () => {
  const html = toPreviewHtml(loadMjmlTemplate('valentines_day', 'moderne', VALID)!.html, EXAMPLE_VARIABLES);
  assert.match(html, /Bonjour Camille,/);
  assert.match(html, /L'équipe de Hôtel des Tilleuls/);
  assert.match(html, /<mark title="Catégorie de chambre"[^>]*>avec vue<\/mark>/);
  // Texte sombre imposé : lisible aussi sur les thèmes à fond sombre (Soirée).
  for (const mark of html.match(/<mark [^>]*>/g) ?? []) assert.match(mark, /color:#002B28;/, mark);
  assert.match(html, /href="https:\/\/votre-hotel\.fr\/reserver"/);
  assert.doesNotMatch(html, /\[\[|\{\{|<script/);
});

test('texte visible : sans styles, balises, champs ni variables', () => {
  const text = fixedText(loadMjmlTemplate('valentines_day', 'moderne', VALID)!.html);
  assert.doesNotMatch(text, /font-size|24px|Camille|11 h|avec vue/);
  assert.match(text, /Bonjour , Une chambre et le petit-déjeuner/);
});
