import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/mentions-legales': {
      fr: '/mentions-legales',
      en: '/legal-notice'
    },
    '/cgv': {
      fr: '/cgv',
      en: '/terms-of-sale'
    },
    '/cgu': {
      fr: '/cgu',
      en: '/terms-of-use'
    },
    '/politique-confidentialite': {
      fr: '/politique-confidentialite',
      en: '/privacy-policy'
    }
  }
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;
