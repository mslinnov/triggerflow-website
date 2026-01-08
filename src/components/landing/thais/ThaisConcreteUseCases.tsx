'use client';

import { motion } from 'framer-motion';
import { Zap, CheckCircle, Mail, Calendar, Heart, MessageSquare, Users } from 'lucide-react';
import { Container, Card } from '@/components/ui';

const USE_CASES = [
  {
    icon: Mail,
    trigger: 'Confirmation de réservation',
    segment: 'Code tarif',
    title: 'Email de confirmation personnalisé',
    description:
      'Soirée étape, coffret cadeau, NANR, corporate... Chaque profil reçoit un email adapté à son contexte.',
    result: '+35% de taux d\'ouverture',
  },
  {
    icon: Calendar,
    trigger: 'J-1 avant arrivée',
    segment: 'Jour d\'arrivée (dim/lun)',
    title: 'Alerte restaurant fermé',
    description:
      'Les clients arrivant dimanche ou lundi sont prévenus automatiquement que le restaurant ne sert pas le soir.',
    result: '0 réclamation client',
  },
  {
    icon: Heart,
    trigger: 'Nouvelle réservation',
    segment: 'Client fidèle (3+ séjours)',
    title: 'Offre personnalisée selon le profil',
    description:
      'Vos clients fidèles reçoivent automatiquement une offre de surclassement ou un avantage exclusif.',
    result: '23% de conversion upsell',
  },
  {
    icon: MessageSquare,
    trigger: 'Check-out',
    segment: 'Tous les clients',
    title: 'Demande d\'avis intelligente',
    description:
      'SMS ou WhatsApp envoyé 2h après le départ, avec lien direct vers Google ou TripAdvisor.',
    result: '+47 avis/mois en moyenne',
  },
];

export function ThaisConcreteUseCases() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-emerald-100 rounded-full mb-6">
            <Zap className="w-5 h-5 text-brand-primary" />
            <span className="text-sm font-semibold text-brand-primary">Cas d'usage concrets</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl md:text-5xl">
            Ce que nos clients ont mis en place
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Des scénarios déjà utilisés par des centaines d'hôteliers Thaïs
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {USE_CASES.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group h-full border-2 border-zinc-100 bg-white p-6 transition-all duration-300 hover:border-brand-primary/50 hover:shadow-xl">
                {/* Trigger & Segment Badges */}
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full">
                    <Zap className="h-3.5 w-3.5 text-amber-600" />
                    <span className="text-xs font-semibold text-amber-700">Déclencheur : {useCase.trigger}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-full">
                    <Users className="h-3.5 w-3.5 text-purple-600" />
                    <span className="text-xs font-semibold text-purple-700">Segment : {useCase.segment}</span>
                  </div>
                </div>

                {/* Icon and Title */}
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 flex-shrink-0 transition-colors group-hover:bg-brand-primary/20">
                    <useCase.icon className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-dark">{useCase.title}</h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-600 leading-relaxed mb-4">{useCase.description}</p>

                {/* Result Badge */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-sm font-semibold text-emerald-700">{useCase.result}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
