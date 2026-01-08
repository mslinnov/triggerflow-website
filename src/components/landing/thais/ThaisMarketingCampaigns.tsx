'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, Send, RefreshCw, Megaphone, Check, Users, BarChart3, TrendingUp } from 'lucide-react';
import { Container, Card } from '@/components/ui';

const CAMPAIGN_FEATURES = [
  {
    icon: Mail,
    title: 'Module Newsletter',
    description: 'Collectez des inscriptions avec un formulaire dédié intégré à votre site.',
    benefits: [
      'Formulaire d\'inscription personnalisable',
      'Segmentation automatique des abonnés',
      'Opt-in RGPD intégré',
    ],
  },
  {
    icon: Send,
    title: 'Campagnes ponctuelles',
    description: 'Envoyez des campagnes ciblées sur toute votre base client en quelques clics.',
    benefits: [
      'Éditeur email drag & drop',
      'Ciblage par segments',
      'Statistiques en temps réel',
    ],
  },
  {
    icon: RefreshCw,
    title: 'Séquences automatiques',
    description: 'Créez des parcours client automatisés pour fidéliser vos clients.',
    benefits: [
      'Scénarios de nurturing',
      'Triggers personnalisés',
      'A/B testing intégré',
    ],
  },
];

export function ThaisMarketingCampaigns() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-brand-light/20">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-brand-primary/10 rounded-full mb-6">
            <Megaphone className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-purple-600">Campagnes Marketing</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl md:text-5xl">
            Gérez vos campagnes marketing <span className="text-brand-primary">en toute simplicité</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Newsletter, campagnes ponctuelles et séquences automatisées : tout ce qu'il faut pour engager vos clients
          </p>
        </motion.div>

        {/* Screenshot with floating elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16 flex justify-center"
        >
          <div className="relative w-full max-w-4xl">
            {/* Main Screenshot */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <Image
                src="/images/assets/campaigns.webp"
                alt="Interface de gestion des campagnes marketing TriggerFlow"
                width={1200}
                height={700}
                className="w-full h-auto"
              />
            </div>

            {/* Floating Element 1: Top Left - Campaigns Active */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="hidden md:flex absolute -top-4 -left-4 bg-purple-500 text-white px-4 py-2 rounded-full shadow-lg items-center gap-2"
            >
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-sm font-semibold">3 campagnes actives</span>
            </motion.div>

            {/* Floating Element 2: Top Right - Open Rate */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute top-2 right-2 md:-top-6 md:-right-6 bg-white rounded-xl md:rounded-2xl shadow-xl p-2 md:p-4 border-2 border-purple-500/20"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-purple-100 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 md:w-6 md:h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-lg md:text-2xl font-bold text-brand-dark">42%</p>
                  <p className="text-[10px] md:text-xs text-gray-500">Taux d'ouverture</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Element 3: Bottom Left - Subscribers */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="hidden md:flex absolute -bottom-4 -left-6 bg-white rounded-xl shadow-lg p-3 items-center gap-2 border border-gray-200"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-brand-dark">2,847</p>
                <p className="text-xs text-gray-500">abonnés newsletter</p>
              </div>
            </motion.div>

            {/* Floating Element 4: Bottom Right - Revenue */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="hidden md:block absolute -bottom-6 -right-4 bg-gradient-to-br from-brand-primary to-emerald-600 text-white rounded-xl shadow-lg p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-semibold">ROI Campagnes</span>
              </div>
              <p className="text-2xl font-bold">+320%</p>
              <p className="text-xs opacity-90">vs coût d'envoi</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {CAMPAIGN_FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group h-full border-2 border-zinc-100 bg-white p-6 transition-all duration-300 hover:border-purple-500/30 hover:shadow-xl">
                {/* Icon */}
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 group-hover:bg-purple-200 transition-colors">
                  <feature.icon className="h-7 w-7 text-purple-600" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-brand-dark mb-2">{feature.title}</h3>

                {/* Description */}
                <p className="text-zinc-600 leading-relaxed mb-4">{feature.description}</p>

                {/* Benefits */}
                <ul className="space-y-2">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2">
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
                        <Check className="h-3 w-3 text-purple-600" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-zinc-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
