import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { PricingV2Content } from './PricingV2Content';
import { BreadcrumbListJsonLd, PricingJsonLd } from '@/components/seo';
import { getPricingPhase, getDisplayPlans, getDisplayAddons, getEntryPrice } from '@/data/pricing';

const baseUrl = 'https://www.trigger-flow.com';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });
  const phase = getPricingPhase();

  return {
    title: t('meta.title'),
    description: t('meta.description', { entryPrice: getEntryPrice(phase) }),
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
  const phase = getPricingPhase();

  return (
    <>
      <BreadcrumbListJsonLd
        items={[
          { name: 'TriggerFlow', url: `${baseUrl}/${locale}` },
          { name: locale === 'fr' ? 'Tarifs' : 'Pricing', url: `${baseUrl}/${locale}/tarifs` },
        ]}
      />
      <PricingJsonLd locale={locale} phase={phase} />
      <PricingV2Content
        plans={getDisplayPlans(phase)}
        addons={getDisplayAddons(phase)}
        announcing={phase === 'announce'}
      />
    </>
  );
}
