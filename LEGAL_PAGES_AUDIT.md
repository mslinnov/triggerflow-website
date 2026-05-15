# Legal Pages Audit — TriggerFlow

Audit complet de la stack et de la structure actuelle des pages légales en vue de la refonte CGV/CGU et de l'ajout d'un Contrat de prestation type + DPA.

---

## 1. Stack

| Élément | Valeur |
|---|---|
| **Framework** | Next.js `^16.1.6` |
| **Router** | **App Router** (`src/app/`) |
| **Langage** | TypeScript (strict, configuré via `tsconfig.json`) |
| **i18n** | `next-intl ^4.7.0` — initialisé via `createNextIntlPlugin('./src/i18n/request.ts')` dans `next.config.ts` |
| **Locales supportées** | `fr` (default) et `en` — déclarées dans `src/i18n/routing.ts`, `localePrefix: 'always'` |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/postcss`) + plugin `@tailwindcss/typography` (déclaré via `@plugin "@tailwindcss/typography"` dans `src/app/globals.css`) |
| **Utilitaires CSS** | `clsx` + `tailwind-merge` exposés via `cn()` dans `src/lib/utils.ts` |
| **Polices** | `IBM_Plex_Sans`, `Geist_Mono`, `Fraunces` (next/font/google) chargées dans `src/app/[locale]/layout.tsx` |
| **MDX (existant)** | `next-mdx-remote ^5.0.0` utilisé uniquement pour le blog (`src/app/[locale]/(blog)/blog/[silo]/[slug]/page.tsx`). Non utilisé ailleurs. |
| **Navigation localisée** | `src/i18n/navigation.ts` exporte `Link`, `useRouter`, etc. depuis `next-intl/navigation` |
| **Hébergement** | Cloudflare Pages via `@opennextjs/cloudflare` |

---

## 2. Structure des pages légales actuelles

Toutes les pages légales vivent dans le route group `(main)` sous `src/app/[locale]/(main)/`. Elles utilisent donc le `MainLayout` (`src/app/[locale]/(main)/layout.tsx`) qui injecte `<Header />` + `<Footer />` autour du contenu (`<main className="pt-16 md:pt-20">`).

**Important** : les slugs sont en français et **ne sont pas localisés** côté routing. La version EN d'une CGV est servie à `/en/cgv` (pas `/en/terms-of-sale`), bien que `src/app/sitemap.ts` déclare à tort `/en/terms-of-sale`, `/en/terms-of-use`, `/en/legal-notice`, `/en/privacy-policy` qui ne correspondent à aucune route physique — **incohérence à signaler/corriger**.

### Pages existantes

| URL FR | URL EN (réelle) | URL EN (sitemap, erronée) | Fichier |
|---|---|---|---|
| `/fr/mentions-legales` | `/en/mentions-legales` | `/en/legal-notice` | `src/app/[locale]/(main)/mentions-legales/page.tsx` |
| `/fr/cgv` | `/en/cgv` | `/en/terms-of-sale` | `src/app/[locale]/(main)/cgv/page.tsx` |
| `/fr/cgu` | `/en/cgu` | `/en/terms-of-use` | `src/app/[locale]/(main)/cgu/page.tsx` |
| `/fr/politique-confidentialite` | `/en/politique-confidentialite` | `/en/privacy-policy` | `src/app/[locale]/(main)/politique-confidentialite/page.tsx` |

### Structure interne (identique pour les 4 pages)

Le pattern est **strictement identique** sur les quatre pages :

```tsx
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalPages.<key>' });
  return { title: t('meta.title'), description: t('meta.description') };
}

export default async function Page({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations('legalPages.<key>');
  return (
    <main className="bg-white py-24 md:py-32">
      <Container>
        <article className="prose prose-zinc mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-brand-dark md:text-4xl">{t('title')}</h1>
          <p className="text-sm text-zinc-500">{t('lastUpdate')}</p>
          <section className="mt-8">
            <h2>{t('sections.<id>.title')}</h2>
            <p>{t('sections.<id>.content')}</p>
            {/* h3 / ul / ol selon le contenu */}
          </section>
          {/* … */}
        </article>
      </Container>
    </main>
  );
}
```

### Détail par page

| Page | Namespace i18n | Contenu | Composants utilisés |
|---|---|---|---|
| **CGV** | `legalPages.terms` | 100% dans `messages/fr.json` & `en.json` (clés par section + sous-section). 7 articles. | `Container`, balises Tailwind `prose prose-zinc max-w-3xl`, structure `<section><h2><h3><p><ul>` |
| **CGU** | `legalPages.termsOfUse` | 100% dans les JSON. 8 articles. | idem |
| **Mentions légales** | `legalPages.legalNotice` | 100% dans les JSON. 7 sections. Affichage en `<ul>` avec `<strong>` pour les labels. | idem |
| **Politique de confidentialité** | `legalPages.privacy` | 100% dans les JSON. 12 sections, beaucoup de listes ordonnées/non ordonnées. | idem |

### Layout & typographie

- **Wrapper** : `<main className="bg-white py-24 md:py-32">` puis `<Container>` (max-w-7xl, padding responsive) puis `<article className="prose prose-zinc mx-auto max-w-3xl">`.
- **Composants réutilisables** : un seul, `Container` (`src/components/ui/Container.tsx`). Pas de composants `Heading`, `Section`, `Prose` dédiés.
- **Le rendu typographique repose entièrement sur le plugin `@tailwindcss/typography`** via les classes `prose prose-zinc`. Le `h1` est custom (override Tailwind direct) ; tous les `h2`/`h3`/`p`/`ul`/`ol` héritent du plugin.
- **Date de mise à jour** : simple `<p className="text-sm text-zinc-500">{t('lastUpdate')}</p>` — c'est une chaîne i18n libre (ex. `"Dernière modification le 11/02/2025"`), pas un champ structuré.

---

## 3. Système de traductions

| Élément | Valeur |
|---|---|
| **Localisation des fichiers** | `messages/fr.json` (102 Ko) et `messages/en.json` (94 Ko) à la racine du projet (et non dans `src/messages/` qui existe mais est vide) |
| **Chargement** | `src/i18n/request.ts` — `(await import(\`../../messages/${locale}.json\`)).default` |
| **Convention de nommage** | camelCase, hiérarchique. Toutes les pages légales sont regroupées sous `legalPages.{legalNotice|terms|termsOfUse|privacy}` |

### Convention de structure pour le contenu juridique long

Les textes sont **éclatés par section et sous-clé**. Exemple `legalPages.terms` :

```json
"terms": {
  "meta": { "title": "...", "description": "..." },
  "title": "Conditions Générales de Vente",
  "lastUpdate": "Dernière modification le 11/02/2025",
  "sections": {
    "object":      { "title": "Article 1 – ...", "content": "..." },
    "offers":      { "title": "...", "formulasTitle": "...", "formulaDiscovery": "...", "commissionTitle": "...", "commissionContent": "..." },
    "orders":      { "title": "...", "processTitle": "...", "processContent": "...", "pricingTitle": "...", "pricingContent": "...", "refundTitle": "...", "refundContent": "..." },
    "duration":    { "title": "...", "initialTitle": "...", "initialContent": "...", "terminationTitle": "...", "terminationContent": "...", "consequencesTitle": "...", "consequencesContent": "..." },
    "liability":   { "title": "...", "obligationTitle": "...", "obligationContent": "...", "limitationsTitle": "...", "limitationsContent": "..." },
    "revision":    { "title": "...", "content": "..." },
    "jurisdiction": { "title": "...", "content": "..." }
  }
}
```

### Comment sont gérés les textes longs

- **Une clé par paragraphe / une clé par item de liste**. Pas de markdown inline, pas de HTML — le rendu structurel (sections, h2/h3, ul/ol) est **codé en dur dans le composant**.
- Conséquence : **le JSON est couplé 1-à-1 avec le JSX**. Ajouter un paragraphe ou un item à la liste nécessite à la fois une modification du composant ET du fichier de traduction.
- Pas de pluralisation ICU détectée sur les pages légales (mais next-intl la supporte).

---

## 4. Composants de typographie disponibles

**Aucun composant réutilisable** de typographie (`Heading`, `Section`, `Prose`, `LegalPage`, etc.) n'existe.

Le pattern Tailwind utilisé sur les pages légales :

```html
<main className="bg-white py-24 md:py-32">
  <Container>
    <article className="prose prose-zinc mx-auto max-w-3xl">
      ...
```

- **`prose`** : plugin `@tailwindcss/typography` (`@plugin "@tailwindcss/typography"` dans `src/app/globals.css`)
- **`prose-zinc`** : palette de couleurs zinc (gris neutre froid)
- **`max-w-3xl`** : 48rem, largeur de lecture confortable
- **Le `h1` est custom** : `text-3xl font-bold text-brand-dark md:text-4xl` (override le `prose` pour matcher la charte)
- **Date de mise à jour** : `text-sm text-zinc-500`
- **Séparateurs entre sections** : `<section className="mt-8">`

Couleurs de marque utilisées : `brand-dark` (texte du h1) ; le reste hérite des défauts `prose-zinc`.

---

## 5. SEO & metadata

### Génération

- **API utilisée** : Next.js `Metadata API` via `export async function generateMetadata()` (App Router).
- Chaque page légale lit `meta.title` et `meta.description` depuis le namespace i18n correspondant.
- Le `title` du root layout définit un template `'%s | TriggerFlow'`, mais les pages légales renvoient **déjà** un titre complet (ex. `"Conditions Générales de Vente | TriggerFlow"`) — résultat : double suffixe possible (`"Conditions Générales de Vente | TriggerFlow | TriggerFlow"`). À vérifier/corriger lors de la refonte.

### Canonical & alternates

- **Sur les pages légales : aucun `canonical` ni `alternates` n'est défini** dans `generateMetadata()`. Seul le root layout (`src/app/[locale]/layout.tsx`) définit un canonical pour la home (`${baseUrl}/${locale}`) et des `languages` (`fr-FR`/`en-US`).
- Conséquence : Google déduira l'URL canonique par défaut, mais aucune liaison `hreflang` n'est explicitement déclarée pour les pages légales.

### Sitemap

- `src/app/sitemap.ts` liste les pages légales avec `priority: 0.3` et `changeFrequency: 'yearly'`.
- **Incohérence** : la version EN du sitemap pointe vers `/en/legal-notice`, `/en/terms-of-sale`, `/en/terms-of-use`, `/en/privacy-policy`, **routes qui n'existent pas** (la route physique est `/en/mentions-legales` etc. — le slug reste FR pour les deux locales). Soit créer des pathnames localisés dans `routing.ts`, soit corriger le sitemap pour pointer vers les vraies URLs.

### Schema.org

- Schémas existants dans `src/components/seo/JsonLd.tsx` (Organization, SoftwareApplication, BlogPosting, BreadcrumbList, FAQPage) mais **aucun n'est injecté dans les pages légales actuelles**.

### Liens sortants vers les pages légales

- Footer principal : `src/components/layout/Footer.tsx` (lignes 45-50) → utilise `Link` next-intl avec href relatif `/cgv`, `/cgu`, etc.
- Footers landing pages Thais (v1, v2, v3) : href absolu `/fr/cgv`, `/fr/cgu`, etc. — **codés en dur sur la locale FR**.
- Composant MDX `NewsletterInline.tsx` : lien vers `/politique-confidentialite`.

---

## 6. Recommandations

### A. Stockage du contenu juridique long

Trois options évaluées, classées du plus pragmatique au plus lourd :

#### Option 1 — **MDX par locale (recommandé)**

`next-mdx-remote` est **déjà installé et utilisé pour le blog** : extension naturelle, faible coût.

Structure suggérée :

```
content/legal/
├── fr/
│   ├── cgv.mdx
│   ├── cgu.mdx
│   ├── mentions-legales.mdx
│   ├── politique-confidentialite.mdx
│   ├── contrat-prestation.mdx        # nouveau
│   └── dpa.mdx                       # nouveau
└── en/
    └── (mêmes fichiers, contenu adapté)
```

Avantages :
- Rédaction naturelle en markdown, le contenu n'est plus couplé au JSX.
- Le plugin `@tailwindcss/typography` (`prose`) restitue déjà un rendu propre des `h2`/`h3`/`ul`/`ol`/`p`/`a` markdown.
- Frontmatter (gray-matter, déjà installé) pour `title`, `lastUpdated`, `version`, `effectiveDate`, `metaTitle`, `metaDescription`, `slug`.
- Composants MDX custom déjà disponibles (`<Callout>`, `<InternalLink>`) réutilisables si besoin (encadrés "Information importante", etc.).
- Versionnage Git natif : `git log content/legal/fr/cgv.mdx` donne tout l'historique.
- Une page dynamique unique `src/app/[locale]/(main)/legal/[slug]/page.tsx` peut servir les 6 documents (réduit la duplication actuelle).

Inconvénients :
- Refonte des 4 pages existantes (mais pattern identique → factorisation facile).
- `gray-matter` lit le filesystem au build : OK sur Cloudflare Pages puisque tout est SSG (déjà le cas pour le blog).

#### Option 2 — Continuer en JSON i18n

- Avantage : aucun changement de stack, pattern existant.
- Inconvénient majeur : couplage JSX/JSON très lourd pour un contrat de prestation type ou un DPA (documents de 3000-6000 mots avec articles numérotés, sous-articles, listes imbriquées, tableaux annexes). Multiplier les `t('sections.x.y.z')` devient ingérable et la moindre mise à jour juridique force à modifier deux fichiers.

#### Option 3 — CMS headless (Sanity, Strapi, Contentful)

- Surdimensionné pour 6 documents qui changent une à deux fois par an.
- Coût mensuel + nouvelle dépendance + intégration build Cloudflare à valider.
- À éviter sauf si l'équipe juridique veut éditer en autonomie sans passer par Git.

**Recommandation finale : Option 1 (MDX).** Pour les nouvelles pages (Contrat de prestation + DPA), commencer directement en MDX. Pour les 4 pages existantes, migration recommandée mais pas bloquante — peut être faite ultérieurement.

---

### B. Versionnage des CGV (date "Dernière modification" + historique)

Compte tenu de l'existant, trois niveaux possibles :

#### Niveau 1 — Affichage d'une date (immédiat, sans effort)

Frontmatter MDX :

```yaml
---
title: Conditions Générales de Vente
version: "2.1"
effectiveDate: 2026-05-14
lastUpdated: 2026-05-14
metaTitle: Conditions Générales de Vente | TriggerFlow
metaDescription: ...
---
```

Affichage dans la page : `<p className="text-sm text-zinc-500">Version {version} – Entrée en vigueur le {effectiveDate}</p>`. Le formatage de date passe par `next-intl` (`useFormatter`) pour la cohérence FR/EN.

#### Niveau 2 — Historique des versions consultable

Deux approches selon l'ambition :

- **Approche Git (suffisante)** : l'historique vit dans Git. Lien public vers `https://github.com/<repo>/commits/main/content/legal/fr/cgv.mdx` — gratuit, fiable, conforme aux pratiques SaaS B2B (Stripe, Notion). Suffisant tant que le repo n'est pas public — sinon prévoir un export.
- **Approche fichiers versionnés** : conserver les versions précédentes dans `content/legal/<locale>/archive/cgv-v1.0-2025-02-11.mdx`, et générer une route `/legal/cgv/historique` qui liste les anciennes versions. Plus de travail mais offre une page publique d'historique sans dépendre de Git.

#### Niveau 3 — Notifications & opt-in (CGV opposables)

Si une nouvelle version de CGV doit être **acceptée explicitement** par les clients existants (article 6 actuel des CGV : "Le FOURNISSEUR se réserve le droit de modifier les CGV, moyennant information du CLIENT (e-mail, notification)"), cela ne se gère pas dans le site marketing : c'est dans `app.trigger-flow.com` qu'il faut prévoir un workflow (banner, modale, journal d'acceptation par utilisateur). **Hors scope** de la refonte des pages publiques.

**Recommandation pour cette refonte :**
- **Niveau 1 obligatoire** : champs `version`, `effectiveDate`, `lastUpdated` en frontmatter, affichés en tête de chaque document. Format ISO en frontmatter, formaté à l'affichage via `next-intl`.
- **Niveau 2 différé** : pas de page d'historique publique au premier jet. Si le besoin émerge (audit client, RFP), basculer sur l'approche fichiers archivés — facile à rétro-ajouter.
- Marquer le commit "release legal vX.Y" avec un tag git (`legal-v2.1`) pour retrouver facilement l'état exact lors d'un litige.

---

### C. Autres points à traiter pendant la refonte

1. **Corriger la double suffixe `| TriggerFlow | TriggerFlow`** dans les titres des pages légales (soit retirer le suffixe du `meta.title` JSON, soit retirer le template du root layout pour ces routes).
2. **Ajouter `alternates.canonical` et `alternates.languages`** dans `generateMetadata()` de chaque page légale.
3. **Résoudre l'incohérence sitemap** : décider entre garder les slugs FR sur les deux locales (corriger le sitemap) ou activer les pathnames localisés via `defineRouting({ pathnames: {...} })` dans `src/i18n/routing.ts`.
4. **Footer** : ajouter les deux nouvelles entrées (`/contrat-prestation`, `/dpa`) avec leurs clés i18n (`footer.legal.serviceAgreement`, `footer.legal.dpa`) dans `messages/fr.json` et `messages/en.json`.
5. **Factoriser** : créer un composant `<LegalPageLayout title lastUpdated version>` qui encapsule le wrapper `main + Container + article.prose` actuel, partagé par toutes les pages légales (existantes et nouvelles).
6. **Hébergeur dans les mentions légales** : actuellement déclaré "Webflow, Inc." (`messages/fr.json` ligne ~822) — à mettre à jour pour refléter le passage à Cloudflare Pages.
