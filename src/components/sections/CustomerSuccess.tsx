'use client';

import { useTranslations } from 'next-intl';
import { motion, type Variants } from 'framer-motion';
import { Rocket, Headphones, GraduationCap, UserCheck, Star } from 'lucide-react';
import { Container, Badge } from '@/components/ui';
import { fadeInUp, defaultViewport } from '@/lib/animations';

const items = [
  { key: 'onboarding', icon: Rocket },
  { key: 'support', icon: Headphones },
  { key: 'training', icon: GraduationCap },
  { key: 'csm', icon: UserCheck },
] as const;

const columnStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function CustomerSuccess() {
  const t = useTranslations('customerSuccess');

  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mx-auto mb-10 max-w-2xl text-center md:mb-14"
        >
          <Badge variant="primary" className="mb-4">
            {t('badge')}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-3 text-base text-text-secondary md:text-lg">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={columnStagger}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5"
        >
          {items.map((item) => (
            <motion.div
              key={item.key}
              variants={cardReveal}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-border-light bg-white p-5 shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-md)]"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/8">
                <item.icon className="h-5 w-5 text-brand-primary" />
              </div>
              <h3 className="text-base font-bold text-text-primary">
                {t(`items.${item.key}.title`)}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                {t(`items.${item.key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Satisfaction badge */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mt-10 flex justify-center md:mt-12"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-accent/60 bg-brand-accent-light/60 px-5 py-2.5">
            <Star className="h-4.5 w-4.5 fill-brand-accent text-brand-accent" />
            <span className="text-sm font-semibold text-brand-dark">
              {t('satisfaction.value')}
            </span>
            <span className="text-sm text-text-secondary">
              {t('satisfaction.label')}
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
