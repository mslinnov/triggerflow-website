/**
 * Contenu de la landing Paiements (FR/EN).
 * Capacités : audit du code (origin/main, 08/11/2026) : 5 prestataires, 3 types (paiement, caution, empreinte),
 * 4 modes de montant, libération automatique des cautions, lecture des montants payés dans 12 PMS.
 * Validé par Soufiane (08/11) : 0 commission TriggerFlow ; écriture dans le PMS présentée comme « dès que votre PMS
 * le permet » ; Apple Pay / Google Pay proposés quand le prestataire de l'hôtel les propose.
 * Ne PAS affirmer : reçu envoyé au client, paiement en plusieurs fois, acompte restaurant, factures B2B.
 */
type L = { fr: string; en: string };

export const payLanding = {
  seo: {
    title: { fr: 'Paiement hôtel : liens, cautions et reste dû | TriggerFlow', en: 'Hotel payments: links, deposits and balance due | TriggerFlow' },
    description: {
      fr: 'Liens de paiement, cautions et empreintes de carte envoyés au bon moment, avec le reste dû lu dans votre PMS. Votre prestataire, zéro commission TriggerFlow.',
      en: 'Payment links, holds and card imprints sent at the right time, with the balance due read from your PMS. Your provider, zero TriggerFlow commission.',
    },
  },
  hero: {
    eyebrow: { fr: 'Paiements', en: 'Payments' } as L,
    title: { fr: 'Le bon montant, au bon moment, sans courir après vos clients.', en: 'The right amount, at the right time, without chasing guests.' } as L,
    subtitle: {
      fr: 'Acomptes, soldes, cautions et empreintes de carte partent automatiquement dans vos messages. Le montant vient de votre PMS, l’argent arrive sur votre compte, et vos relances savent qui a payé.',
      en: 'Deposits, balances, holds and card imprints go out automatically in your messages. The amount comes from your PMS, the money lands in your account, and your reminders know who has paid.',
    } as L,
    bullets: [
      { fr: 'Le reste dû calculé depuis votre PMS, à chaque ouverture du lien', en: 'Balance due calculated from your PMS, every time the link is opened' },
      { fr: 'Votre prestataire de paiement, l’argent sur votre compte', en: 'Your payment provider, the money in your account' },
      { fr: 'Zéro commission TriggerFlow sur vos encaissements', en: 'Zero TriggerFlow commission on your payments' },
    ] as L[],
    alt: { fr: 'Paiements TriggerFlow : total encaissé, transactions et statut par client', en: 'TriggerFlow payments: total collected, transactions and status per guest' } as L,
  },
  proof: {
    label: { fr: 'Ils encaissent avec TriggerFlow', en: 'They collect payments with TriggerFlow' } as L,
    clients: ['Hôtel Arc en Ciel', 'Hôtel Causse Comtal', 'Urban Bivouac'],
    stat: { fr: 'des paiements réglés dans les 2 h après ouverture du lien', en: 'of payments settled within 2 hours of opening the link' } as L,
  },
  types: {
    eyebrow: { fr: 'Trois façons d’encaisser', en: 'Three ways to collect' } as L,
    title: { fr: 'Encaisser, bloquer,', en: 'Charge, hold,' } as L,
    titleMuted: { fr: 'ou garantir.', en: 'or guarantee.' } as L,
    items: [
      { title: { fr: 'Paiement', en: 'Payment' }, text: { fr: 'Acompte, solde, extras ou commande : le client paie en ligne, le montant est débité.', en: 'Deposit, balance, extras or order: the guest pays online, the amount is charged.' }, example: { fr: '30 % à la réservation', en: '30% at booking' } },
      { title: { fr: 'Caution', en: 'Hold' }, text: { fr: 'Un montant bloqué sur la carte, sans être débité. Vous l’encaissez en tout ou partie, ou il est libéré.', en: 'An amount held on the card, not charged. You capture all or part of it, or it is released.' }, example: { fr: '200 € bloqués avant l’arrivée', en: '€200 held before arrival' } },
      { title: { fr: 'Empreinte de carte', en: 'Card imprint' }, text: { fr: 'La carte est enregistrée chez votre prestataire. Vous pourrez la débiter plus tard, en cas de no-show ou de minibar.', en: 'The card is saved with your provider. You can charge it later, for a no-show or the minibar.' }, example: { fr: 'Garantie contre le no-show', en: 'No-show guarantee' } },
    ],
  },
  amount: {
    eyebrow: { fr: 'Le bon montant', en: 'The right amount' } as L,
    title: { fr: 'Le montant juste, sans calculatrice.', en: 'The exact amount, no calculator.' } as L,
    subtitle: { fr: 'Le montant est recalculé à chaque ouverture du lien. Si le client a payé une partie à la réception ou par virement, le lien le sait.', en: 'The amount is recalculated every time the link is opened. If the guest paid part at the desk or by transfer, the link knows.' } as L,
    modes: [
      { title: { fr: 'Reste dû', en: 'Balance due' }, text: { fr: 'Le prix du séjour moins ce qui est déjà payé, lu dans votre PMS.', en: 'The stay price minus what has already been paid, read from your PMS.' } },
      { title: { fr: 'Pourcentage', en: 'Percentage' }, text: { fr: 'Une part du séjour, par exemple 30 % à la réservation.', en: 'A share of the stay, for example 30% at booking.' } },
      { title: { fr: 'Montant fixe', en: 'Fixed amount' }, text: { fr: 'Une caution de 200 €, un forfait, un supplément.', en: 'A €200 hold, a package, a supplement.' } },
      { title: { fr: 'Commande', en: 'Order' }, text: { fr: 'Le total des extras commandés par le client.', en: 'The total of the extras the guest ordered.' } },
    ],
    optionsTitle: { fr: 'Et si besoin :', en: 'And if needed:' } as L,
    options: [
      { fr: 'sans la taxe de séjour', en: 'excluding tourist tax' },
      { fr: 'sans les extras', en: 'excluding extras' },
      { fr: 'la première nuit seulement', en: 'first night only' },
    ] as L[],
    example: {
      label: { fr: 'Exemple · réservation de 3 nuits', en: 'Example · 3-night booking' } as L,
      rows: [
        { label: { fr: 'Séjour', en: 'Stay' } as L, value: '540,00 €' },
        { label: { fr: 'Taxe de séjour', en: 'Tourist tax' } as L, value: '7,20 €' },
        { label: { fr: 'Déjà payé (acompte)', en: 'Already paid (deposit)' } as L, value: '− 162,00 €' },
      ],
      total: { fr: 'Reste dû envoyé au client', en: 'Balance due sent to the guest' } as L,
      totalValue: '385,20 €',
    },
  },
  timing: {
    eyebrow: { fr: 'Le bon moment', en: 'The right moment' } as L,
    title: { fr: 'Les demandes partent toutes seules, les relances aussi.', en: 'Requests go out on their own, and so do reminders.' } as L,
    subtitle: { fr: 'Le lien s’insère dans n’importe quel message de vos flows, par email, SMS ou WhatsApp. Une condition « payé » vérifie le lien, mais aussi le solde dans votre PMS : un virement ou un paiement à la réception compte.', en: 'The link fits into any flow message, by email, SMS or WhatsApp. A “paid” condition checks the link, but also the balance in your PMS: a bank transfer or a payment at the desk counts.' } as L,
    steps: [
      { when: { fr: 'À la réservation', en: 'At booking' }, what: { fr: 'Email de confirmation avec un acompte de 30 %', en: 'Confirmation email with a 30% deposit' } },
      { when: { fr: '7 jours avant l’arrivée', en: '7 days before arrival' }, what: { fr: 'Si le solde n’est pas réglé : WhatsApp avec le reste dû', en: 'If the balance is unpaid: WhatsApp with the balance due' } },
      { when: { fr: 'Lien expiré', en: 'Link expired' }, what: { fr: 'Nouveau lien par SMS, et alerte à la réception', en: 'New link by SMS, and an alert to the front desk' } },
      { when: { fr: 'Paiement reçu', en: 'Payment received' }, what: { fr: 'Le flow suivant démarre : formulaire d’arrivée, offres', en: 'The next flow starts: arrival form, offers' } },
    ],
    expiry: { fr: 'Chaque lien peut expirer à une date fixe ou relative : 48 h après la réservation, la veille de l’arrivée à 18 h…', en: 'Each link can expire on a fixed or relative date: 48 h after booking, the day before arrival at 6 pm…' } as L,
  },
  holds: {
    eyebrow: { fr: 'Les cautions', en: 'Holds' } as L,
    title: { fr: 'Des cautions qui ne s’oublient pas.', en: 'Holds that never get forgotten.' } as L,
    items: [
      { title: { fr: 'Encaissement en un clic', en: 'One-click capture' }, text: { fr: 'En totalité ou en partie, depuis TriggerFlow.', en: 'In full or in part, from TriggerFlow.' } },
      { title: { fr: 'Libération automatique', en: 'Automatic release' }, text: { fr: 'X jours après le départ, à l’heure que vous choisissez.', en: 'X days after departure, at the time you choose.' } },
      { title: { fr: 'Alerte avant expiration', en: 'Alert before expiry' }, text: { fr: 'Un email avant qu’une caution n’expire chez votre prestataire.', en: 'An email before a hold expires with your provider.' } },
      { title: { fr: 'Remboursements', en: 'Refunds' }, text: { fr: 'Totaux ou partiels, tracés dans l’historique.', en: 'Full or partial, tracked in the history.' } },
    ],
  },
  providers: {
    eyebrow: { fr: 'Votre prestataire, votre argent', en: 'Your provider, your money' } as L,
    title: { fr: 'L’argent arrive sur votre compte. Pas sur le nôtre.', en: 'The money lands in your account. Not ours.' } as L,
    subtitle: { fr: 'Vous gardez votre prestataire de paiement et vos conditions. TriggerFlow ne prend aucune commission sur vos encaissements.', en: 'You keep your payment provider and your terms. TriggerFlow takes no commission on your payments.' } as L,
    cols: { provider: { fr: 'Prestataire', en: 'Provider' }, payment: { fr: 'Paiement', en: 'Payment' }, hold: { fr: 'Caution', en: 'Hold' }, imprint: { fr: 'Empreinte', en: 'Imprint' }, refund: { fr: 'Remboursement', en: 'Refund' } } as Record<string, L>,
    rows: [
      { name: 'Stripe', all: true },
      { name: 'PayZen', all: true },
      { name: 'SystemPay', all: true },
      { name: 'Thaïs Payment', all: false },
      { name: 'Apaleo Pay', all: false },
    ],
    wallets: { fr: 'Apple Pay et Google Pay sont proposés à vos clients quand votre prestataire les propose.', en: 'Apple Pay and Google Pay are offered to your guests when your provider supports them.' } as L,
    pms: { fr: 'Le montant déjà payé est lu dans votre PMS (Mews, Opera Cloud, Thaïs, Apaleo, Medialog et d’autres), et les paiements y sont écrits dès que votre PMS le permet.', en: 'The amount already paid is read from your PMS (Mews, Opera Cloud, Thaïs, Apaleo, Medialog and more), and payments are written back to it whenever your PMS allows.' } as L,
  },
  tracking: {
    eyebrow: { fr: 'Le suivi', en: 'Tracking' } as L,
    title: { fr: 'Qui a payé, d’un coup d’œil.', en: 'Who has paid, at a glance.' } as L,
    items: [
      { fr: 'Tableau de bord : encaissé, remboursé, taux de conversion', en: 'Dashboard: collected, refunded, conversion rate' },
      { fr: 'Cautions à encaisser et paiements échoués signalés', en: 'Holds to capture and failed payments flagged' },
      { fr: 'Statut sur la fiche client et dans la messagerie', en: 'Status on the guest profile and in the inbox' },
      { fr: 'Un email à l’équipe à chaque paiement reçu', en: 'An email to the team for every payment received' },
      { fr: 'Export CSV de toutes les transactions', en: 'CSV export of every transaction' },
    ] as L[],
    caption: { fr: 'Capture de l’application, compte de démonstration', en: 'App screenshot, demo account' } as L,
  },
  security: {
    title: { fr: 'Aucun numéro de carte chez nous.', en: 'No card numbers on our side.' } as L,
    items: [
      { fr: 'Le client paie sur la page sécurisée de votre prestataire, avec 3D Secure', en: 'The guest pays on your provider’s secure page, with 3D Secure' },
      { fr: 'TriggerFlow ne conserve que la marque et les 4 derniers chiffres', en: 'TriggerFlow only keeps the brand and the last 4 digits' },
      { fr: 'Chaque notification de paiement est signée et vérifiée', en: 'Every payment notification is signed and verified' },
      { fr: 'Page de paiement à vos couleurs, en 6 langues', en: 'Payment page in your colours, in 6 languages' },
    ] as L[],
  },
  quote: {
    text: { fr: 'Le vrai gros point fort pour nous reste le suivi des liens de paiement. Pouvoir envoyer automatiquement une demande de paiement, suivre si le client a payé ou non, puis déclencher des relances automatiques, c’est un énorme gain de temps et de sérénité.', en: 'Our biggest win is payment link tracking. Sending a payment request automatically, seeing whether the guest has paid, then triggering automatic reminders saves a huge amount of time and worry.' } as L,
    name: 'Carine Chausson',
    role: { fr: 'Directrice', en: 'Manager' } as L,
    company: 'Hôtel Arc en Ciel',
  },
  compare: {
    eyebrow: { fr: 'Pourquoi pas un lien fait à la main ?', en: 'Why not a manual payment link?' } as L,
    title: { fr: 'Un lien saisi à la main, c’est un montant à recalculer.', en: 'A link typed by hand is an amount to recalculate.' } as L,
    criteria: { fr: 'Critère', en: 'Criterion' } as L,
    other: { fr: 'Lien créé à la main', en: 'Hand-made link' } as L,
    rows: [
      { label: { fr: 'Montant', en: 'Amount' }, other: { fr: 'Calculé et saisi pour chaque réservation', en: 'Calculated and typed for each booking' }, us: { fr: 'Lu dans le PMS, recalculé à l’ouverture', en: 'Read from the PMS, recalculated on opening' } },
      { label: { fr: 'Envoi', en: 'Sending' }, other: { fr: 'Copié dans un email, un par un', en: 'Pasted into an email, one by one' }, us: { fr: 'Automatique dans vos flows', en: 'Automatic in your flows' } },
      { label: { fr: 'Relance', en: 'Reminder' }, other: { fr: 'Quand quelqu’un y pense', en: 'When someone remembers' }, us: { fr: 'Seulement si le client n’a pas payé', en: 'Only if the guest has not paid' } },
      { label: { fr: 'Cautions', en: 'Holds' }, other: { fr: 'À libérer à la main', en: 'Released by hand' }, us: { fr: 'Libérées automatiquement', en: 'Released automatically' } },
    ],
  },
  pricing: { fr: 'Module Paiements : 29 € par mois, sans aucune commission TriggerFlow sur vos encaissements.', en: 'Payments module: €29 per month, with no TriggerFlow commission on your payments.' } as L,
  faqTitle: { fr: 'Vos questions sur les paiements.', en: 'Your questions about payments.' } as L,
  faq: [
    { q: { fr: 'TriggerFlow prend-il une commission ?', en: 'Does TriggerFlow take a commission?' }, a: { fr: 'Non. L’argent arrive sur votre compte, chez votre prestataire, et vous ne payez que l’abonnement au module. Seuls les frais de votre prestataire s’appliquent.', en: 'No. The money lands in your account with your provider, and you only pay the module subscription. Only your provider’s fees apply.' } },
    { q: { fr: 'Quels prestataires de paiement ?', en: 'Which payment providers?' }, a: { fr: 'Stripe, PayZen, SystemPay, Thaïs Payment et Apaleo Pay. Cautions et empreintes de carte sont disponibles avec Stripe, PayZen et SystemPay.', en: 'Stripe, PayZen, SystemPay, Thaïs Payment and Apaleo Pay. Holds and card imprints are available with Stripe, PayZen and SystemPay.' } },
    { q: { fr: 'Le paiement remonte-t-il dans mon PMS ?', en: 'Does the payment flow back into my PMS?' }, a: { fr: 'Le montant déjà payé est lu dans votre PMS pour calculer le reste dû. Le paiement est écrit dans le PMS dès que celui-ci le permet, et nous ajoutons de nouveaux PMS régulièrement.', en: 'The amount already paid is read from your PMS to calculate the balance due. The payment is written back whenever your PMS allows it, and we add new PMS regularly.' } },
    { q: { fr: 'Et si le client a payé par virement ?', en: 'What if the guest paid by bank transfer?' }, a: { fr: 'Dès que le solde est à zéro dans votre PMS, la condition « payé » est vraie : aucune relance ne part.', en: 'As soon as the balance is zero in your PMS, the “paid” condition is true: no reminder goes out.' } },
    { q: { fr: 'Apple Pay et Google Pay sont-ils acceptés ?', en: 'Are Apple Pay and Google Pay accepted?' }, a: { fr: 'Oui, quand votre prestataire de paiement les propose.', en: 'Yes, when your payment provider supports them.' } },
    { q: { fr: 'Les données de carte sont-elles stockées ?', en: 'Is card data stored?' }, a: { fr: 'Non. Le client paie sur la page sécurisée de votre prestataire. TriggerFlow ne garde que la marque de la carte et ses 4 derniers chiffres.', en: 'No. The guest pays on your provider’s secure page. TriggerFlow only keeps the card brand and its last 4 digits.' } },
  ],
  cta: {
    title: { fr: 'Arrêtez de courir après les paiements.', en: 'Stop chasing payments.' } as L,
    text: { fr: 'Une démo de 45 minutes, avec votre PMS et votre prestataire.', en: 'A 45-minute demo, with your PMS and your provider.' } as L,
    demo: { fr: 'Demander une démo', en: 'Book a demo' } as L,
    pricing: { fr: 'Voir les tarifs', en: 'See pricing' } as L,
  },
};
