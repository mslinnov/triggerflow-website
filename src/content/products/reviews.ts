import type { ProductLanding } from './types';

export const reviews: ProductLanding = {
  slug: 'reviews',
  legacySlug: 'avis',
  name: { fr: 'Avis', en: 'Reviews' },
  seo: {
    title: { fr: 'Gestion des avis hôtel : plus d’avis positifs | TriggerFlow', en: 'Hotel review management: more positive reviews | TriggerFlow' },
    description: { fr: 'Demandez l’avis au bon moment, repérez les insatisfaits avant qu’ils publient, centralisez Google, Expedia et les autres, et répondez avec l’IA.', en: 'Ask for reviews at the right time, spot unhappy guests before they post, centralise Google, Expedia and others, and reply with AI.' },
  },
  hero: {
    title: { fr: 'Plus d’avis positifs. Les insatisfaits repérés avant de publier.', en: 'More positive reviews. Unhappy guests spotted before they post.' },
    subtitle: { fr: 'Une enquête part au départ du client. Bonne note : invitation à publier sur Google. Note basse : alerte à la direction. Tous vos avis au même endroit, avec des réponses rédigées par l’IA.', en: 'A survey goes out at checkout. Good score: invitation to post on Google. Low score: alert to management. All your reviews in one place, with AI-drafted replies.' },
    visual: 'reviews',
  },
  proof: { clients: ['AMMI Hôtels'] },
  problem: {
    title: { fr: 'Les clients contents oublient de laisser un avis. Les autres, jamais.', en: 'Happy guests forget to leave a review. Unhappy ones never do.' },
    items: [
      { fr: 'La demande d’avis part trop tard, ou pas du tout.', en: 'The review request goes out too late, or not at all.' },
      { fr: 'Un client mécontent publie avant que vous ayez pu réagir.', en: 'An unhappy guest posts before you can react.' },
      { fr: 'Répondre à chaque avis, sur chaque plateforme, prend des heures.', en: 'Replying to every review, on every platform, takes hours.' },
    ],
  },
  how: {
    title: { fr: 'Au bon moment, au bon client.', en: 'At the right time, to the right guest.' },
    steps: [
      { title: { fr: 'L’enquête part au départ', en: 'The survey goes out at checkout' }, text: { fr: 'Déclenchée par le PMS, sur le canal préféré du client.', en: 'Triggered by the PMS, on the guest’s preferred channel.' } },
      { title: { fr: 'La note décide de la suite', en: 'The score decides what’s next' }, text: { fr: 'Note haute : invitation à publier. Note basse : alerte et prise de contact.', en: 'High score: invitation to post. Low score: alert and follow-up.' } },
      { title: { fr: 'Vous répondez vite', en: 'You reply fast' }, text: { fr: 'Avis centralisés, brouillons de réponse par l’IA, validés par vous.', en: 'Centralised reviews, AI reply drafts, approved by you.' } },
    ],
  },
  features: {
    title: { fr: 'Votre e-réputation, pilotée.', en: 'Your online reputation, under control.' },
    items: [
      { icon: 'clock', title: { fr: 'Demande au bon moment', en: 'Asked at the right time' }, text: { fr: 'Après le départ, automatiquement.', en: 'After checkout, automatically.' } },
      { icon: 'bell', title: { fr: 'Alertes sur note basse', en: 'Low-score alerts' }, text: { fr: 'La direction prévenue tout de suite.', en: 'Management notified straight away.' } },
      { icon: 'layers', title: { fr: 'Avis centralisés', en: 'Centralised reviews' }, text: { fr: 'Google, Expedia et d’autres plateformes au même endroit.', en: 'Google, Expedia and other platforms in one place.' } },
      { icon: 'sparkles', title: { fr: 'Réponses avec l’IA', en: 'AI-assisted replies' }, text: { fr: 'Un brouillon dans le ton de votre hôtel.', en: 'A draft in your hotel’s tone.' } },
      { icon: 'users', title: { fr: 'Avis sur la fiche client', en: 'Reviews on the profile' }, text: { fr: 'Chaque avis rattaché au bon client.', en: 'Each review linked to the right guest.' } },
      { icon: 'barChart', title: { fr: 'Widgets et statistiques', en: 'Widgets and statistics' }, text: { fr: 'Vos avis affichés sur votre site, l’évolution suivie.', en: 'Reviews shown on your website, trends tracked.' } },
    ],
  },
  tailored: {
    title: { fr: 'Taillé pour votre hôtel.', en: 'Shaped around your hotel.' },
    items: [
      { client: 'AMMI Hôtels', text: { fr: 'Le module e-réputation a été construit avec eux, à partir de leurs retours.', en: 'The reputation module was built with them, from their feedback.' } },
      { client: { fr: 'Seuil d’alerte', en: 'Alert threshold' }, text: { fr: 'Vous choisissez à partir de quelle note la direction est prévenue.', en: 'You choose the score below which management is notified.' } },
      { client: { fr: 'Plusieurs langues', en: 'Several languages' }, text: { fr: 'L’enquête et la réponse dans la langue du client.', en: 'Survey and reply in the guest’s language.' } },
    ],
  },
  caseStudy: {
    quote: { fr: 'L’équipe TriggerFlow a été très à l’écoute et réactive. On a fait des retours et ils ont accepté de mettre en place des fonctionnalités qui nous manquaient, comme la e-réputation, dans un temps record.', en: 'The TriggerFlow team was very attentive and responsive. We gave feedback and they agreed to build features we were missing, like reputation management, in record time.' },
    name: 'Romain Coste-Chareyre', role: { fr: 'Groupe', en: 'Group' }, company: 'AMMI Hôtels',
  },
  integrations: { title: { fr: 'Vos plateformes d’avis, réunies.', en: 'Your review platforms, together.' }, text: { fr: 'Les avis remontent des plateformes et se rattachent aux séjours du PMS.', en: 'Reviews come in from the platforms and link to PMS stays.' }, extra: ['Google', 'Expedia', 'TripAdvisor', 'Booking.com', 'Airbnb'] },
  related: [
    { slug: 'forms', href: '/produit/forms', name: { fr: 'Formulaires', en: 'Forms' }, text: { fr: 'Des enquêtes de satisfaction sur mesure.', en: 'Tailored satisfaction surveys.' } },
    { slug: 'flows', href: '/produit/flows', name: { fr: 'Flows', en: 'Flows' }, text: { fr: 'Le bon moment pour demander l’avis.', en: 'The right moment to ask.' } },
    { slug: 'inbox', href: '/produit/inbox', name: { fr: 'Messagerie', en: 'Inbox' }, text: { fr: 'Recontactez le client insatisfait.', en: 'Follow up with the unhappy guest.' } },
  ],
  pricing: { text: { fr: 'Module complémentaire, à ajouter à n’importe quel plan payant.', en: 'Add-on module, available with any paid plan.' }, addon: 'reviews' },
  faq: [
    { q: { fr: 'Filtrez-vous les avis négatifs ?', en: 'Do you filter out negative reviews?' }, a: { fr: 'Non. Une note basse déclenche une alerte pour que vous puissiez réagir ; vous restez libre d’inviter chaque client à publier.', en: 'No. A low score triggers an alert so you can react; you remain free to invite every guest to post.' } },
    { q: { fr: 'Quelles plateformes sont centralisées ?', en: 'Which platforms are centralised?' }, a: { fr: 'Google et Expedia notamment, ainsi que TripAdvisor, Booking.com et Airbnb.', en: 'Google and Expedia in particular, as well as TripAdvisor, Booking.com and Airbnb.' } },
    { q: { fr: 'L’IA publie-t-elle les réponses ?', en: 'Does AI post the replies?' }, a: { fr: 'Elle prépare un brouillon ; vous le relisez et le validez.', en: 'It prepares a draft; you review and approve it.' } },
    { q: { fr: 'Quand part la demande d’avis ?', en: 'When does the review request go out?' }, a: { fr: 'Au moment que vous choisissez, en général juste après le départ.', en: 'When you choose, usually just after checkout.' } },
  ],
  cta: { title: { fr: 'Votre prochain avis cinq étoiles part tout seul.', en: 'Your next five-star review starts on its own.' } },
};
