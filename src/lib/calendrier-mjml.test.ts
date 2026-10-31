import assert from 'node:assert/strict';
import path from 'node:path';
import { test } from 'node:test';
import { EXAMPLE_VARIABLES } from '../data/calendrier-marketing';
import { auditMjmlDir, availableMjmlCodes, fixedText, loadMjmlTemplate, MJML_DIR, toPreviewHtml } from './calendrier-mjml';

const FIXTURES = path.join(MJML_DIR, '__fixtures__');
const VALID = path.join(FIXTURES, 'valide');
const INVALID = path.join(FIXTURES, 'invalide');

test('modèles livrés (src/data/calendrier-mjml) : trios complets, ni tiret cadratin ni chiffre promis hors champ', () => {
  assert.deepEqual(auditMjmlDir(), []);
});

test('le contrôle de contenu attrape un tiret cadratin et des chiffres promis en clair', () => {
  const issues = auditMjmlDir(INVALID);
  assert.ok(issues.some((i) => i.includes('black_friday_voucher.mjml') && i.includes('tiret cadratin')), issues.join('\n'));
  assert.ok(issues.some((i) => i.includes('black_friday_voucher.html') && i.includes('chiffre promis')), issues.join('\n'));
  assert.ok(issues.some((i) => i.includes('json objet') && i.includes('48 h')), issues.join('\n'));
  // Le même contenu en champs passe : la fixture valide n'a aucun problème.
  assert.deepEqual(auditMjmlDir(VALID), []);
});

test('chargement : les trois fichiers, sinon rien (repli sur le modèle texte)', () => {
  const template = loadMjmlTemplate('valentines_day', VALID);
  assert.ok(template);
  assert.match(template.mjml, /^<mjml>/);
  assert.equal(template.subject, '{{firstname}}, une nuit rien que pour vous deux');
  assert.equal(loadMjmlTemplate('black_friday_voucher', VALID), null);
  assert.deepEqual(availableMjmlCodes(VALID), ['valentines_day']);
});

test('aperçu : variables d’exemple, champs surlignés dans le texte, en clair dans les attributs, scripts retirés', () => {
  const html = toPreviewHtml(loadMjmlTemplate('valentines_day', VALID)!.html, EXAMPLE_VARIABLES);
  assert.match(html, /Bonjour Camille,/);
  assert.match(html, /L'équipe de Hôtel des Tilleuls/);
  assert.match(html, /<mark title="Catégorie de chambre"[^>]*>avec vue<\/mark>/);
  assert.match(html, /href="https:\/\/votre-hotel\.fr\/reserver"/);
  assert.doesNotMatch(html, /\[\[|\{\{|<script/);
});

test('texte visible : sans styles, balises, champs ni variables', () => {
  const text = fixedText(loadMjmlTemplate('valentines_day', VALID)!.html);
  assert.doesNotMatch(text, /font-size|24px|Camille|11 h|avec vue/);
  assert.match(text, /Bonjour , Une chambre et le petit-déjeuner/);
});
