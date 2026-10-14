/**
 * Conversions Google Ads. Envoyées par la même balise gtag.js que GA4 ; sans
 * identifiant Google Ads ou sans libellé, rien ne part (le build reste valable).
 *
 * Le consentement est géré par Consent Mode v2 (GoogleAnalytics.tsx) : sans
 * accord marketing, Google reçoit au mieux un signal sans cookie, qu'il modélise.
 */
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() || '';

const LABELS = {
  /** Rendez-vous de démo réellement réservé (page de remerciement lemcal). */
  demo_booked: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_DEMO_BOOKED?.trim() || '',
  /** Formulaire de contact ou de page d'atterrissage envoyé. */
  lead: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_LEAD?.trim() || '',
} as const;

export type AdsConversion = keyof typeof LABELS;

export function trackAdsConversion(kind: AdsConversion, options: { transactionId?: string } = {}): void {
  if (typeof window === 'undefined' || !GOOGLE_ADS_ID || !LABELS[kind]) return;
  window.gtag?.('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${LABELS[kind]}`,
    ...(options.transactionId ? { transaction_id: options.transactionId } : {}),
  });
}
