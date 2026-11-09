/**
 * Landing Check-in en ligne (FR/EN). Audit origin/main du 09/11/2026 : le check-in est un formulaire dédié
 * (identité, scan MRZ interne, signature, occupants, offres), écran Check-in du jour, borne en réception avec
 * protection anti-énumération, écriture dans 9 PMS, conservation des pièces d'identité paramétrable.
 * Ne PAS affirmer : check-out en ligne, statut check-in écrit dans le PMS, transmission de la fiche de police
 * aux autorités, code de porte conditionné au check-in, permis de conduire lisible.
 * Benchmark : Duve (8 min par client au comptoir), Canary, Mews.
 */
import type { DedicatedLandingContent } from '@/components/product/DedicatedLanding';

export const checkinLanding: DedicatedLandingContent & { seo: { title: { fr: string; en: string }; description: { fr: string; en: string } } } = {
  seo: {
    title: { fr: 'Check-in en ligne hôtel : identité, signature, PMS | TriggerFlow', en: 'Hotel online check-in: ID, signature, PMS | TriggerFlow' },
    description: {
      fr: 'Le client fait son check-in sur son téléphone ou à la borne : identité scannée, fiche signée, données écrites dans votre PMS. Moins d’attente à la réception.',
      en: 'Guests check in on their phone or at the kiosk: ID scanned, card signed, data written to your PMS. Less waiting at the front desk.',
    },
  },
  hero: {
    eyebrow: { fr: 'Check-in en ligne', en: 'Online check-in' },
    title: { fr: 'Vos clients arrivent déjà enregistrés.', en: 'Your guests arrive already registered.' },
    subtitle: {
      fr: 'Avant l’arrivée, le client remplit sa fiche sur son téléphone : pièce d’identité scannée, informations de chaque occupant, signature. Tout est écrit dans votre PMS. À la réception, il ne reste qu’à remettre la clé.',
      en: 'Before arrival, guests fill in their card on their phone: ID scanned, details for every occupant, signature. Everything is written to your PMS. At the desk, all that’s left is handing over the key.',
    },
    bullets: [
      { fr: 'Pièce d’identité lue automatiquement, sans service tiers', en: 'ID read automatically, no third-party service' },
      { fr: 'Les données de la fiche de police écrites dans votre PMS', en: 'Registration card data written to your PMS' },
      { fr: 'Sur le téléphone du client ou sur une borne à la réception', en: 'On the guest’s phone or on a kiosk at the desk' },
    ],
    image: { src: '/images/app/checkin.webp', width: 1400, height: 866, label: 'app.trigger-flow.com/checkin', alt: { fr: 'Écran Check-in TriggerFlow : arrivées du jour, check-in faits, en cours et en attente', en: 'TriggerFlow check-in screen: today’s arrivals, check-ins done, in progress and pending' }, caption: { fr: 'Capture de l’application, compte de démonstration', en: 'App screenshot, demo account' } },
  },
  proof: {
    label: { fr: 'Ils font confiance à TriggerFlow', en: 'They trust TriggerFlow' },
    clients: ['Edgar Hôtel & Spa', 'Hôtel Causse Comtal', 'AMMI Hôtels'],
  },
  sections: [
    {
      type: 'split', tone: 'white',
      eyebrow: { fr: 'Le parcours', en: 'The journey' },
      title: { fr: 'Quelques minutes sur son téléphone, la clé à l’arrivée.', en: 'A few minutes on their phone, the key on arrival.' },
      steps: [
        { title: { fr: 'Le lien part avant l’arrivée', en: 'The link goes out before arrival' }, text: { fr: 'Par email, SMS ou WhatsApp, au moment choisi dans vos flows, avec une relance si besoin.', en: 'By email, SMS or WhatsApp, when your flows decide, with a reminder if needed.' } },
        { title: { fr: 'Le client scanne sa pièce', en: 'The guest scans their ID' }, text: { fr: 'Nom, numéro, dates et nationalité se remplissent tout seuls.', en: 'Name, number, dates and nationality fill in automatically.' } },
        { title: { fr: 'Il complète et signe', en: 'They complete and sign' }, text: { fr: 'Adresse, heure d’arrivée, occupants, conditions, signature au doigt.', en: 'Address, arrival time, occupants, terms, finger signature.' } },
        { title: { fr: 'Tout part dans le PMS', en: 'Everything goes to the PMS' }, text: { fr: 'La réception voit le check-in fait et retrouve les données dans son PMS.', en: 'The front desk sees the check-in done and finds the data in its PMS.' } },
      ],
      figure: { value: '8 min', label: { fr: 'en moyenne au comptoir pour un check-in classique, selon le marché', en: 'on average at the desk for a traditional check-in, per industry figures' }, source: { fr: 'Source : Duve, 2026', en: 'Source: Duve, 2026' } },
    },
    {
      type: 'cards', tone: 'paper', cols: 3,
      eyebrow: { fr: 'Ce que couvre le check-in', en: 'What check-in covers' },
      title: { fr: 'Tout ce que la fiche de police demande,', en: 'Everything the registration card needs,' }, titleMuted: { fr: 'et plus.', en: 'and more.' },
      items: [
        { icon: 'scan', title: { fr: 'Scan de pièce d’identité', en: 'ID scan' }, text: { fr: 'Passeport, carte d’identité ou visa lus par notre propre service, sans IA tierce. Saisie manuelle si la lecture échoue.', en: 'Passport, ID card or visa read by our own service, no third-party AI. Manual entry if reading fails.' } },
        { icon: 'user', title: { fr: 'Identité complète', en: 'Full identity' }, text: { fr: 'Date et lieu de naissance, nationalité, adresse, numéro et dates de la pièce.', en: 'Birth date and place, nationality, address, ID number and dates.' } },
        { icon: 'users', title: { fr: 'Chaque occupant', en: 'Every occupant' }, text: { fr: 'Un bloc par chambre ou par occupant, selon la réservation du PMS.', en: 'One block per room or per occupant, from the PMS booking.' } },
        { icon: 'signature', title: { fr: 'Signature', en: 'Signature' }, text: { fr: 'Conditions acceptées et fiche signée au doigt, archivées en PDF.', en: 'Terms accepted and card signed by finger, archived as PDF.' } },
        { icon: 'clock', title: { fr: 'Arrivée et préférences', en: 'Arrival and preferences' }, text: { fr: 'Heure d’arrivée, motif du séjour, demandes particulières.', en: 'Arrival time, purpose of stay, special requests.' } },
        { icon: 'bag', title: { fr: 'Offres', en: 'Offers' }, text: { fr: 'Surclassement, petit-déjeuner, arrivée anticipée, au bon moment.', en: 'Upgrade, breakfast, early check-in, at the right time.' }, href: '/produit/upsell' },
      ],
    },
    {
      type: 'table', tone: 'white',
      eyebrow: { fr: 'Votre PMS', en: 'Your PMS' },
      title: { fr: 'Les données écrites dans votre PMS.', en: 'Data written to your PMS.' },
      subtitle: { fr: 'Les champs reliés partent à chaque page validée, sans écraser ce que la réception a modifié ensuite.', en: 'Linked fields go out on every validated page, without overwriting later front-desk edits.' },
      head: [{ fr: 'PMS', en: 'PMS' }, { fr: 'Coordonnées', en: 'Contact' }, { fr: 'Adresse', en: 'Address' }, { fr: 'Nationalité', en: 'Nationality' }, { fr: 'Pièce d’identité', en: 'ID' }, { fr: 'Heure d’arrivée', en: 'Arrival time' }],
      rows: [
        { label: 'Mews', cells: [true, true, true, true, true] },
        { label: 'Opera Cloud', cells: [true, true, true, true, true] },
        { label: 'Medialog', cells: [true, true, true, true, true] },
        { label: 'Apaleo', cells: [true, true, true, true, true] },
        { label: 'Misterbooking', cells: [true, true, true, true, true] },
        { label: 'Thaïs', cells: [true, true, true, true, true] },
        { label: 'Asterio', cells: [true, true, true, false, false] },
        { label: 'Lean PMS', cells: [true, true, false, false, true] },
        { label: 'Beds24', cells: [true, true, false, false, true] },
      ],
    },
    {
      type: 'band',
      eyebrow: { fr: 'À la réception', en: 'At the front desk' },
      title: { fr: 'Pour ceux qui arrivent sans l’avoir fait.', en: 'For those who arrive without having done it.' },
      items: [
        { icon: 'list', title: { fr: 'Les arrivées du jour', en: 'Today’s arrivals' }, text: { fr: 'Qui a fait son check-in, qui l’a commencé, qui l’attend encore.', en: 'Who has checked in, who has started, who is still pending.' } },
        { icon: 'qr', title: { fr: 'QR code au comptoir', en: 'QR code at the desk' }, text: { fr: 'Le client remplit sur son téléphone pendant qu’on prépare sa clé.', en: 'The guest fills it in on their phone while the key is prepared.' } },
        { icon: 'tablet', title: { fr: 'Borne en libre-service', en: 'Self-service kiosk' }, text: { fr: 'Nom et date d’arrivée, la réservation s’ouvre, l’écran revient à l’accueil.', en: 'Name and arrival date, the booking opens, the screen resets.' } },
        { icon: 'shield', title: { fr: 'Borne protégée', en: 'Protected kiosk' }, text: { fr: 'Recherches limitées et vérification anti-robot après plusieurs essais.', en: 'Limited searches and a bot check after several attempts.' } },
      ],
    },
    {
      type: 'split', tone: 'paper',
      eyebrow: { fr: 'Données personnelles', en: 'Personal data' },
      title: { fr: 'Les pièces d’identité, sans les garder plus que nécessaire.', en: 'ID documents, kept no longer than needed.' },
      bullets: [
        { fr: 'Par défaut, la photo de la pièce n’est pas conservée', en: 'By default, the ID photo is not stored' },
        { fr: 'Si vous la gardez : chiffrée, puis supprimée X jours après le départ', en: 'If you keep it: encrypted, then deleted X days after departure' },
        { fr: 'Lecture par notre propre service, sans IA tierce', en: 'Read by our own service, no third-party AI' },
        { fr: 'Données exclues des messages, de l’IA et des alertes', en: 'Data excluded from messages, AI and alerts' },
        { fr: 'Hébergé en France', en: 'Hosted in France' },
      ],
      panel: {
        title: { fr: 'Bon à savoir', en: 'Good to know' },
        items: [
          { fr: 'La fiche de police reste gérée par votre PMS : nous lui envoyons les données', en: 'The registration card stays managed by your PMS: we send it the data' },
          { fr: 'Les permis de conduire ne se lisent pas automatiquement', en: 'Driving licences are not read automatically' },
          { fr: 'Le check-out en ligne n’est pas proposé', en: 'Online check-out is not offered' },
        ],
      },
    },
  ],
  quote: {
    text: { fr: 'Les formulaires peuvent se personnaliser en fonction des réponses aux questions. Selon les réponses que le client donne, on va pouvoir ouvrir d’autres questions, c’est vraiment un point fort.', en: 'Forms can adapt to the answers. Depending on what the guest says, other questions open up: that’s a real strength.' },
    name: 'Maxime Jullien', role: { fr: 'Directeur', en: 'General manager' }, company: 'Edgar Hôtel & Spa',
  },
  compare: {
    eyebrow: { fr: 'Pourquoi pas la fiche papier ?', en: 'Why not the paper card?' },
    title: { fr: 'La fiche papier, c’est la file d’attente.', en: 'The paper card means a queue.' },
    other: { fr: 'Fiche papier à l’arrivée', en: 'Paper card on arrival' },
    rows: [
      { label: { fr: 'Temps au comptoir', en: 'Time at the desk' }, other: { fr: 'Remplir, vérifier, photocopier', en: 'Fill in, check, photocopy' }, us: { fr: 'Déjà fait avant l’arrivée', en: 'Already done before arrival' } },
      { label: { fr: 'Saisie', en: 'Data entry' }, other: { fr: 'Recopiée dans le PMS', en: 'Re-typed into the PMS' }, us: { fr: 'Écrite automatiquement dans le PMS', en: 'Written automatically to the PMS' } },
      { label: { fr: 'Occupants', en: 'Occupants' }, other: { fr: 'Souvent oubliés', en: 'Often forgotten' }, us: { fr: 'Un bloc par occupant', en: 'One block per occupant' } },
      { label: { fr: 'Pièces d’identité', en: 'ID documents' }, other: { fr: 'Photocopies dans un classeur', en: 'Photocopies in a binder' }, us: { fr: 'Non conservées par défaut, ou supprimées automatiquement', en: 'Not stored by default, or deleted automatically' } },
    ],
  },
  pricing: { fr: 'Inclus dans Two Way et All Inclusive, ou comme module au choix avec One Way.', en: 'Included in Two Way and All Inclusive, or as your module of choice with One Way.' },
  faqTitle: { fr: 'Vos questions sur le check-in en ligne.', en: 'Your questions about online check-in.' },
  faq: [
    { q: { fr: 'Le client doit-il télécharger une application ?', en: 'Does the guest need an app?' }, a: { fr: 'Non. Le check-in s’ouvre depuis un lien ou un QR code, dans le navigateur du téléphone.', en: 'No. Check-in opens from a link or a QR code, in the phone’s browser.' } },
    { q: { fr: 'Quelles pièces d’identité sont lues ?', en: 'Which ID documents are read?' }, a: { fr: 'Les passeports, cartes d’identité et visas qui ont une bande de lecture automatique. Les permis de conduire ne sont pas lus : le client saisit alors ses informations.', en: 'Passports, ID cards and visas with a machine-readable zone. Driving licences are not read: the guest then types their details.' } },
    { q: { fr: 'Les informations remontent-elles dans mon PMS ?', en: 'Does the information reach my PMS?' }, a: { fr: 'Oui, dans Mews, Opera Cloud, Medialog, Apaleo, Misterbooking, Thaïs, Asterio, Lean PMS et Beds24. Les champs disponibles varient selon le PMS.', en: 'Yes, in Mews, Opera Cloud, Medialog, Apaleo, Misterbooking, Thaïs, Asterio, Lean PMS and Beds24. Available fields vary by PMS.' } },
    { q: { fr: 'Et la fiche de police ?', en: 'What about the police registration card?' }, a: { fr: 'Toutes les informations demandées sont collectées et envoyées à votre PMS, qui gère la fiche de police. La fiche signée est aussi archivée en PDF.', en: 'All required information is collected and sent to your PMS, which manages the registration card. The signed card is also archived as PDF.' } },
    { q: { fr: 'Peut-on faire le check-in sur place ?', en: 'Can guests check in on site?' }, a: { fr: 'Oui, avec un QR code au comptoir ou une tablette en mode borne.', en: 'Yes, with a QR code at the desk or a tablet in kiosk mode.' } },
    { q: { fr: 'Combien de temps gardez-vous les pièces d’identité ?', en: 'How long do you keep ID documents?' }, a: { fr: 'Par défaut, la photo n’est pas conservée. Si vous choisissez de la garder, elle est chiffrée et supprimée automatiquement après le délai fixé.', en: 'By default, the photo is not stored. If you choose to keep it, it is encrypted and deleted automatically after the set period.' } },
  ],
  cta: {
    title: { fr: 'Moins de file, plus d’accueil.', en: 'Less queueing, more welcoming.' },
    text: { fr: 'Une démo de 45 minutes, avec votre PMS.', en: 'A 45-minute demo, with your PMS.' },
  },
};
