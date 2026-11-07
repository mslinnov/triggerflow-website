import type { ProductLanding } from './types';

export const flows: ProductLanding = {
  slug: 'flows',
  legacySlug: 'automatisations',
  name: { fr: 'Flows', en: 'Flows' },
  seo: {
    title: { fr: 'Flows : automatisations hôtelières sans code | TriggerFlow', en: 'Flows: no-code hotel automations | TriggerFlow' },
    description: {
      fr: 'Construisez vos scénarios en glisser-déposer : déclencheurs, conditions, emails, SMS, WhatsApp, formulaires et offres, synchronisés avec votre PMS.',
      en: 'Build your scenarios with drag and drop: triggers, conditions, emails, SMS, WhatsApp, forms and offers, synced with your PMS.',
    },
  },
  hero: {
    title: { fr: 'Vos scénarios, exactement comme votre hôtel fonctionne.', en: 'Your scenarios, exactly the way your hotel works.' },
    subtitle: {
      fr: 'Un déclencheur, vos conditions, des actions : dessinez le parcours client de votre établissement en glisser-déposer. Des modèles prêts pour démarrer, opérationnel en 48 h.',
      en: 'A trigger, your conditions, actions: draw your property’s guest journey with drag and drop. Ready-made templates to start, live in 48 hours.',
    },
    visual: 'flows',
  },
  proof: {
    stat: 'emailDelivered',
    statLabel: { fr: 'des e-mails délivrés sur les 12 derniers mois', en: 'of emails delivered over the last 12 months' },
    clients: ['Hôtel Causse Comtal', 'Le Vieux Pressoir', 'Urban Bivouac', 'Hôtel Arc en Ciel'],
  },
  problem: {
    title: { fr: 'Les outils figés vous obligent à vous adapter à eux.', en: 'Rigid tools force you to adapt to them.' },
    items: [
      { fr: 'Le même message part à tout le monde, quel que soit le canal de réservation ou le type de séjour.', en: 'The same message goes to everyone, whatever the booking channel or type of stay.' },
      { fr: 'Chaque modification passe par le support de l’éditeur, avec parfois des semaines d’attente.', en: 'Every change goes through the vendor’s support, sometimes with weeks of waiting.' },
      { fr: 'La réception envoie à la main ce qui pourrait partir tout seul.', en: 'The front desk sends by hand what could go out on its own.' },
    ],
  },
  how: {
    title: { fr: 'Un événement se produit. Vous décidez de la suite.', en: 'Something happens. You decide what comes next.' },
    steps: [
      { title: { fr: 'Un déclencheur', en: 'A trigger' }, text: { fr: 'Réservation créée, X jours avant l’arrivée, arrivée, départ, anniversaire, réponse à un formulaire, paiement.', en: 'Booking created, X days before arrival, arrival, departure, birthday, form answer, payment.' } },
      { title: { fr: 'Vos conditions', en: 'Your conditions' }, text: { fr: 'Segment, langue, canal de réservation, type de chambre, client avec email OTA : autant de branches que nécessaire.', en: 'Segment, language, booking channel, room type, guest with an OTA email: as many branches as you need.' } },
      { title: { fr: 'Des actions', en: 'Actions' }, text: { fr: 'Email, SMS, WhatsApp, formulaire, offre, tâche pour l’équipe, lancement d’un autre flow, webhook.', en: 'Email, SMS, WhatsApp, form, offer, team task, start another flow, webhook.' } },
    ],
  },
  features: {
    title: { fr: 'La puissance d’un outil de grande chaîne, la simplicité en plus.', en: 'Chain-grade power, with simplicity on top.' },
    items: [
      { icon: 'workflow', title: { fr: 'Éditeur visuel', en: 'Visual editor' }, text: { fr: 'Glisser-déposer, branches Oui / Non, délais : sans une ligne de code.', en: 'Drag and drop, Yes / No branches, delays: without a line of code.' } },
      { icon: 'layers', title: { fr: 'Modèles prêts', en: 'Ready-made templates' }, text: { fr: 'Confirmation, pré-séjour, check-in, bienvenue, après-séjour : à adapter.', en: 'Confirmation, pre-stay, check-in, welcome, post-stay: ready to adapt.' } },
      { icon: 'filter', title: { fr: 'Segments dynamiques', en: 'Dynamic segments' }, text: { fr: 'Les conditions s’appuient sur des segments mis à jour en continu.', en: 'Conditions rely on continuously updated segments.' } },
      { icon: 'messageSquare', title: { fr: 'Tous les canaux', en: 'Every channel' }, text: { fr: 'Email, SMS, WhatsApp et formulaires dans le même scénario.', en: 'Email, SMS, WhatsApp and forms in the same scenario.' } },
      { icon: 'refresh', title: { fr: 'Données du PMS', en: 'PMS data' }, text: { fr: 'Dates, chambre, nombre de personnes : les variables viennent du PMS.', en: 'Dates, room, number of guests: variables come from the PMS.' } },
      { icon: 'barChart', title: { fr: 'Statistiques par flow', en: 'Per-flow statistics' }, text: { fr: 'Envois, ouvertures, clics et santé de chaque scénario.', en: 'Sends, opens, clicks and health of every scenario.' } },
    ],
  },
  tailored: {
    title: { fr: 'Taillé pour votre hôtel.', en: 'Shaped around your hotel.' },
    items: [
      { client: 'Le Vieux Pressoir', text: { fr: 'Un email différent selon le type de logement, et selon que le client fait son check-in ou arrive en autonomie.', en: 'A different email for each room type, and depending on whether the guest checks in or arrives on their own.' } },
      { client: 'Hôtel Causse Comtal', text: { fr: 'Un email de confirmation d’annulation qui permet de réserver à nouveau tout de suite.', en: 'A cancellation confirmation email that lets the guest rebook straight away.' } },
      { client: 'Urban Bivouac', text: { fr: 'Des flows de relance et de fidélisation construits autour de ses objectifs commerciaux.', en: 'Follow-up and loyalty flows built around its sales goals.' } },
    ],
  },
  caseStudy: {
    quote: {
      fr: 'À l’inverse des autres solutions CRM, il n’est plus nécessaire de raisonner à partir de ce que l’outil peut faire et de s’adapter à lui. Avec TriggerFlow, on part du besoin, on dessine le scénario qu’on souhaite mettre en place… et ensuite, on le paramètre sur l’outil, sans se retrouver bloqué.',
      en: 'Unlike other CRM tools, you no longer have to start from what the software can do and adapt to it. With TriggerFlow, you start from the need, draw the scenario you want… and then set it up in the tool, without getting stuck.',
    },
    name: 'Baptiste Legout',
    role: { fr: 'Propriétaire', en: 'Owner' },
    company: 'Hôtel Causse Comtal',
    href: '/ressources/cas-clients/causse-comtal',
  },
  integrations: {
    title: { fr: 'Déclenchés par votre PMS, en temps réel.', en: 'Triggered by your PMS, in real time.' },
    text: { fr: 'Les événements du PMS lancent vos flows ; les webhooks envoient les données vers Zapier, n8n ou vos outils.', en: 'PMS events start your flows; webhooks send data to Zapier, n8n or your own tools.' },
    extra: ['Zapier', 'n8n'],
  },
  reliability: { stat: 'emailDelivered', label: { fr: 'des e-mails délivrés', en: 'of emails delivered' } },
  related: [
    { slug: 'upsell', href: '/produit/upsell', name: { fr: 'Upsell', en: 'Upsell' }, text: { fr: 'Des offres au bon moment du parcours.', en: 'Offers at the right moment of the journey.' } },
    { slug: 'crm', href: '/produit/crm', name: { fr: 'CRM', en: 'CRM' }, text: { fr: 'Une fiche par client, sans doublons.', en: 'One profile per guest, no duplicates.' } },
    { slug: 'inbox', href: '/produit/inbox', name: { fr: 'Messagerie', en: 'Inbox' }, text: { fr: 'Les réponses des clients au même endroit.', en: 'Guest replies in one place.' } },
  ],
  pricing: { text: { fr: 'Inclus dans tous les plans, du plan Découverte gratuit (1 flow) au plan All Inclusive (flows illimités).', en: 'Included in every plan, from the free Discovery plan (1 flow) to All Inclusive (unlimited flows).' } },
  faq: [
    { q: { fr: 'Faut-il des compétences techniques ?', en: 'Do I need technical skills?' }, a: { fr: 'Non. L’éditeur est visuel et des modèles prêts couvrent les scénarios les plus courants. L’équipe vous accompagne pour les premiers.', en: 'No. The editor is visual and ready-made templates cover the most common scenarios. The team helps you set up the first ones.' } },
    { q: { fr: 'Quels événements peuvent déclencher un flow ?', en: 'Which events can trigger a flow?' }, a: { fr: 'Les événements de réservation venus du PMS (création, arrivée, départ, délais), les anniversaires, les réponses aux formulaires et les paiements, entre autres.', en: 'Booking events from the PMS (creation, arrival, departure, delays), birthdays, form answers and payments, among others.' } },
    { q: { fr: 'Puis-je envoyer sur plusieurs canaux dans le même scénario ?', en: 'Can I use several channels in one scenario?' }, a: { fr: 'Oui : email, SMS, WhatsApp et formulaires peuvent se suivre dans le même flow, avec des conditions entre chaque étape.', en: 'Yes: email, SMS, WhatsApp and forms can follow one another in the same flow, with conditions between steps.' } },
    { q: { fr: 'Combien de temps pour les premiers scénarios ?', en: 'How long until the first scenarios run?' }, a: { fr: 'En général 48 h, à partir de modèles adaptés à votre établissement.', en: 'Usually 48 hours, starting from templates adapted to your property.' } },
    { q: { fr: 'Un flow peut-il en lancer un autre ?', en: 'Can a flow start another flow?' }, a: { fr: 'Oui, une action dédiée permet de basculer vers un autre flow, pour garder des scénarios simples à lire.', en: 'Yes, a dedicated action switches to another flow, to keep scenarios easy to read.' } },
  ],
  cta: { title: { fr: 'Dessinez votre premier scénario cette semaine.', en: 'Draw your first scenario this week.' } },
};
