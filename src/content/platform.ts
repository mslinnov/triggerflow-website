import type { L } from './products';

/**
 * Pages « Plateforme » (docs/arborescence.md) : sécurité, IA intégrée, synchronisation.
 * Faits de sécurité et d'IA repris mot pour mot du DPA publié (content/legal/fr/dpa.mdx).
 */
export interface PlatformPage {
  slug: 'securite' | 'ia' | 'synchronisation';
  seo: { title: L; description: L };
  eyebrow: L;
  title: L;
  subtitle: L;
  blocks: PlatformBlock[];
  faq: { q: L; a: L }[];
  cta: L;
}

export type PlatformBlock =
  | { kind: 'facts'; title: L; items: { title: L; text: L }[] }
  | { kind: 'table'; title: L; text: L; columns: [L, L, L]; rows: [string | L, string, string | L][] }
  | { kind: 'split'; title: L; left: { title: L; items: L[] }; right: { title: L; items: L[] } }
  | { kind: 'examples'; title: L; items: { module: L; text: L }[] }
  | { kind: 'principles'; title: L; items: L[] };

export const platformPages: Record<PlatformPage['slug'], PlatformPage> = {
  securite: {
    slug: 'securite',
    seo: {
      title: { fr: 'Sécurité et protection des données | TriggerFlow', en: 'Security and data protection | TriggerFlow' },
      description: { fr: 'Hébergement en France chez Scaleway, chiffrement TLS 1.2, sauvegardes testées, DPA public et sous-traitants listés : la sécurité de TriggerFlow.', en: 'Hosting in France at Scaleway, TLS 1.2 encryption, tested backups, public DPA and listed subprocessors: how TriggerFlow keeps data safe.' },
    },
    eyebrow: { fr: 'Sécurité', en: 'Security' },
    title: { fr: 'Les données de vos clients, protégées et hébergées en France.', en: 'Your guests’ data, protected and hosted in France.' },
    subtitle: { fr: 'Infrastructure en France, mesures de sécurité documentées, accord de sous-traitance public : tout est écrit, rien n’est caché.', en: 'Infrastructure in France, documented security measures, a public data processing agreement: everything is written down, nothing is hidden.' },
    blocks: [
      {
        kind: 'facts',
        title: { fr: 'Mesures techniques et organisationnelles', en: 'Technical and organisational measures' },
        items: [
          { title: { fr: 'Hébergement en France', en: 'Hosting in France' }, text: { fr: 'Infrastructure chez Scaleway, en France (Union européenne).', en: 'Infrastructure at Scaleway, in France (European Union).' } },
          { title: { fr: 'Chiffrement', en: 'Encryption' }, text: { fr: 'Communications chiffrées en TLS 1.2 minimum.', en: 'Communications encrypted with TLS 1.2 or higher.' } },
          { title: { fr: 'Accès maîtrisés', en: 'Controlled access' }, text: { fr: 'Authentification renforcée des accès administrateur, habilitations selon le moindre privilège.', en: 'Strong authentication for admin access, least-privilege permissions.' } },
          { title: { fr: 'Journalisation', en: 'Logging' }, text: { fr: 'Accès et opérations sensibles journalisés.', en: 'Access and sensitive operations are logged.' } },
          { title: { fr: 'Sauvegardes', en: 'Backups' }, text: { fr: 'Sauvegardes régulières et tests de restauration.', en: 'Regular backups and restore tests.' } },
          { title: { fr: 'Environnements cloisonnés', en: 'Separated environments' }, text: { fr: 'Production et préproduction séparées.', en: 'Production and staging kept apart.' } },
          { title: { fr: 'Violation de données', en: 'Data breaches' }, text: { fr: 'Notification au client sous 48 heures maximum (article 33 du RGPD).', en: 'Customer notified within 48 hours at most (GDPR article 33).' } },
          { title: { fr: 'SSO pour les groupes', en: 'SSO for groups' }, text: { fr: 'Connexion via le fournisseur d’identité de l’entreprise (SAML).', en: 'Sign-in through the company’s identity provider (SAML).' } },
          { title: { fr: 'Confidentialité', en: 'Confidentiality' }, text: { fr: 'Engagement de confidentialité de chaque collaborateur.', en: 'Confidentiality commitment from every team member.' } },
        ],
      },
      {
        kind: 'table',
        title: { fr: 'Sous-traitants ultérieurs', en: 'Subprocessors' },
        text: { fr: 'La liste complète, à jour, telle que publiée dans l’accord de sous-traitance.', en: 'The full, up-to-date list, as published in the data processing agreement.' },
        columns: [{ fr: 'Usage', en: 'Purpose' }, { fr: 'Prestataire', en: 'Provider' }, { fr: 'Localisation', en: 'Location' }],
        rows: [
          [{ fr: 'Hébergement', en: 'Hosting' }, 'Scaleway', { fr: 'France (UE)', en: 'France (EU)' }],
          [{ fr: 'Envoi d’emails', en: 'Email delivery' }, 'Mailgun', { fr: 'Union européenne', en: 'European Union' }],
          [{ fr: 'Vérification d’adresses email', en: 'Email verification' }, 'MillionVerifier', { fr: 'Nouvelle-Zélande / UE / États-Unis', en: 'New Zealand / EU / United States' }],
          [{ fr: 'Envoi de SMS', en: 'SMS delivery' }, 'Twilio, Gateway API', { fr: 'UE / international', en: 'EU / international' }],
          [{ fr: 'Paiement par carte', en: 'Card payments' }, 'Stripe, Lyra (PayZen)', { fr: 'UE (Irlande, France)', en: 'EU (Ireland, France)' }],
          [{ fr: 'Prélèvements SEPA', en: 'SEPA direct debit' }, 'GoCardless', { fr: 'UE / Royaume-Uni', en: 'EU / United Kingdom' }],
          [{ fr: 'Mesure d’audience', en: 'Analytics' }, 'Google Analytics', { fr: 'États-Unis', en: 'United States' }],
          [{ fr: 'Messagerie WhatsApp', en: 'WhatsApp messaging' }, 'Meta Platforms', { fr: 'UE (Irlande) / États-Unis', en: 'EU (Ireland) / United States' }],
          [{ fr: 'Assistance IA (à la demande)', en: 'AI assistance (on demand)' }, 'Anthropic, OpenAI', { fr: 'États-Unis', en: 'United States' }],
          [{ fr: 'Suivi des erreurs techniques', en: 'Error tracking' }, 'Bugsnag (SmartBear)', { fr: 'États-Unis', en: 'United States' }],
        ],
      },
      {
        kind: 'principles',
        title: { fr: 'Vos données vous appartiennent', en: 'Your data belongs to you' },
        items: [
          { fr: 'Traitement uniquement sur vos instructions documentées (article 28 du RGPD).', en: 'Processing only on your documented instructions (GDPR article 28).' },
          { fr: 'Transferts hors UE encadrés par les Clauses Contractuelles Types.', en: 'Transfers outside the EU covered by Standard Contractual Clauses.' },
          { fr: 'En fin de contrat : export dans un format standard, puis suppression.', en: 'At the end of the contract: export in a standard format, then deletion.' },
          { fr: 'Données d’événements et enregistrements d’appels supprimés automatiquement après leur usage.', en: 'Event data and call recordings deleted automatically once no longer needed.' },
        ],
      },
    ],
    faq: [
      { q: { fr: 'Où sont hébergées les données ?', en: 'Where is the data hosted?' }, a: { fr: 'Chez Scaleway, en France. Certains services ponctuels (assistance IA à la demande, suivi d’erreurs, mesure d’audience) passent par des sous-traitants hors UE, listés ci-dessus et encadrés par les Clauses Contractuelles Types.', en: 'At Scaleway, in France. Some specific services (on-demand AI assistance, error tracking, analytics) use subprocessors outside the EU, listed above and covered by Standard Contractual Clauses.' } },
      { q: { fr: 'Où trouver l’accord de sous-traitance ?', en: 'Where is the data processing agreement?' }, a: { fr: 'Il est public, sur la page DPA du site. Il couvre les obligations de l’article 28 du RGPD.', en: 'It is public, on the DPA page of the website. It covers GDPR article 28 obligations.' } },
      { q: { fr: 'Qui contacter pour une question de données personnelles ?', en: 'Who do I contact about personal data?' }, a: { fr: 'Le référent à la protection des données : dpo@trigger-flow.com.', en: 'The data protection contact: dpo@trigger-flow.com.' } },
    ],
    cta: { fr: 'Une question de sécurité avant de démarrer ?', en: 'A security question before you start?' },
  },
  ia: {
    slug: 'ia',
    seo: {
      title: { fr: 'L’IA intégrée à TriggerFlow : utile, encadrée, à la demande', en: 'AI built into TriggerFlow: useful, controlled, on demand' },
      description: { fr: 'L’IA de TriggerFlow aide à rédiger, répondre, résumer et traduire dans chaque module. Activée à la demande, jamais utilisée pour entraîner les modèles.', en: 'TriggerFlow’s AI helps write, reply, summarise and translate in every module. Activated on demand, never used to train models.' },
    },
    eyebrow: { fr: 'IA intégrée', en: 'Built-in AI' },
    title: { fr: 'L’IA fait gagner du temps. Votre équipe garde la main.', en: 'AI saves time. Your team stays in control.' },
    subtitle: { fr: 'Pas une application d’IA de plus : une aide discrète dans chaque module, pour rédiger, répondre, résumer et traduire. Vous validez, toujours.', en: 'Not another AI app: quiet help inside every module to write, reply, summarise and translate. You approve, always.' },
    blocks: [
      {
        kind: 'examples',
        title: { fr: 'Là où l’IA vous aide', en: 'Where AI helps you' },
        items: [
          { module: { fr: 'Messagerie', en: 'Inbox' }, text: { fr: 'Une réponse suggérée à partir de l’historique du client, que la réception relit et envoie.', en: 'A suggested reply based on the guest’s history, which the front desk reviews and sends.' } },
          { module: { fr: 'Avis', en: 'Reviews' }, text: { fr: 'Un brouillon de réponse aux avis Google, Expedia et autres, dans le ton de votre hôtel.', en: 'A draft reply to Google, Expedia and other reviews, in your hotel’s tone.' } },
          { module: { fr: 'Campagnes', en: 'Campaigns' }, text: { fr: 'La génération d’emails et de chartes graphiques à partir de quelques consignes.', en: 'Email and brand template generation from a few instructions.' } },
          { module: { fr: 'CRM', en: 'CRM' }, text: { fr: 'Un résumé de la fiche client : séjours, préférences, derniers échanges.', en: 'A guest profile summary: stays, preferences, recent conversations.' } },
          { module: { fr: 'Chatbot', en: 'Chatbot' }, text: { fr: 'Un assistant entraîné sur les informations de votre hôtel, qui passe la main à l’équipe si besoin.', en: 'An assistant trained on your hotel’s information, which hands over to the team when needed.' } },
          { module: { fr: 'Appel réception', en: 'Reception call' }, text: { fr: 'Les messages vocaux transcrits et traduits dans votre langue.', en: 'Voicemails transcribed and translated into your language.' } },
        ],
      },
      {
        kind: 'principles',
        title: { fr: 'Nos engagements', en: 'Our commitments' },
        items: [
          { fr: 'Fonctionnalités activées à la demande, par vous.', en: 'Features activated on demand, by you.' },
          { fr: 'Données anonymisées ou pseudonymisées autant que possible avant traitement.', en: 'Data anonymised or pseudonymised as far as possible before processing.' },
          { fr: 'Les données transmises ne servent pas à entraîner les modèles.', en: 'Data sent is not used to train the models.' },
          { fr: 'Aucune décision automatisée produisant des effets juridiques ou significatifs (article 22 du RGPD).', en: 'No automated decision with legal or significant effects (GDPR article 22).' },
          { fr: 'Fournisseurs : Anthropic et OpenAI, encadrés par les Clauses Contractuelles Types.', en: 'Providers: Anthropic and OpenAI, covered by Standard Contractual Clauses.' },
        ],
      },
    ],
    faq: [
      { q: { fr: 'L’IA envoie-t-elle des messages toute seule ?', en: 'Does the AI send messages on its own?' }, a: { fr: 'Dans la messagerie et les avis, l’IA propose et votre équipe valide. Le chatbot répond seul sur ce que vous lui avez appris, et transmet à l’équipe quand il ne sait pas.', en: 'In the inbox and reviews, AI suggests and your team approves. The chatbot answers on its own about what you taught it, and hands over to the team when it doesn’t know.' } },
      { q: { fr: 'Mes données servent-elles à entraîner les modèles ?', en: 'Is my data used to train models?' }, a: { fr: 'Non. C’est écrit dans l’accord de sous-traitance.', en: 'No. It is written in the data processing agreement.' } },
      { q: { fr: 'Puis-je désactiver l’IA ?', en: 'Can I turn AI off?' }, a: { fr: 'Oui, les fonctionnalités d’IA sont activées à la demande.', en: 'Yes, AI features are activated on demand.' } },
    ],
    cta: { fr: 'Voyez l’IA à l’œuvre sur vos propres cas.', en: 'See AI at work on your own cases.' },
  },
  synchronisation: {
    slug: 'synchronisation',
    seo: {
      title: { fr: 'Synchronisation PMS bidirectionnelle | TriggerFlow', en: 'Two-way PMS sync | TriggerFlow' },
      description: { fr: 'TriggerFlow se synchronise dans les deux sens avec votre PMS : réservations et profils remontent, statuts, paiements et préférences redescendent.', en: 'TriggerFlow syncs both ways with your PMS: bookings and profiles flow in, statuses, payments and preferences flow back.' },
    },
    eyebrow: { fr: 'Synchronisation', en: 'Sync' },
    title: { fr: 'Votre PMS et TriggerFlow, synchronisés dans les deux sens.', en: 'Your PMS and TriggerFlow, synced both ways.' },
    subtitle: { fr: 'Les réservations et les profils remontent en temps réel. Ce que vos clients disent, achètent ou paient redescend dans le PMS. Sans double saisie.', en: 'Bookings and profiles flow in in real time. What guests say, buy or pay flows back into the PMS. No double entry.' },
    blocks: [
      {
        kind: 'split',
        title: { fr: 'Ce qui circule', en: 'What flows where' },
        left: { title: { fr: 'Du PMS vers TriggerFlow', en: 'From the PMS to TriggerFlow' }, items: [{ fr: 'Réservations et modifications', en: 'Bookings and changes' }, { fr: 'Profils clients et coordonnées', en: 'Guest profiles and contact details' }, { fr: 'Dates, chambre, nombre de personnes, canal de réservation', en: 'Dates, room, number of guests, booking channel' }, { fr: 'Arrivées et départs', en: 'Arrivals and departures' }] },
        right: { title: { fr: 'De TriggerFlow vers le PMS', en: 'From TriggerFlow to the PMS' }, items: [{ fr: 'Fiche client modifiée depuis TriggerFlow', en: 'Guest profile edited in TriggerFlow' }, { fr: 'Extras vendus avant l’arrivée', en: 'Extras sold before arrival' }, { fr: 'Paiements et statuts', en: 'Payments and statuses' }, { fr: 'Statuts de ménage des chambres', en: 'Housekeeping room statuses' }] },
      },
      {
        kind: 'principles',
        title: { fr: 'Des données propres', en: 'Clean data' },
        items: [
          { fr: 'Les doublons venus du PMS, des OTA et des formulaires sont détectés et fusionnés.', en: 'Duplicates from the PMS, OTAs and forms are detected and merged.' },
          { fr: 'Une seule fiche par client, avec tout son historique.', en: 'One profile per guest, with their full history.' },
          { fr: 'Aucun message envoyé deux fois à la même personne.', en: 'No message sent twice to the same person.' },
        ],
      },
    ],
    faq: [
      { q: { fr: 'Quels PMS sont connectés ?', en: 'Which PMS are connected?' }, a: { fr: 'La liste à jour est sur la page Intégrations. Chaque connexion est native, sans développement de votre côté.', en: 'The up-to-date list is on the Integrations page. Every connection is native, with no development on your side.' } },
      { q: { fr: 'La synchronisation est-elle en temps réel ?', en: 'Is the sync real-time?' }, a: { fr: 'Les réservations remontent en temps réel ou à intervalle court selon le PMS ; les informations utiles redescendent dès qu’elles changent.', en: 'Bookings come in in real time or at short intervals depending on the PMS; useful information flows back as soon as it changes.' } },
      { q: { fr: 'Que se passe-t-il si un client existe en double ?', en: 'What if a guest exists twice?' }, a: { fr: 'TriggerFlow détecte les doublons et propose de fusionner les fiches, pour garder un historique unique.', en: 'TriggerFlow detects duplicates and suggests merging the profiles, to keep a single history.' } },
    ],
    cta: { fr: 'Connectez votre PMS cette semaine.', en: 'Connect your PMS this week.' },
  },
};
