'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageCircle, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui';
import { cn } from '@/lib/utils';

const faqItems = ['setup', 'pms', 'customization', 'marketing', 'trial', 'support'] as const;

export function FAQV2() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative overflow-hidden bg-white py-24 md:py-32">
      {/* Background decorations */}
      <div className="absolute -right-64 top-1/4 h-[500px] w-[500px] rounded-full bg-brand-light/30 blur-3xl" />
      <div className="absolute -left-64 bottom-1/4 h-[400px] w-[400px] rounded-full bg-brand-accent/10 blur-3xl" />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left side - Header and CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="sticky top-32">
              <h2 className="font-serif text-4xl font-bold tracking-tight text-brand-dark md:text-5xl">
                {t('title')}
              </h2>
              <p className="mt-4 text-lg text-zinc-600">
                {t('subtitle')}
              </p>

              {/* Contact CTA */}
              <div className="mt-10 rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 font-semibold text-brand-dark">
                  Encore des questions ?
                </h3>
                <p className="mb-4 text-sm text-zinc-600">
                  Notre équipe est disponible pour répondre à toutes vos interrogations.
                </p>
                <a
                  href="mailto:contact@trigger-flow.com"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-brand-primary transition-colors hover:text-brand-dark"
                >
                  Nous contacter
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right side - FAQ items */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div
                    className={cn(
                      'overflow-hidden rounded-2xl border transition-all duration-300',
                      openIndex === index
                        ? 'border-brand-primary/30 bg-brand-light/20 shadow-lg'
                        : 'border-zinc-100 bg-white hover:border-zinc-200 hover:shadow-md'
                    )}
                  >
                    <button
                      onClick={() => toggle(index)}
                      className="flex w-full items-start justify-between p-6 text-left"
                    >
                      <div className="flex items-start gap-4">
                        {/* Number */}
                        <span
                          className={cn(
                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-colors',
                            openIndex === index
                              ? 'bg-brand-primary text-white'
                              : 'bg-zinc-100 text-zinc-400'
                          )}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        {/* Question */}
                        <span className="pr-4 text-lg font-medium text-brand-dark">
                          {t(`items.${item}.question`)}
                        </span>
                      </div>

                      {/* Toggle icon */}
                      <div
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all',
                          openIndex === index
                            ? 'bg-brand-primary text-white'
                            : 'bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200'
                        )}
                      >
                        {openIndex === index ? (
                          <Minus className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="border-t border-brand-primary/10 px-6 pb-6 pt-4">
                            <div className="pl-12 text-zinc-600 leading-relaxed">
                              {t(`items.${item}.answer`)}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
