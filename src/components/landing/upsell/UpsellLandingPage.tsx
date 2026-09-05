'use client';

import { UpsellProvider, type UpsellGoal } from './UpsellContext';
import { UpsellFaq } from './UpsellFaq';
import { UpsellFinalCta } from './UpsellFinalCta';
import { UpsellFooter } from './UpsellFooter';
import { UpsellGap } from './UpsellGap';
import { UpsellHeader } from './UpsellHeader';
import { UpsellHero } from './UpsellHero';
import { UpsellHowItWorks } from './UpsellHowItWorks';
import { UpsellEvidence } from './UpsellEvidence';
import { UpsellProof } from './UpsellProof';
import { UpsellServices } from './UpsellServices';
import { UpsellSimulator } from './UpsellSimulator';
import { UpsellStickyCta } from './UpsellStickyCta';
import { UpsellTrustBar } from './UpsellTrustBar';

/**
 * Assemblage de la landing page. Les deux variantes partagent exactement la
 * même page et le même simulateur : seule l'offre de conversion finale change,
 * démo ou livre blanc. C'est ce qui rend la comparaison des coûts par lead
 * honnête, puisque rien d'autre ne varie.
 */
export function UpsellLandingPage({
  goal,
  locale,
}: {
  goal: UpsellGoal;
  locale: string;
}) {
  return (
    <UpsellProvider goal={goal}>
      <div data-lp="upsell" className="bg-[var(--up-bg)] text-[var(--up-ink)]">
        <UpsellHeader />
        <main>
          <UpsellHero />
          <UpsellTrustBar />
          <UpsellSimulator />
          <UpsellGap />
          <UpsellHowItWorks />
          <UpsellEvidence />
          <UpsellServices />
          <UpsellProof />
          <UpsellFaq />
          <UpsellFinalCta />
        </main>
        <UpsellFooter locale={locale} />
        <UpsellStickyCta />
      </div>
    </UpsellProvider>
  );
}
