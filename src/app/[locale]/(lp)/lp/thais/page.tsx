import { Suspense } from 'react';
import {
  ThaisHero,
  ThaisMetrics,
  ThaisValueProps,
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
      {/* Sticky Navigation */}
      <ThaisNavigation />

      <main>
        {/* Hero Section */}
        <Suspense fallback={<LoadingFallback />}>
          <ThaisHero />
        </Suspense>

        {/* Metrics Section */}
        <ThaisMetrics />

        {/* Cas d'usage concrets */}
        <div id="cas-usage">
          <ThaisConcreteUseCases />
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
