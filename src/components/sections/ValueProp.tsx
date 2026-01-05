'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Mail, ClipboardList, Gift, Star, Newspaper, Zap, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui';

const bubbles = [
  { labelKey: 'bubbles.welcomeSms', icon: MessageSquare, position: 'top-8 left-4 md:top-12 md:left-8' },
  { labelKey: 'bubbles.preStayEmail', icon: Mail, position: 'top-4 right-4 md:top-8 md:right-12' },
  { labelKey: 'bubbles.satisfactionSurvey', icon: ClipboardList, position: 'bottom-1/3 -left-2 md:left-0' },
  { labelKey: 'bubbles.spaOffer', icon: Gift, position: 'top-1/3 -right-2 md:right-0' },
  { labelKey: 'bubbles.googleReview', icon: Star, position: 'bottom-12 left-8 md:bottom-16 md:left-12' },
  { labelKey: 'bubbles.loyaltyNewsletter', icon: Newspaper, position: 'bottom-8 right-4 md:bottom-12 md:right-8' },
];

export function ValueProp() {
  const t = useTranslations('valueProp');

  return (
    <section className="bg-brand-light/30 py-16 md:py-24">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark md:text-4xl lg:text-[2.75rem]">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Workflow Visual with Bubbles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative mt-12 md:mt-16"
        >
          {/* Floating Bubbles */}
          {bubbles.map((bubble, index) => (
            <motion.div
              key={bubble.labelKey}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`absolute z-10 ${bubble.position}`}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center gap-2 rounded-full border border-white bg-white px-3 py-2 shadow-lg md:px-4 md:py-2.5"
              >
                <bubble.icon className="h-4 w-4 text-brand-primary" />
                <span className="text-xs font-medium text-brand-dark md:text-sm">{t(bubble.labelKey)}</span>
              </motion.div>
            </motion.div>
          ))}

          {/* Central Workflow Mockup */}
          <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl md:p-8">
            {/* Workflow Header */}
            <div className="mb-6 flex items-center justify-between border-b border-zinc-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-dark">{t('workflow.title')}</h3>
                  <p className="text-xs text-zinc-500">{t('workflow.subtitle')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1">
                <div className="h-2 w-2 animate-pulse rounded-full bg-brand-primary" />
                <span className="text-xs font-medium text-brand-primary">{t('workflow.active')}</span>
              </div>
            </div>

            {/* Workflow Steps */}
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
              {/* Trigger */}
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand-dark shadow-lg">
                  <span className="text-2xl">🏨</span>
                </div>
                <p className="mt-2 text-sm font-medium text-brand-dark">{t('workflow.trigger')}</p>
                <p className="text-xs text-zinc-500">{t('workflow.triggerDesc')}</p>
              </div>

              {/* Arrow */}
              <div className="flex items-center">
                <div className="h-0.5 w-8 bg-zinc-200 md:w-12" />
                <ChevronRight className="h-5 w-5 text-zinc-300" />
              </div>

              {/* Condition */}
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-amber-100 shadow-lg">
                  <span className="text-2xl">❓</span>
                </div>
                <p className="mt-2 text-sm font-medium text-brand-dark">{t('workflow.condition')}</p>
                <p className="text-xs text-zinc-500">{t('workflow.conditionDesc')}</p>
              </div>

              {/* Arrow */}
              <div className="flex items-center">
                <div className="h-0.5 w-8 bg-zinc-200 md:w-12" />
                <ChevronRight className="h-5 w-5 text-zinc-300" />
              </div>

              {/* Action */}
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand-primary shadow-lg">
                  <span className="text-2xl">📱</span>
                </div>
                <p className="mt-2 text-sm font-medium text-brand-dark">{t('workflow.action')}</p>
                <p className="text-xs text-zinc-500">{t('workflow.actionDesc')}</p>
              </div>
            </div>

            {/* Example triggers */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 border-t border-zinc-100 pt-4">
              {['Check-in', 'J-3', 'Check-out +1', 'VIP', 'Anniversaire'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <a
            href="#examples"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary transition-colors hover:text-brand-dark"
          >
            {t('cta')}
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
