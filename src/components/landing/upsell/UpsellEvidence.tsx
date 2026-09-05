'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { UpsellSection } from './primitives';

/**
 * Deux constats mesurés sur la base de production, qui transforment le « au bon
 * moment, sur le bon canal » d'argument marketing en fait vérifié :
 * le canal (WhatsApp bat l'email dans 6 établissements sur 7, effet qui survit
 * au contrôle par établissement) et le délai d'envoi avant l'arrivée.
 *
 * Les barres du délai n'ont pas de fond de piste : ce sont des repères
 * proportionnels, pas des jauges de tableau de bord.
 */

// Taux d'acceptation mesurés par fenêtre d'envoi (rapport §4b).
const TIMING = [
  { id: 'longBefore', rate: 5.15, sends: 36708 },
  { id: 'twoDays', rate: 3.47, sends: 17792 },
  { id: 'sameDay', rate: 1.67, sends: 17792 },
  { id: 'afterArrival', rate: 0.2, sends: 1464 },
] as const;

const MAX_RATE = 5.15;

export function UpsellEvidence() {
  const t = useTranslations('lpUpsell.evidence');
  const reduce = useReducedMotion();

  return (
    <UpsellSection className="bg-[var(--up-bg-sunken)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-[26ch] text-3xl font-bold tracking-tight text-[var(--up-ink)] md:text-4xl">
          {t('title')}
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Canal */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] p-7 md:p-8"
          >
            <p className="font-[family-name:var(--font-geist-mono)] text-4xl font-semibold text-[var(--up-accent-text)] md:text-5xl">
              {t('channelFigure')}
            </p>
            {/* Le dénominateur est affiché juste sous le pourcentage : sept
                établissements, ce n'est pas un échantillon qu'on peut taire. */}
            <p className="mt-2 text-sm text-[var(--up-ink-muted)]">{t('channelFigureNote')}</p>
            <h3 className="mt-4 text-lg font-semibold text-[var(--up-ink)]">
              {t('channelTitle')}
            </h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--up-ink-soft)]">
              {t('channelBody')}
            </p>
          </motion.div>

          {/* Délai d'envoi */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] p-7 md:p-8"
          >
            <h3 className="text-lg font-semibold text-[var(--up-ink)]">{t('timingTitle')}</h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--up-ink-soft)]">
              {t('timingBody')}
            </p>

            <ul className="mt-6 space-y-3">
              {TIMING.map((row) => (
                <li key={row.id} className="grid grid-cols-[7.5rem_1fr_auto] items-center gap-3">
                  <span className="text-sm text-[var(--up-ink-soft)]">{t(`timing.${row.id}`)}</span>
                  <span
                    aria-hidden
                    className="h-1.5 rounded-full bg-[var(--up-accent)]"
                    style={{ width: `${Math.max((row.rate / MAX_RATE) * 100, 3)}%` }}
                  />
                  <span className="font-[family-name:var(--font-geist-mono)] text-sm font-semibold text-[var(--up-ink)]">
                    {t('rateValue', { rate: row.rate })}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </UpsellSection>
  );
}
