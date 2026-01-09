'use client';

import { useRef, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { CheckCircle, CalendarClock, Building, Star, Mail, Gift, MessageSquare, ThumbsUp, ArrowRight } from 'lucide-react';
import { Container, ButtonLink } from '@/components/ui';

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
    timing: 'Dès la réservation',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
    textColor: 'text-blue-600',
    actions: [
      { icon: Mail, text: 'Email de confirmation personnalisé' },
      { icon: MessageSquare, text: 'Récapitulatif envoyé automatiquement' },
    ],
  },
  {
    id: 'pre-sejour',
    icon: CalendarClock,
    title: 'Pré-séjour',
    timing: '3 jours avant',
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    borderColor: 'border-purple-100',
    textColor: 'text-purple-600',
    actions: [
      { icon: Mail, text: 'Infos pratiques (parking, WiFi...)' },
      { icon: Gift, text: 'Proposition de services (spa, dîner...)' },
    ],
  },
  {
    id: 'during',
    icon: Building,
    title: 'Séjour',
    timing: 'Pendant le séjour',
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
    textColor: 'text-emerald-600',
    actions: [
      { icon: MessageSquare, text: 'Message de bienvenue' },
      { icon: ThumbsUp, text: 'Satisfaction à mi-séjour' },
    ],
  },
  {
    id: 'after',
    icon: Star,
    title: 'Après',
    timing: 'Après le départ',
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    borderColor: 'border-amber-100',
    textColor: 'text-amber-600',
    actions: [
      { icon: Star, text: "Demande d'avis (Google, TripAdvisor)" },
      { icon: Gift, text: 'Invitation à revenir' },
    ],
  },
];

export function JourneyTimeline({ background = 'gradient' }: JourneyTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const searchParams = useSearchParams();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineProgress = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  // Build Calendly URL with UTM parameters
  const calendlyUrl = useMemo(() => {
    const baseUrl = 'https://app.lemcal.com/@trigger-flow/tf-thais';
    const utmParams = new URLSearchParams();

    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((param) => {
      const value = searchParams.get(param);
      if (value) utmParams.append(param, value);
    });

    return utmParams.toString() ? `${baseUrl}?${utmParams.toString()}` : baseUrl;
  }, [searchParams]);

  return (
    <section ref={containerRef} className={`py-16 md:py-24 ${BACKGROUNDS[background]}`}>
      <Container>
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-primary/10 to-blue-100 px-4 py-2">
            <span className="text-sm font-semibold text-brand-primary">Parcours Client Complet</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl md:text-5xl">
            Un email automatique pour <span className="text-brand-primary">chaque moment</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            De la réservation au départ, TriggerFlow envoie le bon message au bon moment
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Background line */}
            <div className="absolute left-[12.5%] right-[12.5%] top-8 h-1 rounded-full bg-zinc-200" />

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
              {JOURNEY_STEPS.map((step, index) => (
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
                    className={`relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white ${step.color} shadow-lg`}
                  >
                    <step.icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Label and timing */}
                  <h3 className="text-lg font-semibold text-brand-dark">{step.title}</h3>
                  <p className="mb-4 text-sm text-zinc-500">{step.timing}</p>

                  {/* Actions card */}
                  <div className="min-h-[130px] w-full rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                    <div className="space-y-3">
                      {step.actions.map((action) => (
                        <div key={action.text} className="flex items-start gap-3 text-sm">
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${step.lightColor} ${step.borderColor}`}
                          >
                            <action.icon className={`h-4 w-4 ${step.textColor}`} />
                          </div>
                          <span className="text-zinc-600">{action.text}</span>
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
            {JOURNEY_STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${step.color}`}>
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-dark">{step.title}</h3>
                    <p className="text-sm text-zinc-500">{step.timing}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {step.actions.map((action) => (
                    <div key={action.text} className="flex items-center gap-3 text-sm text-zinc-600">
                      <action.icon className="h-4 w-4 text-zinc-400" />
                      <span>{action.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA after timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-zinc-600 mb-4">
            Prêt à offrir ce parcours à vos clients ?
          </p>
          <ButtonLink
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
            className="group gap-2"
          >
            Configurer mon parcours client
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </ButtonLink>
        </motion.div>
      </Container>
    </section>
  );
}
