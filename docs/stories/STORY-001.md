# STORY-001: Blog infrastructure & MDX setup

**Epic:** EPIC-003 (Blog System)
**Priority:** Must Have
**Story Points:** 5
**Status:** Not Started
**Assigned To:** Unassigned
**Created:** 2026-01-31
**Sprint:** 1

---

## User Story

As a developer
I want to set up the MDX blog infrastructure
So that articles can be rendered from content files

---

## Description

### Background

Le site TriggerFlow dispose d'une page `/blog` avec 6 articles placeholder hardcodés dans un composant client (`BlogContent.tsx`). Il n'existe aucune infrastructure de contenu : pas de dossier `content/`, pas de parsing MDX, pas de types pour les articles. Cette story met en place les fondations du blog : packages, types, structure de fichiers, utilitaires de lecture, et un article de test pour valider le pipeline.

### Scope

**In scope :**
- Installation des packages MDX (next-mdx-remote, gray-matter, reading-time)
- Création du dossier `content/blog/` avec sous-dossiers par silo
- Fichier de données `src/data/silos.ts` (5 silos)
- Types TypeScript pour Article, Silo, ArticleImage, InternalLink, ExternalLink
- Bibliothèque `src/lib/blog.ts` avec fonctions utilitaires
- Un article MDX de test pour valider le pipeline de lecture

**Out of scope :**
- Pages de rendu (STORY-002)
- Composants MDX personnalisés (STORY-002)
- Pages listing et navigation par silo (STORY-003)
- SEO et structured data (STORY-004)
- Script d'import (STORY-005)

---

## User Flow

1. Un fichier `.mdx` est placé dans `content/blog/{silo-slug}/`
2. Le fichier contient un frontmatter YAML complet + du contenu MDX
3. `lib/blog.ts` peut lire, parser et retourner l'article avec ses métadonnées
4. Les fonctions utilitaires permettent de lister, filtrer par silo, et générer une table des matières

---

## Acceptance Criteria

- [ ] Packages installés : `next-mdx-remote`, `gray-matter`, `reading-time`
- [ ] Dossier `content/blog/` créé avec sous-dossiers : `automatisation/`, `experience-client/`, `revenue-upselling/`, `tech-integrations/`, `guides/`
- [ ] `src/data/silos.ts` créé avec les 5 silos (id, nom, slug, description) — données FR et EN via les traductions existantes ou en dur
- [ ] Types TypeScript définis dans `src/types/blog.ts` :
  - `Article` — toutes les métadonnées frontmatter + content + locale
  - `Silo` — id, nom, slug, description
  - `ArticleImage` — id, filename, alt, placement, width, height, model, prompt
  - `InternalLink` — fichier, ancre, contexte
  - `ExternalLink` — url, ancre, contexte
  - `TOCItem` — id, text, level
- [ ] `src/lib/blog.ts` implémenté avec :
  - `getAllArticles(locale: string): Article[]` — lit tous les MDX du dossier, parse le frontmatter, filtre par locale
  - `getArticleBySlug(silo: string, slug: string, locale: string): Article | null` — retourne un article par silo+slug+locale
  - `getArticlesBySilo(siloSlug: string, locale: string): Article[]` — articles d'un silo donné
  - `getSilos(): Silo[]` — retourne la liste des silos
  - `generateTableOfContents(content: string): TOCItem[]` — extrait les headings H2/H3 du contenu MDX
- [ ] Un article MDX de test créé dans `content/blog/automatisation/test-article.mdx` avec :
  - Frontmatter complet conforme à la structure définie dans `PROMPT-REDACTION-ARTICLES.md`
  - Contenu avec des headings H2/H3
  - Marqueurs image `<ImageBlock />` (le composant n'existe pas encore, c'est normal)
  - Locale `fr`
- [ ] Les fonctions de `lib/blog.ts` retournent correctement l'article de test (vérifiable en important dans un composant ou via `console.log` dans le dev server)
- [ ] Aucune erreur TypeScript (`npm run type-check`)
- [ ] Aucune erreur ESLint (`npm run lint`)
- [ ] Build réussi (`npm run build`)

---

## Technical Notes

### Packages à installer

```bash
npm install next-mdx-remote gray-matter reading-time
```

### Structure des fichiers à créer

```
content/
└── blog/
    ├── automatisation/        # Silo S1
    │   └── test-article.mdx   # Article de test
    ├── experience-client/     # Silo S2
    ├── revenue-upselling/     # Silo S3
    ├── tech-integrations/     # Silo S4
    └── guides/                # Silo S5

src/
├── types/
│   └── blog.ts               # Types Article, Silo, etc.
├── data/
│   └── silos.ts              # Définitions des 5 silos
└── lib/
    └── blog.ts               # Fonctions utilitaires blog
```

### Détails d'implémentation `lib/blog.ts`

- Utiliser `fs.readdirSync` / `fs.readFileSync` pour lire les fichiers (exécution côté serveur uniquement, dans les Server Components ou `generateStaticParams`)
- Utiliser `gray-matter` pour parser le frontmatter YAML
- Utiliser `reading-time` pour calculer le temps de lecture
- Le frontmatter suit la structure du `PROMPT-REDACTION-ARTICLES.md` (champs snake_case côté YAML, camelCase côté TypeScript)
- Les articles sont localisés par un champ `locale` dans le frontmatter (pas par sous-dossier de locale)
- Le tri par défaut est par `date_publication` décroissant

### Définition des 5 silos

```typescript
// src/data/silos.ts
export const silos: Silo[] = [
  { id: 'S1', nom: 'Automatisation hôtelière', slug: 'automatisation', description: 'Workflows, scénarios, triggers et automation pour hôtels' },
  { id: 'S2', nom: 'Expérience client', slug: 'experience-client', description: 'Parcours client, satisfaction, avis et personnalisation' },
  { id: 'S3', nom: 'Revenue & Upselling', slug: 'revenue-upselling', description: 'Revenus directs, upselling, fidélisation et réservations directes' },
  { id: 'S4', nom: 'Tech & Intégrations', slug: 'tech-integrations', description: 'PMS, intégrations, API et solutions techniques' },
  { id: 'S5', nom: 'Guides pratiques', slug: 'guides', description: 'Tutoriels, comparatifs et guides métier hôtelier' },
];
```

### Compatibilité next-mdx-remote avec Next.js 16

- Utiliser `next-mdx-remote/rsc` pour le support React Server Components
- L'import se fait via `import { MDXRemote } from 'next-mdx-remote/rsc'` (sera utilisé dans STORY-002, mais le package est installé ici)
- Si incompatibilité avec Next.js 16, fallback vers `@next/mdx` (cf. architecture doc)

### Article de test — frontmatter attendu

Le frontmatter doit inclure tous les champs définis dans `PROMPT-REDACTION-ARTICLES.md` : silo, silo_nom, type, title, meta_description, slug, mot_cle_principal, mots_cles_secondaires, date_publication, persona_cible, cta_principal, fonctionnalites_mises_en_avant, pms_mentionnes, liens_internes, liens_externes, images, et un champ `locale: fr`.

### Edge Cases

- Dossier de silo vide (pas d'articles) → `getArticlesBySilo` retourne `[]`
- Frontmatter incomplet → log un warning et skip l'article (ne pas crasher)
- Fichier non-MDX dans le dossier → ignorer
- Article sans locale → default à `fr`

### Ne PAS modifier

- Le composant `BlogContent.tsx` existant (sera remplacé dans STORY-002/003)
- La page `/blog/page.tsx` existante
- Les traductions existantes dans `messages/fr.json` et `en.json`

---

## Dependencies

**Prerequisite Stories:**
- Aucune (c'est la première story du sprint)

**Blocked Stories:**
- STORY-002: Blog article page & MDX components (a besoin de l'infra MDX)
- STORY-003: Blog listing pages & silo navigation (a besoin de `lib/blog.ts`)
- STORY-004: Blog SEO & structured data (a besoin des articles)
- STORY-005: Article import pipeline (a besoin de la structure `content/blog/`)

**External Dependencies:**
- Aucune

---

## Definition of Done

- [ ] Packages `next-mdx-remote`, `gray-matter`, `reading-time` installés
- [ ] Dossier `content/blog/` avec 5 sous-dossiers silo créés
- [ ] `src/types/blog.ts` avec tous les types définis
- [ ] `src/data/silos.ts` avec les 5 silos
- [ ] `src/lib/blog.ts` avec toutes les fonctions utilitaires
- [ ] Article MDX de test avec frontmatter complet
- [ ] TypeScript : aucune erreur (`npm run type-check`)
- [ ] ESLint : aucune erreur (`npm run lint`)
- [ ] Build réussi (`npm run build`)
- [ ] Les fonctions `getAllArticles('fr')` et `getArticleBySlug('automatisation', 'test-article', 'fr')` retournent des données valides

---

## Story Points Breakdown

- **Types & data** : 1 point (types blog.ts + silos.ts)
- **lib/blog.ts** : 2 points (5 fonctions, lecture filesystem, parsing frontmatter)
- **Setup packages & structure** : 1 point (installation, dossiers, config)
- **Article de test & validation** : 1 point
- **Total :** 5 points

**Rationale :** Complexité modérée — principalement du file I/O, parsing YAML, et définition de types. Le risque principal est la compatibilité de `next-mdx-remote` avec Next.js 16.

---

## Progress Tracking

**Status History:**
- 2026-01-31: Created

**Actual Effort:** TBD

---

**This story was created using BMAD Method v6 — Phase 4 (Implementation Planning)**
