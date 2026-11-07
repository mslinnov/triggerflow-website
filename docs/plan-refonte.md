# Plan de la refonte trigger-flow.com

Version 1, 7 novembre 2026. À valider avant toute ligne de code.
Documents liés : `docs/audit-site.md` (constats), `docs/arborescence.md` (structure cible).

**Règles fixes**
- Aucun chiffre, logo ou témoignage inventé. Preuve manquante = `[À FOURNIR]`, visible en local et en preview, jamais en production.
- Tous les chiffres dans un seul fichier FR/EN.
- Le contenu s'inspire du marché hôtelier (Oaky…), la forme de la tech (Aircall…).
- Chaque étape se termine par une validation de Soufiane avant de passer à la suivante.
- Travail sur une branche, preview Cloudflare pour relire, mise en production lot par lot.

---

## Phase A : cadrage (sans code)

| # | Livrable | Contenu | Validation |
|---|---|---|---|
| A1 | Audit | `docs/audit-site.md` | fait |
| A2 | Arborescence | `docs/arborescence.md` | **en attente** |
| A3 | Plan | ce document | **en attente** |
| A4 | **Plateforme de messages** | Promesse, 3 piliers, messages transverses (France/RGPD, synchro bidirectionnelle, connecté à tout, upsell dans les formulaires, IA intégrée), une phrase et 3 bénéfices par module, ton de voix FR/EN, mots interdits | Soufiane |
| A5 | **Registre des preuves** | Tableau : chaque chiffre, logo, témoignage, certification, avec sa source, sa date, son accord client. Format pour que tu m'envoies tes témoignages | Soufiane le remplit |
| A6 | **Charte graphique** | À partir du Figma (IBM Plex Sans, palette 6 couleurs, logo et ses 3 formes) et d'Aircall pour la forme : couleurs et usages, Plex Sans + Plex Mono, grille, espacements, boutons, cartes, style des captures produit, motifs graphiques, iconographie, photos | Soufiane |
| A7 | **Wireframes texte** | Home (10 sections) et gabarit de page module (13 blocs), avec le vrai texte FR, section par section | Soufiane |

| A8 | **Bibliothèque de visuels produit** (`docs/visuels.md`) | Pour chaque module : l'écran réel à montrer, l'animation (déclencheur → action → résultat), le format desktop et mobile, l'outil de production | Soufiane |

A4, A5 et A6 peuvent avancer en parallèle. A7 dépend de A4. A8 dépend de A6.

### Visuels dynamiques : principe

- **On montre la vraie plateforme**, partout. C'est un avantage face aux concurrents, qui en montrent peu.
- **Visuels produit = interfaces animées codées** (HTML/CSS + animation légère), reproduites fidèlement à partir des vrais écrans de l'app : nettes à toutes les tailles, traduisibles FR/EN, légères (pas de vidéo lourde), lisibles par Google, respect de `prefers-reduced-motion`. Les ~40 maquettes React existantes (`src/components/mockups/`) servent de point de départ.
- **Claude Design** : prototyper et valider chaque visuel avant intégration.
- **Higgsfield** : vidéos marketing, réseaux sociaux, ambiance hôtelière. Pas pour l'interface produit : une interface générée par IA serait fausse, ce qui va contre le « montrer la vraie plateforme ».
- Besoin : captures HD des vrais écrans, ou un compte de démo de l'app pour que je les fasse.

---

## Phase B : corrections rapides sur le site actuel

Démarre après validation de A2 et A3. Ne change ni le design ni les URL. Mise en production possible tout de suite.

1. Police IBM Plex Sans réellement appliquée.
2. Compteurs : valeur finale rendue côté serveur, fin des « 0 ».
3. Fichier unique des chiffres, branché sur les pages, les meta, le JSON-LD et `llms.txt`.
4. 12 PMS partout, statuts « Natif » corrigés.
5. Témoignages non vérifiés retirés, attribution Jullien / Surrel corrigée.
6. Logos sans autorisation retirés, les 4 clients documentés ajoutés.
7. « Leader », « 5/5 (3 avis) » et « 9,4/10 » retirés.
8. Liens sans préfixe de langue et carte « Maisons d'hôtes » corrigés.
9. « Démarrer gratuitement » dans le header, le hero et sur le plan à 0 € ; « démo » avec accent.
10. Bandeau hausse de prix remplacé par un bandeau d'annonce.
11. Emplacements de maquette vides et restes du gabarit email retirés.

Vérification : build, puis chaque page touchée dans Chrome en 1440 et 390 px.

---

## Phase C : système de design (code)

Démarre après validation de A6.
- Couleurs, typographies, espacements, rayons et ombres dans `globals.css`.
- Composants serveur : boutons, badges, étiquettes mono, en-têtes de section, capture produit, barre de preuves, mur de logos, carte témoignage, carte résultat client, grille de fonctionnalités, schéma déclencheur → action → résultat, tableau comparatif, cartes tarifs, FAQ, bande CTA, bandeau d'annonce, méga-menu, footer.
- Page interne `/fr/design-system` (noindex) pour tout voir dans Chrome.

Validation : Soufiane relit la page design-system en preview.

---

## Phase D : home

Démarre après validation de A7 et C. Home FR et EN, nouveau header, nouveau footer.
Validation : preview desktop et mobile, puis mise en production.

---

## Phase E : pages module

1. Gabarit de page module (13 blocs), contenu de chaque module dans un fichier de données FR/EN.
2. **Upsell, Flows, Pay** en premier → validation.
3. Puis le hub **Marketing** et ses modules (Campagnes, Segments, Newsletter, Loyalty).
4. Puis les autres : Forms, Check-in, Guest App, Voice, Inbox, Housekeeping, Clés, Reviews, CRM, Analytics, Events, B2B, Demandes de réservation.
5. Redirections 301 activées page par page, au moment où chaque nouvelle page part en production.

---

## Phase F : plateforme, confiance, intégrations

- `/plateforme/securite`, `/plateforme/synchronisation`, `/plateforme/ia`.
- `/a-propos`, `/carrieres`, `/clients`.
- Catalogue d'intégrations par catégorie, une page par PMS (Thaïs en premier), pages paiement, serrures, téléphonie, messageries, avis, automatisation.
- Lien vers la page de statut (outil à choisir).

---

## Phase G : solutions et migration SEO

- Pages segments refaites, page Maisons d'hôtes.
- Sitemap, hreflang, liens internes du blog et des landings `/lp` mis à jour, `llms.txt`.
- Contrôle de toutes les anciennes URL (pas de 404, pas de chaîne de redirections), soumission dans Search Console.

---

## Ce dont j'ai besoin de toi, et quand

| Quand | Quoi |
|---|---|
| Maintenant | Validation de l'arborescence et de ce plan |
| Phase A | Tes témoignages, les accords pour les logos, la période de mesure des taux 94 / 90 / 91 %, les attestations partenaires (Oracle, Mews, Lean), une connexion Figma dans Chrome si tu veux que je lise les maquettes |
| Phase D | Captures de l'app en haute définition (ou un accès démo pour que je les fasse) |
| Phase F | Hébergeur et détails sécurité (déjà en partie dans le DPA), outil de statut |
