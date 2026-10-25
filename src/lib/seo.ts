import type { Metadata } from 'next';
import { brand } from '@/data/brand';

/**
 * Canonical et hreflang propres à une page, en https. Chaque page déclare les siens :
 * `alternateLinks: false` (src/i18n/routing.ts) coupe l'en-tête `Link` de next-intl, et une
 * page sans `alternates` hériterait de ceux du layout, qui pointent vers l'accueil.
 * `path` : chemin sans la locale, avec la barre initiale (« /tarifs ») ; '' pour l'accueil.
 */
export function pageAlternates(locale: string, path: string): Metadata['alternates'] {
  return {
    canonical: `${brand.url}/${locale}${path}`,
    languages: {
      fr: `${brand.url}/fr${path}`,
      en: `${brand.url}/en${path}`,
      'x-default': `${brand.url}/fr${path}`,
    },
  };
}
