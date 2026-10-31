import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ClientsOtaLandingPage } from '@/components/landing/clientsota';
import { routing } from '@/i18n/routing';
import { pageAlternates } from '@/lib/seo';

/**
 * Landing du guide du client OTA. L'offre de conversion est le téléchargement
 * du livre blanc ; la démo reste en second, dans l'en-tête et le pont démo.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: pageAlternates(locale, '/lp/clients-ota-hotel-livre-blanc') };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ClientsOtaLandingPage locale={locale} />;
}
