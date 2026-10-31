'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { UpsellEyebrow, UpsellSection } from '../upsell/primitives';

/**
 * Deux formulaires de préparation de séjour côte à côte : celui qui récupère
 * la vraie adresse du client OTA, et celui qui ne la récupère pas.
 *
 * Même rôle que le comparateur de la landing post-séjour : le visiteur arrive
 * d'une publicité, il doit reconnaître son propre formulaire dans l'une des
 * deux colonnes avant tout argumentaire. Ce sont des RECONSTRUCTIONS, annoncées
 * comme telles : aucun formulaire réel n'est montré, seuls les taux (à venir de
 * l'étude) sont des mesures.
 *
 * Les champs sont des maquettes : ni saisissables ni focalisables, masqués aux
 * lecteurs d'écran qui liraient sinon un formulaire sans destination.
 */
const SIDES = ['effective', 'ineffective'] as const;
const ANNOTATIONS = ['a1', 'a2', 'a3'] as const;

export function ClientsOtaComparator() {
  const t = useTranslations('lpClientsOta.comparator');
  const reduce = useReducedMotion();

  return (
    <UpsellSection id="comparatif" className="bg-[var(--up-bg-sunken)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <UpsellEyebrow>{t('eyebrow')}</UpsellEyebrow>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--up-ink)] md:text-4xl">{t('title')}</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--up-ink-soft)]">{t('subtitle')}</p>
        </div>

        <div className="mt-8 flex max-w-3xl gap-3 rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] p-4 text-[13px] leading-relaxed text-[var(--up-ink-soft)]">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--up-accent)]" strokeWidth={2} aria-hidden />
          <p>
            <span className="font-semibold text-[var(--up-ink)]">{t('reconstructionTitle')}</span>{' '}
            {t('reconstructionBody')}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {SIDES.map((side, index) => (
            <motion.div
              key={side}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'overflow-hidden rounded-2xl border bg-[var(--up-surface)] shadow-[var(--up-shadow-sm)]',
                side === 'effective' ? 'border-[var(--up-accent)]' : 'border-[var(--up-line)]'
              )}
            >
              <div className="border-b border-[var(--up-line)] bg-[var(--up-surface-alt)] px-5 py-4 sm:px-7">
                <p
                  className={cn(
                    'text-[11px] font-semibold uppercase tracking-[0.14em]',
                    side === 'effective' ? 'text-[var(--up-accent-text)]' : 'text-[var(--up-ink-muted)]'
                  )}
                >
                  {t(`${side}.badge`)}
                </p>
                <p className="mt-1.5 text-[13px] text-[var(--up-ink-muted)]">{t(`${side}.timing`)}</p>
              </div>

              <div aria-hidden className="px-5 py-7 sm:px-7">
                <p className="max-w-[44ch] text-[15px] leading-relaxed text-[var(--up-ink-soft)]">{t(`${side}.intro`)}</p>

                <p className="mt-6 text-sm font-medium text-[var(--up-ink)]">{t(`${side}.fieldLabel`)}</p>
                <p className="mt-2 min-h-11 rounded-xl border border-[var(--up-line-strong)] px-3.5 py-3 text-[15px] text-[var(--up-ink-muted)]">
                  {t(`${side}.fieldValue`)}
                </p>
                <p className="mt-2 text-xs text-[var(--up-ink-soft)]">{t(`${side}.fieldHint`)}</p>

                {side === 'effective' && (
                  <p className="mt-5 flex gap-2.5 text-[13px] leading-relaxed text-[var(--up-ink-soft)]">
                    <span className="mt-0.5 h-4 w-4 shrink-0 rounded border border-[var(--up-line-strong)]" />
                    {t('effective.consent')}
                  </p>
                )}

                <p className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--up-accent)] px-6 py-3 text-sm font-semibold text-[var(--up-accent-ink)]">
                  {t(`${side}.button`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <h3 className="mt-14 text-xl font-semibold text-[var(--up-ink)]">{t('annotationsTitle')}</h3>
        <ol className="mt-6 grid gap-6 md:grid-cols-3">
          {ANNOTATIONS.map((key, index) => (
            <li key={key} className="rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] p-6">
              <p className="font-[family-name:var(--font-geist-mono)] text-sm font-semibold text-[var(--up-accent-text)]">
                {index + 1}
              </p>
              <p className="mt-2 font-semibold leading-snug text-[var(--up-ink)]">{t(`annotations.${key}.title`)}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--up-ink-soft)]">{t(`annotations.${key}.body`)}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-3xl text-[13px] leading-relaxed text-[var(--up-ink-muted)]">{t('methodNote')}</p>
      </div>
    </UpsellSection>
  );
}
