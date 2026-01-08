'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Container } from '@/components/ui';
import { Star, TrendingUp, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const useCases = [
  {
    name: 'Hôtel Spa du Lac',
    location: 'Annecy',
    category: 'Boutique Hôtel',
    rooms: '45 chambres',
    image: '🏨',
    stats: [
      { label: 'Taux d\'ouverture', value: '+45%', icon: TrendingUp },
      { label: 'Réservations directes', value: '+32%', icon: Users },
      { label: 'Note Google', value: '4.8/5', icon: Star },
    ],
    quote: 'Grâce à TriggerFlow, nous avons automatisé 100% de notre communication client. Les workflows personnalisés nous font gagner 15h par semaine !',
    author: 'Marie Dubois',
    role: 'Directrice',
    results: [
      'Automatisation complète des emails pré/post séjour',
      '200+ avis Google collectés automatiquement',
      '15h/semaine économisées sur la gestion manuelle',
    ],
  },
  {
    name: 'Les Jardins de Provence',
    location: 'Aix-en-Provence',
    category: 'Hôtel de Charme',
    rooms: '28 chambres',
    image: '🌺',
    stats: [
      { label: 'Upsells', value: '+€12k/mois', icon: Award },
      { label: 'Satisfaction client', value: '98%', icon: Star },
      { label: 'Messages traités', value: '2,400+', icon: Users },
    ],
    quote: 'Le hub de messagerie unifié a transformé notre service client. Plus besoin de jongler entre 5 outils différents, tout est centralisé !',
    author: 'Thomas Bernard',
    role: 'Responsable Opérations',
    results: [
      'Hub unifié Email/SMS/WhatsApp',
      '€12k de revenus upsell supplémentaires par mois',
      'Temps de réponse divisé par 3 (8min → 2min)',
    ],
  },
  {
    name: 'Domaine des Vignes',
    location: 'Bordeaux',
    category: 'Hôtel & Restaurant',
    rooms: '32 chambres',
    image: '🍇',
    stats: [
      { label: 'Avis collectés', value: '+180/mois', icon: Star },
      { label: 'E-réputation', value: '+1.2★', icon: Award },
      { label: 'Taux de réponse', value: '95%', icon: TrendingUp },
    ],
    quote: 'La collecte automatique d\'avis a boosté notre e-réputation. Nous sommes passés de 3.9 à 4.7 étoiles sur Google en 6 mois !',
    author: 'Sophie Martin',
    role: 'Gérante',
    results: [
      'Demande d\'avis automatique après chaque séjour',
      'Note Google passée de 3.9 à 4.7 en 6 mois',
      'Dashboard unifié Google/Booking/TripAdvisor',
    ],
  },
];

export function ThaisUseCases() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll every 6 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % useCases.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + useCases.length) % useCases.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % useCases.length);
  };

  const currentUseCase = useCases[currentIndex];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-brand-primary/10 rounded-full mb-6">
            <Users className="w-5 h-5 text-brand-primary" />
            <span className="text-sm font-semibold text-brand-primary">Ils nous font confiance</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl md:text-5xl">
            Des résultats concrets pour les hôteliers Thaïs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Découvrez comment nos clients utilisent TriggerFlow pour automatiser leur communication et booster leurs performances
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Card with AnimatePresence for smooth transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-10 shadow-xl"
            >
              {/* Hotel Info */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-primary/20 to-purple-500/20 flex items-center justify-center text-4xl flex-shrink-0">
                  {currentUseCase.image}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-brand-dark">{currentUseCase.name}</h3>
                  <p className="text-sm text-gray-500">
                    {currentUseCase.location} • {currentUseCase.category} • {currentUseCase.rooms}
                  </p>
                </div>
              </div>

              {/* Stats Grid - Horizontal */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {currentUseCase.stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                      className="bg-gradient-to-br from-brand-light/30 to-purple-50/30 rounded-xl p-4 border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-brand-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">{stat.label}</p>
                          <p className="text-xl font-bold text-brand-primary">{stat.value}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Quote */}
              <blockquote className="mb-6 bg-gradient-to-r from-brand-primary/5 to-purple-500/5 p-6 rounded-xl border-l-4 border-brand-primary">
                <p className="text-gray-700 italic leading-relaxed mb-4 text-lg">
                  &ldquo;{currentUseCase.quote}&rdquo;
                </p>
                <footer className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-dark flex items-center justify-center text-white font-semibold">
                    {currentUseCase.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark">{currentUseCase.author}</p>
                    <p className="text-sm text-gray-500">{currentUseCase.role}</p>
                  </div>
                </footer>
              </blockquote>

              {/* Results */}
              <div className="pt-6 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Résultats obtenus
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {currentUseCase.results.map((result, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                      className="flex items-start gap-2 text-sm text-gray-700 bg-green-50 p-3 rounded-lg"
                    >
                      <span className="text-green-500 mt-0.5 flex-shrink-0 text-lg">✓</span>
                      <span>{result}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Navigation */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {useCases.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-brand-primary'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                } rounded-full`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            Vous aussi, automatisez votre communication et boostez vos performances
          </p>
          <a
            href="https://app.lemcal.com/@trigger-flow/tf-thais"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-primary to-emerald-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all"
          >
            <Award className="w-5 h-5" />
            Discuter avec un expert
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
