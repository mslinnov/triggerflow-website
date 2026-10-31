'use client';

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
 */
export function ClientsOtaLandingPage({ locale }: { locale: string }) {
  return (
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
  );
}
