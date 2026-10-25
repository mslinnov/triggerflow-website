import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getAllArticles, extractFaqItems } from './blog';
import { buildLlmsTxt, buildLlmsFullTxt, mdxToPlainText } from './llms';

const articles = { fr: getAllArticles('fr'), en: getAllArticles('en') };

test('llms.txt liste chaque article publié, en FR et en EN', () => {
  const txt = buildLlmsTxt(articles);
  assert.ok(articles.fr.length > 0 && articles.en.length > 0);
  for (const a of [...articles.fr, ...articles.en]) {
    assert.ok(txt.includes(`/${a.locale}/blog/${a.siloSlug}/${a.slug})`), `article absent : ${a.slug}`);
  }
});

test('llms.txt et llms-full.txt : faits de marque sans claim retiré ni tiret cadratin', () => {
  for (const txt of [buildLlmsTxt(articles), buildLlmsFullTxt(articles)]) {
    assert.match(txt, /founded in 2019 in Toulouse/);
    assert.doesNotMatch(txt, /Clock|leader|—/);
  }
});

test('le texte brut résout les chiffres TriggerFlow et retire les composants', () => {
  const mdx = [
    '{/* @METADATA_SEO secret */}',
    '<ImageBlock id="hero" />',
    'Plus de <Stat id="hotels" /> hôtels.',
    '<KeyFigureCard statId="rating" label="Note" />',
    '<KeyFigure',
    '  value="98%"',
    '  label="Taux d\'ouverture SMS"',
    '/>',
    '<Callout type="tip">',
    'Voir le [guide CRM](/fr/blog/experience-client/crm-hotelier-guide/).',
    '</Callout>',
    '<NewsletterInline />',
  ].join('\n');
  const txt = mdxToPlainText(mdx, 'fr');
  assert.doesNotMatch(txt, /[<>]|METADATA_SEO|\{\/\*/);
  assert.match(txt, /Plus de 500\+ hôtels\./);
  assert.match(txt, /- 9,4\/10 : Note/);
  assert.match(txt, /- 98% : Taux d'ouverture SMS/);
  assert.match(txt, /\(https:\/\/www\.trigger-flow\.com\/fr\/blog\/experience-client\/crm-hotelier-guide\/\)/);
});

test('llms-full.txt ne laisse fuir aucun composant MDX des vrais articles', () => {
  const full = buildLlmsFullTxt(articles);
  assert.doesNotMatch(full, /<[A-Z][A-Za-z]*[\s/>]|\{\/\*/);
});

test('chaque article a une FAQ extraite pour le FAQPage JSON-LD', () => {
  for (const a of [...articles.fr, ...articles.en]) {
    assert.ok(extractFaqItems(a.content).length >= 3, `FAQ non extraite : ${a.slug}`);
  }
});

test('chaque article est signé par une personne', () => {
  for (const a of [...articles.fr, ...articles.en]) {
    assert.ok(['mounir-lakhfif', 'soufiane-bouyahia'].includes(a.auteur), a.slug);
  }
});

test('chaque article s’ouvre sur un résumé citable (En bref / In short)', () => {
  for (const a of [...articles.fr, ...articles.en]) {
    const marker = a.locale === 'fr' ? '**En bref :**' : '**In short:**';
    const index = a.content.indexOf(marker);
    assert.ok(index !== -1 && index < 600, `résumé absent en tête : ${a.slug}`);
  }
});
