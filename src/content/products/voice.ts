import type { ProductLanding } from './types';

/** Faits repris des réglages « Appels des clients » de l'app (compte de démo, 07/11/2026). Angle : GetWelcom. */
export const voice: ProductLanding = {
  slug: 'voice',
  name: { fr: 'Appel réception', en: 'Reception call' },
  seo: {
    title: { fr: 'Appel réception : la fin du téléphone en chambre | TriggerFlow', en: 'Reception call: goodbye to in-room phones | TriggerFlow' },
    description: {
      fr: 'Vos clients appellent la réception depuis leur propre téléphone, gratuitement et sans numéro à composer. Rien à installer en chambre, messages vocaux transcrits et traduits.',
      en: 'Guests call the front desk from their own phone, for free and with no number to dial. Nothing to install in rooms, voicemails transcribed and translated.',
    },
  },
  hero: {
    title: { fr: 'La fin du téléphone en chambre.', en: 'Goodbye to in-room phones.' },
    subtitle: {
      fr: 'Vos clients appellent la réception depuis leur propre téléphone, gratuitement, sans numéro à composer. Rien à installer en chambre, et vous savez qui appelle avant de décrocher.',
      en: 'Guests call the front desk from their own phone, for free, with no number to dial. Nothing to install in rooms, and you know who is calling before you pick up.',
    },
    visual: 'voice',
  },
  proof: { clients: [] },
  problem: {
    title: { fr: 'Le téléphone en chambre coûte cher et sert de moins en moins.', en: 'In-room phones are costly and used less and less.' },
    items: [
      { fr: 'Postes, câblage et standard à entretenir pour un usage qui baisse chaque année.', en: 'Handsets, cabling and a switchboard to maintain for use that drops every year.' },
      { fr: 'Les clients étrangers hésitent à appeler un numéro qu’ils ne connaissent pas.', en: 'International guests hesitate to dial a number they don’t know.' },
      { fr: 'La nuit ou en plein rush, l’appel sonne dans le vide et la demande se perd.', en: 'At night or at peak times, the call rings out and the request is lost.' },
    ],
  },
  how: {
    title: { fr: 'Un bouton, et la réception répond.', en: 'One button, and the front desk answers.' },
    steps: [
      { title: { fr: 'Le client appuie sur « Appeler la réception »', en: 'The guest taps “Call the front desk”' }, text: { fr: 'Depuis son espace client, la page de la serrure ou son pass Wallet. L’appel part du navigateur.', en: 'From their guest space, the lock page or their Wallet pass. The call starts in the browser.' } },
      { title: { fr: 'Ça sonne où vous voulez', en: 'It rings where you want' }, text: { fr: 'Sur la ligne de la réception, sur les postes TriggerFlow de l’équipe, ou les deux : le premier qui décroche prend l’appel.', en: 'On the front desk line, on the team’s TriggerFlow stations, or both: whoever picks up first takes the call.' } },
      { title: { fr: 'Personne ne décroche ? Rien ne se perd', en: 'Nobody picks up? Nothing is lost' }, text: { fr: 'Message vocal transcrit et traduit, renvoi vers l’astreinte ou bascule vers le chat.', en: 'Voicemail transcribed and translated, forwarding to the on-call number, or switch to chat.' } },
    ],
  },
  features: {
    title: { fr: 'Tout ce qu’un standard faisait, sans le standard.', en: 'Everything a switchboard did, without the switchboard.' },
    items: [
      { icon: 'phone', title: { fr: 'Appel depuis le navigateur', en: 'Browser calling' }, text: { fr: 'Gratuit pour le client, même étranger, rien à télécharger.', en: 'Free for the guest, even from abroad, nothing to download.' } },
      { icon: 'users', title: { fr: 'Vous savez qui appelle', en: 'You know who’s calling' }, text: { fr: 'L’appel est rattaché à la fiche du client et à son séjour.', en: 'The call is linked to the guest profile and their stay.' } },
      { icon: 'clock', title: { fr: 'Horaires par jour', en: 'Hours by day' }, text: { fr: 'Hors horaires, le repli part directement, nuit comprise.', en: 'Outside hours, the fallback starts straight away, overnight included.' } },
      { icon: 'mic', title: { fr: 'Messages vocaux traduits', en: 'Translated voicemail' }, text: { fr: 'Transcrits et traduits dans votre langue.', en: 'Transcribed and translated into your language.' } },
      { icon: 'moon', title: { fr: 'Astreinte et chat', en: 'On-call and chat' }, text: { fr: 'Renvoi vers un numéro d’astreinte ou suite de l’échange par écrit.', en: 'Forward to an on-call number or continue the conversation in writing.' } },
      { icon: 'shield', title: { fr: 'Enregistrement encadré', en: 'Controlled recording' }, text: { fr: 'En option : client prévenu, refus possible, audio gardé 30 jours.', en: 'Optional: guest informed, can refuse, audio kept for 30 days.' } },
    ],
  },
  tailored: {
    title: { fr: 'Réglé selon votre organisation.', en: 'Set up around your organisation.' },
    items: [
      { client: { fr: 'Petite structure', en: 'Small property' }, text: { fr: 'L’appel sonne sur le téléphone de la réception le jour, sur l’astreinte la nuit.', en: 'Calls ring on the front desk phone by day, on the on-call phone at night.' } },
      { client: { fr: 'Équipe en mobilité', en: 'Team on the move' }, text: { fr: 'Les postes TriggerFlow sonnent en même temps : le premier disponible décroche.', en: 'TriggerFlow stations ring at the same time: whoever is free picks up.' } },
      { client: { fr: 'Clientèle internationale', en: 'International guests' }, text: { fr: 'Les messages vocaux arrivent traduits : plus de demande incomprise.', en: 'Voicemails arrive translated: no more misunderstood requests.' } },
    ],
  },
  integrations: {
    title: { fr: 'Relié à vos clés digitales et à votre téléphonie.', en: 'Linked to your digital keys and your phone system.' },
    text: { fr: 'Le bouton apparaît aussi sur la page de la serrure (Igloohome, Sesame) et dans le pass Wallet. Compatible avec votre ligne actuelle.', en: 'The button also appears on the lock page (Igloohome, Sesame) and in the Wallet pass. Works with your current line.' },
    extra: ['Igloohome', 'Sesame'],
  },
  related: [
    { slug: 'inbox', href: '/produit/inbox', name: { fr: 'Messagerie', en: 'Inbox' }, text: { fr: 'Les demandes écrites au même endroit.', en: 'Written requests in one place.' } },
    { slug: 'crm', href: '/produit/crm', name: { fr: 'CRM', en: 'CRM' }, text: { fr: 'La fiche client derrière chaque appel.', en: 'The guest profile behind every call.' } },
    { slug: 'flows', href: '/produit/flows', name: { fr: 'Flows', en: 'Flows' }, text: { fr: 'Envoyez le lien de l’espace client au bon moment.', en: 'Send the guest space link at the right time.' } },
  ],
  pricing: { text: { fr: 'Module complémentaire, à ajouter à votre formule.', en: 'Add-on module, added to your plan.' }, addon: 'voice' },
  faq: [
    { q: { fr: 'L’appel est-il gratuit pour un client étranger ?', en: 'Is the call free for an international guest?' }, a: { fr: 'Oui : l’appel passe par internet depuis le navigateur du client, sans frais d’appel.', en: 'Yes: the call goes over the internet from the guest’s browser, with no call charges.' } },
    { q: { fr: 'Faut-il installer quelque chose ?', en: 'Is there anything to install?' }, a: { fr: 'Non. Pas de standard, pas de câblage, pas d’application à télécharger pour le client.', en: 'No. No switchboard, no cabling, no app for the guest to download.' } },
    { q: { fr: 'Où sonne l’appel ?', en: 'Where does the call ring?' }, a: { fr: 'Sur la ligne habituelle de la réception, sur les postes TriggerFlow de l’équipe, ou les deux.', en: 'On the usual front desk line, on the team’s TriggerFlow stations, or both.' } },
    { q: { fr: 'Que se passe-t-il la nuit ?', en: 'What happens at night?' }, a: { fr: 'Vous réglez vos horaires jour par jour. Hors horaires, le repli choisi part directement : message vocal, astreinte ou chat.', en: 'You set your hours day by day. Outside hours, the chosen fallback starts directly: voicemail, on-call or chat.' } },
    { q: { fr: 'Les appels sont-ils enregistrés ?', en: 'Are calls recorded?' }, a: { fr: 'Seulement si vous l’activez. Le client est prévenu au début de l’appel et peut refuser ; l’audio est gardé 30 jours.', en: 'Only if you turn it on. The guest is informed at the start and can refuse; audio is kept for 30 days.' } },
  ],
  cta: { title: { fr: 'Retirez le téléphone de vos chambres.', en: 'Take the phone out of your rooms.' } },
};
