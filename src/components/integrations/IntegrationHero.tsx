'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, Check, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Container, ButtonLink } from '@/components/ui';
import { heroContainer, heroItem } from '@/lib/animations';

export function IntegrationHero() {
  const t = useTranslations('mewsIntegration.hero');

  return (
    <section className="relative overflow-hidden bg-surface-dark pt-28 pb-0 md:pt-36">
      {/* Layered ambient glows — richer depth */}
      <div className="absolute top-0 left-1/4 h-[700px] w-[900px] bg-[radial-gradient(ellipse,rgba(0,111,104,0.18),transparent_60%)]" />
      <div className="absolute top-20 right-0 h-[500px] w-[500px] bg-[radial-gradient(ellipse,rgba(0,111,104,0.08),transparent_70%)]" />
      <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] bg-[radial-gradient(ellipse,rgba(255,207,162,0.07),transparent_70%)]" />

      {/* Dot grid pattern — technical/precise feel */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Diagonal line accents — top right */}
      <div className="absolute -top-20 -right-20 h-[500px] w-[1px] rotate-[30deg] bg-gradient-to-b from-transparent via-brand-primary/20 to-transparent" />
      <div className="absolute -top-10 -right-10 h-[400px] w-[1px] rotate-[30deg] bg-gradient-to-b from-transparent via-white/5 to-transparent" />

      <Container className="relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroContainer}
          className="mx-auto max-w-4xl"
        >
          {/* Breadcrumb */}
          <motion.nav variants={heroItem} aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-xs tracking-wide text-white/30">
            <Link href="/integrations" className="transition-colors hover:text-white/60">
              Intégrations
            </Link>
            <span>/</span>
            <span>PMS</span>
            <span>/</span>
            <span className="text-white/60">Mews</span>
          </motion.nav>

          {/* Badges */}
          <motion.div variants={heroItem} className="mb-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 px-4 py-1.5 text-xs font-medium tracking-wide text-brand-primary backdrop-blur-sm">
              <Check className="h-3.5 w-3.5" />
              {t('badgeNative')}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/60 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              {t('badgeMarketplace')}
            </span>
          </motion.div>

          {/* Logo connector — with animated pulse */}
          <motion.div variants={heroItem} className="mb-10 flex items-center gap-0">
            <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm transition-colors hover:bg-white/[0.09]">
              <Image
                src="/images/integrations/mews.svg"
                alt="Mews PMS"
                width={100}
                height={32}
                className="h-8 w-auto brightness-0 invert opacity-80"
              />
            </div>

            {/* Animated connection line */}
            <div className="relative mx-2 flex h-12 w-20 items-center">
              <div className="absolute inset-y-1/2 left-0 right-0 h-px bg-gradient-to-r from-white/15 via-brand-primary/40 to-white/15" />
              <motion.div
                className="absolute top-1/2 left-0 h-1.5 w-6 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-brand-primary to-transparent"
                animate={{ x: [0, 56, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="h-2.5 w-2.5 rounded-full bg-brand-primary shadow-[0_0_12px_rgba(0,111,104,0.6)]" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-brand-primary/30"
                  animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                />
              </div>
            </div>

            <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm transition-colors hover:bg-white/[0.09]">
              <Image
                src="/images/logo.webp"
                alt="TriggerFlow"
                width={110}
                height={32}
                className="h-8 w-auto brightness-0 invert opacity-80"
              />
            </div>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={heroItem}
            className="max-w-3xl font-serif text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            {t('title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={heroItem}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/50"
          >
            {t('subtitle')}
          </motion.p>

          {/* Details bar */}
          <motion.div
            variants={heroItem}
            className="mt-5 max-w-2xl text-sm leading-relaxed text-white/25"
          >
            {t('details')}
          </motion.div>

          {/* CTAs — improved hierarchy */}
          <motion.div
            variants={heroItem}
            className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center"
          >
            <div className="flex flex-col">
              <ButtonLink
                href="https://app.lemcal.com/@trigger-flow/demo"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="group gap-2 shadow-lg shadow-brand-primary/25"
              >
                {t('ctaDemo')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
              <span className="mt-2.5 text-xs text-white/20">{t('ctaDemoMicro')}</span>
            </div>
            <a
              href="#data-sync"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/50 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10 hover:text-white/80"
            >
              {t('ctaData')}
              <ArrowDown className="h-3.5 w-3.5" />
            </a>
            <Link
              href="/tarifs"
              className="text-sm font-medium text-white/35 transition-colors hover:text-brand-primary"
            >
              {t('ctaPricing')} &rarr;
            </Link>
          </motion.div>

          {/* Last updated */}
          <motion.div
            variants={heroItem}
            className="mt-20 flex items-center justify-between border-t border-white/[0.06] pt-6 pb-8"
          >
            <span className="text-xs text-white/15">{t('lastUpdated')}</span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
