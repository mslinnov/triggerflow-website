'use client';

import { motion } from 'framer-motion';
import { Zap, CheckCircle, Mail, Calendar, Heart, MessageSquare, Users, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui';

const useCases = [
  {
    icon: Mail,
    trigger: 'Confirmation de réservation',
    segment: 'Code tarif',
    title: 'Email de confirmation personnalisé',
    description:
      'Soirée étape, coffret cadeau, NANR, corporate... Chaque profil reçoit un email adapté à son contexte.',
    result: '+35% de taux d\'ouverture',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Calendar,
    trigger: 'J-1 avant arrivée',
    segment: 'Jour d\'arrivée (dim/lun)',
    title: 'Alerte restaurant fermé',
    description:
      'Les clients arrivant dimanche ou lundi sont prévenus automatiquement que le restaurant ne sert pas le soir.',
    result: '0 réclamation client',
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    icon: Heart,
    trigger: 'Nouvelle réservation',
    segment: 'Client fidèle (3+ séjours)',
    title: 'Offre personnalisée selon le profil',
    description:
      'Vos clients fidèles reçoivent automatiquement une offre de surclassement ou un avantage exclusif.',
    result: '23% de conversion upsell',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: MessageSquare,
    trigger: 'Check-out',
    segment: 'Tous les clients',
    title: 'Demande d\'avis intelligente',
    description:
      'SMS ou WhatsApp envoyé 2h après le départ, avec lien direct vers Google ou TripAdvisor.',
    result: '+47 avis/mois en moyenne',
    gradient: 'from-amber-500 to-orange-600',
  },
];

export function ThaisV2UseCases() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      {/* Background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.03) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Decorative blobs */}
      <div className="absolute -left-64 top-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[150px]" />
      <div className="absolute -right-64 bottom-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-[120px]" />

      <Container className="relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            <Zap className="h-4 w-4" />
            Cas d'usage concrets
          </span>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl lg:text-6xl">
            Ce que les clients Thaïs{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              ont mis en place
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Des scénarios déjà utilisés par des centaines d'hôteliers Thaïs
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl"
            >
              {/* Gradient accent on hover */}
              <div
                className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${useCase.gradient} opacity-0 blur-3xl transition-opacity group-hover:opacity-10`}
              />

              {/* Badges */}
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                  <Zap className="h-3 w-3" />
                  {useCase.trigger}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
                  <Users className="h-3 w-3" />
                  {useCase.segment}
                </span>
              </div>

              {/* Icon and Title */}
              <div className="mb-4 flex items-start gap-4">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${useCase.gradient} shadow-lg`}
                >
                  <useCase.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900">{useCase.title}</h3>
              </div>

              {/* Description */}
              <p className="mb-6 text-zinc-600 leading-relaxed">{useCase.description}</p>

              {/* Result */}
              <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                  <span className="font-semibold text-emerald-700">{useCase.result}</span>
                </div>
                <ArrowRight className="h-5 w-5 text-emerald-600 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
