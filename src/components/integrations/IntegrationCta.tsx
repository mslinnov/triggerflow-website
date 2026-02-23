'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container, ButtonLink } from '@/components/ui';
import { fadeInUp, defaultViewport } from '@/lib/animations';

export function IntegrationCta() {
  const t = useTranslations('mewsIntegration.ctaFinal');

  return (
    <section className="relative overflow-hidden bg-surface-dark py-24 md:py-32">
      {/* Rich layered glows */}
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(0,111,104,0.18),transparent_70%)]" />
      <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] bg-[radial-gradient(ellipse,rgba(255,207,162,0.06),transparent_70%)]" />
      <div className="absolute left-1/4 top-0 h-[200px] w-[200px] bg-[radial-gradient(ellipse,rgba(0,111,104,0.08),transparent_70%)]" />

      {/* Dot grid — consistency with hero */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-serif text-4xl font-bold tracking-tight text-white md:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/45">
            {t('text')}
          </p>
          <div className="mt-10">
            <ButtonLink
              href={t('href')}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              className="group gap-2 shadow-lg shadow-brand-primary/25"
            >
              {t('cta')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm text-white/25">
            {t('alternative')}{' '}
            <a
              href={`mailto:${t('email')}`}
              className="text-white/40 underline underline-offset-4 transition-colors hover:text-white/60"
            >
              {t('email')}
            </a>
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
