# CLAUDE.md - TriggerFlow Website

## Project Overview

Site vitrine marketing pour TriggerFlow, un SaaS CRM et automatisation de communication pour hôtels indépendants. Migration depuis Webflow vers Next.js pour performance, SEO et contrôle total.

**URL actuelle:** https://www.trigger-flow.com
**URL app:** https://app.trigger-flow.com
**Démo booking:** https://app.lemcal.com/@trigger-flow/demo

## Tech Stack

- **Framework:** Next.js 16 (App Router, RSC)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **i18n:** next-intl (FR/EN)
- **Hosting:** `next start` sous systemd (service `tf-website`, port 3002) derrière Apache, sur un serveur Scaleway, déployé par GitHub Actions (`.github/workflows/deploy.yml`). Voir « Hosting & Deployment » : les commandes Cloudflare ne sont pas le chemin de production.
- **Icons:** Lucide React

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # Routes internationalisées
│   │   ├── page.tsx        # Homepage
│   │   ├── mentions-legales/
│   │   ├── cgv/
│   │   ├── cgu/
│   │   └── politique-confidentialite/
│   ├── layout.tsx          # Root layout
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/                 # Button, Badge, Card, Accordion, etc.
│   ├── sections/           # Hero, Features, Pricing, FAQ, etc.
│   └── layout/             # Header, Footer, Navigation
├── lib/
│   ├── utils.ts            # cn() helper, formatters
│   └── constants.ts        # Pricing plans, features data
├── messages/
│   ├── fr.json             # French translations
│   └── en.json             # English translations
└── styles/
    └── globals.css
```

## Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint check
npm run type-check   # TypeScript check (add to package.json: "type-check": "tsc --noEmit")
npm run preview      # Build & preview via Cloudflare (opennextjs-cloudflare), hors production
npm run deploy       # Build & deploy to Cloudflare Pages, hors production (la prod passe par deploy.yml)
```

## Code Conventions

### Components

- **Server Components by default** - Only use "use client" when needed (interactivity, hooks)
- **One component per file** - Named exports for components
- **Props interface** - Define Props type above component

```tsx
// src/components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', size = 'md', children }: ButtonProps) {
  return <button className={cn(baseStyles, variants[variant], sizes[size])}>{children}</button>;
}
```

### Styling

- **Tailwind only** - No CSS modules, no styled-components
- **Use cn() helper** - For conditional classes (clsx + tailwind-merge)
- **Design tokens** - Define in tailwind.config.ts

```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Translations (next-intl)

- **Keys in camelCase** - `hero.title`, `pricing.plans.communication`
- **Interpolation** - Use `{variable}` syntax
- **Pluralization** - Use ICU format when needed

```json
// src/messages/fr.json
{
  "hero": {
    "title": "Automatisez les tâches de votre choix",
    "cta": "Réserver une démo"
  }
}
```

```tsx
// Usage in component
import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('hero');
  return <h1>{t('title')}</h1>;
}
```

### Images

- **Use next/image** - En production, `next start` sert l'optimisation (`/_next/image`), mise en cache un jour (`images.minimumCacheTTL` dans next.config.ts).
- **Pre-optimize images** - All images MUST still be pre-optimized (WebP format, correct dimensions, compressed): the server is small and shared
- **WebP format** - Convert all images before committing
- **Explicit dimensions** - Always set width/height to avoid CLS
- **Priority for LCP** - Add `priority` to above-fold images

```tsx
import Image from 'next/image';

<Image
  src="/images/hero.webp"
  alt="TriggerFlow dashboard"
  width={800}
  height={600}
  priority // For hero images
  className="rounded-lg"
/>
```

## Brand & Design

### Colors (from Webflow site)

```ts
// tailwind.config.ts
colors: {
  brand: {
    primary: '#00875a',     // Green - CTAs, accents
    dark: '#1a1a2e',        // Dark blue - Headers, text
    light: '#f5f5f5',       // Light gray - Backgrounds
  }
}
```

### Typography

- **Headings:** Font-weight bold, dark color
- **Body:** 16px base, regular weight
- **CTA buttons:** Medium weight, uppercase optional

### Spacing

- **Sections:** py-16 md:py-24 (64px mobile, 96px desktop)
- **Container:** max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

## Key Features to Implement

### Homepage Sections (in order)

1. **Header** - Logo, nav links (anchors), lang switcher, CTAs
2. **Hero** - Title, subtitle, CTA, badges, hero image
3. **LogoCarousel** - Client logos (Accor, Sofitel, Ibis, Best Western...)
4. **Features** - 3 feature cards with icons
5. **CommunicationTimeline** - Before/During/After stay
6. **Examples** - 4 use case tabs (SMS, Events, Surveys, Upsell)
7. **HowItWorks** - 3 steps with PMS logos
8. **Pricing** - 4 plans comparison table
9. **Benefits** - 4 badges (Support, RGPD, etc.)
10. **DetailedFeatures** - 3 tabs with screenshots
11. **Testimonials** - Carousel with quotes
12. **FAQ** - Accordion component
13. **CTASection** - Final call to action
14. **Footer** - Links, newsletter, social

### Legal Pages

- `/mentions-legales` - Legal notice
- `/cgv` - Terms of sale
- `/cgu` - Terms of use  
- `/politique-confidentialite` - Privacy policy

## SEO Requirements

### Metadata (each page)

```tsx
// src/app/[locale]/page.tsx
export const metadata: Metadata = {
  title: 'TriggerFlow | Automatisation relation client hôtelière',
  description: 'Solution SaaS pour automatiser SMS, emails et fidélisation client dans l\'hôtellerie.',
  openGraph: {
    title: '...',
    description: '...',
    images: ['/og-image.jpg'],
  },
};
```

### Schema.org (JSON-LD)

- Organization
- SoftwareApplication  
- FAQPage
- Product (pricing)

## Performance Targets

- **Lighthouse Performance:** > 95
- **Lighthouse SEO:** 100
- **LCP:** < 2.5s
- **CLS:** < 0.1

## Hosting & Deployment

- **Production :** `next start`, un seul processus, sous systemd (service `tf-website`, port 3002), derrière Apache, sur le serveur Scaleway stayrival-01 (4 Go, partagé). Site dans `/srv/triggerflow-website`, utilisateur `tfsite`.
- **Déploiement :** `.github/workflows/deploy.yml`, à chaque push sur `main` : build dans GitHub Actions (le serveur ne le supporte pas), copie des fichiers par SSH, écriture des variables d'exécution dans `.env.production.local`, redémarrage du service, contrôle de `/fr`.
- **Variables :** secrets GitHub du dépôt. Une variable d'exécution s'ajoute dans `deploy.yml` (env de l'étape SSH, liste `envs:`, filtre `grep -v`, ligne `printf`, boucle de diagnostic). Les `NEXT_PUBLIC_*` sont figées au build.
- **IP des visiteurs :** dernier membre de `x-forwarded-for`, ajouté par Apache (`src/lib/visitor-ip.ts`) ; `cf-connecting-ip` n'est lu qu'avec `TRUST_CF_CONNECTING_IP=1`.
- **Limites en mémoire :** les limites par visiteur (calendrier, PDF partagés) vivent dans le processus ; un redémarrage les remet à zéro.
- **Arrêt :** au redémarrage, les PDF partagés en cours de téléchargement sont coupés sur SIGTERM, ainsi que les appels au backend et les écritures du fichier en cours (le lecteur reçoit « réessayez »), puis Next sort de lui-même.
- **Écriture sur le disque à l'exécution :** une seule, le fichier temporaire des PDF partagés (`src/lib/shared-pdf.ts`, dossier `SHARED_PDF_TMP_DIR`, voir le README). Ailleurs, `fs` ne fait que lire des fichiers du dépôt, et pas seulement au build : `/api/calendrier/modele` lit les modèles MJML du calendrier au premier appel (`lib/calendrier-mjml.ts`, `src/data/calendrier-mjml/`, gardés ensuite en mémoire du processus) ; le blog, les pages d'atterrissage et les pages légales (`lib/blog.ts`, `lib/landing-pages.ts`, `lib/legal.ts`) sont lus au build, puis à l'exécution quand une page est régénérée : toutes les heures pour les articles du blog et les pages légales (layouts `(blog)` et `(main)`, `revalidate = 3600`) comme pour `llms.txt`, et à la première visite d'une page absente de `generateStaticParams`. Les pages temps fort du calendrier, sous `(main)`, sont aussi régénérées toutes les heures ; leurs modèles MJML viennent alors de la mémoire du processus. Le déploiement copie tout le dépôt, ces dossiers compris.
- **No Server Actions :** non utilisées.

### OpenNext / Cloudflare (hors production)

`wrangler.jsonc`, `open-next.config.ts` et les scripts `preview` / `deploy` viennent d'un ancien hébergement sur Cloudflare Pages. Ils ne servent plus la production : un secret posé avec `wrangler secret put` n'y arrive jamais.

## External Links

- Demo booking: `https://app.lemcal.com/@trigger-flow/demo` (target="_blank")
- App login: `https://app.trigger-flow.com/login`
- Newsletter: Brevo/Sibforms integration
- LinkedIn: Company page link

## DO NOT

- ❌ Use CSS-in-JS or CSS modules
- ❌ Use `any` type in TypeScript
- ❌ Forget alt text on images
- ❌ Use inline styles
- ❌ Create client components without necessity
- ❌ Hardcode text (use translations)
- ❌ Forget responsive design (mobile-first)

---

## Blog — SEO & Content Management

### Architecture du contenu

#### Silos sémantiques

Le blog est organisé en **silos thématiques** (définis dans `src/data/silos.ts`) :

| ID | Nom | Slug |
|----|-----|------|
| S1 | Automatisation hôtelière | `automatisation` |
| S2 | Expérience client | `experience-client` |
| S3 | Revenue & Upselling | `revenue-upselling` |
| S4 | Tech & Intégrations | `tech-integrations` |
| S5 | Guides pratiques | `guides` |

Chaque silo contient :
- **1 article pilier** : guide complet (2000-4000 mots), fait autorité sur le sujet
- **3 à 8 articles satellites/support** : sous-sujets ciblés (800-1500 mots), liés au pilier

#### Arborescence des fichiers

```
content/blog/
├── fr/
│   ├── automatisation/
│   │   ├── marketing-automation-hotelier-guide.mdx    # pilier
│   │   ├── email-pre-sejour-hotel.mdx                 # satellite
│   │   └── ...
│   ├── experience-client/
│   │   └── crm-hotelier-guide.mdx                     # pilier
│   └── ...
├── en/
│   ├── automatisation/
│   │   └── hotel-marketing-automation-guide.mdx
│   └── ...
```

**Nommage des fichiers :**
- Fichier = slug de l'article : `mon-slug-article.mdx`
- Slug : minuscules, sans accents, mots séparés par tirets
- Le `translationKey` est identique dans toutes les langues pour lier les versions

#### Types d'articles

| Type | Mots | Objectif |
|------|------|----------|
| `pilier` | 2000-4000 | Guide de référence exhaustif |
| `satellite` | 800-1500 | Sous-sujet ciblé, précis |
| `support` | 1200-2000 | Analyse détaillée, comparatif |

### Frontmatter — Schéma strict

Le frontmatter contient uniquement les champs utilisés par le code. Les métadonnées SEO avancées vont dans le commentaire HTML en fin d'article.

```yaml
---
locale: fr
translationKey: "marketing-automation-hotelier-guide"  # = slug, identique toutes langues

# === SILO & STRUCTURE ===
silo: S1
silo_nom: "Automatisation hôtelière"
type: pilier                    # pilier | support | satellite
pilier_parent: null             # slug du pilier parent (si type != pilier)

# === SEO ===
title: "Marketing automation hôtelier : le guide complet 2026"
meta_description: "Découvrez comment automatiser la relation client... 150-160 caractères"
mot_cle_principal: "marketing automation hôtel"
mots_cles_secondaires:
  - "automatisation hôtellerie"
  - "workflow hôtel"

# === URL & DATES ===
slug: "marketing-automation-hotelier-guide"
date_publication: 2026-01-31
date_mise_a_jour: 2026-01-31
auteur: mounir-lakhfif         # mounir-lakhfif | soufiane-bouyahia (src/data/authors.ts), défaut mounir-lakhfif

# === CONTENU ===
longueur_mots: 4200             # auto-calculé si absent
temps_lecture: 17               # auto-calculé si absent

# === TRIGGERFLOW SPECIFIQUE ===
persona_cible: tous             # directeur | marketing_groupe | revenue_manager | tous
cta_principal: demo             # demo | newsletter | les_deux
fonctionnalites_mises_en_avant:
  - "Marketing automation"
  - "CRM hôtelier"
pms_mentionnes:
  - "Mews"
  - "Opera Cloud"

# === MAILLAGE INTERNE ===
liens_internes:
  - fichier: experience-client/crm-hotelier-guide
    ancre: "CRM hôtelier"
    contexte: "Lier quand on parle de centralisation des données clients"
liens_externes:
  - url: https://app.lemcal.com/@trigger-flow/demo
    ancre: "réserver une démo"
    contexte: "CTA de fin d'article"

# === IMAGES ===
images:
  - id: hero
    filename: hero-marketing-automation-hotelier-guide.webp
    alt: "Réceptionniste d'hôtel utilisant un système de marketing automation"
    placement: after_title
    width: 1200
    height: 630
---
```

#### Règles du frontmatter

- `title` : 50-65 caractères, mot-clé principal intégré naturellement
- `meta_description` : 150-160 caractères, contient le mot-clé principal, incite au clic
- `translationKey` : **identique** dans toutes les versions linguistiques (= slug)
- `pilier_parent: null` si `type: pilier`, sinon slug du pilier parent obligatoire
- `image.alt` : descriptif et accessible, mot-clé si naturel (pas de bourrage)
- **Ne pas ajouter de champs non reconnus** par le schéma TypeScript (`src/types/blog.ts`)

### Métadonnées SEO avancées — Commentaire HTML en fin d'article

Les mots-clés longue traîne, le champ sémantique et les prompts images vont dans un **commentaire HTML en fin d'article** (pas dans le frontmatter) :

**Important :** En MDX, les commentaires HTML `<!-- -->` ne sont pas supportés. Utiliser la syntaxe JSX `{/* */}`.

```mdx
{/*
@METADATA_SEO
canonical: https://www.trigger-flow.com/fr/blog/automatisation/marketing-automation-hotelier-guide/
ogTitle: Marketing automation hôtelier : automatisez votre relation client
ogDescription: Guide complet pour automatiser emails, SMS et WhatsApp dans votre hôtel
keywords_primary: marketing automation hôtel
keywords_secondary: automatisation hôtellerie, workflow hôtel
keywords_longtail: comment automatiser les emails de mon hôtel, outil marketing automation hôtellerie indépendante
semantic_field: automatisation, workflow, parcours client, pré-séjour, post-séjour, fidélisation, multicanal, PMS, CRM, emailing hôtelier

@IMAGES_PROMPTS
hero [nano-banana-pro]: Professional hotel reception with tablet showing automation dashboard --ar 16:9
body_1 [nano-banana-pro] [after:probleme-outils-isoles]: Frustrated hotel staff with multiple screens --ar 16:9
body_2 [nano-banana-pro] [after:parcours-client-automatise]: Customer journey timeline visualization --ar 16:9
*/}
```

#### Le champ `semantic_field`

Lister 5-10 termes sémantiquement liés au mot-clé principal. Ces termes doivent apparaître naturellement dans l'article pour renforcer la profondeur thématique aux yeux de Google.

### Règles de rédaction du contenu

#### Structure MDX

0. **Résumé en tête** : un `<Callout type="info">` qui commence par `**En bref :**` (FR) ou `**In short:**` (EN), 2-3 phrases qui répondent à la requête principale (GEO, vérifié par `npm test`)
1. **PAS de H1** dans le body (le titre est dans le frontmatter)
2. **PAS de sommaire/table des matières** (généré automatiquement par `generateTableOfContents()`)
3. Commencer directement par le premier paragraphe (pas de H2 en première ligne)
4. Structure H2 → H3 sans sauter de niveaux
5. Utiliser les composants MDX disponibles : `<ImageBlock>`, `<Callout>`, `<InternalLink>`, `<NewsletterInline>`, `<KeyFigure>`, `<KeyFiguresGrid>`

#### Liens internes

Format dans le contenu MDX :

```mdx
<!-- Lien contextuel standard -->
[guide complet du CRM hôtelier](/fr/blog/experience-client/crm-hotelier-guide/)

<!-- Ou via le composant InternalLink pour un style enrichi -->
<InternalLink href="/fr/blog/experience-client/crm-hotelier-guide/">guide complet du CRM hôtelier</InternalLink>
```

**Règles :**
- Texte d'ancre descriptif (jamais "cliquez ici" ou "en savoir plus")
- 3-5 liens internes par article de 1000 mots
- Minimum 1 lien vers le pilier du silo (pour les satellites)
- Minimum 1 lien vers un autre silo quand pertinent (lien inter-silo)
- 1 CTA mid-article vers une page stratégique (démo, produit)
- 1 CTA en conclusion
- Liens internes relatifs : `/fr/blog/[silo]/[slug]/` (pas d'URL absolue)

#### Mots-clés

- Le mot-clé principal apparaît dans : le premier paragraphe, 2-3 H2, la conclusion
- Pas de keyword stuffing : densité naturelle, jamais forcée
- Utiliser les mots-clés secondaires dans les H2/H3
- Intégrer les termes du `semantic_field` dans le corps du texte

### Qualité rédactionnelle — Anti-détection IA

#### Mots et expressions INTERDITS

| Interdit | Alternative |
|----------|-------------|
| Plongeons dans... | [Supprimer, commencer directement] |
| Dans le paysage actuel | Aujourd'hui |
| Il est important de noter que | [Supprimer, énoncer directement] |
| En effet | [Supprimer ou reformuler] |
| Par ailleurs | Aussi / D'un autre côté |
| Force est de constater | Les chiffres montrent |
| Incontournable | Utile / Efficace / Essentiel |
| Au cœur de | [Reformuler concrètement] |
| Levier | Outil / Moyen / Technique |
| En définitive | [Supprimer ou reformuler] |
| Décryptons / Explorons | [Supprimer, aller droit au fait] |
| Vers une... | [Reformuler concrètement] |
| N'hésitez pas à | [Supprimer, formuler comme action directe] |

#### Patterns d'écriture à éviter

- Phrases d'introduction qui annoncent ce qu'on va dire au lieu de le dire
- Conclusions qui résument tout ce qui vient d'être dit
- Listes systématiques (varier avec des paragraphes narratifs)
- Phrases de même longueur (varier entre courtes et longues)
- Ton uniformément enthousiaste ou promotionnel
- Adverbes superflus (véritablement, fondamentalement, considérablement)

#### Patterns d'écriture à FAVORISER

- Commencer certaines sections par une anecdote ou une observation terrain
- Utiliser des données chiffrées concrètes (pas de "beaucoup" ou "significatif")
- Varier la longueur des phrases (10 mots puis 30 mots puis 15)
- Poser des questions rhétoriques ponctuellement
- Utiliser le "vous" direct (pas "l'hôtelier" à la 3ème personne)
- Inclure des limites ou nuances (pas de ton 100% positif)
- Phrases incises et parenthèses occasionnelles
- Vocabulaire métier authentique de l'hôtellerie

### Maillage interne — Stratégie

#### Liens obligatoires par type d'article

| Type d'article | Liens requis |
|----------------|-------------|
| Satellite/Support | 1 lien vers son pilier + 1 lien inter-silo |
| Pilier | Liens vers chaque satellite du silo + 1-2 liens inter-silos |
| Comparatif | Liens vers les piliers des sujets comparés |

#### Types de liens internes

1. **Contextuel** (dans le corps du texte) : le plus puissant pour le SEO
2. **CTA mid-article** : bloc d'appel à l'action vers démo/produit, placé après le 2ème ou 3ème H2
3. **Mention connexe en conclusion** : "Pour approfondir, consultez notre [guide complet...]"
4. **Inter-silo** : quand un sujet touche naturellement un autre silo

#### Textes d'ancre

- Descriptifs et variés (pas toujours le même texte pour le même lien)
- Contiennent le mot-clé de la page cible quand c'est naturel
- Jamais "cliquez ici", "en savoir plus", "lire la suite"

### Données structurées (Schema Markup)

Implémentées dans `src/components/seo/JsonLd.tsx` :

- **BlogPosting** : sur chaque article (headline, description, datePublished, wordCount, keywords)
- **BreadcrumbList** : navigation fil d'Ariane (Blog > Silo > Article)
- **FAQPage** : si l'article contient des sections Q/R
- **Organization** : schema entreprise TriggerFlow
- **SoftwareApplication** : schema produit

### Images blog

#### Stockage

```
public/images/blog/[article-slug]/
├── hero-[slug].webp
├── [description]-[slug].webp
└── ...
```

#### Dimensions et poids

| Type | Largeur | Ratio | Poids max |
|------|---------|-------|-----------|
| Hero | 1200px | 16:9 | < 150 Ko |
| Corps d'article | 800px | 16:9 ou 4:3 | < 100 Ko |
| Infographie | 800px | Variable | < 200 Ko |

#### Utilisation dans MDX

```mdx
<ImageBlock id="hero" />
<ImageBlock id="probleme-outils" />
```

Le composant `ImageBlock` résout les images depuis le frontmatter `images[]` et génère le chemin `/images/blog/{slug}/{filename}`.

### Multilingue — Adaptation culturelle

Chaque version linguistique est **adaptée culturellement**, pas traduite mot à mot :

- Exemples locaux (villes, réglementations, institutions)
- Vocabulaire métier authentique de chaque marché
- Ton adapté aux conventions locales
- Devise locale si pertinent
- Même structure, même `translationKey`

**Checklist multilingue :**
- `translationKey` identique dans toutes les versions
- `locale` correctement défini (`fr` ou `en`)
- Liens internes adaptés (`/fr/blog/...`, `/en/blog/...`)
- Exemples localisés
- Vocabulaire métier vérifié

### Checklist pré-publication

#### SEO technique

- [ ] Frontmatter strict (pas de champs non reconnus)
- [ ] Title : 50-65 caractères, mot-clé au début
- [ ] Meta description : 150-160 caractères, incitative
- [ ] Slug propre avec mot-clé principal
- [ ] Image hero avec alt descriptif
- [ ] `translationKey` renseigné
- [ ] Commentaire `@METADATA_SEO` et `@IMAGES_PROMPTS` en fin d'article

#### Contenu

- [ ] Pas de H1, pas de sommaire (auto-généré)
- [ ] Premier paragraphe contient le mot-clé principal
- [ ] Hiérarchie H2/H3 logique
- [ ] Longueur respectée (pilier 2000-4000, satellite 800-1500)
- [ ] Données chiffrées ou exemples concrets
- [ ] Champ sémantique couvert (5-10 termes liés)

#### Maillage interne

- [ ] 3-5 liens internes contextuels
- [ ] Lien vers le pilier (si satellite/support)
- [ ] Au moins 1 lien inter-silo
- [ ] CTA mid-article vers page stratégique (démo)
- [ ] CTA en conclusion
- [ ] Textes d'ancre descriptifs et variés

#### Qualité rédactionnelle

- [ ] Aucun mot/expression de la liste interdite
- [ ] Variété des longueurs de phrases
- [ ] Ton expert, pas promotionnel
- [ ] Vocabulaire métier hôtellerie authentique
- [ ] `translationKey` identique dans tous les fichiers linguistiques

### Workflow de rédaction

#### Étape 1 : Demande d'article

Fournir au minimum :

```
Titre : "..."
Type : pilier / satellite / support
Silo : S1-S5 (ou nom)
Langue(s) : FR / EN
Mot-clé principal : "..."
Articles à lier : [slugs des articles existants]
```

#### Étape 2 : Génération

Claude Code génère les fichiers `.mdx` avec :
- Frontmatter strict conforme au schéma
- Contenu adapté par langue (adaptation culturelle, pas traduction)
- Liens internes intégrés via composants MDX
- Commentaire HTML en fin avec `@METADATA_SEO` et `@IMAGES_PROMPTS`

#### Étape 3 : Vérification

Passer la checklist pré-publication avant de merger.

#### Étape 4 : Post-publication

- Soumettre la nouvelle URL dans Google Search Console
- Vérifier l'indexation après 48h
- Ajouter des liens internes depuis les articles existants vers le nouveau contenu

### Fichiers clés du blog

| Fichier | Rôle |
|---------|------|
| `src/lib/blog.ts` | Chargement et parsing des articles MDX |
| `src/types/blog.ts` | Types TypeScript (Article, Silo, etc.) |
| `src/data/silos.ts` | Définition des 5 silos |
| `src/components/blog/` | Composants UI blog (ArticleCard, SiloNav, TOC, etc.) |
| `src/components/mdx/` | Composants MDX (ImageBlock, Callout, InternalLink, etc.) |
| `src/components/seo/JsonLd.tsx` | Schemas JSON-LD |
| `src/app/[locale]/(blog)/blog/` | Pages blog (listing, silo, article) |
| `content/blog/` | Fichiers .mdx des articles |
| `public/images/blog/` | Images optimisées des articles |

---

## Reference

See `/docs/PRD.docx` for full specifications including:
- Detailed section descriptions
- Complete pricing table structure
- All testimonials content
- FAQ questions/answers
- Security headers configuration
