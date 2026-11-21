---
name: triggerflow-brand
description: Règles de marque du site TriggerFlow (pages d'atterrissage, site vitrine, maquettes) : palette vert et pêche, proportion clair/sombre et fond de chaque section, typographie IBM Plex, formes, mouvement (3D, nuée de points, défilement), budget de fluidité et liste des « jamais ». À charger avant de créer, refondre ou relire une page, une section ou une maquette du site TriggerFlow, même si la demande parle seulement de « design », de « couleurs », d'« animation » ou de « LP ».
---

# Marque TriggerFlow (site)

Ces règles viennent de la refonte de la LP CRM hôtelier (maquette `?v=2b`, novembre 2026), validée par Mounir.
Elles disent ce que la marque fait déjà ; elles ne remplacent ni le `CLAUDE.md` du dépôt (code, i18n, images) ni le
jugement : quand une page a une bonne raison d'en sortir, dis-le dans le plan au lieu de le faire en silence.

Lecteur visé : un directeur d'hôtel indépendant, souvent venu d'une publicité, qui lit sur téléphone. Il doit
comprendre en quelques secondes et lire sans effort : c'est pour lui que la page est surtout claire.

## 1. Clair d'abord : proportion et fond de chaque section

Une page TriggerFlow est **claire à environ 80 %** de sa hauteur défilée. Le vert foncé est un événement, pas un
décor : **au plus deux moments sombres par page**, choisis pour leur force. Le panneau d'appel final compte pour un.

Sur une page d'atterrissage, l'ouverture sombre est le premier moment (elle porte la promesse de la pub). Sur une
page du site (fonctionnalité, article, page légale), le héros est clair, sauf s'il porte une vraie scène (animation,
capture mise en scène) ; un titre et deux boutons ne justifient pas le vert.

| Moment | Fond |
|---|---|
| Ouverture (héros), si elle est un moment fort | vert nuit `#002B28`, dégradé radial `#0B4640 → #002B28 → #00201E` permis |
| Récit, étapes, scènes animées | papier `#F5F1EA` |
| Preuves, cas clients, fiche produit, FAQ | blanc |
| Tarifs (ou une section à détacher) | menthe très pâle `#F2F7F6` |
| Appel final à la démo | panneau vert arrondi (28 px téléphone, 40 px ordinateur), encadré de blanc, pas en pleine largeur |
| Pied de page | blanc, texte `ink-3` |

- Après le passage au clair, la page ne repasse jamais à une **bande sombre pleine largeur**. Le seul retour au vert
  est le panneau d'appel final, posé dans la page claire comme un objet.
- Passage du sombre au clair : un **iris de papier** qui s'ouvre depuis le sujet (la carte de Camille), pendant un
  mouvement qui le justifie (le dézoom de l'ouverture). Pas de fondu enchaîné : le mélange du vert nuit et du papier
  passe par un gris sale. Le passage finit avant l'arrivée du premier texte ; l'en-tête bascule d'un coup avec une
  transition CSS de 300 ms.
- Deux sections voisines n'ont pas le même fond clair si elles n'ont rien à voir ; alterne papier, blanc, menthe pâle.

## 2. Palette

Vert pour les surfaces, **pêche comme seul accent**. Pas de second accent, pas de violet, pas de bleu.

| Rôle | Sur fond sombre | Sur fond clair (papier, blanc) |
|---|---|---|
| Titres | `#EEF6F4` | `#0C2A26` (ou `ink` `#002B28`) |
| Corps | `#CCE2E1` à 80 % | `#344E4A` à 92 % (`ink-2` `#3D4F4D` sur blanc) |
| Seconde moitié d'un titre en deux temps | menthe `#86C5B9` | vert `#257A6C` |
| Filets, rails | blanc à 13 % | `#0C2A26` à 14 % |
| Montants, prix | pêche `#FFCFA2` | pêche foncée `#B2541C` (la pêche claire ne passe pas le contraste sur papier) |
| Boutons d'action | fond pêche `#FFCFA2` (`variant="accent"`, c'est `brand-accent` : ne pas recoder la couleur), texte `brand-dark` | idem |
| Action secondaire | lien souligné (« Être rappelé »), `decoration-white/30`, décalage 6 px | lien souligné `ink`, pas une seconde pilule |

La pêche va aux actions et à l'argent : boutons, en-tête « Réserver une démo », prix choisis, pastille du message.
Un pictogramme décoratif, une icône de FAQ, un filet : jamais en pêche.

## 3. Typographie

- IBM Plex Sans partout (`--font-sans`). Titres en graisse 500, jamais en 300 sur fond clair (trop pâle).
- **Titre en deux temps** : la première moitié en couleur de titre, la seconde en menthe (sombre) ou vert `#257A6C`
  (clair). Une seule coupure, au sens du titre (« Branché sur votre PMS, | pas à côté »).
- Chiffres forts en **IBM Plex Condensed** (`--font-plex-condensed`), très grands, légende courte dessous.
- Dernier mot d'un titre jamais seul sur sa ligne (espace insécable), `text-balance` sur les titres.
- Pas de tiret long (—) dans les textes : virgule, deux-points ou point.

## 4. Formes et mise en page

- Rayons : 16 px pour cartes et captures, 12 px pour les petits blocs, 28/40 px pour le panneau d'appel.
- Boutons en pilule (`rounded-full`, composant `Button` / `ButtonLink`).
- Colonne de texte du récit : `min(42vw, 620px)` sur ordinateur, texte et visuel côte à côte, alternés seulement si
  la composition change d'une étape à l'autre (pas de zigzag mécanique sur un seul gabarit).
- Héros : **4 éléments au plus** (titre, sous-titre, action principale, action secondaire). Logos clients en bas.
- Conteneur : `max-w-[1240px]`, gouttière 16 px sur téléphone (32 px sur ordinateur).
- Sections claires : `py-16 lg:py-28`. Titre de section : 29 px puis 46 px, graisse 500, interlignage 1,1 puis 1,06,
  `tracking-[-0.03em]`. Titre du héros : jusqu'à 92 px sur ordinateur.
- Une étape de récit sans visuel (capture, objet, scène) reste en colonne simple : un chiffre dans une carte n'est
  pas un visuel, et l'alternance gauche/droite sans visuel devient mécanique.
- Les vraies captures de l'app (WebP recadrées sur ce qu'on montre, lisibles à 390 px), jamais une fausse interface
  faite en `div`. Un message montré reprend la vraie forme de l'e-mail envoyé (modèles MJML de `src/data/calendrier-mjml/`).

## 5. Mouvement

Le mouvement raconte le séjour du client (réservation, avant l'arrivée, paiement, avis, retour) ; il ne décore pas.

- **Fond génératif** : une nuée de points dessinée sur un canvas 2D, qui prend la forme de chaque étape puis laisse la
  main à un objet 3D. Points verts `#18544C` sur papier (données brutes `#8CA8A2`), accents menthe `#26967C` ou pêche
  `#E88446` ; sur la nuit, points clairs `#ECF6F3`. Réglages par défaut : ceux de `reglages.tsx` de la maquette.
  Pas de pictogramme en points pour un sentiment (cœur, infini) : un objet qui a un sens dans le séjour.
- **Objets 3D** (Three.js) : une seule toile WebGL, objets construits à leur première apparition et préparés en temps
  mort (`requestIdleCallback`), timeline GSAP **en pause**, pilotée par la position de défilement (`tl.progress`). Sur
  papier : matières mates, peu d'éclat (`emissiveIntensity` bas, sinon l'objet blanchit), ombres portées douces.
  La nuée reste en accompagnement à 30 % pendant un objet 3D.
- **Défilement hors de React** : la position est gardée dans une ref ; une fonction pose les styles directement
  (`poserStyle`, qui n'écrit que si la valeur change). L'état React ne change qu'avec la taille de l'écran ou aux
  frontières d'étape. Zéro rendu React pendant un défilement continu.
- **Couleurs qui changent au défilement** : jamais une variable CSS sur `:root` modifiée à chaque image (chaque
  écriture recalcule le style de toute la page : mesuré, p95 ×2,5). Ouvrir le calque de papier par son `transform`
  (iris, sur le compositeur), basculer les variables de texte d'un coup quand aucun texte n'est à l'écran, poser une
  variable sur le seul élément qui en a besoin (l'en-tête).
- Boucles `requestAnimationFrame` arrêtées hors écran (IntersectionObserver) et quand aucun objet n'est présent.
- Tarifs, FAQ, formulaire et appel final : **sans animation ni 3D**.
- « Réduire les animations » (et écran trop court) : version fixe, mêmes contenus, mêmes fonds clairs.

**Budget** : à 390 px, CPU ralenti ×4, défilement continu du récit : p95 ≤ 25 ms par image, moins de 10 images
au-dessus de 50 ms, 0 rendu React. Référence de la maquette `?v=2b` : p95 10,4 ms, 6 images > 50 ms.

## 6. Jamais

- Violet, bleu, dégradés arc-en-ciel, un second accent à côté de la pêche.
- Plus de deux moments sombres ; une bande sombre pleine largeur après le passage au clair.
- Héros tout centré avec bandeau de chiffres et « plan gratuit » (hors ouverture validée) ; plus de 4 éléments.
- Trois cartes à icône en rang ; un récit fait d'un seul gabarit répété.
- Tiret long ; légende de 11 px ; titre en graisse fine sur fond clair.
- Fausse capture en `div` ; capture d'écran entière réduite jusqu'à l'illisible.
- Chiffre inventé (avis, taux, nombre de clients, mais aussi « 1 clic » ou « 30 minutes ») : tout chiffre
  est une promesse. Seulement des chiffres réels, déjà dans le dépôt (`src/data/brand.ts`, `src/lib/pricing.ts`,
  `src/messages/*.json`), sinon une phrase sans chiffre.
- Animation qui tourne hors écran, ou état React mis à jour à chaque image de défilement.

## Avant de rendre une page

1. Captures 1440, 768 et 390 px : proportion clair/sombre, deux moments sombres au plus, pêche seule en accent.
2. Contraste des textes sur papier (titres, corps, montants pêche foncée).
3. Mesure de fluidité au budget ci-dessus si la page anime au défilement.
4. Relecture de la liste « Jamais ».
