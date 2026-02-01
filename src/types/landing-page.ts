import type {
  LPHeroProps,
  LPSocialProofProps,
  LPFeaturesProps,
  LPBenefitsProps,
  LPTestimonialProps,
  LPCTAProps,
  LPPricingProps,
} from '@/components/landing/shared';

// ── Section discriminated union ──────────────────────────────────────

interface LPSectionBase<T extends string, P> {
  type: T;
  props: Omit<P, 'className'>;
}

export type LPSection =
  | LPSectionBase<'LPHero', LPHeroProps>
  | LPSectionBase<'LPSocialProof', LPSocialProofProps>
  | LPSectionBase<'LPFeatures', LPFeaturesProps>
  | LPSectionBase<'LPBenefits', LPBenefitsProps>
  | LPSectionBase<'LPTestimonial', LPTestimonialProps>
  | LPSectionBase<'LPCTA', LPCTAProps>
  | LPSectionBase<'LPPricing', LPPricingProps>;

// ── Landing page config ──────────────────────────────────────────────

export interface LandingPageConfig {
  slug: string;
  locale: string;
  noindex?: boolean;
  header: {
    ctaLabel: string;
    ctaHref: string;
    ctaVariant?: 'primary' | 'secondary';
    logoSrc?: string;
  };
  metadata: {
    title: string;
    description: string;
    ogImage?: string;
  };
  sections: LPSection[];
}
