/**
 * Contenu de la landing Upsell (FR/EN).
 * Chiffres de l'étude : « Le guide des ventes additionnelles », TriggerFlow, été 2026 (livre blanc publié).
 * Faits confirmés par Soufiane le 08/11/2026 : aucune commission sur l'upsell, vente inscrite sur le folio du PMS,
 * agent conversationnel capable de proposer des extras. Pas de vente aux non-résidents à date (ne pas l'annoncer).
 */
type L = { fr: string; en: string };

export const upsellLanding = {
  seo: {
    title: { fr: 'Upsell hôtel : vendez vos extras avant l’arrivée | TriggerFlow', en: 'Hotel upselling: sell extras before arrival | TriggerFlow' },
    description: {
      fr: 'Surclassement, petit-déjeuner, spa, late check-out : proposez le bon extra à chaque client, au bon moment. Paiement en ligne, vente sur le folio PMS, 0 % de commission.',
      en: 'Upgrades, breakfast, spa, late check-out: offer the right extra to each guest at the right time. Online payment, posted to the PMS folio, 0% commission.',
    },
  },
  hero: {
    eyebrow: { fr: 'Upsell', en: 'Upsell' } as L,
    title: { fr: 'Vendez le bon extra, au bon client, au bon moment.', en: 'Sell the right extra, to the right guest, at the right time.' } as L,
    subtitle: {
      fr: 'Petit-déjeuner, surclassement, spa, late check-out : chaque client reçoit les offres qui correspondent à son séjour, avant même d’arriver. Il paie en ligne, la vente s’inscrit dans votre PMS.',
      en: 'Breakfast, upgrades, spa, late check-out: each guest gets the offers that fit their stay, before they even arrive. They pay online and the sale lands in your PMS.',
    } as L,
    bullets: [
      { fr: 'Des offres choisies selon le profil et la réservation', en: 'Offers picked from the guest profile and booking' },
      { fr: 'Payé en ligne, inscrit sur le folio du PMS', en: 'Paid online, posted to the PMS folio' },
      { fr: 'Aucune commission : vous gardez 100 % des ventes', en: 'No commission: you keep 100% of sales' },
    ] as L[],
    ordersAlt: { fr: 'Commandes d’extras dans TriggerFlow : client, date d’arrivée, source et montant', en: 'Extra orders in TriggerFlow: guest, arrival date, source and amount' } as L,
    emailAlt: { fr: 'Email d’avant-séjour du Domaine Le Coq Enchanté proposant massage et vélos électriques', en: 'Domaine Le Coq Enchanté pre-stay email offering massages and e-bikes' } as L,
    emailCaption: { fr: 'Côté client · Domaine Le Coq Enchanté', en: 'Guest side · Domaine Le Coq Enchanté' } as L,
  },
  proof: {
    label: { fr: 'Ils vendent leurs extras avec TriggerFlow', en: 'They sell their extras with TriggerFlow' } as L,
    clients: ['Hôtel Causse Comtal', 'AMMI Hôtels'],
    stat: { fr: 'des paiements par lien réglés dans les 2 h après ouverture', en: 'of payment links settled within 2 hours of opening' } as L,
  },
  study: {
    eyebrow: { fr: 'Ce que dit notre étude', en: 'What our study shows' } as L,
    title: { fr: 'Vendre plus, c’est surtout vendre au bon moment.', en: 'Selling more is mostly about timing.' } as L,
    titleMuted: { fr: 'Les chiffres le prouvent.', en: 'The numbers prove it.' } as L,
    subtitle: {
      fr: 'Nous avons analysé un été complet d’emails d’avant-séjour envoyés par des hôtels indépendants. Trois réglages font toute la différence.',
      en: 'We analysed a full summer of pre-stay emails sent by independent hotels. Three settings make all the difference.',
    } as L,
    figures: [
      { value: '1 847 €', label: { fr: 'de ventes pour 1 000 emails de préparation au séjour', en: 'in sales per 1,000 pre-stay emails' } as L },
      { value: '×9', label: { fr: 'de revenu entre le meilleur moment d’envoi (J-4 à J-7) et le pire (la veille)', en: 'more revenue between the best send time (D-4 to D-7) and the worst (the day before)' } as L },
      { value: '×2,7', label: { fr: 'avec un catalogue de 4 à 6 produits plutôt que de 1 à 3', en: 'with a catalogue of 4 to 6 products instead of 1 to 3' } as L },
    ],
    source: { fr: 'Source : « Le guide des ventes additionnelles », TriggerFlow, été 2026 · données anonymisées', en: 'Source: “The upselling guide”, TriggerFlow, summer 2026 · anonymised data' } as L,
  },
  moments: {
    eyebrow: { fr: 'Les moments de vente', en: 'Selling moments' } as L,
    title: { fr: 'Une offre à chaque étape du séjour, jamais au hasard.', en: 'An offer at every step of the stay, never at random.' } as L,
    subtitle: { fr: 'Les offres partent seules, au moment où le client est le plus réceptif.', en: 'Offers go out on their own, when the guest is most receptive.' } as L,
    exampleLabel: { fr: 'Exemple :', en: 'Example:' } as L,
    items: [
      { when: { fr: 'Dès la réservation', en: 'At booking' }, title: { fr: 'L’email de confirmation', en: 'The confirmation email' }, text: { fr: 'Le client vient de choisir votre hôtel : c’est le moment du surclassement.', en: 'The guest just chose your hotel: the moment for an upgrade.' }, example: { fr: 'chambre supérieure avec balcon, +35 € la nuit', en: 'superior room with balcony, +€35 a night' } },
      { when: { fr: 'J-7 à J-4', en: 'D-7 to D-4' }, title: { fr: 'L’email de préparation', en: 'The pre-stay email' }, text: { fr: 'Le meilleur moment selon notre étude : le séjour se prépare, le client a le temps.', en: 'The best moment in our study: the stay is being planned and the guest has time.' }, example: { fr: 'massage, dîner, vélos électriques', en: 'massage, dinner, e-bikes' } },
      { when: { fr: 'Au check-in en ligne', en: 'At online check-in' }, title: { fr: 'Le formulaire qui vend', en: 'The form that sells' }, text: { fr: 'Le client remplit déjà un formulaire : les options s’ajoutent en une case à cocher.', en: 'The guest is already filling in a form: options are one tick away.' }, example: { fr: 'petit-déjeuner, parking, heure d’arrivée', en: 'breakfast, parking, arrival time' } },
      { when: { fr: 'Pendant le séjour', en: 'During the stay' }, title: { fr: 'Guest App et WhatsApp', en: 'Guest App and WhatsApp' }, text: { fr: 'Le client commande depuis son téléphone, ou demande à l’agent IA qui propose le bon extra.', en: 'The guest orders from their phone, or asks the AI agent, which suggests the right extra.' }, example: { fr: 'late check-out, room service, spa', en: 'late check-out, room service, spa' } },
    ],
  },
  rules: {
    eyebrow: { fr: 'Une offre par profil', en: 'One offer per profile' } as L,
    title: { fr: 'Le même catalogue pour tout le monde,', en: 'The same catalogue for everyone' } as L,
    titleMuted: { fr: 'c’est des ventes perdues.', en: 'means lost sales.' } as L,
    subtitle: { fr: 'Vous fixez les règles à partir de la réservation et de la fiche client. TriggerFlow les applique à chaque séjour.', en: 'You set the rules from the booking and the guest profile. TriggerFlow applies them to every stay.' } as L,
    ifLabel: { fr: 'Si', en: 'If' } as L,
    thenLabel: { fr: 'Alors', en: 'Then' } as L,
    items: [
      { if: { fr: 'Couple, réservation sans petit-déjeuner', en: 'Couple, booking without breakfast' }, then: { fr: 'Petit-déjeuner pour deux', en: 'Breakfast for two' }, how: { fr: 'Proposé dans l’email de préparation, payé en ligne, ajouté à la réservation.', en: 'Offered in the pre-stay email, paid online, added to the booking.' } },
      { if: { fr: 'Séjour de 3 nuits ou plus en demi-pension', en: '3+ night stay on half board' }, then: { fr: 'Choix de l’heure du dîner, soin au spa', en: 'Dinner time choice, spa treatment' }, how: { fr: 'Le client réserve son créneau avant d’arriver, le restaurant et le spa sont prévenus.', en: 'The guest books their slot before arriving; restaurant and spa are notified.' } },
      { if: { fr: 'Voyageur d’affaires, départ en semaine', en: 'Business traveller, weekday departure' }, then: { fr: 'Late check-out et parking', en: 'Late check-out and parking' }, how: { fr: 'Envoyé par WhatsApp la veille du départ, validé en un message.', en: 'Sent on WhatsApp the day before departure, confirmed in one message.' } },
    ],
    ai: { fr: 'Pendant le séjour, l’agent IA répond aux questions des clients et propose les extras de votre catalogue quand c’est pertinent.', en: 'During the stay, the AI agent answers guest questions and suggests extras from your catalogue when relevant.' } as L,
  },
  catalogue: {
    eyebrow: { fr: 'Votre catalogue', en: 'Your catalogue' } as L,
    title: { fr: 'Tout ce que votre hôtel peut vendre.', en: 'Everything your hotel can sell.' } as L,
    subtitle: { fr: 'Prix, stocks, créneaux, photos et traductions : vous gérez tout, par catalogue et par profil.', en: 'Prices, stock, time slots, photos and translations: you manage it all, by catalogue and by profile.' } as L,
    items: [
      { fr: 'Surclassement', en: 'Room upgrade' },
      { fr: 'Petit-déjeuner', en: 'Breakfast' },
      { fr: 'Arrivée tôt, départ tard', en: 'Early check-in, late check-out' },
      { fr: 'Spa et soins', en: 'Spa and treatments' },
      { fr: 'Parking', en: 'Parking' },
      { fr: 'Dîner et expériences', en: 'Dinner and experiences' },
    ] as L[],
  },
  payment: {
    eyebrow: { fr: 'Paiement et PMS', en: 'Payment and PMS' } as L,
    title: { fr: 'Payé en ligne, inscrit dans le PMS, sans ressaisie.', en: 'Paid online, posted to the PMS, no re-entry.' } as L,
    points: [
      { title: { fr: 'Paiement en ligne', en: 'Online payment' }, text: { fr: 'Le client paie en deux clics, avec votre prestataire de paiement habituel.', en: 'The guest pays in two clicks, through your usual payment provider.' } },
      { title: { fr: 'Inscrit sur le folio du PMS', en: 'Posted to the PMS folio' }, text: { fr: 'La vente apparaît sur la réservation du client, sans double saisie à la réception.', en: 'The sale shows on the guest’s booking, with no double entry at the front desk.' } },
      { title: { fr: 'L’équipe est prévenue', en: 'The team is notified' }, text: { fr: 'Restaurant, spa ou réception reçoivent la commande avec le nom du client et la date.', en: 'Restaurant, spa or front desk get the order with the guest’s name and date.' } },
    ],
    commission: {
      eyebrow: { fr: 'Zéro commission', en: 'Zero commission' } as L,
      title: { fr: 'Vous gardez 100 % de ce que vous vendez.', en: 'You keep 100% of what you sell.' } as L,
      text: { fr: 'Aucun pourcentage prélevé sur vos ventes additionnelles. L’upsell est compris dans votre formule TriggerFlow.', en: 'No percentage taken on your upsells. Upselling is part of your TriggerFlow plan.' } as L,
    },
  },
  dashboard: {
    eyebrow: { fr: 'Pilotage', en: 'Reporting' } as L,
    title: { fr: 'Voyez ce qui se vend, et ce qui rapporte.', en: 'See what sells, and what pays.' } as L,
    subtitle: { fr: 'Chiffre d’affaires, nombre de ventes, panier moyen et comparaison entre deux périodes, par offre et par catalogue.', en: 'Revenue, number of sales, average basket and period comparison, by offer and by catalogue.' } as L,
    alt: { fr: 'Statistiques de ventes TriggerFlow : chiffre d’affaires, ventes et panier moyen', en: 'TriggerFlow sales statistics: revenue, sales and average basket' } as L,
    caption: { fr: 'Capture de l’application, compte de démonstration', en: 'App screenshot, demo account' } as L,
  },
  quote: {
    text: { fr: 'Aujourd’hui, mes clients reçoivent un e-mail personnalisé qui tient compte de leur réservation. Ils n’ont pas de petit déjeuner ? On leur propose d’en réserver un. Pas de repas ? Idem.', en: 'Today my guests receive a personalised email based on their booking. No breakfast? We offer to add one. No dinner? Same.' } as L,
    name: 'Baptiste Legout',
    role: { fr: 'Propriétaire', en: 'Owner' } as L,
    company: 'Hôtel Causse Comtal',
    more: { fr: 'Lire le cas Causse Comtal', en: 'Read the Causse Comtal story' } as L,
  },
  compare: {
    eyebrow: { fr: 'Pourquoi pas un outil d’upsell à part ?', en: 'Why not a standalone upsell tool?' } as L,
    title: { fr: 'L’upsell marche mieux quand il connaît le client.', en: 'Upselling works better when it knows the guest.' } as L,
    criteria: { fr: 'Critère', en: 'Criterion' } as L,
    other: { fr: 'Outil d’upsell à part', en: 'Standalone upsell tool' } as L,
    rows: [
      { label: { fr: 'Connaissance du client', en: 'Guest knowledge' }, other: { fr: 'Une base de plus, séparée de vos messages', en: 'Another database, separate from your messages' }, us: { fr: 'La même fiche client que vos emails et WhatsApp', en: 'The same guest profile as your emails and WhatsApp' } },
      { label: { fr: 'Personnalisation', en: 'Personalisation' }, other: { fr: 'Le même catalogue pour tout le monde', en: 'The same catalogue for everyone' }, us: { fr: 'Des offres par segment et par historique', en: 'Offers by segment and history' } },
      { label: { fr: 'Canaux', en: 'Channels' }, other: { fr: 'Un lien dans un email', en: 'A link in an email' }, us: { fr: 'Email, SMS, WhatsApp, formulaires, Guest App', en: 'Email, SMS, WhatsApp, forms, Guest App' } },
      { label: { fr: 'Outils à gérer', en: 'Tools to manage' }, other: { fr: 'Un abonnement et une intégration en plus', en: 'One more subscription and integration' }, us: { fr: 'Compris dans votre CRM', en: 'Part of your CRM' } },
    ],
  },
  setup: {
    eyebrow: { fr: 'Mise en place', en: 'Setup' } as L,
    title: { fr: 'Livré clé en main, avec notre équipe.', en: 'Delivered turnkey, with our team.' } as L,
    steps: [
      { title: { fr: 'Votre catalogue', en: 'Your catalogue' }, text: { fr: 'Nous créons avec vous 4 à 6 offres, avec prix, photos et une option gratuite pour faire entrer le client.', en: 'We build 4 to 6 offers with you, with prices, photos and one free option to draw the guest in.' } },
      { title: { fr: 'Vos règles et vos envois', en: 'Your rules and sends' }, text: { fr: 'Qui reçoit quoi, et quand : l’email de préparation à J-4, en fin de matinée, comme le recommande l’étude.', en: 'Who gets what, and when: the pre-stay email at D-4, late morning, as the study recommends.' } },
      { title: { fr: 'PMS et paiement', en: 'PMS and payment' }, text: { fr: 'Votre PMS et votre prestataire de paiement sont connectés, les commandes arrivent à l’équipe.', en: 'Your PMS and payment provider are connected; orders reach the team.' } },
    ],
    pricingLabel: { fr: 'Tarif', en: 'Pricing' } as L,
    pricing: { fr: 'Inclus dans Two Way et All Inclusive, ou comme module au choix avec One Way.', en: 'Included in Two Way and All Inclusive, or as your module of choice with One Way.' } as L,
    pricingCta: { fr: 'Voir les tarifs', en: 'See pricing' } as L,
  },
  faqTitle: { fr: 'Vos questions sur l’upsell.', en: 'Your questions about upselling.' } as L,
  faq: [
    { q: { fr: 'TriggerFlow prend-il une commission sur les ventes ?', en: 'Does TriggerFlow take a commission on sales?' }, a: { fr: 'Non. Vous gardez 100 % de vos ventes additionnelles : l’upsell est compris dans votre formule.', en: 'No. You keep 100% of your upsell revenue: upselling is included in your plan.' } },
    { q: { fr: 'La vente arrive-t-elle dans mon PMS ?', en: 'Does the sale reach my PMS?' }, a: { fr: 'Oui. Avec les PMS connectés nativement, la vente est inscrite sur le folio de la réservation, sans double saisie.', en: 'Yes. With natively connected PMS, the sale is posted to the booking folio, with no double entry.' } },
    { q: { fr: 'Comment TriggerFlow sait quelle offre proposer à qui ?', en: 'How does TriggerFlow know which offer to show to whom?' }, a: { fr: 'Vous définissez des segments à partir de la réservation et de la fiche client : nombre d’adultes et d’enfants, type de chambre, canal de réservation, durée, historique. Chaque offre est liée à un ou plusieurs segments.', en: 'You define segments from the booking and guest profile: adults and children, room type, booking channel, length of stay, history. Each offer is linked to one or more segments.' } },
    { q: { fr: 'Quels moyens de paiement sont acceptés ?', en: 'Which payment methods are supported?' }, a: { fr: 'Le paiement passe par votre prestataire : Stripe, PayZen, SystemPay, Apaleo Pay ou Thaïs Payment.', en: 'Payment goes through your provider: Stripe, PayZen, SystemPay, Apaleo Pay or Thaïs Payment.' } },
    { q: { fr: 'Puis-je fixer mes propres prix, stocks et créneaux ?', en: 'Can I set my own prices, stock and time slots?' }, a: { fr: 'Oui. Prix, quantités, créneaux, photos et conditions se gèrent dans le catalogue, avec la traduction des offres.', en: 'Yes. Prices, quantities, time slots, photos and conditions are managed in the catalogue, with offer translation.' } },
    { q: { fr: 'L’IA peut-elle proposer des extras ?', en: 'Can the AI suggest extras?' }, a: { fr: 'Oui. L’agent conversationnel répond aux clients et peut proposer les offres de votre catalogue quand la question s’y prête.', en: 'Yes. The conversational agent answers guests and can suggest offers from your catalogue when relevant.' } },
  ],
  cta: {
    title: { fr: 'Proposez votre premier extra cette semaine.', en: 'Offer your first extra this week.' } as L,
    text: { fr: 'Une démo de 45 minutes, à partir de votre catalogue et de votre PMS.', en: 'A 45-minute demo, built around your catalogue and your PMS.' } as L,
    demo: { fr: 'Demander une démo', en: 'Book a demo' } as L,
    guide: { fr: 'Télécharger l’étude', en: 'Download the study' } as L,
  },
};
