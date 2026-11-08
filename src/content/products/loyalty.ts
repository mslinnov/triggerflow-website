import type { ProductLanding } from './types';

export const loyalty: ProductLanding = {
  slug: 'loyalty',
  legacySlug: 'fidelite',
  name: { fr: 'Fidélité', en: 'Loyalty' },
  seo: {
    title: { fr: 'Programme de fidélité hôtel : réservations directes | TriggerFlow', en: 'Hotel loyalty programme: more direct bookings | TriggerFlow' },
    description: { fr: 'Points, paliers, récompenses et carte Apple Wallet : un programme de fidélité à vos règles, qui fait revenir vos clients en direct.', en: 'Points, tiers, rewards and an Apple Wallet card: a loyalty programme on your terms that brings guests back direct.' },
  },
  hero: {
    title: { fr: 'Vos clients reviennent en direct, pas via une OTA.', en: 'Your guests come back direct, not through an OTA.' },
    subtitle: { fr: 'Points, paliers et récompenses à vos règles, une carte dans Apple Wallet, des messages automatiques à chaque palier. Le programme des grandes chaînes, à la taille de votre hôtel.', en: 'Points, tiers and rewards on your terms, a card in Apple Wallet, automatic messages at every tier. A chain-style programme, sized for your hotel.' },
    visual: 'loyalty',
  },
  proof: { clients: [] },
  problem: {
    title: { fr: 'Un client conquis repart souvent… vers l’OTA.', en: 'A delighted guest often goes back… to the OTA.' },
    items: [
      { fr: 'Rien ne le pousse à réserver en direct la fois suivante.', en: 'Nothing encourages them to book direct next time.' },
      { fr: 'Les cartes de fidélité papier se perdent et ne se suivent pas.', en: 'Paper loyalty cards get lost and can’t be tracked.' },
      { fr: 'Les programmes des chaînes sont hors de portée d’un indépendant.', en: 'Chain programmes are out of reach for an independent.' },
    ],
  },
  how: {
    title: { fr: 'Un programme simple pour le client, automatique pour vous.', en: 'Simple for the guest, automatic for you.' },
    steps: [
      { title: { fr: 'Définissez vos règles', en: 'Set your rules' }, text: { fr: 'Points par séjour ou par dépense, paliers, récompenses.', en: 'Points per stay or per spend, tiers, rewards.' } },
      { title: { fr: 'Les points se créditent seuls', en: 'Points are credited automatically' }, text: { fr: 'À partir des séjours remontés du PMS.', en: 'From stays synced from the PMS.' } },
      { title: { fr: 'Le client voit tout dans son Wallet', en: 'The guest sees it all in their Wallet' }, text: { fr: 'Carte Apple Wallet et messages à chaque palier.', en: 'Apple Wallet card and messages at every tier.' } },
    ],
  },
  features: {
    title: { fr: 'La fidélité, sans carte en carton.', en: 'Loyalty, without a cardboard card.' },
    items: [
      { icon: 'layers', title: { fr: 'Niveaux et paliers', en: 'Levels and tiers' }, text: { fr: 'Silver, Gold ou vos propres noms.', en: 'Silver, Gold or your own names.' } },
      { icon: 'sparkles', title: { fr: 'Récompenses à votre main', en: 'Rewards your way' }, text: { fr: 'Nuit offerte, surclassement, dîner, late check-out.', en: 'Free night, upgrade, dinner, late check-out.' } },
      { icon: 'creditCard', title: { fr: 'Carte Apple Wallet', en: 'Apple Wallet card' }, text: { fr: 'Toujours dans la poche du client, mise à jour seule.', en: 'Always in the guest’s pocket, updated automatically.' } },
      { icon: 'bell', title: { fr: 'Messages automatiques', en: 'Automatic messages' }, text: { fr: 'Bienvenue, palier atteint, points qui expirent.', en: 'Welcome, tier reached, points expiring.' } },
      { icon: 'users', title: { fr: 'Sur la fiche client', en: 'On the guest profile' }, text: { fr: 'L’équipe reconnaît le client fidèle dès l’arrivée.', en: 'The team recognises loyal guests on arrival.' } },
      { icon: 'barChart', title: { fr: 'Suivi du programme', en: 'Programme tracking' }, text: { fr: 'Membres, points émis, récompenses utilisées.', en: 'Members, points issued, rewards used.' } },
    ],
  },
  tailored: {
    title: { fr: 'Taillé pour votre hôtel.', en: 'Shaped around your hotel.' },
    items: [
      { client: { fr: 'Hôtel de loisirs', en: 'Leisure hotel' }, text: { fr: 'Des points par nuit et une nuit offerte au palier Gold.', en: 'Points per night and a free night at Gold tier.' } },
      { client: { fr: 'Hôtel-restaurant', en: 'Hotel with restaurant' }, text: { fr: 'Des points sur les dépenses au restaurant et au spa.', en: 'Points on restaurant and spa spend.' } },
      { client: { fr: 'Groupe', en: 'Group' }, text: { fr: 'Un programme commun à tous vos établissements.', en: 'One programme across all your properties.' } },
    ],
  },
  integrations: { title: { fr: 'Les séjours du PMS créditent les points.', en: 'PMS stays credit the points.' }, text: { fr: 'Aucune saisie : les séjours et dépenses remontent du PMS.', en: 'No data entry: stays and spend come from the PMS.' }, extra: ['Apple Wallet'] },
  related: [
    { slug: 'campaigns', href: '/produit/campaigns', name: { fr: 'Campagnes', en: 'Campaigns' }, text: { fr: 'Des offres réservées aux membres.', en: 'Member-only offers.' } },
    { slug: 'crm', href: '/produit/crm', name: { fr: 'CRM', en: 'CRM' }, text: { fr: 'Chaque membre reconnu.', en: 'Every member recognised.' } },
    { slug: 'flows', href: '/produit/flows', name: { fr: 'Flows', en: 'Flows' }, text: { fr: 'Les messages de chaque palier.', en: 'Messages for every tier.' } },
  ],
  pricing: { text: { fr: 'Module complémentaire, à ajouter à votre formule.', en: 'Add-on module, added to your plan.' }, addon: 'loyalty' },
  faq: [
    { q: { fr: 'Le client doit-il télécharger une application ?', en: 'Does the guest need an app?' }, a: { fr: 'Non : la carte s’ajoute à Apple Wallet en un clic.', en: 'No: the card is added to Apple Wallet in one tap.' } },
    { q: { fr: 'Comment les points sont-ils crédités ?', en: 'How are points credited?' }, a: { fr: 'Automatiquement, à partir des séjours et dépenses remontés du PMS, selon vos règles.', en: 'Automatically, from stays and spend synced from the PMS, according to your rules.' } },
    { q: { fr: 'Puis-je choisir mes récompenses ?', en: 'Can I choose my rewards?' }, a: { fr: 'Oui, paliers et récompenses sont entièrement définis par vous.', en: 'Yes, tiers and rewards are entirely defined by you.' } },
    { q: { fr: 'Et pour un groupe ?', en: 'What about a group?' }, a: { fr: 'Le programme peut être commun à plusieurs établissements.', en: 'The programme can be shared across several properties.' } },
  ],
  cta: { title: { fr: 'Faites revenir vos clients en direct.', en: 'Bring your guests back direct.' } },
};
