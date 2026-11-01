'use client';

import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { UpsellEyebrow, UpsellSection } from '../upsell/primitives';

/**
 * Deux messages au même client OTA côte à côte : celui qui ramène sa vraie
 * adresse, et celui qui ne la ramène pas.
 *
 * Même rôle que le comparateur de la landing post-séjour : le visiteur arrive
 * d'une publicité, il doit reconnaître son propre message dans l'une des deux
 * colonnes avant tout argumentaire. Ce sont des RECONSTRUCTIONS, annoncées
 * comme telles : aucun message réel n'est montré, seuls les taux sont des
 * mesures.
 *
 * Les trois différences sont trois des cinq règles, toutes vérifiées à
 * l'intérieur d'un même hôtel : le moment du premier message, l'objet et la
 * longueur. Le formulaire dédié et la place du champ, écarts observés entre
 * hôtels seulement, n'y figurent pas (décision de Mounir du 1er novembre
 * 2026) : ils vivent dans l'encadré « bonnes pratiques » des règles.
 *
 * Le bouton est une maquette, masquée aux lecteurs d'écran qui liraient sinon
 * un bouton sans destination.
 */
const SIDES = ['effective', 'ineffective'] as const;
const ANNOTATIONS = ['a1', 'a2', 'a3'] as const;

export function ClientsOtaComparator() {
  const t = useTranslations('lpClientsOta.comparator');

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
              initial={{ opacity: 0, y: 18 }}
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
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--up-ink-muted)]">
                  {t('subjectLabel')}
                </p>
                <p className="mt-1 text-[17px] font-semibold text-[var(--up-ink)]">{t(`${side}.subject`)}</p>
                <p className="mt-1.5 text-[13px] text-[var(--up-ink-muted)]">{t(`${side}.timing`)}</p>
              </div>

              <div className="px-5 py-7 sm:px-7">
                <p className="text-[15px] text-[var(--up-ink)]">{t('greeting')}</p>
                <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-[var(--up-ink-soft)]">{t(`${side}.body`)}</p>

                <p
                  aria-hidden
                  className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--up-accent)] px-6 py-3 text-sm font-semibold text-[var(--up-accent-ink)]"
                >
                  {t(`${side}.button`)}
                </p>

                <p className="mt-7 border-t border-[var(--up-line)] pt-5 text-[13px] leading-relaxed text-[var(--up-ink-muted)]">
                  {t(`${side}.footnote`)}
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
