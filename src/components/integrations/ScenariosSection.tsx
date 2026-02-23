'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Container, ButtonLink } from '@/components/ui';
import { fadeInUp, defaultViewport } from '@/lib/animations';
import { ScenarioCard } from './ScenarioCard';

export function ScenariosSection() {
  const t = useTranslations('mewsIntegration.scenarios');

  const scenarios = Array.from({ length: 3 }, (_, i) => {
    const timeline = Array.from({ length: 3 }, (_, j) => ({
      day: t(`items.${i}.timeline.${j}.day`),
      description: t(`items.${i}.timeline.${j}.description`),
    }));

    return {
      badge: t(`items.${i}.badge`),
      title: t(`items.${i}.title`),
      context: t(`items.${i}.context`),
      timeline,
      result: t(`items.${i}.result`),
    };
  });

  return (
    <section className="bg-surface-secondary py-20 md:py-28">
      <Container>
        {/* Section header — left-aligned editorial */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
          className="mb-14 max-w-2xl"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
            Use cases
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-[2.75rem]">
            {t('title')}
          </h2>
        </motion.div>

        {/* Scenarios + mid-CTAs */}
        <div className="space-y-6">
          <ScenarioCard {...scenarios[0]} index={0} />

          {/* CTA Mid 1 — subtle inline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
            className="flex justify-center py-4"
          >
            <ButtonLink
              href={t('ctaMid1.href')}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="md"
              className="group gap-2"
            >
              {t('ctaMid1.text')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </motion.div>

          <ScenarioCard {...scenarios[1]} index={1} />

          <ScenarioCard {...scenarios[2]} index={2} />

          {/* CTA Mid 2 — standout card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
            className="mx-auto max-w-2xl"
          >
            <div className="relative overflow-hidden rounded-2xl bg-surface-dark p-8 text-center md:p-10">
              {/* Ambient glow */}
              <div className="absolute top-0 right-0 h-40 w-40 bg-[radial-gradient(ellipse,rgba(0,111,104,0.3),transparent_70%)]" />
              <div className="absolute bottom-0 left-0 h-32 w-32 bg-[radial-gradient(ellipse,rgba(255,207,162,0.1),transparent_70%)]" />

              <p className="relative font-serif text-lg font-semibold text-white md:text-xl">
                {t('ctaMid2.title')}
              </p>
              <div className="relative mt-5">
                <ButtonLink
                  href={t('ctaMid2.href')}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                  className="group gap-2"
                >
                  {t('ctaMid2.cta')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </ButtonLink>
              </div>
              <p className="relative mt-4 text-sm text-white/40">
                {t('ctaMid2.note')}{' '}
                <Link href={t('ctaMid2.noteHref')} className="font-medium text-brand-primary transition-colors hover:text-brand-primary/80">
                  {t('ctaMid2.noteLink')}
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
