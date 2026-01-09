'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Mail, MessageSquare, Star, Plane, Bed, DoorOpen } from 'lucide-react';
import { Container } from '@/components/ui';

const journeyStages = [
  {
    key: 'before',
    number: '01',
    icon: Plane,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    actions: [
      { icon: Mail, label: 'Email de confirmation', status: 'sent' },
      { icon: Mail, label: 'Formulaire pré-séjour', status: 'sent' },
    ],
  },
  {
    key: 'during',
    number: '02',
    icon: Bed,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    actions: [
      { icon: MessageSquare, label: 'SMS de bienvenue', status: 'sent' },
      { icon: MessageSquare, label: 'Offres personnalisées', status: 'pending' },
    ],
  },
  {
    key: 'after',
    number: '03',
    icon: DoorOpen,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    actions: [
      { icon: Star, label: 'Demande d\'avis', status: 'sent' },
      { icon: Mail, label: 'Programme fidélité', status: 'pending' },
    ],
  },
];

export function JourneyV2() {
  const t = useTranslations('journeyTimeline');
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineProgress = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-zinc-50 py-24 md:py-32">
      {/* Background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.05) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Decorative blobs */}
      <div className="absolute -left-48 top-1/4 h-96 w-96 rounded-full bg-brand-primary/5 blur-3xl" />
      <div className="absolute -right-48 bottom-1/4 h-96 w-96 rounded-full bg-brand-accent/5 blur-3xl" />

      <Container className="relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="font-serif text-4xl font-bold tracking-tight text-brand-dark md:text-5xl lg:text-6xl">
            {t('title')}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Timeline - Desktop */}
        <div className="hidden lg:block">
          {/* Horizontal progress line */}
          <div className="relative mb-12 flex items-center justify-between px-16">
            {/* Background line */}
            <div className="absolute left-16 right-16 top-1/2 h-1 -translate-y-1/2 rounded-full bg-zinc-200" />

            {/* Animated progress line */}
            <motion.div
              className="absolute left-16 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500 via-emerald-500 to-amber-500"
              style={{
                width: '75%',
                scaleX: prefersReducedMotion ? 1 : lineProgress,
                transformOrigin: 'left',
              }}
            />

            {/* Stage markers */}
            {journeyStages.map((stage, index) => (
              <motion.div
                key={stage.key}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative z-10"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${stage.color} shadow-xl`}
                >
                  <stage.icon className="h-8 w-8 text-white" />
                </motion.div>

                {/* Pulse ring */}
                <motion.div
                  animate={
                    !prefersReducedMotion
                      ? {
                          scale: [1, 1.4, 1],
                          opacity: [0.5, 0, 0.5],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${stage.color} opacity-30`}
                />
              </motion.div>
            ))}
          </div>

          {/* Stage cards */}
          <div className="grid grid-cols-3 gap-8">
            {journeyStages.map((stage, stageIndex) => (
              <motion.div
                key={stage.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + stageIndex * 0.15 }}
                className={`rounded-3xl border ${stage.borderColor} ${stage.bgColor} p-8`}
              >
                {/* Stage header */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <span className={`bg-gradient-to-r ${stage.color} bg-clip-text text-5xl font-bold text-transparent`}>
                      {stage.number}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-brand-dark">
                      {t(`stages.${stage.key}.title`)}
                    </h3>
                    <p className="text-sm text-zinc-500">
                      {t(`stages.${stage.key}.subtitle`)}
                    </p>
                  </div>
                </div>

                {/* Actions list */}
                <div className="space-y-3">
                  {stage.actions.map((action, actionIndex) => (
                    <motion.div
                      key={action.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + stageIndex * 0.15 + actionIndex * 0.1 }}
                      className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm"
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${stage.color}`}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="flex-1 text-sm font-medium text-brand-dark">
                        {action.label}
                      </span>
                      <div
                        className={`h-2 w-2 rounded-full ${
                          action.status === 'sent' ? 'bg-emerald-500' : 'bg-zinc-300'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline - Mobile/Tablet */}
        <div className="lg:hidden">
          <div className="relative space-y-8 pl-8">
            {/* Vertical line */}
            <div className="absolute bottom-0 left-3 top-0 w-0.5 bg-zinc-200" />
            <motion.div
              className="absolute left-3 top-0 w-0.5 origin-top bg-gradient-to-b from-blue-500 via-emerald-500 to-amber-500"
              style={{
                height: '100%',
                scaleY: prefersReducedMotion ? 1 : lineProgress,
              }}
            />

            {journeyStages.map((stage, stageIndex) => (
              <motion.div
                key={stage.key}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: stageIndex * 0.2 }}
                className="relative"
              >
                {/* Circle marker */}
                <div
                  className={`absolute -left-5 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${stage.color} shadow-lg`}
                >
                  <stage.icon className="h-5 w-5 text-white" />
                </div>

                {/* Card */}
                <div className={`ml-4 rounded-2xl border ${stage.borderColor} ${stage.bgColor} p-6`}>
                  <div className="mb-4">
                    <span className={`bg-gradient-to-r ${stage.color} bg-clip-text text-3xl font-bold text-transparent`}>
                      {stage.number}
                    </span>
                    <h3 className="text-lg font-bold text-brand-dark">
                      {t(`stages.${stage.key}.title`)}
                    </h3>
                    <p className="text-sm text-zinc-500">
                      {t(`stages.${stage.key}.subtitle`)}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {stage.actions.map((action) => (
                      <div
                        key={action.label}
                        className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm"
                      >
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${stage.color}`}>
                          <action.icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="flex-1 text-sm font-medium text-brand-dark">
                          {action.label}
                        </span>
                        <div
                          className={`h-2 w-2 rounded-full ${
                            action.status === 'sent' ? 'bg-emerald-500' : 'bg-zinc-300'
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
