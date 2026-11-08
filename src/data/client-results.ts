/**
 * Photos et chiffres clés des cartes « résultats clients » de l'accueil.
 * Photos : sites officiels des hôtels, récupérées le 08/11/2026 (accord de Soufiane).
 *
 * ⚠️ `example: true` = VALEUR D'EXEMPLE demandée par Soufiane le 08/11/2026, en attendant les vrais
 * chiffres des clients. À remplacer AVANT la mise en production (voir le test todo de claims.test.ts).
 */
export interface ClientResult {
  /** Doit correspondre à `home2.results.items[].client`. */
  client: string;
  photo: string;
  metric: { value: { fr: string; en: string }; label: { fr: string; en: string }; example: boolean } | null;
}

export const clientResults: ClientResult[] = [
  {
    client: 'Hôtel Causse Comtal',
    photo: '/images/hotels/causse-comtal.webp',
    // Tiré de la citation de Baptiste Legout : « en une semaine ».
    metric: { value: { fr: '1 semaine', en: '1 week' }, label: { fr: 'pour lancer ses emails automatisés', en: 'to launch automated emails' }, example: false },
  },
  {
    client: 'AMMI Hôtels',
    photo: '/images/hotels/ammi-hotels.webp',
    // Fait connu : un CRM et un outil WhatsApp remplacés.
    metric: { value: { fr: '2 outils', en: '2 tools' }, label: { fr: 'remplacés par TriggerFlow', en: 'replaced by TriggerFlow' }, example: false },
  },
  {
    client: 'Hôtel Arc en Ciel',
    photo: '/images/hotels/arc-en-ciel.webp',
    // Aucun chiffre mesuré (livres blancs vérifiés le 08/11/2026) : pas de chiffre affiché.
    metric: null,
  },
];

/** Hôtels prestigieux de la mosaïque « Ils ont choisi TriggerFlow » (photos des sites officiels). */
export const prestigeHotels = [
  { name: 'Saint James Paris', place: 'Paris', photo: '/images/hotels/saint-james-paris.webp' },
  { name: 'Sofitel Marrakech', place: 'Marrakech', photo: '/images/hotels/sofitel-marrakech.webp' },
  { name: 'Sezz Saint-Tropez', place: 'Saint-Tropez', photo: '/images/hotels/sezz-saint-tropez.webp' },
  { name: 'Château de Courban', place: 'Bourgogne', photo: '/images/hotels/chateau-de-courban.webp' },
  { name: 'Edgar Hôtel & Spa', place: 'Saint-Brieuc', photo: '/images/hotels/edgar-hotel-spa.webp' },
] as const;
