'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Quote, ArrowRight, Star, Clock, TrendingUp } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui';
import { fadeInUp, staggerContainer, staggerItem, scaleIn, defaultViewport } from '@/lib/animations';

const metrics = [
  { icon: Star, key: 'reviews' },
  { icon: Clock, key: 'timeSaved' },
  { icon: TrendingUp, key: 'otaScore' },
];

export function TestimonialFeatured() {
  const t = useTranslations('testimonialFeatured');
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <motion.div
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
          className="mx-auto max-w-4xl"
        >
          <motion.div
            whileHover={!prefersReducedMotion ? { scale: 1.01, y: -5 } : {}}
            transition={{ type: 'spring', stiffness: 200 }}
            className="rounded-3xl border border-border-light bg-white p-8 shadow-[var(--shadow-lg)] md:p-12 transition-shadow"
          >
            {/* Quote Icon */}
            <motion.div
              variants={scaleIn}
              initial={prefersReducedMotion ? 'visible' : 'hidden'}
              whileInView="visible"
              viewport={defaultViewport}
              className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10"
            >
              <Quote className="h-7 w-7 text-brand-primary" />
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={defaultViewport}
              transition={{ delay: 0.2 }}
              className="text-xl font-medium leading-relaxed text-text-primary md:text-2xl"
            >
              "{t('quote')}"
            </motion.blockquote>

            {/* Author */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={defaultViewport}
              transition={{ delay: 0.3 }}
              className="mt-8 flex items-center gap-4 border-t border-border-light pt-8"
            >
              {/* Avatar placeholder */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-dark text-lg font-bold text-white">
                {t('author.initials')}
              </div>
              <div>
                <p className="font-semibold text-text-primary">{t('author.name')}</p>
                <p className="text-sm text-text-secondary">{t('author.title')}</p>
              </div>
            </motion.div>

            {/* Results Metrics with stagger */}
            <motion.div
              initial={prefersReducedMotion ? 'visible' : 'hidden'}
              whileInView="visible"
              variants={staggerContainer}
              viewport={defaultViewport}
              className="mt-8 grid gap-4 rounded-2xl bg-surface-tertiary p-6 sm:grid-cols-3"
            >
              {metrics.map((metric) => (
                <motion.div
                  key={metric.key}
                  variants={staggerItem}
                  className="text-center"
                >
                  <motion.div
                    className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
                    whileHover={!prefersReducedMotion ? { scale: 1.1 } : {}}
                  >
                    <metric.icon className="h-5 w-5 text-brand-primary" />
                  </motion.div>
                  <p className="text-xl font-bold text-text-primary">{t(`metrics.${metric.key}.value`)}</p>
                  <p className="text-sm text-text-secondary">{t(`metrics.${metric.key}.label`)}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Link */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={defaultViewport}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <Link
                href="/ressources/cas-clients/edgar-hotel-spa"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary transition-colors hover:text-brand-dark"
              >
                {t('cta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
