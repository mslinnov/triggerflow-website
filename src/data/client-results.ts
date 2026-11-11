/**
 * Photos et chiffres clés des cartes « résultats clients » de l'accueil.
 * Photos : sites officiels des hôtels, récupérées le 08/11/2026 (accord de Soufiane).
 *
 * ⚠️ `example: true` = valeur d'exemple, interdite en production (voir claims.test.ts). Sans vrai chiffre
 * du client, mettre `metric: null`.
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
    // Chiffre d'exemple retiré le 11/11/2026 (décision de Soufiane) : pas de stat sans vrai chiffre du client.
    metric: null,
  },
  {
    client: 'AMMI Hôtels',
    photo: '/images/hotels/ammi-hotels.webp',
    // Pas de grand chiffre : les trois cartes restent homogènes (« 6 établissements » est déjà dans l'étiquette).
    metric: null,
  },
  {
    client: 'Hôtel Arc en Ciel',
    photo: '/images/hotels/arc-en-ciel.webp',
    // Chiffre d'exemple retiré le 11/11/2026 (décision de Soufiane) : pas de stat sans vrai chiffre du client.
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
