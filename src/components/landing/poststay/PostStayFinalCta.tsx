'use client';

import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { UpsellSection } from '../upsell/primitives';
import { PostStayLeadForm } from './PostStayLeadForm';

/**
 * Section de conversion. L'ancre #formulaire est posée sur le formulaire
 * lui-même et non sur la section : viser la section faisait atterrir sur le
 * titre, formulaire hors écran, donc un scroll de plus juste après un clic.
 *
 * Sur mobile, le formulaire passe avant la liste des chapitres, pour la même
 * raison : c'est la cible de tous les appels à l'action de la page.
 */
const CHAPTERS = ['funnel', 'rules', 'mistakes', 'template', 'method'] as const;

export function PostStayFinalCta() {
  const t = useTranslations('lpPostStay.finalCta');

  return (
    <UpsellSection className="bg-[var(--up-bg)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--up-ink)] md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--up-ink-soft)]">{t('subtitle')}</p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
          <div
            id="formulaire"
            className="order-1 scroll-mt-20 rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] p-5 shadow-[var(--up-shadow-lg)] sm:p-6 md:p-8 lg:order-2"
          >
            <p className="text-base font-semibold text-[var(--up-ink)]">{t('formTitle')}</p>
            <div className="mt-5">
              <PostStayLeadForm idPrefix="final" />
            </div>
          </div>

          <div className="order-2 lg:order-1">
            <ul className="space-y-4">
              {CHAPTERS.map((chapter) => (
                <li key={chapter} className="flex gap-3">
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-[var(--up-accent-text)]"
                    strokeWidth={2.2}
                    aria-hidden
                  />
                  <span className="text-[15px] leading-relaxed text-[var(--up-ink-soft)]">
                    {t(`chapters.${chapter}`)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-[var(--up-ink-muted)]">{t('format')}</p>
          </div>
        </div>
      </div>
    </UpsellSection>
  );
}
