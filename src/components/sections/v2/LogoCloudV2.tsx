'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Building2, TrendingUp, Heart } from 'lucide-react';
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
    label: 'hôtels équipés',
    accent: 'from-brand-primary to-emerald-500',
  },
  {
    icon: TrendingUp,
    value: '+17%',
    label: 'de panier moyen',
    accent: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Heart,
    value: '+80%',
    label: 'de satisfaction',
    accent: 'from-rose-500 to-orange-500',
  },
];

export function LogoCloudV2() {
  const t = useTranslations('logoCloud');

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/80 to-white" />

      {/* Decorative elements */}
      <div className="absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand-primary/5 blur-3xl" />
      <div className="absolute -right-32 top-1/4 h-48 w-48 rounded-full bg-brand-accent/10 blur-3xl" />

      <Container className="relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="inline-block rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            {t('title')}
          </span>
        </motion.div>

        {/* Infinite marquee logos */}
        <div className="relative mb-16">
          {/* Gradient masks */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="flex shrink-0 items-center gap-16"
            >
              {/* Double the logos for seamless loop */}
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex h-16 w-32 shrink-0 items-center justify-center opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={120}
                    height={48}
                    className="h-auto max-h-12 w-auto object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Metrics with modern card design */}
        <div className="grid gap-6 md:grid-cols-3">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-xl"
            >
              {/* Gradient accent on hover */}
              <div className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${metric.accent} opacity-0 blur-3xl transition-opacity group-hover:opacity-20`} />

              <div className="relative">
                {/* Icon */}
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${metric.accent} shadow-lg`}>
                  <metric.icon className="h-7 w-7 text-white" />
                </div>

                {/* Value */}
                <div className="mb-2">
                  <span className="font-serif text-5xl font-bold tracking-tight text-brand-dark md:text-6xl">
                    {metric.value}
                  </span>
                </div>

                {/* Label */}
                <p className="text-lg text-zinc-500">{metric.label}</p>
              </div>

              {/* Decorative corner */}
              <div className="absolute -bottom-2 -right-2 h-16 w-16 rounded-tl-3xl border-l border-t border-zinc-100 bg-zinc-50/50" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
