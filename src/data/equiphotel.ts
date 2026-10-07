// Landing page Equip'Hotel 2026 (/fr/equiphotel).
// Les textes sont dans messages/fr.json (namespace "equiphotel") ; ce fichier ne
// contient que les données structurelles : dates, liens, ordre des blocs.

// Toutes les dates sont en heure de Paris (CET, UTC+1 en novembre).
export const EQUIPHOTEL = {
  stand: 'H006',
  hall: '7.3',
  startsAt: '2026-11-02T09:30:00+01:00',
  endsAt: '2026-11-05T17:30:00+01:00',
  apero: {
    startsAt: '2026-11-02T16:30:00+01:00',
    endsAt: '2026-11-02T18:30:00+01:00',
    icsPath: '/equiphotel/apero-triggerflow-equiphotel-2026.ics',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Paris+Expo+Porte+de+Versailles+Pavillon+7',
  contact: {
    email: 'contact@trigger-flow.com',
    phone: '+33554544852',
    phoneDisplay: '+33 (0)5 54 54 48 52',
    linkedin: 'https://www.linkedin.com/company/triggerflow',
  },
} as const;

// RDV : créneau au stand pendant le salon, ou démo en visio après.
// TODO : remplacer `stand` par l'événement lemcal dédié aux créneaux du salon.
const UTM = 'utm_source=equiphotel&utm_medium=landing&utm_campaign=equiphotel-2026';
export const EQUIPHOTEL_BOOKING = {
  stand: `https://app.lemcal.com/@trigger-flow/demo?${UTM}&utm_content=rdv-stand`,
  visio: `https://app.lemcal.com/@trigger-flow/demo?${UTM}&utm_content=rdv-visio`,
} as const;

export type GuideId = 'revenus' | 'directs' | 'avis';

export interface EquiphotelGuide {
  id: GuideId;
  // Lien de téléchargement du guide.
  href: string;
}

// TODO : remplacer les '#guides' par les liens de téléchargement des PDF.
export const EQUIPHOTEL_GUIDES: EquiphotelGuide[] = [
  { id: 'revenus', href: '#guides' },
  { id: 'directs', href: '#guides' },
  { id: 'avis', href: '#guides' },
];

export const EQUIPHOTEL_FEATURES = [
  'communication',
  'parcours',
  'crm',
  'revenus',
  'experience',
  'paiements',
] as const;

export type EquiphotelFeature = (typeof EQUIPHOTEL_FEATURES)[number];

// Fenêtre d'affichage d'un bloc : visible si `from <= now < until`.
// Bornes ISO 8601 ; une borne absente est ignorée.
export function isWithinWindow(from?: string, until?: string, now: number = Date.now()): boolean {
  if (from && now < Date.parse(from)) return false;
  if (until && now >= Date.parse(until)) return false;
  return true;
}
