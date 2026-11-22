/**
 * Campagnes e-mail des fêtes (/fr/campagnes-email-fetes) : les 7 modèles dans l'ordre d'envoi.
 *
 * Les fichiers de chaque campagne (`.html`, `.mjml`, `.json`) vivent dans src/data/calendrier-mjml/fetes/<code>.*,
 * exportés par l'app comme ceux du calendrier marketing.
 * Tant qu'un export manque, la page affiche un aperçu de repli et masque « Copier le modèle ».
 * Aucun chiffre promis ici : seulement des dates de calendrier.
 */

import { brand } from '@/data/brand';

export const FETES_CODES = [
  'christmas_gift_voucher',
  'december_cocooning',
  'new_year_eve',
  'new_year_eve_stay',
  'holidays_last_minute',
  'season_greetings',
  'new_year_wishes_offer',
] as const;
export type FeteCode = (typeof FETES_CODES)[number];

/**
 * Style des 7 campagnes : « fetes », style de la bibliothèque des modèles sur mesure de l'app. C'est aussi le nom
 * du dossier d'export (src/data/calendrier-mjml/fetes/), hors des cinq thèmes du calendrier (MJML_THEMES).
 */
export const FETES_STYLE = 'fetes';
export type FeteStyle = typeof FETES_STYLE;

export interface CampagneFete {
  code: FeteCode;
  nom: string;
  periode: string;
  /** Libellé court de l'étiquette posée sur l'aperçu du héros. */
  periodeCourte: string;
  objet: string;
  pourquoi: string;
  style: FeteStyle;
}

export const CAMPAGNES_FETES: readonly CampagneFete[] = [
  {
    code: 'christmas_gift_voucher',
    nom: 'Bons cadeaux de Noël',
    periode: 'Fin novembre, début décembre',
    periodeCourte: 'Fin novembre',
    objet: 'Offrez une nuit chez nous pour Noël',
    pourquoi:
      "Le cadeau des retardataires : une nuit, un dîner ou un soin, envoyé par e-mail. À lancer avant que vos clients n'aient fini leurs achats.",
    style: FETES_STYLE,
  },
  {
    code: 'december_cocooning',
    nom: 'Séjour cocooning de décembre',
    periode: 'Début décembre',
    periodeCourte: 'Début décembre',
    objet: 'Décembre, la saison du cocooning',
    pourquoi: 'Pour remplir les week-ends calmes de décembre avant les fêtes : une escapade au chaud, à deux ou entre amis.',
    style: FETES_STYLE,
  },
  {
    code: 'new_year_eve',
    nom: 'Tables de Noël et du réveillon',
    periode: 'Début décembre',
    periodeCourte: 'Début décembre',
    objet: 'Noël et Nouvel An : votre table vous attend',
    pourquoi:
      'Le programme du restaurant, du 24 au 1er janvier, avec la chambre pour rester dormir. Les tables du 24 et du 31 partent les premières.',
    style: FETES_STYLE,
  },
  {
    code: 'new_year_eve_stay',
    nom: 'Le 31 chez nous',
    periode: 'Mi-décembre',
    periodeCourte: 'Mi-décembre',
    objet: 'Le 31, dînez et dormez chez nous',
    pourquoi: "Le forfait de la Saint-Sylvestre : le dîner, la nuit et le brunch du 1er. Pour ceux qui n'ont pas encore de plan.",
    style: FETES_STYLE,
  },
  {
    code: 'holidays_last_minute',
    nom: 'Dernières chambres des fêtes',
    periode: 'Du 18 au 26 décembre',
    periodeCourte: 'Du 18 au 26',
    objet: 'Il reste des chambres entre Noël et le Nouvel An',
    pourquoi:
      'La semaine entre les deux fêtes se remplit tard. Un e-mail court avec les dates encore libres et le lien de réservation directe.',
    style: FETES_STYLE,
  },
  {
    code: 'season_greetings',
    nom: 'Carte de vœux',
    periode: 'Vers le 20 décembre',
    periodeCourte: 'Vers le 20',
    objet: 'Merci pour cette année',
    pourquoi: "Un merci sans offre, signé par la direction. L'e-mail que vos clients lisent jusqu'au bout, et qui prépare les suivants.",
    style: FETES_STYLE,
  },
  {
    code: 'new_year_wishes_offer',
    nom: 'Vœux et offre de janvier',
    periode: 'Première semaine de janvier',
    periodeCourte: 'Début janvier',
    objet: 'Bonne année, et une attention pour janvier',
    pourquoi: 'Janvier est calme : des vœux, puis une attention pour vos clients fidèles qui reviennent avant la fin du mois.',
    style: FETES_STYLE,
  },
];

export function isFeteCode(value: unknown): value is FeteCode {
  return typeof value === 'string' && (FETES_CODES as readonly string[]).includes(value);
}

const UTM = 'utm_source=site&utm_medium=campagnes-fetes&utm_campaign=campagnes-fetes';

/** Écran « Créer à partir du modèle » de l'app : copie le modèle à la charte de l'hôtel sélectionné. */
export function feteActivateUrl(campagne: CampagneFete): string {
  return `https://app.trigger-flow.com/email-templates/library/activate?type=${campagne.code}&style=${campagne.style}&${UTM}&utm_content=${campagne.code}`;
}

/** Démo depuis la page : les UTM de la visite (flyer) les remplacent au clic (DemoClickTracker). */
export function feteDemoUrl(content: string): string {
  return `${brand.demoUrl}?${UTM}&utm_content=${content}`;
}

/** Adresse de l'aperçu (route du calendrier, étendue aux codes des fêtes) ; 404 tant que l'export manque. */
export function fetePreviewUrl(campagne: CampagneFete): string {
  return `/api/calendrier/modele/${campagne.code}/apercu?theme=${FETES_STYLE}`;
}

export function feteFileUrl(campagne: CampagneFete, format: 'html' | 'mjml', download = false): string {
  return `/api/calendrier/modele/${campagne.code}/${format}?theme=${FETES_STYLE}${download ? '&telecharger=1' : ''}`;
}
