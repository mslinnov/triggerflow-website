'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Mail, FileText, MessageSquare, Gift, Star, ShoppingBag, Check } from 'lucide-react';
import { Container } from '@/components/ui';
import {
  EmailConfirmationMockup,
  SMSConversationMockup,
  ReviewRequestMockup,
} from '@/components/mockups';
import { fadeInUp, defaultViewport } from '@/lib/animations';

const stages = [
  {
    key: 'before',
    number: '01',
    MockupComponent: EmailConfirmationMockup,
    actions: [
      { key: 'confirmation', icon: Mail },
      { key: 'prestay', icon: FileText },
    ],
  },
  {
    key: 'during',
    number: '02',
    MockupComponent: SMSConversationMockup,
    actions: [
      { key: 'welcome', icon: MessageSquare },
      { key: 'upsell', icon: ShoppingBag },
    ],
  },
  {
    key: 'after',
    number: '03',
    MockupComponent: ReviewRequestMockup,
    actions: [
      { key: 'review', icon: Star },
      { key: 'loyalty', icon: Gift },
    ],
  },
];

export function JourneyTimeline() {
  const t = useTranslations('journeyTimeline');
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineProgress = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

  return (
    <section ref={containerRef} className="bg-zinc-50 py-16 md:py-24 overflow-hidden">
      <Container>
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark md:text-4xl lg:text-[2.75rem]">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          {/* Timeline line container */}
          <div className="relative mb-8">
            {/* Background line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-zinc-200 rounded-full" />

            {/* Animated progress line */}
            <motion.div
              className="absolute top-8 left-0 h-1 bg-brand-primary rounded-full origin-left"
              style={{ scaleX: prefersReducedMotion ? 1 : lineProgress }}
            />

            {/* Stage circles */}
            <div className="relative flex justify-between px-16">
              {stages.map((stage, index) => {
                const stageProgress = useTransform(
                  scrollYProgress,
                  [0.2 + index * 0.15, 0.35 + index * 0.15],
                  [0, 1]
                );

                return (
                  <motion.div
                    key={stage.key}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={defaultViewport}
                    transition={{ delay: index * 0.2 }}
                  >
                    {/* Circle */}
                    <motion.div
                      className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-primary bg-white text-2xl font-bold text-brand-primary shadow-lg z-10"
                      whileHover={{ scale: 1.1 }}
                      style={{
                        backgroundColor: prefersReducedMotion
                          ? index === 0
                            ? '#006F68'
                            : 'white'
                          : undefined,
                        color: prefersReducedMotion
                          ? index === 0
                            ? 'white'
                            : '#006F68'
                          : undefined,
                      }}
                    >
                      {!prefersReducedMotion && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-brand-primary"
                          style={{ scale: stageProgress }}
                        />
                      )}
                      <span className="relative z-10">{stage.number}</span>

                      {/* Pulse effect */}
                      {!prefersReducedMotion && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-brand-primary"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3,
                          }}
                        />
                      )}
                    </motion.div>

                    {/* Stage title */}
                    <h3 className="mt-4 text-lg font-bold text-brand-dark uppercase tracking-wide">
                      {t(`stages.${stage.key}.title`)}
                    </h3>
                    <p className="text-sm text-zinc-500">
                      {t(`stages.${stage.key}.subtitle`)}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Cards and Mockups */}
          <div className="grid grid-cols-3 gap-6 px-4">
            {stages.map((stage, stageIndex) => (
              <motion.div
                key={stage.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{ delay: 0.3 + stageIndex * 0.15 }}
                className="flex flex-col items-center"
              >
                {/* Phone Mockup */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={defaultViewport}
                  transition={{ delay: 0.5 + stageIndex * 0.2 }}
                  className="mb-6"
                >
                  <div className="scale-[0.6] origin-top">
                    <stage.MockupComponent />
                  </div>
                </motion.div>

                {/* Action cards */}
                <div className="space-y-2 w-full">
                  {stage.actions.map((action, actionIndex) => (
                    <motion.div
                      key={action.key}
                      className="flex items-center gap-3 rounded-xl bg-white p-3 transition-all hover:shadow-lg hover:-translate-y-1 border border-zinc-100"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={defaultViewport}
                      transition={{ delay: 0.6 + stageIndex * 0.2 + actionIndex * 0.1 }}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
                        <action.icon className="h-4 w-4 text-brand-primary" />
                      </div>
                      <span className="text-sm font-medium text-brand-dark">
                        {t(`stages.${stage.key}.actions.${action.key}`)}
                      </span>
                      <Check className="ml-auto h-4 w-4 text-green-500" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tablet Timeline */}
        <div className="hidden md:block lg:hidden">
          <div className="space-y-12">
            {stages.map((stage, stageIndex) => (
              <motion.div
                key={stage.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{ delay: stageIndex * 0.15 }}
                className="flex gap-8 items-start"
              >
                {/* Left: Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary text-white text-lg font-bold">
                      {stage.number}
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-dark uppercase">
                        {t(`stages.${stage.key}.title`)}
                      </h3>
                      <p className="text-sm text-zinc-500">
                        {t(`stages.${stage.key}.subtitle`)}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 ml-14">
                    {stage.actions.map((action) => (
                      <div
                        key={action.key}
                        className="flex items-center gap-3 rounded-lg bg-white p-3 border border-zinc-100"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-primary/10">
                          <action.icon className="h-4 w-4 text-brand-primary" />
                        </div>
                        <span className="text-sm font-medium text-brand-dark">
                          {t(`stages.${stage.key}.actions.${action.key}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Phone Mockup */}
                <div className="scale-[0.6] origin-top-right">
                  <stage.MockupComponent />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline (vertical) */}
        <div className="md:hidden">
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-zinc-200" />
            <motion.div
              className="absolute left-3 top-0 w-0.5 bg-brand-primary origin-top"
              style={{
                height: '100%',
                scaleY: prefersReducedMotion ? 1 : lineProgress,
              }}
            />

            {/* Stages */}
            <div className="space-y-10">
              {stages.map((stage, stageIndex) => (
                <motion.div
                  key={stage.key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={defaultViewport}
                  transition={{ delay: stageIndex * 0.2 }}
                >
                  {/* Circle and title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="absolute left-0 flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary text-white text-sm font-bold shadow-md">
                      {stage.number}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-brand-dark uppercase text-sm">
                        {t(`stages.${stage.key}.title`)}
                      </h3>
                      <p className="text-xs text-zinc-500">
                        {t(`stages.${stage.key}.subtitle`)}
                      </p>
                    </div>
                  </div>

                  {/* Phone Mockup - centered */}
                  <div className="flex justify-center mb-4 ml-4">
                    <div className="scale-[0.5] origin-top">
                      <stage.MockupComponent />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 ml-4">
                    {stage.actions.map((action, actionIndex) => (
                      <motion.div
                        key={action.key}
                        className="flex items-center gap-3 rounded-lg bg-white p-3 border border-zinc-100"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={defaultViewport}
                        transition={{ delay: 0.3 + actionIndex * 0.1 }}
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-primary/10">
                          <action.icon className="h-4 w-4 text-brand-primary" />
                        </div>
                        <span className="text-sm font-medium text-brand-dark">
                          {t(`stages.${stage.key}.actions.${action.key}`)}
                        </span>
                      </motion.div>
                    ))}
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
