import type { Silo } from '@/types/blog';

export const silos: Silo[] = [
  {
    id: 'S1',
    nom: 'Automatisation hôtelière',
    nomEn: 'Hotel Automation',
    slug: 'automatisation',
    description: 'Workflows, scénarios, triggers et automation pour hôtels',
    descriptionEn: 'Workflows, scenarios, triggers and automation for hotels',
  },
  {
    id: 'S2',
    nom: 'Expérience client',
    nomEn: 'Guest Experience',
    slug: 'experience-client',
    description: 'Parcours client, satisfaction, avis et personnalisation',
    descriptionEn: 'Guest journey, satisfaction, reviews and personalization',
  },
  {
    id: 'S3',
    nom: 'Revenue & Upselling',
    nomEn: 'Revenue & Upselling',
    slug: 'revenue-upselling',
    description: 'Revenus directs, upselling, fidélisation et réservations directes',
    descriptionEn: 'Direct revenue, upselling, loyalty and direct bookings',
  },
  {
    id: 'S4',
    nom: 'Tech & Intégrations',
    nomEn: 'Tech & Integrations',
    slug: 'tech-integrations',
    description: 'PMS, intégrations, API et solutions techniques',
    descriptionEn: 'PMS, integrations, APIs and technical solutions',
  },
  {
    id: 'S5',
    nom: 'Guides pratiques',
    nomEn: 'How-to Guides',
    slug: 'guides',
    description: 'Tutoriels, comparatifs et guides métier hôtelier',
    descriptionEn: 'Tutorials, comparisons and hospitality how-to guides',
  },
];

export function siloName(silo: Silo, locale: string): string {
  return locale === 'en' ? silo.nomEn : silo.nom;
}

export function siloDescription(silo: Silo, locale: string): string {
  return locale === 'en' ? silo.descriptionEn : silo.description;
}

export function getSiloBySlug(slug: string): Silo | undefined {
  return silos.find((s) => s.slug === slug);
}

export function getSiloById(id: string): Silo | undefined {
  return silos.find((s) => s.id === id);
}
