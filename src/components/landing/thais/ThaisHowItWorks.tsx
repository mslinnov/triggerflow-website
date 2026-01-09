'use client';

import { motion } from 'framer-motion';
import { Link2, Cog, Rocket } from 'lucide-react';
import { Container } from '@/components/ui';

const STEPS = [
  {
    number: '01',
    icon: Link2,
    title: 'Activez l\'intégration depuis votre compte Thaïs',
    description:
      'Connexion 1-clic, vos données se synchronisent automatiquement. Aucune configuration technique requise.',
  },
  {
    number: '02',
    icon: Cog,
    title: 'Vos données clients remontent automatiquement',
    description:
      'Codes tarifs, fidélité, historique... tout est disponible pour personnaliser vos communications.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Lancez votre première automatisation',
    description:
      'Avec nos templates prêts à l\'emploi ou créez la vôtre. Concentrez-vous sur vos clients pendant que TriggerFlow travaille pour vous.',
  },
];

export function ThaisHowItWorks() {
  return (
    <section className="bg-gradient-to-br from-[var(--thais-primary)] via-[#0a2590] to-[var(--thais-cyan)]/80 py-16 md:py-24">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            3 étapes pour démarrer
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Opérationnel en moins de 48 heures
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector line (desktop only) */}
              {index < STEPS.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-white/20 md:block" />
              )}

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Number Badge */}
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>

                {/* Icon */}
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                  <step.icon className="h-7 w-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-white">{step.title}</h3>
                <p className="text-white/80">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
