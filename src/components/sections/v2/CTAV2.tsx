'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { Container, ButtonLink } from '@/components/ui';

const benefits = [
  'Configuration en 48h',
  'Support 7j/7',
  'Conformité RGPD',
  'Sans engagement',
];

export function CTAV2() {
  const t = useTranslations('ctaSection');
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-brand-dark py-24 md:py-32">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        {/* Main gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark to-brand-primary/40" />

        {/* Animated orbs */}
        <motion.div
          animate={
            !prefersReducedMotion
              ? {
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                  scale: [1, 1.2, 1],
                }
              : {}
          }
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-brand-primary/20 blur-[120px]"
        />
        <motion.div
          animate={
            !prefersReducedMotion
              ? {
                  x: [0, -80, 0],
                  y: [0, 80, 0],
                  scale: [1, 1.3, 1],
                }
              : {}
          }
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-brand-accent/20 blur-[100px]"
        />
        <motion.div
          animate={
            !prefersReducedMotion
              ? {
                  scale: [1, 1.5, 1],
                  opacity: [0.1, 0.3, 0.1],
                }
              : {}
          }
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[80px]"
        />
      </div>

      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-brand-accent" />
              Essai gratuit 14 jours
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            {t('title')}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-zinc-300 md:text-xl"
          >
            {t('subtitle')}
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-2 text-zinc-300"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <ButtonLink
              href="https://app.lemcal.com/@trigger-flow/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full bg-white px-10 py-5 text-lg font-semibold text-brand-dark shadow-2xl shadow-white/20 transition-all duration-300 hover:scale-105 hover:shadow-white/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('ctaPrimary')}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>

              {/* Hover gradient */}
              <motion.div
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-r from-brand-primary to-emerald-500"
              />
              <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-white opacity-0 transition-opacity group-hover:opacity-100">
                {t('ctaPrimary')}
                <ArrowRight className="h-5 w-5" />
              </span>
            </ButtonLink>

            <ButtonLink
              href="mailto:contact@trigger-flow.com"
              className="rounded-full border-2 border-white/30 bg-transparent px-8 py-5 text-lg font-medium text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10"
            >
              {t('ctaSecondary')}
            </ButtonLink>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-12 flex items-center justify-center gap-6 text-sm text-zinc-400"
          >
            <span>Aucune carte bancaire requise</span>
            <span className="h-1 w-1 rounded-full bg-zinc-500" />
            <span>Installation assistée</span>
            <span className="h-1 w-1 rounded-full bg-zinc-500" />
            <span>Annulation facile</span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
