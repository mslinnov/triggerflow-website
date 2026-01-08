import { Suspense } from 'react';
import type { Metadata } from 'next';
import {
  ThaisHero,
  ThaisFeaturesShowcase,
  ThaisHowItWorks,
  ThaisPricing,
  ThaisCTA,
  ThaisFooter,
  ThaisNavigation,
  ThaisUseCases,
  ThaisTestimonials,
  ThaisConcreteUseCases,
  ThaisCTASection,
  ThaisMarketingCampaigns,
  JourneyTimeline,
} from '@/components/landing/thais';

// Prevent search engine indexing for this landing page
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

// Loading component for Suspense boundary
function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent" />
    </div>
  );
}

export default function ThaisLandingPage() {
  return (
    <>
      {/* Sticky Navigation */}
      <ThaisNavigation />

      <main>
        {/* Hero Section */}
        <Suspense fallback={<LoadingFallback />}>
          <ThaisHero />
        </Suspense>

        {/* Parcours Client */}
        <JourneyTimeline />

        {/* Metrics Section */}
        {/*<ThaisMetrics />*/}

        {/* Cas d'usage concrets */}
        <div id="cas-usage">
          <ThaisConcreteUseCases />
        </div>

        {/* Campagnes Marketing */}
        <div id="campagnes">
          <ThaisMarketingCampaigns />
        </div>

        {/* CTA intermédiaire */}
        <ThaisCTASection variant="default" />

        {/* Fonctionnalités */}
        <div id="fonctionnalites">
          <ThaisFeaturesShowcase />
        </div>

        {/* CTA intermédiaire */}
        <ThaisCTASection variant="minimal" />

        {/* Témoignages carousel */}
        <div id="temoignages">
          <ThaisUseCases />
        </div>

        {/* Comment ça marche */}
        <div id="comment-ca-marche">
          <ThaisHowItWorks />
        </div>

        {/* Tarifs */}
        <div id="tarifs">
          <Suspense fallback={<LoadingFallback />}>
            <ThaisPricing />
          </Suspense>
        </div>

        {/* Témoignages supplémentaires */}
        <ThaisTestimonials />

        {/* CTA final */}
        <Suspense fallback={<LoadingFallback />}>
          <ThaisCTA />
        </Suspense>
      </main>

      {/* Minimal Footer */}
      <ThaisFooter />
    </>
  );
}
