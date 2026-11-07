import type { L } from './products';

/**
 * Pages « TriggerFlow pour <PMS> » (docs/arborescence.md). Uniquement les PMS dont le connecteur existe
 * (brand.pms). Mews garde sa page historique (/integrations/pms/mews).
 * twoWay : seulement quand un client l'atteste (Arc en Ciel pour Thaïs, Urban Bivouac pour Medialog).
 */
export interface PmsPage {
  slug: string;
  /** Clé de l'intégration dans IntegrationsContent. */
  key: string;
  name: string;
  logo: string;
  twoWay?: boolean;
  clients: string[];
  quote?: { text: L; name: string; role: L; company: string };
}

export const pmsPages: Record<string, PmsPage> = {
  thais: {
    slug: 'thais', key: 'thais', name: 'Thaïs', logo: '/images/integrations/thais.svg', twoWay: true,
    clients: ['Hôtel Causse Comtal', 'Le Vieux Pressoir', 'Hôtel Arc en Ciel', 'AMMI Hôtels', 'Edgar Hôtel & Spa'],
    quote: {
      text: { fr: 'L’idée de rajouter TriggerFlow à notre écosystème vient à l’origine d’une discussion avec les équipes de Thaïs, notre PMS. Ce qu’il m’a montré a fait plus qu’éveiller ma curiosité.', en: 'The idea of adding TriggerFlow to our setup came from a conversation with the Thaïs team, our PMS. What I was shown did more than spark my curiosity.' },
      name: 'Baptiste Legout', role: { fr: 'Propriétaire', en: 'Owner' }, company: 'Hôtel Causse Comtal',
    },
  },
  misterbooking: {
    slug: 'misterbooking', key: 'misterbooking', name: 'Misterbooking', logo: '/images/integrations/misterbooking.png',
    clients: ['Groupe Noemys'],
    quote: { text: { fr: 'Ils ne se contentent pas de fournir une solution, ils l’adaptent à notre réalité.', en: 'They don’t just provide a solution, they adapt it to our reality.' }, name: 'Marie-Liesse Gaubens', role: { fr: 'Responsable communication', en: 'Communications manager' }, company: 'Groupe Noemys' },
  },
  medialog: {
    slug: 'medialog', key: 'medialog', name: 'Medialog', logo: '/images/integrations/medialog.svg', twoWay: true,
    clients: ['Urban Bivouac'],
    quote: { text: { fr: 'L’objectif, en choisissant TriggerFlow, était de personnaliser au maximum les flows du CRM en fonction des objectifs visés, en ayant complètement la main.', en: 'Choosing TriggerFlow was about personalising our CRM flows as far as our goals required, with full control.' }, name: 'Idir Mazari', role: { fr: 'Directeur', en: 'Manager' }, company: 'Urban Bivouac Paris' },
  },
  'opera-cloud': { slug: 'opera-cloud', key: 'opera', name: 'Opera Cloud', logo: '/images/integrations/opera.png', clients: [] },
  asterio: { slug: 'asterio', key: 'asterio', name: 'Asterio', logo: '/images/integrations/asterio.png', clients: [] },
  lean: { slug: 'lean', key: 'leanpms', name: 'Lean PMS', logo: '/images/integrations/leanpms.webp', clients: [] },
  vega: { slug: 'vega', key: 'vega', name: 'Vega', logo: '/images/integrations/vega.png', clients: [] },
  apaleo: { slug: 'apaleo', key: 'apaleo', name: 'Apaleo', logo: '/images/integrations/apaleo.png', clients: [] },
  zeswitch: { slug: 'zeswitch', key: 'zeswitch', name: 'Zeswitch', logo: '/images/integrations/zeswitch.png', clients: [] },
  beds24: { slug: 'beds24', key: 'beds24', name: 'Beds24', logo: '/images/integrations/beds24.svg', clients: [] },
  reservit: { slug: 'reservit', key: 'reservit', name: 'Reservit', logo: '/images/integrations/reservit.webp', clients: [] },
};
