import type { ProductLanding } from './types';
import { upsell } from './upsell';
import { flows } from './flows';
import { pay } from './pay';
import { voice } from './voice';

/** Landings produit en ligne (gabarit en 13 blocs). Ajouter ici chaque nouvelle landing. */
export const productLandings: Record<string, ProductLanding> = { upsell, flows, pay, voice };
export type { ProductLanding, L } from './types';
