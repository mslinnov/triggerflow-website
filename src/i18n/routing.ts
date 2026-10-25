import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'always',
  // Les hreflang sont déclarés par page dans les métadonnées (https). L'en-tête HTTP
  // `Link` que next-intl ajoute sinon sort en http:// derrière Apache : signal contradictoire.
  alternateLinks: false
});

export type Locale = (typeof routing.locales)[number];
