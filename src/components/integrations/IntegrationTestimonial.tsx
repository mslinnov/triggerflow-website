'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Container } from '@/components/ui';
import { fadeInUp, defaultViewport } from '@/lib/animations';

export function IntegrationTestimonial() {
  const t = useTranslations('mewsIntegration.testimonial');
  const stars = Number(t('stars'));

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Rich background — layered gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#F7FAFA_0%,#EFF5F5_50%,#F7FAFA_100%)]" />
      <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-[radial-gradient(ellipse,rgba(0,111,104,0.06),transparent_70%)]" />
      <div className="absolute bottom-0 left-0 h-[300px] w-[300px] bg-[radial-gradient(ellipse,rgba(255,207,162,0.06),transparent_70%)]" />

      {/* Decorative large quote mark — background element */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[20rem] font-bold leading-none text-brand-primary/[0.03]">
        &ldquo;
      </div>

      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Quote icon */}
          <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10">
            <Quote className="h-6 w-6 text-brand-primary" />
          </div>

          {/* Stars */}
          <div className="mb-6 flex items-center justify-center gap-1">
            {Array.from({ length: stars }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-brand-accent text-brand-accent" />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="font-serif text-xl font-medium leading-relaxed text-text-primary md:text-2xl lg:text-[1.75rem] lg:leading-relaxed">
            &ldquo;{t('quote')}&rdquo;
          </blockquote>

          {/* Author line */}
          <div className="mt-10 flex flex-col items-center gap-1">
            <div className="mb-4 h-px w-12 bg-border-default" />
            <p className="text-sm font-semibold text-text-primary">{t('author')}</p>
            <p className="text-xs tracking-wide text-text-muted">{t('context')}</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
