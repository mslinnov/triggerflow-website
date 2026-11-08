/**
 * Contenu de la landing App client (FR/EN). L'App client est la webapp Utelys, connectée à TriggerFlow.
 * Capacités : audit des projets utelys (nouvelle version Laravel/React) et triggerflow du 08/11/2026.
 * Validé par Soufiane (08/11) : témoignages utelys.com réutilisables, 39 €/mois pour les clients TriggerFlow,
 * « livraison en 2 semaines » conservée.
 * Ne PAS affirmer : notifications push, check-out en ligne, carte des lieux à proximité, réservation spa ou
 * restaurant dans l'app, paiement dans l'app (le paiement passe par les liens TriggerFlow).
 */
type L = { fr: string; en: string };

export const guestAppLanding = {
  seo: {
    title: { fr: 'App client hôtel sans téléchargement | TriggerFlow', en: 'Hotel guest app, no download | TriggerFlow' },
    description: {
      fr: 'Une webapp à vos couleurs, sur votre domaine : infos pratiques, room service, chat et fidélité, ouverte depuis un lien ou un QR code. Connectée à votre PMS.',
      en: 'A web app in your colours, on your domain: practical info, room service, chat and loyalty, opened from a link or QR code. Connected to your PMS.',
    },
  },
  hero: {
    eyebrow: { fr: 'App client', en: 'Guest app' } as L,
    title: { fr: 'Votre hôtel dans la poche de vos clients. Sans application à télécharger.', en: 'Your hotel in your guests’ pocket. No app to download.' } as L,
    subtitle: {
      fr: 'Une webapp à vos couleurs, sur votre domaine. Vos clients l’ouvrent depuis un lien ou un QR code, déjà connectés à leur séjour : infos pratiques, room service, chat avec la réception et fidélité.',
      en: 'A web app in your colours, on your own domain. Guests open it from a link or a QR code, already connected to their stay: practical info, room service, chat with the front desk and loyalty.',
    } as L,
    bullets: [
      { fr: 'Pas de store, pas de mot de passe', en: 'No store, no password' },
      { fr: 'Votre livret d’accueil, enfin à jour et traduit', en: 'Your welcome book, finally up to date and translated' },
      { fr: 'Livrée clé en main en 2 semaines', en: 'Delivered turnkey in 2 weeks' },
    ] as L[],
    shots: [
      { src: '/images/guest-apps/sofitel-iphone.webp', name: 'Sofitel' },
      { src: '/images/guest-apps/mdm-iphone.webp', name: 'Maisons du Monde Hôtel & Suites' },
      { src: '/images/guest-apps/foliedouce-iphone.webp', name: 'La Folie Douce' },
    ],
    alt: { fr: 'App client de l’hôtel {name} sur iPhone', en: '{name} hotel guest app on iPhone' } as L,
  },
  proof: {
    label: { fr: 'Leurs clients ont l’hôtel dans la poche', en: 'Their guests carry the hotel in their pocket' } as L,
    clients: ['Saint James Paris', 'Sofitel Marrakech', 'Maisons du Monde Hôtel & Suites', 'Edgar Hôtel & Spa'],
  },
  access: {
    eyebrow: { fr: 'L’accès', en: 'Access' } as L,
    title: { fr: 'Trois façons d’entrer,', en: 'Three ways in,' } as L,
    titleMuted: { fr: 'zéro frottement.', en: 'zero friction.' } as L,
    items: [
      { title: { fr: 'Un lien dans vos messages', en: 'A link in your messages' }, text: { fr: 'Vos flows envoient un lien personnel par email, SMS ou WhatsApp. Le client arrive déjà connecté à son séjour.', en: 'Your flows send a personal link by email, SMS or WhatsApp. The guest arrives already connected to their stay.' } },
      { title: { fr: 'Un QR code', en: 'A QR code' }, text: { fr: 'En chambre, à la réception, au restaurant. Chaque QR code a ses propres statistiques.', en: 'In the room, at the front desk, in the restaurant. Each QR code has its own statistics.' } },
      { title: { fr: 'Le numéro de chambre', en: 'The room number' }, text: { fr: 'Chambre, nom et date d’arrivée, vérifiés dans votre PMS, puis un code reçu par email.', en: 'Room, last name and arrival date, checked against your PMS, then a code sent by email.' } },
    ],
  },
  inside: {
    eyebrow: { fr: 'Ce que vos clients y trouvent', en: 'What guests find inside' } as L,
    title: { fr: 'Tout ce qu’ils demandaient à la réception.', en: 'Everything they used to ask the front desk.' } as L,
    items: [
      { key: 'info', title: { fr: 'Infos pratiques', en: 'Practical info' }, text: { fr: 'Wifi, horaires, petit-déjeuner, parking, plan d’accès.', en: 'Wifi, opening hours, breakfast, parking, directions.' } },
      { key: 'dining', title: { fr: 'Restaurant et bar', en: 'Restaurant and bar' }, text: { fr: 'Cartes, horaires, demandes de réservation.', en: 'Menus, opening hours, booking requests.' } },
      { key: 'spa', title: { fr: 'Spa et services', en: 'Spa and services' }, text: { fr: 'Soins, tarifs, galerie photo, contact direct.', en: 'Treatments, prices, photo gallery, direct contact.' } },
      { key: 'order', title: { fr: 'Room service et boutique', en: 'Room service and shop' }, text: { fr: 'Commandes depuis votre catalogue, avec le stock à jour.', en: 'Orders from your catalogue, with live stock.' } },
      { key: 'agenda', title: { fr: 'Agenda des activités', en: 'Activity agenda' }, text: { fr: 'Yoga, dégustation, sortie : inscription en un clic, places limitées.', en: 'Yoga, tasting, outing: one-click sign-up, limited places.' } },
      { key: 'chat', title: { fr: 'Chat avec la réception', en: 'Chat with the front desk' }, text: { fr: 'Les messages arrivent dans la messagerie TriggerFlow.', en: 'Messages land in the TriggerFlow inbox.' } },
      { key: 'loyalty', title: { fr: 'Fidélité', en: 'Loyalty' }, text: { fr: 'Le solde de points et les récompenses du client.', en: 'The guest’s points balance and rewards.' } },
      { key: 'contact', title: { fr: 'Contact en un geste', en: 'One-tap contact' }, text: { fr: 'Appel, email, SMS ou WhatsApp vers l’hôtel.', en: 'Call, email, SMS or WhatsApp to the hotel.' } },
    ],
  },
  personal: {
    eyebrow: { fr: 'Personnalisée', en: 'Personalised' } as L,
    title: { fr: 'Une app différente pour chaque séjour.', en: 'A different app for every stay.' } as L,
    text: { fr: 'Le client est accueilli par son prénom, voit sa chambre et ses dates. Les blocs s’affichent selon son profil : l’offre famille pour les familles, le séminaire pour les entreprises.', en: 'Guests are greeted by name and see their room and dates. Blocks appear according to their profile: the family offer for families, the meeting package for companies.' } as L,
    greeting: { fr: 'Bonjour Camille', en: 'Hello Camille' } as L,
    stay: { fr: 'Chambre 412 · du 12 au 15 mars', en: 'Room 412 · March 12 to 15' } as L,
    blocks: [
      { fr: 'Votre petit-déjeuner, servi de 7 h à 10 h 30', en: 'Your breakfast, served 7 to 10:30 am' },
      { fr: 'Offre famille : l’atelier cuisine des enfants', en: 'Family offer: kids’ cooking workshop' },
      { fr: 'Vos 1 240 points de fidélité', en: 'Your 1,240 loyalty points' },
    ] as L[],
  },
  connected: {
    eyebrow: { fr: 'Connectée à TriggerFlow', en: 'Connected to TriggerFlow' } as L,
    title: { fr: 'L’app et vos parcours clients ne font qu’un.', en: 'The app and your guest journeys work as one.' } as L,
    items: [
      { title: { fr: 'Les commandes', en: 'Orders' }, text: { fr: 'Elles arrivent dans TriggerFlow avec leur statut, et votre catalogue est le même partout.', en: 'They arrive in TriggerFlow with their status, and your catalogue is the same everywhere.' }, href: '/produit/upsell' },
      { title: { fr: 'Le chat', en: 'Chat' }, text: { fr: 'Il arrive dans la messagerie unifiée, à côté des emails et des WhatsApp.', en: 'It lands in the unified inbox, next to emails and WhatsApp.' }, href: '/produit/inbox' },
      { title: { fr: 'Le lien magique', en: 'The magic link' }, text: { fr: 'Vos flows envoient l’app au bon moment : à la confirmation, la veille de l’arrivée, le jour J.', en: 'Your flows send the app at the right time: on confirmation, the day before arrival, on the day.' }, href: '/produit/flows' },
      { title: { fr: 'Le reste du séjour', en: 'The rest of the stay' }, text: { fr: 'Check-in en ligne, paiement et clés passent par les modules TriggerFlow.', en: 'Online check-in, payment and keys go through TriggerFlow modules.' }, href: '/produit/check-in' },
    ],
    more: { fr: 'Voir', en: 'See' } as L,
  },
  editor: {
    eyebrow: { fr: 'Facile à tenir à jour', en: 'Easy to keep up to date' } as L,
    title: { fr: 'Fini le livret imprimé qui date de l’an dernier.', en: 'No more printed welcome book from last year.' } as L,
    items: [
      { title: { fr: 'Éditeur sans code', en: 'No-code editor' }, text: { fr: 'Glisser-déposer, 37 blocs, aperçu sur téléphone en direct.', en: 'Drag and drop, 37 blocks, live phone preview.' } },
      { title: { fr: 'Pages créées par l’IA', en: 'AI-built pages' }, text: { fr: 'Décrivez la page ou donnez l’adresse de votre site : l’IA la construit, vous ajustez.', en: 'Describe the page or give your website address: AI builds it, you adjust.' } },
      { title: { fr: 'Traduction en un clic', en: 'One-click translation' }, text: { fr: 'Chaque page en 6 langues : français, anglais, espagnol, allemand, italien, portugais.', en: 'Every page in 6 languages: French, English, Spanish, German, Italian, Portuguese.' } },
      { title: { fr: 'Pour les groupes', en: 'For groups' }, text: { fr: 'Des pages partagées entre vos hôtels, et l’habillage du groupe hérité automatiquement.', en: 'Pages shared across your hotels, and the group’s look inherited automatically.' } },
    ],
  },
  brand: {
    eyebrow: { fr: 'À votre image', en: 'Your brand' } as L,
    title: { fr: 'Votre marque, votre domaine. Pas la nôtre.', en: 'Your brand, your domain. Not ours.' } as L,
    items: [
      { fr: 'Vos couleurs, vos polices, vos boutons', en: 'Your colours, fonts and buttons' },
      { fr: 'Votre nom de domaine', en: 'Your own domain name' },
      { fr: 'Aucun logo Utelys ou TriggerFlow', en: 'No Utelys or TriggerFlow logo' },
      { fr: 'Statistiques de visite sans cookies, sans bandeau de consentement', en: 'Cookieless visit statistics, no consent banner' },
    ] as L[],
  },
  quotes: [
    { text: { fr: 'Merci à toute l’équipe Utelys pour son support et son accompagnement dans l’adaptation de notre room directory.', en: 'Thanks to the whole Utelys team for their support and guidance in adapting our room directory.' } as L, name: 'Christophe Fontanaud', role: { fr: 'Directeur adjoint', en: 'Deputy Director' } as L, company: 'Saint James Paris' },
    { text: { fr: 'Une interface intuitive, accessible à tous les profils, même non technophiles. L’outil améliore clairement l’expérience client.', en: 'An intuitive interface, accessible to everyone, even the least tech-savvy. The tool clearly improves the guest experience.' } as L, name: 'El Mehdi Chellal', role: { fr: 'Responsable communication', en: 'Communications Manager' } as L, company: 'Groupe Kenzi Hotels' },
    { text: { fr: 'Un super produit pour améliorer l’expérience client. L’équipe est très pro et le produit est toujours en amélioration.', en: 'A great product to improve the guest experience. The team is very professional and the product keeps improving.' } as L, name: 'Guillaume Bizouard', role: { fr: 'Responsable Maison de Campagne', en: 'Country House Manager' } as L, company: 'Château de Villiers-le-Mahieu' },
  ],
  compare: {
    eyebrow: { fr: 'Pourquoi une webapp ?', en: 'Why a web app?' } as L,
    title: { fr: 'Ni papier, ni store.', en: 'No paper, no store.' } as L,
    criteria: { fr: 'Critère', en: 'Criterion' } as L,
    paper: { fr: 'Livret papier', en: 'Printed book' } as L,
    store: { fr: 'App à télécharger', en: 'Downloadable app' } as L,
    rows: [
      { label: { fr: 'Accès', en: 'Access' }, paper: { fr: 'Dans la chambre seulement', en: 'In the room only' }, store: { fr: 'Store, compte, mot de passe', en: 'Store, account, password' }, us: { fr: 'Un lien ou un QR code', en: 'A link or a QR code' } },
      { label: { fr: 'Mise à jour', en: 'Updates' }, paper: { fr: 'Réimpression', en: 'Reprinting' }, store: { fr: 'Nouvelle version à publier', en: 'New release to publish' }, us: { fr: 'Immédiate', en: 'Instant' } },
      { label: { fr: 'Langues', en: 'Languages' }, paper: { fr: 'Une ou deux', en: 'One or two' }, store: { fr: 'Selon le développement', en: 'Depends on development' }, us: { fr: '6, traduites en un clic', en: '6, translated in one click' } },
      { label: { fr: 'Ventes et chat', en: 'Sales and chat' }, paper: { fr: 'Non', en: 'No' }, store: { fr: 'Souvent à part', en: 'Often separate' }, us: { fr: 'Commandes et chat dans TriggerFlow', en: 'Orders and chat in TriggerFlow' } },
    ],
  },
  pricing: { fr: 'Module App client : 39 € par mois pour les clients TriggerFlow, livré clé en main en 2 semaines.', en: 'Guest app module: €39 per month for TriggerFlow customers, delivered turnkey in 2 weeks.' } as L,
  faqTitle: { fr: 'Vos questions sur l’app client.', en: 'Your questions about the guest app.' } as L,
  faq: [
    { q: { fr: 'Mes clients doivent-ils télécharger une application ?', en: 'Do guests need to download an app?' }, a: { fr: 'Non. L’app s’ouvre dans le navigateur du téléphone, depuis un lien envoyé par vos flows ou un QR code. Rien à installer, aucun compte à créer.', en: 'No. The app opens in the phone’s browser, from a link sent by your flows or a QR code. Nothing to install, no account to create.' } },
    { q: { fr: 'Est-elle vraiment à nos couleurs ?', en: 'Is it really in our colours?' }, a: { fr: 'Oui : vos couleurs, vos polices, votre nom de domaine, et aucun logo Utelys ou TriggerFlow.', en: 'Yes: your colours, your fonts, your domain name, and no Utelys or TriggerFlow logo.' } },
    { q: { fr: 'Qui crée le contenu ?', en: 'Who creates the content?' }, a: { fr: 'Nous livrons l’app clé en main en 2 semaines. Ensuite, votre équipe modifie les pages avec l’éditeur sans code, et l’IA peut créer ou traduire une page pour vous.', en: 'We deliver the app turnkey in 2 weeks. Then your team edits pages with the no-code editor, and AI can create or translate a page for you.' } },
    { q: { fr: 'Peut-on commander depuis l’app ?', en: 'Can guests order from the app?' }, a: { fr: 'Oui, depuis votre catalogue. Les commandes arrivent dans TriggerFlow avec leur statut. Le paiement passe par les liens de paiement TriggerFlow.', en: 'Yes, from your catalogue. Orders arrive in TriggerFlow with their status. Payment goes through TriggerFlow payment links.' } },
    { q: { fr: 'Dans quelles langues ?', en: 'In which languages?' }, a: { fr: 'Français, anglais, espagnol, allemand, italien et portugais, avec une traduction automatique de chaque page.', en: 'French, English, Spanish, German, Italian and Portuguese, with automatic translation of each page.' } },
    { q: { fr: 'Et pour un groupe d’hôtels ?', en: 'What about a hotel group?' }, a: { fr: 'Chaque hôtel a son app. Les pages communes sont partagées depuis le groupe, et l’habillage du groupe est hérité.', en: 'Each hotel has its own app. Common pages are shared from the group, and the group’s look is inherited.' } },
  ],
  cta: {
    title: { fr: 'Votre app client, livrée dans 2 semaines.', en: 'Your guest app, delivered in 2 weeks.' } as L,
    text: { fr: 'Une démo de 45 minutes, avec des apps d’hôtels comme le vôtre.', en: 'A 45-minute demo, with apps from hotels like yours.' } as L,
    demo: { fr: 'Demander une démo', en: 'Book a demo' } as L,
    pricing: { fr: 'Voir les tarifs', en: 'See pricing' } as L,
  },
};
