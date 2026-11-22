import { loadMjmlTemplate } from '@/lib/calendrier-mjml';
import { FETES_STYLE, type CampagneFete } from '@/data/campagnes-fetes';
import type { MjmlTheme, TempsFortCode } from '@/data/calendrier-marketing';

/** Vrai si les trois fichiers exportés (mjml, html, json) du style mis en avant sont dans le dépôt. */
export function hasFeteTemplate(campagne: CampagneFete): boolean {
  return loadMjmlTemplate(campagne.code as TempsFortCode, FETES_STYLE as MjmlTheme) !== null;
}
