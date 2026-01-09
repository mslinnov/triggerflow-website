'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { CheckCircle, Calendar, Home, Star, Mail, Gift, MessageSquare, ThumbsUp } from 'lucide-react';
import { Container } from '@/components/ui';

const journeySteps = [
  {
    id: 'confirmation',
    label: 'Confirmation',
    timing: 'Dès la réservation',
    icon: CheckCircle,
    color: 'bg-blue-50 text-blue-600 border-blue-100',
    dotColor: 'bg-blue-500',
    actions: [
      { icon: Mail, text: 'Email de confirmation personnalisé' },
      { icon: MessageSquare, text: 'Récapitulatif envoyé automatiquement' },
    ],
  },
  {
    id: 'pre-sejour',
    label: 'Pré-séjour',
    timing: '3 jours avant',
    icon: Calendar,
    color: 'bg-purple-50 text-purple-600 border-purple-100',
    dotColor: 'bg-purple-500',
    actions: [
      { icon: Mail, text: 'Infos pratiques (parking, WiFi...)' },
      { icon: Gift, text: 'Proposition de services (spa, dîner...)' },
    ],
  },
  {
    id: 'sejour',
    label: 'Séjour',
    timing: 'Pendant le séjour',
    icon: Home,
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    dotColor: 'bg-emerald-500',
    actions: [
      { icon: MessageSquare, text: 'Message de bienvenue' },
      { icon: ThumbsUp, text: 'Satisfaction à mi-séjour' },
    ],
  },
  {
    id: 'apres',
    label: 'Après',
    timing: 'Après le départ',
    icon: Star,
    color: 'bg-amber-50 text-amber-600 border-amber-100',
    dotColor: 'bg-amber-500',
    actions: [
      { icon: Star, text: 'Demande d\'avis (Google, TripAdvisor)' },
      { icon: Gift, text: 'Invitation à revenir' },
    ],
  },
];

export function ThaisV3Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineProgress = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <section ref={containerRef} className="bg-[var(--v3-bg-secondary)] py-20 md:py-28">
      <Container>
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-[var(--v3-accent-green)]/20 bg-[var(--v3-accent-green)]/10 px-4 py-2 text-sm font-medium text-[var(--v3-accent-green)]">
            Parcours client complet
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold tracking-tight text-[var(--v3-text-primary)] md:text-4xl lg:text-5xl">
            Un email automatique pour{' '}
            <span className="text-[var(--v3-accent-green)]">chaque moment</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--v3-text-secondary)]">
            De la réservation au départ, TriggerFlow envoie le bon message au bon moment
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Background line */}
            <div className="absolute left-[12.5%] right-[12.5%] top-8 h-1 rounded-full bg-[var(--v3-border)]" />

            {/* Animated progress line */}
            <motion.div
              className="absolute left-[12.5%] top-8 h-1 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 via-emerald-400 to-amber-400"
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
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="flex flex-col items-center"
                >
                  {/* Dot on line */}
                  <div
                    className={`relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[var(--v3-bg-secondary)] ${step.dotColor} shadow-lg`}
                  >
                    <step.icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Label and timing */}
                  <h3 className="text-lg font-semibold text-[var(--v3-text-primary)]">{step.label}</h3>
                  <p className="mb-4 text-sm text-[var(--v3-text-muted)]">{step.timing}</p>

                  {/* Actions card */}
                  <div className="min-h-[130px] w-full rounded-2xl border border-[var(--v3-border)] bg-[var(--v3-bg-primary)] p-4 shadow-sm">
                    <div className="space-y-3">
                      {step.actions.map((action) => (
                        <div key={action.text} className="flex items-start gap-3 text-sm">
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${step.color} border`}>
                            <action.icon className="h-4 w-4" />
                          </div>
                          <span className="text-[var(--v3-text-secondary)]">{action.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: Vertical cards */}
        <div className="lg:hidden">
          <div className="space-y-4">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-[var(--v3-border)] bg-[var(--v3-bg-primary)] p-5 shadow-sm"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${step.dotColor}`}>
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--v3-text-primary)]">{step.label}</h3>
                    <p className="text-sm text-[var(--v3-text-muted)]">{step.timing}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {step.actions.map((action) => (
                    <div key={action.text} className="flex items-center gap-3 text-sm text-[var(--v3-text-secondary)]">
                      <action.icon className="h-4 w-4 text-[var(--v3-text-muted)]" />
                      <span>{action.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
