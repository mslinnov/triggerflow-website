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

// RDV : créneau de 20 min au stand pendant le salon (type de réunion lemcal
// dédié « equiphotel-2026 »), ou démo en visio. Ces UTM décrivent une visite
// directe de la page ; quand le visiteur arrive d'une annonce, DemoClickTracker
// les remplace par ceux de l'annonce au moment du clic.
const UTM = 'utm_source=equiphotel&utm_medium=landing&utm_campaign=equiphotel-2026';
export const EQUIPHOTEL_BOOKING = {
  stand: `https://app.lemcal.com/@trigger-flow/equiphotel-2026?${UTM}&utm_content=rdv-stand`,
  visio: `https://app.lemcal.com/@trigger-flow/demo?${UTM}&utm_content=rdv-visio`,
} as const;

export type GuideId = 'revenus' | 'avis';

export interface EquiphotelGuide {
  id: GuideId;
  // Lien de téléchargement du guide.
  href: string;
}

// Les guides sont les livres blancs existants, sur leur page de capture. Le
// guide « clients OTA en clients directs » n'existe pas encore : il revient ici
// quand il sera écrit, pas avant (un bouton qui ne mène nulle part coûte plus
// qu'un guide de moins).
export const EQUIPHOTEL_GUIDES: EquiphotelGuide[] = [
  { id: 'revenus', href: '/fr/lp/upsell-hotel-livre-blanc?utm_source=equiphotel&utm_medium=landing&utm_campaign=equiphotel-2026' },
  { id: 'avis', href: '/fr/lp/post-sejour-hotel-livre-blanc?utm_source=equiphotel&utm_medium=landing&utm_campaign=equiphotel-2026' },
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
