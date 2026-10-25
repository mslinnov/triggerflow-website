import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { BreadcrumbListJsonLd, FaqJsonLd } from '@/components/seo';
import type { FaqItem } from '@/types/blog';
import {
  IntegrationHero,
  TrustBar,
  BenefitsGrid,
  ScenariosSection,
  IntegrationHowItWorks,
  IntegrationTestimonial,
  DataSyncTable,
  IntegrationFaq,
  IntegrationCta,
  RelatedIntegrations,
} from '@/components/integrations';
import { getEntryPrice, getPricingPhase } from '@/data/pricing';
import { brand } from '@/data/brand';
import { pageAlternates } from '@/lib/seo';

const baseUrl = brand.url;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'mewsIntegration' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: pageAlternates(locale, '/integrations/pms/mews'),
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      url: `${baseUrl}/${locale}/integrations/pms/mews`,
      type: 'website',
    },
  };
}

function HowToJsonLd({ locale }: { locale: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name:
      locale === 'fr'
        ? 'Comment connecter TriggerFlow à Mews PMS'
        : 'How to connect TriggerFlow to Mews PMS',
    description:
      locale === 'fr'
        ? 'Connexion en 3 étapes, sans développeur'
        : 'Connect in 3 steps, no developer needed',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name:
          locale === 'fr'
            ? 'Activez TriggerFlow dans Mews Marketplace'
            : 'Activate TriggerFlow in Mews Marketplace',
        text:
          locale === 'fr'
            ? 'Depuis Mews Commander, Marketplace > TriggerFlow. Activez le connecteur, une clé API est générée automatiquement.'
            : 'From Mews Commander, go to Marketplace > TriggerFlow. Activate the connector, an API key is generated automatically.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name:
          locale === 'fr'
            ? 'Collez la clé dans TriggerFlow'
            : 'Paste the key in TriggerFlow',
        text:
          locale === 'fr'
            ? 'Réglages > Intégrations > Mews. La synchronisation bidirectionnelle démarre immédiatement.'
            : 'Settings > Integrations > Mews. Bidirectional sync starts immediately.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name:
          locale === 'fr'
            ? 'Activez vos workflows'
            : 'Activate your workflows',
        text:
          locale === 'fr'
            ? 'Scénarios pré-configurés ou création sur mesure avec le flow builder visuel.'
            : 'Pre-configured scenarios or custom creation with the visual flow builder.',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function MewsSoftwareApplicationJsonLd() {
  const phase = getPricingPhase();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TriggerFlow pour Mews',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'CRM',
    operatingSystem: 'Web',
    description:
      'CRM hôtelier connecté nativement à Mews PMS. Synchronisation bidirectionnelle temps réel, emails pré-séjour, upselling automatisé, programme de fidélité.',
    url: `${baseUrl}/fr/integrations/pms/mews`,
    author: {
      '@type': 'Organization',
      name: 'TriggerFlow',
      url: baseUrl,
      sameAs: ['https://www.linkedin.com/company/triggerflow/'],
    },
    dateModified: '2026-02-22',
    offers: {
      '@type': 'Offer',
      description: 'Intégration Mews incluse dans tous les plans',
      price: getEntryPrice(phase),
      priceCurrency: 'EUR',
      ...(phase === 'announce' ? { priceValidUntil: '2026-12-31' } : {}),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function MewsIntegrationPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  // Mêmes messages que la FAQ visible (IntegrationFaq) : le balisage reflète ce que la page affiche.
  const faq = await getTranslations({ locale, namespace: 'mewsIntegration.faq' });

  return (
    <>
      {/* JSON-LD Schemas */}
      <BreadcrumbListJsonLd
        items={[
          { name: 'TriggerFlow', url: `${baseUrl}/${locale}` },
          {
            name: locale === 'fr' ? 'Intégrations' : 'Integrations',
            url: `${baseUrl}/${locale}/integrations`,
          },
          { name: 'PMS', url: `${baseUrl}/${locale}/integrations` },
          { name: 'Mews', url: `${baseUrl}/${locale}/integrations/pms/mews` },
        ]}
      />
      <FaqJsonLd items={faq.raw('items') as FaqItem[]} />
      <HowToJsonLd locale={locale} />
      <MewsSoftwareApplicationJsonLd />

      {/* Page Sections — AIDA flow */}
      {/* 1. Attention: Hook + credibility */}
      <IntegrationHero />
      <TrustBar />
      {/* 2. Interest: Value props + detailed use cases */}
      <BenefitsGrid />
      <ScenariosSection />
      {/* 3. Desire: Easy setup + social proof */}
      <IntegrationHowItWorks />
      <IntegrationTestimonial />
      {/* 4. Technical depth for evaluators */}
      <DataSyncTable />
      {/* 5. Objections + conversion */}
      <IntegrationFaq />
      <IntegrationCta />
      {/* 6. Internal linking */}
      <RelatedIntegrations />
    </>
  );
}
