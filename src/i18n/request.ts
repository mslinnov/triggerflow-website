import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { withBrandValues } from './brand-values';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Validate that the incoming locale is valid
  if (!locale || !routing.locales.includes(locale as typeof routing.locales[number])) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: withBrandValues(locale, (await import(`../../messages/${locale}.json`)).default)
  };
});
