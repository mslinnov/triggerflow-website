# Sprint Plan — TriggerFlow Website

**Date :** 2026-01-31
**Projet :** TriggerFlow Website (Level 2)
**PRD :** `docs/prd-triggerflow-website-2026-01-31.md`
**Architecture :** `docs/architecture-triggerflow-website-2026-01-31.md`

---

## Executive Summary

15 des 23 FRs du PRD sont déjà implémentés (Homepage complète, pages légales, i18n, SEO de base). Le sprint plan couvre les **8 FRs restants** répartis en **8 stories** sur **3 sprints d'une semaine**.

**Key Metrics:**
- Total Stories : 8
- Total Points : 37
- Sprints planifiés : 3
- Capacité : ~15 points/sprint (1 dev senior + Claude, 6h/jour)
- Target Completion : Semaine 3

---

## Story Inventory

### STORY-001: Blog infrastructure & MDX setup

**Epic :** EPIC-003 (Blog System)
**Priority :** Must Have
**Points :** 5

**User Story :**
As a developer
I want to set up the MDX blog infrastructure
So that articles can be rendered from content files

**Acceptance Criteria :**
- [ ] Packages installés : next-mdx-remote, gray-matter, reading-time
- [ ] Dossier `content/blog/` créé avec sous-dossiers par silo (automatisation, experience-client, revenue-upselling, tech-integrations, guides)
- [ ] `src/data/silos.ts` créé avec les 5 silos (id, nom, slug, description)
- [ ] `src/lib/blog.ts` implémenté :
  - `getAllArticles(locale)` — lit tous les MDX, parse frontmatter
  - `getArticleBySlug(silo, slug, locale)` — retourne un article
  - `getArticlesBySilo(siloSlug, locale)` — articles par silo
  - `getSilos()` — retourne la liste des silos
  - `generateTableOfContents(content)` — extrait les headings
- [ ] Types TypeScript définis : `Article`, `Silo`, `ArticleImage`, `InternalLink`
- [ ] Un article MDX de test créé pour valider le pipeline

**Technical Notes :**
- Utiliser `next-mdx-remote/rsc` pour le support RSC
- Le frontmatter suit la structure définie dans `PROMPT-REDACTION-ARTICLES.md`
- Les articles sont localisés par un champ `locale` dans le frontmatter (pas par dossier)

**Dependencies :** Aucune

---

### STORY-002: Blog article page & MDX components

**Epic :** EPIC-003 (Blog System)
**Priority :** Must Have
**Points :** 5

**User Story :**
As a visitor
I want to read a blog article with rich content
So that I can learn about hotel automation topics

**Acceptance Criteria :**
- [ ] Route group `(blog)` créé avec layout (Header + Footer)
- [ ] Page `/blog/[silo]/[slug]/page.tsx` avec :
  - `generateStaticParams()` pour SSG
  - `generateMetadata()` avec title, description, og:image, hreflang
  - Rendu MDX via next-mdx-remote
- [ ] Composants MDX créés dans `src/components/mdx/` :
  - `ImageBlock` — affiche une image blog avec next/image
  - `Callout` — encadré info/warning/tip
  - `InternalLink` — lien interne stylé
  - `NewsletterInline` — formulaire newsletter inline (UI seulement, connexion dans STORY-008)
- [ ] Temps de lecture affiché
- [ ] Design responsive de l'article (typographie, espacement, images)
- [ ] L'article de test de STORY-001 se rend correctement

**Technical Notes :**
- Server Component par défaut, "use client" uniquement pour les composants interactifs
- Images blog dans `public/images/blog/{slug}/`
- Utiliser les fonts existantes (IBM Plex Sans pour le corps, Playfair pour les titres)

**Dependencies :** STORY-001

---

### STORY-003: Blog listing pages & silo navigation

**Epic :** EPIC-003 (Blog System)
**Priority :** Must Have
**Points :** 5

**User Story :**
As a visitor
I want to browse blog articles by category
So that I can find content relevant to my needs

**Acceptance Criteria :**
- [ ] Page `/blog/page.tsx` — listing global :
  - Tous les articles, les plus récents en premier
  - Filtrage par silo (tabs ou boutons)
  - Pagination (8-12 articles par page)
- [ ] Page `/blog/[silo]/page.tsx` — listing par silo :
  - Description du silo en haut
  - Articles pilier mis en avant
  - Articles support/satellite en dessous
  - `generateStaticParams()` pour les 5 silos
- [ ] Composants créés :
  - `ArticleCard` (image, titre, extrait, date, silo badge, temps de lecture)
  - `ArticleList` (grille responsive d'ArticleCards)
  - `SiloNav` (navigation entre silos)
  - `BlogBreadcrumb` (Blog > Silo > Article)
- [ ] Responsive : 3 colonnes desktop, 2 tablette, 1 mobile
- [ ] Traduit FR/EN

**Technical Notes :**
- Server Components pour le listing (pas de state côté client pour la pagination — utiliser les query params ou la pagination statique)
- SiloNav réutilise les données de `data/silos.ts`

**Dependencies :** STORY-001

---

### STORY-004: Blog SEO & structured data

**Epic :** EPIC-003 (Blog System)
**Priority :** Must Have
**Points :** 3

**User Story :**
As a search engine
I want structured data and proper metadata on blog pages
So that articles are well indexed and display rich snippets

**Acceptance Criteria :**
- [ ] Schema.org `Article` / `BlogPosting` JSON-LD sur chaque article
- [ ] Schema.org `BreadcrumbList` JSON-LD sur les pages blog (listing + articles)
- [ ] `sitemap.ts` étendu pour inclure :
  - Toutes les pages blog listing (global + par silo) en FR et EN
  - Tous les articles de blog en FR et EN
- [ ] Balises hreflang sur les articles de blog
- [ ] Open Graph tags par article (og:title, og:description, og:image, og:type=article)
- [ ] Twitter Card tags par article
- [ ] URL canonique par article
- [ ] Table des matières (TOC) générée automatiquement pour les articles > 1500 mots
  - Composant `TableOfContents` sticky en sidebar (desktop)
  - Lien ancre par H2/H3

**Technical Notes :**
- Étendre le composant `JsonLd.tsx` existant dans `components/seo/`
- Le TOC est extrait des headings du contenu MDX via `generateTableOfContents()`

**Dependencies :** STORY-002

---

### STORY-005: Article import pipeline (script CLI)

**Epic :** EPIC-003 (Blog System)
**Priority :** Must Have
**Points :** 8

**User Story :**
As a content manager
I want to import articles from an external folder
So that articles written by Claude are automatically published with generated images

**Acceptance Criteria :**
- [ ] Script `scripts/import-articles.ts` exécutable via `npx tsx scripts/import-articles.ts`
- [ ] Scan du dossier `~/Documents/Msl Innov/Trigger Flow/website/articles/a-implementer/`
- [ ] Pour chaque fichier `.md` trouvé :
  - [ ] Parse YAML frontmatter via gray-matter
  - [ ] Valide les champs requis (silo, title, slug, images)
  - [ ] Pour chaque image dans `images[]` :
    - Appel API Replicate avec le modèle spécifié (`google/nano-banana` ou `google/nano-banana-pro`)
    - Téléchargement du résultat
    - Sauvegarde en WebP dans `public/images/blog/{slug}/{filename}`
  - [ ] Transformation du contenu :
    - Remplacement des marqueurs `<!-- IMAGE: id -->` par `<ImageBlock id="id" />`
    - Résolution des liens internes : fichier source → URL (`/blog/{silo-slug}/{slug}/`)
  - [ ] Écriture du fichier `.mdx` dans `content/blog/{silo-slug}/{slug}.mdx`
  - [ ] Déplacement du fichier source vers `articles/implementes/`
- [ ] Log console pour chaque opération (succès/erreur)
- [ ] Gestion d'erreurs : si Replicate échoue pour une image, log l'erreur et continue (article créé sans l'image)
- [ ] Variable d'environnement `REPLICATE_API_TOKEN` requise

**Technical Notes :**
- Utiliser le package `replicate` npm pour l'API
- Le script est exécuté manuellement (pas de webhook)
- Le chemin du dossier source est configurable via argument CLI ou `.env`
- Rate limiting sur Replicate : traiter les images séquentiellement avec un délai

**Dependencies :** STORY-001

---

### STORY-006: LP shared components (composants modulaires)

**Epic :** EPIC-004 (Landing Pages SEA)
**Priority :** Must Have
**Points :** 5

**User Story :**
As a marketer
I want reusable landing page components
So that I can quickly create targeted LP for Google Ads campaigns

**Acceptance Criteria :**
- [ ] Composants créés dans `src/components/landing/shared/` :
  - `LPHeader` — logo + CTA seulement (pas de nav complète)
  - `LPHero` — titre, sous-titre, CTA, image (props typées)
  - `LPSocialProof` — logos clients, chiffres clés, témoignage court
  - `LPFeatures` — 3-6 features avec icônes Lucide
  - `LPBenefits` — avantages clés avec descriptions
  - `LPTestimonial` — témoignage développé (citation, nom, rôle, photo)
  - `LPCTA` — section CTA finale (titre, sous-titre, bouton)
  - `LPPricing` — pricing simplifié ou lien vers pricing complet
- [ ] Chaque composant est un Server Component
- [ ] Props typées TypeScript pour chaque composant
- [ ] Design orienté conversion : épuré, focus sur le CTA
- [ ] Responsive sur tous les breakpoints
- [ ] Réutilise les design tokens existants (--brand-primary, etc.)
- [ ] Barrel export dans `index.ts`

**Technical Notes :**
- S'inspirer des composants Thais v3 existants (les plus récents) pour le design
- Les composants doivent être agnostiques du contenu (tout via props)
- CTA buttons utilisent le composant `ButtonLink` existant

**Dependencies :** Aucune

---

### STORY-007: LP dynamic routing & config system

**Epic :** EPIC-004 (Landing Pages SEA)
**Priority :** Must Have
**Points :** 3

**User Story :**
As a marketer
I want to create new landing pages by configuration
So that I can launch LP for new campaigns without coding

**Acceptance Criteria :**
- [ ] Dossier `src/data/landing-pages/` créé
- [ ] `src/lib/landing-pages.ts` implémenté :
  - `getAllLandingPages()` — lit tous les JSON de config
  - `getLandingPageBySlug(slug)` — retourne une config LP
  - Type `LandingPageConfig` défini
- [ ] Route `/lp/[slug]/page.tsx` dans le route group `(lp)` :
  - `generateStaticParams()` — génère les pages depuis les configs
  - `generateMetadata()` — metadata SEO avec `noindex` optionnel
  - Rendu dynamique : assemble les composants selon `sections[]` de la config
- [ ] Un fichier d'exemple `data/landing-pages/exemple-mews.json` créé et fonctionnel
- [ ] Cohabitation avec les LP existantes (thais, thais-v2, thais-v3)
- [ ] Support FR/EN

**Technical Notes :**
- La route dynamique `/lp/[slug]` ne doit pas conflater avec les routes statiques existantes (`/lp/thais/`, etc.)
- Utiliser un mapping composant : `{ LPHero: LPHero, LPFeatures: LPFeatures, ... }` pour le rendu dynamique
- Les LP statiques existantes restent inchangées

**Dependencies :** STORY-006

---

### STORY-008: Newsletter Brevo integration

**Epic :** EPIC-001 (Foundation — extension)
**Priority :** Must Have
**Points :** 3

**User Story :**
As a visitor
I want to subscribe to the TriggerFlow newsletter
So that I receive hotel automation tips and updates

**Acceptance Criteria :**
- [ ] Formulaire newsletter dans le Footer connecté à Brevo :
  - Sibforms embed OU API route Next.js (`/api/newsletter`)
  - Si API route : envoi vers Brevo via leur API, `BREVO_API_KEY` en env var
- [ ] Composant `NewsletterInline` (de STORY-002) connecté au même backend
- [ ] Validation email côté client (format valide)
- [ ] Protection anti-spam : champ honeypot caché
- [ ] Messages d'état :
  - Succès : "Inscription confirmée !" (traduit FR/EN)
  - Erreur : "Une erreur est survenue." (traduit FR/EN)
  - Déjà inscrit : message approprié
- [ ] Conformité RGPD :
  - Checkbox de consentement explicite
  - Lien vers la politique de confidentialité
- [ ] Traduit FR/EN via next-intl

**Technical Notes :**
- Si Sibforms : intégration via embed iframe ou form action (plus simple, pas d'API key côté serveur)
- Si API route : utiliser le package `@getbrevo/brevo` ou fetch direct sur l'API v3
- Le honeypot est un champ caché en CSS (display:none) — si rempli, le submit est rejeté silencieusement

**Dependencies :** Aucune (le Footer existe déjà)

---

## Sprint Allocation

### Sprint 1 (Semaine 1) — 13/15 points

**Goal :** Blog fonctionnel de bout en bout — un article peut être lu sur le site

| Story | Points | Priorité |
|-------|--------|----------|
| STORY-001: Blog infra & MDX setup | 5 | Must |
| STORY-002: Blog article page & MDX components | 5 | Must |
| STORY-008: Newsletter Brevo integration | 3 | Must |
| **Total** | **13** | |

**Livrable :** Un article de blog se rend correctement avec images, composants MDX, et la newsletter est connectée.

**Risques :**
- Configuration next-mdx-remote avec RSC peut nécessiter du debug

---

### Sprint 2 (Semaine 2) — 13/15 points

**Goal :** Blog complet avec listings, silos, SEO, et composants LP prêts

| Story | Points | Priorité |
|-------|--------|----------|
| STORY-003: Blog listing pages & silo nav | 5 | Must |
| STORY-004: Blog SEO & structured data | 3 | Must |
| STORY-006: LP shared components | 5 | Must |
| **Total** | **13** | |

**Livrable :** Le blog est complet (listings, silos, SEO). Les composants LP sont prêts.

**Risques :**
- Volume de composants LP (8 composants) — rester pragmatique sur le design

---

### Sprint 3 (Semaine 3) — 11/15 points

**Goal :** Système LP dynamique fonctionnel et pipeline d'import d'articles opérationnel

| Story | Points | Priorité |
|-------|--------|----------|
| STORY-007: LP dynamic routing & config | 3 | Must |
| STORY-005: Article import pipeline | 8 | Must |
| **Total** | **11** | |

**Livrable :** Les LP sont créables par config JSON. Les articles peuvent être importés avec génération d'images automatique.

**Risques :**
- API Replicate : latence et fiabilité de la génération d'images
- Complexité du script d'import (parsing, transformation, gestion d'erreurs)

---

## Epic Traceability

| Epic | Stories | Points | Sprint |
|------|---------|--------|--------|
| EPIC-003: Blog System | STORY-001, 002, 003, 004, 005 | 26 | Sprint 1-3 |
| EPIC-004: LP SEA | STORY-006, 007 | 8 | Sprint 2-3 |
| EPIC-001: Foundation (extension) | STORY-008 | 3 | Sprint 1 |
| **Total** | **8 stories** | **37 pts** | **3 sprints** |

---

## FR Coverage

| FR | Story | Sprint |
|----|-------|--------|
| FR-016 Blog MDX | STORY-001, STORY-002 | 1 |
| FR-017 Blog SEO | STORY-004 | 2 |
| FR-018 LP modulaire | STORY-006, STORY-007 | 2-3 |
| FR-020 SEO (extension blog) | STORY-004 | 2 |
| FR-021 Newsletter Brevo | STORY-008 | 1 |
| FR-022 Import articles | STORY-005 | 3 |
| FR-023 Silos sémantiques | STORY-001, STORY-003 | 1-2 |

**Note :** FR-001 à FR-015, FR-019 sont déjà implémentés et ne nécessitent pas de stories.

---

## Risks & Mitigation

**High :**
- **API Replicate (STORY-005)** — La génération d'images peut échouer ou être lente
  - Mitigation : gestion d'erreurs gracieuse (article publié sans image si échec), retry logic

**Medium :**
- **next-mdx-remote avec RSC (STORY-001/002)** — Configuration parfois complexe avec Next.js 16
  - Mitigation : tester la config minimale d'abord, fallback vers @next/mdx si nécessaire
- **Volume de composants LP (STORY-006)** — 8 composants à créer
  - Mitigation : s'inspirer fortement des composants Thais v3 existants, ne pas over-designer

**Low :**
- **Brevo integration (STORY-008)** — API ou Sibforms peut avoir des spécificités
  - Mitigation : commencer par Sibforms embed (plus simple), passer à l'API si nécessaire

---

## Definition of Done

Pour qu'une story soit considérée comme terminée :
- [ ] Code implémenté et commité
- [ ] TypeScript : aucune erreur (`tsc --noEmit`)
- [ ] ESLint : aucune erreur
- [ ] Build réussi (`next build`)
- [ ] Responsive vérifié (mobile, tablette, desktop)
- [ ] Textes traduits FR/EN
- [ ] Acceptance criteria validés

---

## Next Steps

**Immédiat :** Commencer Sprint 1

Options :
1. `/bmad:dev-story` STORY-001 — Commencer l'implémentation du blog infrastructure
2. `/bmad:create-story` STORY-001 — Créer un document de story détaillé d'abord

**Recommandé :** Commencer directement par `/bmad:dev-story` pour STORY-001 (Blog infra & MDX setup) — les acceptance criteria sont suffisamment détaillés dans ce plan.

---

*Document généré dans le cadre du workflow BMAD Method v6 — Phase 4: Implementation Planning*
