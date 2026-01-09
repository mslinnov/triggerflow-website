'use client';

import {
  ThaisV3Navigation,
  ThaisV3Hero,
  ThaisV3TrustBar,
  ThaisV3SimpleSteps,
  ThaisV3Journey,
  ThaisV3Features,
  ThaisV3MiniDemo,
  ThaisV3Campaigns,
  ThaisV3Accompaniment,
  ThaisV3Testimonials,
  ThaisV3Pricing,
  ThaisV3FAQ,
  ThaisV3CTA,
  ThaisV3Footer,
} from '@/components/landing/thais-v3';

export default function ThaisV3LandingPage() {
  return (
    <>
      <ThaisV3Navigation />

      <main className="pb-20 lg:pb-0">
        <ThaisV3Hero />
        <ThaisV3TrustBar />
        <ThaisV3SimpleSteps />
        <ThaisV3Journey />
        <ThaisV3Features />
        <ThaisV3MiniDemo />
        <ThaisV3Campaigns />
        <ThaisV3Accompaniment />
        <ThaisV3Testimonials />
        <ThaisV3Pricing />
        <ThaisV3FAQ />
        <ThaisV3CTA />
      </main>

      <ThaisV3Footer />
    </>
  );
}
