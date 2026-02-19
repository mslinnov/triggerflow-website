# Architecture — TriggerFlow Website

**Projet :** TriggerFlow Website
**Type :** Web Application (Next.js 16)
**Niveau :** 2 (Medium)
**Date :** 2026-01-31
**PRD :** `docs/prd-triggerflow-website-2026-01-31.md`
**Statut :** Draft

---

## 1. Architectural Drivers

Les NFRs suivants influencent le plus les décisions d'architecture :

| NFR | Driver | Impact architectural |
|-----|--------|---------------------|
| NFR-001 | Performance Lighthouse > 95 | RSC par défaut, lazy loading, image optimization, minimal JS bundle |
| NFR-002 | SEO Score = 100 | SSG/ISR pour le blog, metadata dynamiques, Schema.org, sitemap |
| NFR-005 | Sécurité (headers, RGPD) | Security headers dans next.config, honeypot anti-spam |
| NFR-006 | Maintenabilité | TypeScript strict, composants modulaires, conventions cohérentes |
| FR-022 | Workflow import articles | Script CLI Node.js, API Replicate, file system operations |
| FR-023 | Silos sémantiques | Routing dynamique blog, structure content/ par silo |

---

## 2. High-Level Architecture

### Pattern : Static-First Marketing Site avec Content Pipeline

Le site est un **site statique marketing** généré par Next.js avec deux pipelines de contenu :

1. **Contenu structuré** (homepage, pricing, LP) → données dans `src/data/` + traductions `messages/`
2. **Contenu éditorial** (blog) → fichiers MDX dans `content/blog/` + pipeline d'import externe

```
┌─────────────────────────────────────────────────────────┐
│                   Cloudflare Pages (Edge)                 │
│  ┌─────────────────────────────────────────────────────┐ │
│  │     Next.js 16 (App Router via @opennextjs/cf)      │ │
│  │                                                     │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │ │
│  │  │  (main)  │  │   (lp)   │  │     (blog)       │  │ │
│  │  │ Homepage │  │ Landing  │  │  MDX Articles    │  │ │
│  │  │ Product  │  │  Pages   │  │  Silos           │  │ │
│  │  │ Legal    │  │          │  │  Import Pipeline │  │ │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────────────┘  │ │
│  │       │              │              │               │ │
│  │  ┌────┴──────────────┴──────────────┴────────────┐  │ │
│  │  │              Shared Layer                      │  │ │
│  │  │  components/ui  │  i18n  │  SEO  │  data/     │  │ │
│  │  └───────────────────────────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘

┌──────────────────────┐
│  Content Pipeline     │
│  articles/            │   ──→  content/blog/{silo}/
│  a-implementer/       │   ──→  public/images/blog/
│  (external folder)    │   ──→  articles/implementes/
│                       │
│  Replicate API        │
│  (image generation)   │
└──────────────────────┘
```

### Rationale

- **Static-First** : Site marketing sans données dynamiques côté serveur → SSG = performance maximale (pas d'ISR, compatible Cloudflare Pages)
- **Route Groups** : `(main)`, `(lp)`, `(blog)` isolent les layouts (header/footer différents par contexte)
- **Content Pipeline externe** : Les articles sont rédigés séparément et importés, ce qui découple rédaction et développement

---

## 3. Technology Stack

### Stack existante (déjà en place)

| Couche | Technologie | Version | Justification |
|--------|-------------|---------|---------------|
| Framework | Next.js | 16.1.1 | App Router, RSC, SSG/ISR natif, performance |
| Runtime | React | 19.2.3 | Server Components, streaming, concurrent features |
| Language | TypeScript | 5.x | Strict mode, type safety |
| Styling | Tailwind CSS | 4.x | CSS-first config, utility classes, zero runtime |
| Animations | Framer Motion | 12.x | Déclaratif, SSR-friendly, performant |
| i18n | next-intl | 4.7+ | Server Components natif, type-safe |
| Icons | Lucide React | 0.562+ | Tree-shakeable, cohérent |
| Utils | clsx + tailwind-merge | - | `cn()` helper pour les classes conditionnelles |

### Stack à ajouter

| Couche | Technologie | Justification |
|--------|-------------|---------------|
| Blog MDX | next-mdx-remote ou @next/mdx | Rendu MDX avec composants React personnalisés |
| Frontmatter | gray-matter | Parsing YAML front matter des articles |
| Reading time | reading-time | Estimation du temps de lecture |
| Image gen | replicate (npm) | API client pour Replicate (génération images) |
| Slug | slugify ou custom | Normalisation des slugs d'articles |

### Fonts (existants)

| Font | Usage | Weights |
|------|-------|---------|
| IBM Plex Sans | Corps de texte | 300-700 |
| Playfair Display | Headings serif | 400-800 |
| Cormorant Garamond | Display/accent | 400-700 |
| Geist Mono | Code | - |

### Design Tokens (CSS variables existantes)

```css
--brand-primary: #006F68    /* Green CTAs */
--brand-dark: #002B28       /* Dark headers */
--brand-light: #CCE2E1      /* Light backgrounds */
--brand-accent: #FFCFA2     /* Accent warm */
```

---

## 4. Project Structure

### Structure actuelle + extensions blog et LP modulaire

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (fonts, metadata)
│   ├── page.tsx                      # Redirect → /fr
│   ├── robots.ts                     # Robots.txt
│   ├── sitemap.ts                    # Sitemap XML (à étendre pour blog)
│   ├── globals.css                   # Tailwind v4 + CSS vars
│   │
│   └── [locale]/
│       ├── layout.tsx                # Locale layout + metadata
│       │
│       ├── (main)/                   # Marketing pages (Header + Footer)
│       │   ├── layout.tsx
│       │   ├── page.tsx              # Homepage
│       │   ├── produit/              # Product pages (existant)
│       │   ├── solutions/            # Solution pages (existant)
│       │   ├── tarifs/               # Pricing (existant)
│       │   ├── integrations/         # Integrations (existant)
│       │   ├── contact/              # Contact (existant)
│       │   ├── mentions-legales/     # Legal (existant)
│       │   ├── cgv/                  # Legal (existant)
│       │   ├── cgu/                  # Legal (existant)
│       │   └── politique-confidentialite/  # Legal (existant)
│       │
│       ├── (blog)/                   # ← NOUVEAU : Blog route group
│       │   ├── layout.tsx            # Blog layout (Header + Footer + sidebar?)
│       │   └── blog/
│       │       ├── page.tsx          # Blog listing (toutes catégories)
│       │       ├── [silo]/
│       │       │   ├── page.tsx      # Silo listing
│       │       │   └── [slug]/
│       │       │       └── page.tsx  # Article page (MDX render)
│       │       └── components/       # Blog-specific components
│       │           ├── ArticleCard.tsx
│       │           ├── ArticleList.tsx
│       │           ├── SiloNav.tsx
│       │           ├── TableOfContents.tsx
│       │           ├── NewsletterCTA.tsx
│       │           └── BlogBreadcrumb.tsx
│       │
│       └── (lp)/                     # Landing pages (minimal layout)
│           ├── layout.tsx            # LP layout (no nav, logo + CTA only)
│           └── lp/
│               ├── [slug]/           # ← NOUVEAU : LP dynamique
│               │   └── page.tsx      # LP rendu depuis config
│               ├── thais/            # LP existantes
│               ├── thais-v2/
│               └── thais-v3/
│
├── components/
│   ├── ui/                           # Base UI (existant)
│   ├── layout/                       # Header, Footer (existant)
│   ├── sections/                     # Homepage sections (existant)
│   ├── mockups/                      # Feature mockups (existant)
│   ├── seo/                          # JsonLd (existant)
│   ├── landing/                      # LP components (existant)
│   │   ├── thais/
│   │   ├── thais-v2/
│   │   ├── thais-v3/
│   │   └── shared/                   # ← NOUVEAU : LP modulaires
│   │       ├── LPHero.tsx
│   │       ├── LPSocialProof.tsx
│   │       ├── LPFeatures.tsx
│   │       ├── LPBenefits.tsx
│   │       ├── LPTestimonial.tsx
│   │       ├── LPCTA.tsx
│   │       ├── LPPricing.tsx
│   │       ├── LPHeader.tsx          # Header simplifié (logo + CTA)
│   │       └── index.ts
│   └── mdx/                          # ← NOUVEAU : Composants MDX
│       ├── Callout.tsx
│       ├── CodeBlock.tsx
│       ├── ImageBlock.tsx
│       ├── InternalLink.tsx
│       ├── NewsletterInline.tsx
│       └── index.ts
│
├── content/                          # ← NOUVEAU : Contenu MDX
│   └── blog/
│       ├── automatisation/           # Silo S1
│       │   ├── guide-automation-hoteliere.mdx
│       │   └── ...
│       ├── experience-client/        # Silo S2
│       ├── revenue-upselling/        # Silo S3
│       ├── tech-integrations/        # Silo S4
│       └── guides/                   # Silo S5
│
├── data/
│   ├── modules.ts                    # Module definitions (existant)
│   ├── solutions.ts                  # Solution configs (existant)
│   ├── silos.ts                      # ← NOUVEAU : Silo definitions
│   └── landing-pages/                # ← NOUVEAU : LP configs
│       └── *.json                    # Config par LP
│
├── lib/
│   ├── utils.ts                      # cn() helper (existant)
│   ├── animations.ts                 # Framer Motion (existant)
│   ├── blog.ts                       # ← NOUVEAU : Blog utilities
│   │                                 #   - getArticles(), getArticleBySlug()
│   │                                 #   - getSiloArticles(), getSilos()
│   │                                 #   - parseFrontmatter()
│   └── landing-pages.ts              # ← NOUVEAU : LP utilities
│                                     #   - getLandingPage(), getLPComponents()
│
├── i18n/                             # (existant)
│   ├── routing.ts
│   ├── request.ts
│   └── navigation.ts
│
├── messages/                         # (existant)
│   ├── fr.json
│   └── en.json
│
└── middleware.ts                      # (existant)

scripts/                              # ← NOUVEAU : Scripts CLI
└── import-articles.ts                # Script d'import blog
                                      #   - Parse YAML front matter
                                      #   - Appelle Replicate API
                                      #   - Génère MDX + images
                                      #   - Déplace vers implementes/

public/
├── images/
│   ├── blog/                         # ← NOUVEAU : Images blog générées
│   │   └── {slug}/
│   │       ├── hero-{slug}.webp
│   │       └── {section}-{slug}.webp
│   ├── partners/                     # (existant)
│   └── ...                           # (existant)
```

---

## 5. System Components

### Component 1 : Blog Engine (MDX)

**Purpose :** Système de blog avec articles MDX, silos sémantiques, et SEO intégré.

**Responsibilities :**
- Lecture et parsing des fichiers `.mdx` dans `content/blog/`
- Extraction du frontmatter (silo, SEO, liens, metadata)
- Rendu MDX avec composants React personnalisés
- Génération des pages listing (global et par silo)
- Génération de la table des matières (TOC)
- Calcul du temps de lecture
- Maillage interne (résolution des liens)
- Breadcrumbs et navigation par silo

**Interfaces :**
- `lib/blog.ts` — API interne pour accéder aux articles
- Routes `/blog/`, `/blog/[silo]/`, `/blog/[silo]/[slug]/`

**FRs adressés :** FR-016, FR-017, FR-023

**Détail `lib/blog.ts` :**

```typescript
// Types
interface Article {
  slug: string;
  silo: SiloId;
  siloSlug: string;
  type: 'pilier' | 'support' | 'satellite';
  title: string;
  metaDescription: string;
  motClePrincipal: string;
  motsClesSecondaires: string[];
  datePublication: string;
  dateMiseAJour: string;
  personaCible: string;
  ctaPrincipal: 'demo' | 'newsletter' | 'les_deux';
  fonctionnalitesMisesEnAvant: string[];
  pmsMentionnes: string[];
  liensInternes: InternalLink[];
  liensExternes: ExternalLink[];
  images: ArticleImage[];
  tempsLecture: number;
  content: string; // MDX raw content
  locale: string;
}

interface Silo {
  id: string;      // S1, S2, etc.
  nom: string;
  slug: string;     // automatisation, experience-client, etc.
  description: string;
}

// Functions
function getAllArticles(locale: string): Article[];
function getArticleBySlug(silo: string, slug: string, locale: string): Article | null;
function getArticlesBySilo(siloSlug: string, locale: string): Article[];
function getSilos(): Silo[];
function generateTableOfContents(content: string): TOCItem[];
function resolveInternalLinks(article: Article): ResolvedLink[];
```

---

### Component 2 : Article Import Pipeline

**Purpose :** Script CLI qui transforme les articles bruts en MDX déployables avec images générées.

**Responsibilities :**
- Scan du dossier `articles/a-implementer/`
- Parsing du YAML front matter (gray-matter)
- Appel API Replicate pour chaque image (nano-banana ou nano-banana-pro)
- Conversion en WebP et placement dans `public/images/blog/{slug}/`
- Remplacement des marqueurs `<!-- IMAGE: id -->` par des composants `<ImageBlock />`
- Écriture du fichier `.mdx` dans `content/blog/{silo-slug}/`
- Résolution des liens internes (fichier → URL)
- Déplacement du fichier source vers `articles/implementes/`
- Logging des opérations

**Interfaces :**
- `scripts/import-articles.ts` — Exécutable via `npx tsx scripts/import-articles.ts`
- Environnement : `REPLICATE_API_TOKEN` dans `.env.local`

**FRs adressés :** FR-022

**Flow :**

```
articles/a-implementer/S1-P-guide.md
         │
         ▼
   [Parse YAML frontmatter]
         │
         ▼
   [Pour chaque image dans images:]
   │  → Appel Replicate API (nano-banana ou nano-banana-pro)
   │  → Téléchargement du résultat
   │  → Conversion WebP → public/images/blog/{slug}/{id}-{slug}.webp
         │
         ▼
   [Transformation contenu]
   │  → Remplacement <!-- IMAGE: id --> par <ImageBlock />
   │  → Résolution liens internes (fichier → /blog/{silo}/{slug}/)
   │  → Ajout imports MDX components
         │
         ▼
   [Écriture MDX]
   │  → content/blog/{silo-slug}/{slug}.mdx
         │
         ▼
   [Déplacement source]
   │  → articles/implementes/S1-P-guide.md
         │
         ▼
   [Log succès/erreur]
```

---

### Component 3 : Landing Pages modulaires

**Purpose :** Système de LP configurables par fichier JSON pour les campagnes SEA.

**Responsibilities :**
- Lecture de la configuration LP depuis `data/landing-pages/{slug}.json`
- Assemblage des composants modulaires (LPHero, LPFeatures, LPCTA, etc.)
- Rendu avec layout simplifié (pas de nav, logo + CTA seulement)
- Metadata SEO avec noindex optionnel
- Support FR/EN

**Interfaces :**
- `lib/landing-pages.ts` — API interne
- Route `/lp/[slug]`
- Fichiers config dans `data/landing-pages/`

**FRs adressés :** FR-018

**Format de config LP :**

```json
{
  "slug": "mews-integration",
  "locale": "fr",
  "noindex": true,
  "metadata": {
    "title": "TriggerFlow + Mews | Automatisez votre hôtel",
    "description": "Connectez TriggerFlow à Mews en 30 minutes..."
  },
  "sections": [
    {
      "type": "LPHero",
      "props": {
        "title": "Automatisez votre hôtel connecté à Mews",
        "subtitle": "...",
        "ctaText": "Réserver une démo",
        "ctaUrl": "https://app.lemcal.com/@trigger-flow/demo",
        "image": "/images/landing/mews-hero.webp"
      }
    },
    {
      "type": "LPSocialProof",
      "props": {
        "logos": ["accor", "sofitel"],
        "stats": [
          { "value": "8+", "label": "PMS connectés" }
        ]
      }
    },
    {
      "type": "LPFeatures",
      "props": {
        "features": [...]
      }
    },
    {
      "type": "LPCTA",
      "props": {
        "title": "Prêt à automatiser ?",
        "ctaText": "Réserver une démo"
      }
    }
  ]
}
```

---

### Component 4 : SEO Engine (existant, à étendre)

**Purpose :** Gestion centralisée du SEO technique.

**Responsibilities (existantes) :**
- Schema.org JSON-LD (Organization, SoftwareApplication)
- Metadata dynamiques par page
- Sitemap XML
- Robots.txt
- Security headers

**Extensions nécessaires :**
- Schema.org Article/BlogPosting pour chaque article
- Schema.org BreadcrumbList pour le blog
- Schema.org FAQPage pour la FAQ homepage
- Hreflang sur les articles de blog
- Sitemap étendu avec les articles blog et les LP

**FRs adressés :** FR-020, FR-017

---

### Component 5 : Newsletter Integration

**Purpose :** Formulaire d'inscription newsletter connecté à Brevo.

**Responsibilities :**
- Formulaire email dans le footer (existant à connecter)
- Formulaire inline dans les articles de blog (nouveau)
- Validation côté client
- API route Next.js pour l'envoi vers Brevo (ou Sibforms embed)
- Gestion des erreurs et confirmation
- Protection anti-spam (honeypot)
- Conformité RGPD

**Interfaces :**
- Composant `NewsletterForm` dans footer
- Composant `NewsletterInline` dans les articles MDX
- API route `/api/newsletter` (si API Brevo) ou embed Sibforms

**FRs adressés :** FR-021

---

## 6. Data Architecture

### Entités de contenu

```
Blog Article (MDX file)
├── Frontmatter (YAML)
│   ├── silo: S1-S5
│   ├── type: pilier | support | satellite
│   ├── SEO: title, meta_description, keywords
│   ├── persona_cible, cta_principal
│   ├── liens_internes[], liens_externes[]
│   └── images[] (avec prompts pour génération)
├── Content (MDX)
└── Generated Images (WebP)

Silo (static data)
├── id, nom, slug, description
└── articles[] (computed from file system)

Landing Page (JSON config)
├── slug, locale, noindex
├── metadata
└── sections[] (composable)

Module (TypeScript data)          # existant
├── name, slug, description
└── features[]

Solution (TypeScript data)        # existant
├── name, slug, challenges
└── features[], useCases[]
```

### Data Flow

```
Contenu statique (build time)
─────────────────────────────
messages/fr.json ──→ next-intl ──→ Server Components ──→ HTML
messages/en.json

data/modules.ts ──→ import ──→ Pages produit
data/solutions.ts ──→ import ──→ Pages solutions
data/silos.ts ──→ import ──→ Blog navigation

content/blog/**/*.mdx ──→ lib/blog.ts ──→ Blog pages (SSG)
data/landing-pages/*.json ──→ lib/landing-pages.ts ──→ LP pages (SSG)

Pipeline d'import (CLI, hors build)
────────────────────────────────────
articles/a-implementer/ ──→ scripts/import-articles.ts ──→ content/blog/
                                    │
                                    ├──→ Replicate API ──→ public/images/blog/
                                    └──→ articles/implementes/
```

### Stratégie de rendu

| Type de page | Stratégie | Raison |
|-------------|-----------|--------|
| Homepage | SSG | Contenu statique, performance maximale |
| Pages produit | SSG | Contenu dans data/, pas de dynamisme |
| Pages légales | SSG | Contenu statique |
| Blog listing | SSG | Rebuilt au deploy (articles changent rarement) |
| Blog articles | SSG | Contenu MDX, pas de données dynamiques |
| Landing pages | SSG | Contenu JSON, performance critique (Quality Score) |

Tout le site est statiquement généré (SSG) au build time. Pas d'ISR nécessaire — un nouveau déploiement est déclenché quand du contenu est ajouté.

---

## 7. NFR Coverage

### NFR-001: Performance — Core Web Vitals

**Requirement :** Lighthouse Performance > 95, LCP < 2.5s, CLS < 0.1

**Solution :**
- **React Server Components** par défaut → zéro JS envoyé au client pour les composants statiques
- **"use client"** uniquement pour : Header (menu mobile), Tabs, Carousel, Accordion, LanguageSwitcher
- **next/image** avec `priority` sur les images hero (LCP) — images pré-optimisées en WebP (pas d'optimisation serveur sur Cloudflare Pages)
- **Fonts** : `next/font/google` avec `display: swap` (déjà en place)
- **Tailwind v4** : CSS-only, pas de runtime JS
- **Lazy loading** : `dynamic()` import pour les sections below-the-fold lourdes (Framer Motion animations)
- **Bundle analysis** : Vérifier que le first load JS < 150KB gzipped

**Validation :**
- `npx next build` → vérifier les tailles de bundle
- Lighthouse CI en pre-deploy
- Web Vitals monitoring via Cloudflare Web Analytics (ou Google Lighthouse CI)

---

### NFR-002: SEO — Score Lighthouse 100

**Requirement :** Lighthouse SEO = 100 sur toutes les pages

**Solution :**
- Metadata via `generateMetadata()` dans chaque `page.tsx`
- Schema.org JSON-LD via `components/seo/JsonLd.tsx` (existant, à étendre)
- `sitemap.ts` dynamique incluant toutes les pages, articles blog, et LP
- `robots.ts` avec sitemap reference
- Balises hreflang via next-intl (automatique)
- Alt text obligatoire sur toutes les images (convention + review)
- H1 unique par page (convention)

**Validation :**
- Lighthouse SEO check en CI
- Google Search Console post-deploy

---

### NFR-003: Accessibilité (WCAG 2.1 AA)

**Requirement :** Lighthouse Accessibility > 90

**Solution :**
- Contraste couleurs : vérifier `--brand-primary: #006F68` sur fond blanc → ratio 5.4:1 (AA OK)
- Navigation clavier : `tabIndex`, `onKeyDown` sur tous les interactifs
- Aria attributes : `aria-expanded` (accordion, FAQ), `aria-selected` (tabs), `aria-label` (carousel)
- Focus visible : `focus-visible:ring-2` sur tous les boutons et liens
- Labels : `<label>` associé à chaque `<input>` dans les formulaires
- Skip to content : lien caché en haut de page

**Validation :**
- Lighthouse Accessibility check
- Test clavier manuel sur les composants interactifs

---

### NFR-004: Compatibilité navigateurs

**Requirement :** Chrome, Firefox, Safari, Edge (2 dernières versions) + mobile

**Solution :**
- Next.js gère le transpiling automatique
- Tailwind v4 génère du CSS standard
- Breakpoints : `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- Testing : vérification visuelle sur Chrome, Safari, Firefox

**Validation :**
- Test manuel cross-browser avant chaque release majeure

---

### NFR-005: Sécurité

**Requirement :** Security headers, RGPD, anti-spam

**Solution (déjà en place dans next.config.ts) :**
- `Strict-Transport-Security: max-age=63072000`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

**Extensions :**
- CSP à affiner pour autoriser Brevo/Sibforms embed et Framer Motion inline styles
- Honeypot anti-spam sur le formulaire newsletter
- Clé API Replicate dans `.env.local` (jamais exposée côté client)
- RGPD : bandeau cookies si analytics ajouté, consentement newsletter explicite

---

### NFR-006: Maintenabilité

**Requirement :** Code propre, typé, modulaire

**Solution (conventions existantes) :**
- TypeScript strict, aucun `any`
- ESLint next/core-web-vitals
- `cn()` helper pour les classes conditionnelles
- Server Components par défaut
- Fichiers de traduction structurés
- Composants dans des dossiers logiques

**Extensions :**
- Types partagés pour Blog, LP, Silo dans `src/types/`
- Barrel exports (`index.ts`) dans chaque dossier de composants

---

### NFR-007: Déploiement

**Requirement :** CI/CD automatisé via Cloudflare Pages

**Solution (déjà en place) :**
- Push main → deploy production (Cloudflare Pages via `opennextjs-cloudflare build && opennextjs-cloudflare deploy`)
- PR → preview deployment (Cloudflare Pages Git integration)
- Build vérifie TypeScript + ESLint
- Worker config dans `wrangler.jsonc` avec `nodejs_compat` flag

**Extension :**
- Ajouter `type-check` au script build : `tsc --noEmit && next build`
- Optionnel : GitHub Action pour Lighthouse CI

---

## 8. Blog MDX — Architecture détaillée

### Choix technique : next-mdx-remote

**Pourquoi next-mdx-remote :**
- Compatible avec le file system (pas besoin de loader webpack)
- Support RSC (Server Components)
- Permet de passer des composants MDX personnalisés
- Parsing du frontmatter intégré
- Pas de configuration webpack complexe

**Alternative considérée :** `@next/mdx` — rejeté car nécessite un loader webpack et ne permet pas de charger des fichiers MDX depuis un dossier `content/` arbitraire.

### Structure d'un article MDX

```mdx
---
silo: S1
silo_nom: "Automatisation hôtelière"
type: pilier
title: "Le guide complet de l'automatisation hôtelière"
meta_description: "Découvrez comment automatiser..."
slug: "guide-automation-hoteliere"
date_publication: 2026-02-15
persona_cible: directeur
cta_principal: demo
images:
  - id: hero
    filename: hero-guide-automation-hoteliere.webp
    alt: "Illustration automatisation hôtelière"
---

# Le guide complet de l'automatisation hôtelière

<ImageBlock id="hero" />

Introduction de l'article...

## Pourquoi automatiser ?

<ImageBlock id="pourquoi" />

Contenu de la section...

<Callout type="info">
  Point important à retenir.
</Callout>

<NewsletterInline />

## Conclusion

<InternalLink href="/blog/automatisation/emails-pre-sejour/">
  Lire aussi : Comment automatiser vos emails pré-séjour
</InternalLink>
```

### Composants MDX disponibles

| Composant | Usage |
|-----------|-------|
| `<ImageBlock id="..." />` | Image générée, placée par le script d'import |
| `<Callout type="info\|warning\|tip" />` | Encadré mis en avant |
| `<InternalLink href="..." />` | Lien interne avec tracking |
| `<NewsletterInline />` | Formulaire newsletter inline |
| `<CodeBlock />` | Bloc de code stylé (si besoin) |

### Génération statique du blog

```typescript
// src/app/[locale]/(blog)/blog/[silo]/[slug]/page.tsx

export async function generateStaticParams() {
  const articles = getAllArticles('fr').concat(getAllArticles('en'));
  return articles.map((article) => ({
    locale: article.locale,
    silo: article.siloSlug,
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const article = getArticleBySlug(params.silo, params.slug, params.locale);
  return {
    title: article.title,
    description: article.metaDescription,
    openGraph: { ... },
    alternates: { languages: { ... } },
  };
}
```

---

## 9. Landing Pages — Architecture détaillée

### Approche : Configuration-driven

Les LP sont définies par des fichiers JSON dans `data/landing-pages/`. La route dynamique `/lp/[slug]` lit la config et assemble les composants.

### Composants modulaires LP

| Composant | Props clés | Usage |
|-----------|-----------|-------|
| `LPHeader` | logo, ctaText, ctaUrl | Header minimal (logo + CTA) |
| `LPHero` | title, subtitle, ctaText, ctaUrl, image | Section hero |
| `LPSocialProof` | logos[], stats[] | Preuve sociale |
| `LPFeatures` | features[] (icon, title, desc) | 3-6 features |
| `LPBenefits` | benefits[] (title, desc) | Avantages clés |
| `LPTestimonial` | quote, name, role, company, photo | Témoignage |
| `LPCTA` | title, subtitle, ctaText, ctaUrl | CTA finale |
| `LPPricing` | plans[] ou linkToPricing | Pricing simplifié |

### Layout LP

Les LP utilisent le route group `(lp)` qui a un layout sans Header/Footer standard. Seul le `LPHeader` simplifié est affiché.

```typescript
// src/app/[locale]/(lp)/lp/[slug]/page.tsx

export async function generateStaticParams() {
  const lps = getAllLandingPages();
  return lps.map(lp => ({ slug: lp.slug, locale: lp.locale }));
}
```

---

## 10. FR Traceability

| FR | Composant(s) | Statut |
|----|-------------|--------|
| FR-001 Header | `components/layout/Header.tsx` | Existant |
| FR-002 Footer | `components/layout/Footer.tsx` | Existant (newsletter à connecter) |
| FR-003 Hero | `components/sections/Hero.tsx` | Existant |
| FR-004 Logo Carousel | `components/sections/LogoCarousel.tsx` | Existant |
| FR-005 Features | `components/sections/Features.tsx` | Existant |
| FR-006 Timeline | `components/sections/CommunicationTimeline.tsx` | Existant |
| FR-007 Exemples | `components/sections/Examples.tsx` | Existant |
| FR-008 How It Works | `components/sections/HowItWorks.tsx` | Existant |
| FR-009 Pricing | `components/sections/Pricing.tsx` | Existant |
| FR-010 Badges | `components/sections/Benefits.tsx` | Existant |
| FR-011 Detailed Features | `components/sections/DetailedFeatures.tsx` | Existant |
| FR-012 Testimonials | `components/sections/Testimonials.tsx` | Existant |
| FR-013 FAQ | `components/sections/FAQ.tsx` | Existant |
| FR-014 CTA | `components/sections/CTASection.tsx` | Existant |
| FR-015 Pages légales | `app/[locale]/(main)/mentions-legales/` etc. | Existant |
| FR-016 Blog MDX | `content/blog/`, `lib/blog.ts`, blog routes | **À construire** |
| FR-017 Blog SEO | `seo/JsonLd.tsx` extension, metadata | **À construire** |
| FR-018 LP modulaire | `components/landing/shared/`, `data/landing-pages/`, LP route | **À construire** |
| FR-019 i18n | `i18n/`, `messages/`, middleware | Existant |
| FR-020 SEO technique | `seo/JsonLd.tsx`, `sitemap.ts`, `robots.ts` | Existant (à étendre pour blog) |
| FR-021 Newsletter | Footer form + API route ou Sibforms | **À connecter** |
| FR-022 Import articles | `scripts/import-articles.ts` | **À construire** |
| FR-023 Silos blog | `data/silos.ts`, blog silo routes | **À construire** |

### Résumé

| Statut | Count |
|--------|-------|
| Existant (complet) | 15 |
| À construire | 6 |
| À connecter/étendre | 2 |
| **Total** | **23** |

---

## 11. Trade-offs

### Decision 1 : MDX file system vs CMS headless

**Choix :** MDX dans le repo (`content/blog/`)
- **Gain :** Simplicité, pas de service externe, versionné dans Git, SSG natif, gratuit
- **Perte :** Pas d'interface d'édition pour les non-développeurs, rebuild nécessaire pour publier
- **Rationale :** Les articles sont rédigés par Claude et importés via script. Pas besoin d'interface d'édition. Un CMS headless sera envisagé en V2+ si l'équipe s'agrandit.

### Decision 2 : LP en JSON config vs LP en MDX

**Choix :** JSON config
- **Gain :** Structure stricte, composants typés, pas de risque de markup cassé, facile à valider
- **Perte :** Moins flexible que MDX pour du contenu libre
- **Rationale :** Les LP SEA ont une structure prévisible (hero → features → CTA). JSON force cette structure et rend les LP faciles à créer par configuration.

### Decision 3 : Script d'import CLI vs API route

**Choix :** Script CLI (`scripts/import-articles.ts` exécuté manuellement)
- **Gain :** Simple, pas d'endpoint à sécuriser, exécution locale avec accès au file system
- **Perte :** Pas automatisé (pas de webhook), nécessite d'être lancé manuellement
- **Rationale :** Le volume d'articles est faible (quelques par semaine max). Un webhook automatisé serait over-engineered. Le script est lancé après avoir déposé des articles dans le dossier.

### Decision 4 : Route group (blog) séparé vs intégré dans (main)

**Choix :** Route group `(blog)` séparé
- **Gain :** Possibilité d'un layout différent (sidebar, TOC sticky, etc.) sans impacter le layout marketing
- **Perte :** Légère duplication de layout (Header/Footer sont les mêmes)
- **Rationale :** Le blog aura probablement besoin d'une sidebar (TOC, newsletter CTA, articles liés) que le layout marketing n'a pas. Séparer maintenant évite un refactor plus tard.

---

## 12. Development & Deployment

### Environments

| Env | URL | Deploy trigger |
|-----|-----|---------------|
| Development | localhost:3001 | `npm run dev` |
| Preview | *.pages.dev | Push PR (Cloudflare Pages Git integration) |
| Production | trigger-flow.com | Push main (Cloudflare Pages) |

### Variables d'environnement

```
# .env.local (développement)
REPLICATE_API_TOKEN=r8_...        # Pour le script d'import d'images
BREVO_API_KEY=xkeysib-...         # Si API route newsletter (sinon Sibforms embed)

# Cloudflare Pages (production)
# Mêmes variables via Cloudflare Pages Dashboard > Settings > Environment variables
# Secrets sensibles (API keys) → Encrypted environment variables
```

### Commandes

```bash
npm run dev              # Dev server (port 3001)
npm run build            # Production build
npm run lint             # ESLint
npm run type-check       # TypeScript check
npm run preview          # Build & preview via Cloudflare Workers
npm run deploy           # Build & deploy to Cloudflare Pages

# Blog import
npx tsx scripts/import-articles.ts   # Import articles depuis le dossier externe
```

### Testing Strategy

| Type | Outil | Cible |
|------|-------|-------|
| Type check | `tsc --noEmit` | Toutes les sources |
| Lint | ESLint | Toutes les sources |
| Build check | `next build` | Pas d'erreurs de build, pas de pages cassées |
| Lighthouse | Lighthouse CI (optionnel) | Performance > 95, SEO = 100 |
| Visual | Manuel | Cross-browser, responsive |

Pas de tests unitaires ou E2E en V1 — le site est essentiellement statique et les vérifications de type + build couvrent la majorité des régressions.

---

*Document généré dans le cadre du workflow BMAD Method v6 — Phase 3: Solutioning*
