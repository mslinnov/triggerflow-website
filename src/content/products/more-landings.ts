/**
 * Landings CRM, Campagnes, Fidélité, Appel réception, Ménage et Clés (FR/EN), sur le gabarit DedicatedLanding.
 * Audits origin/main du 09/11/2026. Points à ne PAS affirmer :
 * - CRM : droit à l'oubli / anonymisation d'un client ; frise unique.
 * - Campagnes : A/B testing, optimisation de l'heure d'envoi, calendrier de campagnes (les campagnes sont des flows marketing).
 * - Fidélité : carte de fidélité dans le wallet (le pass wallet est un pass de séjour), expiration des points,
 *   statistiques du programme, points sur les dépenses hors réservation, parrainage.
 * - Appel réception : agent vocal IA, appel depuis le téléphone de la chambre, décrocher sur l'app mobile.
 *   Fonction très récente (05/11/2026) : à confirmer en production avant la mise en ligne.
 * - Ménage : écriture du statut des chambres dans tous les PMS (Medialog seulement).
 * - Clés : autres serrures qu'Igloohome et Sesame, envoi automatique des codes, ouverture à distance, journal d'accès.
 */
import type { DedicatedLandingContent } from '@/components/product/DedicatedLanding';

type Seo = { seo: { title: { fr: string; en: string }; description: { fr: string; en: string } } };
type Landing = DedicatedLandingContent & Seo;
const demoCaption = { fr: 'Capture de l’application, compte de démonstration', en: 'App screenshot, demo account' };

export const crmLanding: Landing = {
  seo: {
    title: { fr: 'CRM hôtelier : une fiche par client, sans doublons | TriggerFlow', en: 'Hotel CRM: one profile per guest, no duplicates | TriggerFlow' },
    description: { fr: 'Toutes les données de vos clients réunies depuis votre PMS : séjours, messages, commandes, paiements, avis. Doublons fusionnés, segments sur plus de 50 filtres.', en: 'All your guest data gathered from your PMS: stays, messages, orders, payments, reviews. Duplicates merged, segments on 50+ filters.' },
  },
  hero: {
    eyebrow: { fr: 'CRM', en: 'CRM' },
    title: { fr: 'Une fiche par client. Tout ce qu’il a vécu chez vous.', en: 'One profile per guest. Everything they experienced with you.' },
    subtitle: { fr: 'Séjours, messages, appels, formulaires, commandes, paiements et avis réunis sur une seule fiche, synchronisée avec votre PMS. Les doublons sont fusionnés, et vos segments se mettent à jour tout seuls.', en: 'Stays, messages, calls, forms, orders, payments and reviews on one profile, synced with your PMS. Duplicates are merged, and your segments update themselves.' },
    bullets: [
      { fr: 'Synchronisé avec votre PMS, sans import manuel', en: 'Synced with your PMS, no manual import' },
      { fr: 'Les doublons détectés et fusionnés', en: 'Duplicates detected and merged' },
      { fr: 'Plus de 50 filtres pour vos segments', en: '50+ filters for your segments' },
    ],
    image: { src: '/images/app/cardex.webp', width: 1400, height: 866, label: 'app.trigger-flow.com/cardex', alt: { fr: 'Fiche client TriggerFlow : société, séjour, messages envoyés et résumé IA', en: 'TriggerFlow guest profile: company, stay, messages sent and AI summary' }, caption: demoCaption },
  },
  proof: { label: { fr: 'Ils font confiance à TriggerFlow', en: 'They trust TriggerFlow' }, clients: ['Groupe Noemys', 'AMMI Hôtels', 'Hôtel Causse Comtal', 'Urban Bivouac'], stat: { key: 'messages', label: { fr: 'messages envoyés par nos hôtels clients', en: 'messages sent by our client hotels' } } },
  sections: [
    {
      type: 'cards', tone: 'white', cols: 4,
      eyebrow: { fr: 'La fiche client', en: 'The guest profile' },
      title: { fr: 'Tout le client,', en: 'The whole guest,' }, titleMuted: { fr: 'sur un seul écran.', en: 'on one screen.' },
      items: [
        { icon: 'bed', title: { fr: 'Séjours', en: 'Stays' }, text: { fr: 'Toutes ses réservations, venues du PMS, et ce qu’il a dépensé.', en: 'All their bookings, from the PMS, and what they spent.' } },
        { icon: 'message', title: { fr: 'Échanges', en: 'Conversations' }, text: { fr: 'Emails, SMS, WhatsApp, appels et messages automatiques.', en: 'Emails, SMS, WhatsApp, calls and automated messages.' } },
        { icon: 'bag', title: { fr: 'Commandes et paiements', en: 'Orders and payments' }, text: { fr: 'Extras commandés, liens de paiement, cautions.', en: 'Extras ordered, payment links, holds.' } },
        { icon: 'sparkles', title: { fr: 'Résumé IA', en: 'AI summary' }, text: { fr: 'Ses habitudes et ses préférences en quelques lignes.', en: 'Their habits and preferences in a few lines.' } },
      ],
    },
    {
      type: 'split', tone: 'paper',
      eyebrow: { fr: 'Doublons', en: 'Duplicates' },
      title: { fr: 'Un client, une fiche. Même venu de Booking.', en: 'One guest, one profile. Even from Booking.' },
      steps: [
        { title: { fr: 'Même email, aucune contradiction', en: 'Same email, no conflict' }, text: { fr: 'Fusion automatique, si vous l’activez.', en: 'Automatic merge, if you turn it on.' } },
        { title: { fr: 'Même email ou téléphone, un détail diffère', en: 'Same email or phone, one detail differs' }, text: { fr: 'Suggestion à valider par votre équipe.', en: 'Suggestion for your team to confirm.' } },
        { title: { fr: 'Même nom, et un autre indice', en: 'Same name, plus another clue' }, text: { fr: 'Date de naissance, ville ou code postal : suggestion seulement.', en: 'Birth date, city or postcode: suggestion only.' } },
      ],
      panel: { title: { fr: 'Une fusion sûre', en: 'A safe merge' }, items: [
        { fr: 'Toutes les données rejoignent la fiche gardée', en: 'All data moves to the kept profile' },
        { fr: 'Les totaux sont recalculés', en: 'Totals are recalculated' },
        { fr: 'Une copie de l’avant est conservée', en: 'A copy of the before state is kept' },
        { fr: 'Les adresses relais des OTA ne fusionnent jamais seules', en: 'OTA relay addresses never merge on their own' },
      ] },
    },
    {
      type: 'band',
      eyebrow: { fr: 'Segments', en: 'Segments' },
      title: { fr: 'Plus de 50 filtres, combinables à l’infini.', en: '50+ filters, endlessly combinable.' },
      items: [
        { icon: 'filter', title: { fr: 'Filtres hôteliers', en: 'Hotel filters' }, text: { fr: 'Canal de réservation, séjours, montant, nationalité, chambre, fidélité, tags…', en: 'Booking channel, stays, amount, nationality, room, loyalty, tags…' } },
        { icon: 'repeat', title: { fr: 'Toujours à jour', en: 'Always up to date' }, text: { fr: 'Les segments se recalculent avec chaque réservation.', en: 'Segments recalculate with every booking.' } },
        { icon: 'tag', title: { fr: 'Tags automatiques', en: 'Automatic tags' }, text: { fr: 'Posés par des règles, par vos formulaires ou par vos flows, avec expiration.', en: 'Set by rules, forms or flows, with expiry.' } },
        { icon: 'zap', title: { fr: 'Utilisés partout', en: 'Used everywhere' }, text: { fr: 'Dans vos flows, campagnes, formulaires et offres.', en: 'In your flows, campaigns, forms and offers.' } },
      ],
    },
    {
      type: 'cards', tone: 'white', cols: 3,
      eyebrow: { fr: 'Pour les groupes', en: 'For groups' },
      title: { fr: 'Le client reconnu dans tous vos hôtels.', en: 'The guest recognised across all your hotels.' },
      items: [
        { icon: 'building', title: { fr: 'Historique groupe', en: 'Group history' }, text: { fr: 'Chaque hôtel voit les séjours du client dans le groupe, sans ses coordonnées ni ses prix.', en: 'Each hotel sees the guest’s stays in the group, without contact details or prices.' } },
        { icon: 'shield', title: { fr: 'Consentements partagés', en: 'Shared consents' }, text: { fr: 'Une désinscription s’applique à tout le groupe.', en: 'An unsubscribe applies to the whole group.' } },
        { icon: 'database', title: { fr: 'Qualité de la base', en: 'Database quality' }, text: { fr: 'Part des fiches avec email, téléphone, adresse, anniversaire.', en: 'Share of profiles with email, phone, address, birthday.' } },
      ],
      footnote: { fr: 'Import CSV ou Excel, export en un clic, données hébergées en France.', en: 'CSV or Excel import, one-click export, data hosted in France.' },
    },
  ],
  compare: {
    eyebrow: { fr: 'Pourquoi pas le PMS seul ?', en: 'Why not just the PMS?' },
    title: { fr: 'Le PMS gère les chambres. Le CRM gère les clients.', en: 'The PMS manages rooms. The CRM manages guests.' },
    other: { fr: 'Fichier clients du PMS', en: 'PMS guest file' },
    rows: [
      { label: { fr: 'Doublons', en: 'Duplicates' }, other: { fr: 'Une fiche par réservation', en: 'One profile per booking' }, us: { fr: 'Une fiche par client, fusionnée', en: 'One profile per guest, merged' } },
      { label: { fr: 'Historique', en: 'History' }, other: { fr: 'Les séjours seulement', en: 'Stays only' }, us: { fr: 'Séjours, messages, commandes, avis', en: 'Stays, messages, orders, reviews' } },
      { label: { fr: 'Segments', en: 'Segments' }, other: { fr: 'Exports à retraiter', en: 'Exports to rework' }, us: { fr: '50+ filtres, mis à jour en continu', en: '50+ filters, continuously updated' } },
      { label: { fr: 'Action', en: 'Action' }, other: { fr: 'Aucune', en: 'None' }, us: { fr: 'Flows, campagnes, offres ciblées', en: 'Flows, campaigns, targeted offers' } },
    ],
  },
  pricing: { fr: 'Le CRM est inclus dans toutes les formules payantes.', en: 'The CRM is included in every paid plan.' },
  faqTitle: { fr: 'Vos questions sur le CRM.', en: 'Your questions about the CRM.' },
  faq: [
    { q: { fr: 'D’où viennent les données ?', en: 'Where does the data come from?' }, a: { fr: 'De votre PMS, synchronisé automatiquement, et de tout ce qui se passe dans TriggerFlow : messages, formulaires, commandes, paiements, avis. Vous pouvez aussi importer un fichier.', en: 'From your PMS, synced automatically, and from everything that happens in TriggerFlow: messages, forms, orders, payments, reviews. You can also import a file.' } },
    { q: { fr: 'Comment gérez-vous les doublons ?', en: 'How do you handle duplicates?' }, a: { fr: 'Trois niveaux : fusion automatique quand c’est sûr, suggestions à valider sinon, et fusion manuelle. Les adresses relais des OTA ne fusionnent jamais seules.', en: 'Three levels: automatic merge when certain, suggestions to confirm otherwise, and manual merge. OTA relay addresses never merge on their own.' } },
    { q: { fr: 'Les modifications repartent-elles dans le PMS ?', en: 'Do changes go back to the PMS?' }, a: { fr: 'Oui pour les champs que votre PMS accepte, comme les coordonnées.', en: 'Yes for the fields your PMS accepts, such as contact details.' } },
    { q: { fr: 'Et pour un groupe d’hôtels ?', en: 'What about a hotel group?' }, a: { fr: 'Chaque hôtel voit l’historique du client dans le groupe, sans ses coordonnées ni ses prix, et les désinscriptions s’appliquent partout.', en: 'Each hotel sees the guest’s group history, without contact details or prices, and unsubscribes apply everywhere.' } },
  ],
  cta: { title: { fr: 'Connaissez enfin vos clients.', en: 'Finally know your guests.' }, text: { fr: 'Une démo de 45 minutes, avec les données de votre PMS.', en: 'A 45-minute demo, with your PMS data.' } },
};

export const campaignsLanding: Landing = {
  seo: {
    title: { fr: 'Campagnes email et SMS pour hôtels | TriggerFlow', en: 'Email and SMS campaigns for hotels | TriggerFlow' },
    description: { fr: 'Newsletters, offres saisonnières, relances des anciens clients : des campagnes ciblées sur vos segments, et le chiffre d’affaires qu’elles rapportent.', en: 'Newsletters, seasonal offers, past-guest win-back: campaigns targeted on your segments, and the revenue they bring in.' },
  },
  hero: {
    eyebrow: { fr: 'Campagnes', en: 'Campaigns' },
    title: { fr: 'Vos anciens clients, votre meilleur canal de réservation directe.', en: 'Past guests, your best direct booking channel.' },
    subtitle: { fr: 'Newsletters, offres saisonnières, anniversaires, relances : parlez à chaque client selon ce qu’il a vécu chez vous, par email, SMS ou WhatsApp. Et voyez les réservations que chaque campagne rapporte.', en: 'Newsletters, seasonal offers, birthdays, win-backs: speak to each guest based on their stay, by email, SMS or WhatsApp. And see the bookings each campaign brings in.' },
    bullets: [
      { fr: 'Des segments précis, jamais un envoi à toute la base', en: 'Precise segments, never a blast to everyone' },
      { fr: 'Un éditeur d’emails par glisser-déposer, avec l’IA', en: 'A drag-and-drop email editor, with AI' },
      { fr: 'Le chiffre d’affaires attribué à chaque envoi', en: 'Revenue attributed to every send' },
    ],
    image: { src: '/images/app/flow-stats.webp', width: 1448, height: 820, label: 'app.trigger-flow.com/flows/statistiques', alt: { fr: 'Statistiques d’une campagne TriggerFlow : envoyés, ouverts, cliqués', en: 'TriggerFlow campaign statistics: sent, opened, clicked' }, caption: demoCaption },
  },
  proof: { label: { fr: 'Ils font confiance à TriggerFlow', en: 'They trust TriggerFlow' }, clients: ['Urban Bivouac', 'Hôtel Causse Comtal', 'Groupe Noemys'], stat: { key: 'messages', label: { fr: 'messages envoyés par nos hôtels clients', en: 'messages sent by our client hotels' } } },
  sections: [
    {
      type: 'cards', tone: 'white', cols: 4,
      eyebrow: { fr: 'Des idées de campagnes', en: 'Campaign ideas' },
      title: { fr: 'Le bon message,', en: 'The right message,' }, titleMuted: { fr: 'au bon client.', en: 'to the right guest.' },
      items: [
        { icon: 'calendar', title: { fr: 'Saisonnières', en: 'Seasonal' }, text: { fr: 'Fêtes, ponts, vacances : aux clients qui sont déjà venus à cette période.', en: 'Holidays, long weekends: to guests who already came at that time.' } },
        { icon: 'repeat', title: { fr: 'Retour', en: 'Win-back' }, text: { fr: 'Aux clients qui ne sont pas revenus depuis un an.', en: 'To guests who haven’t returned in a year.' } },
        { icon: 'gift', title: { fr: 'Anniversaires', en: 'Birthdays' }, text: { fr: 'Une attention le bon jour, chaque année.', en: 'A gesture on the right day, every year.' } },
        { icon: 'mail', title: { fr: 'Newsletter', en: 'Newsletter' }, text: { fr: 'Vos nouveautés, aux abonnés qui l’ont demandée.', en: 'Your news, to subscribers who asked for it.' } },
      ],
    },
    {
      type: 'split', tone: 'paper',
      eyebrow: { fr: 'Créer', en: 'Create' },
      title: { fr: 'Un bel email, sans graphiste.', en: 'A beautiful email, no designer needed.' },
      bullets: [
        { fr: 'Éditeur par glisser-déposer, emails lisibles sur mobile', en: 'Drag-and-drop editor, mobile-friendly emails' },
        { fr: 'L’assistant IA rédige l’email à partir de votre idée', en: 'The AI assistant writes the email from your idea' },
        { fr: 'Modèles classés : saisons, promotions, retour, anniversaires…', en: 'Sorted templates: seasons, promotions, win-back, birthdays…' },
        { fr: 'Email, SMS ou WhatsApp, dans la même campagne', en: 'Email, SMS or WhatsApp, in the same campaign' },
        { fr: 'Mode test : tout part vers votre adresse avant l’envoi', en: 'Test mode: everything goes to your address before sending' },
      ],
      panel: { title: { fr: 'Ciblage', en: 'Targeting' }, items: [
        { fr: 'Segments d’entrée et d’exclusion', en: 'Inclusion and exclusion segments' },
        { fr: 'Audience estimée avant l’envoi', en: 'Estimated audience before sending' },
        { fr: 'Contacts inactifs exclus automatiquement', en: 'Inactive contacts excluded automatically' },
        { fr: 'Pour les groupes : tous les hôtels ou une sélection', en: 'For groups: all hotels or a selection' },
      ] },
    },
    {
      type: 'band',
      eyebrow: { fr: 'Mesurer', en: 'Measure' },
      title: { fr: 'Ce que vos campagnes rapportent vraiment.', en: 'What your campaigns really bring in.' },
      items: [
        { icon: 'list', title: { fr: 'Entonnoir', en: 'Funnel' }, text: { fr: 'Envoyés, délivrés, ouverts, cliqués, par canal.', en: 'Sent, delivered, opened, clicked, by channel.' } },
        { icon: 'click', title: { fr: 'Carte des clics', en: 'Click map' }, text: { fr: 'Ce qui intéresse vos clients dans l’email.', en: 'What interests guests in the email.' } },
        { icon: 'card', title: { fr: 'Réservations attribuées', en: 'Attributed bookings' }, text: { fr: 'Les réservations faites dans les 28 jours après une ouverture ou un clic.', en: 'Bookings made within 28 days of an open or click.' } },
      ],
    },
    {
      type: 'cards', tone: 'white', cols: 3,
      eyebrow: { fr: 'Délivrabilité et RGPD', en: 'Deliverability and GDPR' },
      title: { fr: 'Dans la boîte de réception, pas dans les spams.', en: 'In the inbox, not in spam.' },
      items: [
        { icon: 'shield', title: { fr: 'Domaine vérifié', en: 'Verified domain' }, text: { fr: 'SPF, DKIM et DMARC contrôlés, rebonds surveillés.', en: 'SPF, DKIM and DMARC checked, bounces monitored.' } },
        { icon: 'bell', title: { fr: 'Pause automatique', en: 'Automatic pause' }, text: { fr: 'Une campagne s’arrête si les plaintes ou les erreurs augmentent.', en: 'A campaign stops if complaints or errors rise.' } },
        { icon: 'lock', title: { fr: 'Consentements', en: 'Consents' }, text: { fr: 'Désinscription en un clic, STOP SMS, double validation des abonnés.', en: 'One-click unsubscribe, SMS STOP, double opt-in for subscribers.' } },
      ],
    },
  ],
  compare: {
    eyebrow: { fr: 'Pourquoi pas un outil d’emailing ?', en: 'Why not an email tool?' },
    title: { fr: 'Un outil d’emailing ne sait pas qui a séjourné.', en: 'An email tool doesn’t know who stayed.' },
    other: { fr: 'Outil d’emailing classique', en: 'Standard email tool' },
    rows: [
      { label: { fr: 'Liste', en: 'List' }, other: { fr: 'Exportée du PMS chaque mois', en: 'Exported from the PMS monthly' }, us: { fr: 'À jour en continu, sans doublons', en: 'Continuously up to date, no duplicates' } },
      { label: { fr: 'Ciblage', en: 'Targeting' }, other: { fr: 'Âge, ville, ouverture', en: 'Age, city, opens' }, us: { fr: 'Séjours, canal, chambre, dépense, fidélité', en: 'Stays, channel, room, spend, loyalty' } },
      { label: { fr: 'Canaux', en: 'Channels' }, other: { fr: 'L’email', en: 'Email' }, us: { fr: 'Email, SMS et WhatsApp', en: 'Email, SMS and WhatsApp' } },
      { label: { fr: 'Résultat', en: 'Results' }, other: { fr: 'Taux d’ouverture', en: 'Open rate' }, us: { fr: 'Réservations attribuées', en: 'Attributed bookings' } },
    ],
  },
  pricing: { fr: 'Les campagnes sont incluses dans toutes les formules payantes. Les SMS et WhatsApp sont facturés à l’envoi.', en: 'Campaigns are included in every paid plan. SMS and WhatsApp are billed per send.' },
  faqTitle: { fr: 'Vos questions sur les campagnes.', en: 'Your questions about campaigns.' },
  faq: [
    { q: { fr: 'Peut-on envoyer des SMS marketing ?', en: 'Can I send marketing SMS?' }, a: { fr: 'Oui, et du WhatsApp, en respectant les consentements de vos clients. Le STOP SMS est géré automatiquement.', en: 'Yes, and WhatsApp, respecting your guests’ consent. SMS STOP is handled automatically.' } },
    { q: { fr: 'Comment éviter les adresses relais des OTA ?', en: 'How do I avoid OTA relay addresses?' }, a: { fr: 'Un filtre de segment cible uniquement les clients joignables en direct.', en: 'A segment filter targets only guests reachable directly.' } },
    { q: { fr: 'Comment mesurez-vous le chiffre d’affaires ?', en: 'How do you measure revenue?' }, a: { fr: 'Une réservation est attribuée au dernier envoi ouvert, cliqué, lu ou répondu dans les 28 jours précédents.', en: 'A booking is attributed to the last send opened, clicked, read or replied to in the previous 28 days.' } },
    { q: { fr: 'Faites-vous de l’A/B testing ?', en: 'Do you do A/B testing?' }, a: { fr: 'Pas aujourd’hui. Le mode test et les statistiques détaillées vous permettent de comparer vos campagnes.', en: 'Not today. Test mode and detailed statistics let you compare your campaigns.' } },
  ],
  cta: { title: { fr: 'Faites revenir vos clients en direct.', en: 'Bring guests back direct.' }, text: { fr: 'Une démo de 45 minutes, avec vos propres segments.', en: 'A 45-minute demo, with your own segments.' } },
};

export const loyaltyLanding: Landing = {
  seo: {
    title: { fr: 'Programme de fidélité hôtel : points, niveaux, récompenses | TriggerFlow', en: 'Hotel loyalty program: points, tiers, rewards | TriggerFlow' },
    description: { fr: 'Un programme de fidélité à vos couleurs : points calculés depuis le PMS, niveaux, récompenses et espace membre. Pour un hôtel ou tout un groupe.', en: 'A loyalty program in your brand: points calculated from the PMS, tiers, rewards and member area. For one hotel or a whole group.' },
  },
  hero: {
    eyebrow: { fr: 'Fidélité', en: 'Loyalty' },
    title: { fr: 'Votre programme de fidélité, comme les grandes chaînes. À votre image.', en: 'Your own loyalty program, like the big chains. In your brand.' },
    subtitle: { fr: 'Les points sont calculés depuis votre PMS, les niveaux débloquent des avantages, et vos membres retrouvent tout dans leur espace : points, séjours, récompenses.', en: 'Points are calculated from your PMS, tiers unlock benefits, and members find everything in their area: points, stays, rewards.' },
    bullets: [
      { fr: 'Points par euro, par nuit ou par séjour, depuis le PMS', en: 'Points per euro, per night or per stay, from the PMS' },
      { fr: 'Niveaux, avantages et catalogue de récompenses', en: 'Tiers, benefits and a rewards catalogue' },
      { fr: 'Un seul programme pour tous les hôtels d’un groupe', en: 'One program for every hotel in a group' },
    ],
  },
  proof: { label: { fr: 'Ils font confiance à TriggerFlow', en: 'They trust TriggerFlow' }, clients: ['Groupe Noemys', 'AMMI Hôtels', 'Pépites Lodges & Spas'] },
  sections: [
    {
      type: 'cards', tone: 'white', cols: 3,
      eyebrow: { fr: 'Gagner des points', en: 'Earning points' },
      title: { fr: 'Des règles simples,', en: 'Simple rules,' }, titleMuted: { fr: 'calculées pour vous.', en: 'calculated for you.' },
      items: [
        { icon: 'card', title: { fr: 'Par euro dépensé', en: 'Per euro spent' }, text: { fr: '« X points tous les Y € », sur le montant du séjour dans le PMS.', en: '“X points every Y €”, on the stay amount in the PMS.' } },
        { icon: 'bed', title: { fr: 'Par nuit ou par séjour', en: 'Per night or per stay' }, text: { fr: 'Pour récompenser la fréquence plutôt que le montant.', en: 'To reward frequency rather than spend.' } },
        { icon: 'gift', title: { fr: 'Bonus', en: 'Bonuses' }, text: { fr: 'Bienvenue, séjours dans plusieurs hôtels du groupe, ou points offerts par vos flows.', en: 'Welcome, stays in several group hotels, or points given by your flows.' } },
      ],
      footnote: { fr: 'Excluez ce que vous voulez : séjours OTA, tarifs entreprise, no-shows. Les séjours passés peuvent être comptés à l’inscription.', en: 'Exclude what you want: OTA stays, corporate rates, no-shows. Past stays can count on sign-up.' },
    },
    {
      type: 'split', tone: 'paper',
      eyebrow: { fr: 'Niveaux et récompenses', en: 'Tiers and rewards' },
      title: { fr: 'Des raisons concrètes de revenir.', en: 'Concrete reasons to come back.' },
      bullets: [
        { fr: 'Des niveaux débloqués par les points, avec leurs avantages', en: 'Tiers unlocked by points, with their benefits' },
        { fr: 'Un catalogue de récompenses payables en points', en: 'A rewards catalogue payable in points' },
        { fr: 'Points rendus si une commande est annulée', en: 'Points refunded if an order is cancelled' },
        { fr: 'Des messages automatiques au passage de niveau ou à l’anniversaire d’adhésion', en: 'Automated messages on tier change or membership anniversary' },
      ],
      panel: { title: { fr: 'L’espace membre', en: 'The member area' }, items: [
        { fr: 'À vos couleurs, sur votre lien', en: 'In your brand, on your link' },
        { fr: 'Points, niveau et progression', en: 'Points, tier and progress' },
        { fr: 'Séjours passés et à venir', en: 'Past and upcoming stays' },
        { fr: 'Récompenses et commandes', en: 'Rewards and orders' },
        { fr: 'Hôtels du programme', en: 'Program hotels' },
      ] },
    },
    {
      type: 'band',
      eyebrow: { fr: 'Connecté', en: 'Connected' },
      title: { fr: 'La fidélité dans tout votre parcours client.', en: 'Loyalty across your whole guest journey.' },
      items: [
        { icon: 'zap', title: { fr: '7 déclencheurs', en: '7 triggers' }, text: { fr: 'Inscription, points gagnés, niveau atteint, récompense, anniversaire…', en: 'Sign-up, points earned, tier reached, reward, anniversary…' } },
        { icon: 'filter', title: { fr: 'Segments', en: 'Segments' }, text: { fr: 'Membres, solde de points, niveau.', en: 'Members, points balance, tier.' } },
        { icon: 'mail', title: { fr: 'Dans vos messages', en: 'In your messages' }, text: { fr: 'Points, niveau et lien d’inscription dans vos emails et SMS.', en: 'Points, tier and sign-up link in your emails and SMS.' } },
        { icon: 'building', title: { fr: 'Multi-hôtels', en: 'Multi-hotel' }, text: { fr: 'Un programme commun à vos établissements.', en: 'One program shared by your properties.' } },
      ],
    },
  ],
  compare: {
    eyebrow: { fr: 'Pourquoi pas une carte de fidélité papier ?', en: 'Why not a paper card?' },
    title: { fr: 'Une carte papier ne sait pas ce que le client a dépensé.', en: 'A paper card doesn’t know what the guest spent.' },
    other: { fr: 'Carte papier ou tableur', en: 'Paper card or spreadsheet' },
    rows: [
      { label: { fr: 'Points', en: 'Points' }, other: { fr: 'Comptés à la main', en: 'Counted by hand' }, us: { fr: 'Calculés depuis le PMS', en: 'Calculated from the PMS' } },
      { label: { fr: 'Membre', en: 'Member' }, other: { fr: 'Ne voit rien', en: 'Sees nothing' }, us: { fr: 'Un espace avec ses points et ses récompenses', en: 'An area with their points and rewards' } },
      { label: { fr: 'Communication', en: 'Communication' }, other: { fr: 'Aucune', en: 'None' }, us: { fr: 'Messages automatiques à chaque étape', en: 'Automated messages at every step' } },
      { label: { fr: 'Groupe', en: 'Group' }, other: { fr: 'Une carte par hôtel', en: 'One card per hotel' }, us: { fr: 'Un programme pour tous vos hôtels', en: 'One program for all your hotels' } },
    ],
  },
  pricing: { fr: 'Module Fidélité : 39 € par mois.', en: 'Loyalty module: €39 per month.' },
  faqTitle: { fr: 'Vos questions sur la fidélité.', en: 'Your questions about loyalty.' },
  faq: [
    { q: { fr: 'Comment les points sont-ils calculés ?', en: 'How are points calculated?' }, a: { fr: 'Depuis les réservations de votre PMS : par euro, par nuit ou par séjour. Vous pouvez exclure des canaux, des segments de marché ou des statuts.', en: 'From your PMS bookings: per euro, per night or per stay. You can exclude channels, market segments or statuses.' } },
    { q: { fr: 'Les clients ont-ils un espace membre ?', en: 'Do guests have a member area?' }, a: { fr: 'Oui, à vos couleurs : points, niveau, séjours, récompenses et commandes.', en: 'Yes, in your brand: points, tier, stays, rewards and orders.' } },
    { q: { fr: 'Un programme pour plusieurs hôtels ?', en: 'One program for several hotels?' }, a: { fr: 'Oui, et vous pouvez récompenser les séjours dans plusieurs hôtels du groupe.', en: 'Yes, and you can reward stays across several group hotels.' } },
    { q: { fr: 'Les dépenses au bar ou au restaurant comptent-elles ?', en: 'Do bar or restaurant spends count?' }, a: { fr: 'Les points se calculent sur le montant de la réservation. Vos flows peuvent offrir des points pour d’autres actions.', en: 'Points are calculated on the booking amount. Your flows can give points for other actions.' } },
  ],
  cta: { title: { fr: 'Lancez votre programme de fidélité.', en: 'Launch your loyalty program.' }, text: { fr: 'Une démo de 45 minutes, pour dessiner vos règles.', en: 'A 45-minute demo, to design your rules.' } },
};

export const voiceLanding: Landing = {
  seo: {
    title: { fr: 'Appel réception : vos clients appellent l’hôtel gratuitement | TriggerFlow', en: 'Front desk call: guests call the hotel for free | TriggerFlow' },
    description: { fr: 'Un bouton « Appeler la réception » dans vos messages : vos clients vous appellent depuis leur téléphone, sans frais, même de l’étranger. Messagerie vocale transcrite et traduite.', en: 'A “Call the front desk” button in your messages: guests call you from their phone, free, even from abroad. Voicemail transcribed and translated.' },
  },
  hero: {
    eyebrow: { fr: 'Appel réception', en: 'Front desk call' },
    title: { fr: 'Vos clients appellent la réception, gratuitement, depuis leur téléphone.', en: 'Guests call the front desk, for free, from their phone.' },
    subtitle: { fr: 'Un bouton « Appeler la réception » dans vos messages, vos formulaires et votre app : l’appel passe par internet, sans frais pour le client, même depuis l’étranger. Il sonne chez la bonne personne, et rien ne se perd.', en: 'A “Call the front desk” button in your messages, forms and app: the call goes over the internet, free for the guest, even from abroad. It rings the right person, and nothing is lost.' },
    bullets: [
      { fr: 'Gratuit pour le client, même en roaming', en: 'Free for the guest, even when roaming' },
      { fr: 'Le client reconnu, avec sa réservation', en: 'The guest recognised, with their booking' },
      { fr: 'Messages vocaux transcrits et traduits', en: 'Voicemails transcribed and translated' },
    ],
    image: { src: '/images/app/calls.webp', width: 1448, height: 820, label: 'app.trigger-flow.com/appels', alt: { fr: 'Appels TriggerFlow : appels à rappeler, durée, message vocal', en: 'TriggerFlow calls: calls to return, duration, voicemail' }, caption: demoCaption },
  },
  proof: { label: { fr: 'Ils font confiance à TriggerFlow', en: 'They trust TriggerFlow' }, clients: ['AMMI Hôtels', 'Urban Bivouac', 'Edgar Hôtel & Spa'] },
  sections: [
    {
      type: 'split', tone: 'white',
      eyebrow: { fr: 'Comment ça marche', en: 'How it works' },
      title: { fr: 'Un appel qui sait qui appelle.', en: 'A call that knows who is calling.' },
      steps: [
        { title: { fr: 'Le client touche « Appeler la réception »', en: 'The guest taps “Call the front desk”' }, text: { fr: 'Dans un email, un SMS, un formulaire, sa page de clés ou l’app client.', en: 'In an email, SMS, form, their key page or the guest app.' } },
        { title: { fr: 'L’appel sonne chez la bonne personne', en: 'The call rings the right person' }, text: { fr: 'L’équipe sur l’ordinateur, la réception, le standard ou un mobile, en jusqu’à 3 étapes. Un plan pour la journée, un autre pour la nuit.', en: 'The team on the computer, the desk, the switchboard or a mobile, in up to 3 steps. One plan for the day, another for the night.' } },
        { title: { fr: 'Personne ne répond ?', en: 'Nobody answers?' }, text: { fr: 'Message vocal transcrit et traduit, ou bascule vers le chat.', en: 'Voicemail transcribed and translated, or a switch to chat.' } },
        { title: { fr: 'Tout arrive dans la messagerie', en: 'Everything lands in the inbox' }, text: { fr: 'L’appel s’inscrit dans la conversation du client. Un appel manqué devient une tâche « à rappeler ».', en: 'The call is logged in the guest’s conversation. A missed call becomes a “to call back” task.' } },
      ],
      panel: { title: { fr: 'Pour vos clients', en: 'For your guests' }, items: [
        { fr: 'Aucune application à installer', en: 'No app to install' },
        { fr: 'Aucun frais d’appel international', en: 'No international call charges' },
        { fr: 'Les numéros d’urgence affichés avant l’appel', en: 'Emergency numbers shown before the call' },
      ] },
    },
    {
      type: 'cards', tone: 'paper', cols: 3,
      eyebrow: { fr: 'Ne plus perdre d’appel', en: 'Never lose a call' },
      title: { fr: 'Chaque appel manqué est rappelé.', en: 'Every missed call gets called back.' },
      items: [
        { icon: 'phone', title: { fr: 'À rappeler', en: 'To call back' }, text: { fr: 'Les appels manqués regroupés par client, jusqu’à ce que quelqu’un réponde.', en: 'Missed calls grouped by guest, until someone replies.' } },
        { icon: 'languages', title: { fr: 'Messagerie vocale', en: 'Voicemail' }, text: { fr: 'Transcrite et traduite dans la langue de votre équipe.', en: 'Transcribed and translated into your team’s language.' } },
        { icon: 'message', title: { fr: 'Rappel par message', en: 'Callback by message' }, text: { fr: 'Répondez par SMS ou WhatsApp, dans la langue du client.', en: 'Reply by SMS or WhatsApp, in the guest’s language.' } },
      ],
    },
    {
      type: 'band',
      eyebrow: { fr: 'Liens publics', en: 'Public links' },
      title: { fr: 'Un QR code pour vous appeler, partout.', en: 'A QR code to call you, anywhere.' },
      items: [
        { icon: 'qr', title: { fr: 'QR code et affiches', en: 'QR code and posters' }, text: { fr: 'Pour la chambre, le hall ou vos supports, avec 10 modèles d’affiche.', en: 'For the room, lobby or your materials, with 10 poster templates.' } },
        { icon: 'clock', title: { fr: 'Horaires par lien', en: 'Hours per link' }, text: { fr: 'Pause, renouvellement et horaires réglables.', en: 'Pause, renewal and hours you can set.' } },
        { icon: 'shield', title: { fr: 'Protégé contre les abus', en: 'Protected against abuse' }, text: { fr: 'Limites par appareil, par lien et par mois.', en: 'Limits per device, per link and per month.' } },
        { icon: 'list', title: { fr: 'Statistiques', en: 'Statistics' }, text: { fr: 'Reçus, décrochés, manqués, rappelés, délai de rappel.', en: 'Received, answered, missed, called back, callback time.' } },
      ],
    },
  ],
  compare: {
    eyebrow: { fr: 'Pourquoi pas le numéro de l’hôtel ?', en: 'Why not the hotel number?' },
    title: { fr: 'Un numéro classique, ce sont des appels perdus.', en: 'A regular number means lost calls.' },
    other: { fr: 'Numéro de l’hôtel', en: 'Hotel phone number' },
    rows: [
      { label: { fr: 'Pour le client', en: 'For the guest' }, other: { fr: 'Appel payant depuis l’étranger', en: 'Paid call from abroad' }, us: { fr: 'Gratuit, par internet', en: 'Free, over the internet' } },
      { label: { fr: 'Qui appelle ?', en: 'Who is calling?' }, other: { fr: 'Un numéro inconnu', en: 'An unknown number' }, us: { fr: 'Le client et sa réservation', en: 'The guest and their booking' } },
      { label: { fr: 'Appel manqué', en: 'Missed call' }, other: { fr: 'Oublié', en: 'Forgotten' }, us: { fr: 'Une tâche « à rappeler »', en: 'A “to call back” task' } },
      { label: { fr: 'Message vocal', en: 'Voicemail' }, other: { fr: 'À écouter, dans sa langue', en: 'To listen to, in their language' }, us: { fr: 'Transcrit et traduit', en: 'Transcribed and translated' } },
    ],
  },
  pricing: { fr: 'Module Appel réception : à partir de 39 € par mois, selon le volume. Inclus dans All Inclusive.', en: 'Front desk call module: from €39 per month, depending on volume. Included in All Inclusive.' },
  faqTitle: { fr: 'Vos questions sur l’appel réception.', en: 'Your questions about front desk calls.' },
  faq: [
    { q: { fr: 'Le client paie-t-il l’appel ?', en: 'Does the guest pay for the call?' }, a: { fr: 'Non. L’appel passe par internet depuis le navigateur de son téléphone, même depuis l’étranger.', en: 'No. The call goes over the internet from their phone’s browser, even from abroad.' } },
    { q: { fr: 'Où l’appel sonne-t-il ?', en: 'Where does the call ring?' }, a: { fr: 'Sur TriggerFlow ouvert sur un ordinateur, et sur les numéros de votre choix : réception, standard, mobiles. Un plan pour la journée, un autre pour la nuit.', en: 'On TriggerFlow open on a computer, and on the numbers you choose: desk, switchboard, mobiles. One plan for the day, another for the night.' } },
    { q: { fr: 'Et si personne ne répond ?', en: 'What if nobody answers?' }, a: { fr: 'Le client laisse un message vocal, transcrit et traduit pour votre équipe, ou bascule vers le chat. L’appel manqué apparaît dans « À rappeler ».', en: 'The guest leaves a voicemail, transcribed and translated for your team, or switches to chat. The missed call appears in “To call back”.' } },
    { q: { fr: 'Les appels sont-ils enregistrés ?', en: 'Are calls recorded?' }, a: { fr: 'Seulement si vous l’activez. L’audio est supprimé après 30 jours.', en: 'Only if you turn it on. Audio is deleted after 30 days.' } },
  ],
  cta: { title: { fr: 'Ne manquez plus un appel client.', en: 'Never miss a guest call again.' }, text: { fr: 'Une démo de 45 minutes, avec un vrai appel.', en: 'A 45-minute demo, with a real call.' } },
};

export const housekeepingLanding: Landing = {
  seo: {
    title: { fr: 'Logiciel de gouvernance hôtel : ménage et maintenance | TriggerFlow', en: 'Hotel housekeeping software: cleaning and maintenance | TriggerFlow' },
    description: { fr: 'Plan de ménage calculé depuis le PMS, application mobile en 9 langues, inspection, maintenance et objets trouvés : la gouvernance de votre hôtel, sans papier.', en: 'Cleaning plan calculated from the PMS, mobile app in 9 languages, inspection, maintenance and lost & found: your housekeeping, paperless.' },
  },
  hero: {
    eyebrow: { fr: 'Ménage', en: 'Housekeeping' },
    title: { fr: 'Le planning du ménage se fait tout seul, à partir de votre PMS.', en: 'The cleaning plan builds itself, from your PMS.' },
    subtitle: { fr: 'Chaque matin, les chambres à faire sont calculées depuis les arrivées et les départs. La gouvernante répartit d’un glisser-déposer, les femmes de chambre suivent tout sur leur téléphone, dans leur langue.', en: 'Every morning, rooms to clean are calculated from arrivals and departures. The head housekeeper assigns by drag and drop, housekeepers follow everything on their phone, in their language.' },
    bullets: [
      { fr: 'Le statut des chambres calculé depuis les réservations', en: 'Room status calculated from bookings' },
      { fr: 'Une application mobile en 9 langues', en: 'A mobile app in 9 languages' },
      { fr: 'Maintenance et objets trouvés au même endroit', en: 'Maintenance and lost & found in one place' },
    ],
    image: { src: '/images/app/housekeeping.webp', width: 1448, height: 820, label: 'app.trigger-flow.com/menage', alt: { fr: 'Ménage TriggerFlow : chambres par statut et attribution', en: 'TriggerFlow housekeeping: rooms by status and assignment' }, caption: demoCaption },
  },
  proof: { label: { fr: 'Ils font confiance à TriggerFlow', en: 'They trust TriggerFlow' }, clients: ['AMMI Hôtels', 'Urban Bivouac', 'Hôtel Causse Comtal'] },
  sections: [
    {
      type: 'cards', tone: 'white', cols: 4,
      eyebrow: { fr: 'Pour la gouvernante', en: 'For the head housekeeper' },
      title: { fr: 'Le planning du jour,', en: 'Today’s plan,' }, titleMuted: { fr: 'prêt à 7 h.', en: 'ready at 7 am.' },
      items: [
        { icon: 'list', title: { fr: '8 statuts de chambre', en: '8 room statuses' }, text: { fr: 'Propre, sale, occupée, en cours, à contrôler, contrôlée, maintenance, bloquée.', en: 'Clean, dirty, occupied, in progress, to inspect, inspected, maintenance, blocked.' } },
        { icon: 'click', title: { fr: 'Attribution par glisser-déposer', en: 'Drag-and-drop assignment' }, text: { fr: 'Par étage ou bâtiment, avec les prévisions des jours suivants.', en: 'By floor or building, with forecasts for the coming days.' } },
        { icon: 'repeat', title: { fr: 'Règles de séjour', en: 'Stay rules' }, text: { fr: 'Changement de linge tous les N nuits, recouches, parties communes.', en: 'Linen change every N nights, stayovers, common areas.' } },
        { icon: 'check', title: { fr: 'Contrôle', en: 'Inspection' }, text: { fr: 'Validation ou refus de la chambre, si vous le souhaitez.', en: 'Room approved or rejected, if you want it.' } },
      ],
    },
    {
      type: 'split', tone: 'paper',
      eyebrow: { fr: 'Pour les équipes', en: 'For the team' },
      title: { fr: 'Sur leur téléphone, dans leur langue.', en: 'On their phone, in their language.' },
      bullets: [
        { fr: 'Mes chambres du jour et du lendemain', en: 'My rooms for today and tomorrow' },
        { fr: 'Fiche de nettoyage avec chronomètre et liste de contrôle', en: 'Cleaning sheet with timer and checklist' },
        { fr: 'Ne pas déranger, notes, signalements avec photo', en: 'Do not disturb, notes, reports with photos' },
        { fr: 'Messages vocaux transcrits et traduits en français', en: 'Voice messages transcribed and translated into French' },
        { fr: 'Messagerie interne traduite automatiquement', en: 'Internal messaging translated automatically' },
      ],
      panel: { title: { fr: '9 langues', en: '9 languages' }, items: [
        { fr: 'Français, anglais, espagnol, portugais', en: 'French, English, Spanish, Portuguese' },
        { fr: 'Roumain, ukrainien, russe', en: 'Romanian, Ukrainian, Russian' },
        { fr: 'Géorgien, arabe', en: 'Georgian, Arabic' },
      ] },
    },
    {
      type: 'band',
      eyebrow: { fr: 'Maintenance et objets trouvés', en: 'Maintenance and lost & found' },
      title: { fr: 'Plus rien ne se perd entre deux équipes.', en: 'Nothing gets lost between shifts.' },
      items: [
        { icon: 'bell', title: { fr: 'Tickets de maintenance', en: 'Maintenance tickets' }, text: { fr: 'Catégorie, priorité, technicien, commentaires, alertes.', en: 'Category, priority, technician, comments, alerts.' } },
        { icon: 'camera', title: { fr: 'Objets trouvés', en: 'Lost & found' }, text: { fr: 'Photo, chambre et dernier client, alerte par email.', en: 'Photo, room and last guest, email alert.' } },
        { icon: 'list', title: { fr: 'Statistiques', en: 'Statistics' }, text: { fr: 'Temps moyen de nettoyage, chambres problématiques, délai de résolution.', en: 'Average cleaning time, problem rooms, resolution time.' } },
        { icon: 'clock', title: { fr: 'Pour la réception', en: 'For the front desk' }, text: { fr: 'Les arrivées prêtes, en attente ou en retard, en direct.', en: 'Arrivals ready, pending or late, live.' } },
      ],
    },
  ],
  compare: {
    eyebrow: { fr: 'Pourquoi pas la feuille papier ?', en: 'Why not the paper sheet?' },
    title: { fr: 'La feuille du matin est fausse à 10 h.', en: 'The morning sheet is wrong by 10 am.' },
    other: { fr: 'Feuille papier et talkie', en: 'Paper sheet and walkie-talkie' },
    rows: [
      { label: { fr: 'Planning', en: 'Plan' }, other: { fr: 'Recopié depuis le PMS', en: 'Copied from the PMS' }, us: { fr: 'Calculé automatiquement', en: 'Calculated automatically' } },
      { label: { fr: 'Statut', en: 'Status' }, other: { fr: 'Appel à la réception', en: 'A call to the desk' }, us: { fr: 'En direct, pour tout le monde', en: 'Live, for everyone' } },
      { label: { fr: 'Langue', en: 'Language' }, other: { fr: 'Celle de la feuille', en: 'The sheet’s language' }, us: { fr: 'Celle de chaque employé', en: 'Each employee’s own' } },
      { label: { fr: 'Problèmes', en: 'Issues' }, other: { fr: 'Notés sur un coin de feuille', en: 'Scribbled on the sheet' }, us: { fr: 'Ticket avec photo et suivi', en: 'Ticket with photo and tracking' } },
    ],
  },
  pricing: { fr: 'Module Ménage : 29 € par mois.', en: 'Housekeeping module: €29 per month.' },
  faqTitle: { fr: 'Vos questions sur le ménage.', en: 'Your questions about housekeeping.' },
  faq: [
    { q: { fr: 'Faut-il installer une application ?', en: 'Do staff need to install an app?' }, a: { fr: 'Non, l’application s’ajoute à l’écran d’accueil du téléphone depuis le navigateur.', en: 'No, the app is added to the phone’s home screen from the browser.' } },
    { q: { fr: 'Le statut des chambres remonte-t-il dans le PMS ?', en: 'Does room status go back to the PMS?' }, a: { fr: 'Les arrivées et départs sont lus dans votre PMS. L’écriture du statut de ménage dans le PMS est disponible avec Medialog, et d’autres PMS suivront.', en: 'Arrivals and departures are read from your PMS. Writing cleaning status back is available with Medialog, with more PMS to follow.' } },
    { q: { fr: 'Dans quelles langues ?', en: 'In which languages?' }, a: { fr: 'Neuf langues pour l’application des équipes, avec des messages traduits automatiquement.', en: 'Nine languages for the staff app, with automatically translated messages.' } },
  ],
  cta: { title: { fr: 'Des chambres prêtes à l’heure.', en: 'Rooms ready on time.' }, text: { fr: 'Une démo de 45 minutes, avec votre gouvernante.', en: 'A 45-minute demo, with your head housekeeper.' } },
};

export const keysLanding: Landing = {
  seo: {
    title: { fr: 'Clés digitales pour hôtel : codes Igloohome et Sesame | TriggerFlow', en: 'Digital hotel keys: Igloohome and Sesame codes | TriggerFlow' },
    description: { fr: 'Vos clients récupèrent leur code de porte sur leur téléphone avant d’arriver, valable pendant leur séjour. Idéal pour les arrivées tardives et sans réception.', en: 'Guests get their door code on their phone before arriving, valid for their stay. Ideal for late arrivals and unstaffed properties.' },
  },
  hero: {
    eyebrow: { fr: 'Clés', en: 'Keys' },
    title: { fr: 'La clé de la chambre, sur le téléphone du client.', en: 'The room key, on the guest’s phone.' },
    subtitle: { fr: 'Avant l’arrivée, le client ouvre un lien et récupère son code de porte, valable du check-in au check-out. Arrivées tardives, réception fermée, maisons d’hôtes : il entre sans attendre.', en: 'Before arrival, the guest opens a link and gets their door code, valid from check-in to check-out. Late arrivals, closed desk, guesthouses: they get in without waiting.' },
    bullets: [
      { fr: 'Codes Igloohome et Sesame, liés à la réservation', en: 'Igloohome and Sesame codes, linked to the booking' },
      { fr: 'Disponibles 48 h avant l’arrivée, valables pendant le séjour', en: 'Available 48 h before arrival, valid for the stay' },
      { fr: 'Un bouton pour appeler la réception, gratuitement', en: 'A button to call the front desk, for free' },
    ],
  },
  proof: { label: { fr: 'Ils font confiance à TriggerFlow', en: 'They trust TriggerFlow' }, clients: ['Urban Bivouac', 'Odomo', 'BonjourSauvage'] },
  sections: [
    {
      type: 'split', tone: 'white',
      eyebrow: { fr: 'Le parcours', en: 'The journey' },
      title: { fr: 'Du message de bienvenue à la porte.', en: 'From welcome message to the door.' },
      steps: [
        { title: { fr: 'Le lien part dans vos messages', en: 'The link goes out in your messages' }, text: { fr: 'Par email, SMS ou WhatsApp, au moment choisi dans vos flows.', en: 'By email, SMS or WhatsApp, when your flows decide.' } },
        { title: { fr: 'Le client récupère ses accès', en: 'The guest gets their access' }, text: { fr: 'À partir de 48 h avant l’arrivée, pour chacune de ses chambres.', en: 'From 48 h before arrival, for each of their rooms.' } },
        { title: { fr: 'Il entre', en: 'They walk in' }, text: { fr: 'Code ou QR code, disponible même hors connexion, en PDF.', en: 'Code or QR code, available offline, as PDF.' } },
      ],
      panel: { title: { fr: 'Sur la page des clés', en: 'On the key page' }, items: [
        { fr: 'Code, QR code ou les deux, selon votre choix', en: 'Code, QR code or both, your choice' },
        { fr: 'Vos instructions dans la langue du client', en: 'Your instructions in the guest’s language' },
        { fr: 'Boutons pour appeler ou écrire à l’hôtel', en: 'Buttons to call or write to the hotel' },
        { fr: 'Le lien s’arrête après le séjour', en: 'The link stops after the stay' },
      ] },
    },
    {
      type: 'table', tone: 'paper',
      eyebrow: { fr: 'Serrures compatibles', en: 'Compatible locks' },
      title: { fr: 'Deux fabricants connectés.', en: 'Two manufacturers connected.' },
      head: [{ fr: 'Serrure', en: 'Lock' }, { fr: 'Code', en: 'Code' }, { fr: 'QR code', en: 'QR code' }, { fr: 'Validité', en: 'Validity' }],
      rows: [
        { label: 'Igloohome', cells: [true, false, { fr: 'Check-in à check-out', en: 'Check-in to check-out' }] },
        { label: 'Sesame', cells: [true, true, { fr: 'Arrivée à départ', en: 'Arrival to departure' }] },
      ],
    },
  ],
  compare: {
    eyebrow: { fr: 'Pourquoi pas une boîte à clés ?', en: 'Why not a key box?' },
    title: { fr: 'Un code partagé, c’est un code qui circule.', en: 'A shared code is a code that circulates.' },
    other: { fr: 'Boîte à clés', en: 'Key box' },
    rows: [
      { label: { fr: 'Code', en: 'Code' }, other: { fr: 'Le même pour tout le monde', en: 'The same for everyone' }, us: { fr: 'Un par réservation', en: 'One per booking' } },
      { label: { fr: 'Validité', en: 'Validity' }, other: { fr: 'Jusqu’au prochain changement', en: 'Until the next change' }, us: { fr: 'Le temps du séjour', en: 'For the stay' } },
      { label: { fr: 'Envoi', en: 'Sending' }, other: { fr: 'Copié à la main', en: 'Copied by hand' }, us: { fr: 'Dans vos messages automatiques', en: 'In your automated messages' } },
      { label: { fr: 'Aide', en: 'Help' }, other: { fr: 'Un numéro sur un papier', en: 'A number on paper' }, us: { fr: 'Appel gratuit à la réception', en: 'Free call to the front desk' } },
    ],
  },
  pricing: { fr: 'Module au choix dans vos formules, inclus dans All Inclusive.', en: 'A module of your choice in your plan, included in All Inclusive.' },
  faqTitle: { fr: 'Vos questions sur les clés digitales.', en: 'Your questions about digital keys.' },
  faq: [
    { q: { fr: 'Quelles serrures sont compatibles ?', en: 'Which locks are compatible?' }, a: { fr: 'Igloohome et Sesame. Contactez-nous pour une autre marque.', en: 'Igloohome and Sesame. Contact us for another brand.' } },
    { q: { fr: 'Quand le client reçoit-il son code ?', en: 'When does the guest get the code?' }, a: { fr: 'Il récupère ses accès depuis le lien envoyé dans vos messages, à partir de 48 h avant l’arrivée (délai réglable).', en: 'They get their access from the link in your messages, from 48 h before arrival (adjustable).' } },
    { q: { fr: 'Le code fonctionne-t-il après le départ ?', en: 'Does the code work after departure?' }, a: { fr: 'Non, il est valable pendant le séjour, et le lien s’arrête après le départ.', en: 'No, it is valid for the stay, and the link stops after departure.' } },
  ],
  cta: { title: { fr: 'Accueillez vos clients à toute heure.', en: 'Welcome guests at any hour.' }, text: { fr: 'Une démo de 45 minutes, avec vos serrures.', en: 'A 45-minute demo, with your locks.' } },
};

/**
 * Landing Statistiques (audit origin/main du 11/11/2026) : 6 onglets BI, KPI hôteliers, comparaison de périodes,
 * filtre par segment, calendrier OTB 90 jours, tableau de bord à 48 modules, classement des hôtels d'un groupe, export CSV.
 * Ne PAS affirmer : fenêtre de réservation, pickup / prévisions / budget, export PDF, rapports envoyés par email,
 * commentaires IA sur les chiffres.
 */
export const analyticsLanding: Landing = {
  seo: {
    title: { fr: 'Statistiques hôtel : RevPAR, part directe, clients | TriggerFlow', en: 'Hotel analytics: RevPAR, direct share, guests | TriggerFlow' },
    description: { fr: 'Occupation, ADR, RevPAR, part des réservations directes, clients fidèles, communication et e-réputation : les chiffres de votre hôtel, calculés depuis votre PMS.', en: 'Occupancy, ADR, RevPAR, direct booking share, repeat guests, communication and reputation: your hotel’s numbers, calculated from your PMS.' },
  },
  hero: {
    eyebrow: { fr: 'Statistiques', en: 'Analytics' },
    title: { fr: 'Les chiffres de votre hôtel, sans tableur.', en: 'Your hotel’s numbers, without a spreadsheet.' },
    subtitle: { fr: 'Occupation, RevPAR, part des réservations directes, clients fidèles, résultats de vos messages et de vos avis : tout est calculé chaque nuit depuis votre PMS, comparable d’une période à l’autre et filtrable par segment.', en: 'Occupancy, RevPAR, direct booking share, repeat guests, results of your messages and reviews: all calculated nightly from your PMS, comparable across periods and filterable by segment.' },
    bullets: [
      { fr: 'Les indicateurs hôteliers, calculés depuis votre PMS', en: 'Hotel KPIs, calculated from your PMS' },
      { fr: 'Chaque chiffre comparé à la période précédente', en: 'Every figure compared with the previous period' },
      { fr: 'Pour un hôtel ou tout un groupe', en: 'For one hotel or a whole group' },
    ],
    image: { src: '/images/app/analytics.webp', width: 1400, height: 866, label: 'app.trigger-flow.com/bi', alt: { fr: 'Statistiques TriggerFlow : occupation, ADR, RevPAR, TRevPAR, annulations et durée moyenne de séjour', en: 'TriggerFlow analytics: occupancy, ADR, RevPAR, TRevPAR, cancellations and average length of stay' }, caption: demoCaption },
  },
  proof: { label: { fr: 'Ils font confiance à TriggerFlow', en: 'They trust TriggerFlow' }, clients: ['Groupe Noemys', 'AMMI Hôtels', 'Edgar Hôtel & Spa'] },
  sections: [
    {
      type: 'cards', tone: 'white', cols: 3,
      eyebrow: { fr: 'Six tableaux prêts', en: 'Six ready-made views' },
      title: { fr: 'Tout ce qu’un directeur regarde,', en: 'Everything a GM looks at,' }, titleMuted: { fr: 'au même endroit.', en: 'in one place.' },
      items: [
        { icon: 'list', title: { fr: 'Vue d’ensemble', en: 'Overview' }, text: { fr: 'Occupation, ADR, RevPAR, TRevPAR, annulations, durée moyenne de séjour, et le calendrier des 90 prochains jours.', en: 'Occupancy, ADR, RevPAR, TRevPAR, cancellations, average stay, and the next 90 days on the books.' } },
        { icon: 'card', title: { fr: 'Revenus', en: 'Revenue' }, text: { fr: 'Hébergement et extras, par type de chambre, top des extras, ADR par jour de la semaine.', en: 'Rooms and extras, by room type, top extras, ADR by day of the week.' } },
        { icon: 'users', title: { fr: 'Clients', en: 'Guests' }, text: { fr: 'Nouveaux et fidèles, valeur client, nationalités, base joignable, adresses OTA masquées.', en: 'New and returning, lifetime value, nationalities, reachable base, masked OTA addresses.' } },
        { icon: 'mail', title: { fr: 'Communication', en: 'Communication' }, text: { fr: 'Emails, SMS et WhatsApp envoyés, ouvertures, clics, rebonds, flows les plus actifs.', en: 'Emails, SMS and WhatsApp sent, opens, clicks, bounces, most active flows.' } },
        { icon: 'star', title: { fr: 'E-réputation', en: 'Reputation' }, text: { fr: 'Note par plateforme, taux et délai de réponse, avis générés par séjour.', en: 'Rating per platform, reply rate and time, reviews generated per stay.' } },
        { icon: 'globe', title: { fr: 'Distribution', en: 'Distribution' }, text: { fr: 'Part des réservations directes, panier direct contre OTA, commissions estimées, mix des canaux.', en: 'Direct booking share, direct vs OTA basket, estimated commissions, channel mix.' } },
      ],
    },
    {
      type: 'split', tone: 'paper',
      eyebrow: { fr: 'Comparer', en: 'Compare' },
      title: { fr: 'Ce qui change, et pour quels clients.', en: 'What changes, and for which guests.' },
      bullets: [
        { fr: 'Chaque indicateur avec sa valeur précédente et son évolution', en: 'Every KPI with its previous value and change' },
        { fr: 'Comparaison de deux périodes au choix', en: 'Comparison of any two periods' },
        { fr: 'Filtre par segment : vos clients fidèles, vos clients OTA, vos entreprises…', en: 'Filter by segment: repeat guests, OTA guests, companies…' },
        { fr: 'Vos sources de réservation rangées par canal, avec leur commission', en: 'Your booking sources grouped by channel, with their commission' },
        { fr: 'Export CSV de chaque tableau', en: 'CSV export of every view' },
      ],
      figure: { value: '90 j', label: { fr: 'de réservations à venir, jour par jour : chambres vendues, occupation, revenu, arrivées et départs', en: 'of upcoming bookings, day by day: rooms sold, occupancy, revenue, arrivals and departures' } },
    },
    {
      type: 'band',
      eyebrow: { fr: 'Votre tableau de bord', en: 'Your dashboard' },
      title: { fr: 'Un écran d’accueil fait pour chaque poste.', en: 'A home screen built for every role.' },
      items: [
        { icon: 'bed', title: { fr: 'Réception', en: 'Front desk' }, text: { fr: 'Arrivées, présents, départs et commandes du jour.', en: 'Today’s arrivals, in-house guests, departures and orders.' } },
        { icon: 'card', title: { fr: 'Direction', en: 'Management' }, text: { fr: 'Revenus, paiements, résultats des campagnes.', en: 'Revenue, payments, campaign results.' } },
        { icon: 'clipboard', title: { fr: 'Gouvernante', en: 'Housekeeping' }, text: { fr: 'Chambres, équipes, maintenance, objets trouvés.', en: 'Rooms, staff, maintenance, lost & found.' } },
        { icon: 'list', title: { fr: '48 modules', en: '48 modules' }, text: { fr: 'À ajouter, déplacer et redimensionner selon vos besoins.', en: 'To add, move and resize as you need.' } },
      ],
    },
    {
      type: 'cards', tone: 'white', cols: 3,
      eyebrow: { fr: 'Pour les groupes', en: 'For groups' },
      title: { fr: 'Comparez vos hôtels sur ce qui compte.', en: 'Compare your hotels on what matters.' },
      items: [
        { icon: 'building', title: { fr: 'Classement des hôtels', en: 'Hotel ranking' }, text: { fr: 'Note des avis, NPS, revenu des campagnes et des ventes additionnelles par arrivée, taux d’emails récupérés.', en: 'Review rating, NPS, campaign and upsell revenue per arrival, email capture rate.' } },
        { icon: 'users', title: { fr: 'Mon hôtel dans le groupe', en: 'My hotel in the group' }, text: { fr: 'Chaque directeur voit son rang et la moyenne du groupe.', en: 'Each GM sees their rank and the group average.' } },
        { icon: 'globe', title: { fr: 'Tous les hôtels ensemble', en: 'All hotels together' }, text: { fr: 'Les statistiques consolidées de tout le groupe, en un clic.', en: 'Consolidated statistics for the whole group, in one click.' } },
      ],
    },
  ],
  compare: {
    eyebrow: { fr: 'Pourquoi pas les rapports du PMS ?', en: 'Why not the PMS reports?' },
    title: { fr: 'Le PMS sait ce qui est vendu. Pas ce qui a marché.', en: 'The PMS knows what was sold. Not what worked.' },
    other: { fr: 'Rapports du PMS et tableur', en: 'PMS reports and spreadsheet' },
    rows: [
      { label: { fr: 'Préparation', en: 'Preparation' }, other: { fr: 'Exports à retraiter chaque mois', en: 'Exports to rework every month' }, us: { fr: 'Calculé chaque nuit', en: 'Calculated nightly' } },
      { label: { fr: 'Clients', en: 'Guests' }, other: { fr: 'Des réservations, pas des clients', en: 'Bookings, not guests' }, us: { fr: 'Nouveaux, fidèles, valeur client', en: 'New, returning, lifetime value' } },
      { label: { fr: 'Relation client', en: 'Guest relations' }, other: { fr: 'Absente', en: 'Missing' }, us: { fr: 'Messages, avis et ventes additionnelles', en: 'Messages, reviews and upsells' } },
      { label: { fr: 'Groupe', en: 'Group' }, other: { fr: 'Un fichier par hôtel', en: 'One file per hotel' }, us: { fr: 'Classement et vue consolidée', en: 'Ranking and consolidated view' } },
    ],
  },
  pricing: { fr: 'Les statistiques sont incluses dans toutes les formules.', en: 'Analytics is included in every plan.' },
  faqTitle: { fr: 'Vos questions sur les statistiques.', en: 'Your questions about analytics.' },
  faq: [
    { q: { fr: 'D’où viennent les chiffres ?', en: 'Where do the numbers come from?' }, a: { fr: 'De votre PMS, synchronisé avec TriggerFlow, et de tout ce qui se passe dans TriggerFlow : messages, ventes, avis. Les statistiques sont recalculées chaque nuit.', en: 'From your PMS, synced with TriggerFlow, and from everything in TriggerFlow: messages, sales, reviews. Statistics are recalculated nightly.' } },
    { q: { fr: 'Comment est calculée la commission des OTA ?', en: 'How is OTA commission calculated?' }, a: { fr: 'C’est une estimation : vous rangez chaque source de réservation dans un canal et indiquez son taux de commission.', en: 'It is an estimate: you assign each booking source to a channel and set its commission rate.' } },
    { q: { fr: 'Peut-on exporter les données ?', en: 'Can I export the data?' }, a: { fr: 'Oui, chaque tableau s’exporte en CSV, ainsi que le classement des hôtels d’un groupe.', en: 'Yes, every view exports to CSV, as does the group hotel ranking.' } },
    { q: { fr: 'Faites-vous des prévisions ?', en: 'Do you forecast?' }, a: { fr: 'Pas de prévision ni de budget aujourd’hui. Le calendrier des 90 prochains jours montre ce qui est déjà réservé.', en: 'No forecasting or budget today. The next-90-days calendar shows what is already booked.' } },
  ],
  cta: { title: { fr: 'Pilotez votre hôtel avec les bons chiffres.', en: 'Run your hotel with the right numbers.' }, text: { fr: 'Une démo de 45 minutes, avec les données de votre PMS.', en: 'A 45-minute demo, with your PMS data.' } },
};
