import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import {
  HeroV2,
  LogoCloudV2,
  FeaturesV2,
  JourneyV2,
  ModulesV2,
  TestimonialV2,
  PricingV2,
  FAQV2,
  CTAV2,
} from '@/components/sections/v2';
import { HomePageJsonLd } from '@/components/seo';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

interface HomePageV2Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePageV2({ params }: HomePageV2Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HomePageJsonLd locale={locale} />
      <HeroV2 />
      <LogoCloudV2 />
      <FeaturesV2 />
      <JourneyV2 />
      <ModulesV2 />
      <TestimonialV2 />
      <PricingV2 />
      <FAQV2 />
      <CTAV2 />
    </>
  );
}
