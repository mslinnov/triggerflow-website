import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { ProductContent } from './ProductContent';
import { BreadcrumbListJsonLd } from '@/components/seo';

const baseUrl = 'https://www.trigger-flow.com';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'product' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `${baseUrl}/${locale}/produit`,
      languages: {
        fr: `${baseUrl}/fr/produit`,
        en: `${baseUrl}/en/produit`,
        'x-default': `${baseUrl}/fr/produit`,
      },
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BreadcrumbListJsonLd
        items={[
          { name: 'TriggerFlow', url: `${baseUrl}/${locale}` },
          { name: locale === 'fr' ? 'Produit' : 'Product', url: `${baseUrl}/${locale}/produit` },
        ]}
      />
      <ProductContent />
    </>
  );
}
