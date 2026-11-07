import type { ProductLanding } from './types';

const relFlows = { slug: 'flows', href: '/produit/flows', name: { fr: 'Flows', en: 'Flows' }, text: { fr: 'Le bon moment pour chaque action.', en: 'The right moment for every action.' } };
const relCrm = { slug: 'crm', href: '/produit/crm', name: { fr: 'CRM', en: 'CRM' }, text: { fr: 'Une fiche par client, sans doublons.', en: 'One profile per guest, no duplicates.' } };
const relInbox = { slug: 'inbox', href: '/produit/inbox', name: { fr: 'Messagerie', en: 'Inbox' }, text: { fr: 'Tous les messages au même endroit.', en: 'Every message in one place.' } };
const demoPricing = { fr: 'Le tarif vous est présenté pendant la démo.', en: 'Pricing is shown during the demo.' };

export const campaigns: ProductLanding = {
  slug: 'campaigns',
  legacySlug: 'newsletter',
  name: { fr: 'Campagnes', en: 'Campaigns' },
  seo: { title: { fr: 'Campagnes email et SMS pour hôtels | TriggerFlow', en: 'Email and SMS campaigns for hotels | TriggerFlow' }, description: { fr: 'Segments, éditeur d’emails assisté par l’IA, newsletter et statistiques : le marketing des grandes chaînes, à la taille de votre hôtel, sur des données PMS à jour.', en: 'Segments, AI-assisted email editor, newsletter and statistics: chain-grade marketing sized for your hotel, on up-to-date PMS data.' } },
  hero: { title: { fr: 'Vos anciens clients, votre meilleur canal de réservation directe.', en: 'Past guests, your best direct booking channel.' }, subtitle: { fr: 'Segments, campagnes email et SMS, newsletter : parlez à chaque client selon ce qu’il a vécu chez vous, avec des données synchronisées avec votre PMS.', en: 'Segments, email and SMS campaigns, newsletter: speak to each guest based on their stay with you, using data synced with your PMS.' }, visual: 'campaign' },
  proof: { stat: 'messages', statLabel: { fr: 'messages envoyés par nos hôtels clients', en: 'messages sent by our client hotels' }, clients: ['Urban Bivouac', 'Hôtel Causse Comtal'] },
  problem: { title: { fr: 'Votre fichier clients dort, ou part en vrac.', en: 'Your guest list sleeps, or gets blasted.' }, items: [
    { fr: 'Réimporter la base dans un outil d’emailing à chaque envoi.', en: 'Re-importing the list into an email tool for every send.' },
    { fr: 'Le même message à tout le monde, faute de segmentation simple.', en: 'The same message for everyone, for lack of simple segmentation.' },
    { fr: 'Les adresses relais des OTA polluent les envois.', en: 'OTA relay addresses pollute your sends.' } ] },
  how: { title: { fr: 'Ciblez, rédigez, envoyez, mesurez.', en: 'Target, write, send, measure.' }, steps: [
    { title: { fr: 'Construisez un segment', en: 'Build a segment' }, text: { fr: 'Langue, canal de réservation, historique, joignable hors OTA, dernière ouverture d’email…', en: 'Language, booking channel, history, reachable outside OTAs, last email open…' } },
    { title: { fr: 'Rédigez avec l’éditeur', en: 'Write in the editor' }, text: { fr: 'Modèles à votre charte, génération assistée par l’IA.', en: 'Templates in your branding, AI-assisted generation.' } },
    { title: { fr: 'Envoyez et mesurez', en: 'Send and measure' }, text: { fr: 'Email ou SMS, au bon moment, avec ouvertures, clics et réservations.', en: 'Email or SMS, at the right time, with opens, clicks and bookings.' } } ] },
  features: { title: { fr: 'Le marketing des grandes chaînes, sans l’équipe.', en: 'Chain-grade marketing, without the team.' }, items: [
    { icon: 'filter', title: { fr: 'Segments dynamiques', en: 'Dynamic segments' }, text: { fr: 'Mis à jour en continu depuis le PMS.', en: 'Continuously updated from the PMS.' } },
    { icon: 'mail', title: { fr: 'Éditeur d’emails', en: 'Email editor' }, text: { fr: 'Glisser-déposer, modèles à votre charte.', en: 'Drag and drop, templates in your branding.' } },
    { icon: 'sparkles', title: { fr: 'Génération par l’IA', en: 'AI generation' }, text: { fr: 'Une charte et des modèles créés en quelques clics.', en: 'Branding and templates created in a few clicks.' } },
    { icon: 'messageSquare', title: { fr: 'Email et SMS', en: 'Email and SMS' }, text: { fr: 'Le bon canal pour chaque campagne.', en: 'The right channel for each campaign.' } },
    { icon: 'users', title: { fr: 'Collecte de contacts', en: 'Contact collection' }, text: { fr: 'Widgets newsletter et page d’inscription, consentement RGPD tracé.', en: 'Newsletter widgets and signup page, GDPR consent recorded.' } },
    { icon: 'barChart', title: { fr: 'Statistiques', en: 'Statistics' }, text: { fr: 'Ouvertures, clics, réservations.', en: 'Opens, clicks, bookings.' } } ] },
  tailored: { title: { fr: 'Taillé pour votre hôtel.', en: 'Shaped around your hotel.' }, items: [
    { client: 'Hôtel Causse Comtal', text: { fr: 'Fini les réimports dans Brevo : la base est segmentée pour envoyer le bon message selon chaque cible.', en: 'No more re-imports into Brevo: the base is segmented to send the right message to each audience.' } },
    { client: 'Urban Bivouac', text: { fr: 'Une personnalisation très poussée des campagnes, pour une communication plus ciblée.', en: 'Deeply personalised campaigns, for more targeted communication.' } },
    { client: { fr: 'Clients OTA', en: 'OTA guests' }, text: { fr: 'Un segment « joignable hors OTA » pour ne cibler que les vraies adresses.', en: 'A “reachable outside OTAs” segment to target real addresses only.' } } ] },
  caseStudy: { quote: { fr: 'Le principal point fort réside dans la personnalisation très poussée des campagnes, qui permet d’avoir une communication plus ciblée et pertinente.', en: 'The main strength is the deep personalisation of campaigns, which makes communication more targeted and relevant.' }, name: 'Idir Mazari', role: { fr: 'Directeur', en: 'Manager' }, company: 'Urban Bivouac Paris' },
  integrations: { title: { fr: 'Des campagnes sur des données à jour.', en: 'Campaigns on up-to-date data.' }, text: { fr: 'Les segments s’appuient sur les séjours synchronisés avec votre PMS.', en: 'Segments rely on stays synced with your PMS.' } },
  reliability: { stat: 'messages', label: { fr: 'messages envoyés par nos hôtels clients', en: 'messages sent by our client hotels' } },
  related: [relCrm, { slug: 'loyalty', href: '/produit/loyalty', name: { fr: 'Fidélité', en: 'Loyalty' }, text: { fr: 'Des offres réservées aux membres.', en: 'Member-only offers.' } }, relFlows],
  pricing: { text: { fr: 'Inclus dans les plans Conversion et All Inclusive.', en: 'Included in the Conversion and All Inclusive plans.' } },
  faq: [
    { q: { fr: 'Puis-je envoyer des SMS marketing ?', en: 'Can I send marketing SMS?' }, a: { fr: 'Oui, en plus des emails, en respectant les consentements de vos clients.', en: 'Yes, alongside emails, respecting your guests’ consent.' } },
    { q: { fr: 'Comment éviter les adresses relais des OTA ?', en: 'How do I avoid OTA relay addresses?' }, a: { fr: 'Un critère de segment cible uniquement les clients joignables hors OTA.', en: 'A segment criterion targets only guests reachable outside OTAs.' } },
    { q: { fr: 'L’IA peut-elle rédiger mes emails ?', en: 'Can AI write my emails?' }, a: { fr: 'Elle génère une charte et des modèles ; vous les ajustez avant envoi.', en: 'It generates branding and templates; you adjust them before sending.' } } ],
  cta: { title: { fr: 'Réveillez votre fichier clients.', en: 'Wake up your guest list.' } },
};

export const guestApp: ProductLanding = {
  slug: 'guest-app',
  name: { fr: 'Guest App', en: 'Guest App' },
  seo: { title: { fr: 'Guest App : livret d’accueil digital hôtel | TriggerFlow', en: 'Hotel guest app: digital welcome book | TriggerFlow' }, description: { fr: 'Votre livret d’accueil digital (Utelys) : informations, services et commandes dans le téléphone du client, sans application à télécharger.', en: 'Your digital welcome book (Utelys): information, services and orders on the guest’s phone, with no app to download.' } },
  hero: { title: { fr: 'Votre livret d’accueil, dans le téléphone de vos clients.', en: 'Your welcome book, on your guests’ phones.' }, subtitle: { fr: 'Informations du séjour, services, recommandations et commandes, à vos couleurs. Un QR code ou un lien, rien à télécharger.', en: 'Stay information, services, recommendations and orders, in your branding. A QR code or a link, nothing to download.' }, visual: 'guestApp' },
  proof: { clients: ['Château Autignac', 'Le Phébus & Spa', 'Hôtel Estrimont'] },
  problem: { title: { fr: 'Le classeur en chambre, personne ne le lit.', en: 'Nobody reads the in-room binder.' }, items: [
    { fr: 'Les mêmes questions reviennent à la réception toute la journée.', en: 'The same questions reach the front desk all day.' },
    { fr: 'Le livret papier est vite obsolète et coûte à réimprimer.', en: 'The paper booklet goes out of date and costs to reprint.' },
    { fr: 'Vos services sont méconnus, donc peu vendus.', en: 'Your services go unnoticed, so they sell little.' } ] },
  how: { title: { fr: 'Prêt avant l’arrivée, utile pendant le séjour.', en: 'Ready before arrival, useful during the stay.' }, steps: [
    { title: { fr: 'Votre application est créée', en: 'Your app is built' }, text: { fr: 'À vos couleurs, avec vos services et vos recommandations.', en: 'In your branding, with your services and recommendations.' } },
    { title: { fr: 'Le lien part avant le séjour', en: 'The link goes out before the stay' }, text: { fr: 'Par un flow, puis un QR code en chambre.', en: 'Through a flow, then a QR code in the room.' } },
    { title: { fr: 'Les demandes arrivent à l’équipe', en: 'Requests reach the team' }, text: { fr: 'Commandes et demandes rattachées au client.', en: 'Orders and requests linked to the guest.' } } ] },
  features: { title: { fr: 'Tout le séjour, dans la poche.', en: 'The whole stay, in their pocket.' }, items: [
    { icon: 'layers', title: { fr: 'À vos couleurs', en: 'In your branding' }, text: { fr: 'Votre identité, votre contenu.', en: 'Your identity, your content.' } },
    { icon: 'globe', title: { fr: 'Sans téléchargement', en: 'No download' }, text: { fr: 'Une application web, accessible par lien ou QR code.', en: 'A web app, opened by link or QR code.' } },
    { icon: 'package', title: { fr: 'Commandes et demandes', en: 'Orders and requests' }, text: { fr: 'Room service, spa, demandes spéciales.', en: 'Room service, spa, special requests.' } },
    { icon: 'phone', title: { fr: 'Appel réception intégré', en: 'Built-in reception call' }, text: { fr: 'Le client appelle depuis l’application.', en: 'Guests call from the app.' } },
    { icon: 'clipboard', title: { fr: 'Formulaires', en: 'Forms' }, text: { fr: 'Enquêtes et quiz directement dans l’application.', en: 'Surveys and quizzes inside the app.' } },
    { icon: 'globe', title: { fr: 'Multilingue', en: 'Multilingual' }, text: { fr: 'Dans la langue du client.', en: 'In the guest’s language.' } } ] },
  tailored: { title: { fr: 'Taillé pour votre hôtel.', en: 'Shaped around your hotel.' }, items: [
    { client: 'Château Autignac', text: { fr: 'Le lien part avant chaque séjour ; sur place, le QR code ouvre l’application en 2 secondes.', en: 'The link goes out before every stay; on site, the QR code opens the app in 2 seconds.' } },
    { client: 'Le Phébus & Spa', text: { fr: 'Un livret d’accueil des saisonniers, pour l’équipe.', en: 'A welcome booklet for seasonal staff.' } },
    { client: 'Hôtel Estrimont', text: { fr: 'Des quiz de formation du personnel, créés avec les formulaires.', en: 'Staff training quizzes, built with forms.' } } ] },
  caseStudy: { quote: { fr: 'Avant chaque séjour, nous envoyons le lien de l’application à nos clients. Ils apprécient particulièrement d’avoir un guide de nos services et de nos recommandations. Une fois sur place, le système de QR code est très pratique : ils accèdent à l’application en 2 secondes.', en: 'Before every stay we send our guests the app link. They particularly appreciate having a guide to our services and recommendations. On site, the QR code is very handy: they open the app in 2 seconds.' }, name: 'Martine Feigel', role: { fr: 'Propriétaire', en: 'Owner' }, company: 'Château Autignac' },
  integrations: { title: { fr: 'Reliée à vos clés et à votre CRM.', en: 'Linked to your keys and your CRM.' }, text: { fr: 'Clés digitales, appel réception et commandes dans la même application.', en: 'Digital keys, reception call and orders in the same app.' }, extra: ['Utelys', 'Igloohome', 'Sesame'] },
  related: [{ slug: 'voice', href: '/produit/voice', name: { fr: 'Appel réception', en: 'Reception call' }, text: { fr: 'La fin du téléphone en chambre.', en: 'Goodbye to in-room phones.' } }, { slug: 'upsell', href: '/produit/upsell', name: { fr: 'Upsell', en: 'Upsell' }, text: { fr: 'Vos services vendus avant l’arrivée.', en: 'Your services sold before arrival.' } }, relInbox],
  pricing: { text: { fr: 'Module complémentaire, à ajouter à votre plan.', en: 'Add-on module, added to your plan.' }, addon: 'guestApp' },
  faq: [
    { q: { fr: 'Le client doit-il télécharger une application ?', en: 'Does the guest need to download an app?' }, a: { fr: 'Non, c’est une application web ouverte par lien ou QR code.', en: 'No, it is a web app opened by link or QR code.' } },
    { q: { fr: 'Qui crée le contenu ?', en: 'Who creates the content?' }, a: { fr: 'L’application est créée à vos couleurs avec vos contenus, puis vous la mettez à jour vous-même.', en: 'The app is built in your branding with your content, then you update it yourself.' } },
    { q: { fr: 'Les commandes arrivent-elles à l’équipe ?', en: 'Do orders reach the team?' }, a: { fr: 'Oui, rattachées au client dans TriggerFlow.', en: 'Yes, linked to the guest in TriggerFlow.' } } ],
  cta: { title: { fr: 'Remplacez le classeur en chambre.', en: 'Replace the in-room binder.' } },
};

export const events: ProductLanding = {
  slug: 'events',
  name: { fr: 'Événements', en: 'Events' },
  seo: { title: { fr: 'Séminaires, mariages et groupes à l’hôtel | TriggerFlow', en: 'Seminars, weddings and groups at your hotel | TriggerFlow' }, description: { fr: 'Participants, réponses, régimes alimentaires, rooming list, messages et réservations PMS : séminaires, mariages et groupes suivis au même endroit.', en: 'Attendees, RSVPs, dietary needs, rooming list, messages and PMS bookings: seminars, weddings and groups in one place.' } },
  hero: { title: { fr: 'Séminaires, mariages et groupes, suivis au même endroit.', en: 'Seminars, weddings and groups, all in one place.' }, subtitle: { fr: 'Participants, réponses, accompagnants, régimes alimentaires, rooming list et réservations PMS : fini les tableurs qui circulent par email.', en: 'Attendees, RSVPs, plus-ones, dietary needs, rooming list and PMS bookings: no more spreadsheets bouncing around by email.' }, visual: 'events' },
  proof: { clients: [] },
  problem: { title: { fr: 'Un événement, dix tableurs et cent emails.', en: 'One event, ten spreadsheets, a hundred emails.' }, items: [
    { fr: 'La liste des participants change chaque jour et personne n’a la bonne version.', en: 'The attendee list changes every day and nobody has the right version.' },
    { fr: 'Régimes alimentaires et accompagnants se perdent entre l’organisateur et la cuisine.', en: 'Dietary needs and plus-ones get lost between the organiser and the kitchen.' },
    { fr: 'Les réservations de chambres du groupe ne sont pas reliées aux participants.', en: 'Group room bookings aren’t linked to attendees.' } ] },
  how: { title: { fr: 'De la première invitation au départ.', en: 'From the first invitation to departure.' }, steps: [
    { title: { fr: 'Créez l’événement', en: 'Create the event' }, text: { fr: 'Type, dates, lieu, organisateur, programme.', en: 'Type, dates, venue, organiser, programme.' } },
    { title: { fr: 'Ajoutez les participants', en: 'Add attendees' }, text: { fr: 'À la main ou par import CSV, avec leur statut.', en: 'By hand or via CSV import, with their status.' } },
    { title: { fr: 'Communiquez et suivez', en: 'Communicate and track' }, text: { fr: 'Messages, rooming list par formulaire, réservations PMS rattachées.', en: 'Messages, rooming list by form, linked PMS bookings.' } } ] },
  features: { title: { fr: 'Tout l’événement, une seule page.', en: 'The whole event, one page.' }, items: [
    { icon: 'users', title: { fr: 'Participants et statuts', en: 'Attendees and statuses' }, text: { fr: 'Invités, confirmés, déclinés, présents.', en: 'Invited, confirmed, declined, present.' } },
    { icon: 'clipboard', title: { fr: 'Régimes et accompagnants', en: 'Diets and plus-ones' }, text: { fr: 'Végétarien, allergies, mineurs, nombre d’accompagnants.', en: 'Vegetarian, allergies, minors, number of plus-ones.' } },
    { icon: 'bed', title: { fr: 'Rooming list', en: 'Rooming list' }, text: { fr: 'Collectée par formulaire.', en: 'Collected by form.' } },
    { icon: 'mail', title: { fr: 'Messages ponctuels', en: 'One-off messages' }, text: { fr: 'À tous les participants ou à une partie.', en: 'To all attendees or some of them.' } },
    { icon: 'link', title: { fr: 'Réservations PMS', en: 'PMS bookings' }, text: { fr: 'Les chambres du groupe rattachées à l’événement.', en: 'Group rooms linked to the event.' } },
    { icon: 'shield', title: { fr: 'Données supprimées après', en: 'Data deleted afterwards' }, text: { fr: 'Conservation limitée après l’événement (RGPD).', en: 'Limited retention after the event (GDPR).' } } ] },
  tailored: { title: { fr: 'Pour tous vos événements.', en: 'For all your events.' }, items: [
    { client: { fr: 'Mariage', en: 'Wedding' }, text: { fr: 'Les invités confirment, indiquent leur régime et leurs accompagnants.', en: 'Guests confirm and share their diet and plus-ones.' } },
    { client: { fr: 'Séminaire', en: 'Seminar' }, text: { fr: 'Programme, rooming list et message de bienvenue aux participants.', en: 'Programme, rooming list and welcome message for attendees.' } },
    { client: { fr: 'Groupe', en: 'Group' }, text: { fr: 'Les réservations PMS du groupe reliées à chaque participant.', en: 'The group’s PMS bookings linked to each attendee.' } } ] },
  integrations: { title: { fr: 'Relié aux réservations de votre PMS.', en: 'Linked to your PMS bookings.' }, text: { fr: 'Les chambres du groupe remontent du PMS et se rattachent aux participants.', en: 'Group rooms come from the PMS and link to attendees.' } },
  related: [{ slug: 'b2b', href: '/produit/b2b', name: { fr: 'B2B', en: 'B2B' }, text: { fr: 'Les entreprises qui organisent vos séminaires.', en: 'The companies behind your seminars.' } }, { slug: 'forms', href: '/produit/forms', name: { fr: 'Formulaires', en: 'Forms' }, text: { fr: 'La rooming list collectée par formulaire.', en: 'The rooming list collected by form.' } }, { slug: 'pay', href: '/produit/pay', name: { fr: 'Pay', en: 'Pay' }, text: { fr: 'Des acomptes pour chaque participant.', en: 'Deposits for each attendee.' } }],
  pricing: { text: { fr: 'Module inclus gratuitement.', en: 'Module included for free.' } },
  faq: [
    { q: { fr: 'Puis-je importer une liste de participants ?', en: 'Can I import an attendee list?' }, a: { fr: 'Oui, par fichier CSV, et l’exporter aussi.', en: 'Yes, via CSV, and export it too.' } },
    { q: { fr: 'Comment collecter la rooming list ?', en: 'How do I collect the rooming list?' }, a: { fr: 'Par un formulaire associé à l’événement, envoyé aux participants.', en: 'Through a form linked to the event, sent to attendees.' } },
    { q: { fr: 'Que deviennent les données après l’événement ?', en: 'What happens to the data afterwards?' }, a: { fr: 'Elles sont supprimées après une durée de conservation définie.', en: 'They are deleted after a defined retention period.' } } ],
  cta: { title: { fr: 'Votre prochain séminaire, sans tableur.', en: 'Your next seminar, without a spreadsheet.' } },
};

export const b2b: ProductLanding = {
  slug: 'b2b',
  name: { fr: 'B2B', en: 'B2B' },
  seo: { title: { fr: 'CRM B2B hôtel : comptes sociétés et agences | TriggerFlow', en: 'Hotel B2B CRM: company and agency accounts | TriggerFlow' }, description: { fr: 'Entreprises clientes, agences et apporteurs d’affaires sur une fiche unique, détectés automatiquement, avec leurs séjours et les prochaines actions.', en: 'Corporate clients, agencies and referrers on a single profile, detected automatically, with their stays and next actions.' } },
  hero: { title: { fr: 'Vos clients entreprises, suivis comme des comptes.', en: 'Your corporate clients, managed as accounts.' }, subtitle: { fr: 'Entreprises, agences et apporteurs d’affaires sur une fiche unique, avec leurs collaborateurs, leurs séjours et les prochaines actions. Détectés automatiquement.', en: 'Companies, agencies and referrers on a single profile, with their staff, stays and next actions. Detected automatically.' }, visual: 'b2b' },
  proof: { clients: [] },
  problem: { title: { fr: 'La clientèle affaires se perd dans les fiches individuelles.', en: 'Business guests get lost among individual profiles.' }, items: [
    { fr: 'Impossible de voir combien de nuits une entreprise représente.', en: 'Impossible to see how many nights a company brings.' },
    { fr: 'Les relances commerciales dépendent de la mémoire de chacun.', en: 'Sales follow-ups depend on everyone’s memory.' },
    { fr: 'Agences et apporteurs d’affaires ne sont suivis nulle part.', en: 'Agencies and referrers are tracked nowhere.' } ] },
  how: { title: { fr: 'Une fiche société, construite toute seule.', en: 'A company profile, built on its own.' }, steps: [
    { title: { fr: 'Détection automatique', en: 'Automatic detection' }, text: { fr: 'Les sociétés sont repérées à partir des réservations.', en: 'Companies are spotted from bookings.' } },
    { title: { fr: 'Collaborateurs regroupés', en: 'Staff grouped' }, text: { fr: 'Chaque séjour rattaché à sa société.', en: 'Every stay linked to its company.' } },
    { title: { fr: 'Prochaines actions', en: 'Next actions' }, text: { fr: 'Relances et rendez-vous suivis par compte.', en: 'Follow-ups and meetings tracked per account.' } } ] },
  features: { title: { fr: 'Le CRM de votre clientèle affaires.', en: 'The CRM for your business clientele.' }, items: [
    { icon: 'layers', title: { fr: 'Sociétés et groupes', en: 'Companies and groups' }, text: { fr: 'Entreprises, filiales, agences.', en: 'Companies, subsidiaries, agencies.' } },
    { icon: 'sparkles', title: { fr: 'Détection automatique', en: 'Automatic detection' }, text: { fr: 'Les sociétés repérées dans les réservations.', en: 'Companies spotted in bookings.' } },
    { icon: 'users', title: { fr: 'Collaborateurs', en: 'Staff' }, text: { fr: 'Les clients rattachés à leur entreprise.', en: 'Guests linked to their company.' } },
    { icon: 'bell', title: { fr: 'Prochaines actions', en: 'Next actions' }, text: { fr: 'Ne ratez plus une relance.', en: 'Never miss a follow-up.' } },
    { icon: 'filter', title: { fr: 'Segments B2B', en: 'B2B segments' }, text: { fr: 'Campagnes dédiées à la clientèle affaires.', en: 'Campaigns for business guests.' } },
    { icon: 'calendar', title: { fr: 'Lien avec les événements', en: 'Linked to events' }, text: { fr: 'Les séminaires rattachés au compte.', en: 'Seminars linked to the account.' } } ] },
  tailored: { title: { fr: 'Pour votre clientèle affaires.', en: 'For your business clientele.' }, items: [
    { client: { fr: 'Hôtel d’affaires', en: 'Business hotel' }, text: { fr: 'Les comptes qui génèrent le plus de nuits, en un coup d’œil.', en: 'The accounts bringing the most nights, at a glance.' } },
    { client: { fr: 'Agences', en: 'Agencies' }, text: { fr: 'Agences et apporteurs d’affaires suivis comme des comptes.', en: 'Agencies and referrers tracked as accounts.' } },
    { client: { fr: 'Séminaires', en: 'Seminars' }, text: { fr: 'L’entreprise, ses événements et ses collaborateurs reliés.', en: 'The company, its events and its staff connected.' } } ] },
  integrations: { title: { fr: 'Construit à partir de vos réservations.', en: 'Built from your bookings.' }, text: { fr: 'Les sociétés sont détectées dans les réservations synchronisées avec le PMS.', en: 'Companies are detected in bookings synced with the PMS.' } },
  related: [relCrm, { slug: 'events', href: '/produit/events', name: { fr: 'Événements', en: 'Events' }, text: { fr: 'Séminaires et groupes.', en: 'Seminars and groups.' } }, { slug: 'campaigns', href: '/produit/campaigns', name: { fr: 'Campagnes', en: 'Campaigns' }, text: { fr: 'Des campagnes pour vos comptes.', en: 'Campaigns for your accounts.' } }],
  pricing: { text: { fr: 'Module inclus gratuitement.', en: 'Module included for free.' } },
  faq: [
    { q: { fr: 'Comment les sociétés sont-elles détectées ?', en: 'How are companies detected?' }, a: { fr: 'À partir des informations des réservations ; vous validez ou corrigez.', en: 'From booking information; you confirm or correct.' } },
    { q: { fr: 'Puis-je suivre des agences ?', en: 'Can I track agencies?' }, a: { fr: 'Oui, agences et apporteurs d’affaires ont aussi leur fiche.', en: 'Yes, agencies and referrers have their own profile too.' } },
    { q: { fr: 'Est-ce payant ?', en: 'Is it paid?' }, a: { fr: 'Non, le module Sociétés est inclus gratuitement.', en: 'No, the Companies module is included for free.' } } ],
  cta: { title: { fr: 'Suivez vos comptes entreprises.', en: 'Track your corporate accounts.' } },
};

export const checkin: ProductLanding = {
  slug: 'check-in',
  name: { fr: 'Check-in en ligne', en: 'Online check-in' },
  seo: { title: { fr: 'Check-in en ligne pour hôtels | TriggerFlow', en: 'Hotel online check-in with ID scanning | TriggerFlow' }, description: { fr: 'Le client s’enregistre avant d’arriver, sa pièce d’identité est lue automatiquement et les données repartent dans le PMS. La réception accueille au lieu de saisir.', en: 'Guests check in before arriving, their ID is read automatically and data flows back to the PMS. The front desk welcomes instead of typing.' } },
  hero: { title: { fr: 'Le client arrive enregistré. La réception accueille.', en: 'Guests arrive checked in. The front desk welcomes.' }, subtitle: { fr: 'Le formulaire de check-in part avant l’arrivée, la pièce d’identité est lue automatiquement, les informations repartent dans le PMS. Plus de file au comptoir.', en: 'The check-in form goes out before arrival, the ID is read automatically, the information flows back to the PMS. No more queue at the desk.' }, visual: 'checkin' },
  proof: { clients: [] },
  problem: { title: { fr: 'L’arrivée se passe à recopier des papiers.', en: 'Arrival is spent copying paperwork.' }, items: [
    { fr: 'Fiches de police remplies à la main, aux heures de pointe.', en: 'Police forms filled in by hand, at peak times.' },
    { fr: 'Des erreurs de saisie dans le PMS.', en: 'Typing errors in the PMS.' },
    { fr: 'Le premier moment du séjour est une file d’attente.', en: 'The first moment of the stay is a queue.' } ] },
  how: { title: { fr: 'Trois étapes avant même d’arriver.', en: 'Three steps before even arriving.' }, steps: [
    { title: { fr: 'Le lien part avant l’arrivée', en: 'The link goes out before arrival' }, text: { fr: 'Par un flow, quelques jours avant.', en: 'Through a flow, a few days before.' } },
    { title: { fr: 'Pièce d’identité lue', en: 'ID read' }, text: { fr: 'Les champs se remplissent automatiquement.', en: 'Fields fill in automatically.' } },
    { title: { fr: 'Données dans le PMS', en: 'Data in the PMS' }, text: { fr: 'L’équipe retrouve tout, sans saisie.', en: 'The team finds everything, without typing.' } } ] },
  features: { title: { fr: 'Un check-in complet, sans comptoir.', en: 'A complete check-in, without the desk.' }, items: [
    { icon: 'clipboard', title: { fr: 'Formulaire à vos questions', en: 'Your questions' }, text: { fr: 'Heure d’arrivée, préférences, demandes.', en: 'Arrival time, preferences, requests.' } },
    { icon: 'shield', title: { fr: 'Lecture de pièce d’identité', en: 'ID reading' }, text: { fr: 'Les informations extraites automatiquement.', en: 'Information extracted automatically.' } },
    { icon: 'package', title: { fr: 'Offres au check-in', en: 'Offers at check-in' }, text: { fr: 'Surclassement ou petit-déjeuner proposés au passage.', en: 'Upgrade or breakfast offered along the way.' } },
    { icon: 'refresh', title: { fr: 'Renvoyé au PMS', en: 'Sent to the PMS' }, text: { fr: 'Plus de double saisie.', en: 'No double entry.' } },
    { icon: 'clipboard', title: { fr: 'Mode borne', en: 'Kiosk mode' }, text: { fr: 'Sur une tablette, pour ceux qui ne l’ont pas fait.', en: 'On a tablet, for those who didn’t.' } },
    { icon: 'globe', title: { fr: 'Multilingue', en: 'Multilingual' }, text: { fr: 'Dans la langue du client.', en: 'In the guest’s language.' } } ] },
  tailored: { title: { fr: 'Selon votre arrivée.', en: 'Around your arrival process.' }, items: [
    { client: { fr: 'Arrivée autonome', en: 'Self check-in' }, text: { fr: 'Check-in fait, clé digitale envoyée : le client monte directement.', en: 'Check-in done, digital key sent: the guest goes straight up.' } },
    { client: { fr: 'Réception classique', en: 'Classic front desk' }, text: { fr: 'Les informations sont prêtes, l’accueil prend une minute.', en: 'Information is ready, welcome takes a minute.' } },
    { client: { fr: 'Upsell', en: 'Upsell' }, text: { fr: 'Le formulaire propose le surclassement disponible.', en: 'The form offers the available upgrade.' } } ] },
  integrations: { title: { fr: 'Vos données d’arrivée, dans le PMS.', en: 'Arrival data, in your PMS.' }, text: { fr: 'Les informations du check-in repartent dans le PMS connecté.', en: 'Check-in information flows back to the connected PMS.' } },
  related: [{ slug: 'keys', href: '/produit/keys', name: { fr: 'Clés digitales', en: 'Digital keys' }, text: { fr: 'La clé envoyée par message.', en: 'The key sent by message.' } }, { slug: 'forms', href: '/produit/forms', name: { fr: 'Formulaires', en: 'Forms' }, text: { fr: 'Les questions de votre choix.', en: 'The questions you choose.' } }, { slug: 'upsell', href: '/produit/upsell', name: { fr: 'Upsell', en: 'Upsell' }, text: { fr: 'Vendez au moment du check-in.', en: 'Sell at check-in.' } }],
  pricing: { text: demoPricing },
  faq: [
    { q: { fr: 'La pièce d’identité est-elle lue automatiquement ?', en: 'Is the ID read automatically?' }, a: { fr: 'Oui, les informations sont extraites puis vérifiables par le client.', en: 'Yes, the information is extracted and can be checked by the guest.' } },
    { q: { fr: 'Les données vont-elles dans le PMS ?', en: 'Does the data go to the PMS?' }, a: { fr: 'Oui, avec les PMS connectés.', en: 'Yes, with connected PMS.' } },
    { q: { fr: 'Et si le client ne l’a pas fait ?', en: 'What if the guest didn’t do it?' }, a: { fr: 'Il peut le faire sur une tablette en mode borne à la réception.', en: 'They can do it on a kiosk-mode tablet at reception.' } } ],
  cta: { title: { fr: 'Supprimez la file au comptoir.', en: 'Get rid of the desk queue.' } },
};

export const housekeeping: ProductLanding = {
  slug: 'housekeeping',
  name: { fr: 'Ménage', en: 'Housekeeping' },
  seo: { title: { fr: 'Logiciel housekeeping hôtel : ménage en temps réel | TriggerFlow', en: 'Hotel housekeeping software: real-time cleaning | TriggerFlow' }, description: { fr: 'Statut des chambres, planning des équipes, objets trouvés et incidents techniques sur mobile, avec les statuts renvoyés au PMS.', en: 'Room status, staff planning, lost and found and maintenance issues on mobile, with statuses sent back to the PMS.' } },
  hero: { title: { fr: 'Le ménage piloté en temps réel, depuis le téléphone des équipes.', en: 'Housekeeping run in real time, from your team’s phones.' }, subtitle: { fr: 'Statut des chambres, assignation, objets trouvés et incidents techniques : la réception sait quelle chambre est prête, et le PMS aussi.', en: 'Room status, assignment, lost and found and maintenance issues: the front desk knows which room is ready, and so does the PMS.' }, visual: 'housekeeping' },
  proof: { clients: [] },
  problem: { title: { fr: '« La 204 est prête ? » Dix fois par jour.', en: '“Is 204 ready?” Ten times a day.' }, items: [
    { fr: 'Les statuts de chambres passent par le talkie-walkie ou une feuille.', en: 'Room statuses go via walkie-talkie or a sheet of paper.' },
    { fr: 'Le PMS n’est mis à jour que plus tard.', en: 'The PMS is only updated later.' },
    { fr: 'Objets trouvés et pannes se perdent entre deux équipes.', en: 'Lost items and faults get lost between shifts.' } ] },
  how: { title: { fr: 'Du planning à la chambre prête.', en: 'From planning to a ready room.' }, steps: [
    { title: { fr: 'Planifiez', en: 'Plan' }, text: { fr: 'Chambres assignées à chaque membre de l’équipe.', en: 'Rooms assigned to each team member.' } },
    { title: { fr: 'L’équipe met à jour sur mobile', en: 'The team updates on mobile' }, text: { fr: 'En cours, propre, à vérifier.', en: 'In progress, clean, to inspect.' } },
    { title: { fr: 'La réception et le PMS savent', en: 'Front desk and PMS know' }, text: { fr: 'Statuts renvoyés au PMS en temps réel.', en: 'Statuses sent to the PMS in real time.' } } ] },
  features: { title: { fr: 'Tout ce qu’il faut à vos équipes d’étage.', en: 'Everything your floor teams need.' }, items: [
    { icon: 'bed', title: { fr: 'Statut des chambres', en: 'Room status' }, text: { fr: 'Vue d’ensemble en temps réel.', en: 'Real-time overview.' } },
    { icon: 'users', title: { fr: 'Planning et assignation', en: 'Planning and assignment' }, text: { fr: 'Qui fait quelle chambre, quand.', en: 'Who does which room, when.' } },
    { icon: 'phone', title: { fr: 'Application mobile', en: 'Mobile app' }, text: { fr: 'Pensée pour les équipes d’étage.', en: 'Designed for floor teams.' } },
    { icon: 'package', title: { fr: 'Objets trouvés', en: 'Lost and found' }, text: { fr: 'Enregistrés et rattachés au client.', en: 'Logged and linked to the guest.' } },
    { icon: 'bell', title: { fr: 'Incidents techniques', en: 'Maintenance issues' }, text: { fr: 'Signalés depuis la chambre.', en: 'Reported from the room.' } },
    { icon: 'refresh', title: { fr: 'Renvoyé au PMS', en: 'Sent to the PMS' }, text: { fr: 'Les statuts mis à jour sans saisie.', en: 'Statuses updated with no typing.' } } ] },
  tailored: { title: { fr: 'Selon votre organisation.', en: 'Around your organisation.' }, items: [
    { client: { fr: 'Petite équipe', en: 'Small team' }, text: { fr: 'Une seule personne voit et met à jour toutes les chambres.', en: 'One person sees and updates every room.' } },
    { client: { fr: 'Gouvernante', en: 'Head housekeeper' }, text: { fr: 'Contrôle des chambres avant de les passer « prêtes ».', en: 'Room inspection before marking them “ready”.' } },
    { client: { fr: 'Arrivées anticipées', en: 'Early arrivals' }, text: { fr: 'La réception voit tout de suite quand la chambre se libère.', en: 'The front desk sees immediately when the room is free.' } } ] },
  integrations: { title: { fr: 'Statuts synchronisés avec le PMS.', en: 'Statuses synced with the PMS.' }, text: { fr: 'Les statuts de ménage repartent dans le PMS connecté.', en: 'Housekeeping statuses flow back to the connected PMS.' } },
  related: [relInbox, { slug: 'check-in', href: '/produit/check-in', name: { fr: 'Check-in en ligne', en: 'Online check-in' }, text: { fr: 'Le client arrive enregistré.', en: 'Guests arrive checked in.' } }, relCrm],
  pricing: { text: { fr: 'Module complémentaire : 29 € par mois et par établissement, HT.', en: 'Add-on module: €29 per month per property, excl. VAT.' } },
  faq: [
    { q: { fr: 'Faut-il un appareil particulier ?', en: 'Is special hardware needed?' }, a: { fr: 'Non, l’application fonctionne sur le téléphone des équipes.', en: 'No, the app runs on the team’s phones.' } },
    { q: { fr: 'Les statuts vont-ils dans le PMS ?', en: 'Do statuses go to the PMS?' }, a: { fr: 'Oui, avec les PMS connectés.', en: 'Yes, with connected PMS.' } },
    { q: { fr: 'Peut-on signaler une panne ?', en: 'Can staff report a fault?' }, a: { fr: 'Oui, les incidents techniques se signalent depuis la chambre.', en: 'Yes, maintenance issues are reported from the room.' } } ],
  cta: { title: { fr: 'Sachez quelle chambre est prête, tout de suite.', en: 'Know which room is ready, right away.' } },
};

export const keys: ProductLanding = {
  slug: 'keys',
  name: { fr: 'Clés digitales', en: 'Digital keys' },
  seo: { title: { fr: 'Clé digitale hôtel : la clé envoyée par message | TriggerFlow', en: 'Hotel digital key: the key sent by message | TriggerFlow' }, description: { fr: 'La clé de la chambre envoyée par message au bon moment du parcours, compatible Igloohome et Sesame, avec le bouton « Appeler la réception » sur la page de la serrure.', en: 'The room key sent by message at the right moment, compatible with Igloohome and Sesame, with a “Call the front desk” button on the lock page.' } },
  hero: { title: { fr: 'La clé de la chambre, envoyée par message.', en: 'The room key, sent by message.' }, subtitle: { fr: 'La clé part automatiquement au bon moment du parcours. Le client ouvre sa porte depuis son téléphone, même tard le soir.', en: 'The key goes out automatically at the right moment. The guest opens their door from their phone, even late at night.' }, visual: 'keys' },
  proof: { clients: [] },
  problem: { title: { fr: 'Une arrivée tardive ne devrait pas bloquer la réception.', en: 'A late arrival shouldn’t tie up the front desk.' }, items: [
    { fr: 'Boîtes à clés et codes partagés à la main.', en: 'Key boxes and codes shared by hand.' },
    { fr: 'Quelqu’un doit rester pour les arrivées tardives.', en: 'Someone has to stay for late arrivals.' },
    { fr: 'Clés perdues ou non rendues.', en: 'Keys lost or not returned.' } ] },
  how: { title: { fr: 'Automatique, du début à la fin.', en: 'Automatic, end to end.' }, steps: [
    { title: { fr: 'Votre serrure est connectée', en: 'Your lock is connected' }, text: { fr: 'Igloohome ou Sesame ; Salto en cours.', en: 'Igloohome or Sesame; Salto in progress.' } },
    { title: { fr: 'La clé part au bon moment', en: 'The key goes out on time' }, text: { fr: 'Par un flow, le jour de l’arrivée.', en: 'Through a flow, on arrival day.' } },
    { title: { fr: 'Le client ouvre sa porte', en: 'The guest opens their door' }, text: { fr: 'Depuis son téléphone, avec l’appel réception à portée.', en: 'From their phone, with reception one tap away.' } } ] },
  features: { title: { fr: 'L’arrivée autonome, simplement.', en: 'Self check-in, simply.' }, items: [
    { icon: 'lock', title: { fr: 'Serrures connectées', en: 'Connected locks' }, text: { fr: 'Igloohome, Sesame ; Salto en cours.', en: 'Igloohome, Sesame; Salto in progress.' } },
    { icon: 'clock', title: { fr: 'Envoi automatique', en: 'Automatic sending' }, text: { fr: 'Au bon moment du parcours.', en: 'At the right moment of the journey.' } },
    { icon: 'phone', title: { fr: 'Appel réception', en: 'Reception call' }, text: { fr: 'Sur la page de la serrure.', en: 'On the lock page.' } },
    { icon: 'messageSquare', title: { fr: 'Par email, SMS ou WhatsApp', en: 'By email, SMS or WhatsApp' }, text: { fr: 'Le canal préféré du client.', en: 'The guest’s preferred channel.' } },
    { icon: 'users', title: { fr: 'Rattaché au séjour', en: 'Linked to the stay' }, text: { fr: 'La clé suit les dates de la réservation.', en: 'The key follows the booking dates.' } },
    { icon: 'moon', title: { fr: 'Arrivées tardives', en: 'Late arrivals' }, text: { fr: 'Plus besoin d’attendre le client.', en: 'No need to wait up for the guest.' } } ] },
  tailored: { title: { fr: 'Selon vos arrivées.', en: 'Around your arrivals.' }, items: [
    { client: { fr: 'Sans réception de nuit', en: 'No night desk' }, text: { fr: 'Check-in en ligne, puis clé envoyée : le client entre seul.', en: 'Online check-in, then key sent: the guest lets themselves in.' } },
    { client: { fr: 'Résidence', en: 'Residence' }, text: { fr: 'Des accès envoyés pour toute la durée du séjour.', en: 'Access sent for the whole stay.' } },
    { client: { fr: 'Besoin d’aide', en: 'Need help' }, text: { fr: 'Le bouton d’appel réception sur la page de la serrure.', en: 'The reception call button on the lock page.' } } ] },
  integrations: { title: { fr: 'Vos serrures, votre PMS.', en: 'Your locks, your PMS.' }, text: { fr: 'Les dates de séjour viennent du PMS, la clé de votre serrure connectée.', en: 'Stay dates come from the PMS, the key from your connected lock.' }, extra: ['Igloohome', 'Sesame'] },
  related: [{ slug: 'check-in', href: '/produit/check-in', name: { fr: 'Check-in en ligne', en: 'Online check-in' }, text: { fr: 'Enregistré avant d’arriver.', en: 'Checked in before arriving.' } }, { slug: 'voice', href: '/produit/voice', name: { fr: 'Appel réception', en: 'Reception call' }, text: { fr: 'La réception à portée de main.', en: 'Reception one tap away.' } }, relFlows],
  pricing: { text: demoPricing },
  faq: [
    { q: { fr: 'Quelles serrures sont compatibles ?', en: 'Which locks are compatible?' }, a: { fr: 'Igloohome et Sesame ; la connexion Salto est en cours.', en: 'Igloohome and Sesame; the Salto connection is in progress.' } },
    { q: { fr: 'Quand la clé est-elle envoyée ?', en: 'When is the key sent?' }, a: { fr: 'Au moment que vous choisissez dans un flow, en général le jour de l’arrivée.', en: 'When you choose in a flow, usually on arrival day.' } },
    { q: { fr: 'Et si le client a un problème ?', en: 'What if the guest has a problem?' }, a: { fr: 'Il appelle la réception depuis la page de la serrure.', en: 'They call the front desk from the lock page.' } } ],
  cta: { title: { fr: 'Laissez vos clients entrer seuls, en confiance.', en: 'Let guests let themselves in, with confidence.' } },
};

export const analytics: ProductLanding = {
  slug: 'analytics',
  name: { fr: 'Statistiques', en: 'Analytics' },
  seo: { title: { fr: 'Statistiques hôtel : relation client et ventes | TriggerFlow', en: 'Hotel analytics: guest relations and sales | TriggerFlow' }, description: { fr: 'Tableaux de bord de la relation client : communications, ventes additionnelles, satisfaction, vue groupe et rapports partageables.', en: 'Guest relationship dashboards: communications, additional sales, satisfaction, group view and shareable reports.' } },
  hero: { title: { fr: 'Les chiffres de votre relation client, sans tableur.', en: 'Your guest relationship numbers, without a spreadsheet.' }, subtitle: { fr: 'Communications, ventes additionnelles, satisfaction et clientèle : vos tableaux de bord se mettent à jour seuls, pour un hôtel ou tout un groupe.', en: 'Communications, additional sales, satisfaction and clientele: your dashboards update themselves, for one hotel or a whole group.' }, visual: 'analytics' },
  proof: { clients: [] },
  problem: { title: { fr: 'Les chiffres existent, mais personne ne les voit.', en: 'The numbers exist, but nobody sees them.' }, items: [
    { fr: 'Les données sont éparpillées entre le PMS, l’emailing et les avis.', en: 'Data is scattered across the PMS, email tool and reviews.' },
    { fr: 'Le reporting mensuel prend une demi-journée.', en: 'Monthly reporting takes half a day.' },
    { fr: 'Impossible de comparer les établissements d’un groupe.', en: 'Impossible to compare properties in a group.' } ] },
  how: { title: { fr: 'Des tableaux de bord prêts.', en: 'Ready-made dashboards.' }, steps: [
    { title: { fr: 'Les données se rassemblent', en: 'Data comes together' }, text: { fr: 'PMS, communications, ventes, avis.', en: 'PMS, communications, sales, reviews.' } },
    { title: { fr: 'Les tableaux se mettent à jour', en: 'Dashboards update' }, text: { fr: 'Clients, communication, revenus, réputation.', en: 'Guests, communication, revenue, reputation.' } },
    { title: { fr: 'Vous partagez', en: 'You share' }, text: { fr: 'Rapports partageables avec la direction.', en: 'Shareable reports for management.' } } ] },
  features: { title: { fr: 'Ce qui compte, au même endroit.', en: 'What matters, in one place.' }, items: [
    { icon: 'barChart', title: { fr: 'Tableau de bord', en: 'Dashboard' }, text: { fr: 'Arrivées, clients sur place, communications.', en: 'Arrivals, in-house guests, communications.' } },
    { icon: 'mail', title: { fr: 'Communication', en: 'Communication' }, text: { fr: 'Envois, ouvertures, clics par canal.', en: 'Sends, opens, clicks by channel.' } },
    { icon: 'package', title: { fr: 'Revenus', en: 'Revenue' }, text: { fr: 'Ventes additionnelles et panier moyen.', en: 'Additional sales and average basket.' } },
    { icon: 'sparkles', title: { fr: 'Réputation', en: 'Reputation' }, text: { fr: 'Notes et avis dans le temps.', en: 'Scores and reviews over time.' } },
    { icon: 'layers', title: { fr: 'Vue groupe', en: 'Group view' }, text: { fr: 'Comparez vos établissements.', en: 'Compare your properties.' } },
    { icon: 'link', title: { fr: 'Rapports partageables', en: 'Shareable reports' }, text: { fr: 'Envoyez une vue à la direction.', en: 'Send a view to management.' } } ] },
  tailored: { title: { fr: 'Selon votre rôle.', en: 'Depending on your role.' }, items: [
    { client: { fr: 'Direction', en: 'Management' }, text: { fr: 'Les indicateurs clés en un coup d’œil.', en: 'Key indicators at a glance.' } },
    { client: { fr: 'Revenue', en: 'Revenue' }, text: { fr: 'Ventes additionnelles et distribution.', en: 'Additional sales and distribution.' } },
    { client: { fr: 'Groupe', en: 'Group' }, text: { fr: 'Les établissements comparés sur les mêmes indicateurs.', en: 'Properties compared on the same indicators.' } } ] },
  integrations: { title: { fr: 'Alimenté par vos outils.', en: 'Fed by your tools.' }, text: { fr: 'PMS, communications, ventes et avis réunis automatiquement.', en: 'PMS, communications, sales and reviews brought together automatically.' } },
  related: [relCrm, { slug: 'campaigns', href: '/produit/campaigns', name: { fr: 'Campagnes', en: 'Campaigns' }, text: { fr: 'Mesurez chaque campagne.', en: 'Measure every campaign.' } }, { slug: 'upsell', href: '/produit/upsell', name: { fr: 'Upsell', en: 'Upsell' }, text: { fr: 'Suivez vos ventes additionnelles.', en: 'Track additional sales.' } }],
  pricing: { text: { fr: 'Inclus dans tous les plans.', en: 'Included in every plan.' } },
  faq: [
    { q: { fr: 'D’où viennent les données ?', en: 'Where does the data come from?' }, a: { fr: 'Du PMS, des communications, des ventes et des avis gérés dans TriggerFlow.', en: 'From the PMS, communications, sales and reviews managed in TriggerFlow.' } },
    { q: { fr: 'Puis-je comparer plusieurs hôtels ?', en: 'Can I compare several hotels?' }, a: { fr: 'Oui, avec la vue groupe.', en: 'Yes, with the group view.' } },
    { q: { fr: 'Puis-je partager un rapport ?', en: 'Can I share a report?' }, a: { fr: 'Oui, des vues partageables sont disponibles.', en: 'Yes, shareable views are available.' } } ],
  cta: { title: { fr: 'Pilotez votre relation client avec des chiffres.', en: 'Run your guest relationship with numbers.' } },
};
