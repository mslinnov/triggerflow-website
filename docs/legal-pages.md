# Pages légales — guide d'édition

Ce document explique comment maintenir les 4 pages légales publiques du site `trigger-flow.com` : CGV, CGU, mentions légales et politique de confidentialité.

## Documents non publiés

Deux documents juridiques existent mais ne sont **pas** publiés sur le site marketing :

- **Contrat de prestation type** : généré à la signature depuis le CRM (template Blade côté `app.trigger-flow.com`), avec les conditions particulières du client.
- **DPA (accord de sous-traitance RGPD)** : annexé manuellement au contrat signé, communiqué aux clients qui le demandent.

Ces deux documents ne doivent pas réapparaître publiquement sans validation juridique préalable. Pour les republier ultérieurement, suivre la procédure « Ajouter une nouvelle page légale » plus bas.

## Vue d'ensemble

Le contenu des pages légales est stocké en **MDX** dans `content/legal/<locale>/`, et rendu via une architecture factorisée :

```
content/legal/
  fr/
    cgv.mdx
    cgu.mdx
    mentions-legales.mdx
    politique-confidentialite.mdx
  en/   (pas encore livré — fallback FR automatique)

src/lib/legal.ts                                # loader MDX (gray-matter, sync)
src/components/legal/LegalPageLayout.tsx        # wrapper visuel commun
src/components/legal/LegalPageRenderer.tsx      # rendu MDX + buildLegalMetadata
src/app/[locale]/(main)/<slug>/page.tsx         # 6 routes, ~20 lignes chacune
```

Chaque `page.tsx` se limite à : récupérer la locale, appeler `setRequestLocale`, déléguer à `LegalPageRenderer`. La metadata Next.js (title, description, canonical, hreflang) est générée par `buildLegalMetadata`.

## Mettre à jour le contenu d'une page existante

1. Ouvrir le fichier MDX correspondant (ex. `content/legal/fr/cgv.mdx`).
2. Modifier le corps du document en markdown standard. Pas de `# Titre` ni de ligne `**Version X — En vigueur...**` en haut du body : ces éléments sont rendus automatiquement par `LegalPageLayout` à partir du frontmatter.
3. Bumper le frontmatter :
   - Si la modification est **éditoriale/factuelle** (correction typo, changement d'adresse, ajout d'un sous-traitant…) : mettre uniquement à jour `lastUpdated: "AAAA-MM-JJ"`.
   - Si la modification est **substantielle** (nouvelles obligations, prix, durée d'engagement, clause d'exonération…) : incrémenter `version`, mettre à jour `effectiveDate` et `lastUpdated`.
4. Vérifier visuellement le rendu en local (`npm run dev`, ouvrir `/fr/<slug>`).
5. Commit : `chore(legal): cgv vX.Y - <résumé du changement>`.
6. Pour les bumps de version (V2.0, V2.1…), créer un tag git :
   ```bash
   git tag legal-cgv-v2.1 -m "CGV v2.1 effective 2026-09-01"
   git push origin legal-cgv-v2.1
   ```
   Ce tag sert de référence en cas de litige (« quel texte était publié à la date X ? »).

## Ajouter une nouvelle page légale

1. Choisir un slug stable (`cookies-policy`, `politique-d-archivage`…). Format : minuscules, tirets, sans accents.
2. Créer le fichier `content/legal/fr/<slug>.mdx` avec le frontmatter standard :
   ```yaml
   ---
   title: "Politique d'archivage"
   slug: "politique-archivage"
   version: "1.0"
   effectiveDate: "2026-MM-JJ"
   lastUpdated: "2026-MM-JJ"
   metaTitle: "Politique d'archivage"
   metaDescription: "150-160 caractères, sans suffixe TriggerFlow."
   ---
   ```
   Le suffixe ` | TriggerFlow` est ajouté automatiquement par le template root layout — ne pas le mettre dans `metaTitle`.
3. Déclarer le slug dans la liste `KNOWN_SLUGS` de `src/lib/legal.ts`. La type-safety se propage automatiquement.
4. Créer le fichier de route `src/app/[locale]/(main)/<slug>/page.tsx` en copiant le pattern d'une page existante (ex. `cgv/page.tsx`) et en remplaçant le slug.
5. Ajouter le lien dans le footer (`src/components/layout/Footer.tsx`, tableau `legalLinks`) et la clé i18n (`footer.legal.<key>` dans `messages/{fr,en}.json`).
6. Le sitemap se met à jour seul : `getAllLegalSlugs()` itère sur `KNOWN_SLUGS` (voir `src/app/sitemap.ts`).

## Ajouter une version anglaise

Pour l'instant (V1), seule la locale FR est livrée. Les routes `/en/<slug>` servent le contenu FR via le fallback de `getLegalDoc(slug, locale)`.

Pour traduire un document :

1. Créer le dossier `content/legal/en/` (s'il n'existe pas).
2. Créer `content/legal/en/<slug>.mdx` en adaptant le contenu (pas une traduction littérale : adaptation juridique au marché EN — éventuellement loi anglaise/américaine, devise, références réglementaires locales).
3. Garder **le même `slug`** dans le frontmatter (essentiel pour la cohérence des URLs et du sitemap).
4. Adapter `title`, `metaTitle`, `metaDescription` à l'anglais.
5. `version` et `effectiveDate` peuvent diverger entre FR et EN si les versions sont publiées à des dates différentes — c'est juridiquement correct, chaque version localisée a sa propre date d'entrée en vigueur.

Aucun changement de code n'est nécessaire — le loader sélectionnera automatiquement la version EN sur `/en/<slug>` dès que le fichier sera présent.

## Stratégie de versioning

- Le frontmatter `version` est l'identifiant **lisible** (« CGV v2.0 »).
- Le `effectiveDate` est la date juridique d'entrée en vigueur (peut être dans le futur si on prépublie une version).
- Le `lastUpdated` est la date de la dernière modification du fichier (peut être < `effectiveDate` durant la période de préavis).
- L'affichage public masque automatiquement `lastUpdated` quand il est identique à `effectiveDate` (cf. `LegalPageLayout`).
- L'historique « immuable » des versions vit dans **Git** : pour retrouver l'état exact à une date donnée, `git log --follow content/legal/fr/cgv.mdx`.
- À chaque bump de `version` significatif (X.Y avec X qui augmente), créer un **tag git** `legal-<slug>-v<X.Y>` pour faciliter la récupération en cas de litige.

## Préavis et opposabilité

Le site marketing **affiche** les CGV/CGU en vigueur. Il ne gère **pas** :

- La notification des clients existants en cas de changement substantiel.
- L'opt-in explicite à une nouvelle version.
- L'historique d'acceptation par utilisateur.

Ces flux relèvent de l'application `app.trigger-flow.com` (workflow d'opt-in, journal d'acceptation, e-mail de préavis).

## Composants MDX disponibles

Dans les fichiers MDX des pages légales, deux composants sont mappés :

- `<Callout type="info|warning|tip">…</Callout>` — encadré pour signaler une information importante, un avertissement, ou un conseil.
- `<InternalLink href="/fr/<slug>">…</InternalLink>` — lien interne stylisé.

Les composants spécifiques au blog (`ImageBlock`, `KeyFigure`, etc.) ne sont **pas** disponibles dans les pages légales par défaut. Si un besoin émerge, étendre la map `legalMdxComponents` dans `src/components/legal/LegalPageRenderer.tsx`.

## Style et rendu

Les pages légales utilisent les classes Tailwind `prose prose-zinc max-w-3xl` (plugin `@tailwindcss/typography`). Le `h1` est customisé (`text-3xl font-bold text-brand-dark md:text-4xl`) pour respecter la charte ; les `h2`, `h3`, `p`, `ul`, `ol` héritent du plugin.

Le wrapper extérieur est `<section className="bg-white py-24 md:py-32">` (pas `<main>`, car le route group `(main)` enveloppe déjà le contenu dans un `<main>`).

## Points connus à corriger ultérieurement

- L'hébergeur dans `mentions-legales.mdx` est toujours déclaré « Webflow, Inc. » — à mettre à jour pour refléter le passage à Cloudflare Pages, lors d'une révision juridique.
- Les valeurs « Capital social » et « Siège social » divergent légèrement entre `mentions-legales.mdx` (24 000 €, « 13 Rue Sainte Ursule ») et les autres documents (28 000 €, « 13 rue Saint-Ursule »). Convergence à faire à la prochaine refonte juridique.
