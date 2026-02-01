# STORY-003: Blog listing pages & silo navigation

**Epic:** EPIC-003 (Blog System)
**Priority:** Must Have
**Story Points:** 5
**Status:** Not Started
**Assigned To:** Unassigned
**Created:** 2026-01-31
**Sprint:** 2

---

## User Story

As a visitor
I want to browse blog articles by category
So that I can find content relevant to my needs

---

## Description

### Background

Le blog TriggerFlow dispose actuellement d'une page `/blog` dans le route group `(main)` qui affiche un contenu placeholder hardcodé (`BlogContent.tsx`) avec 6 faux articles et des catégories statiques. L'infrastructure MDX est en place (STORY-001) et les articles se rendent individuellement (STORY-002) dans le route group `(blog)`.

Cette story remplace le contenu placeholder par de vraies pages de listing qui lisent les articles depuis `content/blog/` via `lib/blog.ts`, avec navigation par silo, pagination, et composants réutilisables.

### Scope

**In scope :**
- Déplacement de la page `/blog` du route group `(main)` vers `(blog)`
- Page listing globale `/blog` avec tous les articles + filtrage par silo
- Pages listing par silo `/blog/[silo]` avec `generateStaticParams()`
- Composants : `ArticleCard`, `ArticleList`, `SiloNav`, `BlogBreadcrumb`
- Pagination statique (par query params ou par page)
- Breadcrumb navigation (Blog > Silo > Article)
- Traductions FR/EN

**Out of scope :**
- SEO & structured data (STORY-004)
- Table des matières sticky (STORY-004)
- Recherche / search (futur)
- Article featured en page d'accueil (futur)

---

## User Flow

### Listing global `/blog`
1. Le visiteur accède à `/blog`
2. Il voit un hero avec le titre du blog
3. Il voit la `SiloNav` — boutons/tabs pour les 5 silos + "Tous"
4. Il voit la grille d'articles (les plus récents en premier)
5. Il peut cliquer un silo pour filtrer
6. Il peut naviguer la pagination en bas de page
7. Il clique sur un `ArticleCard` → redirigé vers `/blog/{silo}/{slug}`

### Listing par silo `/blog/[silo]`
1. Le visiteur accède à `/blog/automatisation` (par exemple)
2. Il voit le breadcrumb : Blog > Automatisation hôtelière
3. Il voit la description du silo en haut
4. Les articles pilier sont mis en avant (design différencié)
5. Les articles support/satellite sont listés en dessous
6. La `SiloNav` est visible avec le silo actif marqué
7. Il peut naviguer entre silos via la `SiloNav`

---

## Acceptance Criteria

- [ ] Page `/blog/page.tsx` dans le route group `(blog)` :
  - Listing de tous les articles via `getAllArticles(locale)`, les plus récents en premier
  - Filtrage par silo via `SiloNav` (tabs ou boutons)
  - Pagination : 9 articles par page (3x3 desktop)
  - Hero section reprise de l'existant (titre + sous-titre)
  - `generateMetadata()` avec title, description
- [ ] Page `/blog/[silo]/page.tsx` dans le route group `(blog)` :
  - Description du silo affichée en haut
  - Articles pilier mis en avant visuellement (carte plus grande ou badge "Article pilier")
  - Articles support/satellite listés en grille
  - `generateStaticParams()` pour les 5 silos × 2 locales
  - `generateMetadata()` avec title incluant le nom du silo
- [ ] Composant `ArticleCard` créé dans `src/components/blog/` :
  - Affiche : image hero (ou placeholder), titre, extrait (meta_description), date, silo badge, temps de lecture
  - Lien vers `/blog/{silo}/{slug}`
  - Hover state (shadow, couleur titre)
  - Variante "featured" pour articles pilier (carte plus grande)
- [ ] Composant `ArticleList` créé dans `src/components/blog/` :
  - Grille responsive : 3 colonnes desktop, 2 tablette, 1 mobile
  - Accepte une liste d'articles en props
  - Gère l'état vide ("Aucun article dans cette catégorie")
- [ ] Composant `SiloNav` créé dans `src/components/blog/` :
  - Navigation entre silos via boutons/tabs
  - Silo actif visuellement marqué (bg-brand-primary, text-white)
  - Bouton "Tous" pour revue globale
  - Utilise les données de `data/silos.ts`
  - Fonctionne via des liens (`Link`) pas du state client (pour SSG/SEO)
- [ ] Composant `BlogBreadcrumb` créé dans `src/components/blog/` :
  - Breadcrumb : Blog > Silo (sur page silo), Blog > Silo > Article (sur page article)
  - Liens cliquables sauf dernier élément
  - Utilise le composant `Link` de next-intl
- [ ] L'ancien `BlogContent.tsx` dans `(main)/blog/` est supprimé ou remplacé par une redirection
- [ ] Responsive vérifié : mobile, tablette, desktop
- [ ] Traduit FR/EN (toutes les chaînes via `useTranslations` / `getTranslations`)
- [ ] Aucune erreur TypeScript (`npm run type-check`)
- [ ] Build réussi (`npm run build`)

---

## Technical Notes

### Architecture des fichiers

```
src/
├── app/[locale]/(blog)/
│   └── blog/
│       ├── page.tsx                    # Listing global (NOUVEAU)
│       ├── [silo]/
│       │   ├── page.tsx                # Listing par silo (NOUVEAU)
│       │   └── [slug]/
│       │       └── page.tsx            # Article (existant — STORY-002)
│       └── layout.tsx                  # Existant — Header + Footer
├── components/blog/
│   ├── ArticleCard.tsx                 # NOUVEAU
│   ├── ArticleList.tsx                 # NOUVEAU
│   ├── SiloNav.tsx                     # NOUVEAU
│   ├── BlogBreadcrumb.tsx              # NOUVEAU
│   └── index.ts                        # Barrel export
└── app/[locale]/(main)/blog/
    ├── page.tsx                         # À SUPPRIMER ou redirect
    └── BlogContent.tsx                  # À SUPPRIMER
```

### Approche SSG (Server Components)

- Les pages de listing sont des **Server Components** — pas de `"use client"` nécessaire
- Le filtrage par silo se fait via des **liens** (`/blog` vs `/blog/automatisation`), pas via du state client
- Cela permet le `generateStaticParams()` et un rendu SSG complet
- La pagination se fait par query param `?page=2` OU par pagination statique (pages séparées)
  - **Recommandé** : query param avec `searchParams` côté serveur pour rester simple

### Composant ArticleCard

```tsx
// Props attendues
interface ArticleCardProps {
  article: Article;
  locale: string;
  featured?: boolean;  // true pour articles pilier
}
```

- Image hero : chercher `article.images.find(img => img.id === 'hero')`
- Si pas d'image hero : afficher un placeholder gradient avec le nom du silo
- Lien vers `/blog/${article.siloSlug}/${article.slug}`
- Format de date : `toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })`
- Temps de lecture : `${article.tempsLecture} min`
- Mode featured : carte pleine largeur (col-span-2 ou col-span-3) avec image plus grande

### Composant SiloNav

```tsx
// Props attendues
interface SiloNavProps {
  activeSilo?: string;  // slug du silo actif, undefined = tous
  locale: string;
}
```

- Lien "Tous" → `/blog`
- Lien par silo → `/blog/{silo.slug}`
- Utilise `<Link>` de `@/i18n/navigation` pour la localisation
- Style actif : `bg-brand-primary text-white`
- Style inactif : `bg-gray-100 text-gray-600 hover:bg-gray-200`

### Composant BlogBreadcrumb

```tsx
interface BlogBreadcrumbProps {
  silo?: { nom: string; slug: string };  // undefined sur page listing global
  articleTitle?: string;                   // undefined sur pages listing
}
```

- Utilise des chevrons `>` ou `ChevronRight` de Lucide comme séparateur
- "Blog" est toujours un lien vers `/blog`
- Le silo est un lien vers `/blog/{silo.slug}`
- Le titre de l'article est du texte brut (dernier élément)

### Pagination

- **Nombre d'articles par page :** 9 (grille 3×3)
- Récupérer `searchParams.page` côté serveur
- Calculer `totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE)`
- Afficher des liens `<Link href="/blog?page=X">` pour la navigation
- Afficher : Précédent / 1 2 3 / Suivant

### Migration depuis (main)/blog

La page `/blog` existe actuellement dans le route group `(main)` avec un `BlogContent.tsx` client qui affiche du contenu hardcodé. Il faut :
1. Créer la nouvelle page dans `(blog)/blog/page.tsx`
2. Supprimer `(main)/blog/page.tsx` et `(main)/blog/BlogContent.tsx`
3. Vérifier qu'il n'y a pas de conflit de routes entre les deux route groups

**Attention :** Next.js ne permet pas d'avoir la même route dans deux route groups différents. Il faut bien supprimer l'ancienne avant de créer la nouvelle, ou les deux pages seront en conflit.

### Traductions à ajouter

```json
// messages/fr.json — sous "blog"
{
  "listing": {
    "allArticles": "Tous les articles",
    "allSilos": "Tous",
    "articlesCount": "{count, plural, =0 {Aucun article} one {# article} other {# articles}}",
    "noArticles": "Aucun article dans cette catégorie pour le moment.",
    "pilierBadge": "Article pilier",
    "pagination": {
      "previous": "Précédent",
      "next": "Suivant",
      "page": "Page {current} sur {total}"
    }
  },
  "breadcrumb": {
    "blog": "Blog"
  },
  "silo": {
    "description": "Découvrez nos articles sur : {siloName}"
  }
}
```

### Edge Cases

- **Aucun article dans un silo** → afficher le message "Aucun article" + garder la SiloNav
- **Silo invalide dans l'URL** → retourner `notFound()`
- **Page de pagination hors limites** → rediriger vers page 1 ou `notFound()`
- **Un seul article** → pas de pagination affichée
- **Locale sans articles** → afficher le message vide

### Design Reference

S'inspirer du design actuel de `BlogContent.tsx` pour garder la cohérence visuelle :
- Hero gradient : `from-brand-light via-white to-emerald-50/30`
- Card : `rounded-xl border border-gray-100 hover:shadow-lg hover:border-brand-primary/20`
- Image placeholder : gradient `from-gray-100 to-gray-50` avec icône centrée
- Silo badges : `rounded-full text-xs font-medium bg-brand-primary/10 text-brand-primary`

---

## Dependencies

**Prerequisite Stories:**
- STORY-001: Blog infrastructure & MDX setup (fournit `lib/blog.ts`, `data/silos.ts`, types)
- STORY-002: Blog article page & MDX components (fournit la page article dans le route group `(blog)`)

**Blocked Stories:**
- STORY-004: Blog SEO & structured data (a besoin des pages listing pour les schema.org BreadcrumbList et le sitemap)

**External Dependencies:**
- Aucune

---

## Definition of Done

- [ ] Pages listing globale et par silo rendues correctement en SSG
- [ ] Composants `ArticleCard`, `ArticleList`, `SiloNav`, `BlogBreadcrumb` créés et fonctionnels
- [ ] Navigation entre silos fonctionnelle (liens, pas de state client)
- [ ] Pagination fonctionnelle (9 articles/page)
- [ ] Articles pilier visuellement différenciés
- [ ] Ancien `BlogContent.tsx` supprimé, pas de conflit de routes
- [ ] Responsive vérifié (1 / 2 / 3 colonnes selon breakpoint)
- [ ] Traduit FR/EN
- [ ] TypeScript : aucune erreur (`npm run type-check`)
- [ ] Build réussi (`npm run build`)
- [ ] Les pages `/blog` et `/blog/automatisation` se rendent correctement dans le build

---

## Story Points Breakdown

- **Pages listing (global + silo)** : 2 points (2 pages SSG avec params, metadata, pagination)
- **Composants blog** : 2 points (ArticleCard, ArticleList, SiloNav, BlogBreadcrumb — 4 composants)
- **Migration + traductions + validation** : 1 point (supprimer ancien, ajouter i18n, tester build)
- **Total :** 5 points

**Rationale :** Complexité modérée — principalement du travail de composants UI et de routing Next.js. Le risque principal est la migration depuis le route group `(main)` vers `(blog)` et les potentiels conflits de routes.

---

## Progress Tracking

**Status History:**
- 2026-01-31: Created

**Actual Effort:** TBD

---

**This story was created using BMAD Method v6 — Phase 4 (Implementation Planning)**
