'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container, ButtonLink } from '@/components/ui';

export function CTASection() {
  const t = useTranslations('ctaSection');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark to-brand-primary/90 py-20 md:py-28">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-primary/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-brand-primary/20 blur-3xl" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
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
              className="group gap-2 bg-white text-brand-dark shadow-lg hover:bg-zinc-100"
            >
              {t('ctaPrimary')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>

            <ButtonLink
              href="mailto:contact@trigger-flow.com"
              variant="ghost"
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50"
            >
              {t('ctaSecondary')}
            </ButtonLink>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
