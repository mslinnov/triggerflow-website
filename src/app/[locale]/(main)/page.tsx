import { setRequestLocale } from 'next-intl/server';
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
