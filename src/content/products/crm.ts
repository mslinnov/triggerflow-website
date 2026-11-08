import type { ProductLanding } from './types';

export const crm: ProductLanding = {
  slug: 'crm',
  name: { fr: 'CRM', en: 'CRM' },
  seo: {
    title: { fr: 'CRM hôtelier : une fiche par client, sans doublons | TriggerFlow', en: 'Hotel CRM: one profile per guest, no duplicates | TriggerFlow' },
    description: { fr: 'Fiche client 360 alimentée par le PMS, doublons détectés et fusionnés, résumé par l’IA, segments et comptes sociétés : chaque client reconnu à chaque séjour.', en: '360° guest profile fed by the PMS, duplicates detected and merged, AI summary, segments and company accounts: every guest recognised on every stay.' },
  },
  hero: {
    title: { fr: 'Chaque client reconnu, à chaque séjour. Avec une seule fiche.', en: 'Every guest recognised, every stay. With a single profile.' },
    subtitle: { fr: 'Séjours, préférences, dépenses, échanges : tout sur une fiche alimentée par votre PMS. Les doublons venus des OTA et des formulaires sont détectés et fusionnés.', en: 'Stays, preferences, spend, conversations: all on one profile fed by your PMS. Duplicates from OTAs and forms are detected and merged.' },
    visual: 'crm',
  },
  proof: { clients: ['Edgar Hôtel & Spa', 'Urban Bivouac'] },
  problem: {
    title: { fr: 'Vos données clients sont partout, et en double.', en: 'Your guest data is everywhere, and duplicated.' },
    items: [
      { fr: 'Le même client existe trois fois : PMS, adresse relais Booking, formulaire.', en: 'The same guest exists three times: PMS, Booking relay address, form.' },
      { fr: 'Ses préférences sont notées sur un post-it ou dans la tête d’un réceptionniste.', en: 'Their preferences live on a sticky note or in a receptionist’s head.' },
      { fr: 'Impossible de cibler une campagne sur des données incomplètes.', en: 'Impossible to target a campaign on incomplete data.' },
    ],
  },
  how: {
    title: { fr: 'Des données propres, toutes seules.', en: 'Clean data, on its own.' },
    steps: [
      { title: { fr: 'Le PMS alimente les fiches', en: 'The PMS feeds the profiles' }, text: { fr: 'Séjours, coordonnées et réservations remontent en continu.', en: 'Stays, contact details and bookings sync continuously.' } },
      { title: { fr: 'Les doublons sont fusionnés', en: 'Duplicates are merged' }, text: { fr: 'Les profils en double sont détectés et proposés à la fusion.', en: 'Duplicate profiles are detected and suggested for merging.' } },
      { title: { fr: 'Toute l’équipe s’en sert', en: 'The whole team uses it' }, text: { fr: 'Réception, marketing et direction travaillent sur la même fiche.', en: 'Front desk, marketing and management work on the same profile.' } },
    ],
  },
  features: {
    title: { fr: 'La mémoire de votre hôtel.', en: 'Your hotel’s memory.' },
    items: [
      { icon: 'users', title: { fr: 'Fiche client 360', en: '360° guest profile' }, text: { fr: 'Séjours, dépenses, préférences, échanges, avis.', en: 'Stays, spend, preferences, conversations, reviews.' } },
      { icon: 'refresh', title: { fr: 'Dédoublonnage', en: 'Deduplication' }, text: { fr: 'Les doublons détectés et fusionnés.', en: 'Duplicates detected and merged.' } },
      { icon: 'sparkles', title: { fr: 'Résumé par l’IA', en: 'AI summary' }, text: { fr: 'L’essentiel du client en trois lignes.', en: 'The guest in three lines.' } },
      { icon: 'filter', title: { fr: 'Segments et tags', en: 'Segments and tags' }, text: { fr: 'Utilisables dans les flows, campagnes et offres.', en: 'Usable in flows, campaigns and offers.' } },
      { icon: 'layers', title: { fr: 'Comptes sociétés', en: 'Company accounts' }, text: { fr: 'Entreprises, agences et apporteurs d’affaires sur une fiche unique.', en: 'Companies, agencies and referrers on a single profile.' } },
      { icon: 'link', title: { fr: 'Modifié ici, à jour dans le PMS', en: 'Edited here, updated in the PMS' }, text: { fr: 'Les modifications de la fiche remontent dans le PMS.', en: 'Profile edits flow back to the PMS.' } },
    ],
  },
  tailored: {
    title: { fr: 'Taillé pour votre hôtel.', en: 'Shaped around your hotel.' },
    items: [
      { client: 'Urban Bivouac', text: { fr: 'Des campagnes très ciblées grâce à des fiches complètes et à jour.', en: 'Highly targeted campaigns thanks to complete, up-to-date profiles.' } },
      { client: { fr: 'Clients OTA', en: 'OTA guests' }, text: { fr: 'Un segment « client avec email OTA » pour récupérer leur vraie adresse.', en: 'A “guest with an OTA email” segment to collect their real address.' } },
      { client: { fr: 'Clientèle affaires', en: 'Business guests' }, text: { fr: 'Les séjours rattachés à leur société, avec les prochaines actions.', en: 'Stays linked to their company, with next actions.' } },
    ],
  },
  caseStudy: {
    quote: { fr: 'Après avoir testé plusieurs solutions CRM, nous avons trouvé avec TriggerFlow l’outil qui correspond vraiment à nos besoins.', en: 'After testing several CRM tools, we found in TriggerFlow the one that truly fits our needs.' },
    name: 'Maxime Jullien', role: { fr: 'Directeur', en: 'General manager' }, company: 'Edgar Hôtel & Spa', href: '/clients/edgar-hotel-spa',
  },
  integrations: { title: { fr: 'Alimenté par votre PMS, dans les deux sens.', en: 'Fed by your PMS, both ways.' }, text: { fr: 'Les fiches se mettent à jour depuis le PMS, et vos modifications y redescendent.', en: 'Profiles update from the PMS, and your edits flow back.' } },
  reliability: { stat: 'messages', label: { fr: 'messages envoyés par nos hôtels clients', en: 'messages sent by our client hotels' } },
  related: [
    { slug: 'flows', href: '/produit/flows', name: { fr: 'Flows', en: 'Flows' }, text: { fr: 'Les segments au service des scénarios.', en: 'Segments powering scenarios.' } },
    { slug: 'inbox', href: '/produit/inbox', name: { fr: 'Messagerie', en: 'Inbox' }, text: { fr: 'La fiche à côté de chaque conversation.', en: 'The profile next to every conversation.' } },
    { slug: 'loyalty', href: '/produit/loyalty', name: { fr: 'Fidélité', en: 'Loyalty' }, text: { fr: 'Récompensez vos meilleurs clients.', en: 'Reward your best guests.' } },
  ],
  pricing: { text: { fr: 'Le socle de toutes les formules, dès Découverte.', en: 'The foundation of every plan, from Discovery.' } },
  faq: [
    { q: { fr: 'D’où viennent les données ?', en: 'Where does the data come from?' }, a: { fr: 'De votre PMS, des formulaires, des conversations et des avis, réunis sur une fiche.', en: 'From your PMS, forms, conversations and reviews, brought together on one profile.' } },
    { q: { fr: 'Comment les doublons sont-ils gérés ?', en: 'How are duplicates handled?' }, a: { fr: 'TriggerFlow détecte les profils en double et propose de les fusionner.', en: 'TriggerFlow detects duplicate profiles and suggests merging them.' } },
    { q: { fr: 'Puis-je modifier une fiche depuis TriggerFlow ?', en: 'Can I edit a profile in TriggerFlow?' }, a: { fr: 'Oui, et la modification remonte dans le PMS.', en: 'Yes, and the change flows back to the PMS.' } },
    { q: { fr: 'Gérez-vous les clients entreprises ?', en: 'Do you handle business accounts?' }, a: { fr: 'Oui, avec le module Sociétés, inclus gratuitement.', en: 'Yes, with the Companies module, included for free.' } },
  ],
  cta: { title: { fr: 'Une fiche par client, dès cette semaine.', en: 'One profile per guest, starting this week.' } },
};
