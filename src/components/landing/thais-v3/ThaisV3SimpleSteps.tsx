'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Settings, Zap, Coffee } from 'lucide-react';
import { Container } from '@/components/ui';

const steps = [
  {
    number: '1',
    icon: Settings,
    title: 'Configurez en 30 minutes',
    description: 'On vous guide pour créer vos premiers emails automatiques. Pas de code, pas de formation longue.',
  },
  {
    number: '2',
    icon: Zap,
    title: 'Ça tourne tout seul',
    description: 'Vos emails s\'envoient automatiquement aux bons clients, au bon moment. 24h/24, 7j/7.',
  },
  {
    number: '3',
    icon: Coffee,
    title: 'Vous gagnez du temps',
    description: 'Plus de copier-coller, plus d\'oublis. Passez plus de temps avec vos clients.',
  },
];

export function ThaisV3SimpleSteps() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-[var(--v3-bg-primary)] py-20 md:py-28">
      <Container>
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-[var(--v3-accent-gold)]/30 bg-[var(--v3-accent-gold-light)] px-4 py-2 text-sm font-medium text-[var(--v3-accent-gold)]">
            Comment ça marche
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold tracking-tight text-[var(--v3-text-primary)] md:text-4xl lg:text-5xl">
            Simple comme{' '}
            <span className="text-[var(--v3-accent-green)]">1, 2, 3</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--v3-text-secondary)]">
            Pas besoin d'être un expert en technologie
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line - desktop only */}
          <div className="absolute left-0 right-0 top-[60px] hidden h-0.5 bg-gradient-to-r from-transparent via-[var(--v3-border)] to-transparent lg:block" />

          <div className="grid gap-8 md:grid-cols-3 md:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Number circle */}
                <div className="relative z-10 mb-6 flex h-[120px] w-[120px] items-center justify-center rounded-full border-4 border-[var(--v3-bg-primary)] bg-[var(--v3-bg-secondary)] shadow-[var(--v3-shadow-md)]">
                  <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-[var(--v3-bg-primary)]">
                    <span className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-[var(--v3-accent-green)]">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Icon */}
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--v3-bg-card)]">
                  <step.icon className="h-7 w-7 text-[var(--v3-text-primary)]" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-semibold text-[var(--v3-text-primary)]">
                  {step.title}
                </h3>
                <p className="max-w-xs text-[var(--v3-text-secondary)]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
