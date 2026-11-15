import { brand } from '@/data/brand';
import { stat } from '@/data/company-stats';

/**
 * Affiche un chiffre officiel TriggerFlow depuis la source unique company-stats.ts.
 * Usage MDX : <Stat id="hotels" /> · <Stat id="rating" /> · <Stat id="messages" /> …
 * <Stat id="pmsCompatibles" /> lit le nombre de PMS affiché dans brand.ts (fait de marque, pas une mesure).
 * La locale est injectée par la map de composants MDX (rendu blog).
 */
export function Stat({ id, locale }: { id: string; locale: string }) {
  if (id === 'pmsCompatibles') return <>{locale === 'fr' ? brand.pmsCompatibles.fr : brand.pmsCompatibles.en}</>;
  return <>{stat(id, locale)}</>;
}
