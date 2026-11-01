'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CLIENTS_OTA_FUNNEL } from '@/data/clients-ota';
import { UpsellLinkButton } from '../upsell/primitives';
import { PENDING } from './format';

/**
 * Hero : l'affirmation à gauche, le parcours d'un client OTA à droite, sur
 * 100 clients OTA. Même composition que la landing post-séjour.
 *
 * Même règle d'animation aussi : l'état de départ reste OPAQUE. Framer Motion
 * sérialise l'état initial dans le HTML prérendu, un `opacity: 0` afficherait
 * un premier écran vide tant que le script n'a pas chargé.
 */
export function ClientsOtaHero() {
  const t = useTranslations('lpClientsOta.hero');
  const tf = useTranslations('lpClientsOta.funnel');
  const tc = useTranslations('lpClientsOta.cta');

  return (
    <section className="relative overflow-hidden bg-[var(--up-bg)] pt-12 pb-16 md:pt-20 md:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[var(--up-accent-wash)] blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-8">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-5 inline-flex rounded-full border border-[var(--up-line-strong)] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--up-ink-muted)]">
            {t('badge')}
          </p>

          <h1 className="text-balance text-[2rem] font-bold leading-[1.14] tracking-[-0.03em] text-[var(--up-ink)] sm:text-[2.5rem] lg:text-[2.8rem] lg:leading-[1.08]">
            {t('titleLead')}{' '}
            <span className="text-[var(--up-accent-text)] lg:block">{t('titleStatement')}</span>
          </h1>

          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-[var(--up-ink-soft)]">
            {t('subtitle')}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <UpsellLinkButton href="#comparatif" size="lg">
              {tc('compare')}
            </UpsellLinkButton>
            <UpsellLinkButton href="#simulateur" size="lg" variant="outline">
              {tc('simulate')}
            </UpsellLinkButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] p-5 shadow-[var(--up-shadow-lg)] sm:p-7"
        >
          <p className="text-sm font-semibold text-[var(--up-ink)]">{t('funnelTitle')}</p>

          <ul className="mt-6 space-y-5">
            {CLIENTS_OTA_FUNNEL.map((step) => (
              <li key={step.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[15px] leading-snug text-[var(--up-ink-soft)]">{tf(step.id)}</span>
                  <span className="shrink-0 font-[family-name:var(--font-geist-mono)] text-lg font-semibold tabular-nums text-[var(--up-ink)]">
                    {step.value ?? PENDING}
                  </span>
                </div>
                {/* Repère proportionnel, pas une jauge : aucune piste de fond. */}
                <div
                  aria-hidden
                  className="mt-2 h-1.5 rounded-full bg-[var(--up-accent)]"
                  style={{ width: `${step.value ?? 0}%` }}
                />
                {step.hasNote && (
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--up-ink-muted)]">
                    {tf(`${step.id}Note`)}
                  </p>
                )}
              </li>
            ))}
          </ul>

          <p className="mt-6 border-t border-[var(--up-line)] pt-5 text-[13px] leading-relaxed text-[var(--up-ink-soft)]">
            {t('funnelNote')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
