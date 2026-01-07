import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { ProductContent } from './ProductContent';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'product' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProductContent />;
}
