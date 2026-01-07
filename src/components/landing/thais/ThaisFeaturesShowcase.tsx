'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  WorkflowBuilderVisual,
  SegmentationVisual,
  MessagingHubVisual,
  ReviewsVisual,
  FormBuilderVisual,
  CatalogVisual,
} from './visuals';

interface Feature {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  visual: React.ReactNode;
}

const FEATURES: Feature[] = [
  {
    id: 'workflows',
    title: 'Créez des workflows sur mesure',
    description:
      'Construisez vos scénarios d\'automatisation exactement comme vous les imaginez. Déclencheurs personnalisables, conditions avancées, actions multiples - tout est possible.',
    benefits: [
      'Workflow builder visuel no-code',
      'Déclencheurs illimités (réservation, check-in, anniversaire...)',
      'Conditions et branchements complexes',
      'Synchronisation automatique avec Thaïs',
    ],
    visual: <WorkflowBuilderVisual />,
  },
  {
    id: 'segmentation',
    title: 'Segmentez vos clients avec précision',
    description:
      'Créez des segments clients ultra-précis basés sur n\'importe quel critère : historique de séjours, comportement, préférences, données Thaïs.',
    benefits: [
      'Filtres personnalisables à l\'infini',
      'Segments dynamiques mis à jour en temps réel',
      'Ciblage comportemental avancé',
      'Données Thaïs exploitées pleinement',
    ],
    visual: <SegmentationVisual />,
  },
  {
    id: 'messaging-hub',
    title: 'Toutes vos conversations au même endroit',
    description:
      'Gérez tous vos échanges clients depuis une seule interface : emails, SMS, WhatsApp. Plus besoin de jongler entre 10 outils différents.',
    benefits: [
      'Inbox unifiée pour tous les canaux',
      'Historique complet des conversations',
      'Réponses depuis TriggerFlow ou Thaïs',
      'Synchronisation bidirectionnelle',
    ],
    visual: <MessagingHubVisual />,
  },
  {
    id: 'reviews',
    title: 'Collectez et gérez tous vos avis',
    description:
      'Centralisez tous vos avis clients (Google, Booking, TripAdvisor) et automatisez les demandes d\'avis après chaque séjour.',
    benefits: [
      'Collecte automatique post-séjour',
      'Dashboard unifié de tous vos avis',
      'Alertes pour avis négatifs',
      'Boost de votre e-réputation',
    ],
    visual: <ReviewsVisual />,
  },
  {
    id: 'forms',
    title: 'Créez des formulaires synchronisés avec Thaïs',
    description:
      'Form builder intuitif pour créer vos formulaires pré-séjour, satisfaction, ou tout autre besoin. Toutes les réponses remontent automatiquement dans Thaïs.',
    benefits: [
      'Éditeur drag & drop sans code',
      'Synchronisation 2-way avec Thaïs',
      'Formulaires illimités',
      'Logique conditionnelle avancée',
    ],
    visual: <FormBuilderVisual />,
  },
  {
    id: 'catalog',
    title: 'Boostez vos ventes avec des catalogues personnalisés',
    description:
      'Créez des pages de vente pour vos upsells (spa, restaurant, activités). Toutes les commandes se synchronisent automatiquement dans Thaïs.',
    benefits: [
      'Catalogue produits/services personnalisable',
      'Pages de vente brandées',
      'Paiement en ligne intégré',
      'Synchronisation 2-way avec Thaïs PMS',
    ],
    visual: <CatalogVisual />,
  },
];

export function ThaisFeaturesShowcase() {
  return (
    <div className="bg-white">
      {FEATURES.map((feature, index) => {
        const isEven = index % 2 === 0;

        return (
          <section
            key={feature.id}
            className={cn(
              'py-16 md:py-24',
              isEven ? 'bg-white' : 'bg-brand-light/30'
            )}
          >
            <Container>
              <div
                className={cn(
                  'grid items-center gap-12 lg:grid-cols-2 lg:gap-16',
                  !isEven && 'lg:grid-flow-dense'
                )}
              >
                {/* Visual */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6 }}
                  className={cn(!isEven && 'lg:col-start-2')}
                >
                  {feature.visual}
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={cn(!isEven && 'lg:col-start-1 lg:row-start-1')}
                >
                  <h3 className="text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl md:text-4xl">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-base leading-relaxed text-zinc-600 md:text-lg">
                    {feature.description}
                  </p>

                  <ul className="mt-8 space-y-3">
                    {feature.benefits.map((benefit) => (
                      <motion.li
                        key={benefit}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary/10">
                          <Check className="h-3 w-3 text-brand-primary" strokeWidth={3} />
                        </div>
                        <span className="text-sm text-zinc-700 md:text-base">
                          {benefit}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </Container>
          </section>
        );
      })}
    </div>
  );
}
