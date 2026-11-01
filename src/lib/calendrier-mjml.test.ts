import assert from 'node:assert/strict';
import path from 'node:path';
import { test } from 'node:test';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import {
  CAMPAIGNS,
  EXAMPLE_VARIABLES,
  signatureTextLine,
  signatureUrl,
  TEMPS_FORT_CODES,
  templateFileName,
  templateFileUrl,
} from '../data/calendrier-marketing';
import { GET } from '../app/api/calendrier/modele/[code]/[format]/route';
import {
  auditMjmlDir,
  contentIssues,
  contrastRatio,
  fixedText,
  loadMjmlTemplate,
  loadMjmlThemes,
  MJML_DIR,
  previewFor,
  signatureColor,
  signTemplate,
  templateBackground,
  toPreviewHtml,
} from './calendrier-mjml';
import { emailToPlainText } from './calendrier';

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

test('modèles et aperçus gardés en mémoire hors développement : un fichier n’est lu qu’une fois', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'calendrier-mjml-cache-'));
  try {
    mkdirSync(path.join(dir, 'moderne'));
    const write = (body: string) => {
      writeFileSync(path.join(dir, 'moderne', 'late_season.mjml'), `<mjml>${body}</mjml>`);
      writeFileSync(path.join(dir, 'moderne', 'late_season.html'), `<p>${body}</p>`);
      writeFileSync(path.join(dir, 'moderne', 'late_season.json'), '{"subject":"s","preheader":"p"}');
    };
    write('premier');
    const first = loadMjmlTemplate('late_season', 'moderne', dir);
    write('second');
    // Les tests ne tournent pas en NODE_ENV=development : le cache est actif.
    assert.equal(loadMjmlTemplate('late_season', 'moderne', dir), first);
    assert.equal(previewFor(first!, EXAMPLE_VARIABLES), previewFor(first!, EXAMPLE_VARIABLES));
    assert.match(previewFor(first!, EXAMPLE_VARIABLES), /premier/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('signature « Modèle créé avec TriggerFlow » : dans le MJML, le HTML et l’aperçu copiés des 36 modèles, lien exact, lisible', () => {
  let count = 0;
  for (const code of TEMPS_FORT_CODES) {
    for (const template of loadMjmlThemes(code)) {
      count++;
      const where = `${template.theme}/${code}`;
      const url = signatureUrl(code, template.theme);
      assert.equal(
        url,
        `https://www.trigger-flow.com/?utm_source=calendrier-marketing&utm_medium=email&utm_campaign=modele-copie&utm_content=${code}&utm_term=${template.theme}`,
      );
      // Les fichiers de l'app restent intacts.
      assert.doesNotMatch(template.mjml + template.html, /Modèle créé avec/, where);

      const signed = signTemplate(template);
      for (const [kind, source, closing] of [
        ['mjml', signed.mjml, '</mj-body>'],
        ['html', signed.html, '</body>'],
      ] as const) {
        const hrefs = [...source.matchAll(/Modèle créé avec <a href="([^"]+)"/g)].map((m) => m[1]);
        assert.equal(hrefs.length, 1, `${where}.${kind} : une signature`);
        // Attribut encodé (&amp;), lien exact une fois décodé.
        assert.equal(hrefs[0], url.replace(/&/g, '&amp;'), `${where}.${kind}`);
        // En bas de l'e-mail : la signature est immédiatement suivie de la balise de fin.
        const end = kind === 'mjml' ? 'TriggerFlow</a></mj-text></mj-column></mj-section>' : 'TriggerFlow</a></td></tr></table>';
        assert.ok(source.includes(end + closing), `${where}.${kind}`);
        assert.deepEqual(contentIssues(fixedText(source)), [], `${where}.${kind}`);
      }
      // Contraste AA (≥ 4,5:1) sur le fond du thème, clair ou sombre.
      const background = templateBackground(template.html);
      assert.ok(contrastRatio(signatureColor(background), background) >= 4.5, `${where} : ${background}`);
      assert.match(previewFor(template, EXAMPLE_VARIABLES), /Modèle créé avec <a href=/, where);
    }
  }
  assert.equal(count, 36);
  // Les deux familles de fonds : sombre (Soirée) et clair.
  assert.equal(signatureColor('#161618'), '#A8A8A8');
  assert.equal(signatureColor('#F4F4F4'), '#595959');
});

test('texte copié (repli) : se termine par la signature et son lien', () => {
  for (const campaign of CAMPAIGNS) {
    const text = emailToPlainText(campaign.email, signatureTextLine(campaign.code));
    assert.ok(
      text.endsWith(`\n\nModèle créé avec TriggerFlow : ${signatureUrl(campaign.code, 'texte')}`),
      campaign.id,
    );
    assert.doesNotMatch(text, /[—–]/, campaign.id);
  }
  assert.match(signatureTextLine('valentines_day'), /utm_content=valentines_day&utm_term=texte$/);
});

/** Appelle la route des modèles avec l'adresse que la page utilise (code et format tirés du chemin). */
async function fetchTemplateFile(url: string): Promise<Response> {
  const match = url.match(/^\/api\/calendrier\/modele\/([^/]+)\/([^/?]+)\?/);
  assert.ok(match, url);
  return GET(new Request(`https://www.trigger-flow.com${url}`), { params: Promise.resolve({ code: match[1], format: match[2] }) });
}

test('« Télécharger » : le fichier de « Copier » (signé, UTM), en pièce jointe <code>-<thème>.<format>, pour les 36 modèles', async () => {
  assert.equal(templateFileName('valentines_day', 'soiree', 'mjml'), 'valentines_day-soiree.mjml');
  assert.equal(templateFileName('new_year_eve', 'moderne', 'html'), 'new_year_eve-moderne.html');
  let count = 0;
  for (const code of TEMPS_FORT_CODES) {
    for (const template of loadMjmlThemes(code)) {
      const signed = signTemplate(template);
      for (const format of ['mjml', 'html'] as const) {
        count++;
        const where = `${template.theme}/${code}.${format}`;
        const name = templateFileName(code, template.theme, format);
        assert.match(name, /^[a-z0-9_]+-[a-z]+\.(mjml|html)$/, where);

        const copied = await fetchTemplateFile(templateFileUrl(code, template.theme, format));
        const downloaded = await fetchTemplateFile(templateFileUrl(code, template.theme, format, true));
        assert.equal(copied.status, 200, where);
        assert.equal(downloaded.status, 200, where);
        const copiedText = await copied.text();
        assert.equal(copiedText, signed[format], where);
        assert.ok(copiedText.includes(signatureUrl(code, template.theme).replace(/&/g, '&amp;')), `${where} : UTM`);
        assert.equal(await downloaded.text(), copiedText, where);

        assert.equal(downloaded.headers.get('content-disposition'), `attachment; filename="${name}"`, where);
        // Type neutre : Safari n'ajoute pas « .txt » au nom.
        assert.equal(downloaded.headers.get('content-type'), 'application/octet-stream', where);
        // La copie ne change pas.
        assert.equal(copied.headers.get('content-disposition'), null, where);
        assert.equal(copied.headers.get('content-type'), 'text/plain; charset=utf-8', where);
      }
    }
  }
  assert.equal(count, 72);
});
