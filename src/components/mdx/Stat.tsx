import { stat } from '@/data/company-stats';

/**
 * Affiche un chiffre officiel TriggerFlow depuis la source unique company-stats.ts.
 * Usage MDX : <Stat id="hotels" /> · <Stat id="rating" /> · <Stat id="googleReviews" /> …
 * La locale est injectée par la map de composants MDX (rendu blog).
 */
export function Stat({ id, locale }: { id: string; locale: string }) {
  return <>{stat(id, locale)}</>;
}
