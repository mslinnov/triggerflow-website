/**
 * Vrais clients TriggerFlow et Utelys affichés sur le site (docs/preuves.md, sélection validée
 * par Soufiane le 07/11/2026). Jamais de logo de chaîne ou d'enseigne ; jamais de nombre de clients.
 */
export const homeClients = [
  'Groupe Noemys',
  'AMMI Hôtels',
  'Edgar Hôtel & Spa',
  'Hôtel Causse Comtal',
  'Urban Bivouac',
  'Hôtel Arc en Ciel',
  'Le Vieux Pressoir',
  'Sezz Saint-Tropez',
  'Château de Courban',
  'Odomo',
  'BonjourSauvage',
  'Cime Hotel',
  'Pépites Lodges & Spas',
  'Soko Hotels',
  'Le Phébus & Spa',
  'Château Autignac',
] as const;

export interface ClientQuote {
  quote: { fr: string; en: string };
  name: string;
  role: { fr: string; en: string };
  company: string;
}

/** Citations exactes des témoignages publiés (carrousels Canva du Trello « Planning éditorial Utelys »). */
export const homeTestimonials: ClientQuote[] = [
  {
    quote: {
      fr: "À l'inverse des autres solutions CRM, il n'est plus nécessaire de raisonner à partir de ce que l'outil peut faire et de s'adapter à lui. Avec TriggerFlow, on part du besoin.",
      en: 'Unlike other CRM tools, you no longer have to start from what the software can do and adapt to it. With TriggerFlow, you start from the need.',
    },
    name: 'Baptiste Legout',
    role: { fr: 'Propriétaire', en: 'Owner' },
    company: 'Hôtel Causse Comtal',
  },
  {
    quote: {
      fr: "Je travaillais déjà avec un autre CRM bien implanté sur le marché parisien, mais celui-ci ne me permettait plus d'aller plus loin.",
      en: 'I was already using another CRM well established in Paris, but it no longer let me go further.',
    },
    name: 'Idir Mazari',
    role: { fr: 'Directeur', en: 'Manager' },
    company: 'Urban Bivouac Paris',
  },
  {
    quote: {
      fr: "Maintenant, ça tourne tout seul. Je gagne énormément de temps, tout en sachant que la relation à mes clients est assurée.",
      en: 'Now it runs on its own. I save a huge amount of time, and I know the relationship with my guests is taken care of.',
    },
    name: 'Guillaume Broutin',
    role: { fr: 'Propriétaire', en: 'Owner' },
    company: 'Le Vieux Pressoir',
  },
];
