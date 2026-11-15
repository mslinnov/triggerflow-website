'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { Clock, UserCheck, TrendingUp, Star } from 'lucide-react';
import { Container } from '@/components/ui';
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';

function CountUp({ end, duration = 1.5 }: { end: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  const animate = useCallback(() => {
    if (prefersReducedMotion) {
      setDisplayValue(end);
      return;
    }
    const startTime = performance.now();
    const durationMs = duration * 1000;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [end, duration, prefersReducedMotion]);

  useEffect(() => {
    if (isInView) animate();
  }, [isInView, animate]);

  return <span ref={ref}>{displayValue}</span>;
}

const logos = [
  { name: 'Accor', src: '/images/logo-accor.webp' },
  { name: 'Sofitel', src: '/images/logo-sofitel.webp' },
  { name: 'Ibis', src: '/images/logo-ibis.webp' },
  { name: 'Best Western', src: '/images/logo-bestwestern.webp' },
  { name: 'Les Hôtels Très Particuliers', src: '/images/logo-hotels.webp' },
  { name: 'Saint James', src: '/images/logo-saintjames.webp' },
];

const kpis = [
  { key: 'timeSaved', icon: Clock },
  { key: 'checkinRate', icon: UserCheck },
  { key: 'upsellRevenue', icon: TrendingUp },
  { key: 'reviewsBoost', icon: Star },
] as const;

export function LogoCloud() {
  const t = useTranslations('logoCloud');
  const tMetrics = useTranslations('resultsMetrics');
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="border-y border-border-light bg-white py-10 md:py-14">
      <Container>
        {/* Title */}
        <motion.p
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
          className="text-center text-sm font-medium uppercase tracking-wider text-text-muted"
        >
          {t('title')}
        </motion.p>

        {/* Logos */}
        <motion.div
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          variants={staggerContainer}
          viewport={defaultViewport}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 grayscale opacity-60"
        >
          {logos.map((logo) => (
            <motion.div key={logo.name} variants={staggerItem} className="flex h-10 items-center">
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

        {/* Animated KPI counters strip */}
        <motion.div
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          variants={staggerContainer}
          viewport={defaultViewport}
          className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-0"
        >
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            const value = parseInt(tMetrics(`metrics.${kpi.key}.value`), 10);
            const hasPrefix = kpi.key === 'upsellRevenue' || kpi.key === 'reviewsBoost';
            const prefix = hasPrefix
              ? tMetrics(`metrics.${kpi.key}.prefix`)
              : undefined;
            const suffix = tMetrics(`metrics.${kpi.key}.suffix`);
            const label = tMetrics(`metrics.${kpi.key}.label`);

            return (
              <motion.div
                key={kpi.key}
                variants={staggerItem}
                className={`flex flex-col items-center text-center px-4 py-2${
                  index < kpis.length - 1 ? ' sm:border-r sm:border-border-light' : ''
                }`}
              >
                <Icon className="mb-2 h-4 w-4 text-brand-primary/40" strokeWidth={1.5} />
                <div className="flex items-baseline gap-0.5">
                  {prefix && (
                    <span className="text-lg font-bold text-brand-primary md:text-xl">
                      {prefix}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-brand-primary md:text-3xl">
                    <CountUp end={value} />
                  </span>
                  {suffix && (
                    <span className="ml-0.5 text-sm font-semibold text-brand-primary md:text-base">
                      {suffix}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-text-muted">{label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
