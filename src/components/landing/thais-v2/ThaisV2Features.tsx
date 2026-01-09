'use client';

import { motion } from 'framer-motion';
import {
  Workflow,
  Users,
  MessageSquare,
  Star,
  FileText,
  ShoppingBag,
  Heart,
  Check,
  Zap,
} from 'lucide-react';
import { Container } from '@/components/ui';

const features = [
  {
    id: 'flows',
    icon: Workflow,
    title: 'Automatisation complète',
    description: 'Vos communications s\'envoient toutes seules selon vos règles. Configurez une fois, ça tourne 24/7.',
    benefits: ['Flow builder visuel no-code', 'Déclencheurs illimités', 'Synchro auto avec Thaïs'],
    gradient: 'from-blue-500 to-indigo-600',
    size: 'large',
  },
  {
    id: 'segmentation',
    icon: Users,
    title: 'Segmentation avancée',
    description: 'Chaque segment reçoit une communication adaptée à son profil.',
    benefits: ['Filtres personnalisables', 'Segments dynamiques', 'Données Thaïs exploitées'],
    gradient: 'from-purple-500 to-violet-600',
    size: 'medium',
  },
  {
    id: 'messaging',
    icon: MessageSquare,
    title: 'Hub de messagerie',
    description: 'Email, SMS, WhatsApp centralisés en une seule interface.',
    benefits: ['Inbox unifiée', 'Historique complet', 'Réponses depuis TriggerFlow'],
    gradient: 'from-emerald-500 to-teal-600',
    size: 'medium',
  },
  {
    id: 'reviews',
    icon: Star,
    title: 'Gestion des avis',
    description: 'Google, Booking, TripAdvisor : tous vos avis au même endroit avec réponses IA.',
    benefits: ['Dashboard unifié', 'Réponses IA en 1 clic', 'Alertes avis négatifs'],
    gradient: 'from-amber-500 to-orange-600',
    size: 'small',
  },
  {
    id: 'forms',
    icon: FileText,
    title: 'Formulaires',
    description: 'Collectez les infos clients avant leur arrivée.',
    benefits: ['Éditeur drag & drop', 'Synchro 2-way Thaïs'],
    gradient: 'from-rose-500 to-pink-600',
    size: 'small',
  },
  {
    id: 'upsell',
    icon: ShoppingBag,
    title: 'Upsell automatique',
    description: 'Spa, restaurant, late check-out proposés au bon moment.',
    benefits: ['Catalogue personnalisable', 'Paiement en ligne'],
    gradient: 'from-cyan-500 to-blue-600',
    size: 'small',
  },
  {
    id: 'loyalty',
    icon: Heart,
    title: 'Programme de fidélité sur mesure',
    description: 'Récompensez vos clients fidèles automatiquement. Points, avantages exclusifs et offres personnalisées selon leur historique.',
    benefits: [
      'Système de points configurable',
      'Paliers de fidélité personnalisés',
      'Offres anniversaire automatiques',
      'Synchronisation avec Thaïs',
    ],
    gradient: 'from-rose-500 to-pink-600',
    size: 'large',
  },
];

export function ThaisV2Features() {
  return (
    <section className="relative overflow-hidden bg-[#0A0F1C] py-24 md:py-32">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/3 top-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[180px]" />
        <div className="absolute bottom-1/4 right-1/3 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[150px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <Container className="relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
            <Zap className="h-4 w-4" />
            Fonctionnalités
          </span>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Tout ce dont vous avez besoin,{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              rien de plus
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Des outils pensés pour les hôteliers, intégrés nativement avec Thaïs PMS
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const gridClass =
              feature.size === 'large'
                ? 'md:col-span-2 lg:col-span-2'
                : feature.size === 'medium'
                ? 'md:col-span-1'
                : 'md:col-span-1';

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10 ${gridClass}`}
              >
                {/* Gradient glow on hover */}
                <div
                  className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${feature.gradient} opacity-0 blur-3xl transition-opacity group-hover:opacity-20`}
                />

                {/* Icon */}
                <div
                  className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
                >
                  <feature.icon className="h-7 w-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                <p className="mb-6 text-zinc-400 leading-relaxed">{feature.description}</p>

                {/* Benefits */}
                <ul className="space-y-2">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-sm text-zinc-300">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20">
                        <Check className="h-3 w-3 text-emerald-400" />
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* Decorative corner */}
                <div className="absolute -bottom-2 -right-2 h-20 w-20 rounded-tl-3xl border-l border-t border-white/10 bg-white/5" />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
