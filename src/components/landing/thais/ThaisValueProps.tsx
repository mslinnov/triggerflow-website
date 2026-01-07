'use client';

import { motion } from 'framer-motion';
import { RefreshCw, Zap, Layout } from 'lucide-react';
import { Container, Card } from '@/components/ui';

const VALUE_PROPS = [
  {
    icon: RefreshCw,
    title: 'Synchronisation temps réel',
    description:
      'Vos données clients et réservations Thaïs sont automatiquement synchronisées avec TriggerFlow. Aucune manipulation manuelle, tout est fluide et instantané.',
  },
  {
    icon: Zap,
    title: 'Intégration en 1 clic',
    description:
      'Connectez votre compte Thaïs à TriggerFlow en moins de 2 minutes. Pas de développement, pas de configuration technique complexe. Tout est prêt à l\'emploi.',
  },
  {
    icon: Layout,
    title: 'Interface unifiée',
    description:
      'Accédez au hub de messagerie TriggerFlow directement depuis votre interface Thaïs. Plus besoin de jongler entre plusieurs onglets, tout est centralisé.',
  },
];

export function ThaisValueProps() {
  return (
    <section className="bg-gradient-to-b from-white to-brand-light/30 py-16 md:py-24">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl md:text-5xl">
            Une intégration pensée pour <span className="text-brand-primary">Thaïs</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Profitez d'une connectivité ultra-poussée entre votre PMS et TriggerFlow
          </p>
        </motion.div>

        {/* Value Props Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {VALUE_PROPS.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group h-full border-2 border-zinc-100 bg-white p-6 transition-all duration-300 hover:border-brand-primary/50 hover:shadow-xl hover:-translate-y-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 transition-colors group-hover:bg-brand-primary/20">
                  <prop.icon className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-brand-dark">{prop.title}</h3>
                <p className="leading-relaxed text-zinc-600">{prop.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
