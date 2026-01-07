import { Suspense } from 'react';
import {
  ThaisHero,
  ThaisValueProps,
  ThaisFeaturesShowcase,
  ThaisHowItWorks,
  ThaisPricing,
  ThaisCTA,
  ThaisFooter,
} from '@/components/landing/thais';

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
      <main>
        {/* Hero Section - Above the fold with CTA */}
        <Suspense fallback={<LoadingFallback />}>
          <ThaisHero />
        </Suspense>

        {/* Thaïs-specific Value Propositions */}
        <ThaisValueProps />

        {/* TriggerFlow Features Showcase */}
        <ThaisFeaturesShowcase />

        {/* How It Works - 3 Steps */}
        <ThaisHowItWorks />

        {/* Pricing Section */}
        <Suspense fallback={<LoadingFallback />}>
          <ThaisPricing />
        </Suspense>

        {/* Final CTA Section */}
        <Suspense fallback={<LoadingFallback />}>
          <ThaisCTA />
        </Suspense>
      </main>

      {/* Minimal Footer */}
      <ThaisFooter />
    </>
  );
}
