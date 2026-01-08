'use client';

import { motion } from 'framer-motion';
import { CheckCircle, CalendarClock, Building, Star, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui';

interface JourneyTimelineProps {
  background?: 'white' | 'gradient' | 'light';
}

const BACKGROUNDS = {
  white: 'bg-white',
  gradient: 'bg-gradient-to-b from-white to-brand-light/20',
  light: 'bg-brand-light/20',
};

const JOURNEY_STEPS = [
  {
    id: 'confirmation',
    icon: CheckCircle,
    title: 'Confirmation',
    subtitle: 'de réservation',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    examples: [
      'Email de confirmation',
      'Récapitulatif séjour',
      'Conditions d\'annulation',
    ],
  },
  {
    id: 'pre-sejour',
    icon: CalendarClock,
    title: 'Pré-séjour',
    subtitle: 'avant l\'arrivée',
    color: 'bg-purple-500',
    lightColor: 'bg-purple-100',
    textColor: 'text-purple-600',
    examples: [
      'Proposition d\'upsell',
      'Infos pratiques',
      'Pré check-in',
    ],
  },
  {
    id: 'during',
    icon: Building,
    title: 'Pendant',
    subtitle: 'le séjour',
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-100',
    textColor: 'text-emerald-600',
    examples: [
      'Message de bienvenue',
      'Infos restaurant',
      'Room service',
    ],
  },
  {
    id: 'after',
    icon: Star,
    title: 'Après',
    subtitle: 'le séjour',
    color: 'bg-amber-500',
    lightColor: 'bg-amber-100',
    textColor: 'text-amber-600',
    examples: [
      'Demande d\'avis',
      'Programme fidélité',
      'Offre de retour',
    ],
  },
];

export function JourneyTimeline({ background = 'gradient' }: JourneyTimelineProps) {
  return (
    <section className={`py-16 md:py-20 ${BACKGROUNDS[background]}`}>
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-blue-100 rounded-full mb-6">
            <span className="text-sm font-semibold text-brand-primary">Parcours Client Complet</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl md:text-5xl">
            Une solution pour <span className="text-brand-primary">chaque moment</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            TriggerFlow vous accompagne sur l'ensemble du parcours client
          </p>
        </motion.div>

        {/* Timeline - Desktop */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 via-emerald-200 to-amber-200 rounded-full" />

            {/* Steps */}
            <div className="grid grid-cols-4 gap-6">
              {JOURNEY_STEPS.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Icon Circle */}
                  <div className="flex justify-center mb-6">
                    <div className={`relative z-10 w-32 h-32 rounded-full ${step.lightColor} flex items-center justify-center shadow-lg border-4 border-white`}>
                      <div className={`w-20 h-20 rounded-full ${step.color} flex items-center justify-center`}>
                        <step.icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Arrow (except last) */}
                  {index < JOURNEY_STEPS.length - 1 && (
                    <div className="absolute top-14 -right-3 z-20">
                      <ArrowRight className="w-6 h-6 text-zinc-300" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="text-center">
                    <h3 className={`text-xl font-bold ${step.textColor}`}>{step.title}</h3>
                    <p className="text-sm text-zinc-500 mb-4">{step.subtitle}</p>

                    {/* Examples */}
                    <ul className="space-y-2">
                      {step.examples.map((example) => (
                        <li
                          key={example}
                          className="text-sm text-zinc-600 flex items-center justify-center gap-2"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${step.color}`} />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline - Mobile/Tablet */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-purple-200 via-emerald-200 to-amber-200 rounded-full" />

            {/* Steps */}
            <div className="space-y-8">
              {JOURNEY_STEPS.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex gap-6"
                >
                  {/* Icon Circle */}
                  <div className={`relative z-10 w-16 h-16 rounded-full ${step.lightColor} flex items-center justify-center shadow-lg border-4 border-white flex-shrink-0`}>
                    <div className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center`}>
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-4">
                    <h3 className={`text-lg font-bold ${step.textColor}`}>
                      {step.title} <span className="font-normal text-zinc-500">{step.subtitle}</span>
                    </h3>

                    {/* Examples */}
                    <ul className="mt-2 space-y-1">
                      {step.examples.map((example) => (
                        <li
                          key={example}
                          className="text-sm text-zinc-600 flex items-center gap-2"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${step.color}`} />
                          {example}
                        </li>
                      ))}
                    </ul>
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
