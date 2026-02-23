'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeftRight, ArrowRight, Users, CalendarDays, CreditCard, BedDouble, StickyNote, Building2, Tag } from 'lucide-react';
import { Container } from '@/components/ui';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';

const directionConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  bidirectional: {
    icon: <ArrowLeftRight className="h-3.5 w-3.5" />,
    color: 'text-brand-primary bg-brand-primary/10 border-brand-primary/20',
  },
  fromMews: {
    icon: <ArrowRight className="h-3.5 w-3.5" />,
    color: 'text-sky-600 bg-sky-50 border-sky-200',
  },
  toMews: {
    icon: <ArrowRight className="h-3.5 w-3.5 rotate-180" />,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
  },
};

const categoryIcons = [Users, CalendarDays, CreditCard, BedDouble, StickyNote, Building2, Tag];

export function DataSyncTable() {
  const t = useTranslations('mewsIntegration.dataSync');

  const rows = Array.from({ length: 7 }, (_, i) => ({
    category: t(`rows.${i}.category`),
    detail: t(`rows.${i}.detail`),
    direction: t(`rows.${i}.direction`),
    usage: t(`rows.${i}.usage`),
  }));

  return (
    <section id="data-sync" className="relative scroll-mt-20 py-20 md:py-28">
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-surface-secondary/30 to-white" />

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
            Sync API
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-[2.75rem]">
            {t('title')}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Desktop — refined data grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={defaultViewport}
          className="hidden md:block"
        >
          <div className="overflow-hidden rounded-2xl border border-border-default bg-white" style={{ boxShadow: 'var(--shadow-md)' }}>
            <table className="w-full">
              <caption className="sr-only">{t('caption')}</caption>
              <thead>
                <tr className="border-b border-border-light bg-surface-secondary">
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.1em] text-text-muted">
                    {t('columns.category')}
                  </th>
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.1em] text-text-muted">
                    {t('columns.detail')}
                  </th>
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.1em] text-text-muted">
                    {t('columns.direction')}
                  </th>
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.1em] text-text-muted">
                    {t('columns.usage')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const Icon = categoryIcons[i];
                  const dir = directionConfig[row.direction];
                  return (
                    <motion.tr
                      key={i}
                      variants={staggerItem}
                      className="group border-b border-border-light/60 transition-colors last:border-0 hover:bg-brand-primary/[0.02]"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-secondary text-text-muted transition-colors group-hover:bg-brand-primary/10 group-hover:text-brand-primary">
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-semibold text-text-primary">{row.category}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-text-secondary">{row.detail}</td>
                      <td className="px-6 py-5">
                        <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium', dir.color)}>
                          {dir.icon}
                          {t(`directions.${row.direction}`)}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm text-text-muted">{row.usage}</td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={defaultViewport}
          className="space-y-3 md:hidden"
        >
          {rows.map((row, i) => {
            const Icon = categoryIcons[i];
            const dir = directionConfig[row.direction];
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                className="rounded-xl border border-border-default bg-white p-4"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-secondary text-text-muted">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm font-semibold text-text-primary">{row.category}</span>
                  </div>
                  <span className={cn('inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium', dir.color)}>
                    {dir.icon}
                    {t(`directions.${row.direction}`)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-text-secondary">{row.detail}</p>
                <p className="mt-2 text-xs text-text-muted">{row.usage}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Technical note */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
        >
          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-text-muted/70">
            {t('technicalNote')}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
