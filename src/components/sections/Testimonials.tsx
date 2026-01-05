'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Container, SectionHeader } from '@/components/ui';

const testimonials = [
  {
    key: 'sandrine',
    name: 'Sandrine Surrel',
    role: 'Nature Cathare',
    avatar: 'SS',
  },
  {
    key: 'yves',
    name: 'Yves Janin',
    role: 'Studio Péniche',
    avatar: 'YJ',
  },
  {
    key: 'dominique',
    name: 'Dominique Sallenave',
    role: 'Maison Maxana',
    avatar: 'DS',
  },
] as const;

export function Testimonials() {
  const t = useTranslations('testimonials');
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="relative mx-auto mt-12 max-w-3xl">
          {/* Navigation buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 z-10 -translate-x-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-transform hover:scale-110 md:-translate-x-12"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 text-brand-dark" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 rounded-full bg-white p-2 shadow-lg transition-transform hover:scale-110 md:translate-x-12"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 text-brand-dark" />
          </button>

          {/* Testimonial card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl bg-brand-light p-8 md:p-12"
            >
              <Quote className="mb-6 h-10 w-10 text-brand-primary/30" />

              <blockquote className="text-lg leading-relaxed text-brand-dark md:text-xl">
                "{t(`items.${testimonials[current].key}.quote`)}"
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                {/* Avatar placeholder */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary text-lg font-bold text-white">
                  {testimonials[current].avatar}
                </div>

                <div>
                  <p className="font-semibold text-brand-dark">
                    {testimonials[current].name}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {testimonials[current].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots indicator */}
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === current
                    ? 'w-6 bg-brand-primary'
                    : 'bg-zinc-300 hover:bg-zinc-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
