import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { PricingContent } from './PricingContent';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function PricingPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PricingContent />;
}
