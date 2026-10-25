import type { Metadata } from 'next';
import { brand } from '@/data/brand';
import type { Locale } from '@/i18n/routing';

/**
 * Canonical et hreflang propres à une page, en https. Chaque page déclare les siens :
 * `alternateLinks: false` (src/i18n/routing.ts) coupe l'en-tête `Link` de next-intl, et une
 * page sans `alternates` hériterait de ceux du layout, qui pointent vers l'accueil.
 * `path` : chemin sans la locale, avec la barre initiale (« /tarifs ») ; '' pour l'accueil.
 * `translated` : langues où le contenu existe vraiment. Une page servie en /en mais rédigée en
 * français seulement ne déclare pas de hreflang en, et son canonical pointe vers la version fr.
 */
export function pageAlternates(
  locale: string,
  path: string,
  translated: readonly Locale[] = ['fr', 'en'],
): Metadata['alternates'] {
  const url = (l: string) => `${brand.url}/${l}${path}`;
  const canonicalLocale = (translated as readonly string[]).includes(locale) ? locale : translated[0];
  return {
    canonical: url(canonicalLocale),
    languages: {
      ...Object.fromEntries(translated.map((l) => [l, url(l)])),
      'x-default': url(translated.includes('fr') ? 'fr' : translated[0]),
    },
  };
}
