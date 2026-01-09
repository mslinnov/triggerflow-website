'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Send, RefreshCw, Megaphone, Check, Users, BarChart3 } from 'lucide-react';
import { Container } from '@/components/ui';

const campaignFeatures = [
  {
    icon: Mail,
    title: 'Module Newsletter',
    description: 'Collectez des inscriptions avec un formulaire dédié intégré à votre site.',
    benefits: [
      "Formulaire d'inscription personnalisable",
      'Segmentation automatique des abonnés',
      'Opt-in RGPD intégré',
    ],
  },
  {
    icon: Send,
    title: 'Campagnes ponctuelles',
    description: 'Envoyez des campagnes ciblées sur toute votre base client en quelques clics.',
    benefits: ['Éditeur email drag & drop', 'Ciblage par segments', 'Statistiques en temps réel'],
  },
  {
    icon: RefreshCw,
    title: 'Séquences automatiques',
    description: 'Créez des parcours client automatisés pour fidéliser vos clients.',
    benefits: ['Scénarios de fidélisation', 'Envois programmés', 'Suivi des performances'],
  },
];

export function ThaisV3Campaigns() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-gradient-to-b from-[var(--v3-bg-primary)] to-[var(--v3-bg-secondary)] py-20 md:py-28">
      <Container>
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600">
            <Megaphone className="h-4 w-4" />
            Campagnes Marketing
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold tracking-tight text-[var(--v3-text-primary)] md:text-4xl lg:text-5xl">
            Gérez vos campagnes marketing{' '}
            <span className="text-[var(--v3-accent-green)]">en toute simplicité</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--v3-text-secondary)]">
            Newsletter, campagnes ponctuelles et séquences automatisées : tout ce qu'il faut pour
            engager vos clients
          </p>
        </motion.div>

        {/* Screenshot with floating elements */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-16 flex justify-center"
        >
          <div className="relative w-full max-w-4xl px-4 md:px-8">
            {/* Main Screenshot */}
            <div className="relative overflow-hidden rounded-2xl border border-[var(--v3-border)] bg-[var(--v3-bg-card)] shadow-[var(--v3-shadow-lg)]">
              <Image
                src="/images/assets/campaigns.webp"
                alt="Interface de gestion des campagnes marketing TriggerFlow"
                width={1200}
                height={700}
                className="h-auto w-full"
              />
            </div>

            {/* Floating Element 1: Top Left - Campaigns Active */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -left-4 -top-4 hidden items-center gap-2 rounded-full bg-purple-500 px-4 py-2 text-white shadow-lg md:-left-6 md:flex"
            >
              <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
              <span className="text-sm font-semibold">3 campagnes actives</span>
            </motion.div>

            {/* Floating Element 2: Top Right - Open Rate */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -right-4 -top-4 rounded-xl border border-[var(--v3-border)] bg-[var(--v3-bg-primary)] p-3 shadow-[var(--v3-shadow-lg)] md:-right-6 md:-top-6 md:p-4"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 md:h-12 md:w-12">
                  <BarChart3 className="h-5 w-5 text-purple-600 md:h-6 md:w-6" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[var(--v3-text-primary)] md:text-2xl">42%</p>
                  <p className="text-[10px] text-[var(--v3-text-muted)] md:text-xs">
                    Taux d'ouverture
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating Element 3: Bottom Left - Subscribers */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 hidden items-center gap-2 rounded-xl border border-[var(--v3-border)] bg-[var(--v3-bg-primary)] p-3 shadow-[var(--v3-shadow-lg)] md:-left-6 md:flex"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <Users className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-[var(--v3-text-primary)]">2,847</p>
                <p className="text-xs text-[var(--v3-text-muted)]">abonnés newsletter</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {campaignFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group h-full rounded-2xl border border-[var(--v3-border)] bg-[var(--v3-bg-primary)] p-6 shadow-sm transition-all hover:border-purple-200 hover:shadow-md"
            >
              {/* Icon */}
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 transition-colors group-hover:bg-purple-200">
                <feature.icon className="h-7 w-7 text-purple-600" />
              </div>

              {/* Title */}
              <h3 className="mb-2 text-xl font-semibold text-[var(--v3-text-primary)]">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mb-4 leading-relaxed text-[var(--v3-text-secondary)]">
                {feature.description}
              </p>

              {/* Benefits */}
              <ul className="space-y-2">
                {feature.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-100">
                      <Check className="h-3 w-3 text-purple-600" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-[var(--v3-text-secondary)]">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
