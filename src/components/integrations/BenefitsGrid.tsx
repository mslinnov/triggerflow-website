'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Star, Repeat, Gift } from 'lucide-react';
import { Container } from '@/components/ui';
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';

const benefitIcons = [Mail, Star, Repeat, Gift];
const benefitAccents = [
  {
    bg: 'bg-gradient-to-br from-brand-primary/[0.07] to-brand-primary/[0.02]',
    border: 'border-brand-primary/10 hover:border-brand-primary/25',
    icon: 'text-brand-primary bg-brand-primary/10',
    number: 'text-brand-primary/10',
    glow: 'group-hover:shadow-[0_8px_40px_rgba(0,111,104,0.10)]',
  },
  {
    bg: 'bg-gradient-to-br from-amber-50/80 to-amber-50/30',
    border: 'border-amber-200/30 hover:border-amber-300/50',
    icon: 'text-amber-600 bg-amber-100',
    number: 'text-amber-200/40',
    glow: 'group-hover:shadow-[0_8px_40px_rgba(217,170,76,0.08)]',
  },
  {
    bg: 'bg-gradient-to-br from-sky-50/80 to-sky-50/30',
    border: 'border-sky-200/30 hover:border-sky-300/50',
    icon: 'text-sky-600 bg-sky-100',
    number: 'text-sky-200/40',
    glow: 'group-hover:shadow-[0_8px_40px_rgba(56,152,210,0.08)]',
  },
  {
    bg: 'bg-gradient-to-br from-brand-accent-light/80 to-brand-accent-light/30',
    border: 'border-brand-accent/20 hover:border-brand-accent/40',
    icon: 'text-brand-dark bg-brand-accent-light',
    number: 'text-brand-accent/20',
    glow: 'group-hover:shadow-[0_8px_40px_rgba(255,207,162,0.12)]',
  },
];

export function BenefitsGrid() {
  const t = useTranslations('mewsIntegration.benefits');

  return (
    <section className="relative py-20 md:py-28">
      {/* Subtle background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,43,40,0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <Container className="relative">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
          className="mb-14 max-w-2xl"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
            Mews + TriggerFlow
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-[2.75rem]">
            {t('title')}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={defaultViewport}
          className="grid gap-5 sm:grid-cols-2"
        >
          {[0, 1, 2, 3].map((i) => {
            const Icon = benefitIcons[i];
            const accent = benefitAccents[i];
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className={`group relative overflow-hidden rounded-2xl border p-7 transition-all duration-300 md:p-8 ${accent.bg} ${accent.border} ${accent.glow}`}
              >
                {/* Background number watermark */}
                <span className={`pointer-events-none absolute -right-2 -top-4 select-none font-serif text-[7rem] font-bold leading-none ${accent.number}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative">
                  <div className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${accent.icon}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-text-primary">
                    {t(`items.${i}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {t(`items.${i}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
