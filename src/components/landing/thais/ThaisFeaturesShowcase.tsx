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
    id: 'flows',
    title: 'Gagnez des heures chaque semaine',
    description:
      'Vos communications s\'envoient toutes seules selon vos règles. Vous configurez une fois, ça tourne 24/7.',
    benefits: [
      'Flow builder visuel no-code',
      'Déclencheurs illimités (réservation, check-in, anniversaire...)',
      'Conditions et branchements complexes',
      'Synchronisation automatique avec Thaïs',
    ],
    visual: <WorkflowBuilderVisual />,
  },
  {
    id: 'segmentation',
    title: 'Ciblez les bons clients avec le bon message',
    description:
      'Fini les emails génériques. Chaque segment reçoit une communication adaptée à son profil.',
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
    title: 'Ne perdez plus jamais un message client',
    description:
      'Email, SMS, WhatsApp centralisés. Répondez à tout depuis une seule interface.',
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
    title: 'Tous vos avis centralisés, réponses générées par IA',
    description:
      'Google, Booking, TripAdvisor, Airbnb : tous vos avis au même endroit. Stats unifiées, réponses en un clic grâce à l\'IA, résumés automatiques pour identifier les points d\'amélioration.',
    benefits: [
      'Dashboard unifié de tous vos avis',
      'Réponses générées par IA en 1 clic',
      'Résumés automatiques des tendances',
      'Alertes pour avis négatifs',
    ],
    visual: <ReviewsVisual />,
  },
  {
    id: 'forms',
    title: 'Collectez les infos clients avant même leur arrivée',
    description:
      'Formulaires pré-séjour, préférences, allergies... tout remonte automatiquement dans Thaïs.',
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
    title: 'Vendez vos services additionnels sans lever le petit doigt',
    description:
      'Spa, restaurant, late check-out... proposés automatiquement au bon moment, paiement en ligne intégré.',
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
                  'grid items-center gap-8 lg:grid-cols-2 lg:gap-16',
                  !isEven && 'lg:grid-flow-dense'
                )}
              >
                {/* Visual */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5 }}
                  className={cn('w-full flex justify-center', !isEven && 'lg:col-start-2')}
                >
                  {feature.visual}
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={cn(!isEven && 'lg:col-start-1 lg:row-start-1')}
                >
                  <h3 className="text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl md:text-4xl">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-base leading-relaxed text-zinc-600 md:text-lg">
                    {feature.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {feature.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary/10">
                          <Check className="h-3 w-3 text-brand-primary" strokeWidth={3} />
                        </div>
                        <span className="text-sm text-zinc-700 md:text-base">
                          {benefit}
                        </span>
                      </li>
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
