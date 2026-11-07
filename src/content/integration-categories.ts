import type { L } from './products';

/**
 * Pages /integrations/<catégorie> (docs/arborescence.md). Les logos et noms viennent de
 * integrationCategories (IntegrationsContent.tsx) ; ici, seulement le texte propre à chaque page.
 * Téléphonie : pas de page tant qu'aucun connecteur tiers n'existe (Appel réception est un module TriggerFlow).
 */
export interface IntegrationCategoryPage {
  slug: string;
  /** Clé dans integrationCategories et dans messages integrations.categories. */
  key: 'payments' | 'hardware' | 'reviews' | 'messaging' | 'other';
  title: L;
  subtitle: L;
  uses: { title: L; text: L }[];
  note?: L;
  product: { slug: string; label: L };
}

export const integrationCategoryPages: Record<string, IntegrationCategoryPage> = {
  paiement: {
    slug: 'paiement',
    key: 'payments',
    title: { fr: 'Encaissez avant l’arrivée, avec votre solution de paiement.', en: 'Get paid before arrival, with your payment provider.' },
    subtitle: {
      fr: 'Stripe, PayZen, Systempay ou les liens de paiement Thaïs : TriggerFlow envoie le lien au bon moment et l’encaissement remonte dans la fiche du client.',
      en: 'Stripe, PayZen, Systempay or Thaïs payment links: TriggerFlow sends the link at the right time and the payment shows up in the guest profile.',
    },
    uses: [
      { title: { fr: 'Prépaiements et acomptes', en: 'Prepayments and deposits' }, text: { fr: 'Un lien de paiement part automatiquement après la réservation, relancé si besoin.', en: 'A payment link goes out automatically after booking, with reminders if needed.' } },
      { title: { fr: 'Extras et upsell', en: 'Extras and upsell' }, text: { fr: 'Surclassement, petit-déjeuner, arrivée anticipée : payés en ligne au moment de la commande.', en: 'Upgrade, breakfast, early check-in: paid online when ordered.' } },
      { title: { fr: 'Apple Pay et Google Pay', en: 'Apple Pay and Google Pay' }, text: { fr: 'Le client paie depuis son téléphone, sans saisir sa carte.', en: 'Guests pay from their phone, without typing their card.' } },
    ],
    product: { slug: 'pay', label: { fr: 'Découvrir Pay', en: 'Discover Pay' } },
  },
  serrures: {
    slug: 'serrures',
    key: 'hardware',
    title: { fr: 'Le code de la chambre, envoyé tout seul.', en: 'The room code, sent automatically.' },
    subtitle: {
      fr: 'Connectez vos serrures et boîtes à clés : TriggerFlow génère l’accès et l’envoie au client avant son arrivée, par email, SMS ou WhatsApp.',
      en: 'Connect your locks and key boxes: TriggerFlow creates the access and sends it to the guest before arrival, by email, SMS or WhatsApp.',
    },
    uses: [
      { title: { fr: 'Arrivée autonome', en: 'Self check-in' }, text: { fr: 'Le code part le jour de l’arrivée, valable sur les dates du séjour.', en: 'The code goes out on arrival day, valid for the stay dates.' } },
      { title: { fr: 'Arrivées tardives', en: 'Late arrivals' }, text: { fr: 'Plus besoin d’attendre un client qui arrive à 23 h.', en: 'No more waiting up for a guest arriving at 11pm.' } },
      { title: { fr: 'Dans vos scénarios', en: 'Inside your scenarios' }, text: { fr: 'L’envoi du code devient une étape de vos flows, avec vos conditions.', en: 'Sending the code becomes a step in your flows, with your conditions.' } },
    ],
    note: { fr: 'Salto est en cours d’intégration.', en: 'Salto integration is in progress.' },
    product: { slug: 'keys', label: { fr: 'Découvrir Clés', en: 'Discover Keys' } },
  },
  avis: {
    slug: 'avis',
    key: 'reviews',
    title: { fr: 'Plus d’avis, et des réponses plus rapides.', en: 'More reviews, and faster replies.' },
    subtitle: {
      fr: 'Google, TripAdvisor, Booking et Airbnb : invitez vos clients à publier au bon moment et suivez vos avis au même endroit.',
      en: 'Google, TripAdvisor, Booking and Airbnb: invite guests to post at the right time and follow your reviews in one place.',
    },
    uses: [
      { title: { fr: 'Invitation après le séjour', en: 'Post-stay invitation' }, text: { fr: 'Une enquête au départ, puis le lien vers la bonne plateforme.', en: 'A survey at checkout, then the link to the right platform.' } },
      { title: { fr: 'Alerte en cas de note basse', en: 'Low-score alerts' }, text: { fr: 'Votre responsable est prévenu et rappelle le client.', en: 'Your manager is alerted and calls the guest back.' } },
      { title: { fr: 'Réponses avec l’IA', en: 'AI-assisted replies' }, text: { fr: 'Une réponse proposée, que vous relisez avant de publier.', en: 'A suggested reply that you review before posting.' } },
    ],
    product: { slug: 'reviews', label: { fr: 'Découvrir Avis', en: 'Discover Reviews' } },
  },
  canaux: {
    slug: 'canaux',
    key: 'messaging',
    title: { fr: 'Tous vos canaux, dans une seule boîte.', en: 'All your channels, in one inbox.' },
    subtitle: {
      fr: 'Email, SMS, WhatsApp et messages des OTA : TriggerFlow envoie vos messages sur le canal préféré du client et réunit les réponses au même endroit.',
      en: 'Email, SMS, WhatsApp and OTA messages: TriggerFlow sends on the guest’s preferred channel and brings replies into one place.',
    },
    uses: [
      { title: { fr: 'Votre propre adresse email', en: 'Your own email address' }, text: { fr: 'Microsoft 365, Google Workspace ou votre serveur SMTP : les emails partent de votre domaine.', en: 'Microsoft 365, Google Workspace or your SMTP server: emails go out from your domain.' } },
      { title: { fr: 'SMS et WhatsApp', en: 'SMS and WhatsApp' }, text: { fr: 'Les messages courts là où vos clients les lisent.', en: 'Short messages where guests actually read them.' } },
      { title: { fr: 'Messages des OTA', en: 'OTA messages' }, text: { fr: 'Expedia via les emails relais, Airbnb via des formulaires envoyés automatiquement.', en: 'Expedia through relay emails, Airbnb through automatically sent forms.' } },
    ],
    note: { fr: 'La connexion native à la messagerie Booking.com est en cours.', en: 'Native Booking.com messaging is in progress.' },
    product: { slug: 'inbox', label: { fr: 'Découvrir la messagerie', en: 'Discover the inbox' } },
  },
  automatisation: {
    slug: 'automatisation',
    key: 'other',
    title: { fr: 'Connectez TriggerFlow au reste de vos outils.', en: 'Connect TriggerFlow to the rest of your tools.' },
    subtitle: {
      fr: 'Zapier, Make, n8n, webhooks et API : quand un outil n’a pas de connecteur natif, vous le reliez quand même.',
      en: 'Zapier, Make, n8n, webhooks and API: when a tool has no native connector, you can still link it.',
    },
    uses: [
      { title: { fr: 'Webhooks sortants', en: 'Outgoing webhooks' }, text: { fr: 'Un événement TriggerFlow prévient votre outil en temps réel.', en: 'A TriggerFlow event notifies your tool in real time.' } },
      { title: { fr: 'Zapier, Make et n8n', en: 'Zapier, Make and n8n' }, text: { fr: 'Des milliers d’applications à portée de vos scénarios.', en: 'Thousands of apps within reach of your scenarios.' } },
      { title: { fr: 'API', en: 'API' }, text: { fr: 'Pour vos développements sur mesure.', en: 'For your custom developments.' } },
    ],
    product: { slug: 'flows', label: { fr: 'Découvrir Flows', en: 'Discover Flows' } },
  },
};
