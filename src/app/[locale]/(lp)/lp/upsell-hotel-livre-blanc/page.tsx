import { setRequestLocale } from 'next-intl/server';
import { UpsellLandingPage } from '@/components/landing/upsell';
import { routing } from '@/i18n/routing';

/** Variante B du test : l'offre de conversion est le téléchargement du livre blanc. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <UpsellLandingPage goal="whitepaper" locale={locale} />;
}
