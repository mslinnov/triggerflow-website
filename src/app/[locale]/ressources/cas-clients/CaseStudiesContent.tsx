'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, Building, Users, Star, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const caseStudies = [
  {
    slug: 'hotel-spa-du-lac',
    name: 'Hôtel & Spa du Lac',
    type: 'Hôtel indépendant',
    location: 'Annecy',
    quote: 'TriggerFlow nous a permis de passer de 45 à 120 avis Google en 4 mois.',
    results: [
      { metric: '+150%', label: 'Avis Google' },
      { metric: '10h', label: 'Gagnées/semaine' },
      { metric: '4.6★', label: 'Note Google' },
    ],
    objectives: ['Avis', 'Automatisation'],
  },
  {
    slug: 'groupe-hotelier-provence',
    name: 'Groupe Hôtelier de Provence',
    type: 'Groupe hôtelier',
    location: 'Provence (8 hôtels)',
    quote: 'Une stratégie marketing unifiée sur nos 8 établissements, enfin !',
    results: [
      { metric: '8', label: 'Hôtels connectés' },
      { metric: '+25%', label: 'Réservations directes' },
      { metric: '2 sem.', label: 'Déploiement' },
    ],
    objectives: ['Fidélité', 'Automatisation'],
  },
  {
    slug: 'residence-cote-azur',
    name: "Résidences Côte d'Azur",
    type: 'Résidence de tourisme',
    location: 'Nice',
    quote: "Les arrivées autonomes étaient un cauchemar. Plus maintenant.",
    results: [
      { metric: '-80%', label: 'Appels entrants' },
      { metric: '98%', label: 'Satisfaction proprio' },
      { metric: '2 min', label: 'Check-in moyen' },
    ],
    objectives: ['Automatisation'],
  },
  {
    slug: 'camping-les-pins',
    name: 'Camping Les Pins',
    type: 'Camping',
    location: 'Vendée',
    quote: 'Notre taux de re-réservation a plus que doublé grâce aux campagnes early booking.',
    results: [
      { metric: '+120%', label: 'Re-réservation' },
      { metric: '+50%', label: 'Cross-sell' },
      { metric: '15K€', label: 'CA additionnel' },
    ],
    objectives: ['Fidélité', 'Upsell'],
  },
  {
    slug: 'boutique-hotel-bordeaux',
    name: 'Le Boutique Hotel',
    type: 'Hôtel indépendant',
    location: 'Bordeaux',
    quote: "L'upsell automatique nous rapporte 3000€ de plus par mois.",
    results: [
      { metric: '+17%', label: 'Panier moyen' },
      { metric: '23%', label: "Taux d'upsell" },
      { metric: '10x', label: 'ROI TriggerFlow' },
    ],
    objectives: ['Upsell', 'Automatisation'],
  },
];

const types = ['Tous', 'Hôtel indépendant', 'Groupe hôtelier', 'Résidence de tourisme', 'Camping'];
const objectives = ['Tous', 'Automatisation', 'Avis', 'Upsell', 'Fidélité'];

const globalStats = [
  { value: '200+', label: 'Hôtels' },
  { value: '+17%', label: 'Panier moyen' },
  { value: '+150%', label: 'Avis Google' },
  { value: '10h', label: '/semaine gagnées' },
];

export default function CaseStudiesContent() {
  const t = useTranslations('caseStudies');
  const prefersReducedMotion = useReducedMotion();
  const [activeType, setActiveType] = useState('Tous');
  const [activeObjective, setActiveObjective] = useState('Tous');

  const fadeIn = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
      };

  const stagger = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
      };

  const filteredStudies = caseStudies.filter((study) => {
    const typeMatch = activeType === 'Tous' || study.type === activeType;
    const objectiveMatch = activeObjective === 'Tous' || study.objectives.includes(activeObjective);
    return typeMatch && objectiveMatch;
  });

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-light via-white to-emerald-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Global Stats */}
      <section className="py-12 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {globalStats.map((stat, index) => (
              <motion.div
                key={index}
                {...stagger}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-brand-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-sm font-medium text-gray-500 self-center mr-2">{t('filters.type')}:</span>
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm transition-all',
                    activeType === type
                      ? 'bg-brand-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-sm font-medium text-gray-500 self-center mr-2">{t('filters.objective')}:</span>
              {objectives.map((objective) => (
                <button
                  key={objective}
                  onClick={() => setActiveObjective(objective)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm transition-all',
                    activeObjective === objective
                      ? 'bg-brand-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {objective}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudies.map((study, index) => (
              <motion.div
                key={study.slug}
                {...stagger}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="group bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-brand-primary/20 transition-all cursor-pointer h-full flex flex-col"
                  onClick={() => alert(t('comingSoon'))}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                      <Building className="w-6 h-6 text-brand-primary" />
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      {study.type}
                    </span>
                  </div>

                  {/* Info */}
                  <h3 className="text-lg font-bold text-brand-dark mb-1 group-hover:text-brand-primary transition-colors">
                    {study.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{study.location}</p>

                  {/* Quote */}
                  <blockquote className="text-gray-600 italic mb-6 flex-1">
                    &ldquo;{study.quote}&rdquo;
                  </blockquote>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {study.results.map((result, i) => (
                      <div key={i} className="text-center p-2 bg-brand-light/50 rounded-lg">
                        <div className="text-sm font-bold text-brand-primary">{result.metric}</div>
                        <div className="text-xs text-gray-500">{result.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-medium text-brand-primary group-hover:text-brand-dark transition-colors">
                    {t('readMore')}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-primary to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('cta.title')}
            </h2>
            <a
              href="https://app.lemcal.com/@trigger-flow/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-brand-primary px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              {t('cta.button')}
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
