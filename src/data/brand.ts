/**
 * SOURCE DE VÉRITÉ UNIQUE des faits de marque TriggerFlow.
 *
 * Les moteurs IA (ChatGPT, Perplexity, Gemini, AI Overviews) croisent les sources :
 * un fait qui diffère entre le JSON-LD, llms.txt et la page À propos rend la marque
 * moins citable. JsonLd.tsx et llms.txt lisent tous ces valeurs ici.
 *
 * Faits confirmés par Mounir le 25/10/2026 : création en 2019 à Toulouse, aucune levée
 * de fonds, pas de nombre de collaborateurs ni de pays affiché, support 7j/7, sameAs = LinkedIn seul.
 * Le délai de mise en place (48 h) est faux : retiré le 08/11/2026 (Soufiane), ne pas le réafficher.
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
  /** Page du site qui présente la démo et intègre le calendrier : cible de tous les boutons « Demander une démo ». */
  demoPage: '/demo',
  sameAs: ['https://www.linkedin.com/company/triggerflow/'],
  category: { fr: 'CRM hôtelier', en: 'Hotel CRM' },
  /** Promesse validée par Soufiane le 07/11/2026 (docs/messages.md). */
  slogan: {
    fr: "Le CRM hôtelier qui s'adapte à votre hôtel. Pas l'inverse.",
    en: 'The hotel CRM that fits your hotel, not the other way around.',
  },
  /** Support 7j/7 (confirmé le 25/10/2026). Délai de mise en place retiré le 08/11/2026 : ne jamais l'afficher. */
  supportDays: 7,
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
    'Vega',
    'Beds24',
    'Zeswitch',
    'Reservit',
    'Lean PMS',
  ],
  /**
   * PMS dont le connecteur est en cours de développement : affichés à part, « bientôt disponible » /
   * « coming soon », jamais comptés dans `pms` tant que le connecteur n'existe pas dans l'app.
   * Un PMS n'entre ici qu'avec son nom (décision du 25/10/2026 : pas de « + N » anonyme).
   */
  // Vidé le 07/11/2026 (décision de Soufiane) : Chloé, Infhotik, Protel et Galaxy retirés du site pour l'instant.
  pmsEnCours: [] as string[],
  /**
   * Autres connexions, vérifiées dans l'app le 25/10/2026 (Models/Plug.php, Services/Locks,
   * Services/Payments, Services/Reviews, Models/FacilityMailbox.php).
   */
  connections: {
    locks: ['Sesame', 'Igloohome'],
    payments: ['Stripe', 'PayZen', 'SystemPay', 'Thaïs'],
    reviews: ['Google', 'TripAdvisor', 'Booking.com', 'Airbnb'],
    mailboxes: ['Gmail', 'Microsoft 365'],
  },
  /**
   * Zapier, n8n (et Make) reçoivent les données de TriggerFlow par l'action webhook des scénarios :
   * TriggerFlow ne figure pas dans leur catalogue. Catalogues relevés le 25/10/2026 sur
   * zapier.com/apps (« 10368+ apps ») et n8n.io/integrations (« 2,000+ integrations »).
   */
  automation: ['Zapier', 'n8n'],
  /** Fonctionnalités du JSON-LD SoftwareApplication. */
  featureList: {
    fr: ['Synchronisation PMS', 'SMS & Emails automatisés', 'Enquêtes de satisfaction', 'Ventes additionnelles', 'Tableaux de bord analytiques', 'Templates personnalisables'],
    en: ['PMS sync', 'Automated SMS & emails', 'Guest satisfaction surveys', 'Upselling', 'Analytics dashboards', 'Customizable templates'],
  },
  knowsAbout: {
    fr: ['CRM hôtelier', 'marketing automation hôtelier', 'enquête de satisfaction hôtel', 'gestion des avis clients', 'ventes additionnelles hôtel', 'fidélisation client hôtel'],
    en: ['hotel CRM', 'hotel marketing automation', 'hotel guest satisfaction survey', 'hotel review management', 'hotel upselling', 'hotel guest loyalty'],
  },
} as const;
