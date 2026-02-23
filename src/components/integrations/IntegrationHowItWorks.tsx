'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui';
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';

export function IntegrationHowItWorks() {
  const t = useTranslations('mewsIntegration.howItWorks');

  const steps = [0, 1, 2] as const;

  return (
    <section className="relative overflow-hidden bg-surface-dark py-20 md:py-28">
      {/* Ambient teal glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(0,111,104,0.1),transparent_70%)]" />
      {/* Dot grid pattern — matching hero */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <Container className="relative">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
          className="mb-16 max-w-2xl"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
            Setup
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
            {t('title')}
          </h2>
        </motion.div>

        {/* Steps grid with connecting arrows */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={defaultViewport}
          className="grid gap-6 md:grid-cols-3"
        >
          {steps.map((i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="group relative"
            >
              <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/[0.05]">
                {/* Step number with glow */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 font-serif text-xl font-bold text-brand-primary">
                      {t(`steps.${i}.number`)}
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-brand-primary/20 blur-lg opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </div>

                <h3 className="mb-3 text-base font-semibold leading-snug text-white">
                  {t(`steps.${i}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-white/40">
                  {t(`steps.${i}.description`)}
                </p>

                {/* Duration badge */}
                <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/30">
                  <Clock className="h-3 w-3" />
                  {t(`steps.${i}.duration`)}
                </div>
              </div>

              {/* Connector arrow between cards (desktop) */}
              {i < 2 && (
                <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 md:block">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-surface-dark">
                    <ArrowRight className="h-3 w-3 text-brand-primary/60" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
