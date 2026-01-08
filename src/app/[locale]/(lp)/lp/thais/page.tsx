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
        {/* 1. Hero Section - Above the fold with CTA, example concret, AI badge */}
        <Suspense fallback={<LoadingFallback />}>
          <ThaisHero />
        </Suspense>

        {/* 2. Metrics Section - 4 key stats */}
        <ThaisMetrics />

        {/* 3. Pourquoi TriggerFlow + Thaïs (3 bénéfices avec exemples) */}
        <div id="avantages">
          <ThaisValueProps />
        </div>

        {/* 4. CTA intermédiaire */}
        <ThaisCTASection variant="minimal" />

        {/* 5. Témoignage fort mis en avant (carousel) */}
        <div id="temoignages">
          <ThaisUseCases />
        </div>

        {/* 6. Section Cas d'usage concrets (4 exemples) */}
        <div id="cas-usage">
          <ThaisConcreteUseCases />
        </div>

        {/* 7. CTA intermédiaire */}
        <ThaisCTASection variant="default" />

        {/* 8. 6 Features clés (reformulées en bénéfices) */}
        <div id="fonctionnalites">
          <ThaisFeaturesShowcase />
        </div>

        {/* 9. Témoignages supplémentaires */}
        <ThaisTestimonials />

        {/* 10. Comment ça marche (3 étapes spécifiques Thaïs) */}
        <div id="comment-ca-marche">
          <ThaisHowItWorks />
        </div>

        {/* 11. CTA intermédiaire */}
        <ThaisCTASection variant="gradient" />

        {/* 12. Pricing Section */}
        <div id="tarifs">
          <Suspense fallback={<LoadingFallback />}>
            <ThaisPricing />
          </Suspense>
        </div>

        {/* 13. Final CTA Section */}
        <Suspense fallback={<LoadingFallback />}>
          <ThaisCTA />
        </Suspense>
      </main>

      {/* Minimal Footer */}
      <ThaisFooter />
    </>
  );
}
