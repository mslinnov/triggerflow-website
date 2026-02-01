import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

import { getAllLandingPages, getLandingPageBySlug } from '@/lib/landing-pages';
import type { LPSection } from '@/types/landing-page';
import {
  LPHeader,
  LPHero,
  LPSocialProof,
  LPFeatures,
  LPBenefits,
  LPTestimonial,
  LPCTA,
  LPPricing,
} from '@/components/landing/shared';

const BASE_URL = 'https://www.trigger-flow.com';

// ── Component map ────────────────────────────────────────────────────

const componentMap = {
  LPHero,
  LPSocialProof,
  LPFeatures,
  LPBenefits,
  LPTestimonial,
  LPCTA,
  LPPricing,
} as const;

function renderSection(section: LPSection, index: number) {
  const Component = componentMap[section.type];
  if (!Component) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Component key={`${section.type}-${index}`} {...(section.props as any)} />;
}

// ── Static params ────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const lps = getAllLandingPages();
  return lps.map((lp) => ({
    locale: lp.locale,
    slug: lp.slug,
  }));
}

// ── Metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const config = getLandingPageBySlug(slug, locale);

  if (!config) return {};

  const url = `${BASE_URL}/${locale}/lp/${slug}`;

  return {
    title: config.metadata.title,
    description: config.metadata.description,
    openGraph: {
      title: config.metadata.title,
      description: config.metadata.description,
      url,
      type: 'website',
      ...(config.metadata.ogImage && {
        images: [{ url: config.metadata.ogImage, width: 1200, height: 630 }],
      }),
    },
    alternates: {
      canonical: url,
    },
    ...(config.noindex && {
      robots: { index: false, follow: false },
    }),
  };
}

// ── Page ─────────────────────────────────────────────────────────────

export default async function DynamicLandingPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const config = getLandingPageBySlug(slug, locale);
  if (!config) notFound();

  return (
    <>
      <LPHeader
        ctaLabel={config.header.ctaLabel}
        ctaHref={config.header.ctaHref}
        ctaVariant={config.header.ctaVariant}
        logoSrc={config.header.logoSrc}
      />
      <main>
        {config.sections.map((section, index) => renderSection(section, index))}
      </main>
    </>
  );
}
