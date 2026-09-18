'use client';

import { useTranslations } from 'next-intl';
import { UpsellLinkButton } from '../upsell/primitives';

/**
 * Barre de rattrapage mobile. Le trafic est très majoritairement mobile :
 * l'action de conversion doit rester atteignable à tout moment, sans remonter.
 *
 * Elle mène au formulaire, pas à la prise de rendez-vous : cette dernière vit
 * dans l'en-tête, visible elle aussi sur mobile. Deux boutons, deux
 * destinations, aucune redite de libellé.
 *
 * Le rembourrage bas suit l'encoche des iPhone récents, sans quoi le bouton
 * passe sous la barre de navigation du système.
 */
export function PostStayStickyCta() {
  const t = useTranslations('lpPostStay.cta');

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--up-line)] bg-[var(--up-surface)]/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
      <UpsellLinkButton href="#formulaire" size="lg" className="w-full">
        {t('guide')}
      </UpsellLinkButton>
    </div>
  );
}
