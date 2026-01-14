'use client';

import { motion } from 'framer-motion';
import { Star, Quote, TrendingUp, Badge as BadgeIcon } from 'lucide-react';
import { Container, Card } from '@/components/ui';

const TESTIMONIALS = [
  {
    quote:
      'Avant TriggerFlow, on passait 2 heures par jour à envoyer des emails manuellement. Aujourd\'hui tout est automatisé et personnalisé. Nos clients reçoivent le bon message selon leur profil, et nous on se concentre sur ce qui compte pour nous.',
    author: 'Marie Dupois',
    role: 'Directrice',
    hotel: 'Hôtel & Spa Le Provençal',
    stars: 4,
    badge: 'Client Thaïs',
    metric: null,
  },
  {
    quote:
      'Le plus gros changement : nos clients soirée étape ne reçoivent plus le même email que nos séjours romantiques. Les retours sont excellents.',
    author: 'Jean-Pierre Martin',
    role: 'Responsable Réception',
    hotel: 'Le Relais des Vignes',
    stars: 3,
    badge: null,
    metric: '+30% taux d\'ouverture',
  },
  {
    quote:
      'On a doublé nos avis Google en 3 mois grâce aux demandes automatiques post-séjour. Et l\'intégration avec Thaïs a pris 5 minutes.',
    author: 'Sophie Renard',
    role: 'Propriétaire',
    hotel: 'Maison d\'hôtes Les Jardins',
    stars: 4,
    badge: null,
    metric: '+89 avis en 3 mois',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export function ThaisTestimonials() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-brand-light/30 to-white">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl md:text-5xl">
            Ce qu'en disent les hôteliers <span className="text-brand-primary">Thaïs</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Des résultats concrets, des témoignages authentiques
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group h-full flex flex-col border-2 border-zinc-100 bg-white p-6 transition-all duration-300 hover:border-brand-primary/30 hover:shadow-xl">
                {/* Quote Section - grows to fill space */}
                <div className="flex-1">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Quote className="h-8 w-8 text-brand-primary/20" />
                  </div>

                  {/* Quote Text */}
                  <blockquote className="text-zinc-700 leading-relaxed italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Author Info - fixed at bottom */}
                <div className="border-t border-zinc-100 pt-4 mt-6">
                  <div className="flex items-center gap-3 mb-3">
                    {/* Avatar */}
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-dark flex items-center justify-center text-white font-semibold">
                      {testimonial.author
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-brand-dark">{testimonial.author}</p>
                      <p className="text-sm text-zinc-500">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Hotel Info */}
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-sm font-medium text-zinc-700">{testimonial.hotel}</p>
                    <StarRating count={testimonial.stars} />
                  </div>

                  {/* Badge or Metric */}
                  <div className="flex flex-wrap gap-2">
                    {testimonial.badge && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-semibold rounded-full">
                        <BadgeIcon className="h-3 w-3" />
                        {testimonial.badge}
                      </span>
                    )}
                    {testimonial.metric && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">
                        <TrendingUp className="h-3 w-3" />
                        {testimonial.metric}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
