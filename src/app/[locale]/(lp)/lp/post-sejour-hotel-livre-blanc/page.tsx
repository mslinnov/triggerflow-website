import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { PostStayLandingPage } from '@/components/landing/poststay';
import { routing } from '@/i18n/routing';
import { pageAlternates } from '@/lib/seo';

/**
 * Landing du guide du post-séjour. L'offre de conversion est le téléchargement
 * du livre blanc, et elle est unique : contrairement à l'axe des ventes
 * additionnelles, cet axe n'a pas de variante démo à comparer.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: pageAlternates(locale, '/lp/post-sejour-hotel-livre-blanc') };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PostStayLandingPage locale={locale} />;
}
