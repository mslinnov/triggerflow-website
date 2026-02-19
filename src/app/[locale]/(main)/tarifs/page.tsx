import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { PricingContent } from './PricingContent';
import { BreadcrumbListJsonLd } from '@/components/seo';

const baseUrl = 'https://www.trigger-flow.com';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `${baseUrl}/${locale}/tarifs`,
      languages: {
        'fr-FR': `${baseUrl}/fr/tarifs`,
        'en-US': `${baseUrl}/en/tarifs`,
      },
    },
  };
}

export default async function PricingPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BreadcrumbListJsonLd
        items={[
          { name: 'TriggerFlow', url: `${baseUrl}/${locale}` },
          { name: locale === 'fr' ? 'Tarifs' : 'Pricing', url: `${baseUrl}/${locale}/tarifs` },
        ]}
      />
      <PricingContent />
    </>
  );
}
