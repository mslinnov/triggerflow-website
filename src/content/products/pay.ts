import type { ProductLanding } from './types';

export const pay: ProductLanding = {
  slug: 'pay',
  legacySlug: 'paiements',
  name: { fr: 'Pay', en: 'Pay' },
  seo: {
    title: { fr: 'Paiement hôtel : acomptes, cautions et liens de paiement | TriggerFlow', en: 'Hotel payments: deposits, holds and payment links | TriggerFlow' },
    description: {
      fr: 'Envoyez acomptes, cautions et liens de paiement automatiquement, suivez qui a payé et relancez sans y penser. Stripe, PayZen, SystemPay, Apaleo Pay, Thaïs.',
      en: 'Send deposits, holds and payment links automatically, see who has paid and chase without thinking about it. Stripe, PayZen, SystemPay, Apaleo Pay, Thaïs.',
    },
  },
  hero: {
    title: { fr: 'Encaissez avant, pendant et après le séjour, sans courir après vos clients.', en: 'Get paid before, during and after the stay, without chasing guests.' },
    subtitle: {
      fr: 'Acomptes, cautions, empreintes de carte et liens de paiement partent automatiquement au bon moment. Vous voyez qui a payé, les relances partent toutes seules.',
      en: 'Deposits, holds, card imprints and payment links go out automatically at the right time. You see who has paid, reminders go out on their own.',
    },
    visual: 'pay',
  },
  proof: {
    stat: 'paidWithin2h',
    statLabel: { fr: 'des paiements réglés dans les 2 h après ouverture du lien', en: 'of payments settled within 2 hours of opening the link' },
    clients: ['Hôtel Arc en Ciel'],
  },
  problem: {
    title: { fr: 'Courir après les paiements coûte du temps et des nuits.', en: 'Chasing payments costs time and room nights.' },
    items: [
      { fr: 'Les acomptes se demandent à la main, un par un, et les relances s’oublient.', en: 'Deposits are requested by hand, one by one, and reminders get forgotten.' },
      { fr: 'Personne ne sait d’un coup d’œil qui a payé et qui ne l’a pas fait.', en: 'Nobody can see at a glance who has paid and who hasn’t.' },
      { fr: 'Les no-shows sans garantie coûtent des nuits que vous ne revendrez pas.', en: 'No-shows without a guarantee cost nights you won’t resell.' },
    ],
  },
  how: {
    title: { fr: 'Le paiement fait partie du parcours.', en: 'Payment is part of the journey.' },
    steps: [
      { title: { fr: 'Choisissez la règle', en: 'Pick the rule' }, text: { fr: 'Acompte à la réservation, caution avant l’arrivée, solde après le départ.', en: 'Deposit at booking, hold before arrival, balance after departure.' } },
      { title: { fr: 'Le lien part tout seul', en: 'The link goes out on its own' }, text: { fr: 'Par email, SMS ou WhatsApp, aux couleurs de votre hôtel.', en: 'By email, SMS or WhatsApp, in your hotel’s branding.' } },
      { title: { fr: 'Payé, ou relancé', en: 'Paid, or chased' }, text: { fr: 'Le statut s’affiche sur la fiche client ; sans paiement, la relance part automatiquement.', en: 'The status shows on the guest profile; if unpaid, a reminder goes out automatically.' } },
    ],
  },
  features: {
    title: { fr: 'Tous vos encaissements, au même endroit.', en: 'All your payments, in one place.' },
    items: [
      { icon: 'link', title: { fr: 'Liens de paiement', en: 'Payment links' }, text: { fr: 'Montant libre ou calculé, à vos couleurs.', en: 'Custom or calculated amount, in your branding.' } },
      { icon: 'lock', title: { fr: 'Caution et pré-autorisation', en: 'Holds and pre-authorisation' }, text: { fr: 'Bloquez un montant sans le débiter.', en: 'Hold an amount without charging it.' } },
      { icon: 'creditCard', title: { fr: 'Empreinte de carte', en: 'Card imprint' }, text: { fr: 'Garantissez la réservation contre les no-shows.', en: 'Guarantee the booking against no-shows.' } },
      { icon: 'bell', title: { fr: 'Relances automatiques', en: 'Automatic reminders' }, text: { fr: 'Sans paiement, le rappel part tout seul.', en: 'If unpaid, the reminder goes out on its own.' } },
      { icon: 'receipt', title: { fr: 'Remboursements', en: 'Refunds' }, text: { fr: 'Remboursez depuis TriggerFlow, en totalité ou en partie.', en: 'Refund from TriggerFlow, fully or partially.' } },
      { icon: 'users', title: { fr: 'Statut sur la fiche client', en: 'Status on the guest profile' }, text: { fr: 'Toute l’équipe voit qui a payé quoi.', en: 'The whole team sees who paid what.' } },
    ],
  },
  tailored: {
    title: { fr: 'Taillé pour votre hôtel.', en: 'Shaped around your hotel.' },
    items: [
      { client: 'Hôtel Arc en Ciel', text: { fr: 'Demande de paiement automatique, suivi du statut, relances : la réception ne court plus après personne.', en: 'Automatic payment request, status tracking, reminders: the front desk no longer chases anyone.' } },
      { client: { fr: 'Événements', en: 'Events' }, text: { fr: 'Un acompte demandé à chaque participant d’un séminaire, avec la rooming list.', en: 'A deposit requested from each seminar attendee, alongside the rooming list.' } },
      { client: { fr: 'Upsell', en: 'Upsell' }, text: { fr: 'Les extras vendus avant l’arrivée sont payés en ligne, en même temps que la commande.', en: 'Extras sold before arrival are paid online, together with the order.' } },
    ],
  },
  caseStudy: {
    quote: {
      fr: 'Le vrai gros point fort pour nous reste le suivi des liens de paiement. Pouvoir envoyer automatiquement une demande de paiement, suivre si le client a payé ou non, puis déclencher des relances automatiques, c’est un énorme gain de temps et de sérénité.',
      en: 'Our biggest win is payment link tracking. Sending a payment request automatically, seeing whether the guest has paid, then triggering automatic reminders saves a huge amount of time and worry.',
    },
    name: 'Carine Chausson',
    role: { fr: 'Directrice', en: 'Manager' },
    company: 'Hôtel Arc en Ciel',
  },
  integrations: {
    title: { fr: 'Votre prestataire de paiement, votre PMS.', en: 'Your payment provider, your PMS.' },
    text: { fr: 'L’argent arrive chez votre prestataire, le statut remonte dans TriggerFlow et dans le PMS.', en: 'Money goes to your provider, the status flows back into TriggerFlow and the PMS.' },
    extra: ['Stripe', 'PayZen', 'SystemPay', 'Apaleo Pay', 'Thaïs Payment'],
  },
  reliability: { stat: 'paidWithin2h', label: { fr: 'des paiements réglés dans les 2 h', en: 'of payments settled within 2 hours' } },
  related: [
    { slug: 'upsell', href: '/produit/upsell', name: { fr: 'Upsell', en: 'Upsell' }, text: { fr: 'Vendez des extras payés en ligne.', en: 'Sell extras paid online.' } },
    { slug: 'flows', href: '/produit/flows', name: { fr: 'Flows', en: 'Flows' }, text: { fr: 'Le bon moment pour chaque demande.', en: 'The right moment for every request.' } },
    { slug: 'crm', href: '/produit/crm', name: { fr: 'CRM', en: 'CRM' }, text: { fr: 'Le statut de paiement sur chaque fiche.', en: 'Payment status on every profile.' } },
  ],
  pricing: {
    text: { fr: 'Module complémentaire, à ajouter à n’importe quel plan payant.', en: 'Add-on module, available with any paid plan.' },
    addon: 'payments',
  },
  faq: [
    { q: { fr: 'Quels prestataires de paiement sont compatibles ?', en: 'Which payment providers are supported?' }, a: { fr: 'Stripe, PayZen, SystemPay, Apaleo Pay et Thaïs Payment. L’argent arrive directement sur votre compte chez le prestataire.', en: 'Stripe, PayZen, SystemPay, Apaleo Pay and Thaïs Payment. Money goes straight to your account with the provider.' } },
    { q: { fr: 'Puis-je prendre une caution sans débiter le client ?', en: 'Can I hold a deposit without charging the guest?' }, a: { fr: 'Oui, avec la pré-autorisation : le montant est bloqué puis libéré ou encaissé selon votre décision.', en: 'Yes, with pre-authorisation: the amount is held, then released or captured as you decide.' } },
    { q: { fr: 'Les relances sont-elles automatiques ?', en: 'Are reminders automatic?' }, a: { fr: 'Oui. Si le paiement n’est pas fait dans le délai choisi, un rappel part par email, SMS ou WhatsApp.', en: 'Yes. If payment isn’t made within the chosen time, a reminder goes out by email, SMS or WhatsApp.' } },
    { q: { fr: 'L’équipe voit-elle qui a payé ?', en: 'Can the team see who has paid?' }, a: { fr: 'Oui, le statut s’affiche sur la fiche client et dans la liste des transactions.', en: 'Yes, the status shows on the guest profile and in the transaction list.' } },
    { q: { fr: 'Puis-je rembourser depuis TriggerFlow ?', en: 'Can I refund from TriggerFlow?' }, a: { fr: 'Oui, en totalité ou en partie, depuis la transaction.', en: 'Yes, fully or partially, from the transaction.' } },
  ],
  cta: { title: { fr: 'Votre prochain acompte part tout seul.', en: 'Your next deposit goes out on its own.' } },
};
