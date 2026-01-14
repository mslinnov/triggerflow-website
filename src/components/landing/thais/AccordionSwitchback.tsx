'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui';
import {
  Check,
  Zap,
  Target,
  MessageSquare,
  Star,
  FileText,
  ShoppingBag,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  WorkflowBuilderVisual,
  SegmentationVisual,
  MessagingHubVisual,
  ReviewsVisual,
  FormBuilderVisual,
  CatalogVisual,
} from './visuals';

interface AccordionFeature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  Visual: React.ComponentType;
}

const FEATURES: AccordionFeature[] = [
  {
    id: 'flows',
    icon: Zap,
    title: 'Gagnez des heures chaque semaine',
    description:
      'Vos communications s\'envoient toutes seules selon vos règles. Vous configurez une fois, ça tourne 24/7.',
    benefits: [
      'Constructeur d\'arbre de décision visuel',
      'Déclencheurs illimités (réservation, check-in, anniversaire...)',
      'Conditions et branchements 100% personnalisables',
      'Synchronisation automatique avec Thaïs',
    ],
    Visual: WorkflowBuilderVisual,
  },
  {
    id: 'segmentation',
    icon: Target,
    title: 'Ciblez les bons clients avec le bon message',
    description:
      'Fini les emails génériques. Chaque segment reçoit une communication adaptée à son profil.',
    benefits: [
      'Jour d\'arrivée, email OTA, services réservés',
      'Régime tarifaire, source de réservation, chambre',
      '+50 filtres pour des milliers de combinaisons',
      'Données Thaïs exploitées en temps réel',
    ],
    Visual: SegmentationVisual,
  },
  {
    id: 'messaging-hub',
    icon: MessageSquare,
    title: 'Ne perdez plus jamais un message client',
    description:
      'Email, SMS, WhatsApp centralisés. Répondez à tout depuis une seule interface.',
    benefits: [
      'Inbox unifiée pour tous les canaux',
      'Historique complet des conversations',
      'Réponses depuis TriggerFlow ou Thaïs',
      'Synchronisation bidirectionnelle',
    ],
    Visual: MessagingHubVisual,
  },
  {
    id: 'forms',
    icon: FileText,
    title: 'Collectez les infos clients avant même leur arrivée',
    description:
      'Formulaires pré-séjour, préférences, allergies... tout remonte automatiquement dans Thaïs.',
    benefits: [
      'Éditeur drag & drop sans code',
      'Synchronisation 2-way avec Thaïs',
      'Réponses illimitées',
      'Logique conditionnelle avancée',
    ],
    Visual: FormBuilderVisual,
  },
  {
    id: 'catalog',
    icon: ShoppingBag,
    title: 'Vendez vos services additionnels sans lever le petit doigt',
    description:
      'Spa, restaurant, late check-out... proposés automatiquement au bon moment.',
    benefits: [
      'Catalogue produits/services personnalisable',
      'Pages de vente brandées',
      'Envoi automatique selon le profil client',
      'Synchronisation 2-way avec Thaïs PMS',
    ],
    Visual: CatalogVisual,
  },
  {
    id: 'reviews',
    icon: Star,
    title: 'Tous vos avis centralisés, réponses générées par IA',
    description:
      'Google, Booking, TripAdvisor, Airbnb : tous vos avis au même endroit. Stats unifiées, réponses en un clic grâce à l\'IA.',
    benefits: [
      'Dashboard unifié de tous vos avis',
      'Réponses générées par IA en 1 clic',
      'Résumés automatiques des tendances',
      'Alertes pour avis négatifs',
    ],
    Visual: ReviewsVisual,
  },
];

const AUTOPLAY_DURATION = 8000; // 8 seconds per item

interface ProgressBarProps {
  progress: number;
  isActive: boolean;
}

function ProgressBar({ progress, isActive }: ProgressBarProps) {
  return (
    <div
      className={cn(
        'h-1 bg-brand-primary/10 rounded-full overflow-hidden transition-opacity duration-300',
        isActive ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div
        className="h-full bg-brand-primary rounded-full transition-[width] duration-100 ease-linear"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

interface AccordionItemProps {
  feature: AccordionFeature;
  isActive: boolean;
  onClick: () => void;
  progress: number;
  showVisual?: boolean;
}

function AccordionItem({
  feature,
  isActive,
  onClick,
  progress,
  showVisual = false,
}: AccordionItemProps) {
  const Icon = feature.icon;
  const Visual = feature.Visual;

  return (
    <div
      className={cn(
        'rounded-xl border transition-all duration-300',
        isActive
          ? 'border-brand-primary bg-white shadow-lg shadow-brand-primary/5'
          : 'border-gray-200 bg-white hover:border-brand-primary/30'
      )}
    >
      {/* Header */}
      <button
        onClick={onClick}
        className="w-full p-4 md:p-5 flex items-start gap-4 text-left"
        aria-expanded={isActive}
        id={`accordion-header-${feature.id}`}
        aria-controls={`accordion-panel-${feature.id}`}
      >
        <div
          className={cn(
            'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300',
            isActive
              ? 'bg-brand-primary text-white'
              : 'bg-brand-primary/10 text-brand-primary'
          )}
        >
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              'font-semibold text-base md:text-lg transition-colors',
              isActive ? 'text-brand-dark' : 'text-gray-700'
            )}
          >
            {feature.title}
          </h3>

          {!isActive && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-1">
              {feature.description}
            </p>
          )}
        </div>
      </button>

      {/* Progress bar (visible when active) */}
      <div className="px-5 pb-1">
        <ProgressBar progress={progress} isActive={isActive} />
      </div>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            id={`accordion-panel-${feature.id}`}
            role="region"
            aria-labelledby={`accordion-header-${feature.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-2">
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                {feature.description}
              </p>

              <ul className="space-y-2">
                {feature.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary/10">
                      <Check
                        className="h-3 w-3 text-brand-primary"
                        strokeWidth={3}
                      />
                    </div>
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Mobile only: show visual inline */}
              {showVisual && (
                <div className="mt-6">
                  <Visual />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AccordionSwitchback() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check for reduced motion preference on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReducedMotion) {
        setIsPaused(true);
      }
    }
  }, []);

  // Auto-play logic with interval
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Update progress every 50ms for smooth animation
    const TICK_INTERVAL = 50;
    const PROGRESS_INCREMENT = TICK_INTERVAL / AUTOPLAY_DURATION;

    intervalRef.current = setInterval(() => {
      progressRef.current += PROGRESS_INCREMENT;

      if (progressRef.current >= 1) {
        // Move to next item
        setActiveIndex((prev) => (prev + 1) % FEATURES.length);
        progressRef.current = 0;
      }

      setProgress(progressRef.current);
    }, TICK_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused]);

  const handleItemClick = useCallback((index: number) => {
    setActiveIndex(index);
    progressRef.current = 0;
    setProgress(0);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          handleItemClick((activeIndex + 1) % FEATURES.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          handleItemClick(
            (activeIndex - 1 + FEATURES.length) % FEATURES.length
          );
          break;
        case 'Home':
          e.preventDefault();
          handleItemClick(0);
          break;
        case 'End':
          e.preventDefault();
          handleItemClick(FEATURES.length - 1);
          break;
      }
    },
    [activeIndex, handleItemClick]
  );

  const ActiveVisual = FEATURES[activeIndex].Visual;

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-emerald-100 rounded-full mb-6">
            <Zap className="w-5 h-5 text-brand-primary" />
            <span className="text-sm font-semibold text-brand-primary">
              Fonctionnalités
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl md:text-5xl">
            Tout ce dont vous avez besoin,{' '}
            <span className="text-brand-primary">rien de plus</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Des outils pensés pour les hôteliers qui réduisent votre charge
            mentale au quotidien
          </p>
        </motion.div>

        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDown}
        >
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
            {/* Accordion */}
            <div className="space-y-3" role="tablist">
              {FEATURES.map((feature, index) => (
                <AccordionItem
                  key={feature.id}
                  feature={feature}
                  isActive={activeIndex === index}
                  onClick={() => handleItemClick(index)}
                  progress={activeIndex === index ? progress : 0}
                  showVisual={false}
                />
              ))}
            </div>

            {/* Visual Panel */}
            <div className="sticky top-24 self-start">
              <div className="min-h-[400px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="w-full"
                  >
                    <ActiveVisual />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-3">
            {FEATURES.map((feature, index) => (
              <AccordionItem
                key={feature.id}
                feature={feature}
                isActive={activeIndex === index}
                onClick={() => handleItemClick(index)}
                progress={activeIndex === index ? progress : 0}
                showVisual={true}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
