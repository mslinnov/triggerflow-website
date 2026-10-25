import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { UpsellLandingPage } from '@/components/landing/upsell';
import { routing } from '@/i18n/routing';
import { pageAlternates } from '@/lib/seo';

/** Variante A du test : l'offre de conversion est la demande de démo. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: pageAlternates(locale, '/lp/upsell-hotel') };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <UpsellLandingPage goal="demo" locale={locale} />;
}
