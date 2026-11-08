import type { ProductLanding } from './types';

export const forms: ProductLanding = {
  slug: 'forms',
  legacySlug: 'formulaires',
  name: { fr: 'Formulaires', en: 'Forms' },
  seo: {
    title: { fr: 'Formulaires hôtel : pré-séjour, enquêtes et upsell | TriggerFlow', en: 'Hotel forms: pre-stay, surveys and upsell | TriggerFlow' },
    description: { fr: 'Créez le formulaire exact dont vous avez besoin : pré-séjour, enquête, demandes spéciales, mode borne. Logique conditionnelle, offres intégrées, réponses sur la fiche.', en: 'Build exactly the form you need: pre-stay, survey, special requests, kiosk mode. Conditional logic, built-in offers, answers on the profile.' },
  },
  hero: {
    title: { fr: 'Le formulaire exact dont vous avez besoin. Et qui peut vendre.', en: 'Exactly the form you need. And one that can sell.' },
    subtitle: { fr: 'Pré-séjour, enquête de satisfaction, demandes spéciales, rooming list : questions conditionnelles, offres intégrées, et chaque réponse arrive sur la fiche du client.', en: 'Pre-stay, satisfaction survey, special requests, rooming list: conditional questions, built-in offers, and every answer lands on the guest profile.' },
    visual: 'forms',
  },
  proof: { clients: ['Edgar Hôtel & Spa', 'Hôtel Causse Comtal', 'Hôtel Estrimont'] },
  problem: {
    title: { fr: 'Les formulaires génériques ne posent jamais les bonnes questions.', en: 'Generic forms never ask the right questions.' },
    items: [
      { fr: 'Le même questionnaire pour un séminaire et une escapade en couple.', en: 'The same questionnaire for a seminar and a couple’s getaway.' },
      { fr: 'Les réponses restent dans un outil à part et ne servent à personne.', en: 'Answers stay in a separate tool and help nobody.' },
      { fr: 'Le moment où le client prépare son séjour n’est jamais utilisé pour lui proposer un extra.', en: 'The moment the guest plans their stay is never used to offer an extra.' },
    ],
  },
  how: {
    title: { fr: 'Construit en quelques minutes, envoyé au bon moment.', en: 'Built in minutes, sent at the right time.' },
    steps: [
      { title: { fr: 'Composez le formulaire', en: 'Build the form' }, text: { fr: 'Questions libres, conditions selon les réponses, blocs d’offre.', en: 'Free questions, conditions based on answers, offer blocks.' } },
      { title: { fr: 'Envoyez-le automatiquement', en: 'Send it automatically' }, text: { fr: 'Par un flow, au bon moment du séjour, ou en mode borne à la réception.', en: 'Through a flow, at the right time of the stay, or in kiosk mode at reception.' } },
      { title: { fr: 'Exploitez les réponses', en: 'Use the answers' }, text: { fr: 'Rattachées à la fiche, analysées, utilisables dans les segments.', en: 'Linked to the profile, analysed, usable in segments.' } },
    ],
  },
  features: {
    title: { fr: 'Des formulaires qui travaillent pour vous.', en: 'Forms that work for you.' },
    items: [
      { icon: 'filter', title: { fr: 'Logique conditionnelle', en: 'Conditional logic' }, text: { fr: 'Les questions suivantes dépendent des réponses.', en: 'Next questions depend on the answers.' } },
      { icon: 'package', title: { fr: 'Offres intégrées', en: 'Built-in offers' }, text: { fr: 'Petit-déjeuner, surclassement ou spa proposés dans le formulaire.', en: 'Breakfast, upgrade or spa offered inside the form.' } },
      { icon: 'clipboard', title: { fr: 'Mode borne', en: 'Kiosk mode' }, text: { fr: 'Sur une tablette à la réception.', en: 'On a tablet at reception.' } },
      { icon: 'users', title: { fr: 'Réponses sur la fiche', en: 'Answers on the profile' }, text: { fr: 'Préférences et demandes visibles par toute l’équipe.', en: 'Preferences and requests visible to the whole team.' } },
      { icon: 'barChart', title: { fr: 'Analyse des réponses', en: 'Answer analysis' }, text: { fr: 'Statistiques, verbatims et tendances.', en: 'Statistics, verbatims and trends.' } },
      { icon: 'globe', title: { fr: 'Multilingue', en: 'Multilingual' }, text: { fr: 'Le formulaire dans la langue du client.', en: 'The form in the guest’s language.' } },
    ],
  },
  tailored: {
    title: { fr: 'Taillé pour votre hôtel.', en: 'Shaped around your hotel.' },
    items: [
      { client: 'Edgar Hôtel & Spa', text: { fr: '« Vous venez pour loisir ou pour affaires ? » : la suite du formulaire change selon la réponse.', en: '“Leisure or business?”: the rest of the form changes with the answer.' } },
      { client: 'Hôtel Causse Comtal', text: { fr: 'Un soin compris dans le séjour ? Le client indique ses disponibilités et préférences avant d’arriver.', en: 'Treatment included in the stay? The guest gives availability and preferences before arriving.' } },
      { client: 'Hôtel Estrimont', text: { fr: 'Les formulaires détournés en quiz de formation pour l’équipe.', en: 'Forms turned into training quizzes for the team.' } },
    ],
  },
  caseStudy: {
    quote: { fr: 'Les formulaires peuvent se personnaliser en fonction des réponses aux questions. Selon les réponses que le client donne, on va pouvoir ouvrir d’autres questions, c’est vraiment un point fort.', en: 'Forms can adapt to the answers. Depending on what the guest says, other questions open up: that’s a real strength.' },
    name: 'Maxime Jullien', role: { fr: 'Directeur', en: 'General manager' }, company: 'Edgar Hôtel & Spa', href: '/clients/edgar-hotel-spa',
  },
  integrations: { title: { fr: 'Les réponses rejoignent la fiche et le PMS.', en: 'Answers reach the profile and the PMS.' }, text: { fr: 'Les formulaires utilisent les données de réservation pour se pré-remplir.', en: 'Forms use booking data to pre-fill.' } },
  reliability: { stat: 'messages', label: { fr: 'messages envoyés par nos hôtels clients', en: 'messages sent by our client hotels' } },
  related: [
    { slug: 'upsell', href: '/produit/upsell', name: { fr: 'Upsell', en: 'Upsell' }, text: { fr: 'Le catalogue d’offres.', en: 'The offer catalogue.' } },
    { slug: 'reviews', href: '/produit/reviews', name: { fr: 'Avis', en: 'Reviews' }, text: { fr: 'De l’enquête à l’avis Google.', en: 'From survey to Google review.' } },
    { slug: 'flows', href: '/produit/flows', name: { fr: 'Flows', en: 'Flows' }, text: { fr: 'Le bon moment pour chaque formulaire.', en: 'The right moment for every form.' } },
  ],
  pricing: { text: { fr: 'Inclus dans Two Way (5 formulaires) et All Inclusive (illimités), ou comme module au choix avec One Way.', en: 'Included in Two Way (5 forms) and All Inclusive (unlimited), or as your module of choice with One Way.' } },
  faq: [
    { q: { fr: 'Peut-on vendre dans un formulaire ?', en: 'Can a form sell?' }, a: { fr: 'Oui : un bloc d’offre (petit-déjeuner, surclassement, spa…) s’insère dans n’importe quel formulaire, avec paiement en ligne.', en: 'Yes: an offer block (breakfast, upgrade, spa…) fits into any form, with online payment.' } },
    { q: { fr: 'Les questions peuvent-elles changer selon les réponses ?', en: 'Can questions change based on answers?' }, a: { fr: 'Oui, la logique conditionnelle ouvre ou masque des questions.', en: 'Yes, conditional logic shows or hides questions.' } },
    { q: { fr: 'Où arrivent les réponses ?', en: 'Where do answers go?' }, a: { fr: 'Sur la fiche du client, et dans l’analyse des réponses.', en: 'On the guest profile, and in the answer analysis.' } },
    { q: { fr: 'Fonctionne-t-il sur tablette à la réception ?', en: 'Does it work on a reception tablet?' }, a: { fr: 'Oui, avec le mode borne.', en: 'Yes, with kiosk mode.' } },
  ],
  cta: { title: { fr: 'Posez enfin les bonnes questions.', en: 'Finally ask the right questions.' } },
};
