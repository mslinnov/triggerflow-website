'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Quote, ArrowRight, Star, Clock, TrendingUp } from 'lucide-react';
import { Container } from '@/components/ui';

const metrics = [
  { icon: Star, key: 'reviews' },
  { icon: Clock, key: 'timeSaved' },
  { icon: TrendingUp, key: 'otaScore' },
];

export function TestimonialFeatured() {
  const t = useTranslations('testimonialFeatured');

  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl"
        >
          <div className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-xl md:p-12">
            {/* Quote Icon */}
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10">
              <Quote className="h-7 w-7 text-brand-primary" />
            </div>

            {/* Quote */}
            <blockquote className="text-xl font-medium leading-relaxed text-brand-dark md:text-2xl">
              "{t('quote')}"
            </blockquote>

            {/* Author */}
            <div className="mt-8 flex items-center gap-4 border-t border-zinc-100 pt-8">
              {/* Avatar placeholder */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-dark text-lg font-bold text-white">
                {t('author.initials')}
              </div>
              <div>
                <p className="font-semibold text-brand-dark">{t('author.name')}</p>
                <p className="text-sm text-zinc-600">{t('author.title')}</p>
              </div>
            </div>

            {/* Results Metrics */}
            <div className="mt-8 grid gap-4 rounded-2xl bg-brand-light/50 p-6 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.key} className="text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                    <metric.icon className="h-5 w-5 text-brand-primary" />
                  </div>
                  <p className="text-xl font-bold text-brand-dark">{t(`metrics.${metric.key}.value`)}</p>
                  <p className="text-sm text-zinc-600">{t(`metrics.${metric.key}.label`)}</p>
                </div>
              ))}
            </div>

            {/* CTA Link */}
            <div className="mt-8 text-center">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary transition-colors hover:text-brand-dark"
              >
                {t('cta')}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
