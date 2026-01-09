'use client';

import { Suspense } from 'react';
import {
  ThaisV2Hero,
  ThaisV2Navigation,
  ThaisV2Journey,
  ThaisV2UseCases,
  ThaisV2Features,
  ThaisV2Pricing,
  ThaisV2CTA,
  ThaisV2Footer,
} from '@/components/landing/thais-v2';

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0F1C]">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
    </div>
  );
}

export default function ThaisV2LandingPage() {
  return (
    <>
      <ThaisV2Navigation />

      <main>
        <Suspense fallback={<LoadingFallback />}>
          <ThaisV2Hero />
        </Suspense>

        <ThaisV2Journey />

        <div id="cas-usage">
          <ThaisV2UseCases />
        </div>

        <div id="fonctionnalites">
          <ThaisV2Features />
        </div>

        <div id="tarifs">
          <Suspense fallback={<LoadingFallback />}>
            <ThaisV2Pricing />
          </Suspense>
        </div>

        <Suspense fallback={<LoadingFallback />}>
          <ThaisV2CTA />
        </Suspense>
      </main>

      <ThaisV2Footer />
    </>
  );
}
