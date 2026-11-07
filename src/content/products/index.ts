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

/** Landings produit en ligne (gabarit en 13 blocs). Ajouter ici chaque nouvelle landing. */
export const productLandings: Record<string, ProductLanding> = { upsell, flows, pay, voice, inbox, reviews, forms, loyalty, crm };
export type { ProductLanding, L } from './types';
