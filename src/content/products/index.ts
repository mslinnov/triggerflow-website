import type { ProductLanding } from './types';
import { upsell } from './upsell';
import { flows } from './flows';
import { pay } from './pay';
import { voice } from './voice';
import { inbox } from './inbox';
import { reviews } from './reviews';
import { forms } from './forms';
import { loyalty } from './loyalty';
import { crm } from './crm';
import { campaigns, guestApp, events, b2b, checkin, housekeeping, keys, analytics } from './batch3';

/** Landings produit en ligne (gabarit en 13 blocs). Ajouter ici chaque nouvelle landing. */
export const productLandings: Record<string, ProductLanding> = {
  upsell, flows, pay, voice, inbox, reviews, forms, loyalty, crm, campaigns,
  'guest-app': guestApp, events, b2b, 'check-in': checkin, housekeeping, keys, analytics,
};
export type { ProductLanding, L } from './types';

/** Anciennes pages /produit/* redirigées en 301 (next.config.ts) : hors sitemap et hors build. */
export const redirectedProductSlugs = new Set([
  ...Object.keys(productLandings),
  ...Object.values(productLandings).flatMap((p) => (p.legacySlug ? [p.legacySlug] : [])),
  'sms',
  'whatsapp',
  'email',
  'newsletter',
]);
