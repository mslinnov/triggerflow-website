/**
 * Contenu de la landing Flows (FR/EN).
 * Capacités : audit du code de l'app (backend/app, frontend/src/pages/flows) du 08/11/2026, arrondies à la demande
 * de Soufiane (« ça évolue constamment ») : 30+ déclencheurs, 70+ filtres, 15+ conditions d'interaction, 15+ actions,
 * 30+ modèles (confirmés avant la mise en ligne). IA : rédige et traduit aujourd'hui ; construction de flows = vision.
 * Chiffres d'étude : « Le guide du client OTA » et « Le guide du post-séjour », TriggerFlow, été 2026.
 */
type L = { fr: string; en: string };

export const flowsLanding = {
  seo: {
    title: { fr: 'Flows : automatisations hôtelières sur mesure | TriggerFlow', en: 'Flows: tailor-made hotel automations | TriggerFlow' },
    description: {
      fr: '30+ déclencheurs, 70+ filtres, conditions sur les emails, WhatsApp, formulaires et paiements : automatisez le parcours client exact de votre hôtel, sans code.',
      en: '30+ triggers, 70+ filters, conditions on emails, WhatsApp, forms and payments: automate your hotel’s exact guest journey, without code.',
    },
  },
  hero: {
    eyebrow: { fr: 'Flows', en: 'Flows' } as L,
    title: { fr: 'Vos scénarios, exactement comme votre hôtel fonctionne.', en: 'Your scenarios, exactly the way your hotel works.' } as L,
    subtitle: {
      fr: 'Un événement se produit, vos règles décident de la suite. Le bon message part au bon client, l’équipe est prévenue, le PMS est mis à jour. Sans une ligne de code.',
      en: 'Something happens, your rules decide what comes next. The right message reaches the right guest, the team is notified, the PMS is updated. Without a line of code.',
    } as L,
    bullets: [
      { fr: 'Des arbres de décision fondés sur vos segments', en: 'Decision trees built on your segments' },
      { fr: 'Des relances selon ce que le client a lu, cliqué ou payé', en: 'Follow-ups based on what the guest read, clicked or paid' },
      { fr: 'Des actions pour le client et pour votre équipe', en: 'Actions for the guest and for your team' },
    ] as L[],
  },
  proof: {
    label: { fr: 'Ils automatisent leur parcours client avec TriggerFlow', en: 'They automate their guest journey with TriggerFlow' } as L,
    clients: ['Hôtel Causse Comtal', 'Le Vieux Pressoir', 'Urban Bivouac', 'Groupe Noemys'],
    stat: { fr: 'messages envoyés par nos hôtels clients', en: 'messages sent by our client hotels' } as L,
  },
  capabilities: [
    { value: '30+', label: { fr: 'déclencheurs hôteliers', en: 'hotel triggers' } as L },
    { value: '70+', label: { fr: 'filtres pour vos segments', en: 'filters for your segments' } as L },
    { value: '15+', label: { fr: 'conditions d’interaction', en: 'interaction conditions' } as L },
    { value: '15+', label: { fr: 'actions client et équipe', en: 'guest and team actions' } as L },
  ],
  blocks: {
    eyebrow: { fr: 'Comment ça marche', en: 'How it works' } as L,
    title: { fr: 'Quatre briques,', en: 'Four building blocks,' } as L,
    titleMuted: { fr: 'des scénarios sans limite.', en: 'endless scenarios.' } as L,
    items: [
      {
        title: { fr: 'Des segments précis', en: 'Precise segments' },
        text: { fr: 'Plus de 70 filtres sur le client, la réservation, la chambre et la fidélité, combinés en segments d’inclusion et d’exclusion.', en: 'Over 70 filters on the guest, booking, room and loyalty, combined into inclusion and exclusion segments.' },
        examples: { fr: 'Canal de réservation, nombre de chambres, nationalité, durée, montant, historique, tags…', en: 'Booking channel, number of rooms, nationality, length of stay, amount, history, tags…' },
      },
      {
        title: { fr: 'Des déclencheurs hôteliers', en: 'Hotel triggers' },
        text: { fr: 'Le séjour, le PMS, les formulaires, les paiements, les commandes et la fidélité lancent vos flows.', en: 'The stay, the PMS, forms, payments, orders and loyalty start your flows.' },
        examples: { fr: 'X jours avant l’arrivée, annulation, check-in, réponse à un formulaire, paiement reçu, lien expiré, anniversaire…', en: 'X days before arrival, cancellation, check-in, form answer, payment received, expired link, birthday…' },
      },
      {
        title: { fr: 'Des conditions et des attentes', en: 'Conditions and waits' },
        text: { fr: 'Des branches Oui / Non sur les segments et sur ce que le client a fait, avec des attentes fixes ou variables.', en: 'Yes / No branches on segments and on what the guest did, with fixed or variable waits.' },
        examples: { fr: 'Email ouvert ou cliqué, WhatsApp lu ou répondu, formulaire rempli, paiement effectué, « jusqu’à 2 jours avant l’arrivée, à 10 h »…', en: 'Email opened or clicked, WhatsApp read or answered, form submitted, payment made, “until 2 days before arrival, at 10 am”…' },
      },
      {
        title: { fr: 'Des actions pour le client et l’équipe', en: 'Actions for the guest and the team' },
        text: { fr: 'Vers le client, et en interne : alertes, PMS, caisse, tags, outils connectés.', en: 'To the guest, and internally: alerts, PMS, POS, tags, connected tools.' },
        examples: { fr: 'Email, SMS, WhatsApp, formulaire, alerte email ou SMS à l’équipe, notification et commentaire PMS, caisse, webhook…', en: 'Email, SMS, WhatsApp, form, email or SMS alert to the team, PMS notification and comment, POS, webhook…' },
      },
    ],
  },
  study: {
    eyebrow: { fr: 'Ce que mesurent nos études', en: 'What our studies measure' } as L,
    title: { fr: 'Le bon moment et la bonne relance', en: 'The right moment and the right follow-up' } as L,
    titleMuted: { fr: 'changent tout.', en: 'change everything.' } as L,
    figures: [
      { value: '×3', label: { fr: 'd’adresses récupérées quand le premier message part dès la réservation plutôt que le jour d’arrivée', en: 'more addresses collected when the first message goes out at booking rather than on arrival day' } as L },
      { value: '×2,5', label: { fr: 'entre un seul message et trois messages pour le même séjour', en: 'between one message and three messages for the same stay' } as L },
      { value: '×7', label: { fr: 'd’avis entre le meilleur et le pire créneau d’envoi après le séjour', en: 'more reviews between the best and worst post-stay send time' } as L },
    ],
    source: { fr: 'Sources : « Le guide du client OTA » et « Le guide du post-séjour », TriggerFlow, été 2026 · données anonymisées', en: 'Sources: “The OTA guest guide” and “The post-stay guide”, TriggerFlow, summer 2026 · anonymised data' } as L,
  },
  scenarios: {
    eyebrow: { fr: 'Trois scénarios réels', en: 'Three real scenarios' } as L,
    title: { fr: 'Ce que vos flows peuvent faire, concrètement.', en: 'What your flows can do, in practice.' } as L,
    labels: { trigger: { fr: 'Déclencheur', en: 'Trigger' }, steps: { fr: 'Étapes', en: 'Steps' }, why: { fr: 'Pourquoi ça marche', en: 'Why it works' } } as Record<string, L>,
    items: [
      {
        name: { fr: 'Le client venu d’une OTA', en: 'The OTA guest' },
        trigger: { fr: 'Nouvelle réservation', en: 'New booking' },
        steps: [
          { fr: 'Si le canal est une OTA et l’email est un relais', en: 'If the channel is an OTA and the email is a relay' },
          { fr: 'WhatsApp : formulaire pour préparer le séjour', en: 'WhatsApp: form to prepare the stay' },
          { fr: 'Attendre 2 jours', en: 'Wait 2 days' },
          { fr: 'Si le formulaire n’est pas rempli : relance par SMS', en: 'If the form is not submitted: SMS follow-up' },
        ],
        why: { fr: 'Le premier message part tout de suite, la relance seulement à ceux qui n’ont pas répondu.', en: 'The first message goes out right away, the follow-up only to those who did not answer.' },
      },
      {
        name: { fr: 'Noël, plusieurs chambres', en: 'Christmas, several rooms' },
        trigger: { fr: '30 jours avant l’arrivée, flow actif du 1er au 31 décembre', en: '30 days before arrival, flow active December 1 to 31' },
        steps: [
          { fr: 'Si plus d’une chambre', en: 'If more than one room' },
          { fr: 'Email : formulaire du réveillon', en: 'Email: Christmas Eve form' },
          { fr: 'Attendre 48 h', en: 'Wait 48 h' },
          { fr: 'Si l’email n’est pas cliqué : rappel WhatsApp', en: 'If the email is not clicked: WhatsApp reminder' },
          { fr: 'Formulaire rempli : alerte email au restaurant', en: 'Form submitted: email alert to the restaurant' },
        ],
        why: { fr: 'Une période de validité, une condition sur la réservation, une relance selon l’interaction, et l’équipe prévenue.', en: 'A validity period, a booking condition, an interaction-based follow-up, and the team notified.' },
      },
      {
        name: { fr: 'Le lien de paiement expiré', en: 'The expired payment link' },
        trigger: { fr: 'Lien de paiement expiré', en: 'Payment link expired' },
        steps: [
          { fr: 'SMS : nouveau lien de paiement', en: 'SMS: new payment link' },
          { fr: 'Attendre 24 h', en: 'Wait 24 h' },
          { fr: 'Si le paiement n’est pas fait : SMS à la réception', en: 'If not paid: SMS to the front desk' },
          { fr: 'Et un commentaire ajouté sur la réservation dans le PMS', en: 'And a comment added to the booking in the PMS' },
        ],
        why: { fr: 'Le client est relancé tout seul, et la réception n’intervient que si c’est nécessaire.', en: 'The guest is reminded automatically, and the front desk only steps in when needed.' },
      },
    ],
  },
  safety: {
    eyebrow: { fr: 'Des envois sous contrôle', en: 'Sends under control' } as L,
    title: { fr: 'Puissant, mais impossible de se tromper.', en: 'Powerful, yet hard to get wrong.' } as L,
    items: [
      { title: { fr: 'Audience estimée', en: 'Estimated audience' }, text: { fr: 'Avant d’activer, vous voyez combien de clients sont concernés et le crédit SMS nécessaire.', en: 'Before activating, you see how many guests are concerned and the SMS credit needed.' } },
      { title: { fr: 'Activation vérifiée', en: 'Checked activation' }, text: { fr: 'Un flow incomplet ne peut pas être activé, et les branches inutiles sont signalées.', en: 'An incomplete flow cannot be activated, and unreachable branches are flagged.' } },
      { title: { fr: 'Mode test', en: 'Test mode' }, text: { fr: 'Tout part vers votre adresse de test, sans fausser les statistiques.', en: 'Everything goes to your test address, without skewing statistics.' } },
      { title: { fr: 'Pause automatique', en: 'Automatic pause' }, text: { fr: 'Un flow marketing se met en pause si les plaintes ou les erreurs augmentent. Les messages transactionnels, eux, ne s’arrêtent jamais.', en: 'A marketing flow pauses if complaints or errors rise. Transactional messages never stop.' } },
      { title: { fr: 'Jamais deux fois', en: 'Never twice' }, text: { fr: 'Unicité par client, réservation ou chambre, et une garde anti-doublon à chaque envoi.', en: 'Uniqueness per guest, booking or room, and a duplicate guard on every send.' } },
      { title: { fr: 'Période de validité', en: 'Validity period' }, text: { fr: 'Une date de début et de fin pour vos flows saisonniers.', en: 'A start and end date for your seasonal flows.' } },
    ],
  },
  stats: {
    eyebrow: { fr: 'Mesure', en: 'Measurement' } as L,
    title: { fr: 'Chaque flow a ses statistiques.', en: 'Every flow has its own statistics.' } as L,
    subtitle: { fr: 'Entonnoir d’envoi, analyse sur deux périodes, détail par client, carte des clics. Les flows marketing affichent aussi les réservations et le chiffre d’affaires qu’ils ont générés.', en: 'Send funnel, two-period analysis, per-guest detail, click heatmap. Marketing flows also show the bookings and revenue they generated.' } as L,
    alt: { fr: 'Statistiques d’un flow TriggerFlow : clients entrés, emails envoyés, ouverts et cliqués', en: 'TriggerFlow flow statistics: guests entered, emails sent, opened and clicked' } as L,
    caption: { fr: 'Capture de l’application, compte de démonstration', en: 'App screenshot, demo account' } as L,
  },
  start: {
    eyebrow: { fr: 'Démarrer vite', en: 'Start fast' } as L,
    title: { fr: '30+ modèles, à vos couleurs, en quelques clics.', en: '30+ templates, in your colours, in a few clicks.' } as L,
    items: [
      { title: { fr: 'Démarrage rapide', en: 'Quick start' }, text: { fr: 'Choisissez un style d’email et vos flows : votre logo et vos couleurs sont appliqués automatiquement.', en: 'Pick an email style and your flows: your logo and colours are applied automatically.' } },
      { title: { fr: 'Quatre familles de flows', en: 'Four flow families' }, text: { fr: 'Transactionnels, marketing, après un formulaire, après un paiement.', en: 'Transactional, marketing, after a form, after a payment.' } },
      { title: { fr: 'Pour les groupes', en: 'For groups' }, text: { fr: 'Un flow de groupe pour tous vos établissements, que chacun peut activer ou non.', en: 'One group flow for all your properties, which each can switch on or off.' } },
    ],
    alt: { fr: 'Liste des automatisations TriggerFlow : confirmation, pré-séjour, check-in, bienvenue, après séjour', en: 'TriggerFlow automations list: confirmation, pre-stay, check-in, welcome, post-stay' } as L,
  },
  ai: {
    eyebrow: { fr: 'IA', en: 'AI' } as L,
    title: { fr: 'L’IA écrit vos messages. Bientôt, elle dessinera vos flows.', en: 'AI writes your messages. Soon, it will draw your flows.' } as L,
    today: { fr: 'Aujourd’hui : l’assistant rédige, corrige, reformule et traduit vos emails et SMS, directement dans le flow.', en: 'Today: the assistant writes, corrects, rephrases and translates your emails and SMS, right inside the flow.' } as L,
    soon: { fr: 'Notre vision : vous décrivez le scénario en une phrase, l’assistant construit le flow, vous le validez.', en: 'Our vision: you describe the scenario in one sentence, the assistant builds the flow, you approve it.' } as L,
    soonLabel: { fr: 'Bientôt', en: 'Coming soon' } as L,
  },
  quotes: [
    { text: { fr: 'À l’inverse des autres solutions CRM, il n’est plus nécessaire de raisonner à partir de ce que l’outil peut faire et de s’adapter à lui. Avec TriggerFlow, on part du besoin.', en: 'Unlike other CRM tools, you no longer have to start from what the software can do and adapt to it. With TriggerFlow, you start from the need.' } as L, name: 'Baptiste Legout', role: { fr: 'Propriétaire', en: 'Owner' } as L, company: 'Hôtel Causse Comtal' },
    { text: { fr: 'On peut automatiser des messages très personnalisés, anticiper toutes les situations, pour que le bon client reçoive le message qu’on veut, au meilleur moment.', en: 'We can automate highly personalised messages and anticipate every situation, so the right guest gets the message we want at the best time.' } as L, name: 'Guillaume Broutin', role: { fr: 'Propriétaire', en: 'Owner' } as L, company: 'Le Vieux Pressoir' },
  ],
  compare: {
    eyebrow: { fr: 'Pourquoi pas un outil d’emailing ?', en: 'Why not an email tool?' } as L,
    title: { fr: 'Un outil d’emailing envoie. Un flow décide.', en: 'An email tool sends. A flow decides.' } as L,
    criteria: { fr: 'Critère', en: 'Criterion' } as L,
    other: { fr: 'Outil d’emailing classique', en: 'Standard email tool' } as L,
    rows: [
      { label: { fr: 'Données', en: 'Data' }, other: { fr: 'Des listes importées à la main', en: 'Lists imported by hand' }, us: { fr: 'Le PMS en temps réel, une fiche par client', en: 'Real-time PMS, one profile per guest' } },
      { label: { fr: 'Déclencheurs', en: 'Triggers' }, other: { fr: 'Une date d’envoi', en: 'A send date' }, us: { fr: 'Séjour, formulaire, paiement, commande, fidélité', en: 'Stay, form, payment, order, loyalty' } },
      { label: { fr: 'Canaux', en: 'Channels' }, other: { fr: 'L’email', en: 'Email' }, us: { fr: 'Email, SMS, WhatsApp et formulaires dans le même flow', en: 'Email, SMS, WhatsApp and forms in the same flow' } },
      { label: { fr: 'Votre équipe', en: 'Your team' }, other: { fr: 'Rien n’est prévu', en: 'Nothing planned' }, us: { fr: 'Alertes, PMS, caisse, tags', en: 'Alerts, PMS, POS, tags' } },
    ],
  },
  pricing: { fr: 'Inclus dans toutes les formules, du nombre de flows de Découverte aux flows illimités d’All Inclusive.', en: 'Included in every plan, from Discovery’s flow allowance to All Inclusive’s unlimited flows.' } as L,
  faqTitle: { fr: 'Vos questions sur les flows.', en: 'Your questions about flows.' } as L,
  faq: [
    { q: { fr: 'Faut-il des compétences techniques ?', en: 'Do I need technical skills?' }, a: { fr: 'Non. L’éditeur est visuel, les modèles couvrent les scénarios courants et notre équipe configure les premiers avec vous.', en: 'No. The editor is visual, templates cover common scenarios and our team sets up the first ones with you.' } },
    { q: { fr: 'Quels événements peuvent lancer un flow ?', en: 'Which events can start a flow?' }, a: { fr: 'Plus de 30 déclencheurs : les dates et étapes du séjour venues du PMS, les annulations, les réponses aux formulaires, les paiements et liens expirés, les commandes, la fidélité, les anniversaires, ou un lancement manuel.', en: 'Over 30 triggers: stay dates and steps from the PMS, cancellations, form answers, payments and expired links, orders, loyalty, birthdays, or a manual launch.' } },
    { q: { fr: 'Peut-on relancer seulement ceux qui n’ont pas répondu ?', en: 'Can I follow up only with those who did not answer?' }, a: { fr: 'Oui. Les conditions d’interaction vérifient si l’email a été ouvert ou cliqué, si le WhatsApp a été lu ou a reçu une réponse, si le formulaire a été rempli ou le paiement effectué.', en: 'Yes. Interaction conditions check whether the email was opened or clicked, the WhatsApp read or answered, the form submitted or the payment made.' } },
    { q: { fr: 'Un flow peut-il prévenir mon équipe ou écrire dans le PMS ?', en: 'Can a flow notify my team or write to the PMS?' }, a: { fr: 'Oui : alertes email ou SMS à l’équipe, notification et commentaire sur la réservation dans le PMS, notification en caisse selon votre PMS, et webhooks vers vos outils.', en: 'Yes: email or SMS alerts to the team, notification and booking comment in the PMS, POS notification depending on your PMS, and webhooks to your tools.' } },
    { q: { fr: 'Puis-je limiter un flow à une période ?', en: 'Can I limit a flow to a period?' }, a: { fr: 'Oui, chaque flow peut avoir une date de début et de fin, idéal pour les offres saisonnières.', en: 'Yes, each flow can have a start and end date, ideal for seasonal offers.' } },
    { q: { fr: 'Faut-il refaire les flows pour chaque établissement d’un groupe ?', en: 'Do I rebuild flows for each property of a group?' }, a: { fr: 'Non. Un flow de groupe s’applique à tous vos établissements, et chacun peut l’activer ou non.', en: 'No. A group flow applies to all your properties, and each can switch it on or off.' } },
  ],
  cta: {
    title: { fr: 'Dessinez votre premier scénario avec nous.', en: 'Draw your first scenario with us.' } as L,
    text: { fr: 'Une démo de 45 minutes, à partir de vos parcours clients.', en: 'A 45-minute demo, built around your guest journeys.' } as L,
    demo: { fr: 'Demander une démo', en: 'Book a demo' } as L,
    pricing: { fr: 'Voir les tarifs', en: 'See pricing' } as L,
  },
};
