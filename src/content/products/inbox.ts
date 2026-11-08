import type { ProductLanding } from './types';

export const inbox: ProductLanding = {
  slug: 'inbox',
  legacySlug: 'hub-messagerie',
  name: { fr: 'Messagerie unifiée', en: 'Unified inbox' },
  seo: {
    title: { fr: 'Messagerie hôtelière unifiée | TriggerFlow', en: 'Unified hotel inbox: email, SMS, WhatsApp, OTAs | TriggerFlow' },
    description: { fr: 'Email, SMS, WhatsApp, Messenger, Instagram, chat et messageries OTA dans une seule boîte, avec l’historique du client et des réponses suggérées par l’IA.', en: 'Email, SMS, WhatsApp, Messenger, Instagram, chat and OTA messaging in one inbox, with the guest history and AI-suggested replies.' },
  },
  hero: {
    title: { fr: 'Tous les messages de vos clients, au même endroit.', en: 'Every guest message, in one place.' },
    subtitle: { fr: 'Email, SMS, WhatsApp, Messenger, Instagram, chat du site et messageries OTA arrivent dans une seule boîte, rattachés à la fiche du client. L’IA propose une réponse, l’équipe valide.', en: 'Email, SMS, WhatsApp, Messenger, Instagram, website chat and OTA messaging land in one inbox, linked to the guest profile. AI suggests a reply, the team approves.' },
    visual: 'inbox',
  },
  proof: { stat: 'whatsappRead', statLabel: { fr: 'des messages WhatsApp lus sur les 12 derniers mois', en: 'of WhatsApp messages read over the last 12 months' }, clients: ['AMMI Hôtels'] },
  problem: {
    title: { fr: 'Un message par canal, et des réponses qui se perdent.', en: 'One app per channel, and replies that get lost.' },
    items: [
      { fr: 'La réception jongle entre la boîte mail, WhatsApp, l’extranet Booking et les réseaux sociaux.', en: 'The front desk juggles email, WhatsApp, the Booking extranet and social media.' },
      { fr: 'Personne ne sait qui a répondu à quoi, ni ce que le client a déjà demandé.', en: 'Nobody knows who replied to what, or what the guest already asked.' },
      { fr: 'Les mêmes questions reviennent chaque jour et prennent du temps.', en: 'The same questions come back every day and take time.' },
    ],
  },
  how: {
    title: { fr: 'Une boîte, toute l’équipe, tout l’historique.', en: 'One inbox, the whole team, the full history.' },
    steps: [
      { title: { fr: 'Connectez vos canaux', en: 'Connect your channels' }, text: { fr: 'Boîtes mail (Gmail, Microsoft 365), SMS, WhatsApp, Messenger, Instagram, chat du site, OTA.', en: 'Mailboxes (Gmail, Microsoft 365), SMS, WhatsApp, Messenger, Instagram, website chat, OTAs.' } },
      { title: { fr: 'Chaque message trouve son client', en: 'Every message finds its guest' }, text: { fr: 'Conversation rattachée à la fiche : séjour, préférences, échanges passés.', en: 'Conversation linked to the profile: stay, preferences, past exchanges.' } },
      { title: { fr: 'Répondez plus vite, ensemble', en: 'Reply faster, together' }, text: { fr: 'Attribution, statuts, dossiers, réponses suggérées par l’IA.', en: 'Assignment, statuses, folders, AI-suggested replies.' } },
    ],
  },
  features: {
    title: { fr: 'Pensée pour une réception, pas pour un centre d’appels.', en: 'Built for a front desk, not a call centre.' },
    items: [
      { icon: 'messageSquare', title: { fr: 'Tous les canaux', en: 'Every channel' }, text: { fr: 'Email, SMS, WhatsApp, Messenger, Instagram, chat, OTA.', en: 'Email, SMS, WhatsApp, Messenger, Instagram, chat, OTAs.' } },
      { icon: 'users', title: { fr: 'Fiche client à côté', en: 'Guest profile alongside' }, text: { fr: 'L’historique complet sous les yeux pendant la réponse.', en: 'The full history in view while replying.' } },
      { icon: 'sparkles', title: { fr: 'Réponses suggérées', en: 'Suggested replies' }, text: { fr: 'L’IA rédige un brouillon, votre équipe relit et envoie.', en: 'AI drafts, your team reviews and sends.' } },
      { icon: 'filter', title: { fr: 'Attribution et statuts', en: 'Assignment and statuses' }, text: { fr: 'Non lus, en attente, assignés à moi, dossiers urgents.', en: 'Unread, pending, assigned to me, urgent folders.' } },
      { icon: 'layers', title: { fr: 'Vue par établissement', en: 'Per-property view' }, text: { fr: 'Le siège voit tout, chaque réception voit ses messages.', en: 'Head office sees everything, each front desk sees its own.' } },
      { icon: 'bell', title: { fr: 'Alertes', en: 'Alerts' }, text: { fr: 'Les messages entrants notifiés aux bonnes personnes.', en: 'Incoming messages notified to the right people.' } },
    ],
  },
  tailored: {
    title: { fr: 'Taillé pour votre hôtel.', en: 'Shaped around your hotel.' },
    items: [
      { client: 'AMMI Hôtels', text: { fr: 'Les réceptionnistes ne voient que leur messagerie et le suivi de l’upsell ; le siège a la vue complète.', en: 'Receptionists only see their inbox and upsell tracking; head office has the full view.' } },
      { client: { fr: 'Clients OTA', en: 'OTA guests' }, text: { fr: 'Booking.com en connexion native (en cours), Expedia par emails relais, Airbnb par formulaires automatiques.', en: 'Booking.com via native connection (in progress), Expedia via relay emails, Airbnb via automated forms.' } },
      { client: { fr: 'Nuit', en: 'Night' }, text: { fr: 'Le chatbot répond aux questions courantes et passe la main au matin.', en: 'The chatbot answers common questions and hands over in the morning.' } },
    ],
  },
  caseStudy: {
    quote: { fr: 'TriggerFlow permet d’avoir une vue complète pour le siège et simplifiée pour les réceptionnistes. Les réceptionnistes voient uniquement leur messagerie pour répondre aux questions et le tableau de bord pour suivre l’upsell et les commandes.', en: 'TriggerFlow gives head office a complete view and receptionists a simplified one. Receptionists only see their inbox to answer questions and the dashboard to follow upsells and orders.' },
    name: 'Romain Coste-Chareyre', role: { fr: 'Groupe', en: 'Group' }, company: 'AMMI Hôtels',
  },
  integrations: { title: { fr: 'Vos canaux et votre PMS, reliés.', en: 'Your channels and your PMS, connected.' }, text: { fr: 'Les conversations s’appuient sur les réservations du PMS pour retrouver le bon client.', en: 'Conversations rely on PMS bookings to find the right guest.' }, extra: ['WhatsApp', 'Messenger', 'Instagram', 'Gmail', 'Microsoft 365', 'Booking.com', 'Expedia', 'Airbnb'] },
  reliability: { stat: 'whatsappRead', label: { fr: 'des messages WhatsApp lus', en: 'of WhatsApp messages read' } },
  related: [
    { slug: 'voice', href: '/produit/voice', name: { fr: 'Appel réception', en: 'Reception call' }, text: { fr: 'Les appels, rattachés à la même fiche.', en: 'Calls, linked to the same profile.' } },
    { slug: 'crm', href: '/produit/crm', name: { fr: 'CRM', en: 'CRM' }, text: { fr: 'Une fiche par client, sans doublons.', en: 'One profile per guest, no duplicates.' } },
    { slug: 'flows', href: '/produit/flows', name: { fr: 'Flows', en: 'Flows' }, text: { fr: 'Les messages automatiques du séjour.', en: 'Automated stay messages.' } },
  ],
  pricing: { text: { fr: 'Inclus dès la formule One Way.', en: 'Included from the One Way plan.' } },
  faq: [
    { q: { fr: 'Quels canaux sont pris en charge ?', en: 'Which channels are supported?' }, a: { fr: 'Email, SMS, WhatsApp, Messenger, Instagram, chat du site, et les messageries OTA : Booking.com (connexion native en cours), Expedia par emails relais, Airbnb par formulaires automatiques.', en: 'Email, SMS, WhatsApp, Messenger, Instagram, website chat, and OTA messaging: Booking.com (native connection in progress), Expedia via relay emails, Airbnb via automated forms.' } },
    { q: { fr: 'L’IA répond-elle à ma place ?', en: 'Does AI reply for me?' }, a: { fr: 'Elle propose une réponse ; votre équipe la relit, la modifie si besoin et l’envoie.', en: 'It suggests a reply; your team reviews, edits if needed and sends it.' } },
    { q: { fr: 'Plusieurs personnes peuvent-elles travailler en même temps ?', en: 'Can several people work at once?' }, a: { fr: 'Oui : attribution des conversations, statuts et dossiers évitent les doublons de réponse.', en: 'Yes: conversation assignment, statuses and folders avoid double replies.' } },
    { q: { fr: 'Et pour un groupe ?', en: 'What about a group?' }, a: { fr: 'Chaque établissement voit ses messages, le siège a une vue d’ensemble.', en: 'Each property sees its own messages, head office has an overview.' } },
  ],
  cta: { title: { fr: 'Réunissez vos messages cette semaine.', en: 'Bring your messages together this week.' } },
};
