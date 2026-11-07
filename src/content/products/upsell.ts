import type { ProductLanding } from './types';

export const upsell: ProductLanding = {
  slug: 'upsell',
  legacySlug: 'ventes-additionnelles',
  name: { fr: 'Upsell', en: 'Upsell' },
  seo: {
    title: { fr: 'Upsell hôtel : ventes additionnelles avant l’arrivée | TriggerFlow', en: 'Hotel upselling before arrival | TriggerFlow' },
    description: {
      fr: 'Surclassement, petit-déjeuner, spa, late check-out : proposez le bon extra au bon client avant son arrivée, paiement en ligne et PMS mis à jour.',
      en: 'Room upgrades, breakfast, spa, late check-out: offer the right extra to the right guest before arrival, with online payment and PMS sync.',
    },
  },
  hero: {
    title: { fr: 'Vendez le bon extra au bon client, avant son arrivée.', en: 'Sell the right extra to the right guest, before they arrive.' },
    subtitle: {
      fr: 'Surclassement, petit-déjeuner, spa, late check-out : TriggerFlow propose la bonne offre à chaque client selon son séjour. Il achète en deux clics, la réservation est mise à jour dans votre PMS.',
      en: 'Upgrades, breakfast, spa, late check-out: TriggerFlow offers each guest the right extra based on their stay. They buy in two clicks and the booking is updated in your PMS.',
    },
    visual: 'upsell',
  },
  proof: {
    stat: 'paidWithin2h',
    statLabel: { fr: 'des paiements par lien réglés dans les 2 h', en: 'of payment links settled within 2 hours' },
    clients: ['AMMI Hôtels', 'Hôtel Causse Comtal'],
  },
  problem: {
    title: { fr: 'Vos extras se vendent mal quand personne n’a le temps de les proposer.', en: 'Extras don’t sell when nobody has time to offer them.' },
    items: [
      { fr: 'La réception n’a pas le temps de vendre au comptoir, surtout aux heures d’arrivée.', en: 'The front desk has no time to sell at check-in, especially at peak hours.' },
      { fr: 'Tout le monde reçoit la même offre : le voyageur d’affaires se voit proposer le kids club.', en: 'Everyone gets the same offer: the business traveller is offered the kids club.' },
      { fr: 'Les demandes par téléphone ou par email ne sont notées nulle part et s’oublient.', en: 'Requests by phone or email are written down nowhere and get forgotten.' },
    ],
  },
  how: {
    title: { fr: 'Trois étapes, une seule fois.', en: 'Three steps, set up once.' },
    steps: [
      { title: { fr: 'Créez votre catalogue', en: 'Build your catalogue' }, text: { fr: 'Offres, prix, stocks, photos et créneaux. Surclassements de chambre compris.', en: 'Offers, prices, stock, photos and time slots. Room upgrades included.' } },
      { title: { fr: 'Choisissez qui reçoit quoi', en: 'Choose who gets what' }, text: { fr: 'Par segment, au bon moment du parcours, sur le bon canal : email, SMS, WhatsApp ou formulaire.', en: 'By segment, at the right moment of the journey, on the right channel: email, SMS, WhatsApp or form.' } },
      { title: { fr: 'Le client achète en deux clics', en: 'The guest buys in two clicks' }, text: { fr: 'Paiement en ligne, commande visible par l’équipe, réservation mise à jour dans le PMS.', en: 'Online payment, order visible to the team, booking updated in the PMS.' } },
    ],
  },
  features: {
    title: { fr: 'Tout pour vendre sans effort de la réception.', en: 'Everything to sell without front desk effort.' },
    items: [
      { icon: 'users', title: { fr: 'Offres par segment', en: 'Offers by segment' }, text: { fr: 'Couples, familles, affaires, clients fidèles : chacun voit ce qui le concerne.', en: 'Couples, families, business, loyal guests: each sees what is relevant.' } },
      { icon: 'bed', title: { fr: 'Surclassement de chambre', en: 'Room upgrades' }, text: { fr: 'Proposez la catégorie supérieure avec le supplément calculé.', en: 'Offer the next room category with the supplement calculated.' } },
      { icon: 'clipboard', title: { fr: 'Offres dans les formulaires', en: 'Offers inside forms' }, text: { fr: 'Le check-in en ligne ou l’enquête pré-séjour peuvent vendre.', en: 'Online check-in or the pre-stay survey can sell too.' } },
      { icon: 'creditCard', title: { fr: 'Paiement intégré', en: 'Built-in payment' }, text: { fr: 'Stripe, PayZen, SystemPay, Apaleo Pay ou Thaïs Payment.', en: 'Stripe, PayZen, SystemPay, Apaleo Pay or Thaïs Payment.' } },
      { icon: 'package', title: { fr: 'Suivi des commandes', en: 'Order tracking' }, text: { fr: 'Chaque commande arrive dans TriggerFlow, rattachée à la fiche client.', en: 'Every order lands in TriggerFlow, linked to the guest profile.' } },
      { icon: 'barChart', title: { fr: 'Statistiques de vente', en: 'Sales statistics' }, text: { fr: 'Chiffre d’affaires, panier moyen, offres qui marchent le mieux.', en: 'Revenue, average basket, best-performing offers.' } },
    ],
  },
  tailored: {
    title: { fr: 'Taillé pour votre hôtel.', en: 'Shaped around your hotel.' },
    items: [
      { client: 'Hôtel Causse Comtal', text: { fr: 'Le client qui n’a pas de petit-déjeuner se le voit proposer ; celui en demi-pension choisit l’heure de son dîner.', en: 'Guests without breakfast are offered it; half-board guests pick their dinner time.' } },
      { client: 'AMMI Hôtels', text: { fr: 'Les réceptionnistes suivent l’upsell et les commandes dans un tableau de bord simplifié.', en: 'Receptionists follow upsells and orders in a simplified dashboard.' } },
      { client: 'Hôtel Causse Comtal', text: { fr: 'Un soin compris dans le séjour ? Le client reçoit un formulaire pour réserver son créneau avant d’arriver.', en: 'Treatment included in the stay? The guest gets a form to book their slot before arriving.' } },
    ],
  },
  caseStudy: {
    quote: {
      fr: 'Aujourd’hui, mes clients reçoivent un e-mail personnalisé qui tient compte de leur réservation. Ils n’ont pas de petit déjeuner ? On leur propose d’en réserver un. Pas de repas ? Idem.',
      en: 'Today my guests receive a personalised email based on their booking. No breakfast? We offer to add one. No dinner? Same.',
    },
    name: 'Baptiste Legout',
    role: { fr: 'Propriétaire', en: 'Owner' },
    company: 'Hôtel Causse Comtal',
    href: '/clients/causse-comtal',
  },
  integrations: {
    title: { fr: 'La commande remonte dans votre PMS.', en: 'Orders flow back into your PMS.' },
    text: { fr: 'Connecté nativement à votre PMS et à votre prestataire de paiement.', en: 'Natively connected to your PMS and your payment provider.' },
    extra: ['Stripe', 'PayZen', 'SystemPay', 'Apaleo Pay', 'Thaïs Payment'],
  },
  reliability: { stat: 'paidWithin2h', label: { fr: 'des paiements par lien réglés dans les 2 h', en: 'of payment links settled within 2 hours' } },
  related: [
    { slug: 'pay', href: '/produit/pay', name: { fr: 'Pay', en: 'Pay' }, text: { fr: 'Acomptes, cautions et liens de paiement.', en: 'Deposits, holds and payment links.' } },
    { slug: 'forms', href: '/produit/forms', name: { fr: 'Formulaires', en: 'Forms' }, text: { fr: 'Des formulaires libres qui peuvent vendre.', en: 'Custom forms that can sell.' } },
    { slug: 'flows', href: '/produit/flows', name: { fr: 'Flows', en: 'Flows' }, text: { fr: 'Le bon moment pour chaque offre.', en: 'The right moment for every offer.' } },
  ],
  pricing: { text: { fr: 'Inclus dans les plans Conversion et All Inclusive.', en: 'Included in the Conversion and All Inclusive plans.' } },
  faq: [
    { q: { fr: 'Comment TriggerFlow sait quelle offre proposer à qui ?', en: 'How does TriggerFlow know which offer to show to whom?' }, a: { fr: 'Vous définissez des segments à partir des données de la réservation et du client (nombre d’adultes et d’enfants, type de chambre, canal de réservation, historique). Chaque offre est liée à un ou plusieurs segments.', en: 'You define segments from booking and guest data (adults and children, room type, booking channel, history). Each offer is linked to one or more segments.' } },
    { q: { fr: 'Le client doit-il passer à la réception pour réserver ?', en: 'Does the guest have to go to the front desk?' }, a: { fr: 'Non. Il réserve et paie en ligne depuis l’email, le SMS, WhatsApp ou un formulaire. La commande arrive directement dans TriggerFlow.', en: 'No. They book and pay online from the email, SMS, WhatsApp or a form. The order lands directly in TriggerFlow.' } },
    { q: { fr: 'Puis-je fixer mes propres prix et stocks ?', en: 'Can I set my own prices and stock?' }, a: { fr: 'Oui. Prix, quantités disponibles, créneaux et conditions sont gérés par vous dans le catalogue.', en: 'Yes. Prices, available quantities, time slots and conditions are managed by you in the catalogue.' } },
    { q: { fr: 'La commande arrive-t-elle dans mon PMS ?', en: 'Does the order reach my PMS?' }, a: { fr: 'Oui, avec les PMS connectés nativement : la réservation est mise à jour sans double saisie.', en: 'Yes, with natively connected PMS: the booking is updated with no double entry.' } },
    { q: { fr: 'Quels moyens de paiement sont acceptés ?', en: 'Which payment methods are supported?' }, a: { fr: 'Le paiement passe par votre prestataire : Stripe, PayZen, SystemPay, Apaleo Pay ou Thaïs Payment.', en: 'Payment goes through your provider: Stripe, PayZen, SystemPay, Apaleo Pay or Thaïs Payment.' } },
  ],
  cta: { title: { fr: 'Proposez votre premier extra cette semaine.', en: 'Offer your first extra this week.' } },
};
