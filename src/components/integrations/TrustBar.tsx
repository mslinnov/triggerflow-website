'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, Globe, Headphones } from 'lucide-react';
import { Container } from '@/components/ui';
import { fadeInUp, defaultViewport } from '@/lib/animations';

const badgeIcons = [Shield, Globe, Headphones] as const;
const badgeKeys = ['gdpr', 'eu', 'support'] as const;

export function TrustBar() {
  const t = useTranslations('mewsIntegration.trustBar');

  const stats = ['hotels', 'openRate', 'setup'] as const;

  return (
    <section className="relative border-b border-border-light bg-white py-10 md:py-14">
      {/* Subtle top gradient connecting hero to trust */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />

      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
          className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
        >
          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
            {stats.map((key, i) => (
              <div key={key} className="group relative flex flex-col items-center md:items-start">
                <span className="font-serif text-3xl font-bold tracking-tight text-brand-dark transition-colors group-hover:text-brand-primary md:text-4xl">
                  {t(`stats.${key}.value`)}
                </span>
                <span className="mt-1 text-xs tracking-wide text-text-muted">
                  {t(`stats.${key}.label`)}
                </span>
                {i < stats.length - 1 && (
                  <div className="absolute -right-5 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-border-light md:block lg:-right-7" />
                )}
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {badgeKeys.map((key, i) => {
              const Icon = badgeIcons[i];
              return (
                <div
                  key={key}
                  className="flex items-center gap-2 rounded-full border border-border-light bg-surface-secondary px-3.5 py-2 text-xs text-text-secondary transition-colors hover:border-brand-primary/20 hover:bg-brand-primary/[0.03]"
                >
                  <Icon className="h-3.5 w-3.5 text-brand-primary/60" />
                  {t(`badges.${key}`)}
                </div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
