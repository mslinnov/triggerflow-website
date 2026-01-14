'use client';

import { motion } from 'framer-motion';
import { Clock, Euro, Rocket, Zap } from 'lucide-react';
import { Container } from '@/components/ui';

const METRICS = [
  {
    icon: Clock,
    value: '4h',
    label: 'gagnées par semaine',
    description: 'sur la gestion des emails clients',
  },
  {
    icon: Euro,
    value: '847€',
    label: 'de revenus additionnels',
    description: 'en moyenne par mois / établissement',
  },
  {
    icon: Rocket,
    value: '2 sem',
    label: 'pour être opérationnel',
    description: 'déploiement accompagné',
  },
  {
    icon: Zap,
    value: '2 min',
    label: 'pour connecter Thaïs',
    description: 'intégration 1-clic',
  },
];

export function ThaisMetrics() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-brand-light/20">
      <Container>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {METRICS.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg border border-zinc-100 hover:border-brand-primary/30 hover:shadow-xl transition-all duration-300"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-colors">
                  <metric.icon className="h-6 w-6 text-brand-primary" />
                </div>

                {/* Value */}
                <div className="mb-1">
                  <span className="text-3xl font-bold text-brand-dark md:text-4xl">
                    {metric.value}
                  </span>
                </div>

                {/* Label */}
                <p className="text-sm font-semibold text-brand-dark md:text-base">
                  {metric.label}
                </p>

                {/* Description */}
                <p className="mt-1 text-xs text-zinc-500 md:text-sm">
                  {metric.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
