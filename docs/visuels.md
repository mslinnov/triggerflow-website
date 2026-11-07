# Visuels dynamiques : principes et catalogue

Livrable A8 (première version), 7 novembre 2026. Référence de style : https://fullwhere.com/en/ (observée dans Chrome).

---

## 1. Ce que fait Fullwhere (et qu'on reprend)

1. **Scénario joué pas à pas** : un message client arrive, une puce « Analyse en cours » s'affiche, puis « Recherche du client dans le CRM », la réponse s'écrit lettre par lettre, et une carte « Action : notification à Mathieu » apparaît. On comprend le produit sans lire.
2. **Onglets d'étapes qui défilent seuls** (Fuel → Connect → Automate) avec une barre de progression dans l'onglet actif ; un clic permet de choisir.
3. **Arbre d'automatisation qui s'allume** : le déclencheur passe en « Triggered », la condition gagnante s'éclaire, les actions s'activent l'une après l'autre.
4. **Schéma hub** : les canaux reliés par des lignes à un centre (le logo).
5. **Grille de tuiles d'intégrations** où la mise en avant passe d'une tuile à l'autre, avec une petite notification.
6. **Interface en gris** (lignes squelettes) avec **une seule couleur** pour ce qui bouge : l'œil va droit à l'action.
7. Détails : étiquette de section tapée au clavier avec curseur, bandes hachurées avec un reflet qui passe, petites icônes isométriques au trait, micro-animations en boucle dans les sections sombres (courbe qui se dessine, roue de chiffres).

## 2. Comment on fait mieux

| Fullwhere | TriggerFlow |
|---|---|
| Interface en squelettes gris, générique | **Vraie interface TriggerFlow**, simplifiée, avec des données hôtelières de démo (chambres, arrivées, PMS) |
| Scénarios génériques (restaurant, SAV) | **Un scénario métier par module** : surclassement, check-in, caution, avis… |
| Vidéos MP4 sur une partie des blocs | **Composants codés** : nets à toutes les tailles, traduisibles FR/EN, légers, lisibles par Google |
| Côté outil uniquement | **Les deux côtés** : ce que voit l'hôtel et ce que reçoit le client (téléphone), comme Oaky pour le surclassement |
| Pas de lien avec le PMS | **La synchro visible** : chaque scénario finit par « synchronisé avec Mews / Thaïs… » |

## 3. Règles techniques

- Un seul moteur réutilisable : `ScenarioPlayer`, qui lit un scénario décrit en données (étapes, délais, textes FR/EN). Chaque visuel = un fichier de données + quelques briques d'interface.
- Lecture quand le visuel entre à l'écran, pause quand il sort, boucle discrète, bouton rejouer.
- `prefers-reduced-motion` : on affiche directement l'état final, statique.
- Rendu serveur de l'état final : jamais de bloc vide, jamais de « 0 ».
- Animations en transform/opacity uniquement (fluides sur mobile), pas de vidéo, pas de bibliothèque lourde (framer-motion est déjà installé).
- Données de démo clairement fictives (« Hôtel des Tilleuls », clients fictifs) : jamais confondables avec un vrai client ou un vrai résultat.
- Couleurs : interface en neutres, **teal `#006F68` pour ce qui bouge**, pêche `#FFCFA2` pour un événement positif (paiement reçu, offre achetée).
- Desktop : visuel large à côté du texte. Mobile : version recadrée, verticale, pas la version desktop réduite.

## 4. Catalogue par module

| Page | Scénario animé |
|---|---|
| **Home, hero** | Un segment se construit (critères qui s'ajoutent : « Couple », « Arrivée dans 3 jours », « Réservé via Booking »), le compteur se met à jour, un flow le prend en charge, l'offre part, « Surclassement acheté », synchronisé avec le PMS |
| **Home, produit** | Onglets Avant / Pendant / Après le séjour qui défilent seuls, un mini-scénario par onglet |
| **Flows** | Arbre qui s'allume : réservation créée → condition (langue, segment) → deux branches → email, WhatsApp, tâche pour la réception |
| **Segments** | Critères combinés un par un, liste de clients qui se filtre, compteur qui change |
| **CRM et dédoublonnage** | Trois fiches « J. Dupont », « Jean Dupont », « jean.dupont@… » détectées comme doublons, qui fusionnent en une fiche 360 (séjours, dépenses, préférences) |
| **Synchronisation** | PMS ⇄ TriggerFlow : les réservations remontent, les statuts et paiements redescendent, flèches dans les deux sens |
| **Intégrations** | Hub central relié aux catégories (PMS, paiement, serrures, téléphonie, canaux, avis), tuiles qui s'allument tour à tour |
| **Upsell** | Côté client : email reçu → page « Chambre supérieure » → « Ajouter ». Côté hôtel : la commande apparaît, le PMS est mis à jour |
| **Pay** | Lien de caution envoyé → paiement sur le téléphone → « Payé » sur la fiche client et dans le PMS |
| **Forms** | Formulaire pré-séjour qui se remplit, un bloc d'offre s'insère (« Petit-déjeuner ? Oui »), la réponse arrive sur la fiche |
| **Check-in** | Pièce d'identité scannée → champs remplis automatiquement → « Check-in terminé », renvoyé au PMS |
| **Inbox** | Messages qui arrivent de WhatsApp, Booking.com, Instagram, email → regroupés par client → réponse suggérée par l'IA qui s'écrit → validée et envoyée |
| **Reviews** | Enquête reçue : note 5 → invitation à publier sur Google ; note 2 → alerte à la directrice, pas d'invitation |
| **Guest App** | Téléphone : livret d'accueil, navigation, commande d'un service, la demande arrive à l'équipe |
| **Voice** | Appel de la chambre 204 → la fiche du client s'ouvre côté réception |
| **Housekeeping** | Plan des chambres dont les statuts changent de couleur, renvoyés au PMS |
| **Clés digitales** | SMS avec la clé → la serrure s'ouvre |
| **Campagnes** | Un email qui s'assemble, envoyé à un segment, ouvertures et réservations qui montent |
| **Newsletter** | Inscription via le widget → contact créé avec son consentement RGPD |
| **Loyalty** | Séjour terminé → points crédités → palier atteint → carte Apple Wallet mise à jour |
| **Analytics** | Courbe qui se dessine, chiffres du tableau de bord qui se mettent en place |
| **Demandes de réservation, Events, B2B** | Demande reçue → calendrier → validation → client ou société rattachés |
| **IA intégrée** | Mêmes scénarios, avec des étiquettes « Suggéré par l'IA » et « Validé par Anne, réception » |

## 5. Production

1. Les données de démo et les écrans à reproduire viennent de l'app (captures HD ou compte de démo).
2. Chaque visuel est prototypé dans **Claude Design** et validé par Soufiane.
3. Il est ensuite codé avec le `ScenarioPlayer`, puis vérifié dans Chrome en desktop et mobile.
4. **Higgsfield** sert seulement aux vidéos marketing et réseaux sociaux, pas aux interfaces.
