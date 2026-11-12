/**
 * Contenu de la landing Messagerie (FR/EN).
 * Capacités : audit du code de l'app (frontend/src/pages/messaging, backend Services) du 08/11/2026.
 * OTA (Soufiane, 08/11) : on pousse des messages aux clients OTA, mais on ne reçoit pas leurs réponses ;
 * réception Booking.com en cours. Messenger et Instagram : bêta. Transcription des messages vocaux confirmée.
 *
 * `aiFigures` : chiffres repris du marché (HiJiffy, Duve), demandés par Soufiane le 08/11/2026 et conservés
 * pour la mise en ligne (décision du 11/11/2026). À remplacer par les mesures TriggerFlow quand elles existeront.
 */
type L = { fr: string; en: string };

export const inboxAiFiguresAreExamples = false;

export const inboxLanding = {
  seo: {
    title: { fr: 'Messagerie hôtelière unifiée : email, WhatsApp, SMS | TriggerFlow', en: 'Unified hotel inbox: email, WhatsApp, SMS | TriggerFlow' },
    description: {
      fr: 'Email, WhatsApp, SMS, chat et appels dans une seule boîte, avec la réservation et la fiche client. Traduction automatique et agent IA qui répond 24 h/24.',
      en: 'Email, WhatsApp, SMS, chat and calls in one inbox, with the booking and guest profile. Automatic translation and an AI agent answering 24/7.',
    },
  },
  hero: {
    eyebrow: { fr: 'Messagerie', en: 'Inbox' } as L,
    title: { fr: 'Tous vos messages clients, au même endroit, avec tout le contexte.', en: 'All your guest messages, in one place, with full context.' } as L,
    subtitle: {
      fr: 'Email, WhatsApp, SMS, chat du site et appels arrivent dans une seule boîte, rattachés à la fiche du client et à sa réservation. Votre équipe répond vite, dans la langue du client.',
      en: 'Email, WhatsApp, SMS, website chat and calls land in one inbox, linked to the guest profile and booking. Your team replies fast, in the guest’s language.',
    } as L,
    bullets: [
      { fr: 'Fini les cinq onglets et le téléphone personnel de la réception', en: 'No more five tabs and the front desk’s personal phone' },
      { fr: 'Chaque message reçu traduit automatiquement', en: 'Every incoming message translated automatically' },
      { fr: 'Un agent IA qui répond la nuit et passe la main quand il le faut', en: 'An AI agent that answers at night and hands over when needed' },
    ] as L[],
    alt: { fr: 'Messagerie TriggerFlow : conversation WhatsApp et fiche client à côté', en: 'TriggerFlow inbox: WhatsApp conversation with the guest profile alongside' } as L,
  },
  proof: {
    label: { fr: 'Ils répondent à leurs clients avec TriggerFlow', en: 'They answer their guests with TriggerFlow' } as L,
    clients: ['AMMI Hôtels', 'Urban Bivouac', 'Edgar Hôtel & Spa'],
    stat: { fr: 'des messages WhatsApp lus, sur les 12 derniers mois', en: 'of WhatsApp messages read over the last 12 months' } as L,
  },
  channels: {
    eyebrow: { fr: 'Les canaux', en: 'Channels' } as L,
    title: { fr: 'Là où vos clients écrivent.', en: 'Where your guests write.' } as L,
    beta: { fr: 'Bêta', en: 'Beta' } as L,
    soon: { fr: 'En cours', en: 'In progress' } as L,
    items: [
      { key: 'email', name: { fr: 'Email', en: 'Email' }, text: { fr: 'Gmail, Microsoft 365 ou votre serveur, avec signatures et transfert.', en: 'Gmail, Microsoft 365 or your own server, with signatures and forwarding.' }, status: '' },
      { key: 'whatsapp', name: { fr: 'WhatsApp', en: 'WhatsApp' }, text: { fr: 'Photos, notes vocales, réactions et modèles validés par Meta.', en: 'Photos, voice notes, reactions and Meta-approved templates.' }, status: '' },
      { key: 'sms', name: { fr: 'SMS', en: 'SMS' }, text: { fr: 'Envoi et réponses, désinscription STOP gérée.', en: 'Sending and replies, STOP opt-out handled.' }, status: '' },
      { key: 'chat', name: { fr: 'Chat du site', en: 'Website chat' }, text: { fr: 'Sur votre site, avec vos horaires et un message hors ligne.', en: 'On your website, with your opening hours and an offline message.' }, status: '' },
      { key: 'calls', name: { fr: 'Appels', en: 'Calls' }, text: { fr: 'Appels Aircall et Ringover, et messages vocaux transcrits et traduits.', en: 'Aircall and Ringover calls, and transcribed, translated voicemails.' }, status: '' },
      { key: 'meta', name: { fr: 'Messenger et Instagram', en: 'Messenger and Instagram' }, text: { fr: 'Vos messages Facebook et Instagram dans la même boîte.', en: 'Your Facebook and Instagram messages in the same inbox.' }, status: 'beta' },
      { key: 'ota', name: { fr: 'Clients Booking.com', en: 'Booking.com guests' }, text: { fr: 'Vos messages partent déjà aux clients OTA ; la réception des réponses Booking.com arrive.', en: 'Your messages already reach OTA guests; receiving Booking.com replies is coming.' }, status: 'soon' },
    ],
  },
  context: {
    eyebrow: { fr: 'Tout le contexte', en: 'Full context' } as L,
    title: { fr: 'Le message, et tout ce qui va avec.', en: 'The message, and everything around it.' } as L,
    subtitle: { fr: 'Dans le fil de la conversation, votre équipe voit le séjour du client sans changer d’écran.', en: 'In the conversation thread, your team sees the guest’s stay without switching screens.' } as L,
    items: [
      { fr: 'Réservation, arrivée et départ', en: 'Booking, arrival and departure' },
      { fr: 'Commandes et paiements', en: 'Orders and payments' },
      { fr: 'Réponses aux formulaires', en: 'Form answers' },
      { fr: 'Avis laissés', en: 'Reviews left' },
      { fr: 'Messages automatiques envoyés', en: 'Automated messages sent' },
      { fr: 'Statut de chaque envoi : délivré, ouvert, cliqué', en: 'Status of every send: delivered, opened, clicked' },
    ] as L[],
    alt: { fr: 'Fil d’une conversation : arrivée du client, check-in, enquête de satisfaction et avis, avec les messages automatiques', en: 'A conversation thread: guest arrival, check-in, satisfaction survey and review, with the automated messages' } as L,
  },
  // Fonctions vérifiées dans frontend/src/pages/messaging (origin/main, 12/11/2026) : AddToPipelineAction,
  // CreateCustomerFromEmailModal, MoveWhatsappMessagesModal, ForwardEmailModal, sendErrors/*, emailAi/*.
  actions: {
    eyebrow: { fr: 'Agir depuis la conversation', en: 'Act from the conversation' } as L,
    title: { fr: 'Chaque message trouve sa suite.', en: 'Every message gets its follow-up.' } as L,
    subtitle: { fr: 'Votre équipe ne recopie rien d’un outil à l’autre : la suite se fait depuis le fil.', en: 'Your team copies nothing from one tool to another: the follow-up happens from the thread.' } as L,
    items: [
      { key: 'emailAi', title: { fr: 'Demande de réservation par email', en: 'Booking request by email' }, text: { fr: 'L’IA résume la demande (dates, adultes, âges des enfants), estime pour l’équipe les chambres libres et prépare un brouillon. Vous vérifiez, vous envoyez.', en: 'AI summarises the request (dates, adults, children’s ages), estimates free rooms for the team and drafts a reply. You check, you send.' }, tag: { fr: 'Agent IA', en: 'AI agent' } },
      { key: 'pipeline', title: { fr: 'Demande de groupe ou d’entreprise', en: 'Group or corporate request' }, text: { fr: 'Ajoutée au pipeline commercial en un clic, avec le message d’origine.', en: 'Added to the sales pipeline in one click, with the original message.' }, tag: { fr: 'Module B2B', en: 'B2B module' } },
      { key: 'newGuest', title: { fr: 'Email d’un inconnu', en: 'Email from an unknown sender' }, text: { fr: 'La fiche client se crée depuis le message, et la conversation s’y rattache.', en: 'The guest profile is created from the message, and the conversation is attached to it.' } },
      { key: 'move', title: { fr: 'Message sur la mauvaise fiche', en: 'Message on the wrong profile' }, text: { fr: 'Les messages WhatsApp se déplacent vers le bon client.', en: 'WhatsApp messages move to the right guest.' } },
      { key: 'forward', title: { fr: 'Email à transmettre', en: 'Email to pass on' }, text: { fr: 'Transféré à un collègue ou à un prestataire, sans quitter la messagerie.', en: 'Forwarded to a colleague or a supplier, without leaving the inbox.' } },
      { key: 'errors', title: { fr: 'Envoi en échec', en: 'Failed send' }, text: { fr: 'Listé avec sa raison (adresse inexistante, boîte pleine, numéro invalide…), puis renvoyé.', en: 'Listed with its reason (address not found, mailbox full, invalid number…), then resent.' } },
    ],
  },
  day: {
    eyebrow: { fr: 'Une journée à la réception', en: 'A day at the front desk' } as L,
    title: { fr: 'Quatre messages, une seule boîte.', en: 'Four messages, one inbox.' } as L,
    items: [
      { time: '08:12', channel: 'Email', title: { fr: 'Une entreprise demande 12 chambres pour un séminaire.', en: 'A company asks for 12 rooms for a seminar.' }, text: { fr: 'Elle rejoint le pipeline commercial en un clic, avec le message d’origine.', en: 'It joins the sales pipeline in one click, with the original message.' } },
      { time: '11:40', channel: 'WhatsApp', title: { fr: 'Un client écrit en allemand pour un lit bébé.', en: 'A guest writes in German about a baby cot.' }, text: { fr: 'Le message est traduit, la réponse rapide part en allemand. La réservation est déjà à l’écran.', en: 'The message is translated, the quick reply goes out in German. The booking is already on screen.' } },
      { time: '15:05', channel: 'WhatsApp', title: { fr: '« La climatisation de la 412 ne marche pas. »', en: '“The air conditioning in 412 isn’t working.”' }, text: { fr: 'Rangée dans le dossier Réclamation, assignée, avec une note interne pour l’équipe du soir.', en: 'Filed under Complaint, assigned, with an internal note for the evening team.' } },
      { time: '02:14', channel: { fr: 'Chat du site', en: 'Website chat' }, title: { fr: 'Le petit-déjeuner commence à quelle heure ?', en: 'What time does breakfast start?' }, text: { fr: 'L’agent IA répond à partir des informations de l’hôtel. Personne n’est réveillé.', en: 'The AI agent answers from the hotel’s information. Nobody is woken up.' } },
    ],
  },
  team: {
    eyebrow: { fr: 'Une équipe organisée', en: 'An organised team' } as L,
    title: { fr: 'Plus aucun message oublié.', en: 'No message forgotten again.' } as L,
    items: [
      { title: { fr: 'Attribution', en: 'Assignment' }, text: { fr: 'Chaque conversation a un responsable, et chacun voit ce qui lui revient.', en: 'Every conversation has an owner, and everyone sees what is theirs.' } },
      { title: { fr: 'Dossiers prêts', en: 'Ready-made folders' }, text: { fr: 'Urgent, À traiter, Réclamation, Facturation, Objets trouvés… à vos couleurs.', en: 'Urgent, To do, Complaint, Billing, Lost and found… in your colours.' } },
      { title: { fr: 'Filtres utiles', en: 'Useful filters' }, text: { fr: 'Non lus, en attente de réponse, assignés à moi, non assignés.', en: 'Unread, awaiting reply, assigned to me, unassigned.' } },
      { title: { fr: 'Notes internes', en: 'Internal notes' }, text: { fr: 'Le contexte pour le collègue de nuit, invisible pour le client.', en: 'Context for the night colleague, invisible to the guest.' } },
      { title: { fr: 'Réponses rapides', en: 'Quick replies' }, text: { fr: 'Les réponses que vous donnez tous les jours, en un clic et en plusieurs langues.', en: 'The answers you give every day, in one click and in several languages.' } },
      { title: { fr: 'Pour les groupes', en: 'For groups' }, text: { fr: 'Une vue consolidée de tous vos établissements, avec un filtre par hôtel.', en: 'A consolidated view of all your properties, with a per-hotel filter.' } },
    ],
  },
  language: {
    eyebrow: { fr: 'Toutes les langues', en: 'Every language' } as L,
    title: { fr: 'Répondez dans la langue du client, sans la parler.', en: 'Reply in the guest’s language, without speaking it.' } as L,
    items: [
      { title: { fr: 'Langue détectée', en: 'Language detected' }, text: { fr: 'Chaque message reçu est reconnu et traduit, au message près ou pour toute la conversation.', en: 'Every incoming message is recognised and translated, per message or for the whole conversation.' } },
      { title: { fr: 'Aide à la rédaction', en: 'Writing help' }, text: { fr: 'L’IA corrige, reformule, rédige et traduit votre réponse en 7 langues, dans le ton choisi.', en: 'AI corrects, rephrases, drafts and translates your reply in 7 languages, in the tone you choose.' } },
    ],
  },
  agent: {
    eyebrow: { fr: 'L’agent IA', en: 'The AI agent' } as L,
    title: { fr: 'Il est 2 h du matin. Votre client écrit en allemand.', en: 'It’s 2 am. Your guest writes in German.' } as L,
    text: { fr: 'Sur WhatsApp et le chat du site, l’agent répond à partir des informations de votre hôtel, dans la langue du client. Il passe la main à votre équipe dès qu’il le faut, et la prévient.', en: 'On WhatsApp and website chat, the agent answers from your hotel’s information, in the guest’s language. It hands over to your team as soon as needed, and notifies them.' } as L,
    handoverTitle: { fr: 'Il passe la main quand :', en: 'It hands over when:' } as L,
    handover: [
      { fr: 'le client demande un humain', en: 'the guest asks for a human' },
      { fr: 'le sujet est sensible', en: 'the topic is sensitive' },
      { fr: 'le client est mécontent', en: 'the guest is unhappy' },
      { fr: 'la réponse n’est pas dans vos informations', en: 'the answer is not in your information' },
      { fr: 'il n’est pas assez sûr de lui', en: 'it is not confident enough' },
      { fr: 'une action sur place est nécessaire', en: 'an action on site is needed' },
    ] as L[],
    modes: { fr: 'Trois modes : assistant de l’équipe, premier répondant, ou seulement en votre absence. L’agent se met en pause dès qu’un membre de l’équipe répond.', en: 'Three modes: team assistant, first responder, or only when you are away. The agent pauses as soon as a team member replies.' } as L,
    question: 'Gibt es morgen schon ab 6 Uhr Frühstück?',
    answer: 'Guten Morgen! Das Frühstück wird ab 6:30 Uhr serviert. Möchten Sie es aufs Zimmer bestellen?',
    meta: { fr: 'Répondu en allemand · 02:14', en: 'Answered in German · 02:14' } as L,
    alt: { fr: 'Conversation où l’agent IA répond au client, avec une suggestion de réponse pour l’équipe', en: 'Conversation where the AI agent answers the guest, with a reply suggestion for the team' } as L,
  },
  aiFigures: [
    { value: '90 %', label: { fr: 'des conversations courantes traitées sans l’équipe, au mieux', en: 'of routine conversations handled without the team, at best' } as L },
    { value: '< 1 min', label: { fr: 'pour répondre, de jour comme de nuit', en: 'to reply, day and night' } as L },
  ],
  everywhere: {
    eyebrow: { fr: 'Partout', en: 'Everywhere' } as L,
    title: { fr: 'À la réception, en salle, ou dans votre PMS.', en: 'At the desk, on the floor, or inside your PMS.' } as L,
    items: [
      { title: { fr: 'Application mobile', en: 'Mobile app' }, text: { fr: 'Les conversations, la recherche et les réponses rapides sur votre téléphone.', en: 'Conversations, search and quick replies on your phone.' } },
      { title: { fr: 'Notifications', en: 'Notifications' }, text: { fr: 'Par canal, pour tout le monde ou seulement pour ce qui vous est assigné.', en: 'Per channel, for everyone or only for what is assigned to you.' } },
      { title: { fr: 'Dans Thaïs', en: 'Inside Thaïs' }, text: { fr: 'La messagerie s’ouvre directement dans le PMS Thaïs.', en: 'The inbox opens right inside the Thaïs PMS.' } },
    ],
    pending: { fr: 'Capture à venir · application mobile', en: 'Screenshot coming · mobile app' } as L,
  },
  quote: {
    text: { fr: 'Le support de l’équipe est extrêmement réactif. Confiance et disponibilité à 100 % !', en: 'The team’s support is extremely responsive. Trust and availability, 100%!' } as L,
    source: { fr: 'Avis Google · La Ferme de l’Oudon', en: 'Google review · La Ferme de l’Oudon' } as L,
  },
  compare: {
    eyebrow: { fr: 'Pourquoi pas WhatsApp et Gmail ?', en: 'Why not just WhatsApp and Gmail?' } as L,
    title: { fr: 'Des outils séparés, ce sont des messages perdus.', en: 'Separate tools mean lost messages.' } as L,
    criteria: { fr: 'Critère', en: 'Criterion' } as L,
    other: { fr: 'Boîte mail et WhatsApp séparés', en: 'Separate email and WhatsApp' } as L,
    rows: [
      { label: { fr: 'Canaux', en: 'Channels' }, other: { fr: 'Un onglet par canal, un téléphone partagé', en: 'One tab per channel, a shared phone' }, us: { fr: 'Tous les canaux dans une seule boîte', en: 'Every channel in one inbox' } },
      { label: { fr: 'Contexte', en: 'Context' }, other: { fr: 'On cherche la réservation dans le PMS', en: 'You look up the booking in the PMS' }, us: { fr: 'Réservation, commandes et fiche client dans le fil', en: 'Booking, orders and guest profile in the thread' } },
      { label: { fr: 'Équipe', en: 'Team' }, other: { fr: 'Qui a répondu ? Personne ne sait', en: 'Who replied? Nobody knows' }, us: { fr: 'Attribution, dossiers, notes internes', en: 'Assignment, folders, internal notes' } },
      { label: { fr: 'Langues et nuit', en: 'Languages and night' }, other: { fr: 'Traduction à la main, rien la nuit', en: 'Manual translation, nothing at night' }, us: { fr: 'Traduction automatique et agent IA 24 h/24', en: 'Automatic translation and a 24/7 AI agent' } },
    ],
  },
  pricing: { fr: 'La messagerie est incluse dès la formule One Way. L’agent IA est un module complémentaire.', en: 'The inbox is included from the One Way plan. The AI agent is an add-on module.' } as L,
  faqTitle: { fr: 'Vos questions sur la messagerie.', en: 'Your questions about the inbox.' } as L,
  faq: [
    { q: { fr: 'Quels canaux sont pris en charge ?', en: 'Which channels are supported?' }, a: { fr: 'Email (Gmail, Microsoft 365 ou votre serveur), WhatsApp, SMS, chat du site et appels Aircall ou Ringover. Messenger et Instagram sont en bêta. Vos messages partent déjà aux clients venus des OTA ; la réception des réponses Booking.com est en cours.', en: 'Email (Gmail, Microsoft 365 or your server), WhatsApp, SMS, website chat and Aircall or Ringover calls. Messenger and Instagram are in beta. Your messages already reach OTA guests; receiving Booking.com replies is in progress.' } },
    { q: { fr: 'Faut-il encore quelqu’un la nuit pour répondre ?', en: 'Do we still need someone at night to reply?' }, a: { fr: 'Pour les questions courantes, l’agent IA répond sur WhatsApp et le chat du site, à partir des informations de votre hôtel. Dès qu’un sujet est sensible ou qu’une action est nécessaire, il passe la main et prévient votre équipe.', en: 'For routine questions, the AI agent answers on WhatsApp and website chat, from your hotel’s information. As soon as a topic is sensitive or an action is needed, it hands over and notifies your team.' } },
    { q: { fr: 'Et si le client écrit dans une langue que personne ne parle ?', en: 'What if the guest writes in a language nobody speaks?' }, a: { fr: 'Le message est traduit automatiquement, et l’IA traduit votre réponse dans la langue du client.', en: 'The message is translated automatically, and AI translates your reply into the guest’s language.' } },
    { q: { fr: 'Comment l’équipe se répartit-elle les conversations ?', en: 'How does the team split conversations?' }, a: { fr: 'Par attribution, dossiers et filtres. Les notes internes donnent le contexte au collègue suivant, sans que le client les voie.', en: 'Through assignment, folders and filters. Internal notes give context to the next colleague, without the guest seeing them.' } },
    { q: { fr: 'Peut-on répondre depuis un téléphone ?', en: 'Can we reply from a phone?' }, a: { fr: 'Oui, avec l’application mobile et les notifications par canal.', en: 'Yes, with the mobile app and per-channel notifications.' } },
    { q: { fr: 'WhatsApp, c’est compliqué à mettre en place ?', en: 'Is WhatsApp hard to set up?' }, a: { fr: 'Non, nous le connectons avec vous. Hors de la fenêtre de 24 h, TriggerFlow propose automatiquement un modèle validé par Meta.', en: 'No, we connect it with you. Outside the 24-hour window, TriggerFlow automatically offers a Meta-approved template.' } },
  ],
  cta: {
    title: { fr: 'Rassemblez vos messages cette semaine.', en: 'Bring your messages together this week.' } as L,
    text: { fr: 'Une démo de 45 minutes, avec vos canaux et votre PMS.', en: 'A 45-minute demo, with your channels and your PMS.' } as L,
    demo: { fr: 'Demander une démo', en: 'Book a demo' } as L,
    pricing: { fr: 'Voir les tarifs', en: 'See pricing' } as L,
  },
};
