/**
 * Landings B2B (comptes sociétés + pipeline) et Événements (FR/EN). Audit origin/main du 09/11/2026 : module
 * « Commercial » (sociétés, pipeline, événements). Prix affiché : 29 €/mois (décision Soufiane), alors que l'aide
 * de l'app dit le module gratuit : à harmoniser.
 * Ne PAS affirmer : tarifs négociés/contrats, devis PDF ou signature, salles/espaces, banquets (BEO), calendrier
 * d'événements, gestion d'allotements, reporting de pipeline (taux de conversion, prévisions), pipeline groupe.
 */
import type { DedicatedLandingContent } from '@/components/product/DedicatedLanding';

type Seo = { seo: { title: { fr: string; en: string }; description: { fr: string; en: string } } };
const PRICING = { fr: 'Module B2B : comptes sociétés, pipeline et événements, 29 € par mois.', en: 'B2B module: company accounts, pipeline and events, €29 per month.' };

export const b2bLanding: DedicatedLandingContent & Seo = {
  seo: {
    title: { fr: 'CRM B2B hôtel : sociétés, agences et pipeline | TriggerFlow', en: 'Hotel B2B CRM: companies, agencies and pipeline | TriggerFlow' },
    description: {
      fr: 'Sociétés et agences détectées dans vos réservations, chiffre d’affaires par compte, pipeline commercial et relances : votre activité B2B, pilotée depuis votre CRM hôtelier.',
      en: 'Companies and agencies detected in your bookings, revenue per account, sales pipeline and reminders: your B2B business, run from your hotel CRM.',
    },
  },
  hero: {
    eyebrow: { fr: 'B2B', en: 'B2B' },
    title: { fr: 'Vos clients entreprises, suivis comme des comptes.', en: 'Your corporate clients, managed as accounts.' },
    subtitle: {
      fr: 'Entreprises, agences et apporteurs d’affaires sont détectés dans vos réservations. Vous voyez ce que chacun rapporte, vous suivez vos affaires en cours, et rien ne s’oublie.',
      en: 'Companies, agencies and referrers are detected in your bookings. You see what each one brings in, you track your open deals, and nothing gets forgotten.',
    },
    bullets: [
      { fr: 'Les sociétés retrouvées dans vos données, sans saisie', en: 'Companies found in your data, no typing' },
      { fr: 'Chiffre d’affaires, nuitées et réservations par compte', en: 'Revenue, room nights and bookings per account' },
      { fr: 'Un pipeline pour vos séminaires, mariages et groupes', en: 'A pipeline for your seminars, weddings and groups' },
    ],
    image: { src: '/images/app/b2b-pipeline.webp', width: 1448, height: 820, label: 'app.trigger-flow.com/commercial', alt: { fr: 'Pipeline commercial TriggerFlow : affaires par étape, montants et prochaines actions', en: 'TriggerFlow sales pipeline: deals by stage, amounts and next actions' }, caption: { fr: 'Capture de l’application, compte de démonstration', en: 'App screenshot, demo account' } },
  },
  proof: { label: { fr: 'Ils font confiance à TriggerFlow', en: 'They trust TriggerFlow' }, clients: ['AMMI Hôtels', 'Groupe Noemys', 'Edgar Hôtel & Spa'] },
  sections: [
    {
      type: 'split', tone: 'white',
      eyebrow: { fr: 'Comptes sociétés', en: 'Company accounts' },
      title: { fr: 'Les sociétés sont déjà dans vos données.', en: 'Companies are already in your data.' },
      subtitle: { fr: 'TriggerFlow regroupe les noms de sociétés et d’agences présents dans vos fiches et réservations, et vous propose de les rattacher. Vos choix sont retenus pour les prochaines réservations.', en: 'TriggerFlow groups the company and agency names in your profiles and bookings, and suggests linking them. Your choices are remembered for future bookings.' },
      bullets: [
        { fr: 'Agences, tour-opérateurs et entreprises, avec leurs contacts', en: 'Agencies, tour operators and companies, with their contacts' },
        { fr: 'Les réservations apportées par une agence rattachées automatiquement', en: 'Bookings brought by an agency linked automatically' },
        { fr: 'Suggestions par nom, nom proche ou domaine email', en: 'Suggestions by name, similar name or email domain' },
        { fr: 'Les profils sociétés de Thaïs et Medialog reconnus', en: 'Company profiles from Thaïs and Medialog recognised' },
      ],
      panel: {
        title: { fr: 'Sur chaque compte', en: 'On every account' },
        items: [
          { fr: 'Chiffre d’affaires, nuitées et réservations', en: 'Revenue, room nights and bookings' },
          { fr: 'Comparaison avec l’an dernier', en: 'Comparison with last year' },
          { fr: 'Historique des échanges et des notes', en: 'History of messages and notes' },
          { fr: 'Résumé de la relation par l’IA', en: 'AI relationship summary' },
          { fr: 'Prochaines actions et rappels', en: 'Next actions and reminders' },
        ],
      },
    },
    {
      type: 'cards', tone: 'paper', cols: 3,
      image: { pending: { fr: 'Capture à venir · fiche d’une affaire', en: 'Screenshot coming · a deal card' } },
      eyebrow: { fr: 'Pipeline', en: 'Pipeline' },
      title: { fr: 'Chaque demande devient une affaire suivie.', en: 'Every request becomes a tracked deal.' },
      items: [
        { icon: 'list', title: { fr: 'Un tableau par étape', en: 'A board by stage' }, text: { fr: 'Nouvelles demandes, en discussion, gagné, perdu, et vos propres étapes.', en: 'New requests, in discussion, won, lost, and your own stages.' } },
        { icon: 'tag', title: { fr: 'L’essentiel sur chaque carte', en: 'The essentials on every card' }, text: { fr: 'Client, société, montant, date, nombre de personnes, responsable, apporteur.', en: 'Client, company, amount, date, headcount, owner, referrer.' } },
        { icon: 'bell', title: { fr: 'Relances', en: 'Reminders' }, text: { fr: 'Appel, email, rendez-vous, visite : un rappel chaque matin pour ce qui est en retard.', en: 'Call, email, meeting, visit: a reminder every morning for what is overdue.' } },
        { icon: 'mail', title: { fr: 'Demandes captées', en: 'Requests captured' }, text: { fr: 'Depuis vos emails, votre site, vos formulaires ou une conversation de la messagerie.', en: 'From your emails, website, forms or an inbox conversation.' } },
        { icon: 'sparkles', title: { fr: 'Réponse préparée par l’IA', en: 'AI-prepared reply' }, text: { fr: 'Elle vérifie si la date semble libre. Elle n’écrit jamais de prix.', en: 'It checks whether the date looks free. It never writes prices.' } },
        { icon: 'smartphone', title: { fr: 'Sur téléphone et tablette', en: 'On phone and tablet' }, text: { fr: 'Le pipeline vous suit en rendez-vous.', en: 'The pipeline follows you to meetings.' } },
      ],
    },
    {
      type: 'band',
      eyebrow: { fr: 'Plateformes', en: 'Platforms' },
      title: { fr: 'Les demandes des plateformes, sans intermédiaire.', en: 'Platform requests, without the middleman.' },
      items: [
        { icon: 'mail', title: { fr: '8 plateformes reconnues', en: '8 platforms recognised' }, text: { fr: 'Mariages.net, Zankyou, ABC Salles, 1001 Salles, Bedouk, Kactus, Funbooker, Mariage.com.', en: 'Mariages.net, Zankyou, ABC Salles, 1001 Salles, Bedouk, Kactus, Funbooker, Mariage.com.' } },
        { icon: 'user', title: { fr: 'Le vrai client', en: 'The real client' }, text: { fr: 'Ses coordonnées sont lues dans l’email, la plateforme est notée comme apporteur.', en: 'Their details are read from the email, the platform is recorded as referrer.' } },
        { icon: 'clock', title: { fr: 'Pas de demande oubliée', en: 'No request forgotten' }, text: { fr: 'Une alerte si une demande attend une réponse depuis trop longtemps.', en: 'An alert if a request has waited too long for a reply.' } },
      ],
    },
  ],
  compare: {
    eyebrow: { fr: 'Pourquoi pas un tableur ?', en: 'Why not a spreadsheet?' },
    title: { fr: 'Un tableur ne vous dit pas qui rapporte.', en: 'A spreadsheet doesn’t tell you who brings in revenue.' },
    other: { fr: 'Tableur et boîte mail', en: 'Spreadsheet and inbox' },
    rows: [
      { label: { fr: 'Sociétés', en: 'Companies' }, other: { fr: 'Saisies à la main, en double', en: 'Typed by hand, duplicated' }, us: { fr: 'Détectées dans vos réservations', en: 'Detected in your bookings' } },
      { label: { fr: 'Chiffre d’affaires', en: 'Revenue' }, other: { fr: 'Recalculé chaque fin de mois', en: 'Recalculated every month end' }, us: { fr: 'En direct, comparé à l’an dernier', en: 'Live, compared with last year' } },
      { label: { fr: 'Demandes', en: 'Requests' }, other: { fr: 'Éparpillées dans les emails', en: 'Scattered across emails' }, us: { fr: 'Une carte par affaire, avec son étape', en: 'One card per deal, with its stage' } },
      { label: { fr: 'Relances', en: 'Follow-ups' }, other: { fr: 'Dans la tête du commercial', en: 'In the sales rep’s head' }, us: { fr: 'Rappel chaque matin', en: 'A reminder every morning' } },
    ],
  },
  pricing: PRICING,
  faqTitle: { fr: 'Vos questions sur le B2B.', en: 'Your questions about B2B.' },
  faq: [
    { q: { fr: 'Comment les sociétés sont-elles détectées ?', en: 'How are companies detected?' }, a: { fr: 'À partir des noms de sociétés et d’agences présents dans vos fiches et réservations. Vous validez, rattachez ou ignorez, et vos choix s’appliquent aux réservations suivantes.', en: 'From the company and agency names in your profiles and bookings. You confirm, link or ignore, and your choices apply to later bookings.' } },
    { q: { fr: 'Peut-on suivre le chiffre d’affaires par société ?', en: 'Can I track revenue per company?' }, a: { fr: 'Oui : chiffre d’affaires, nuitées et réservations, sur la période de votre choix, comparés à l’an dernier.', en: 'Yes: revenue, room nights and bookings, over the period you choose, compared with last year.' } },
    { q: { fr: 'Les sociétés reçoivent-elles vos campagnes marketing ?', en: 'Do companies receive your marketing campaigns?' }, a: { fr: 'Non, sauf si vous les ciblez volontairement. Les emails de séjour vont à l’occupant, pas à la société qui a réservé.', en: 'No, unless you target them on purpose. Stay emails go to the occupant, not the booking company.' } },
    { q: { fr: 'Gérez-vous les contrats et tarifs négociés ?', en: 'Do you manage contracts and negotiated rates?' }, a: { fr: 'Pas aujourd’hui : vos tarifs restent dans votre PMS. TriggerFlow suit la relation, les affaires et le chiffre d’affaires.', en: 'Not today: your rates stay in your PMS. TriggerFlow tracks the relationship, deals and revenue.' } },
  ],
  cta: { title: { fr: 'Faites de votre B2B un vrai canal.', en: 'Turn your B2B into a real channel.' }, text: { fr: 'Une démo de 45 minutes, avec vos sociétés et agences.', en: 'A 45-minute demo, with your companies and agencies.' } },
};

export const eventsLanding: DedicatedLandingContent & Seo = {
  seo: {
    title: { fr: 'Séminaires, mariages et groupes à l’hôtel | TriggerFlow', en: 'Seminars, weddings and groups at your hotel | TriggerFlow' },
    description: {
      fr: 'Demandes d’événements captées, participants, régimes, rooming list et messages automatiques : vos séminaires, mariages et groupes suivis au même endroit.',
      en: 'Event requests captured, attendees, diets, rooming list and automated messages: your seminars, weddings and groups tracked in one place.',
    },
  },
  hero: {
    eyebrow: { fr: 'Événements', en: 'Events' },
    title: { fr: 'Séminaires, mariages et groupes, suivis au même endroit.', en: 'Seminars, weddings and groups, all in one place.' },
    subtitle: {
      fr: 'De la demande à la rooming list : chaque participant a sa fiche, ses réponses et ses messages, et vos chambres sont remplies dans le PMS.',
      en: 'From request to rooming list: every attendee has a profile, answers and messages, and your rooms are filled in the PMS.',
    },
    bullets: [
      { fr: 'Les demandes captées depuis vos emails, votre site et les plateformes', en: 'Requests captured from your emails, website and platforms' },
      { fr: 'Participants, accompagnants, régimes et heures d’arrivée', en: 'Attendees, plus-ones, diets and arrival times' },
      { fr: 'Rooming list remplie par les participants eux-mêmes', en: 'Rooming list filled in by attendees themselves' },
    ],
    image: { src: '/images/app/events.webp', width: 1448, height: 560, label: 'app.trigger-flow.com/commercial/evenements', alt: { fr: 'Événements TriggerFlow : séminaires, mariages et groupes avec leurs participants', en: 'TriggerFlow events: seminars, weddings and groups with their attendees' }, caption: { fr: 'Capture de l’application, compte de démonstration', en: 'App screenshot, demo account' } },
  },
  proof: { label: { fr: 'Ils font confiance à TriggerFlow', en: 'They trust TriggerFlow' }, clients: ['AMMI Hôtels', 'Château de Courban', 'Groupe Noemys'] },
  sections: [
    {
      type: 'cards', tone: 'white', cols: 4,
      eyebrow: { fr: 'La demande', en: 'The request' },
      title: { fr: 'Toutes les demandes,', en: 'Every request,' }, titleMuted: { fr: 'au même endroit.', en: 'in one place.' },
      items: [
        { icon: 'mail', title: { fr: 'Par email', en: 'By email' }, text: { fr: 'Une demande d’événement ou de groupe de 10 chambres et plus devient une affaire.', en: 'An event request or a group of 10+ rooms becomes a deal.' } },
        { icon: 'globe', title: { fr: 'Depuis votre site', en: 'From your website' }, text: { fr: 'Un formulaire de demande : type, date, nombre de personnes, message.', en: 'A request form: type, date, headcount, message.' } },
        { icon: 'message', title: { fr: 'Depuis la messagerie', en: 'From the inbox' }, text: { fr: 'Une conversation WhatsApp, SMS ou chat ajoutée au pipeline en un clic.', en: 'A WhatsApp, SMS or chat conversation added to the pipeline in one click.' } },
        { icon: 'sparkles', title: { fr: 'Réponse préparée', en: 'Reply prepared' }, text: { fr: 'L’IA vérifie si la date semble libre et prépare la réponse. Sans jamais écrire de prix.', en: 'AI checks if the date looks free and drafts the reply. Never writing prices.' } },
      ],
      footnote: { fr: 'Les demandes reçues via Mariages.net, Zankyou, ABC Salles, Bedouk et 4 autres plateformes sont reconnues.', en: 'Requests via Mariages.net, Zankyou, ABC Salles, Bedouk and 4 other platforms are recognised.' },
    },
    {
      type: 'split', tone: 'paper',
      eyebrow: { fr: 'Les participants', en: 'Attendees' },
      title: { fr: 'Chaque participant, suivi sans tableur.', en: 'Every attendee, tracked without a spreadsheet.' },
      bullets: [
        { fr: 'Rôles : organisateur, participant, intervenant, équipe', en: 'Roles: organiser, attendee, speaker, staff' },
        { fr: 'Réponses : invité, confirmé, décliné, présent, absent', en: 'Responses: invited, confirmed, declined, attended, no-show' },
        { fr: 'Accompagnants, heure d’arrivée, transport', en: 'Plus-ones, arrival time, transport' },
        { fr: 'Régimes alimentaires, collectés avec consentement', en: 'Dietary needs, collected with consent' },
        { fr: 'Import et export CSV', en: 'CSV import and export' },
      ],
      panel: {
        title: { fr: 'Les messages partent tout seuls', en: 'Messages go out on their own' },
        items: [
          { fr: 'À l’inscription et à la confirmation', en: 'On registration and confirmation' },
          { fr: 'X jours avant l’événement', en: 'X days before the event' },
          { fr: 'Un message de dernière minute aux confirmés', en: 'A last-minute message to confirmed attendees' },
          { fr: 'Personnalisés : nom de l’événement, date, participant', en: 'Personalised: event name, date, attendee' },
        ],
      },
    },
    {
      type: 'split', tone: 'white',
      eyebrow: { fr: 'Rooming list', en: 'Rooming list' },
      title: { fr: 'La rooming list, remplie par les participants.', en: 'The rooming list, filled in by attendees.' },
      steps: [
        { title: { fr: 'Le formulaire part aux titulaires', en: 'The form goes to booking holders' }, text: { fr: 'Un lien pour chaque réservation rattachée à l’événement.', en: 'A link for each booking linked to the event.' } },
        { title: { fr: 'Chacun indique les occupants', en: 'Each one lists the occupants' }, text: { fr: 'Une fiche client créée pour chaque occupant.', en: 'A guest profile created for every occupant.' } },
        { title: { fr: 'Les occupants arrivent dans le PMS', en: 'Occupants reach the PMS' }, text: { fr: 'Automatiquement avec Thaïs et Mews.', en: 'Automatically with Thaïs and Mews.' } },
      ],
      figure: { value: '30 j', label: { fr: 'après l’événement, les données sensibles (régimes) sont supprimées par défaut', en: 'after the event, sensitive data (diets) is deleted by default' } },
    },
  ],
  compare: {
    eyebrow: { fr: 'Pourquoi pas un tableur ?', en: 'Why not a spreadsheet?' },
    title: { fr: 'Un tableur par événement, c’est une erreur par événement.', en: 'One spreadsheet per event means one mistake per event.' },
    other: { fr: 'Tableur partagé', en: 'Shared spreadsheet' },
    rows: [
      { label: { fr: 'Demandes', en: 'Requests' }, other: { fr: 'Dans les emails de chacun', en: 'In everyone’s inbox' }, us: { fr: 'Une carte par demande, avec une réponse préparée', en: 'One card per request, with a drafted reply' } },
      { label: { fr: 'Participants', en: 'Attendees' }, other: { fr: 'Relancés un par un', en: 'Chased one by one' }, us: { fr: 'Messages automatiques selon leur réponse', en: 'Automated messages based on their response' } },
      { label: { fr: 'Rooming list', en: 'Rooming list' }, other: { fr: 'Ressaisie dans le PMS', en: 'Re-typed into the PMS' }, us: { fr: 'Remplie par les participants', en: 'Filled in by attendees' } },
      { label: { fr: 'Données sensibles', en: 'Sensitive data' }, other: { fr: 'Gardées indéfiniment', en: 'Kept forever' }, us: { fr: 'Supprimées après l’événement', en: 'Deleted after the event' } },
    ],
  },
  pricing: PRICING,
  faqTitle: { fr: 'Vos questions sur les événements.', en: 'Your questions about events.' },
  faq: [
    { q: { fr: 'Puis-je importer une liste de participants ?', en: 'Can I import an attendee list?' }, a: { fr: 'Oui, par fichier CSV, et l’exporter aussi (sans les régimes alimentaires).', en: 'Yes, via CSV, and export it too (without dietary data).' } },
    { q: { fr: 'La rooming list remonte-t-elle dans mon PMS ?', en: 'Does the rooming list reach my PMS?' }, a: { fr: 'Les occupants sont créés automatiquement dans Thaïs et Mews. Avec les autres PMS, ils sont créés dans TriggerFlow.', en: 'Occupants are created automatically in Thaïs and Mews. With other PMS, they are created in TriggerFlow.' } },
    { q: { fr: 'Gérez-vous les salles et les devis ?', en: 'Do you manage rooms and quotes?' }, a: { fr: 'Pas aujourd’hui : TriggerFlow suit les demandes, les participants et la communication. Vos salles et vos devis restent dans vos outils actuels.', en: 'Not today: TriggerFlow tracks requests, attendees and communication. Your rooms and quotes stay in your current tools.' } },
    { q: { fr: 'L’IA envoie-t-elle des prix ?', en: 'Does the AI send prices?' }, a: { fr: 'Jamais. Elle prépare une réponse et vérifie si la date semble libre, vous ajoutez vos conditions.', en: 'Never. It drafts a reply and checks if the date looks free, you add your terms.' } },
  ],
  cta: { title: { fr: 'Vos prochains séminaires, sans tableur.', en: 'Your next seminars, without spreadsheets.' }, text: { fr: 'Une démo de 45 minutes, avec un de vos événements.', en: 'A 45-minute demo, with one of your events.' } },
};
