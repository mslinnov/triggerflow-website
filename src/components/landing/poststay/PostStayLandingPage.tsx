'use client';

import { PostStayProvider } from './PostStayContext';
import { PostStayDemoCta } from './PostStayDemoCta';
import { PostStayEvidence } from './PostStayEvidence';
import { PostStayFaq } from './PostStayFaq';
import { PostStayFinalCta } from './PostStayFinalCta';
import { PostStayFooter } from './PostStayFooter';
import { PostStayGap } from './PostStayGap';
import { PostStayHeader } from './PostStayHeader';
import { PostStayHero } from './PostStayHero';
import { PostStayHowItWorks } from './PostStayHowItWorks';
import { PostStaySimulator } from './PostStaySimulator';
import { PostStayStickyCta } from './PostStayStickyCta';
import { PostStayTrustBar } from './PostStayTrustBar';

/**
 * Assemblage de la landing post-séjour.
 *
 * L'ordre des sections raconte une seule chose, dans cet ordre : voici où
 * vont vos avis (hero), voici ce que vos réglages actuels valent
 * (simulateur), voici ce qui vous coûte le plus (erreurs), voici la recette
 * (règles, modèle, checklist), voici comment l'avoir en entier (formulaire).
 *
 * Le simulateur est placé haut, avant tout argumentaire : le visiteur arrive
 * d'une publicité, il a une minute d'attention, et la seule chose qui le
 * concerne vraiment est son propre chiffre.
 *
 * L'attribut `data-lp` porte les jetons de couleur définis dans globals.css.
 * Sans lui, toutes les variables `--up-*` de la page sont vides et la page
 * s'affiche en noir sur transparent.
 */
export function PostStayLandingPage({ locale }: { locale: string }) {
  return (
    <PostStayProvider>
      <div data-lp="poststay" className="bg-[var(--up-bg)] text-[var(--up-ink)]">
        <PostStayHeader />
        <main>
          <PostStayHero />
          <PostStayTrustBar />
          <PostStaySimulator />
          <PostStayGap />
          <PostStayEvidence />
          <PostStayDemoCta />
          <PostStayHowItWorks />
          <PostStayFaq />
          <PostStayFinalCta />
        </main>
        <PostStayFooter locale={locale} />
        <PostStayStickyCta />
      </div>
    </PostStayProvider>
  );
}
