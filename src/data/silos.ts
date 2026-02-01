import type { Silo } from '@/types/blog';

export const silos: Silo[] = [
  {
    id: 'S1',
    nom: 'Automatisation hôtelière',
    slug: 'automatisation',
    description: 'Workflows, scénarios, triggers et automation pour hôtels',
  },
  {
    id: 'S2',
    nom: 'Expérience client',
    slug: 'experience-client',
    description: 'Parcours client, satisfaction, avis et personnalisation',
  },
  {
    id: 'S3',
    nom: 'Revenue & Upselling',
    slug: 'revenue-upselling',
    description: 'Revenus directs, upselling, fidélisation et réservations directes',
  },
  {
    id: 'S4',
    nom: 'Tech & Intégrations',
    slug: 'tech-integrations',
    description: 'PMS, intégrations, API et solutions techniques',
  },
  {
    id: 'S5',
    nom: 'Guides pratiques',
    slug: 'guides',
    description: 'Tutoriels, comparatifs et guides métier hôtelier',
  },
];

export function getSiloBySlug(slug: string): Silo | undefined {
  return silos.find((s) => s.slug === slug);
}

export function getSiloById(id: string): Silo | undefined {
  return silos.find((s) => s.id === id);
}
