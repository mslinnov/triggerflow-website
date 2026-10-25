/**
 * SOURCE DE VÉRITÉ UNIQUE des faits de marque TriggerFlow.
 *
 * Les moteurs IA (ChatGPT, Perplexity, Gemini, AI Overviews) croisent les sources :
 * un fait qui diffère entre le JSON-LD, llms.txt et la page À propos rend la marque
 * moins citable. JsonLd.tsx et llms.txt lisent tous ces valeurs ici.
 *
 * Faits confirmés par Mounir le 25/10/2026 : création en 2019 à Toulouse, aucune levée
 * de fonds, pas de nombre de collaborateurs ni de pays affiché, support 7j/7, mise en
 * place en moins de 48 h, sameAs = LinkedIn seul.
 */
export const brand = {
  name: 'TriggerFlow',
  legalName: 'Utelys',
  url: 'https://www.trigger-flow.com',
  logo: 'https://www.trigger-flow.com/images/logo.webp',
  foundingDate: '2019',
  foundingCity: 'Toulouse',
  country: 'FR',
  email: 'contact@trigger-flow.com',
  demoUrl: 'https://app.lemcal.com/@trigger-flow/demo',
  sameAs: ['https://www.linkedin.com/company/triggerflow/'],
  category: { fr: 'CRM hôtelier', en: 'Hotel CRM' },
  /** Une phrase qui définit l'entité : le nom de marque seul est ambigu (Power Automate, n8n…). */
  definition: {
    fr: "TriggerFlow est un CRM hôtelier pour hôtels indépendants et groupes : il centralise les données clients issues du PMS et automatise emails, SMS, WhatsApp, enquêtes de satisfaction, avis, ventes additionnelles et fidélité.",
    en: 'TriggerFlow is a hotel CRM for independent hotels and hotel groups: it centralizes guest data from the PMS and automates email, SMS, WhatsApp, satisfaction surveys, reviews, upselling and loyalty.',
  },
  /**
   * PMS dont le connecteur existe dans l'app (triggerflow/backend/app/Services/Plugs, vérifié le
   * 25/10/2026). Ne jamais ajouter un PMS sans connecteur.
   */
  pms: [
    'Mews',
    'Thaïs',
    'Opera Cloud',
    'Medialog',
    'Misterbooking',
    'Asterio',
    'Apaleo',
    'Hotello',
    'Vega',
    'Beds24',
    'Zeswitch',
    'Reservit',
  ],
  knowsAbout: {
    fr: ['CRM hôtelier', 'marketing automation hôtelier', 'enquête de satisfaction hôtel', 'gestion des avis clients', 'ventes additionnelles hôtel', 'fidélisation client hôtel'],
    en: ['hotel CRM', 'hotel marketing automation', 'hotel guest satisfaction survey', 'hotel review management', 'hotel upselling', 'hotel guest loyalty'],
  },
} as const;
