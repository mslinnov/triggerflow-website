'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container, ButtonLink } from '@/components/ui';

export function CTASection() {
  const t = useTranslations('ctaSection');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark to-brand-primary/80 py-20 md:py-28">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-primary/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-brand-primary/20 blur-3xl" />
        {/* Accent glow behind title area */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-96 rounded-full bg-brand-accent/10 blur-3xl" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative text-center"
        >
          <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            {t('subtitle')}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink
              href="https://app.lemcal.com/@trigger-flow/demo"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
              className="group gap-2 bg-white text-brand-dark shadow-lg hover:bg-brand-accent"
            >
              {t('ctaPrimary')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>

            <ButtonLink
              href="mailto:contact@trigger-flow.com"
              variant="ghost"
              size="lg"
              className="border-2 border-white/30 text-white hover:border-white/50 hover:bg-white/10"
            >
              {t('ctaSecondary')}
            </ButtonLink>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
