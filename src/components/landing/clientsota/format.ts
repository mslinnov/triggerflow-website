/**
 * Mise en forme des mesures de l'étude, qui peuvent encore manquer.
 *
 * Une mesure absente s'affiche « … » et jamais « 0 % » : un zéro passerait
 * pour un résultat, l'ellipse se voit comme un trou. Voir
 * `CLIENTS_OTA_STUDY_COMPLETE` dans `@/data/clients-ota`.
 */
export const PENDING = '…';

/** Pourcentage à une décimale au plus, depuis une fraction (0.27 → « 27 »). */
export function formatPercentValue(fraction: number | null, locale: string): string {
  if (fraction === null) return PENDING;
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(fraction * 100);
}

/** Rapport « ×N » à une décimale au plus. */
export function formatRatio(ratio: number | null, locale: string): string {
  if (ratio === null) return PENDING;
  return `×${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(ratio)}`;
}
