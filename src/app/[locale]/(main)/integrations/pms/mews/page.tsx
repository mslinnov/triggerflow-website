import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { BreadcrumbListJsonLd } from '@/components/seo';
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

const baseUrl = 'https://www.trigger-flow.com';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'mewsIntegration' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `${baseUrl}/${locale}/integrations/pms/mews`,
      languages: {
        'fr-FR': `${baseUrl}/fr/integrations/pms/mews`,
        'en-US': `${baseUrl}/en/integrations/pms/mews`,
      },
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      url: `${baseUrl}/${locale}/integrations/pms/mews`,
      type: 'website',
    },
  };
}

function FAQPageJsonLd({ locale }: { locale: string }) {
  const faqItems =
    locale === 'fr'
      ? [
          {
            question: 'Qu\'est-ce que l\'intégration Mews + TriggerFlow ?',
            answer: 'C\'est une connexion native entre le PMS cloud Mews et le CRM hôtelier TriggerFlow. Elle synchronise en temps réel les profils clients, réservations, charges et commentaires via l\'API ouverte Mews et des webhooks.',
          },
          {
            question: 'Comment connecter un CRM à Mews PMS ?',
            answer: 'Depuis Mews Commander, ouvrez la Marketplace et activez TriggerFlow. Une clé API est générée automatiquement. Collez-la dans TriggerFlow (Réglages > Intégrations > Mews). La synchronisation démarre immédiatement via webhooks temps réel.',
          },
          {
            question: 'Combien de temps pour être opérationnel ?',
            answer: 'La connexion technique prend 3 minutes. La synchronisation initiale dépend du volume. L\'activation des premiers workflows prend 10 à 15 minutes supplémentaires. Total : un hôtel est opérationnel en moins de 30 minutes.',
          },
          {
            question: 'Quelles données sont synchronisées entre Mews et TriggerFlow ?',
            answer: 'Profils clients, réservations, charges et extras, notes et commentaires internes, données de chambres et catégories, entreprises et groupes. La sync est bidirectionnelle.',
          },
          {
            question: 'Est-ce que Mews est compatible avec un CRM hôtelier externe ?',
            answer: 'Oui. Mews dispose d\'une API ouverte documentée et d\'une Marketplace officielle qui référence les CRM compatibles, dont TriggerFlow. La connexion est native — pas de Zapier, pas de middleware.',
          },
          {
            question: 'TriggerFlow peut-il modifier mes réservations dans Mews ?',
            answer: 'Non. TriggerFlow lit les données de Mews et peut y écrire des informations complémentaires (tags CRM, commentaires, scores de satisfaction), mais il ne modifie jamais les réservations, tarifs ou disponibilités.',
          },
        ]
      : [
          {
            question: 'What is the Mews + TriggerFlow integration?',
            answer: 'It\'s a native connection between Mews cloud PMS and TriggerFlow hotel CRM. It syncs guest profiles, reservations, charges and comments in real time via the Mews open API and webhooks.',
          },
          {
            question: 'How do I connect a CRM to Mews PMS?',
            answer: 'From Mews Commander, open the Marketplace and activate TriggerFlow. An API key is generated automatically. Paste it in TriggerFlow (Settings > Integrations > Mews). Sync starts immediately via real-time webhooks.',
          },
          {
            question: 'How long to get up and running?',
            answer: 'The technical connection takes 3 minutes. Initial sync depends on volume. Activating the first workflows takes 10-15 additional minutes. Total: a hotel is operational in under 30 minutes.',
          },
          {
            question: 'What data is synced between Mews and TriggerFlow?',
            answer: 'Guest profiles, reservations, charges and extras, internal notes and comments, room data and categories, companies and groups. Sync is bidirectional.',
          },
          {
            question: 'Is Mews compatible with an external hotel CRM?',
            answer: 'Yes. Mews has a well-documented open API and an official Marketplace listing compatible CRMs, including TriggerFlow. The connection is native — no Zapier, no middleware.',
          },
          {
            question: 'Can TriggerFlow modify my reservations in Mews?',
            answer: 'No. TriggerFlow reads Mews data and can write supplementary information (CRM tags, comments, satisfaction scores), but it never modifies reservations, rates or availability.',
          },
        ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
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
        ? 'Connexion en 3 étapes — 15 minutes, sans développeur'
        : 'Connect in 3 steps — 15 minutes, no developer needed',
    totalTime: 'PT15M',
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
            ? 'Depuis Mews Commander, Marketplace > TriggerFlow. Activez le connecteur — une clé API est générée automatiquement.'
            : 'From Mews Commander, go to Marketplace > TriggerFlow. Activate the connector — an API key is generated automatically.',
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
      price: '69',
      priceCurrency: 'EUR',
      priceValidUntil: '2026-12-31',
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
      <FAQPageJsonLd locale={locale} />
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
