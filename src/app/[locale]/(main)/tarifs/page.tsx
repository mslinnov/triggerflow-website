import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { PricingV2Content } from './PricingV2Content';
import { BreadcrumbListJsonLd, PricingJsonLd } from '@/components/seo';

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
        fr: `${baseUrl}/fr/tarifs`,
        en: `${baseUrl}/en/tarifs`,
        'x-default': `${baseUrl}/fr/tarifs`,
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
      <PricingJsonLd locale={locale} />
      <PricingV2Content />
    </>
  );
}
