/**
 * Contenu de la landing Avis (FR/EN).
 * Capacités : audit du code (origin/main, 09/11/2026) : Google (API officielle, réponse publiée), Booking.com,
 * Tripadvisor, Expedia, Airbnb (synchronisation quotidienne), enquêtes internes ; réponses IA en brouillon ;
 * alertes email sur avis négatif ; synthèse IA ; widgets ; vue groupe.
 * Validé par Soufiane (09/11) : tout le monde est invité à publier (pas de tri des clients selon la note, interdit
 * par Google) ; les notes basses alertent la direction.
 * Ne PAS affirmer : réponse publiée ailleurs que sur Google, réponse automatique, alerte SMS, analyse par thème,
 * benchmark concurrents, déclencheur de flow sur un nouvel avis.
 * Capture : établissement client anonymisé (noms, ville et photos remplacés), 09/11/2026.
 */
type L = { fr: string; en: string };

export const reviewsLanding = {
  seo: {
    title: { fr: 'Gestion des avis hôtel : Google, Booking, Tripadvisor | TriggerFlow', en: 'Hotel review management: Google, Booking, Tripadvisor | TriggerFlow' },
    description: {
      fr: 'Tous vos avis Google, Booking.com, Tripadvisor, Expedia et Airbnb au même endroit, des réponses rédigées par l’IA dans la langue du client, et une alerte à chaque avis négatif.',
      en: 'All your Google, Booking.com, Tripadvisor, Expedia and Airbnb reviews in one place, AI-drafted replies in the guest’s language, and an alert for every negative review.',
    },
  },
  hero: {
    eyebrow: { fr: 'Avis', en: 'Reviews' } as L,
    title: { fr: 'Plus d’avis, de meilleures réponses, et votre note qui monte.', en: 'More reviews, better replies, and your rating going up.' } as L,
    subtitle: {
      fr: 'Vos avis Google, Booking.com, Tripadvisor, Expedia et Airbnb arrivent au même endroit. L’IA rédige la réponse dans la langue du client, vous validez. Et chaque avis négatif vous est signalé tout de suite.',
      en: 'Your Google, Booking.com, Tripadvisor, Expedia and Airbnb reviews land in one place. AI drafts the reply in the guest’s language, you approve. And every negative review is flagged right away.',
    } as L,
    bullets: [
      { fr: '5 plateformes et vos enquêtes, dans un seul écran', en: '5 platforms and your surveys, on one screen' },
      { fr: 'Une réponse prête en quelques secondes, dans le ton de votre hôtel', en: 'A reply ready in seconds, in your hotel’s tone' },
      { fr: 'La demande d’avis envoyée au bon moment, à chaque client', en: 'The review request sent at the right time, to every guest' },
    ] as L[],
    alt: { fr: 'Avis TriggerFlow : note moyenne, taux de réponse, avis par plateforme', en: 'TriggerFlow reviews: average rating, reply rate, reviews per platform' } as L,
    caption: { fr: 'Capture de l’application, établissement anonymisé', en: 'App screenshot, anonymised property' } as L,
  },
  proof: {
    label: { fr: 'Ils pilotent leur e-réputation avec TriggerFlow', en: 'They manage their online reputation with TriggerFlow' } as L,
    clients: ['AMMI Hôtels', 'Odomo', 'Groupe Noemys', 'Hôtel Causse Comtal'],
  },
  sources: {
    eyebrow: { fr: 'Tous vos avis', en: 'All your reviews' } as L,
    title: { fr: 'Fini les cinq onglets', en: 'No more five tabs' } as L,
    titleMuted: { fr: 'pour lire vos avis.', en: 'to read your reviews.' } as L,
    items: [
      { key: 'google', name: 'Google', text: { fr: 'Connexion officielle, mise à jour toutes les heures. Réponse publiée depuis TriggerFlow.', en: 'Official connection, updated every hour. Reply published from TriggerFlow.' } },
      { key: 'booking', name: 'Booking.com', text: { fr: 'Les avis et la note affichée sur Booking, chaque jour.', en: 'Reviews and the score shown on Booking, every day.' } },
      { key: 'tripadvisor', name: 'Tripadvisor', text: { fr: 'Chaque jour, avec la réponse publiée une fois en ligne.', en: 'Every day, including the reply once it is live.' } },
      { key: 'expedia', name: 'Expedia', text: { fr: 'Expedia et Hotels.com, avec tout l’historique.', en: 'Expedia and Hotels.com, with the full history.' } },
      { key: 'airbnb', name: 'Airbnb', text: { fr: 'Plusieurs annonces par établissement.', en: 'Several listings per property.' } },
      { key: 'internal', name: { fr: 'Vos enquêtes', en: 'Your surveys' }, text: { fr: 'Les réponses à votre enquête après séjour deviennent des avis.', en: 'Answers to your post-stay survey become reviews.' } },
    ],
  },
  ask: {
    eyebrow: { fr: 'Demander l’avis', en: 'Asking for reviews' } as L,
    title: { fr: 'Le bon moment change tout.', en: 'The right moment changes everything.' } as L,
    text: { fr: 'L’enquête part automatiquement après le départ, sur le canal préféré du client et dans sa langue. Chaque client est invité à publier sur la plateforme de votre choix. Quand la note est basse, la direction est prévenue et peut reprendre contact avant que le client ne publie ailleurs.', en: 'The survey goes out automatically after departure, on the guest’s preferred channel and in their language. Every guest is invited to post on the platform you choose. When the rating is low, management is notified and can get back in touch before the guest posts elsewhere.' } as L,
    figure: '×7',
    figureLabel: { fr: 'd’avis entre le meilleur et le pire créneau d’envoi après le séjour', en: 'more reviews between the best and worst post-stay send time' } as L,
    source: { fr: 'Source : « Le guide du post-séjour », TriggerFlow, été 2026', en: 'Source: “The post-stay guide”, TriggerFlow, summer 2026' } as L,
    steps: [
      { fr: 'Départ du client, lu dans votre PMS', en: 'Guest checks out, read from your PMS' },
      { fr: 'Enquête par email, SMS ou WhatsApp', en: 'Survey by email, SMS or WhatsApp' },
      { fr: 'Invitation à publier sur Google ou Tripadvisor', en: 'Invitation to post on Google or Tripadvisor' },
      { fr: 'Note basse : alerte à la direction', en: 'Low rating: alert to management' },
    ] as L[],
  },
  reply: {
    eyebrow: { fr: 'Répondre', en: 'Replying' } as L,
    title: { fr: 'Une réponse personnelle, en quelques secondes.', en: 'A personal reply, in seconds.' } as L,
    items: [
      { fr: 'Écrite dans la langue du client, avec la traduction pour vous', en: 'Written in the guest’s language, with a translation for you' },
      { fr: 'Son prénom et les points qu’il a soulevés, jamais une réponse type', en: 'Their first name and the points they raised, never a canned reply' },
      { fr: 'Le ton de vos dernières réponses et les règles de chaque plateforme', en: 'The tone of your recent replies and each platform’s rules' },
      { fr: 'Votre ville et un atout de l’hôtel cités naturellement, pour votre référencement local', en: 'Your city and a hotel highlight mentioned naturally, for your local search ranking' },
      { fr: 'Jusqu’à 20 réponses préparées d’un coup', en: 'Up to 20 replies drafted at once' },
    ] as L[],
    note: { fr: 'Rien ne part sans vous. Sur Google, la réponse est publiée directement. Sur les autres plateformes, elle est copiée et la plateforme s’ouvre.', en: 'Nothing goes out without you. On Google, the reply is published directly. On other platforms, it is copied and the platform opens.' } as L,
    demo: {
      platform: 'Booking.com',
      score: '6,0',
      name: 'Lukas',
      country: { fr: 'Allemagne', en: 'Germany' } as L,
      review: 'Schöne Lage, aber das Frühstück war enttäuschend und das Zimmer etwas laut.',
      reply: 'Lieber Lukas, vielen Dank für Ihr ehrliches Feedback. Es freut uns, dass Ihnen die Lage gefallen hat. Ihre Hinweise zum Frühstück und zur Geräuschkulisse haben wir an unser Team weitergegeben.',
      translation: { fr: 'Cher Lukas, merci pour votre retour sincère. Nous sommes heureux que l’emplacement vous ait plu. Vos remarques sur le petit-déjeuner et le bruit ont été transmises à notre équipe.', en: 'Dear Lukas, thank you for your honest feedback. We are glad you liked the location. Your comments on breakfast and noise have been passed on to our team.' } as L,
      label: { fr: 'Brouillon IA · à valider', en: 'AI draft · to approve' } as L,
    },
  },
  watch: {
    eyebrow: { fr: 'Ne rien laisser passer', en: 'Miss nothing' } as L,
    title: { fr: 'Les avis qui comptent, tout de suite.', en: 'The reviews that matter, right away.' } as L,
    items: [
      { title: { fr: 'Alerte sur avis négatif', en: 'Negative review alert' }, text: { fr: 'Un email immédiat sous la note que vous choisissez.', en: 'An instant email below the rating you choose.' } },
      { title: { fr: 'Récapitulatif', en: 'Digest' }, text: { fr: 'Chaque jour, deux fois par jour ou chaque semaine.', en: 'Daily, twice a day or weekly.' } },
      { title: { fr: 'Avis sans réponse', en: 'Unanswered reviews' }, text: { fr: 'La liste de ce qui attend encore une réponse.', en: 'The list of what still needs a reply.' } },
      { title: { fr: 'Sur la fiche client', en: 'On the guest profile' }, text: { fr: 'L’avis relié au client et à son séjour, visible dans la messagerie.', en: 'The review linked to the guest and their stay, visible in the inbox.' } },
    ],
  },
  understand: {
    eyebrow: { fr: 'Comprendre', en: 'Understand' } as L,
    title: { fr: 'Ce que vos clients disent vraiment.', en: 'What your guests really say.' } as L,
    items: [
      { fr: 'Note moyenne, nombre d’avis et taux de réponse, comparés à la période précédente', en: 'Average rating, review count and reply rate, compared with the previous period' },
      { fr: 'Résultats par plateforme, avec la note affichée sur Booking.com et Expedia', en: 'Results per platform, with the score shown on Booking.com and Expedia' },
      { fr: 'Synthèse par l’IA : points forts, axes d’amélioration, tendance', en: 'AI summary: strengths, areas to improve, trend' },
      { fr: 'Pour les groupes : chaque hôtel comparé, et un classement', en: 'For groups: every hotel compared, and a ranking' },
    ] as L[],
  },
  widgets: {
    eyebrow: { fr: 'Sur votre site', en: 'On your website' } as L,
    title: { fr: 'Vos avis vendent vos chambres.', en: 'Your reviews sell your rooms.' } as L,
    text: { fr: 'Badge, résumé ou cartes d’avis à intégrer sur votre site, à vos couleurs et en plusieurs langues. Une version fait apparaître vos étoiles dans les résultats Google.', en: 'Badge, summary or review cards to embed on your website, in your colours and several languages. One version shows your stars in Google results.' } as L,
    badge: { rating: '4,8', count: { fr: '466 avis vérifiés', en: '466 verified reviews' } as L },
  },
  quote: {
    text: { fr: 'L’équipe TriggerFlow a été très à l’écoute et réactive. On a fait des retours et ils ont accepté de mettre en place des fonctionnalités qui nous manquaient, comme la e-réputation, dans un temps record.', en: 'The TriggerFlow team was very attentive and responsive. We gave feedback and they agreed to build features we were missing, like reputation management, in record time.' } as L,
    name: 'Romain Coste-Chareyre',
    role: { fr: 'Groupe', en: 'Group' } as L,
    company: 'AMMI Hôtels',
  },
  compare: {
    eyebrow: { fr: 'Pourquoi pas les extranets ?', en: 'Why not the extranets?' } as L,
    title: { fr: 'Cinq extranets, ce sont des avis oubliés.', en: 'Five extranets mean forgotten reviews.' } as L,
    criteria: { fr: 'Critère', en: 'Criterion' } as L,
    other: { fr: 'Chaque plateforme à part', en: 'Each platform separately' } as L,
    rows: [
      { label: { fr: 'Lecture', en: 'Reading' }, other: { fr: 'Un onglet et un identifiant par plateforme', en: 'One tab and one login per platform' }, us: { fr: 'Un seul écran pour tous vos avis', en: 'One screen for every review' } },
      { label: { fr: 'Réponse', en: 'Reply' }, other: { fr: 'Rédigée à la main, souvent en anglais', en: 'Written by hand, often in English' }, us: { fr: 'Brouillon IA dans la langue du client', en: 'AI draft in the guest’s language' } },
      { label: { fr: 'Avis négatifs', en: 'Negative reviews' }, other: { fr: 'Découverts des jours plus tard', en: 'Found days later' }, us: { fr: 'Alerte immédiate à la direction', en: 'Instant alert to management' } },
      { label: { fr: 'Demande d’avis', en: 'Review requests' }, other: { fr: 'Laissée aux plateformes', en: 'Left to the platforms' }, us: { fr: 'Votre enquête, au bon moment', en: 'Your survey, at the right time' } },
    ],
  },
  pricing: { fr: 'Module Avis : 19 € par mois.', en: 'Reviews module: €19 per month.' } as L,
  faqTitle: { fr: 'Vos questions sur les avis.', en: 'Your questions about reviews.' } as L,
  faq: [
    { q: { fr: 'Quelles plateformes sont prises en charge ?', en: 'Which platforms are supported?' }, a: { fr: 'Google, Booking.com, Tripadvisor, Expedia (y compris Hotels.com) et Airbnb, plus les réponses à vos propres enquêtes après séjour.', en: 'Google, Booking.com, Tripadvisor, Expedia (including Hotels.com) and Airbnb, plus answers to your own post-stay surveys.' } },
    { q: { fr: 'Peut-on répondre directement depuis TriggerFlow ?', en: 'Can I reply directly from TriggerFlow?' }, a: { fr: 'Sur Google, oui : la réponse est publiée directement. Pour les autres plateformes, la réponse est copiée et la plateforme s’ouvre, il suffit de la coller.', en: 'On Google, yes: the reply is published directly. For other platforms, the reply is copied and the platform opens, you just paste it.' } },
    { q: { fr: 'Les réponses de l’IA partent-elles toutes seules ?', en: 'Do AI replies go out on their own?' }, a: { fr: 'Non. L’IA prépare un brouillon, vous le relisez, le modifiez si besoin, puis le publiez.', en: 'No. AI prepares a draft, you review it, edit it if needed, then publish it.' } },
    { q: { fr: 'Invitez-vous seulement les clients satisfaits à laisser un avis ?', en: 'Do you only invite happy guests to leave a review?' }, a: { fr: 'Non. Chaque client est invité à publier, comme l’exigent les plateformes. Les notes basses alertent en plus la direction, pour qu’elle puisse reprendre contact.', en: 'No. Every guest is invited to post, as the platforms require. Low ratings also alert management, so they can get back in touch.' } },
    { q: { fr: 'À quelle fréquence les avis sont-ils mis à jour ?', en: 'How often are reviews updated?' }, a: { fr: 'Toutes les heures pour Google, chaque jour pour les autres plateformes.', en: 'Every hour for Google, every day for the other platforms.' } },
    { q: { fr: 'Et pour un groupe d’hôtels ?', en: 'What about a hotel group?' }, a: { fr: 'Une vue de tous vos établissements, des filtres par hôtel et par plateforme, et un classement de vos hôtels.', en: 'A view of all your properties, filters by hotel and platform, and a ranking of your hotels.' } },
  ],
  cta: {
    title: { fr: 'Faites monter votre note.', en: 'Raise your rating.' } as L,
    text: { fr: 'Une démo de 45 minutes, avec vos vrais avis.', en: 'A 45-minute demo, with your real reviews.' } as L,
    demo: { fr: 'Demander une démo', en: 'Book a demo' } as L,
    pricing: { fr: 'Voir les tarifs', en: 'See pricing' } as L,
  },
};
