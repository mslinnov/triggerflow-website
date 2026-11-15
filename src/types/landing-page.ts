import type {
  LPHeroProps,
  LPSocialProofProps,
  LPFeaturesProps,
  LPBenefitsProps,
  LPTestimonialProps,
  LPCTAProps,
  LPPricingProps,
  LPIntegrationsProps,
  LPFeatureRowsProps,
  LPJourneyProps,
  LPTestimonialsProps,
  LPPlansProps,
  LPFAQProps,
  LPFooterProps,
} from '@/components/landing/shared';

// ── Section discriminated union ──────────────────────────────────────

interface LPSectionBase<T extends string, P> {
  type: T;
  /** `locale` est posée par la page depuis la config, jamais écrite dans le JSON. */
  props: Omit<P, 'className' | 'locale'>;
}

export type LPSection =
  | LPSectionBase<'LPHero', LPHeroProps>
  | LPSectionBase<'LPSocialProof', LPSocialProofProps>
  | LPSectionBase<'LPFeatures', LPFeaturesProps>
  | LPSectionBase<'LPBenefits', LPBenefitsProps>
  | LPSectionBase<'LPTestimonial', LPTestimonialProps>
  | LPSectionBase<'LPCTA', LPCTAProps>
  | LPSectionBase<'LPPricing', LPPricingProps>
  | LPSectionBase<'LPIntegrations', LPIntegrationsProps>
  | LPSectionBase<'LPFeatureRows', LPFeatureRowsProps>
  | LPSectionBase<'LPJourney', LPJourneyProps>
  | LPSectionBase<'LPTestimonials', LPTestimonialsProps>
  | LPSectionBase<'LPPlans', LPPlansProps>
  | LPSectionBase<'LPFAQ', LPFAQProps>
  | LPSectionBase<'LPFooter', LPFooterProps>;

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
