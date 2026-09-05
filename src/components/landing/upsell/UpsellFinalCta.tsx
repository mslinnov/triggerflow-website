'use client';

import { Check } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { formatEuros } from '@/lib/upsell-simulator';
import { UpsellLeadForm } from './UpsellLeadForm';
import { UpsellSection } from './primitives';
import { useUpsell } from './UpsellContext';

/**
 * Section de conversion finale, la seule qui diffère entre les deux variantes.
 *
 * - `demo` : on rappelle le chiffre que la personne vient de paramétrer, puis on
 *   demande de quoi la rappeler utilement.
 * - `whitepaper` : on décrit ce que contient le document avant de demander
 *   l'email. Sans sommaire, un livre blanc ne se télécharge pas.
 */

const WHITEPAPER_CHAPTERS = ['timing', 'channel', 'catalogue', 'pms'] as const;

export function UpsellFinalCta() {
  const t = useTranslations('lpUpsell.finalCta');
  const locale = useLocale();
  const { result, goal } = useUpsell();

  const isDemo = goal === 'demo';
  const showEstimate = result.monthlyRevenue > 0;

  return (
    <UpsellSection id="formulaire" className="bg-[var(--up-bg)]">
      <div
        className={
          isDemo
            ? 'mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8'
            : 'mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'
        }
      >
        {isDemo ? (
          <>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--up-ink)] md:text-4xl">
              {t('demo.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-[46ch] text-lg leading-relaxed text-[var(--up-ink-soft)]">
              {t('demo.subtitle')}
            </p>

            {showEstimate && (
              <p className="mt-6 inline-flex items-baseline gap-2 rounded-full border border-[var(--up-accent)]/30 bg-[var(--up-accent-wash)] px-5 py-2.5 text-sm text-[var(--up-ink-soft)]">
                {t('estimateLabel')}
                <span className="font-[family-name:var(--font-geist-mono)] text-base font-semibold text-[var(--up-accent-text)]">
                  {formatEuros(result.monthlyRevenue, locale)}
                </span>
              </p>
            )}

            <div className="mt-10 rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] p-6 text-left shadow-[var(--up-shadow-sm)] md:p-8">
              <UpsellLeadForm idPrefix="final" />
            </div>
          </>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[var(--up-ink)] md:text-4xl">
                {t('whitepaper.title')}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[var(--up-ink-soft)]">
                {t('whitepaper.subtitle')}
              </p>

              <ul className="mt-8 space-y-4">
                {WHITEPAPER_CHAPTERS.map((chapter) => (
                  <li key={chapter} className="flex gap-3">
                    <Check
                      className="mt-0.5 h-5 w-5 shrink-0 text-[var(--up-accent)]"
                      strokeWidth={2.2}
                      aria-hidden
                    />
                    <span className="text-[15px] leading-relaxed text-[var(--up-ink-soft)]">
                      {t(`whitepaper.chapters.${chapter}`)}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-sm text-[var(--up-ink-muted)]">{t('whitepaper.format')}</p>
            </div>

            <div className="rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] p-6 shadow-[var(--up-shadow-lg)] md:p-8">
              <p className="text-base font-semibold text-[var(--up-ink)]">
                {t('whitepaper.formTitle')}
              </p>
              <div className="mt-5">
                <UpsellLeadForm idPrefix="final" />
              </div>
            </div>
          </div>
        )}
      </div>
    </UpsellSection>
  );
}
