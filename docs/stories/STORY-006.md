# STORY-006: LP shared components (composants modulaires)

**Epic:** EPIC-004 (Landing Pages SEA)
**Points:** 5
**Sprint:** 2
**Status:** not_started
**Dependencies:** Aucune

---

## User Story

As a marketer
I want reusable landing page components
So that I can quickly create targeted LP for Google Ads campaigns

---

## Context

Les LP actuelles (Thais v1/v2/v3) sont monolithiques — chaque version contient ses propres composants avec contenu hardcodé. Pour permettre la création rapide de nouvelles LP SEA, on a besoin de composants partagés, agnostiques du contenu, qui recevront tout via props typées.

STORY-007 (LP dynamic routing) dépend de cette story pour assembler les composants via configuration JSON.

---

## Décisions techniques

| Décision | Choix | Justification |
|----------|-------|---------------|
| Server vs Client Components | **Server Components** par défaut | Pas de Framer Motion ni d'interactivité — performance maximale, SSG-compatible |
| Styling approach | **Tailwind + design tokens** | Cohérence avec le reste du site, pas de CSS custom properties comme Thais v3 |
| CTA links | **`ButtonLink` existant** | Réutilise le composant UI commun (`@/components/ui`) |
| Icons | **Lucide React via props** | Chaque composant accepte un nom d'icône ou un ReactNode |
| Layout | **`Container` + `SectionWrapper`** | Réutilise les composants UI existants pour le spacing et le max-width |
| Contenu | **100% via props** | Zéro hardcoded text — tout est passé par le parent (page ou config JSON) |
| Images | **`next/image`** | Optimisation automatique, lazy loading |

---

## Composants à créer

### Emplacement : `src/components/landing/shared/`

### 1. LPHeader

**Props :**
```typescript
interface LPHeaderProps {
  logoSrc?: string;         // Default: /images/logo.svg
  logoAlt?: string;         // Default: "TriggerFlow"
  ctaLabel: string;         // e.g. "Réserver une démo"
  ctaHref: string;          // e.g. lemcal URL
  ctaVariant?: 'primary' | 'secondary'; // Default: 'primary'
}
```

**Comportement :**
- Barre fixe top avec logo à gauche, CTA à droite
- Pas de navigation complète (LP = pas de distractions)
- `sticky top-0 z-50` avec backdrop blur
- Responsive : logo + CTA sur mobile aussi

---

### 2. LPHero

**Props :**
```typescript
interface LPHeroProps {
  badge?: string;           // Optional badge text above title
  title: string;            // Main headline (supports JSX for rich formatting)
  subtitle: string;         // Subheadline
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  imageSrc?: string;        // Optional hero image (right side on desktop)
  imageAlt?: string;
  trustIndicators?: string[]; // e.g. ["Sans code", "14 jours gratuits", "Support 7j/7"]
}
```

**Comportement :**
- Layout : 2 colonnes desktop (texte gauche, image droite), 1 colonne mobile
- Badge optionnel au-dessus du titre (style pill)
- Trust indicators sous le CTA (checkmarks)
- Min-height pour impact visuel
- Fond brand-light avec dégradé subtil

---

### 3. LPSocialProof

**Props :**
```typescript
interface LPSocialProofProps {
  title?: string;           // e.g. "Ils nous font confiance"
  logos?: Array<{ src: string; alt: string; width?: number }>;
  stats?: Array<{ value: string; label: string }>;  // e.g. { value: "500+", label: "Hôtels" }
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}
```

**Comportement :**
- 3 modes possibles (un ou plusieurs) : logos, stats, mini-testimonial
- Logos : défilement horizontal ou grille
- Stats : 3-4 chiffres côte à côte avec labels
- Mini-testimonial : citation courte centrée avec auteur
- Fond neutre (white ou light)

---

### 4. LPFeatures

**Props :**
```typescript
interface LPFeatureItem {
  icon: string;             // Lucide icon name (e.g. "Mail", "Clock", "Zap")
  title: string;
  description: string;
}

interface LPFeaturesProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  features: LPFeatureItem[];  // 3-6 features
  columns?: 2 | 3;           // Default: 3
}
```

**Comportement :**
- Grille responsive : `columns` colonnes desktop, 2 tablette, 1 mobile
- Chaque feature : icône Lucide dans cercle coloré + titre bold + description
- Section title/subtitle centrés au-dessus
- Mapping dynamique des noms d'icônes Lucide vers les composants

---

### 5. LPBenefits

**Props :**
```typescript
interface LPBenefitItem {
  title: string;
  description: string;
  highlight?: string;       // Optional highlighted stat/number
}

interface LPBenefitsProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  benefits: LPBenefitItem[];
  layout?: 'list' | 'grid';  // Default: 'list'
}
```

**Comportement :**
- Layout `list` : alternance texte-gauche/texte-droite (zigzag) — focus contenu
- Layout `grid` : cards en grille 2x2 ou 3
- Checkmark vert devant chaque bénéfice
- Highlight optionnel en gros chiffre au-dessus du titre

---

### 6. LPTestimonial

**Props :**
```typescript
interface LPTestimonialProps {
  quote: string;
  authorName: string;
  authorRole: string;       // e.g. "Directeur, Hôtel Le Majestic"
  authorImage?: string;     // Optional photo
  rating?: number;          // Optional 1-5 stars
  companyLogo?: string;     // Optional company logo
}
```

**Comportement :**
- Grande citation avec guillemets décoratifs
- Photo auteur arrondie + nom + rôle en dessous
- Étoiles optionnelles (Rating avec Star icons)
- Fond brand-light avec bordure gauche accent
- Centré, max-w-3xl

---

### 7. LPCTA

**Props :**
```typescript
interface LPCTAProps {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  benefits?: string[];       // Checkmark list under CTA
}
```

**Comportement :**
- Section plein-écran avec fond brand-primary (ou brand-dark)
- Texte blanc centré
- CTA principal en blanc (inversé), secondaire en outline
- Benefits list avec checkmarks blancs
- Inspiré de ThaisV3CTA mais simplifié (pas de Framer Motion)

---

### 8. LPPricing

**Props :**
```typescript
interface LPPricingPlan {
  name: string;
  description?: string;
  price: string;            // e.g. "49€/mois" or "Sur devis"
  originalPrice?: string;   // Strikethrough price
  popular?: boolean;        // Highlighted card
  features: string[];       // Included features list
  ctaLabel: string;
  ctaHref: string;
}

interface LPPricingProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  plans: LPPricingPlan[];   // 1-3 plans
  footnote?: string;        // e.g. "Tous les prix sont HT"
}
```

**Comportement :**
- 1-3 cards en grille responsive
- Card `popular` mise en avant (bordure accent, badge "Populaire", scale légèrement)
- Prix barré si `originalPrice` fourni
- Features avec checkmarks
- CTA en bas de chaque card
- Footnote centré sous les cards

---

### 9. Barrel export : `index.ts`

```typescript
export { LPHeader } from './LPHeader';
export { LPHero } from './LPHero';
export { LPSocialProof } from './LPSocialProof';
export { LPFeatures } from './LPFeatures';
export { LPBenefits } from './LPBenefits';
export { LPTestimonial } from './LPTestimonial';
export { LPCTA } from './LPCTA';
export { LPPricing } from './LPPricing';
```

---

## Acceptance Criteria

- [ ] 8 composants créés dans `src/components/landing/shared/`
- [ ] Chaque composant est un **Server Component** (pas de `'use client'`)
- [ ] Props typées TypeScript pour chaque composant (interfaces exportées)
- [ ] Design orienté conversion : épuré, focus sur le CTA, whitespace généreux
- [ ] Responsive sur tous les breakpoints (mobile-first)
- [ ] Réutilise les composants UI existants : `Container`, `SectionWrapper`, `ButtonLink`
- [ ] Réutilise les design tokens Tailwind (`brand-primary`, `brand-dark`, `brand-light`)
- [ ] Barrel export dans `index.ts`
- [ ] Mapping Lucide icons dynamique dans `LPFeatures`
- [ ] Build passe sans erreur (`npm run build`)
- [ ] Pas de contenu hardcodé — tout via props

---

## Technical Notes

- **Pas de Framer Motion** — contrairement aux composants Thais v3, les shared components sont Server Components purs pour maximiser la performance SSG. Les animations pourront être ajoutées dans un wrapper client si nécessaire par LP.
- **Mapping Lucide icons** : Créer un helper `getLucideIcon(name: string)` qui retourne le composant Lucide correspondant. Utiliser un map statique des icônes les plus courantes plutôt qu'un import dynamique (tree-shaking).
- **`SectionWrapper`** : Utiliser ce composant existant pour le padding vertical cohérent entre sections.
- **Les types** doivent être exportés pour être réutilisés dans STORY-007 (LandingPageConfig).

---

## Estimation

| Composant | Complexité | Effort |
|-----------|-----------|--------|
| LPHeader | Simple | ~0.5 pt |
| LPHero | Moyen | ~1 pt |
| LPSocialProof | Moyen | ~0.5 pt |
| LPFeatures | Moyen (icon mapping) | ~0.5 pt |
| LPBenefits | Simple | ~0.5 pt |
| LPTestimonial | Simple | ~0.5 pt |
| LPCTA | Simple | ~0.5 pt |
| LPPricing | Moyen | ~1 pt |
| **Total** | | **5 pts** |

---

## Out of Scope

- Framer Motion animations (ajout ultérieur si nécessaire)
- Contenu spécifique à une campagne (sera dans la config JSON de STORY-007)
- Route dynamique `/lp/[slug]` (STORY-007)
- UTM parameter passthrough (sera géré dans STORY-007 au niveau page)
- Dark mode
