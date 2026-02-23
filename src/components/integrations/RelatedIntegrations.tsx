'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui';
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';

export function RelatedIntegrations() {
  const t = useTranslations('mewsIntegration.relatedIntegrations');
  const locale = useLocale();

  const items = Array.from({ length: 6 }, (_, i) => ({
    label: t(`items.${i}.label`),
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
    href: `/${locale}${t(`items.${i}.href`)}`,
  }));

  return (
    <section className="relative bg-surface-secondary py-20 md:py-28">
      {/* Subtle top separator */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />

      <Container>
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
          className="mb-12"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
            Ecosystem
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            {t('title')}
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={defaultViewport}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              variants={staggerItem}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-2xl border border-border-default bg-white p-6 transition-all duration-200 hover:border-brand-primary/20 hover:shadow-lg"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              {/* Hover gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-primary/[0.02] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                    {item.label}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-text-muted/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-primary" />
                </div>
                <h3 className="font-semibold text-text-primary transition-colors group-hover:text-brand-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {item.description}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
