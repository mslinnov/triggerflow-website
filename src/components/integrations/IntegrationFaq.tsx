'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { fadeInUp, defaultViewport } from '@/lib/animations';

export function IntegrationFaq() {
  const t = useTranslations('mewsIntegration.faq');

  const items = Array.from({ length: 6 }, (_, i) => ({
    question: t(`items.${i}.question`),
    answer: t(`items.${i}.answer`),
  }));

  return (
    <section className="bg-white py-20 md:py-28" role="region" aria-labelledby="mews-faq-title">
      <Container>
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
            className="mb-12"
          >
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
              FAQ
            </span>
            <h2 id="mews-faq-title" className="font-serif text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              {t('title')}
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
          >
            <FaqAccordion items={items} />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
