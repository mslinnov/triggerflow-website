'use client';

import { useTranslations } from 'next-intl';
import { UpsellLinkButton } from './primitives';
import { useUpsell } from './UpsellContext';

/**
 * Barre de rattrapage mobile. Le trafic Facebook est très majoritairement
 * mobile : l'action de conversion doit rester atteignable à tout moment.
 *
 * Elle porte l'offre propre à la variante, pas la prise de rendez-vous : cette
 * dernière vit dans l'en-tête, visible elle aussi sur mobile. Deux boutons, deux
 * destinations, aucune redite de libellé.
 *
 * Le rembourrage bas suit l'encoche des iPhone récents, sans quoi le bouton
 * passe sous la barre de navigation du système.
 */
export function UpsellStickyCta() {
  const t = useTranslations('lpUpsell.cta');
  const { goal } = useUpsell();

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--up-line)] bg-[var(--up-surface)]/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
      <UpsellLinkButton href="#formulaire" size="lg" className="w-full">
        {goal === 'demo' ? t('demo') : t('whitepaper')}
      </UpsellLinkButton>
    </div>
  );
}
