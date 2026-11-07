# Charte graphique du site TriggerFlow

Livrable A6. Version 1, 7 novembre 2026. À valider.
Bases : guidelines Figma de l'agence La rampe (logo, palette, IBM Plex Sans). Forme : Aircall (contraste, mono, confiance près des CTA). Animations : Fullwhere en mieux (`docs/visuels.md`).

---

## 1. Principes

1. **Le produit est le visuel.** Chaque section montre la vraie interface, animée.
2. **Calme et précis.** Beaucoup d'air, une seule couleur d'action, des chiffres sourcés.
3. **Une marque, une famille de police.** IBM Plex Sans pour tout, IBM Plex Mono pour les détails techniques.
4. **Confiance visible.** « Hébergé en France · RGPD », vrais clients et vrais écrans, près de chaque bouton d'action.

---

## 2. Couleurs

Palette officielle (Figma) : `#000000`, `#FFFFFF`, `#002B28`, `#006F68`, `#CCE2E1`, `#FFCFA2`. On y ajoute uniquement des neutres dérivés.

| Rôle | Couleur | Usage |
|---|---|---|
| **Encre** | `#002B28` | Titres, texte principal, sections sombres |
| Texte secondaire | `#3D4F4D` | Paragraphes, descriptions |
| Texte discret | `#5B6B69` | Légendes, mentions |
| **Accent (unique)** | `#006F68` | Boutons principaux, liens, éléments actifs, ce qui bouge dans les animations |
| Accent survol | `#005A54` | Survol des boutons et liens |
| Menthe | `#CCE2E1` | Fonds doux, badges, zones de mise en avant |
| Pêche | `#FFCFA2` | Événement positif uniquement : paiement reçu, offre achetée, nouveauté. Jamais pour du texte |
| Papier | `#FAF9F6` | Fond des sections alternées (blanc cassé chaud, à la Aircall) |
| Blanc | `#FFFFFF` | Fond principal, cartes |
| Bordure | `#E4E8E7` | Bordures 1 px |
| Noir | `#000000` | Réservé au logo sur fond clair |

Contrastes vérifiés (norme WCAG) : encre sur blanc 15,3 ; accent sur blanc 6,1 ; accent sur papier 5,7 ; texte discret sur blanc 5,6 ; encre sur menthe 11,3 ; encre sur pêche 10,7. Tous au-dessus du minimum de 4,5.

**Interdit** : dégradés teal en fond de page, violets, rouges décoratifs, ombres colorées, plus d'une couleur d'action par écran.

Sections sombres (fiabilité, sécurité, CTA final) : fond encre `#002B28`, texte blanc, accent menthe `#CCE2E1` pour les détails.

---

## 3. Typographie

**IBM Plex Sans** (titres et texte) + **IBM Plex Mono** (étiquettes, boutons, chiffres de preuve, détails techniques). Auto-hébergées, chargement optimisé.

| Niveau | Taille desktop / mobile | Graisse | Interligne | Approche |
|---|---|---|---|---|
| Display (H1 home) | 64 / 40 px | 500 | 1,05 | -0,025 em |
| H1 pages | 52 / 36 px | 500 | 1,1 | -0,02 em |
| H2 | 40 / 30 px | 500 | 1,15 | -0,02 em |
| H3 | 24 / 20 px | 600 | 1,3 | -0,01 em |
| Texte large | 20 / 18 px | 400 | 1,55 | 0 |
| Texte | 17 / 16 px | 400 | 1,6 | 0 |
| Petit | 14 px | 400 | 1,5 | 0 |
| Étiquette (mono) | 12 px, MAJUSCULES | 500 | 1,4 | +0,08 em |
| Bouton (mono) | 14 px, MAJUSCULES | 500 | 1 | +0,04 em |
| Chiffre de preuve (mono) | 48 / 36 px | 500 | 1 | -0,02 em |

Règles : titre en deux tons possible (première partie encre, suite en texte secondaire, à la Stripe) ; largeur de lecture 60 à 68 caractères ; pas de texte en gras au milieu des paragraphes ; jamais de tiret long.

---

## 4. Grille et espacements

- Contenu max **1200 px**, 12 colonnes, gouttière 24 px. Marges : 16 px mobile, 24 px tablette, 32 px desktop.
- Échelle d'espacement (px) : 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Sections : **128 px** en desktop, **80 px** en mobile.
- Lignes de grille fines (1 px bordure) visibles sur le hero et la barre de logos.
- Mises en page à alterner, jamais deux fois la même à la suite : texte + visuel côte à côte, visuel pleine largeur, grille de 3 cartes, bande sombre, onglets.

---

## 5. Formes et profondeur

| Élément | Rayon |
|---|---|
| Boutons, champs | 8 px |
| Badges | 999 px (pilule) |
| Cartes | 12 px |
| Visuels produit | 16 px |
| Grands blocs (CTA final) | 24 px |

Bordure 1 px plutôt qu'ombre. Une seule ombre, pour les visuels produit : `0 24px 48px -12px rgba(0,43,40,0.18)`.

---

## 6. Composants

**Boutons**
- Principal : fond accent, texte blanc, mono majuscules (« DÉMARRER GRATUITEMENT »).
- Secondaire : contour encre 1 px, texte encre (« VOIR LE PRODUIT »).
- Lien : texte accent + flèche.
- Sur fond sombre : principal en blanc texte encre, secondaire contour blanc.
- Hauteur 48 px (40 px dans le header). Survol : couleur plus foncée, transition 150 ms.

**Étiquette de section** : mono 12 px majuscules, couleur accent, avec un petit trait ou un point devant (« ● SYNCHRONISATION »).

**Badges** : pilule menthe, texte encre, 13 px. Badge « Nouveau » en pêche.

**Cartes** : fond blanc, bordure 1 px, rayon 12 px, padding 24 à 32 px, survol = bordure accent.

**Visuel produit** : cadre papier, bordure 1 px, rayon 16 px, ombre unique, interface réelle simplifiée, animée (voir `docs/visuels.md`).

**Témoignage** : citation 20 px encre, puis photo ronde 40 px, nom, rôle, établissement, et logo du client.

**Barre de logos** : logos en encre monochrome, même hauteur optique (28 px), 6 par ligne en desktop, défilement lent en mobile.

**Chiffre de preuve** : chiffre en mono, libellé dessous, source en petit (« 12 derniers mois »).

**Bande confiance** (près des CTA) : « Hébergé en France · RGPD · DPA public » en mono 12 px avec icônes.

**FAQ** : liste avec séparateurs 1 px, pas de cartes, signe + qui tourne.

**Header** : blanc, devient flou translucide au défilement, hauteur 64 px. **Footer** : fond encre, 7 colonnes.

---

## 7. Motif graphique

Le logo est construit avec 3 formes (Figma) : **l'arc du déclencheur**, **les flux d'automatisation**, **la flèche**.
- Ces formes servent de motif : en filigrane très léger dans les sections sombres, et comme fil conducteur des schémas (déclencheur → action → résultat).
- Les lignes qui relient les éléments dans les animations reprennent la courbe de l'arc.
- Jamais de motif décoratif sans rapport avec le produit.

---

## 8. Icônes, photos, illustrations

- **Icônes** : Lucide, trait 1,5 px, 20 ou 24 px, couleur encre ou accent. Pas d'icônes en couleur pleine, pas d'emoji.
- **Photos** : uniquement les établissements clients (cas clients, témoignages). Plus de photos de banque d'images ni de personnes posées.
- **Illustrations** : pas d'illustrations génériques. Le produit animé remplace l'illustration.
- **Logos partenaires** (PMS, paiement…) : en couleurs d'origine dans les pages intégrations, en monochrome ailleurs.

---

## 9. Animation

- Durées : 150 ms (survol), 300 ms (apparition), 600 ms à 1,2 s (étapes de scénario).
- Courbe d'accélération douce et unique pour tout le site.
- Uniquement position et transparence (fluide sur mobile).
- Lecture à l'entrée dans l'écran, pause à la sortie ; état final affiché si l'utilisateur a réduit les animations.
- Pas d'apparition au défilement sur les textes : le texte est là tout de suite, seuls les visuels s'animent.

---

## 10. Mode sombre

Pas de bascule clair / sombre en v1. Des **sections sombres** (encre) rythment la page : fiabilité, sécurité, CTA final. Les couleurs sont nommées par rôle pour permettre un mode sombre plus tard.

---

## 11. Ce qui disparaît par rapport au site actuel

Fraunces (police serif), le pêche utilisé comme accent de titres, les dégradés teal, les photos de personnes en banque d'images, les pastilles flottantes empilées sur les captures, les apparitions au défilement sur tous les blocs, le bandeau de hausse de prix.
