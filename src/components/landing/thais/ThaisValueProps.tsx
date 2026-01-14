'use client';

import { motion } from 'framer-motion';
import { Users, TrendingUp, RefreshCw, Lightbulb, Brain } from 'lucide-react';
import { Container, Card } from '@/components/ui';

const VALUE_PROPS = [
  {
    icon: Users,
    title: 'Un message différent pour chaque profil',
    description:
      'Exploitez toutes les données Thaïs pour personnaliser automatiquement : code tarif, fidélité, nombre de personnes, historique...',
    example: {
      trigger: 'Client NANR',
      action: 'Rappel des conditions d\'annulation',
      trigger2: 'Client fidèle',
      action2: 'Offre de surclassement en avant-première',
    },
  },
  {
    icon: TrendingUp,
    title: 'Générez du CA additionnel automatiquement',
    description:
      'Proposez le bon service au bon moment : spa avant un séjour romantique, late check-out pour les départs tardifs, petit-déjeuner pour les tarifs sans...',
    example: {
      trigger: 'Client séjour romantique',
      action: 'Offre spa envoyée 3 jours avant l\'arrivée',
      result: '+23% de conversion upsell',
    },
  },
  {
    icon: RefreshCw,
    title: 'Synchronisation bidirectionnelle en temps réel',
    description:
      'Les données circulent dans les deux sens entre Thaïs et TriggerFlow. Un email récupéré d\'un client OTA ? Synchronisé. Une commande prise via TriggerFlow ? Directement ajoutée à la réservation dans Thaïs.',
    example: {
      trigger: 'Client réserve via Booking',
      action: 'Vous récupérez son email',
      result: 'Il reçoit automatiquement vos communications personnalisées',
    },
  },
  {
    icon: Brain,
    title: 'Réduisez votre charge mentale',
    description:
      'Plus besoin de penser à chaque email, chaque rappel, chaque relance. TriggerFlow s\'occupe de tout en arrière-plan. Vous pouvez vous concentrer sur ce qui compte : l\'accueil de vos clients.',
    example: {
      trigger: 'Lundi matin',
      action: 'Zéro tâche de communication en attente',
      result: 'Votre équipe peut se concentrer sur les clients présents',
    },
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
            Pourquoi <span className="text-brand-primary">TriggerFlow</span> + <span className="text-brand-primary">Thaïs</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Des bénéfices concrets pour votre établissement
          </p>
        </motion.div>

        {/* Value Props Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                <h3 className="mb-3 text-xl font-bold text-brand-dark">{prop.title}</h3>
                <p className="leading-relaxed text-zinc-600 mb-4">{prop.description}</p>

                {/* Example Box */}
                <div className="rounded-lg bg-gradient-to-br from-brand-primary/5 to-emerald-50 p-4 border border-brand-primary/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-brand-primary" />
                    <span className="text-xs font-semibold text-brand-dark uppercase tracking-wide">Exemple</span>
                  </div>
                  {'trigger2' in prop.example ? (
                    <div className="space-y-2 text-sm">
                      <p className="text-zinc-700">
                        <span className="font-medium text-brand-primary">{prop.example.trigger}</span>
                        <span className="text-zinc-400 mx-1">→</span>
                        <span>{prop.example.action}</span>
                      </p>
                      <p className="text-zinc-700">
                        <span className="font-medium text-brand-primary">{prop.example.trigger2}</span>
                        <span className="text-zinc-400 mx-1">→</span>
                        <span>{prop.example.action2}</span>
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1 text-sm">
                      <p className="text-zinc-700">
                        <span className="font-medium text-brand-primary">{prop.example.trigger}</span>
                        <span className="text-zinc-400 mx-1">→</span>
                        <span>{prop.example.action}</span>
                      </p>
                      {'result' in prop.example && (
                        <p className="text-emerald-600 font-medium mt-2">
                          → {prop.example.result}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
