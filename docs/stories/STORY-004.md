# STORY-004: Blog SEO & structured data

**Epic:** EPIC-003 (Blog System)
**Priority:** Must Have
**Story Points:** 3
**Status:** Not Started
**Assigned To:** Unassigned
**Created:** 2026-01-31
**Sprint:** 2

---

## User Story

As a search engine
I want structured data and proper metadata on blog pages
So that articles are well indexed and display rich snippets

---

## Description

### Background

Le blog TriggerFlow dispose de pages articles (STORY-002) et de pages listing (STORY-003) fonctionnelles. Les articles ont déjà des Open Graph / Twitter Card metadata via `generateMetadata()`. Cependant, il manque :
- Les schémas JSON-LD `BlogPosting` et `BreadcrumbList` pour les rich snippets Google
- L'extension du sitemap pour inclure les pages blog
- Une table des matières (TOC) pour les articles longs

Le site a déjà un composant `JsonLd.tsx` dans `src/components/seo/` avec des schémas Organization, SoftwareApplication, FAQ, et Website. Il faut étendre ce pattern pour le blog.

### Scope

**In scope :**
- Schema.org `BlogPosting` JSON-LD sur chaque page article
- Schema.org `BreadcrumbList` JSON-LD sur les pages listing et articles
- Extension du `sitemap.ts` pour inclure toutes les pages blog
- Composant `TableOfContents` pour les articles longs (> 1500 mots)
- Vérification des meta tags existants (OG, Twitter, canonical, hreflang)

**Out of scope :**
- Schema.org `ItemList` pour les listings (nice-to-have, pas critique)
- Google Search Console configuration
- Performance optimization (image lazy loading est déjà géré par next/image)
- RSS feed (futur)

---

## User Flow

1. Un moteur de recherche crawle `/blog/automatisation/test-article`
2. Il trouve le JSON-LD `BlogPosting` avec title, description, author, datePublished, image
3. Il trouve le JSON-LD `BreadcrumbList` : Blog > Automatisation > Article
4. Il indexe l'article avec les données structurées
5. L'article peut apparaître dans Google avec un rich snippet (breadcrumb, date, image)
6. Le sitemap XML inclut toutes les URLs blog pour faciliter le crawl

---

## Acceptance Criteria

- [ ] Schema.org `BlogPosting` JSON-LD sur chaque page article :
  - `headline`, `description`, `author` (Organization TriggerFlow)
  - `datePublished`, `dateModified`
  - `image` (hero image si disponible)
  - `publisher` (Organization TriggerFlow avec logo)
  - `mainEntityOfPage` (URL canonique)
  - `wordCount`, `articleSection` (silo)
  - `keywords` (mot clé principal + secondaires)
- [ ] Schema.org `BreadcrumbList` JSON-LD :
  - Sur les pages listing par silo : Blog > {Silo}
  - Sur les pages article : Blog > {Silo} > {Article Title}
  - Utilise les URLs correctes et localisées
- [ ] `sitemap.ts` étendu pour inclure :
  - `/blog` (listing global) en FR et EN
  - `/blog/{silo}` pour chaque silo en FR et EN (10 entrées)
  - Tous les articles de blog en FR et EN
  - Priorité : 0.8 pour listing, 0.7 pour articles
  - changeFrequency : weekly pour listings, monthly pour articles
- [ ] Composant `TableOfContents` :
  - Affiché uniquement pour les articles > 1500 mots
  - Sticky en sidebar sur desktop (à droite du contenu)
  - Liste les H2 et H3 avec liens ancres
  - Utilise `generateTableOfContents()` existant de `lib/blog.ts`
  - Responsive : en haut de l'article sur mobile (collapsible)
- [ ] Les meta tags existants (OG, Twitter, canonical, hreflang) restent fonctionnels
- [ ] Aucune erreur TypeScript (`npm run type-check`)
- [ ] Build réussi (`npm run build`)

---

## Technical Notes

### Architecture des fichiers

```
src/
├── components/
│   ├── seo/
│   │   ├── JsonLd.tsx                   # EXISTANT — étendre avec BlogPostingJsonLd, BreadcrumbListJsonLd
│   │   └── index.ts                     # EXISTANT — mettre à jour exports
│   └── blog/
│       └── TableOfContents.tsx          # NOUVEAU
├── app/
│   ├── sitemap.ts                       # EXISTANT — étendre
│   └── [locale]/(blog)/blog/
│       ├── [silo]/
│       │   ├── page.tsx                 # MODIFIER — ajouter BreadcrumbList JSON-LD
│       │   └── [slug]/
│       │       └── page.tsx             # MODIFIER — ajouter BlogPosting + BreadcrumbList JSON-LD + TOC
│       └── page.tsx                     # Pas de modification nécessaire
```

### BlogPostingJsonLd

Nouveau composant dans `JsonLd.tsx` :

```tsx
interface BlogPostingJsonLdProps {
  article: Article;
  locale: string;
}

export function BlogPostingJsonLd({ article, locale }: BlogPostingJsonLdProps) {
  const url = `${baseUrl}/${locale}/blog/${article.siloSlug}/${article.slug}`;
  const heroImage = article.images.find(img => img.id === 'hero');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.metaDescription,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: article.datePublication,
    dateModified: article.dateMiseAJour,
    wordCount: article.longueurMots,
    articleSection: article.siloNom,
    keywords: [article.motClePrincipal, ...article.motsClesSecondaires].join(', '),
    inLanguage: locale === 'fr' ? 'fr-FR' : 'en-US',
    author: {
      '@type': 'Organization',
      name: 'TriggerFlow',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TriggerFlow',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/logo.png` },
    },
    ...(heroImage && {
      image: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/blog/${article.slug}/${heroImage.filename}`,
        width: heroImage.width,
        height: heroImage.height,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### BreadcrumbListJsonLd

```tsx
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbListJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbListJsonLd({ items }: BreadcrumbListJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Extension du sitemap

Le `sitemap.ts` actuel ne contient que 5 pages (homepage + 4 legal). Il faut ajouter :
1. La page listing globale `/blog` (FR + EN)
2. Les 5 pages silo `/blog/{slug}` (FR + EN = 10 entrées)
3. Tous les articles de blog (FR + EN)

Pour les articles, importer `getAllArticles` et `getSilos` depuis `lib/blog.ts`.

**Attention :** `sitemap.ts` s'exécute au build time, donc l'accès filesystem via `lib/blog.ts` fonctionne normalement.

### Composant TableOfContents

```tsx
interface TableOfContentsProps {
  items: TOCItem[];
  title: string;  // e.g. "Sommaire" / "Table of Contents"
}
```

- **Desktop :** sidebar sticky (`position: sticky; top: 6rem`) à droite du contenu
- **Mobile :** collapsible au-dessus de l'article (summary/details ou state)
- Changer le layout de l'article de `max-w-3xl` à un grid `lg:grid-cols-[1fr_250px]` quand le TOC est présent
- Liens ancres : `href="#heading-id"` avec `scroll-behavior: smooth`
- Le `generateTableOfContents()` de `lib/blog.ts` fournit les `id` normalisés

### Intégration dans la page article

Le layout de la page article doit changer quand un TOC est présent :

```tsx
// Dans ArticlePage
const toc = generateTableOfContents(article.content);
const showToc = article.longueurMots > 1500 && toc.length > 2;

// Si TOC, utiliser un layout grid
// Sinon, garder le layout actuel max-w-3xl
```

### Priorités sitemap

| Type | Priorité FR | Priorité EN | changeFrequency |
|------|-------------|-------------|-----------------|
| `/blog` | 0.8 | 0.7 | weekly |
| `/blog/{silo}` | 0.7 | 0.6 | weekly |
| Article | 0.6 | 0.5 | monthly |

### Traductions à ajouter

```json
// messages/fr.json — sous "blog"
{
  "toc": {
    "title": "Sommaire",
    "show": "Voir le sommaire",
    "hide": "Masquer le sommaire"
  }
}
```

### Edge Cases

- Article sans image hero → pas de champ `image` dans le BlogPosting schema
- Article avec 0 mots (impossible mais défensif) → pas de TOC
- TOC avec un seul heading → pas de TOC affiché (minimum 3 items)
- Sitemap avec 0 articles → ne pas crasher, lister uniquement les pages statiques

---

## Dependencies

**Prerequisite Stories:**
- STORY-001: Blog infrastructure (fournit `lib/blog.ts`, `generateTableOfContents()`)
- STORY-002: Blog article page (page à modifier pour ajouter JSON-LD + TOC)
- STORY-003: Blog listing pages (pages silo à modifier pour BreadcrumbList)

**Blocked Stories:**
- Aucune

**External Dependencies:**
- Aucune

---

## Definition of Done

- [ ] `BlogPostingJsonLd` rendu sur chaque page article
- [ ] `BreadcrumbListJsonLd` rendu sur pages silo et article
- [ ] Sitemap inclut toutes les pages blog (vérifiable via `/sitemap.xml`)
- [ ] TOC affiché sur les articles > 1500 mots avec liens ancres fonctionnels
- [ ] Schemas validables via Google Rich Results Test (structure correcte)
- [ ] Les meta tags existants (OG, Twitter, canonical) non cassés
- [ ] TypeScript : aucune erreur (`npm run type-check`)
- [ ] Build réussi (`npm run build`)

---

## Story Points Breakdown

- **JSON-LD schemas (BlogPosting + BreadcrumbList)** : 1 point
- **Sitemap extension** : 0.5 point
- **TableOfContents component + layout change** : 1 point
- **Integration + validation** : 0.5 point
- **Total :** 3 points

**Rationale :** Complexité faible à modérée — les patterns JSON-LD et sitemap existent déjà dans le codebase. Le TOC est le morceau le plus complexe (layout grid, sticky, responsive).

---

## Progress Tracking

**Status History:**
- 2026-01-31: Created

**Actual Effort:** TBD

---

**This story was created using BMAD Method v6 — Phase 4 (Implementation Planning)**
