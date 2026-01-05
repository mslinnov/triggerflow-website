'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Building2, TrendingUp, Heart, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui';

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

  return (
    <section className="border-y border-zinc-100 bg-white py-12 md:py-16">
      <Container>
        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm font-medium uppercase tracking-wider text-zinc-500"
        >
          {t('title')}
        </motion.p>

        {/* Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 grayscale opacity-60"
        >
          {logos.map((logo) => (
            <div key={logo.name} className="flex h-10 items-center">
              <Image
                src={logo.src}
                alt={logo.name}
                width={120}
                height={40}
                className="h-8 w-auto object-contain md:h-10"
              />
            </div>
          ))}
        </motion.div>

        {/* Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid gap-4 sm:grid-cols-3"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.labelKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-4 rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 md:p-5"
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary transition-colors hover:text-brand-dark"
          >
            {t('cta')}
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
