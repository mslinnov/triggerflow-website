'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Container, Badge } from '@/components/ui';
import { fadeInUp, defaultViewport } from '@/lib/animations';
import { Clock, UserCheck, TrendingUp, Users } from 'lucide-react';

interface CountUpProps {
  end: number;
  duration?: number;
}

function CountUp({ end }: CountUpProps) {
  // Valeur finale rendue côté serveur : jamais de « 0 » au chargement.
  return <span>{end}</span>;
}

const metrics = [
  { key: 'timeSaved', icon: Clock },
  { key: 'checkinRate', icon: UserCheck },
  { key: 'upsellRevenue', icon: TrendingUp },
  { key: 'guestsEngaged', icon: Users },
] as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export function ResultsMetrics() {
  const t = useTranslations('resultsMetrics');

  return (
    <section className="bg-brand-dark py-14 md:py-20">
      <Container>
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mb-12 text-center md:mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 border-white/20 text-white/80"
          >
            {t('badge')}
          </Badge>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white md:text-4xl">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0"
        >
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const value = parseInt(t(`metrics.${metric.key}.value`), 10);
            const prefix = metric.key === 'upsellRevenue'
              ? t('metrics.upsellRevenue.prefix')
              : undefined;
            const suffix = t(`metrics.${metric.key}.suffix`);
            const label = t(`metrics.${metric.key}.label`);

            return (
              <motion.div
                key={metric.key}
                variants={fadeInUp}
                className={
                  'relative flex flex-col items-center text-center px-6 py-2' +
                  (index < metrics.length - 1
                    ? ' lg:border-r lg:border-white/10'
                    : '')
                }
              >
                <Icon className="mb-4 h-5 w-5 text-white/30" strokeWidth={1.5} />
                <div className="flex items-baseline gap-0.5">
                  {prefix && (
                    <span className="text-2xl font-bold text-brand-accent md:text-3xl">
                      {prefix}
                    </span>
                  )}
                  <span className="text-4xl font-bold text-brand-accent md:text-5xl">
                    <CountUp end={value} />
                  </span>
                  {suffix && (
                    <span className="ml-0.5 text-xl font-semibold text-brand-accent md:text-2xl">
                      {suffix}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-white/60">{label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
