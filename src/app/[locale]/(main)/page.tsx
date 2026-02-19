import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  Hero,
  LogoCloud,
  CommunicationFlow,
  FeaturesBento,
  JourneyTimeline,
  HowItWorks,
  IntegrationsShowcase,
  Examples,
  SolutionsGrid,
  PersonasBento,
  TestimonialsCarousel,
  CustomerSuccess,
  PricingPreview,
  FAQ,
  CTASection,
} from '@/components/sections';
import { HomePageJsonLd } from '@/components/seo';
import { StickyMobileCTA } from '@/components/layout/StickyMobileCTA';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

const baseUrl = 'https://www.trigger-flow.com';

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: 'TriggerFlow | CRM hôtelier & automatisation relation client',
    en: 'TriggerFlow | Hotel CRM & Guest Relationship Automation',
  };

  const descriptions: Record<string, string> = {
    fr: 'CRM hôtelier avec marketing automation et workflows : emails, SMS, WhatsApp automatisés, programme fidélité et avis Google. Connecté à 7+ PMS français.',
    en: 'Hotel CRM with marketing automation and workflows: automated emails, SMS, WhatsApp, loyalty program and Google reviews. Connected to 7+ French PMS.',
  };

  return {
    title: titles[locale] ?? titles.fr,
    description: descriptions[locale] ?? descriptions.fr,
    openGraph: {
      title: titles[locale] ?? titles.fr,
      description: descriptions[locale] ?? descriptions.fr,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'fr-FR': `${baseUrl}/fr`,
        'en-US': `${baseUrl}/en`,
      },
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HomePageJsonLd locale={locale} />
      <Hero />
      <LogoCloud />
      <CommunicationFlow />
      <FeaturesBento />
      <JourneyTimeline />
      <HowItWorks />
      <IntegrationsShowcase />
      <Examples />
      <PersonasBento />
      <SolutionsGrid />
      <TestimonialsCarousel />
      <CustomerSuccess />
      <PricingPreview />
      <FAQ />
      <CTASection />
      <StickyMobileCTA />
    </>
  );
}
