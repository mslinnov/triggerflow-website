import type { ProductLanding } from './types';

/** Faits : module « Demandes de réservation » de l'app (espaces réservables, page publique, calendrier). */
export const bookingRequests: ProductLanding = {
  slug: 'booking-requests',
  name: { fr: 'Demandes de réservation', en: 'Booking requests' },
  seo: { title: { fr: 'Réservation d’espaces et de créneaux pour hôtels | TriggerFlow', en: 'Space and slot booking for hotels | TriggerFlow' }, description: { fr: 'Salles, spa, table, activités : vos espaces réservables en ligne avec vos règles, une page publique et un calendrier, chaque demande rattachée au client.', en: 'Meeting rooms, spa, tables, activities: your bookable spaces online with your rules, a public page and a calendar, every request linked to the guest.' } },
  hero: { title: { fr: 'Vos espaces réservables en ligne, avec vos règles.', en: 'Your bookable spaces online, on your terms.' }, subtitle: { fr: 'Salle de réunion, spa, table, activité : le client choisit un créneau sur une page publique, la demande arrive dans TriggerFlow, rattachée à sa fiche.', en: 'Meeting room, spa, table, activity: guests pick a slot on a public page, the request lands in TriggerFlow, linked to their profile.' }, visual: 'booking' },
  proof: { clients: [] },
  problem: { title: { fr: 'Les demandes de créneaux arrivent par tous les canaux.', en: 'Slot requests arrive through every channel.' }, items: [
    { fr: 'Téléphone, email, réception : chaque demande se note à un endroit différent.', en: 'Phone, email, front desk: every request is written down somewhere else.' },
    { fr: 'Les disponibilités se vérifient à la main.', en: 'Availability is checked by hand.' },
    { fr: 'La demande n’est pas reliée au client ni à son séjour.', en: 'The request isn’t linked to the guest or their stay.' } ] },
  how: { title: { fr: 'Une page, un calendrier, une demande.', en: 'One page, one calendar, one request.' }, steps: [
    { title: { fr: 'Déclarez vos espaces', en: 'Declare your spaces' }, text: { fr: 'Créneaux, périodes d’ouverture, fermetures.', en: 'Slots, opening periods, closures.' } },
    { title: { fr: 'Partagez la page publique', en: 'Share the public page' }, text: { fr: 'Sur votre site, dans un email ou dans la Guest App.', en: 'On your website, in an email or in the Guest App.' } },
    { title: { fr: 'Traitez les demandes', en: 'Handle requests' }, text: { fr: 'Elles arrivent dans TriggerFlow, rattachées au client.', en: 'They land in TriggerFlow, linked to the guest.' } } ] },
  features: { title: { fr: 'Simple pour le client, clair pour l’équipe.', en: 'Simple for guests, clear for the team.' }, items: [
    { icon: 'layers', title: { fr: 'Espaces réservables', en: 'Bookable spaces' }, text: { fr: 'Salles, spa, tables, activités.', en: 'Rooms, spa, tables, activities.' } },
    { icon: 'calendar', title: { fr: 'Calendrier public', en: 'Public calendar' }, text: { fr: 'Les disponibilités à jour.', en: 'Up-to-date availability.' } },
    { icon: 'clock', title: { fr: 'Périodes et fermetures', en: 'Periods and closures' }, text: { fr: 'Vos règles, saison par saison.', en: 'Your rules, season by season.' } },
    { icon: 'users', title: { fr: 'Rattaché au client', en: 'Linked to the guest' }, text: { fr: 'Chaque demande sur la fiche.', en: 'Every request on the profile.' } },
    { icon: 'bell', title: { fr: 'Notification à l’équipe', en: 'Team notification' }, text: { fr: 'Les nouvelles demandes signalées.', en: 'New requests flagged.' } },
    { icon: 'workflow', title: { fr: 'Dans vos flows', en: 'In your flows' }, text: { fr: 'Confirmation et rappel automatiques.', en: 'Automatic confirmation and reminder.' } } ] },
  tailored: { title: { fr: 'Pour vos espaces.', en: 'For your spaces.' }, items: [
    { client: { fr: 'Spa', en: 'Spa' }, text: { fr: 'Les soins réservés sur des créneaux, avant l’arrivée.', en: 'Treatments booked in slots, before arrival.' } },
    { client: { fr: 'Séminaire', en: 'Seminar' }, text: { fr: 'Les salles de réunion demandées en ligne.', en: 'Meeting rooms requested online.' } },
    { client: { fr: 'Restaurant', en: 'Restaurant' }, text: { fr: 'Une table réservée depuis l’email de pré-séjour.', en: 'A table booked from the pre-stay email.' } } ] },
  integrations: { title: { fr: 'Relié à vos séjours.', en: 'Linked to your stays.' }, text: { fr: 'Les demandes se rattachent aux clients et aux réservations du PMS.', en: 'Requests link to guests and PMS bookings.' } },
  related: [
    { slug: 'events', href: '/produit/events', name: { fr: 'Événements', en: 'Events' }, text: { fr: 'Séminaires, mariages, groupes.', en: 'Seminars, weddings, groups.' } },
    { slug: 'guest-app', href: '/produit/guest-app', name: { fr: 'Guest App', en: 'Guest App' }, text: { fr: 'La page de réservation dans l’application.', en: 'The booking page inside the app.' } },
    { slug: 'flows', href: '/produit/flows', name: { fr: 'Flows', en: 'Flows' }, text: { fr: 'Confirmations et rappels.', en: 'Confirmations and reminders.' } } ],
  pricing: { text: { fr: 'Le tarif vous est présenté pendant la démo.', en: 'Pricing is shown during the demo.' } },
  faq: [
    { q: { fr: 'Quels espaces peut-on proposer ?', en: 'Which spaces can I offer?' }, a: { fr: 'Tout espace réservable : salle, spa, table, activité, avec vos créneaux.', en: 'Any bookable space: room, spa, table, activity, with your slots.' } },
    { q: { fr: 'Où le client réserve-t-il ?', en: 'Where does the guest book?' }, a: { fr: 'Sur une page publique, partageable sur votre site, par email ou dans la Guest App.', en: 'On a public page, shareable on your website, by email or in the Guest App.' } },
    { q: { fr: 'Puis-je fermer certaines périodes ?', en: 'Can I close certain periods?' }, a: { fr: 'Oui, périodes d’ouverture et fermetures se règlent par espace.', en: 'Yes, opening periods and closures are set per space.' } } ],
  cta: { title: { fr: 'Ouvrez vos espaces à la réservation en ligne.', en: 'Open your spaces to online booking.' } },
};
