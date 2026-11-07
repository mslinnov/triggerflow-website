# Audit du site trigger-flow.com : DA, preuves, architecture cible

Date : 7 novembre 2026. Périmètre : production (https://www.trigger-flow.com), commit `b453643`.

## 0. Méthode

- **Parcours interactif** dans Chrome (Claude in Chrome) à 1440 px : home FR, tarifs, concurrents (Canary, Ramp), inspection du DOM et des styles calculés.
- **Captures systématiques** avec Playwright sur Chrome, desktop 1440×900 et mobile 390×844 (isMobile, tactile), avec défilement complet avant capture pour déclencher les animations : 31 pages TriggerFlow + 9 sites de référence, soit 160 captures.
  - Au-dessus de la ligne de flottaison : `docs/audit/screens/<page>-<d|m>-fold.jpg`
  - Planches pleine page (page découpée en colonnes) : `docs/audit/sheets/<page>.jpg`
  - Pleine page brute (33 Mo, ignorée par git, régénérable) : `docs/audit/full/`
- **Lecture du code** pour remonter chaque défaut à sa source (fichier et ligne).

Pages TriggerFlow couvertes : `/fr`, `/en`, `/fr/tarifs`, `/fr/integrations`, `/fr/produit` et ses 13 modules, les 9 pages `/fr/solutions/*`, `/fr/blog/automatisation/marketing-automation-hotelier-guide`, `/fr/ressources/cas-clients`, `/fr/integrations/pms/mews`, `/fr/entreprise/a-propos`.

Aucune page ne déborde horizontalement en 390 px. Toutes répondent en 200, avec un chargement de 90 à 960 ms (Cloudflare). Le problème de performance n'est donc pas réseau : il est perçu (voir 2.2).

---

## 1. Verdict DA par dimension

| Dimension | Note /10 | Verdict |
|---|---|---|
| Couleurs | 6 | Identité teal cohérente et reconnaissable. Mais tout est teinté teal (fonds, bordures, ombres, textes), plus un pêche `#FFCFA2` en second accent et des rouges/verts/violets ponctuels : aucune hiérarchie, rien ne ressort. |
| Typographie | **3** | **IBM Plex Sans est chargée mais jamais appliquée** : tout le texte sort en police système (San Francisco sur Mac, Segoe sur Windows). Titres en Fraunces (serif éditoriale) sur la home et les modules, mais en sans-serif système sur tarifs, cas clients et /produit : deux systèmes typographiques selon la page. |
| Grille et espacements | 6 | Conteneur propre (max-w-7xl), rythme vertical correct. Mais beaucoup de sections centrées identiques (badge, H2, sous-titre, grille de cartes) qui s'enchaînent sans variation de mise en page. |
| Densité et profondeur | 5 | Beaucoup de contenu (la home fait 13 000 px), mais peu de profondeur : les sections répètent la même promesse (automatiser, centraliser) au lieu d'apporter des preuves. Aucune page sécurité, à propos léger, aucun changelog. |
| Qualité des captures produit | 5 | Les vraies captures de l'app (messagerie, fiche client, éditeur de flows) sont un vrai atout. Mais elles sont petites, illisibles, encadrées de pastilles flottantes (« +1 240 € », « SMS délivré »), et mélangées à des maquettes React et à des emplacements vides. |
| Cohérence entre pages | **4** | Trois générations de design coexistent : home (Fraunces, fonds teal clair), modules et solutions (copier-coller du gabarit email), tarifs, cas clients et /produit (sans-serif, autre hiérarchie). |
| Animations | 4 | Animations d'apparition sur presque chaque bloc (150 éléments rendus en `opacity:0` côté serveur sur la home). Les sections restent vides tant qu'on n'a pas défilé : témoignages, FAQ et diagramme déclencheur/action apparaissent blancs sur une capture ou un défilement rapide. |
| Performance perçue | 5 | Le serveur est rapide, mais le rendu vide au premier affichage et les compteurs à « 0 » donnent l'impression d'un site lent ou cassé. Plein de JavaScript client pour du contenu statique. |
| Rendu mobile | 6 | Pas de débordement, ordre logique. Mais les pages font 15 000 à 21 000 px, les maquettes produit deviennent illisibles, et le hero mobile empile badges, photo et cartes flottantes. |
| Crédibilité et preuves | **3** | Chiffres contradictoires d'une page à l'autre, témoignages non traçables (dont un mal attribué), logos de chaînes sans cas client, note Google 5/5 sur 3 avis mise en avant. C'est le point qui pèse le plus sur la « confiance ». |

**Note globale : 4,7/10.** Le socle (couleur, contenu, vraies captures, 4 vrais cas clients) est bon. Ce qui empêche le niveau « scale-up » : une typographie cassée, des preuves fragiles et trois styles différents sur un même site.

---

## 2. Constats transverses (à traiter avant tout le reste)

### 2.1 La police de texte n'est jamais appliquée

`src/app/[locale]/layout.tsx` charge IBM Plex Sans (`--font-ibm-plex-sans`) et `globals.css` déclare `--font-sans: var(--font-ibm-plex-sans)`. Mais sur la production, `getComputedStyle(body).fontFamily` renvoie `ui-sans-serif, system-ui, …` et `document.fonts` ne contient aucune Plex chargée. La police est téléchargée pour rien et le rendu dépend de l'OS du visiteur.

**Correctif :** dans le nouveau système de design, une seule famille sans-serif branchée sur `--font-sans` dans `@theme`, avec la variable posée sur `<html>`. À vérifier dans Chrome par styles calculés.

### 2.2 Contenu invisible au premier rendu

- 150 éléments rendus `style="opacity:0"` dans le HTML serveur de la home (framer-motion `initial`).
- `AnimatedStat` (`src/components/ui/AnimatedStat.tsx`) démarre à `useState(0)` : le HTML contient « 0 h », « 0 % », « +0 € », « 0€ ». Google, les aperçus de partage, les lecteurs d'écran et les visiteurs qui ont réduit les animations voient des zéros.

**Correctif :** rendre la valeur finale côté serveur, n'animer que si `prefers-reduced-motion` est désactivé, et limiter les apparitions au hero et à 2 ou 3 moments forts. Le contenu doit être lisible sans JavaScript.

### 2.3 Chiffres contradictoires

| Donnée | Valeurs trouvées | Où |
|---|---|---|
| Nombre d'hôtels | 120+, 200+, 300+, 500+, « des centaines » | `messages/*.json`, `company-stats.ts` (500+), page solutions (300+), `llms.txt` (500+), CTA home (« centaines ») |
| Nombre de PMS | 7+, 8+, 12, 50, 50+ | meta home (`page.tsx`, 7+), /produit (8+), home (12), `fr.json:699` (« plus de 50 PMS »), `en.json:128` (50+) |
| PMS « natifs » | 8 natifs + 4 « bientôt disponibles » affichés sous le titre « 12 PMS » | section intégrations de la home et des modules |
| Note | 9,4/10 (non sourcé), 5/5 Google sur 3 avis | personas bento, `company-stats.ts`, bloc accompagnement |
| « Leader » | « Leadership : 500+ hôtels et 20 collaborateurs », JSON-LD « leader » | `fr.json:1154`, `JsonLd.tsx` |

**Point d'attention sur le positionnement validé :** le pilier « 12 PMS natifs » n'est pas cohérent avec ce que le site affiche lui-même (Chloé, Infhotik, Protel et Galaxy sont marqués « Bientôt disponible »). Il faut soit écrire « 8 PMS natifs, 4 en cours », soit confirmer que les 12 sont en production. Je marque ce chiffre **[À CONFIRMER]**.

**Correctif :** un seul fichier source FR/EN (`src/content/proof.ts`) qui contient chaque chiffre avec sa valeur, sa source, sa période et sa date de mesure. Tout le site (meta, JSON-LD, `llms.txt`, composants) lit ce fichier. Chiffre absent = placeholder visible `[À FOURNIR]`.

### 2.4 Témoignages : la plupart ne sont pas traçables

J'ai recensé environ 30 citations nominatives sur le site. Seuls **4 cas clients** sont documentés (`src/lib/case-studies.ts`, avec photos réelles d'établissements) :

| Client | Contact | PMS |
|---|---|---|
| Edgar Hotel & Spa ****, Saint-Brieuc | Maxime Jullien, directeur | n.c. |
| Causse Comtal, Montrozier | Baptiste Legout, directeur | Thaïs |
| Le Vieux Pressoir, Dieffenthal | Guillaume Broutin, propriétaire | Thaïs |
| Groupe Noemys, 15 établissements | Marie-Liesse Gaubens, resp. communication | Misterbooking |

Les autres ne renvoient à aucun cas client et je ne peux pas vérifier qu'ils existent :
- carrousel de la home : Marc Dubois (Hôtel & Spa Le Pavillon, « 25 000 € »), Alice Renaud (Les Jardins d'Aliénor), Jean-Philippe Moret (Grand Hôtel des Thermes, « 73 % »), Sophie Lefèvre (Groupe Hôtels Patrimoine) ;
- un témoignage différent par module (`src/data/modules.ts` : Sophie Laurent, Thomas Moreau, Claire Fontaine, Philippe Roux « +17 % »…) ;
- un par solution, avec initiales seulement (`src/data/solutions.ts` : Marie L. « +120 % d'avis Google », Philippe D.…).

**Erreur d'attribution confirmée :** sur `/fr/produit`, la citation « nos enquêtes ont fait passer notre note OTA de 4.2 à 4.7 » est signée **Maxime Jullien, Edgar Hotel & Spa**. Dans le carrousel de la home, la même citation est signée **Sandrine Surrel, Nature Cathare**, avec une métrique qui ne correspond pas (« +45 % d'avis Google »). Voir `audit/sheets/produit-d.jpg`.

Les chiffres des cartes Avant/Après de la home (10 h, 73 %, +17 %, +45 %) sont repris tels quels de ces témoignages.

**Correctif :** retirer tout témoignage qui n'a pas d'accord écrit du client, ne garder que les 4 cas documentés (plus Nature Cathare si confirmé) et mettre `[À FOURNIR]` à la place des autres. C'est aussi un sujet juridique (pratique commerciale trompeuse, art. L121-2 du Code de la consommation).

### 2.5 Logos de la barre de confiance

Accor, Sofitel, Ibis et Best Western sont affichés sous « Adopté par des hôteliers en France et en Europe », sans cas client et sans précision (établissement franchisé, siège ?). Les logos réellement soutenus par un cas client (Edgar, Causse Comtal, Vieux Pressoir, Noemys) n'apparaissent pas dans la barre. **Correctif :** n'afficher que des logos avec accord écrit, en commençant par ces 4. Marquer les logos de chaînes `[AUTORISATION À FOURNIR]`.

### 2.6 Conversion

- Un seul parcours : « Réserver une démo » (lemcal, externe). Sur la page tarifs, même le plan **Découverte à 0 €** affiche « Réserver une demo » (sans accent).
- Aucun bouton « Commencer gratuitement » alors que l'offre gratuite existe.
- Bandeau « Nos tarifs évoluent le 1er janvier 2027 » en haut de chaque page : c'est le premier message lu, il parle de prix avant de parler de produit et donne un ton promotionnel.

### 2.7 Liens et navigation

- Liens sans préfixe de langue (imports `next/link` au lieu de `@/i18n/navigation`) : `HowItWorks.tsx:187` (`/integrations`), `SolutionPageContent.tsx:148, 459, 680, 730`, `ModulePageContent.tsx:586, 2149, 2210`, `ProductContent.tsx:128, 236`, `IntegrationsContent.tsx:395`, `AboutContent.tsx:264`, `not-found.tsx:27, 34`. Sur /en, ces liens renvoient vers la version FR.
- Carte « Maisons d'hôtes » (`SolutionsGrid.tsx:28-30`, clé `guesthouse`) qui pointe vers `/solutions/campings`.
- Pages `/fr/entreprise/a-propos` et `/carrieres` existantes mais absentes du header et du footer.
- `/fr/v2` (noindex) : ancienne refonte en cours, à supprimer après la nouvelle home.

---

## 3. Défauts page par page

### Home FR et EN

Captures : `audit/screens/home-fr-d-fold.jpg`, `audit/screens/home-fr-m-fold.jpg`, planches `audit/sheets/home-fr-d.jpg`, `audit/sheets/home-fr-m.jpg`.

| Défaut | Correctif |
|---|---|
| H1 « Le CRM hôtelier qui centralise toute la relation client » : ce n'est pas la promesse validée, et « centralise » est générique | H1 « Le CRM hôtelier qui s'adapte à votre hôtel. Pas l'inverse. » + sous-titre validé |
| Photo stock de trois personnes en costume dans le hero, avec cartes flottantes | Grande capture produit réelle (éditeur de flows) en pleine largeur sous le texte |
| Bandeau hausse de prix | Bandeau d'annonce produit (nouveauté, intégration certifiée) |
| 14 H2 qui se ressemblent (badge + titre serif centré + sous-titre) | 10 sections avec des mises en page différentes (voir 6.1) |
| Diagramme déclencheur/action vide au premier rendu | Rendu statique côté serveur, animation douce optionnelle |
| Témoignages : carrousel à 5 entrées, dont 4 non traçables | 3 témoignages côte à côte, issus des cas clients, avec photo, nom, établissement, résultat chiffré |
| Bloc personas avec photos stock et « 9.4/10 » | Supprimé ; les personas passent dans la navigation Solutions |
| Badge « 5/5 Note Google (3 avis) » | Supprimé tant qu'il n'y a pas au moins 20 avis |
| Footer : 4 colonnes, pas d'à propos, sécurité, statut, changelog, carrières | Footer 7 colonnes (Produit, Solutions, Clients, Ressources, Entreprise, Confiance, Légal) |
| /en : même structure, même photo, même problèmes | Contenu EN adapté, pas traduit mot à mot |

### /fr/produit (vue d'ensemble)

`audit/sheets/produit-d.jpg`. Titres en sans-serif système alors que la home est en Fraunces. Grille de 11 cartes identiques (icône + titre + « En savoir plus »). Citation mal attribuée (2.4). « 8+ PMS ». **Correctif :** page « Plateforme » qui présente les 10 produits par usage (avant, pendant, après le séjour), avec une capture par produit.

### Pages module /fr/produit/* (13 pages)

`audit/sheets/produit-ventes-additionnelles-d.jpg`, `audit/sheets/produit-paiements-d.jpg`, `audit/sheets/produit-automatisations-d.jpg`, mobile `audit/sheets/produit-ventes-additionnelles-m.jpg`.

| Défaut | Correctif |
|---|---|
| Restes du gabarit email sur la page Upsell : badge « Automatisation email hôtelière », H2 « Un email à chaque étape clé du séjour », « Ce qui change quand vos emails se gèrent tout seuls » | Gabarit en 13 blocs avec un contenu propre à chaque produit |
| Compteurs sous le hero : « 0€ commission », « 0 effort de la réception », « 2 clics » : le zéro littéral se confond avec le bug des compteurs | Barre de preuves avec des résultats mesurés et datés |
| Témoignage inventé par module | Cas client réel ou `[À FOURNIR]` |
| Toutes les pages ont la même structure et la même longueur (~8 000 px), on ne sait plus sur quel produit on est | Hero propre à chaque produit avec sa capture, sa couleur de section sombre, son vocabulaire |
| Fonctionnalités sans capture lisible | Bloc « Comment ça marche » en 3 étapes avec capture recadrée par étape |

### Pages /fr/solutions/* (9 pages)

`audit/sheets/solutions-hotels-independants-d.jpg`, `audit/sheets/solutions-booster-upsell-d.jpg`.

| Défaut | Correctif |
|---|---|
| Emplacements de maquette vides (icône étoile grise « Plus d'avis Google », icône bulle « SMS au bon moment ») | Capture réelle ou suppression du bloc |
| « 300+ hôtels », « 94 % », « 12 PMS » en barre de chiffres | Lecture depuis le fichier de preuves |
| Témoignages en initiales (« Marie L., Hôtel La Provençal, +120 % d'avis Google ») | Cas client réel ou `[À FOURNIR]` |
| Deux familles de pages mélangées : par segment (indépendants, groupes, luxe, résidences, campings) et par objectif (automatiser, avis, upsell, fidéliser) | Garder les segments en Solutions ; les objectifs deviennent les landings produit (Upsell, Reviews, Loyalty, Flows) avec redirection 301 |
| Pas de page « maisons d'hôtes » (la carte renvoie vers campings) | Créer la page ou retirer la carte |

### /fr/tarifs

`audit/sheets/tarifs-d.jpg`, `audit/screens/tarifs-m-fold.jpg`.

| Défaut | Correctif |
|---|---|
| Plan 0 € avec CTA « Réserver une demo » | « Commencer gratuitement » vers l'inscription de l'app |
| « demo » sans accent sur les 8 boutons | « démo » |
| Titres en sans-serif système, hors charte de la home | Typographie du système de design |
| Encadré « tarif garanti à vie » et prix barrés 2027 sur chaque carte : très chargé | Une seule mention discrète, bascule automatique au 1er janvier (déjà gérée par `getPricingPhase`) |
| Le prix « par établissement » n'est pas dit | « par établissement, par mois, HT » sous chaque prix |

### /fr/integrations et /fr/integrations/pms/mews

`audit/sheets/integrations-d.jpg`, `audit/sheets/mews-d.jpg`. Grille de logos propre mais statuts « Natif » / « Bientôt disponible » contradictoires avec « 12 PMS ». La page Mews est la seule landing PMS : bon modèle à généraliser (TriggerFlow pour Thaïs, Opera Cloud, Misterbooking, Medialog, Lean, Vega, Asterio). Ajouter les badges de partenaire certifié uniquement avec la preuve (Oracle OHIP, Mews, Lean PMS : **[À FOURNIR]** attestation ou fiche marketplace).

### Article de blog

`audit/sheets/blog-article-d.jpg`. Lisible, bonne table des matières, bons encadrés. Mais images générées par IA qui se répètent (même photo de réception en hero et dans le corps), largeur de texte un peu étroite par rapport aux tableaux. **Correctif :** largeur de lecture 68 caractères, illustrations en schémas ou captures produit plutôt qu'en photos générées.

### /fr/ressources/cas-clients

`audit/sheets/cas-clients-d.jpg`. C'est la page la plus crédible du site (vraies photos, vrais noms, PMS cités) mais elle est cachée (seulement dans le footer), courte (4 cas) et n'affiche aucun résultat chiffré. **Correctif :** page « Clients » en premier niveau de navigation, chaque cas avec 1 à 3 résultats chiffrés validés par le client.

### /fr/entreprise/a-propos

`audit/screens/a-propos-d-fold.jpg`. Courte, « 500+ hôtels et 20 collaborateurs » non sourcé, pas d'équipe, pas d'histoire, pas d'adresse ni d'entité juridique. **Correctif :** voir 6.3.

---

## 4. Benchmark : 3 patterns visuels par site

Captures : `audit/screens/ext-<site>-<d|m>-fold.jpg`.

### Concurrents

**Canary Technologies** (`ext-canary-d-fold.jpg`)
1. Hero centré + schéma produit en constellation (modules reliés à un centre) : la plateforme se comprend en une image.
2. Barre de logos de groupes hôteliers en grand format, en niveaux de gris, juste sous le hero.
3. Résultats « 4x upsell conversions » posés sur une photo client, une donnée par carte.

**Duve** (`ext-duve-d-fold.jpg`)
1. Grand titre serif avec un mot en italique : une signature hôtelière haut de gamme (si on garde une serif, c'est comme ça qu'elle se justifie).
2. Badge de note HotelTechReport sous le CTA : preuve externe vérifiable.
3. Capture mobile de l'app invité posée sur une photo d'établissement réel.

**Bookboost** (`ext-bookboost-d-fold.jpg`)
1. Double CTA « Book a Demo » + « Watch 3-min Demo » : un chemin pour ceux qui ne veulent pas parler à un commercial.
2. Section « Proven Results / What our customers achieve » juste après le hero.
3. Navigation en deux îlots flottants (navigation à gauche, entreprise et CTA à droite).

**Experience** (`ext-experience-hotel-d-fold.jpg`)
1. Vidéo « 2 minutes pour comprendre » comme visuel du hero.
2. Logos clients français et indépendants (The Originals, Timhotel) : la preuve parle au même marché que nous.
3. Pages À propos et Contact en premier niveau de navigation.

### Références SaaS

**Stripe** (`ext-stripe-d-fold.jpg`)
1. Compteur temps réel dans le hero (« Part du PIB mondial traitée… 1,745 % ») : chiffre vivant et sourcé.
2. Titre en deux tons : première phrase sombre, suite en gris bleuté. Hiérarchie sans changer de taille.
3. Lignes verticales de grille visibles et barre de logos alignée sur la grille : rigueur visible.

**Linear** (`ext-linear-d-fold.jpg`)
1. Capture produit réelle, très grande, rendue nette, qui sort du cadre en bas : le produit est le visuel.
2. Une seule famille sans-serif, approche serrée aux grandes tailles, gris sur noir pour la hiérarchie.
3. Annonce produit discrète « New / Loops → » alignée à droite du sous-titre au lieu d'un bandeau criard.

**Ramp** (`ext-ramp-d-fold.jpg`)
1. Bandeau annonce en noir, une ligne, un lien (« Ramp raises… Learn more »).
2. Ticker de compteurs live (« Agents at work today ») : preuve d'usage réel en continu.
3. Mur de logos en grille de cellules avec une cellule témoignage vidéo intégrée.

**Vercel** (`ext-vercel-d-fold.jpg`)
1. Énormément de blanc : titre, 2 CTA, un symbole. Rien d'autre au-dessus de la ligne de flottaison.
2. Trois CTA hiérarchisés : primaire plein (« Deploy now »), secondaire contour (« Talk to sales »), démo dans le header.
3. Logos en noir pur sur fond blanc cassé, même taille optique.

**Mercury** (`ext-mercury-d-fold.jpg`)
1. Champ email directement dans le hero + « Open account » : l'inscription commence sans changer de page.
2. Bouton secondaire « Launch demo » (démo interactive) à côté du principal.
3. Mentions de confiance réglementaires écrites clairement, en petit, dans la page (« Mercury is a fintech company, not a bank… ») : la transparence comme argument.

### Références choisies par Soufiane (7 novembre 2026)

Règle : **le contenu s'inspire du marché hôtelier, la forme s'inspire de la tech.**

**Oaky, pour le fond (présentation de l'upsell et du surclassement)** (`audit/sheets/ext-oaky-d.jpg`)
1. L'offre est montrée côté client : maquettes mobiles de ce que le voyageur reçoit (« Enhance your stay », photo de la chambre supérieure, prix du surclassement).
2. Cartes cas client avec logo du groupe, photo de l'hôtel et 2 chiffres (hausse du revenu upsell, ROI).
3. Onglets par rôle (siège, revenue, réception, opérations, marketing) et bibliothèque d'offres prêtes (« Deal library »), plus un compteur live « deals pris aujourd'hui ».

**Aircall, pour la forme** (`audit/screens/ext-aircall-d-fold.jpg`, `audit/sheets/ext-aircall-d.jpg`)
1. Vert profond très proche du teal TriggerFlow, fond blanc cassé chaud, dégradés pastel très doux derrière les captures.
2. Grand titre à fort contraste + étiquettes et boutons en **monospace majuscules** : rendu précis, technique, premium. Transposable avec **IBM Plex Mono**, de la même famille que Plex Sans.
3. Confiance affichée au plus près de la conversion : bandeau « conversations stockées en Europe », badges SOC 2 / RGPD sous le CTA final, double CTA « Démarrer gratuitement » / « Échanger avec un commercial ».

**GetWelcom, pour le fond (présentation de l'appel réception)** (`audit/sheets/ext-getwelcom-voip-d.jpg`, `audit/sheets/ext-getwelcom-remplacer-d.jpg`)
1. Un angle clair et frontal : « La fin du téléphone en chambre », avec les objections traitées une par une (gratuit pour les étrangers, pas de standard, pas de câblage, conformité Atout France).
2. Chiffres clés en 3 cartes et FAQ longue, orientée objections.
3. Déclinaisons SEO par type d'établissement (hôtel 2, 3, 4, 5 étoiles, résidence, club vacances) : une page par cible avec le même produit.

### Ce qu'on retient pour TriggerFlow

1. Le produit est le visuel (Linear) : captures réelles, grandes, nettes.
2. Des preuves datées et sourcées (Stripe, Ramp) : chiffres de fiabilité mesurés sur 12 mois avec la période indiquée.
3. Double CTA : inscription gratuite + démo (Vercel, Mercury, Bookboost).
4. Logos du même marché, avec cas clients derrière (Experience, Canary).
5. Une seule famille de police, approche serrée, hiérarchie par le gris (Linear, Vercel).
6. Bandeau d'annonce produit sobre en une ligne (Ramp, Linear).

---

## 5. Direction artistique cible

### 5.1 Palette (une seule couleur d'accent)

On garde le teal TriggerFlow pour la reconnaissance, mais il devient la **seule** couleur d'accent. Le reste passe en neutres légèrement chauds, sans teinte teal partout.

| Token | Valeur | Usage |
|---|---|---|
| `ink-950` | `#0B1513` | Texte principal, sections sombres |
| `ink-700` | `#3F4A48` | Texte secondaire |
| `ink-500` | `#6B7573` | Texte discret, légendes |
| `line` | `#E6E8E7` | Bordures 1 px |
| `surface` | `#FFFFFF` | Fond principal |
| `surface-2` | `#F7F7F5` | Sections alternées |
| `accent` | `#006F68` | CTA, liens, éléments actifs. **Rien d'autre n'est en couleur.** |
| `accent-hover` | `#005A54` | Survol |
| `accent-soft` | `#E6F1F0` | Fonds de badges accentués (avec parcimonie) |
| `success` / `warning` / `danger` | `#1F7A4D` / `#B7791F` / `#B42318` | États uniquement (statut, comparatifs Avec/Sans) |

À retirer : le pêche `#FFCFA2` comme accent, les violets et rouges décoratifs, les ombres teintées teal, les dégradés teal en arrière-plan.

### 5.2 Typographie

- **Une seule famille : Geist Sans** (déjà dans l'écosystème, Geist Mono est chargée), auto-hébergée via `next/font`, compatible Cloudflare. Approche négative aux grandes tailles (-0,02 à -0,035 em), graisse 500-600 pour les titres, pas de 800.
- **Geist Mono** pour les chiffres de preuve, les étiquettes de section et les détails techniques (statuts, horodatages) : ça donne le côté « mesuré, exact ».
- **On retire Fraunces.** Combinée à une sans-serif système, elle donne un rendu de modèle de site. Alternative si vous voulez garder une touche hôtelière : une serif seulement pour un mot en italique dans le H1 (pattern Duve), jamais pour les H2.
- Échelle : 14 / 16 / 18 / 20 / 24 / 32 / 44 / 60 / 72 px, interligne 1,1 pour le display et 1,6 pour le texte, largeur de lecture 60-68 caractères.

### 5.3 Grille et espacements

- 12 colonnes, contenu max 1200 px, gouttière 24 px, marges 16 px en mobile et 32 px en desktop.
- Échelle 4/8 px. Sections : 96 px mobile, 128 px desktop (au lieu de 64/96 : plus d'air, moins de sections).
- Lignes de grille fines visibles (1 px `line`) sur le hero et la barre de preuves, à la Stripe.
- Alternance de mises en page : texte à gauche + capture à droite, capture pleine largeur, grille 3 colonnes, bande sombre. Jamais deux sections consécutives avec la même structure.

### 5.4 Composants

`Button` (primaire plein, secondaire contour, lien), `Badge`, `Eyebrow` (mono, majuscules, 12 px), `SectionHeader`, `ProductShot`, `ProofBar`, `Stat` (valeur finale rendue côté serveur, source en note), `LogoWall`, `TestimonialCard`, `CaseResultCard`, `FeatureGrid`, `StepFlow` (déclencheur → action → résultat), `ComparisonTable`, `PricingCard`, `FaqList`, `CtaBand`, `AnnouncementBar`, `MegaMenu`, `Footer`. Coins : 8 px pour les contrôles, 12 px pour les cartes, 16 px pour les captures. Bordure 1 px plutôt qu'ombre ; une seule ombre douce pour les captures.

### 5.5 Style des captures produit

- Captures réelles de l'app, exportées en 2x, en WebP, recadrées sur le panneau qui sert le propos (pas l'écran entier).
- Cadre unique : fond `surface-2`, bordure 1 px, rayon 16 px, ombre douce, barre de fenêtre minimale ou absente.
- Données de démonstration réalistes et cohérentes partout (un hôtel fictif clairement nommé, par exemple « Hôtel des Tilleuls, démo »), jamais de faux noms qui ressemblent à des clients.
- Au maximum 1 ou 2 annotations par capture, en accent. Fin des pastilles flottantes empilées.
- Mobile : capture dédiée recadrée (portrait), pas la capture desktop réduite.
- Les photos stock de personnes disparaissent ; les seules photos sont celles des établissements clients (cas clients).

### 5.6 Mode sombre

Pas de bascule clair/sombre en v1 : coût de maintenance élevé pour un gain faible sur un site marketing. À la place, des **bandes sombres** (`ink-950`) pour les sections fiabilité et sécurité, comme Linear et Vercel : elles donnent le ton « infrastructure sérieuse ». Les tokens seront nommés par rôle (`surface`, `ink`) pour qu'un mode sombre reste possible plus tard.

### 5.7 Animations

Une apparition douce dans le hero, le schéma déclencheur → action → résultat animé une fois, survols subtils (150-200 ms). Tout le reste est statique et rendu côté serveur. `prefers-reduced-motion` respecté partout.

---

## 6. Architecture cible

### 6.1 Home en 10 sections

| # | Section | Contenu | Preuves nécessaires |
|---|---|---|---|
| 1 | Bandeau d'annonce | Une ligne, un lien (nouveauté produit ou intégration certifiée) | `[À FOURNIR]` annonce du moment |
| 2 | Hero | « Le CRM hôtelier qui s'adapte à votre hôtel. Pas l'inverse. », sous-titre validé, CTA « Commencer gratuitement » + « Voir une démo », grande capture de l'éditeur de flows | URL d'inscription gratuite |
| 3 | Barre de preuves | Logos autorisés + « Partenaire certifié » Oracle OHIP, Mews, Lean PMS | Accords logos ; attestations partenaires |
| 4 | 3 résultats nommés | Une carte par client : résultat chiffré, établissement, PMS, lien vers le cas | Chiffres validés par Edgar, Causse Comtal, Vieux Pressoir ou Noemys |
| 5 | Produit | Schéma déclencheur → action → résultat, puis les 10 produits par moment du séjour, avec un lien vers chaque landing | Captures |
| 6 | Fiabilité mesurée (bande sombre) | 94 % d'emails délivrés, 90 % de SMS remis, 91 % de paiements réglés en 2 h, avec période (12 derniers mois) et méthode de calcul | Période exacte et définition de chaque taux |
| 7 | 3 témoignages | Photo, nom, rôle, établissement, citation courte | Accords écrits |
| 8 | Sécurité et données | Hébergement en France, DPA public, RGPD, sous-traitants listés, lien /securite | Pays et prestataire d'hébergement (déjà dans le DPA) |
| 9 | Tarifs publics | 4 plans par établissement, lien vers /tarifs | Déjà en place (`src/data/pricing.ts`) |
| 10 | CTA final + footer | Double CTA ; footer Produit, Solutions, Clients, Ressources, Entreprise, Confiance, Légal | URL de statut |

### 6.2 Les 10 landings produit

Correspondance avec les 13 pages modules actuelles :

| Produit cible | Page actuelle | Devient |
|---|---|---|
| TriggerFlow Flows | `automatisations` | landing complète |
| TriggerFlow Inbox | `hub-messagerie` (+ `whatsapp`, `sms`, `email` comme canaux) | landing complète |
| TriggerFlow Upsell | `ventes-additionnelles` (+ solution `booster-upsell`) | landing complète |
| TriggerFlow Forms | `formulaires` | landing complète |
| TriggerFlow Pay | `paiements` | landing complète |
| TriggerFlow Reviews | `avis` (+ solution `augmenter-avis`) | landing complète |
| TriggerFlow Campaigns | `newsletter` (+ `email`, `sms` marketing) | landing complète |
| TriggerFlow CRM | `crm` (+ `analytics`) | landing complète |
| TriggerFlow AI | aucune page aujourd'hui (agent IA dans les tarifs) | nouvelle landing |
| TriggerFlow Loyalty | `fidelite` (+ solution `fideliser-clients`) | landing complète |

`email`, `sms`, `whatsapp`, `analytics` et les solutions par objectif sont redirigés en 301 vers la landing correspondante (SEO préservé, une seule page forte par sujet).

**Gabarit en 13 blocs** : hero, preuves, problème, comment ça marche, fonctionnalités, « taillé pour votre hôtel » (3 à 4 exemples réels de personnalisation), cas client, intégrations, fiabilité et sécurité, produits liés, tarif, FAQ (avec JSON-LD FAQPage), CTA. Le contenu de chaque landing vit dans un fichier de données FR/EN typé ; le gabarit est un seul composant serveur.

### 6.3 Nouvelles pages

- **/securite** (`/en/security`) : hébergement, chiffrement, sauvegardes, contrôle d'accès, sous-traitants (repris du DPA), RGPD, contact sécurité, divulgation responsable.
- **/a-propos** : refonte de `/entreprise/a-propos` (mission, histoire, équipe, entité juridique Utelys et MSL GROUPE, Toulouse). Photos d'équipe `[À FOURNIR]`.
- **/carrieres** : refonte de la page existante, état « pas d'offre ouverte » géré proprement.
- **Statut** : lien vers une page de statut externe (`status.trigger-flow.com`). L'outil (Better Stack, Instatus…) est à choisir de votre côté ; je ne fabrique pas une page de statut statique avec un faux « tous les systèmes opérationnels ».
- **Landings PMS** : généraliser la page Mews en un gabarit `/integrations/pms/[pms]` : Thaïs, Opera Cloud, Misterbooking, Medialog, Lean, Vega, Asterio.

### 6.4 Navigation

Header : Produit (méga-menu des 10 produits, par moment du séjour), Solutions (segments), Clients, Tarifs, Ressources (blog, guides, aide), puis Connexion, « Voir une démo » (secondaire), « Commencer gratuitement » (primaire).

---

## 7. Corrections rapides (lot 1)

1. Brancher la police de texte (2.1).
2. Rendre la valeur finale des compteurs côté serveur ; supprimer les `opacity:0` hors hero (2.2).
3. Créer `src/content/proof.ts` et y brancher meta, JSON-LD, `llms.txt`, `company-stats.ts` et les composants. Chiffres non confirmés en `[À FOURNIR]` (2.3).
4. Retirer les témoignages non traçables et corriger l'attribution Jullien / Surrel (2.4).
5. Retirer Accor, Sofitel, Ibis, Best Western tant que l'autorisation n'est pas fournie ; mettre les 4 clients documentés (2.5).
6. Supprimer le badge « 5/5 Note Google (3 avis) » et le « 9.4/10 ».
7. Supprimer le mot « Leader » (`fr.json:1154`, `en.json:1146`, `JsonLd.tsx`).
8. Corriger tous les liens sans préfixe de langue (2.7).
9. Corriger la carte « Maisons d'hôtes » qui pointe vers `/campings`.
10. Tarifs : « Commencer gratuitement » sur le plan 0 €, « démo » avec accent, « par établissement ».
11. Ajouter « Commencer gratuitement » dans le header et le hero.
12. Remplacer le bandeau hausse de prix par un bandeau d'annonce produit (la hausse reste expliquée sur /tarifs).
13. Ajouter À propos, Carrières et DPA au footer.
14. Pages solutions : retirer les emplacements de maquette vides.
15. Page Upsell : retirer les restes du gabarit email.

---

## 8. Preuves à fournir

Tant qu'ils ne sont pas fournis, ces éléments apparaîtront comme placeholder visible `[À FOURNIR]` (jamais remplacés par un chiffre inventé).

| Élément | Utilisé dans |
|---|---|
| Nombre d'établissements clients (et date) | Hero, barre de preuves, à propos |
| Nombre de PMS natifs en production vs en cours | Home, intégrations, meta |
| Période et méthode des taux 94 % / 90 % / 91 % | Section fiabilité, landings |
| Attestations partenaire Oracle OHIP, Mews, Lean PMS | Barre de preuves, landings PMS |
| Accord d'affichage des logos (Accor, Sofitel, Ibis, Best Western, et les 4 clients) | Barre de logos |
| 3 résultats chiffrés validés par les clients | Home section 4, landings |
| Accords écrits pour les témoignages (et statut de Sandrine Surrel, Nature Cathare) | Home section 7, landings |
| URL d'inscription au plan gratuit | Tous les CTA « Commencer gratuitement » |
| Prestataire et région d'hébergement, chiffrement, sauvegardes | /securite |
| URL de la page de statut | Footer, /securite |
| Photos d'équipe, date de création, effectif | /a-propos |
| Annonce produit du moment | Bandeau |

---

## 9. Plan d'implémentation proposé (à valider)

Chaque lot se termine par `npm run type-check`, `npm run lint`, `npm run build`, puis une vérification dans Chrome en 1440 px et 390 px de chaque page touchée (captures avant/après dans `docs/audit/`).

**Lot 1 : corrections rapides** (section 7). Pas de changement visuel majeur, uniquement de la correction et de la vérité des preuves. Livrable déployable seul.

**Lot 2 : système de design**
- Tokens dans `globals.css` (`@theme`) : palette 5.1, typo 5.2, rayons, ombres, espacements. Les anciens tokens restent tant que les anciennes pages existent (les landings `/lp/*` ne bougent pas).
- Composants dans `src/components/ds/` (5.4), tous serveur par défaut ; client uniquement pour le méga-menu, les onglets et l'accordéon.
- `src/content/proof.ts` devient la seule source des chiffres, `src/content/testimonials.ts` la seule source des témoignages (chacun lié à un cas client).
- Page interne `/fr/design-system` (noindex) pour vérifier les composants dans Chrome.

**Lot 3 : home** (6.1), FR et EN, nouveau header et nouveau footer (qui s'appliquent à tout le site).

**Lot 4 : gabarit de landing produit**, puis Upsell, Flows et Pay. Contenu dans `src/content/products/<produit>.ts`, redirections 301 dans `next.config.ts`. Les 7 autres produits suivent sur le même gabarit après validation des 3 premiers.

**Lot 5 : pages de confiance** : /securite, /a-propos, /carrieres, lien statut, gabarit landings PMS (Thaïs en premier).

### Décisions à prendre avant de coder

1. **URL des landings produit** : nouvelles URL de marque (`/fr/produit/upsell`, `/fr/produit/flows`, `/fr/produit/pay`…) avec 301 depuis les anciennes, ou garder les slugs actuels (`ventes-additionnelles`, `automatisations`, `paiements`) ? Recommandation : nouvelles URL + 301, cohérentes avec les noms de produits.
2. **Typographie** : Geist seule (recommandé), ou Geist + une serif pour un seul mot du H1 ?
3. **Témoignages non traçables** : je les retire dès le lot 1 (recommandé), ou vous me confirmez lesquels sont réels ?
4. **12 PMS** : chiffre à garder (tous en production) ou à corriger en « 8 natifs + 4 en cours » ?
