# STORY-007: LP dynamic routing & config system

**Epic:** EPIC-004 (Landing Pages SEA)
**Points:** 3
**Sprint:** 3
**Status:** not_started
**Dependencies:** STORY-006 (LP shared components) — completed

---

## User Story

As a marketer
I want to create new landing pages by configuration
So that I can launch LP for new campaigns without coding

---

## Context

STORY-006 a livré 8 composants LP partagés (`LPHeader`, `LPHero`, `LPSocialProof`, `LPFeatures`, `LPBenefits`, `LPTestimonial`, `LPCTA`, `LPPricing`). Ces composants sont agnostiques du contenu — tout est passé via props typées.

Cette story connecte ces composants à un système de configuration JSON : chaque LP est définie par un fichier JSON dans `src/data/landing-pages/`, et une route dynamique `/lp/[slug]` assemble automatiquement les composants selon la configuration.

Les LP existantes (`/lp/thais`, `/lp/thais-v2`, `/lp/thais-v3`) sont des routes statiques avec leurs propres composants monolithiques. Elles doivent rester inchangées et cohabiter avec la route dynamique.

---

## Décisions techniques

| Décision | Choix | Justification |
|----------|-------|---------------|
| Config format | **JSON files** dans `src/data/landing-pages/` | Structure stricte, typable, validable — pas de risque de markup cassé |
| i18n approach | **Un fichier JSON par locale** | `mews-integration.fr.json` + `mews-integration.en.json` — simple, pas de nested locale keys |
| Route cohabitation | **Next.js route priority** | Les routes statiques (`thais/`, `thais-v2/`, `thais-v3/`) ont priorité sur `[slug]/` — pas de conflit |
| Component mapping | **Static map object** | Map `{ LPHero, LPFeatures, ... }` importé depuis `shared/index.ts` — tree-shakeable, type-safe |
| SSG | **`generateStaticParams()`** | Toutes les LP sont pré-rendues à la build |
| Noindex | **Configurable par LP** | `noindex: true` dans la config pour les LP de test |

---

## Scope

### In scope

- Type `LandingPageConfig` et types associés
- Library `src/lib/landing-pages.ts` (read configs, get by slug)
- Route dynamique `/lp/[slug]/page.tsx` avec SSG + metadata
- Fichier d'exemple fonctionnel : `exemple-mews.fr.json`
- `LPHeader` intégré en haut de chaque LP dynamique
- Sitemap extension pour les LP dynamiques

### Out of scope

- LP existantes (thais, thais-v2, thais-v3) — inchangées
- Traductions dans `messages/` — les LP config sont auto-portantes (contenu dans le JSON)
- UTM parameter passthrough (les composants shared acceptent déjà `ctaHref` en props)
- Analytics / conversion tracking
- Preview mode / draft LPs

---

## Fichiers à créer / modifier

### 1. `src/types/landing-page.ts` — Types

```typescript
import type {
  LPHeaderProps,
  LPHeroProps,
  LPSocialProofProps,
  LPFeaturesProps,
  LPBenefitsProps,
  LPTestimonialProps,
  LPCTAProps,
  LPPricingProps,
} from '@/components/landing/shared';

interface LPSectionMap {
  LPHero: LPHeroProps;
  LPSocialProof: LPSocialProofProps;
  LPFeatures: LPFeaturesProps;
  LPBenefits: LPBenefitsProps;
  LPTestimonial: LPTestimonialProps;
  LPCTA: LPCTAProps;
  LPPricing: LPPricingProps;
}

type LPSection = {
  [K in keyof LPSectionMap]: { type: K; props: Omit<LPSectionMap[K], 'className'> };
}[keyof LPSectionMap];

interface LandingPageConfig {
  slug: string;
  locale: string;
  noindex?: boolean;
  header: {
    ctaLabel: string;
    ctaHref: string;
    ctaVariant?: 'primary' | 'secondary';
    logoSrc?: string;
  };
  metadata: {
    title: string;
    description: string;
    ogImage?: string;
  };
  sections: LPSection[];
}
```

### 2. `src/lib/landing-pages.ts` — Library

**Fonctions :**
- `getAllLandingPages(): LandingPageConfig[]` — Lit tous les fichiers `*.json` dans `src/data/landing-pages/`
- `getLandingPageBySlug(slug: string, locale: string): LandingPageConfig | undefined` — Retourne la config pour un slug+locale
- `getLandingPageSlugs(): Array<{ slug: string; locale: string }>` — Pour `generateStaticParams()`

**Implémentation :**
- Lire les fichiers JSON via `fs.readdirSync` + `JSON.parse`
- Convention de nommage : `{slug}.{locale}.json` (e.g., `exemple-mews.fr.json`)
- Validation minimale : vérifier que `slug`, `locale`, `metadata`, `sections` existent

### 3. `src/data/landing-pages/exemple-mews.fr.json` — Exemple

Un fichier d'exemple complet avec :
- Header config
- LPHero section (title, subtitle, CTA, trust indicators)
- LPSocialProof section (stats)
- LPFeatures section (3 features avec icônes)
- LPTestimonial section
- LPCTA section

### 4. `src/app/[locale]/(lp)/lp/[slug]/page.tsx` — Route dynamique

- `generateStaticParams()` depuis `getLandingPageSlugs()`
- `generateMetadata()` depuis la config (title, description, noindex)
- Component mapping : importe les composants shared et les rend selon `sections[]`
- `LPHeader` rendu en haut (depuis `config.header`)
- Si config non trouvée → `notFound()`

### 5. `src/app/sitemap.ts` — Extension

- Ajouter les LP dynamiques au sitemap (sauf celles avec `noindex: true`)

---

## Acceptance Criteria

- [ ] Type `LandingPageConfig` défini dans `src/types/landing-page.ts`
- [ ] `src/lib/landing-pages.ts` implémenté avec `getAllLandingPages()`, `getLandingPageBySlug()`, `getLandingPageSlugs()`
- [ ] Dossier `src/data/landing-pages/` créé avec fichier d'exemple `exemple-mews.fr.json`
- [ ] Route `/lp/[slug]/page.tsx` avec `generateStaticParams()` et `generateMetadata()`
- [ ] Rendu dynamique : les composants sont assemblés selon `sections[]` de la config
- [ ] `LPHeader` affiché en haut de chaque LP dynamique
- [ ] `noindex` optionnel dans metadata (robots)
- [ ] LP existantes (`/lp/thais`, `/lp/thais-v2`, `/lp/thais-v3`) toujours fonctionnelles
- [ ] Sitemap étendu pour inclure les LP dynamiques (hors noindex)
- [ ] Build passe sans erreur (`npm run build`)
- [ ] La page `/lp/exemple-mews` se rend correctement avec toutes les sections

---

## Technical Notes

- **Route priority** : Next.js résout les routes statiques avant les dynamiques. `thais/page.tsx` a priorité sur `[slug]/page.tsx` pour le slug `thais`. Aucun conflit.
- **Pas de `layout.tsx`** pour `[slug]/` — le `(lp)/layout.tsx` parent suffit (il rend juste `{children}`).
- **Component map** : Objet statique qui mappe les noms de section aux composants React. Ce map est type-safe grâce à `LPSectionMap`.
- **Pas de traductions next-intl** pour les LP dynamiques — le contenu est directement dans le JSON config par locale. Cela simplifie la création de LP sans toucher aux fichiers de traduction.
- **Le fichier exemple `exemple-mews`** sert à la fois de documentation et de test. Il peut être marqué `noindex: true` pour ne pas apparaître dans Google.

---

## Estimation

| Tâche | Effort |
|-------|--------|
| Types `LandingPageConfig` | ~0.5 pt |
| Library `landing-pages.ts` | ~0.5 pt |
| Route dynamique `[slug]/page.tsx` | ~1 pt |
| Fichier exemple JSON | ~0.5 pt |
| Sitemap extension | ~0.25 pt |
| Validation + test build | ~0.25 pt |
| **Total** | **3 pts** |

---

## Out of Scope

- Interface d'édition visuelle des LP
- Système de preview / draft
- A/B testing intégré
- UTM passthrough automatique (les URLs CTA sont dans le JSON)
- LP en anglais pour l'exemple (sera créé quand nécessaire)
- Modification des LP existantes (thais, thais-v2, thais-v3)
