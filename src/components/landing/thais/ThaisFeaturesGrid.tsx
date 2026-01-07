'use client';

import { motion } from 'framer-motion';
import { Mail, MessageSquare, MessageCircle, Users, Workflow, BarChart3 } from 'lucide-react';
import { Container, Card } from '@/components/ui';

const FEATURES = [
  {
    icon: Mail,
    title: 'Email transactionnel',
    description:
      'Confirmations de réservation, rappels de check-in, enquêtes de satisfaction. Personnalisez chaque email avec les données de vos clients.',
  },
  {
    icon: MessageSquare,
    title: 'SMS automatiques',
    description:
      'Messages de bienvenue, rappels, upsell, fidélisation. Restez en contact avec vos clients au bon moment via SMS.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Business',
    description:
      'Support client, promotions, confirmations. Communiquez sur la messagerie préférée de vos clients avec WhatsApp.',
  },
  {
    icon: Users,
    title: 'CRM hôtelier intégré',
    description:
      'Historique complet des clients, préférences, séjours passés. Toutes vos données centralisées pour une relation client personnalisée.',
  },
  {
    icon: Workflow,
    title: 'Automatisation workflows',
    description:
      'Créez des scénarios d\'automatisation sur-mesure. Déclenchez des actions automatiques selon vos règles métier.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & dashboards',
    description:
      'Tableaux de bord en temps réel, reporting détaillé. Suivez les performances de vos campagnes et optimisez votre stratégie.',
  },
];

export function ThaisFeaturesGrid() {
  return (
    <section className="bg-white py-16 md:py-24">
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
            Toute la puissance de <span className="text-brand-primary">TriggerFlow</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Une suite complète d'outils pour automatiser et optimiser votre relation client
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group h-full border border-zinc-200 bg-white p-6 transition-all duration-300 hover:border-brand-primary hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-dark text-white transition-transform group-hover:scale-110">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-brand-dark">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
