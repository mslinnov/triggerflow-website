'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Container, SectionHeader } from '@/components/ui';
import { cn } from '@/lib/utils';

const faqItems = ['setup', 'pms', 'customization', 'marketing', 'trial', 'support'] as const;

export function FAQ() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-16 md:py-24">
      <Container>
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="overflow-hidden rounded-xl border border-border-light bg-surface-tertiary shadow-[var(--shadow-sm)]"
            >
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <span className="pr-4 font-medium text-text-primary">
                  {t(`items.${item}.question`)}
                </span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 shrink-0 text-brand-primary transition-transform duration-200',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="border-t border-border-light bg-white px-5 pb-5 pt-4 text-text-secondary">
                      {t(`items.${item}.answer`)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <a
            href="mailto:contact@trigger-flow.com"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary transition-colors hover:text-brand-dark"
          >
            {t('contactCta')}
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
