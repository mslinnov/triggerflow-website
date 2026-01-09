'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { CheckCircle, CalendarClock, Building, Star, Mail, MessageSquare, Gift } from 'lucide-react';
import { Container } from '@/components/ui';

const journeySteps = [
  {
    id: 'confirmation',
    number: '01',
    icon: CheckCircle,
    title: 'Confirmation',
    subtitle: 'de réservation',
    gradient: 'from-blue-500 to-indigo-600',
    actions: [
      { icon: Mail, text: 'Email de confirmation personnalisé' },
      { icon: MessageSquare, text: 'SMS récapitulatif' },
    ],
  },
  {
    id: 'pre-stay',
    number: '02',
    icon: CalendarClock,
    title: 'Pré-séjour',
    subtitle: 'J-3 à J-1',
    gradient: 'from-purple-500 to-violet-600',
    actions: [
      { icon: Gift, text: 'Proposition d\'upsell' },
      { icon: Mail, text: 'Infos pratiques' },
    ],
  },
  {
    id: 'during',
    number: '03',
    icon: Building,
    title: 'Séjour',
    subtitle: 'Check-in → Check-out',
    gradient: 'from-emerald-500 to-teal-600',
    actions: [
      { icon: MessageSquare, text: 'Message de bienvenue' },
      { icon: Gift, text: 'Room service & services' },
    ],
  },
  {
    id: 'after',
    number: '04',
    icon: Star,
    title: 'Après',
    subtitle: 'le séjour',
    gradient: 'from-amber-500 to-orange-600',
    actions: [
      { icon: Star, text: 'Demande d\'avis automatique' },
      { icon: Mail, text: 'Programme fidélité' },
    ],
  },
];

export function ThaisV2Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineProgress = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-[#0A0F1C] py-24 md:py-32">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      <Container className="relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center md:mb-20"
        >
          <span className="mb-4 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
            Parcours Client Complet
          </span>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Une solution pour{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              chaque moment
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            TriggerFlow vous accompagne sur l'ensemble du parcours client
          </p>
        </motion.div>

        {/* Desktop Timeline - Option A: Connected */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Background line */}
            <div className="absolute left-[12.5%] right-[12.5%] top-10 h-1 rounded-full bg-white/10" />

            {/* Animated progress line */}
            <motion.div
              className="absolute left-[12.5%] top-10 h-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 via-emerald-500 to-amber-500"
              style={{
                width: '75%',
                scaleX: prefersReducedMotion ? 1 : lineProgress,
                transformOrigin: 'left',
              }}
            />

            {/* Steps Grid */}
            <div className="grid grid-cols-4 gap-6">
              {journeySteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="flex flex-col items-center"
                >
                  {/* Circle with number - positioned ON the line */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#0A0F1C] bg-gradient-to-br ${step.gradient} shadow-xl`}
                  >
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </motion.div>

                  {/* Icon below circle */}
                  <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                    <step.icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Title and subtitle */}
                  <h3 className="mt-4 text-xl font-bold text-white">{step.title}</h3>
                  <p className="text-sm text-zinc-500">{step.subtitle}</p>

                  {/* Actions card - FIXED HEIGHT for alignment */}
                  <div className="mt-5 min-h-[120px] w-full rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <div className="space-y-2">
                      {step.actions.map((action) => (
                        <div
                          key={action.text}
                          className="flex items-center gap-3 text-sm"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                            <action.icon className="h-4 w-4 text-zinc-300" />
                          </div>
                          <span className="text-zinc-300">{action.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Tablet Timeline */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-2 gap-8">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${step.gradient} shadow-lg`}>
                    <step.icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-bold text-white">
                        {step.number}
                      </span>
                      <h3 className="font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-sm text-zinc-500">{step.subtitle}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {step.actions.map((action) => (
                    <div key={action.text} className="flex items-center gap-3 text-sm text-zinc-400">
                      <action.icon className="h-4 w-4" />
                      <span>{action.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden">
          <div className="relative space-y-6 pl-8">
            {/* Vertical line */}
            <div className="absolute bottom-0 left-3 top-0 w-0.5 rounded-full bg-white/10" />
            <motion.div
              className="absolute left-3 top-0 w-0.5 origin-top rounded-full bg-gradient-to-b from-blue-500 via-purple-500 via-emerald-500 to-amber-500"
              style={{
                height: '100%',
                scaleY: prefersReducedMotion ? 1 : lineProgress,
              }}
            />

            {journeySteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Circle marker */}
                <div
                  className={`absolute -left-5 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0A0F1C] bg-gradient-to-br ${step.gradient} shadow-lg`}
                >
                  <span className="text-sm font-bold text-white">{step.number}</span>
                </div>

                {/* Content card */}
                <div className="ml-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="mb-3 flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${step.gradient}`}>
                      <step.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{step.title}</h3>
                      <span className="text-sm text-zinc-500">{step.subtitle}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {step.actions.map((action) => (
                      <div key={action.text} className="flex items-center gap-2 text-sm text-zinc-400">
                        <action.icon className="h-4 w-4" />
                        <span>{action.text}</span>
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
