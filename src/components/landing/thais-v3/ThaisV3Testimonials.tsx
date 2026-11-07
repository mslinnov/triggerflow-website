'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Container } from '@/components/ui';

// Vrais clients Thaïs (docs/preuves.md, témoignages publiés).
const testimonials = [
  {
    quote: "Avec TriggerFlow, on part du besoin, on dessine le scénario qu'on souhaite mettre en place… et ensuite, on le paramètre sur l'outil, sans se retrouver bloqué.",
    author: 'Baptiste Legout',
    role: 'Propriétaire',
    hotel: 'Hôtel Causse Comtal, Aveyron',
    metric: 'Client Thaïs',
  },
  {
    quote: "On peut automatiser des messages très personnalisés, anticiper toutes les situations, pour que le bon client reçoive le message qu'on veut, au meilleur moment.",
    author: 'Guillaume Broutin',
    role: 'Propriétaire',
    hotel: 'Le Vieux Pressoir, Alsace',
    metric: 'Client Thaïs',
  },
  {
    quote: "Pouvoir envoyer automatiquement une demande de paiement, suivre si le client a payé, puis déclencher des relances : c'est un énorme gain de temps et de sérénité.",
    author: 'Carine Chausson',
    role: 'Directrice',
    hotel: 'Hôtel Arc en Ciel, Colmar',
    metric: 'Thaïs connecté dans les deux sens',
  },
];

export function ThaisV3Testimonials() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-[var(--v3-bg-primary)] py-20 md:py-28">
      <Container>
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-[var(--v3-accent-gold)]/30 bg-[var(--v3-accent-gold-light)] px-4 py-2 text-sm font-medium text-[var(--v3-accent-gold)]">
            Témoignages
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold tracking-tight text-[var(--v3-text-primary)] md:text-4xl lg:text-5xl">
            Ils l'ont fait,{' '}
            <span className="text-[var(--v3-accent-green)]">vous aussi vous pouvez</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--v3-text-secondary)]">
            Des hôteliers comme vous qui ont simplifié leur quotidien
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col rounded-2xl border border-[var(--v3-border)] bg-[var(--v3-bg-secondary)] p-6 shadow-sm"
            >
              {/* Quote icon */}
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--v3-accent-green)]/10">
                <Quote className="h-5 w-5 text-[var(--v3-accent-green)]" />
              </div>

              {/* Quote */}
              <blockquote className="mb-6 flex-1 text-[var(--v3-text-primary)]">
                "{testimonial.quote}"
              </blockquote>

              {/* Metric badge */}
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--v3-accent-green)]/10 px-3 py-1.5">
                <Star className="h-4 w-4 text-[var(--v3-accent-green)]" />
                <span className="text-sm font-semibold text-[var(--v3-accent-green)]">{testimonial.metric}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-[var(--v3-border)] pt-4">
                <div className="h-12 w-12 rounded-full bg-[var(--v3-bg-card)]" />
                <div>
                  <p className="font-semibold text-[var(--v3-text-primary)]">{testimonial.author}</p>
                  <p className="text-sm text-[var(--v3-text-muted)]">
                    {testimonial.role}, {testimonial.hotel}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust rating */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8"
        >
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-5 w-5 fill-[var(--v3-accent-gold)] text-[var(--v3-accent-gold)]" />
            ))}
          </div>
          <span className="text-[var(--v3-text-secondary)]">
            <strong className="font-semibold text-[var(--v3-text-primary)]">5/5</strong> sur Google (3 avis)
          </span>
        </motion.div>
      </Container>
    </section>
  );
}
