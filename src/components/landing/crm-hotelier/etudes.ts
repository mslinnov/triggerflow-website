/** Ce que la page anglaise montre d'un cas client : lib/case-studies.ts n'existe qu'en français. */
export interface EtudeEn {
  /** Traduction fidèle de `quote` (même sens, même longueur), comme les citations anglaises de data/clients.ts. */
  quote: string;
  contactRole: string;
  location: string;
}

/** Les cas clients montrés par la page (vrais clients, photos recadrées pour la page). */
export const ETUDES: ReadonlyArray<{ slug: string; image: string; en: EtudeEn }> = [
  {
    slug: 'edgar-hotel-spa',
    image: '/images/lp/crm-hotelier/cas-edgar.webp',
    en: {
      quote: 'After trying several CRM tools, TriggerFlow is the one we found that really fits what we need.',
      contactRole: 'General Manager',
      location: 'Saint-Brieuc, Brittany',
    },
  },
  {
    slug: 'causse-comtal',
    image: '/images/lp/crm-hotelier/cas-causse-comtal.webp',
    en: {
      quote: "I'm genuinely blown away by the tool. The possibilities are practically endless.",
      contactRole: 'Hotel Manager',
      location: 'Montrozier, near Rodez',
    },
  },
  {
    slug: 'groupe-noemys',
    image: '/images/lp/crm-hotelier/cas-noemys.webp',
    en: {
      quote: "They don't just supply a solution, they adapt it to the way we actually work.",
      contactRole: 'Head of Communications',
      location: 'France (multiple sites)',
    },
  },
];
