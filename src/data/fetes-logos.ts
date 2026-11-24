/**
 * Hôtels fictifs des aperçus des campagnes des fêtes (/fr/campagnes-email-fetes) : un par modèle,
 * pour montrer un e-mail « habité » plutôt que la zone « Votre logo ». Aperçu seulement : le
 * fichier copié ou téléchargé garde la zone logo et `{{facility_name}}` (voir previewFor).
 *
 * Le logo est un SVG simple (monogramme cerclé + nom), dans la couleur et la famille de police du
 * modèle. Une image SVG n'a pas accès aux polices web de l'e-mail : polices système de même famille.
 */
import type { FeteCode } from './campagnes-fetes';

export interface FeteLogo {
  /** Nom complet, qui remplace `{{facility_name}}` dans l'aperçu (signature, alt du logo). */
  nom: string;
  /** Ligne courte au-dessus du nom, en capitales. */
  avant: string;
  /** Nom en grand. */
  nomCourt: string;
  monogramme: string;
  couleur: string;
  famille: 'serif' | 'sans';
}

export const FETES_LOGOS: Record<FeteCode, FeteLogo> = {
  christmas_gift_voucher: { nom: 'Hôtel des Remparts', avant: 'Hôtel des', nomCourt: 'Remparts', monogramme: 'R', couleur: '#A82A2F', famille: 'sans' },
  december_cocooning: { nom: 'Les Grands Mélèzes', avant: 'Les grands', nomCourt: 'Mélèzes', monogramme: 'M', couleur: '#2B2B2B', famille: 'serif' },
  new_year_eve: { nom: 'Maison Vauclair', avant: 'Maison', nomCourt: 'Vauclair', monogramme: 'V', couleur: '#1C2B4A', famille: 'serif' },
  new_year_eve_stay: { nom: 'Hôtel Saint-Jean', avant: 'Hôtel', nomCourt: 'Saint-Jean', monogramme: 'SJ', couleur: '#2B1119', famille: 'serif' },
  holidays_last_minute: { nom: 'Hôtel Arcadie', avant: 'Hôtel', nomCourt: 'Arcadie', monogramme: 'A', couleur: '#1E3A34', famille: 'sans' },
  season_greetings: { nom: 'Le Clos des Aubépines', avant: 'Le clos des', nomCourt: 'Aubépines', monogramme: 'CA', couleur: '#1F4A3C', famille: 'serif' },
  new_year_wishes_offer: { nom: 'Hôtel Beaurivage', avant: 'Hôtel', nomCourt: 'Beaurivage', monogramme: 'B', couleur: '#4A2C5C', famille: 'serif' },
};

const FONTS = {
  serif: "Georgia, 'Times New Roman', serif",
  sans: "'Helvetica Neue', Arial, sans-serif",
};

/** Logo en `data:` URI (300×80, affiché à 150 px de large comme la zone logo des modèles). */
export function feteLogoDataUri(logo: FeteLogo): string {
  const font = FONTS[logo.famille];
  const weight = logo.famille === 'sans' ? 700 : 400;
  const mono = logo.monogramme.length > 1 ? 22 : 30;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="80" viewBox="0 0 300 80">` +
    `<g fill="${logo.couleur}" font-family="${font}">` +
    `<circle cx="40" cy="40" r="33" fill="none" stroke="${logo.couleur}" stroke-width="2"/>` +
    `<text x="40" y="${40 + mono * 0.35}" text-anchor="middle" font-size="${mono}" font-weight="${weight}">${logo.monogramme}</text>` +
    `<text x="88" y="31" font-size="14" letter-spacing="2.5">${logo.avant.toUpperCase()}</text>` +
    `<text x="87" y="61" font-size="29" font-weight="${weight}">${logo.nomCourt}</text>` +
    `</g></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
