/**
 * Landing Formulaires (FR/EN). Audit origin/main du 09/11/2026 : 34 types de champs, logique conditionnelle
 * (question, section, segment), blocs répétables par chambre ou occupant, pré-remplissage, 6 langues + traduction IA,
 * scan de pièce d'identité (MRZ, service interne), signature, catalogue, analyse IA des commentaires, PDF figé,
 * écriture dans 9 PMS. Pas de champ de paiement natif (lien de paiement dans la page de fin).
 */
import type { DedicatedLandingContent } from '@/components/product/DedicatedLanding';

export const formsLanding: DedicatedLandingContent & { seo: { title: { fr: string; en: string }; description: { fr: string; en: string } } } = {
  seo: {
    title: { fr: 'Formulaires hôteliers : pré-séjour, enquêtes, NPS | TriggerFlow', en: 'Hotel forms: pre-stay, surveys, NPS | TriggerFlow' },
    description: {
      fr: 'Pré-séjour, enquête de satisfaction, rooming list : des formulaires pré-remplis depuis le PMS, qui s’adaptent aux réponses et renvoient les données dans votre PMS.',
      en: 'Pre-stay, satisfaction survey, rooming list: forms pre-filled from the PMS, that adapt to answers and send data back to your PMS.',
    },
  },
  hero: {
    eyebrow: { fr: 'Formulaires', en: 'Forms' },
    title: { fr: 'Des formulaires qui connaissent déjà vos clients.', en: 'Forms that already know your guests.' },
    subtitle: {
      fr: 'Pré-séjour, enquête de satisfaction, rooming list, demande spéciale : vos formulaires se pré-remplissent depuis la réservation, s’adaptent aux réponses et renvoient les informations dans votre PMS.',
      en: 'Pre-stay, satisfaction survey, rooming list, special request: your forms pre-fill from the booking, adapt to answers and send the information back to your PMS.',
    },
    bullets: [
      { fr: 'Pré-remplis : le client ne retape pas ce que vous savez déjà', en: 'Pre-filled: guests don’t retype what you already know' },
      { fr: 'Des questions qui s’ouvrent selon les réponses', en: 'Questions that open up based on answers' },
      { fr: 'Les réponses écrites dans votre PMS, sans ressaisie', en: 'Answers written to your PMS, no re-typing' },
    ],
    image: { src: '/images/app/form-editor.webp', width: 1400, height: 866, label: 'app.trigger-flow.com/formulaires', alt: { fr: 'Éditeur de formulaire TriggerFlow : pages, éléments, traduction', en: 'TriggerFlow form editor: pages, elements, translation' }, caption: { fr: 'Capture de l’application, compte de démonstration', en: 'App screenshot, demo account' } },
  },
  proof: {
    label: { fr: 'Ils font confiance à TriggerFlow', en: 'They trust TriggerFlow' },
    clients: ['Edgar Hôtel & Spa', 'Hôtel Causse Comtal', 'Groupe Noemys'],
  },
  sections: [
    {
      type: 'cards', tone: 'white', cols: 4,
      eyebrow: { fr: 'Pour chaque moment', en: 'For every moment' },
      title: { fr: 'Un outil,', en: 'One tool,' }, titleMuted: { fr: 'tous vos formulaires.', en: 'all your forms.' },
      items: [
        { icon: 'clipboard', title: { fr: 'Pré-séjour', en: 'Pre-stay' }, text: { fr: 'Heure d’arrivée, préférences, occasion spéciale, offres.', en: 'Arrival time, preferences, special occasion, offers.' } },
        { icon: 'users', title: { fr: 'Rooming list', en: 'Rooming list' }, text: { fr: 'Un bloc par chambre ou par occupant, pour les groupes et les familles.', en: 'One block per room or per occupant, for groups and families.' } },
        { icon: 'star', title: { fr: 'Satisfaction et NPS', en: 'Satisfaction and NPS' }, text: { fr: 'Étoiles, smileys, NPS, échelles : l’avis après le séjour.', en: 'Stars, smileys, NPS, scales: feedback after the stay.' } },
        { icon: 'signature', title: { fr: 'Check-in et fiche de police', en: 'Check-in and registration card' }, text: { fr: 'Identité, scan de pièce, signature.', en: 'Identity, ID scan, signature.' }, href: '/produit/check-in' },
      ],
    },
    {
      type: 'split', tone: 'paper',
      eyebrow: { fr: 'Intelligents', en: 'Smart' },
      title: { fr: 'Le bon formulaire, pour chaque client.', en: 'The right form, for every guest.' },
      bullets: [
        { fr: 'Pré-remplis depuis la réservation et la fiche client', en: 'Pre-filled from the booking and guest profile' },
        { fr: 'Une question qui n’apparaît que si une réponse le demande', en: 'A question that only appears when an answer calls for it' },
        { fr: 'Des pages affichées selon le segment du client ou son hôtel', en: 'Pages shown according to the guest’s segment or hotel' },
        { fr: 'Un bloc répété par chambre ou par occupant, lu dans le PMS', en: 'A block repeated per room or per occupant, read from the PMS' },
        { fr: 'Des offres à commander au milieu du formulaire', en: 'Offers to order in the middle of the form' },
      ],
      panel: {
        title: { fr: '34 types de champs, dont :', en: '34 field types, including:' },
        items: [
          { fr: 'Scan de pièce d’identité', en: 'ID document scan' },
          { fr: 'Signature au doigt', en: 'Finger signature' },
          { fr: 'Envoi de fichiers', en: 'File upload' },
          { fr: 'NPS, étoiles, smileys, échelles', en: 'NPS, stars, smileys, scales' },
          { fr: 'Pays, langue, motif du séjour', en: 'Country, language, purpose of stay' },
          { fr: 'Catalogue d’offres', en: 'Offer catalogue' },
        ],
      },
    },
    {
      type: 'split', tone: 'white',
      eyebrow: { fr: 'Connectés', en: 'Connected' },
      title: { fr: 'Les réponses vont là où elles servent.', en: 'Answers go where they are useful.' },
      steps: [
        { title: { fr: 'Dans votre PMS', en: 'Into your PMS' }, text: { fr: 'Email, téléphone, adresse, nationalité, pièce d’identité, heure d’arrivée : écrits automatiquement dans 9 PMS, dont Mews, Opera Cloud, Thaïs, Apaleo et Medialog.', en: 'Email, phone, address, nationality, ID, arrival time: written automatically to 9 PMS, including Mews, Opera Cloud, Thaïs, Apaleo and Medialog.' } },
        { title: { fr: 'Sur la fiche client', en: 'On the guest profile' }, text: { fr: 'Chaque réponse rattachée au client, et des tags posés selon ses choix.', en: 'Every answer linked to the guest, and tags set from their choices.' } },
        { title: { fr: 'Dans vos flows', en: 'In your flows' }, text: { fr: 'Formulaire rempli : le flow suivant démarre. Pas rempli : la relance part.', en: 'Form submitted: the next flow starts. Not submitted: the reminder goes out.' } },
        { title: { fr: 'Chez votre équipe', en: 'To your team' }, text: { fr: 'Une alerte email à chaque réponse, avec le client et la réservation.', en: 'An email alert for every answer, with the guest and booking.' } },
      ],
      figure: { value: '9', label: { fr: 'PMS où les réponses sont écrites automatiquement', en: 'PMS where answers are written automatically' } },
    },
    {
      type: 'band',
      eyebrow: { fr: 'Comprendre', en: 'Understand' },
      title: { fr: 'Ce que vos clients disent, sans tout lire.', en: 'What your guests say, without reading everything.' },
      items: [
        { icon: 'list', title: { fr: 'Indicateurs', en: 'Indicators' }, text: { fr: 'Réponses, note moyenne, NPS et taux de complétion.', en: 'Responses, average rating, NPS and completion rate.' } },
        { icon: 'sparkles', title: { fr: 'Thèmes par l’IA', en: 'AI themes' }, text: { fr: 'Les commentaires regroupés par thème, avec leur tonalité.', en: 'Comments grouped by theme, with their sentiment.' } },
        { icon: 'wand', title: { fr: 'Synthèse', en: 'Summary' }, text: { fr: 'Points forts, axes d’amélioration et tendance.', en: 'Strengths, areas to improve and trend.' } },
        { icon: 'file', title: { fr: 'PDF figé', en: 'Frozen PDF' }, text: { fr: 'Chaque réponse archivée en PDF, puis supprimée après le délai choisi.', en: 'Each answer archived as PDF, then deleted after the chosen period.' } },
      ],
    },
    {
      type: 'cards', tone: 'white', cols: 3,
      eyebrow: { fr: 'À votre image', en: 'Your brand' },
      title: { fr: 'Dans la langue du client, à vos couleurs.', en: 'In the guest’s language, in your colours.' },
      items: [
        { icon: 'languages', title: { fr: '6 langues', en: '6 languages' }, text: { fr: 'Le formulaire traduit en un clic par l’IA, et affiché dans la langue du client.', en: 'The form translated in one click by AI, and shown in the guest’s language.' } },
        { icon: 'sparkles', title: { fr: 'Votre charte', en: 'Your brand' }, text: { fr: 'Logo, couleurs, image de fond, boutons.', en: 'Logo, colours, background image, buttons.' } },
        { icon: 'qr', title: { fr: 'Partout', en: 'Everywhere' }, text: { fr: 'Lien dans vos messages, intégration sur votre site, QR code, tablette à la réception.', en: 'Link in your messages, embed on your website, QR code, tablet at the desk.' } },
      ],
    },
  ],
  quote: {
    text: { fr: 'Les formulaires peuvent se personnaliser en fonction des réponses aux questions. Selon les réponses que le client donne, on va pouvoir ouvrir d’autres questions, c’est vraiment un point fort.', en: 'Forms can adapt to the answers. Depending on what the guest says, other questions open up: that’s a real strength.' },
    name: 'Maxime Jullien', role: { fr: 'Directeur', en: 'General manager' }, company: 'Edgar Hôtel & Spa',
  },
  compare: {
    eyebrow: { fr: 'Pourquoi pas un outil de formulaires classique ?', en: 'Why not a generic form tool?' },
    title: { fr: 'Un formulaire générique ne connaît pas la réservation.', en: 'A generic form doesn’t know the booking.' },
    other: { fr: 'Outil de formulaires classique', en: 'Generic form tool' },
    rows: [
      { label: { fr: 'Pré-remplissage', en: 'Pre-fill' }, other: { fr: 'Le client retape tout', en: 'The guest retypes everything' }, us: { fr: 'Depuis la réservation et la fiche', en: 'From the booking and profile' } },
      { label: { fr: 'Chambres et occupants', en: 'Rooms and occupants' }, other: { fr: 'Une question « combien de personnes ? »', en: 'A “how many people?” question' }, us: { fr: 'Un bloc par chambre ou occupant, lu dans le PMS', en: 'One block per room or occupant, from the PMS' } },
      { label: { fr: 'Données', en: 'Data' }, other: { fr: 'Un export à ressaisir', en: 'An export to re-type' }, us: { fr: 'Écrites dans le PMS et la fiche client', en: 'Written to the PMS and guest profile' } },
      { label: { fr: 'Suite', en: 'Next step' }, other: { fr: 'Rien ne se passe', en: 'Nothing happens' }, us: { fr: 'Flows, relances et alertes', en: 'Flows, reminders and alerts' } },
    ],
  },
  pricing: { fr: 'Inclus dans Two Way et All Inclusive, ou comme module au choix avec One Way.', en: 'Included in Two Way and All Inclusive, or as your module of choice with One Way.' },
  faqTitle: { fr: 'Vos questions sur les formulaires.', en: 'Your questions about forms.' },
  faq: [
    { q: { fr: 'Les réponses remontent-elles dans mon PMS ?', en: 'Do answers flow into my PMS?' }, a: { fr: 'Oui, pour les champs reliés : coordonnées, adresse, nationalité, pièce d’identité, heure d’arrivée… dans Mews, Opera Cloud, Thaïs, Apaleo, Medialog, Misterbooking, Asterio, Lean PMS et Beds24. Les champs disponibles varient selon le PMS.', en: 'Yes, for linked fields: contact details, address, nationality, ID, arrival time… in Mews, Opera Cloud, Thaïs, Apaleo, Medialog, Misterbooking, Asterio, Lean PMS and Beds24. Available fields vary by PMS.' } },
    { q: { fr: 'Peut-on afficher des questions selon les réponses ?', en: 'Can questions depend on answers?' }, a: { fr: 'Oui : par question, par page selon les réponses ou les commandes, et selon le segment du client.', en: 'Yes: per question, per page based on answers or orders, and based on the guest’s segment.' } },
    { q: { fr: 'Dans quelles langues ?', en: 'In which languages?' }, a: { fr: 'Français, anglais, espagnol, allemand, italien et russe, avec une traduction automatique de tout le formulaire.', en: 'French, English, Spanish, German, Italian and Russian, with automatic translation of the whole form.' } },
    { q: { fr: 'Peut-on vendre des offres dans un formulaire ?', en: 'Can I sell offers in a form?' }, a: { fr: 'Oui, avec un catalogue intégré. La commande est envoyée dans votre PMS, et le paiement passe par un lien de paiement en fin de formulaire.', en: 'Yes, with a built-in catalogue. The order is sent to your PMS, and payment goes through a payment link at the end of the form.' } },
    { q: { fr: 'Que deviennent les données personnelles ?', en: 'What happens to personal data?' }, a: { fr: 'Les réponses sont hébergées en France. Les PDF et les photos de pièces d’identité sont supprimés automatiquement après le délai que vous choisissez.', en: 'Answers are hosted in France. PDFs and ID photos are deleted automatically after the period you choose.' } },
  ],
  cta: {
    title: { fr: 'Arrêtez de ressaisir ce que vos clients vous ont déjà dit.', en: 'Stop re-typing what guests already told you.' },
    text: { fr: 'Une démo de 45 minutes, avec vos formulaires actuels.', en: 'A 45-minute demo, with your current forms.' },
  },
};
