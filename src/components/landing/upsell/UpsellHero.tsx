'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { UpsellEyebrow, UpsellLinkButton } from './primitives';

/**
 * Hero asymétrique : la promesse à gauche, l'offre telle que le client la
 * reçoit à droite. Aucune bande de réassurance ici, elle vit dans la section
 * suivante pour que le hero tienne dans le premier écran sur mobile.
 */
export function UpsellHero() {
  const t = useTranslations('lpUpsell.hero');
  const tc = useTranslations('lpUpsell.cta');
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[var(--up-bg)] pt-14 pb-16 md:pt-20 md:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[var(--up-accent-wash)] blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <UpsellEyebrow>{t('eyebrow')}</UpsellEyebrow>
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-[var(--up-ink)] md:text-5xl">
            {t('titleLine1')}
            <span className="block text-[var(--up-accent)]">{t('titleLine2')}</span>
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-[var(--up-ink-soft)]">
            {t('subtitle')}
          </p>
          <div className="mt-9">
            <UpsellLinkButton href="#simulateur" size="lg">
              {tc('calculate')}
            </UpsellLinkButton>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] shadow-[var(--up-shadow-lg)]">
            <Image
              src="/images/lp/upsell/catalogue-client.webp"
              alt={t('imageAlt')}
              width={1600}
              height={1050}
              priority
              className="h-auto w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
