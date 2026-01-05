import { setRequestLocale } from 'next-intl/server';
import {
  Hero,
  LogoCloud,
  CommunicationFlow,
  ModulesShowcase,
  JourneyTimeline,
  HowItWorks,
  SolutionsGrid,
  TestimonialFeatured,
  PricingPreview,
  FAQ,
  CTASection,
} from '@/components/sections';
import { HomePageJsonLd } from '@/components/seo';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HomePageJsonLd locale={locale} />
      {/* Hero: bg-white */}
      <Hero />
      {/* LogoCloud: bg-zinc-50 (set in component) */}
      <LogoCloud />
      {/* CommunicationFlow: bg-white (set in component) */}
      <CommunicationFlow />
      {/* ModulesShowcase: alternating backgrounds (built into component) */}
      <ModulesShowcase />
      {/* JourneyTimeline: bg-zinc-50 (set in component) */}
      <JourneyTimeline />
      {/* HowItWorks: bg-white (set in component) */}
      <HowItWorks />
      {/* SolutionsGrid: bg-brand-light/20 wrapper */}
      <div className="bg-brand-light/20">
        <SolutionsGrid />
      </div>
      {/* TestimonialFeatured: bg-zinc-50 wrapper */}
      <div className="bg-zinc-50">
        <TestimonialFeatured />
      </div>
      {/* PricingPreview: bg-white wrapper */}
      <div className="bg-white">
        <PricingPreview />
      </div>
      {/* FAQ: bg-zinc-50 wrapper */}
      <div className="bg-zinc-50">
        <FAQ />
      </div>
      {/* CTASection: gradient bg (set in component) */}
      <CTASection />
    </>
  );
}
