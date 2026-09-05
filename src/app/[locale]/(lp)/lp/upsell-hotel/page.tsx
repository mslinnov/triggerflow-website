import { setRequestLocale } from 'next-intl/server';
import { UpsellLandingPage } from '@/components/landing/upsell';
import { routing } from '@/i18n/routing';

/** Variante A du test : l'offre de conversion est la demande de démo. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <UpsellLandingPage goal="demo" locale={locale} />;
}
