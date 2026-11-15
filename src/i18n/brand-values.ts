import { brand } from '@/data/brand';

/**
 * Faits de marque injectés dans les messages au chargement.
 *
 * Un message écrit `{pmsCompatibles}` et reçoit la valeur de brand.ts : le chiffre n'est recopié dans
 * aucun fichier de traduction, et aucun composant n'a à le passer à `t()`. Seules les clés connues
 * ci-dessous sont remplacées ; les autres arguments ICU (`{count}`, `{name}`…) restent intacts pour
 * next-intl.
 */
export function brandValues(locale: string): Record<string, string> {
  return {
    pmsCompatibles: locale === 'fr' ? brand.pmsCompatibles.fr : brand.pmsCompatibles.en,
  };
}

export function applyBrandValues<T>(value: T, values: Record<string, string>): T {
  if (typeof value === 'string') {
    return value.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match) as T;
  }
  if (Array.isArray(value)) return value.map((item) => applyBrandValues(item, values)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, applyBrandValues(item, values)]),
    ) as T;
  }
  return value;
}

/**
 * Messages d'une langue, une fois les faits de marque injectés. En production, calculés une seule fois
 * par processus ; en `next dev`, recalculés à chaque requête pour qu'une modification de messages/*.json
 * apparaisse sans redémarrer.
 */
const cache = new Map<string, Record<string, unknown>>();

export function withBrandValues(locale: string, messages: Record<string, unknown>): Record<string, unknown> {
  if (process.env.NODE_ENV !== 'production') return applyBrandValues(messages, brandValues(locale));
  const cached = cache.get(locale);
  if (cached) return cached;
  const resolved = applyBrandValues(messages, brandValues(locale));
  cache.set(locale, resolved);
  return resolved;
}
