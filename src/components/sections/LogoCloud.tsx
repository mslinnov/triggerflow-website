'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Building2, TrendingUp, Heart, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui';
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';

const logos = [
  { name: 'Accor', src: '/images/logo-accor.webp' },
  { name: 'Sofitel', src: '/images/logo-sofitel.webp' },
  { name: 'Ibis', src: '/images/logo-ibis.webp' },
  { name: 'Best Western', src: '/images/logo-bestwestern.webp' },
  { name: 'Les Hôtels Très Particuliers', src: '/images/logo-hotels.webp' },
  { name: 'Saint James', src: '/images/logo-saintjames.webp' },
];

const metrics = [
  {
    icon: Building2,
    value: '200+',
    labelKey: 'metrics.hotels',
  },
  {
    icon: TrendingUp,
    value: '+17%',
    labelKey: 'metrics.basket',
  },
  {
    icon: Heart,
    value: '+80%',
    labelKey: 'metrics.satisfaction',
  },
];

export function LogoCloud() {
  const t = useTranslations('logoCloud');
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="border-y border-zinc-100 bg-white py-12 md:py-16">
      <Container>
        {/* Title */}
        <motion.p
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
          className="text-center text-sm font-medium uppercase tracking-wider text-zinc-500"
        >
          {t('title')}
        </motion.p>

        {/* Logos with stagger */}
        <motion.div
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          variants={staggerContainer}
          viewport={defaultViewport}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 grayscale opacity-60"
        >
          {logos.map((logo) => (
            <motion.div
              key={logo.name}
              variants={staggerItem}
              className="flex h-10 items-center"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={120}
                height={40}
                className="h-8 w-auto object-contain md:h-10"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Metrics Cards with stagger */}
        <motion.div
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          variants={staggerContainer}
          viewport={defaultViewport}
          className="mt-12 grid gap-4 sm:grid-cols-3"
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.labelKey}
              variants={staggerItem}
              whileHover={!prefersReducedMotion ? { scale: 1.02, y: -3 } : {}}
              className="flex items-center gap-4 rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 md:p-5 transition-shadow hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10">
                <metric.icon className="h-6 w-6 text-brand-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-dark md:text-3xl">{metric.value}</p>
                <p className="text-sm text-zinc-600">{t(metric.labelKey)}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Link to testimonials */}
        <motion.div
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
          className="mt-8 text-center"
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary transition-colors hover:text-brand-dark"
            whileHover={!prefersReducedMotion ? { x: 3 } : {}}
          >
            {t('cta')}
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
}
