'use client';

import { PostStayComparator } from './PostStayComparator';
import { PostStayDemoCta } from './PostStayDemoCta';
import { PostStayEvidence } from './PostStayEvidence';
import { PostStayFaq } from './PostStayFaq';
import { PostStayFinalCta } from './PostStayFinalCta';
import { PostStayFooter } from './PostStayFooter';
import { PostStayGap } from './PostStayGap';
import { PostStayHeader } from './PostStayHeader';
import { PostStayHero } from './PostStayHero';
import { PostStayHowItWorks } from './PostStayHowItWorks';
import { PostStayStickyCta } from './PostStayStickyCta';
import { PostStayTrustBar } from './PostStayTrustBar';

/**
 * Assemblage de la landing post-séjour.
 *
 * L'ordre des sections raconte une seule chose, dans cet ordre : voici où
 * vont vos avis (hero), voici à quoi ressemblent les deux montages mesurés
 * (comparateur), voici ce qui vous coûte le plus (erreurs), voici la recette
 * (règles, modèle, checklist), voici comment l'avoir en entier (formulaire).
 *
 * Le comparateur est placé haut, avant tout argumentaire : le visiteur arrive
 * d'une publicité, il a une minute d'attention, et la chose qui le concerne
 * vraiment est de reconnaître son propre e-mail dans l'une des deux colonnes.
 * Il ne remplace pas un calculateur par un autre : il ne lui demande rien.
 *
 * L'attribut `data-lp` porte les jetons de couleur définis dans globals.css.
 * Sans lui, toutes les variables `--up-*` de la page sont vides et la page
 * s'affiche en noir sur transparent.
 */
export function PostStayLandingPage({ locale }: { locale: string }) {
  return (
    <div data-lp="poststay" className="bg-[var(--up-bg)] text-[var(--up-ink)]">
      <PostStayHeader />
      <main>
        <PostStayHero />
        <PostStayTrustBar />
        <PostStayComparator />
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
  );
}
