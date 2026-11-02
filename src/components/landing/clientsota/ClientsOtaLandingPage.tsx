'use client';

import { MotionConfig } from 'framer-motion';
import { ClientsOtaComparator } from './ClientsOtaComparator';
import { ClientsOtaDemoCta } from './ClientsOtaDemoCta';
import { ClientsOtaEvidence } from './ClientsOtaEvidence';
import { ClientsOtaFaq } from './ClientsOtaFaq';
import { ClientsOtaFinalCta } from './ClientsOtaFinalCta';
import { ClientsOtaFooter } from './ClientsOtaFooter';
import { ClientsOtaGap } from './ClientsOtaGap';
import { ClientsOtaHeader } from './ClientsOtaHeader';
import { ClientsOtaHero } from './ClientsOtaHero';
import { ClientsOtaHowItWorks } from './ClientsOtaHowItWorks';
import { ClientsOtaSimulator } from './ClientsOtaSimulator';
import { ClientsOtaStickyCta } from './ClientsOtaStickyCta';
import { ClientsOtaTrustBar } from './ClientsOtaTrustBar';

/**
 * Assemblage de la landing du guide du client OTA.
 *
 * Même récit que la landing post-séjour : où partent vos clients OTA (hero),
 * à quoi ressemblent les deux formulaires mesurés (comparateur), ce qui vous
 * coûte le plus (erreurs), la recette (règles, modèle, checklist), puis le
 * guide. Le simulateur de commissions évitées s'insère après les règles : il
 * chiffre chez soi ce que la page vient de démontrer, avec des hypothèses que
 * le visiteur règle lui-même.
 *
 * L'attribut `data-lp` porte les jetons de couleur définis dans globals.css.
 *
 * ─── MOUVEMENTS RÉDUITS : CONFIÉS À FRAMER, PAS AUX COMPOSANTS ───────────
 * Les composants ne testent plus `useReducedMotion()` pour choisir leur état
 * de départ. Le serveur ne connaît pas cette préférence : il rendait
 * `opacity: 0`, le client hydratait avec `initial={false}`, React ne corrige
 * pas un attribut d'hydratation divergent, et les blocs révélés au défilement
 * restaient invisibles pour tout visiteur qui a réduit les animations
 * (constaté le 01/11/2026, même défaut sur la landing post-séjour).
 * `reducedMotion="user"` laisse Framer couper les déplacements chez ces
 * visiteurs tout en jouant le fondu : même HTML côté serveur et client.
 */
export function ClientsOtaLandingPage({ locale }: { locale: string }) {
  return (
    <MotionConfig reducedMotion="user">
      <div data-lp="clientsota" className="bg-[var(--up-bg)] text-[var(--up-ink)]">
        <ClientsOtaHeader />
        <main>
          <ClientsOtaHero />
          <ClientsOtaTrustBar />
          <ClientsOtaComparator />
          <ClientsOtaGap />
          <ClientsOtaEvidence />
          <ClientsOtaDemoCta />
          <ClientsOtaSimulator />
          <ClientsOtaHowItWorks />
          <ClientsOtaFaq />
          <ClientsOtaFinalCta />
        </main>
        <ClientsOtaFooter locale={locale} />
        <ClientsOtaStickyCta />
      </div>
    </MotionConfig>
  );
}
