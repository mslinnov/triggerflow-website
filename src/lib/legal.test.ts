import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { getAllLegalSlugs, getLegalDoc } from './legal';

const contentDir = join(__dirname, '..', '..', 'content', 'legal');

/**
 * Pages exigées par Google Play et l'App Store : leur URL est déclarée dans les consoles, une
 * version anglaise manquante retomberait en silence sur le français.
 */
const PAGES_DES_STORES = ['app-mobile-confidentialite', 'suppression-compte'] as const;

test('les pages des stores existent en français et en anglais, avec leur route', () => {
  for (const slug of PAGES_DES_STORES) {
    assert.ok(getAllLegalSlugs().includes(slug), `${slug} absent de KNOWN_SLUGS`);
    for (const locale of ['fr', 'en'] as const) {
      assert.ok(existsSync(join(contentDir, locale, `${slug}.mdx`)), `${locale}/${slug}.mdx manquant`);
      const doc = getLegalDoc(slug, locale);
      assert.equal(doc?.frontmatter.slug, slug);
      for (const champ of ['title', 'version', 'lastUpdated', 'metaTitle', 'metaDescription'] as const) {
        assert.ok(doc?.frontmatter[champ], `${locale}/${slug} : ${champ} vide`);
      }
    }
    const route = join(__dirname, '..', 'app', '[locale]', '(main)', slug, 'page.tsx');
    assert.ok(existsSync(route), `route ${slug} manquante`);
  }
});

test('les pages des stores ne contiennent pas de tiret cadratin et lient la bonne langue', () => {
  for (const slug of PAGES_DES_STORES) {
    for (const locale of ['fr', 'en'] as const) {
      const texte = readFileSync(join(contentDir, locale, `${slug}.mdx`), 'utf-8');
      assert.ok(!texte.includes('—'), `${locale}/${slug} contient un tiret cadratin`);
      const autre = locale === 'fr' ? 'en' : 'fr';
      assert.ok(!texte.includes(`](/${autre}/`), `${locale}/${slug} lie une page de l'autre langue`);
    }
  }
});
