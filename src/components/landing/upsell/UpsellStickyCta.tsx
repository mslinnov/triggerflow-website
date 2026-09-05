'use client';

import { useTranslations } from 'next-intl';
import { UpsellLinkButton } from './primitives';
import { useUpsell } from './UpsellContext';

/**
 * Barre de rattrapage mobile. Le trafic Facebook est très majoritairement
 * mobile : l'action de conversion doit rester atteignable à tout moment.
 */
export function UpsellStickyCta() {
  const t = useTranslations('lpUpsell.cta');
  const { goal } = useUpsell();

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--up-line)] bg-[var(--up-surface)]/95 p-3 backdrop-blur-md lg:hidden">
      <UpsellLinkButton href="#formulaire" size="lg" className="w-full">
        {goal === 'demo' ? t('demo') : t('whitepaper')}
      </UpsellLinkButton>
    </div>
  );
}
