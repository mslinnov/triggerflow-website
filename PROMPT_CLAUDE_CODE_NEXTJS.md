# Prompt Claude Code — Refonte des pages légales TriggerFlow (Next.js)

> À coller dans Claude Code, **à la racine du projet Next.js `trigger-flow.com`**.
> Référence préalable : voir `LEGAL_PAGES_AUDIT.md` à la racine, qui décrit la stack et la structure existante.

---

## Contexte

Tu vas refondre les 4 pages légales existantes (CGV, CGU, mentions légales, politique de confidentialité) et ajouter 2 nouvelles pages (Contrat de prestation type, DPA / Accord de sous-traitance RGPD).

L'audit `LEGAL_PAGES_AUDIT.md` à la racine décrit la stack Next.js 16 + App Router + next-intl + Tailwind v4 + `@tailwindcss/typography`, et recommande de migrer vers **MDX** (déjà installé via `next-mdx-remote` pour le blog). Tu vas appliquer cette recommandation.

**Objectifs** :

1. Refondre les 4 pages existantes en MDX (sortir le contenu des fichiers `messages/fr.json` / `messages/en.json`).
2. Ajouter les 2 nouvelles pages (Contrat de prestation type + DPA) dont le contenu MDX sera fourni séparément.
3. Factoriser le rendu via un composant unique `<LegalPageLayout>` et une route dynamique `[slug]`.
4. Corriger les incohérences SEO/sitemap identifiées dans l'audit.
5. Mettre à jour le footer pour ajouter les nouvelles entrées.

---

## Phase 1 — Architecture du contenu MDX

### 1.1 Structure de dossiers à créer

```
content/legal/
└── fr/
    ├── cgv.mdx
    ├── cgu.mdx
    ├── mentions-legales.mdx
    ├── politique-confidentialite.mdx
    ├── contrat-prestation.mdx     ← nouveau
    └── dpa.mdx                    ← nouveau
```

**Pour la V1, uniquement la locale FR.** Les versions EN seront ajoutées plus tard (le site est principalement FR-first).

### 1.2 Frontmatter standard

Chaque fichier MDX commence par un frontmatter YAML strict :

```yaml
---
title: "Conditions Générales de Vente"
slug: "cgv"
version: "2.0"
effectiveDate: "2026-05-14"
lastUpdated: "2026-05-14"
metaTitle: "Conditions Générales de Vente — TriggerFlow"
metaDescription: "Conditions générales de vente de la solution TriggerFlow..."
---
```

Les dates sont en ISO 8601 (`YYYY-MM-DD`). Le formatage à l'affichage utilise `next-intl` `useFormatter`.

### 1.3 Contenu MDX

**Le contenu MDX des 6 documents te sera fourni séparément** (pack de fichiers `cgv.mdx`, `cgu.mdx`, `dpa.mdx`, `contrat-prestation.mdx`, `mentions-legales.mdx`, `politique-confidentialite.mdx`).

Pour `mentions-legales.mdx` et `politique-confidentialite.mdx`, **migre le contenu existant** des fichiers `messages/fr.json` (clés `legalPages.legalNotice` et `legalPages.privacy`) vers le format MDX. **Garde le contenu identique** pour ces deux pages (pas de refonte juridique).

---

## Phase 2 — Loader MDX

### 2.1 Crée `src/lib/legal.ts`

Module utilitaire qui charge et parse les fichiers MDX :

```typescript
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface LegalDocFrontmatter {
  title: string;
  slug: string;
  version: string;
  effectiveDate: string;
  lastUpdated: string;
  metaTitle: string;
  metaDescription: string;
}

export interface LegalDoc {
  frontmatter: LegalDocFrontmatter;
  content: string;
}

const LEGAL_DIR = path.join(process.cwd(), 'content/legal');

const KNOWN_SLUGS = [
  'cgv',
  'cgu',
  'mentions-legales',
  'politique-confidentialite',
  'contrat-prestation',
  'dpa',
] as const;

export type LegalSlug = typeof KNOWN_SLUGS[number];

export function isLegalSlug(value: string): value is LegalSlug {
  return (KNOWN_SLUGS as readonly string[]).includes(value);
}

export async function getLegalDoc(
  slug: LegalSlug,
  locale: 'fr' | 'en' = 'fr'
): Promise<LegalDoc | null> {
  // Fallback vers fr si la locale demandée n'a pas le fichier
  const candidates = [
    path.join(LEGAL_DIR, locale, `${slug}.mdx`),
    path.join(LEGAL_DIR, 'fr', `${slug}.mdx`),
  ];

  for (const filePath of candidates) {
    try {
      const raw = await fs.readFile(filePath, 'utf-8');
      const { data, content } = matter(raw);
      return {
        frontmatter: data as LegalDocFrontmatter,
        content,
      };
    } catch (err) {
      // Le fichier n'existe pas, on tente le suivant
    }
  }

  return null;
}

export function getAllLegalSlugs(): readonly LegalSlug[] {
  return KNOWN_SLUGS;
}
```

### 2.2 Vérification Cloudflare Pages

L'audit précise que le site tourne sur `@opennextjs/cloudflare`. La lecture filesystem au build (SSG) doit fonctionner. Si Claude Code repère un problème spécifique avec le runtime Cloudflare Workers (ex. import dynamique de `fs` non disponible), il faut basculer vers une approche `import.meta.glob` ou inliner le contenu au build via un script Node préalable. **Vérifie ce point avant d'aller plus loin.**

---

## Phase 3 — Composant de layout réutilisable

### 3.1 Crée `src/components/legal/LegalPageLayout.tsx`

Wrapper unifié pour toutes les pages légales :

```tsx
import { Container } from '@/components/ui';
import { ReactNode } from 'react';
import { useFormatter } from 'next-intl';

interface LegalPageLayoutProps {
  title: string;
  version?: string;
  effectiveDate?: string;
  lastUpdated?: string;
  children: ReactNode;
}

export function LegalPageLayout({
  title,
  version,
  effectiveDate,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  const format = useFormatter();

  return (
    <main className="bg-white py-24 md:py-32">
      <Container>
        <article className="prose prose-zinc mx-auto max-w-3xl">
          <header className="not-prose mb-10">
            <h1 className="text-3xl font-bold text-brand-dark md:text-4xl">
              {title}
            </h1>
            {(version || effectiveDate || lastUpdated) && (
              <div className="mt-3 text-sm text-zinc-500 space-y-0.5">
                {version && <p>Version {version}</p>}
                {effectiveDate && (
                  <p>
                    En vigueur depuis le{' '}
                    {format.dateTime(new Date(effectiveDate), {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                )}
                {lastUpdated && lastUpdated !== effectiveDate && (
                  <p>
                    Dernière modification le{' '}
                    {format.dateTime(new Date(lastUpdated), {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                )}
              </div>
            )}
          </header>
          {children}
        </article>
      </Container>
    </main>
  );
}
```

### 3.2 Composants MDX personnalisés

Si nécessaire, expose un mapping `mdxComponents` pour customiser le rendu (utile pour les tableaux ou les `<Callout>` existants du blog). Réutilise les composants `<Callout>` et `<InternalLink>` déjà présents dans le projet (cf. audit, ils sont définis pour les MDX du blog).

---

## Phase 4 — Route dynamique unique

### 4.1 Crée `src/app/[locale]/(main)/[legalSlug]/page.tsx`

> ⚠️ Note de routing : cette route capture **tous les premiers segments** sous `(main)`. Pour éviter de capturer les routes statiques existantes (`/tarifs`, `/blog`, `/contact`, etc.), tu dois soit :
>
> - **Option A (recommandée)** : Garder les fichiers de pages individuels (un par slug légal) mais leur faire tous appeler le même composant rendu. Plus explicite, pas de conflit de routing.
> - **Option B** : Utiliser un `generateStaticParams` qui ne déclare QUE les 6 slugs légaux, mais le routeur peut quand même essayer de matcher en dynamique pour des slugs inconnus → conflit.
>
> **Va sur l'Option A.**

### 4.2 Option A — 6 fichiers de pages individuels mais factorisés

Crée d'abord le composant partagé `src/components/legal/LegalPageRenderer.tsx` :

```tsx
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { LegalPageLayout } from './LegalPageLayout';
import { getLegalDoc, type LegalSlug } from '@/lib/legal';
import { mdxComponents } from '@/components/mdx/mdxComponents'; // À créer ou réutiliser celui du blog

interface LegalPageRendererProps {
  slug: LegalSlug;
  locale: 'fr' | 'en';
}

export async function LegalPageRenderer({ slug, locale }: LegalPageRendererProps) {
  const doc = await getLegalDoc(slug, locale);

  if (!doc) {
    notFound();
  }

  return (
    <LegalPageLayout
      title={doc.frontmatter.title}
      version={doc.frontmatter.version}
      effectiveDate={doc.frontmatter.effectiveDate}
      lastUpdated={doc.frontmatter.lastUpdated}
    >
      <MDXRemote source={doc.content} components={mdxComponents} />
    </LegalPageLayout>
  );
}

export async function buildLegalMetadata(slug: LegalSlug, locale: 'fr' | 'en') {
  const doc = await getLegalDoc(slug, locale);
  if (!doc) return {};
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.trigger-flow.com';
  
  return {
    title: doc.frontmatter.metaTitle,
    description: doc.frontmatter.metaDescription,
    alternates: {
      canonical: `${baseUrl}/${locale}/${slug}`,
      languages: {
        'fr-FR': `${baseUrl}/fr/${slug}`,
        'en-US': `${baseUrl}/en/${slug}`,
      },
    },
  };
}
```

### 4.3 Refonte de chaque page

Refactor les 4 pages existantes pour qu'elles utilisent `<LegalPageRenderer>` :

**`src/app/[locale]/(main)/cgv/page.tsx`** :

```tsx
import { setRequestLocale } from 'next-intl/server';
import { LegalPageRenderer, buildLegalMetadata } from '@/components/legal/LegalPageRenderer';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'fr' | 'en' }> }) {
  const { locale } = await params;
  return buildLegalMetadata('cgv', locale);
}

export default async function Page({ params }: { params: Promise<{ locale: 'fr' | 'en' }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPageRenderer slug="cgv" locale={locale} />;
}
```

Applique le même pattern aux 5 autres pages (`cgu`, `mentions-legales`, `politique-confidentialite`, `contrat-prestation`, `dpa`) — chaque page est de 10 lignes max.

### 4.4 Nettoyage `messages/*.json`

Supprime les namespaces désormais inutiles dans `messages/fr.json` et `messages/en.json` :
- `legalPages.terms` (CGV)
- `legalPages.termsOfUse` (CGU)
- `legalPages.legalNotice` (mentions légales)
- `legalPages.privacy` (politique de confidentialité)

**Vérifie au préalable** qu'aucun autre composant ne consomme ces clés (`rg "legalPages\." src/`).

---

## Phase 5 — Footer

### 5.1 Mise à jour `src/components/layout/Footer.tsx`

Dans la section "Légal", ajoute les deux nouvelles entrées après "CGU" :

```tsx
<FooterLink href="/contrat-prestation">{t('footer.legal.serviceAgreement')}</FooterLink>
<FooterLink href="/dpa">{t('footer.legal.dpa')}</FooterLink>
```

### 5.2 Traductions footer

Ajoute dans `messages/fr.json` :

```json
"footer": {
  "legal": {
    "serviceAgreement": "Contrat de prestation",
    "dpa": "Accord RGPD (DPA)"
  }
}
```

Et l'équivalent EN.

### 5.3 Footer des landing pages Thais

L'audit signale que les footers des landing pages Thais (`v1`, `v2`, `v3`) utilisent des href codés en dur (`/fr/cgv`, `/fr/cgu`). Ajoute les deux nouveaux liens à ces footers aussi, sur le même format.

---

## Phase 6 — Sitemap

### 6.1 Correction de `src/app/sitemap.ts`

L'audit signale que le sitemap pointe vers `/en/legal-notice`, `/en/terms-of-sale`, etc. qui n'existent pas. **Aligne le sitemap sur les URLs réelles** (slugs FR identiques sur les deux locales) :

```typescript
const legalSlugs = ['cgv', 'cgu', 'mentions-legales', 'politique-confidentialite', 'contrat-prestation', 'dpa'];
const legalEntries = legalSlugs.flatMap(slug => [
  { url: `${baseUrl}/fr/${slug}`, lastModified: ..., changeFrequency: 'yearly', priority: 0.3 },
  { url: `${baseUrl}/en/${slug}`, lastModified: ..., changeFrequency: 'yearly', priority: 0.3 },
]);
```

Pour `lastModified`, lis le frontmatter `lastUpdated` du fichier MDX correspondant (au build).

---

## Phase 7 — Corrections SEO

### 7.1 Double suffixe titre

L'audit signale que le root layout définit `'%s | TriggerFlow'` mais que les pages légales renvoient déjà un titre complet → double suffixe. **Aligne** : dans le frontmatter, mets `metaTitle` SANS le suffixe `| TriggerFlow`, et laisse le template root layout l'ajouter.

Frontmatter à corriger en conséquence :

```yaml
metaTitle: "Conditions Générales de Vente"
```

Et non plus `"Conditions Générales de Vente — TriggerFlow"`.

> ⚠️ Adapte le contenu des fichiers MDX fournis en fonction de ce point.

### 7.2 Canonical et alternates

Déjà inclus dans `buildLegalMetadata()` ci-dessus. Vérifie que ça fonctionne et que `NEXT_PUBLIC_BASE_URL` est défini en env (sinon fallback hardcodé).

---

## Phase 8 — Tests et vérifications

### 8.1 Build local

```
pnpm build
```

(ou `npm run build` selon le package manager du projet — vérifier `pnpm-lock.yaml` ou `package-lock.json`)

Doit passer sans erreur. Si erreur Cloudflare Workers liée à `fs`, revoir l'approche selon §2.2.

### 8.2 Routes à vérifier visuellement

- `/fr/cgv` ✅ doit afficher la nouvelle CGV v2.0
- `/fr/cgu` ✅ doit afficher la nouvelle CGU v2.0
- `/fr/mentions-legales` ✅ contenu inchangé
- `/fr/politique-confidentialite` ✅ contenu inchangé
- `/fr/contrat-prestation` ✅ nouvelle page
- `/fr/dpa` ✅ nouvelle page
- `/fr/legal-machin-qui-existe-pas` ✅ doit donner 404
- `/en/cgv` ✅ doit afficher la CGV FR par fallback (jusqu'à création EN)

### 8.3 SEO

- Vérifie que `view-source:` sur chaque page contient bien `<link rel="canonical">` et les `<link rel="alternate" hreflang="...">`.
- Vérifie `/sitemap.xml` : 12 entrées légales (6 slugs × 2 locales).

### 8.4 Lighthouse

Score SEO et accessibilité ≥ 95 sur les pages légales.

---

## Phase 9 — Documentation

Crée `docs/legal-pages.md` à la racine du projet :

- Comment ajouter une nouvelle page légale
- Comment mettre à jour le contenu d'une page existante (édition MDX + bump `version` + `lastUpdated`)
- Stratégie de versioning (tag Git `legal-vX.Y` à chaque release)
- Comment ajouter la version EN d'un document plus tard

---

## Hors scope (à NE PAS faire)

- ❌ Ne pas créer les versions EN des MDX (sera fait plus tard manuellement)
- ❌ Ne pas modifier le contenu de `mentions-legales` ni `politique-confidentialite` (seulement migrer JSON → MDX)
- ❌ Ne pas ajouter de CMS headless
- ❌ Ne pas casser les autres pages du site
- ❌ Ne pas modifier le blog (qui utilise déjà MDX dans son coin)

---

## Avant de commencer

1. **Relis `LEGAL_PAGES_AUDIT.md`** intégralement.
2. **Demande-moi les 6 fichiers MDX** (`cgv.mdx`, `cgu.mdx`, `dpa.mdx`, `contrat-prestation.mdx`, `mentions-legales.mdx`, `politique-confidentialite.mdx`) que je dois te fournir séparément.
3. Confirme-moi :
   - Le package manager utilisé (`pnpm`, `npm`, `yarn`) → check le lockfile
   - Si `gray-matter` est déjà installé (sinon `pnpm add gray-matter`)
   - L'emplacement exact des composants `<Callout>` / `<InternalLink>` MDX du blog pour les réutiliser
   - Si la lecture filesystem au build (`fs.readFile`) est compatible avec le déploiement Cloudflare Pages actuel (point clé — l'auditeur soulève le doute)
4. Si l'un de ces points pose problème, **pose-moi la question avant d'écrire le code**.

Lance-toi.
