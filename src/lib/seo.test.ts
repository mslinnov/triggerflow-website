import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { test } from 'node:test';
import { pageAlternates } from './seo';

const appDir = join(__dirname, '..', 'app', '[locale]');

function pages(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? pages(p) : f === 'page.tsx' ? [p] : [];
  });
}

/** Route de la page, sans locale ni groupes : « (main)/entreprise/a-propos » → « /entreprise/a-propos ». */
function route(page: string): string {
  const segments = relative(appDir, dirname(page)).split(sep).filter((s) => s && !/^\(.*\)$/.test(s));
  return segments.length ? `/${segments.join('/')}` : '';
}

test('pageAlternates : canonical et hreflang de la page elle-même, en https', () => {
  assert.deepEqual(pageAlternates('en', '/tarifs'), {
    canonical: 'https://www.trigger-flow.com/en/tarifs',
    languages: {
      fr: 'https://www.trigger-flow.com/fr/tarifs',
      en: 'https://www.trigger-flow.com/en/tarifs',
      'x-default': 'https://www.trigger-flow.com/fr/tarifs',
    },
  });
});

test('pageAlternates : page rédigée en français seulement, ni hreflang en ni canonical en', () => {
  assert.deepEqual(pageAlternates('en', '/ressources/cas-clients/x', ['fr']), {
    canonical: 'https://www.trigger-flow.com/fr/ressources/cas-clients/x',
    languages: {
      fr: 'https://www.trigger-flow.com/fr/ressources/cas-clients/x',
      'x-default': 'https://www.trigger-flow.com/fr/ressources/cas-clients/x',
    },
  });
});

test("aucune page n'hérite des alternates de l'accueil (layout [locale])", () => {
  // alternateLinks: false (routing.ts) : sans `alternates` déclarés par la page (ou son propre
  // layout), Next.js reprend ceux du layout racine, canonical et hreflang vers /fr et /en.
  const found: string[] = [];
  for (const page of pages(appDir)) {
    const own = [page, join(dirname(page), 'layout.tsx')].filter(existsSync).map((f) => readFileSync(f, 'utf8')).join('\n');
    const rel = relative(appDir, page);
    if (!/alternates|buildLegalMetadata/.test(own)) {
      found.push(`${rel} : aucun alternates`);
      continue;
    }
    // Le chemin passé à pageAlternates doit être celui de la page (pas un copier-coller).
    for (const m of own.matchAll(/pageAlternates\(\s*locale,\s*([`'])([^`']*)\1/g)) {
      const expected = route(page);
      const pattern = new RegExp(`^${expected.replace(/\[\w+\]/g, '\\$\\{[^}]+\\}')}$`);
      if (!pattern.test(m[2])) found.push(`${rel} : pageAlternates('${m[2]}') au lieu de '${expected}'`);
    }
  }
  assert.ok(pages(appDir).length > 25, 'pages introuvables');
  assert.deepEqual(found, []);
});

test('pages rédigées en français seulement : hreflang fr et x-default, sans en', () => {
  // Fiches cas clients (src/lib/case-studies.ts) et LP Thaïs : contenu en dur en français.
  const frOnly = [
    join(appDir, '(main)', 'ressources', 'cas-clients', '[slug]', 'page.tsx'),
    ...['thais', 'thais-v2', 'thais-v3'].map((d) => join(appDir, '(lp)', 'lp', d, 'layout.tsx')),
  ];
  for (const file of frOnly) assert.match(readFileSync(file, 'utf8'), /pageAlternates\([^)]*, \['fr'\]\)/, file);
});

test("layout [locale] : alternates de l'accueil via pageAlternates, même forme que les pages", () => {
  assert.match(readFileSync(join(appDir, 'layout.tsx'), 'utf8'), /alternates: pageAlternates\(locale, ''\)/);
});
