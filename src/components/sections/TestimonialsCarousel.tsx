'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Badge } from '@/components/ui';
import { fadeInUp, defaultViewport } from '@/lib/animations';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TOTAL_ITEMS = 5;
const AUTOPLAY_INTERVAL = 6000;

const avatarGradients = [
  'from-brand-accent-dark to-brand-accent',
  'from-brand-primary to-brand-dark',
  'from-brand-accent to-brand-accent-dark',
  'from-brand-dark to-brand-primary',
  'from-brand-primary to-brand-accent',
];

export function TestimonialsCarousel() {
  const t = useTranslations('testimonialsCarousel');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TOTAL_ITEMS);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + TOTAL_ITEMS) % TOTAL_ITEMS);
  }, []);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const gradient = avatarGradients[currentIndex % avatarGradients.length];

  return (
    <section className="bg-v3-bg-secondary py-16 md:py-24">
      <Container>
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
          className="mb-12 text-center"
        >
          <Badge variant="primary" className="mb-4">
            {t('badge')}
          </Badge>
          <h2 className="text-3xl font-bold text-v3-text-primary md:text-4xl">
            {t('title')}
          </h2>
        </motion.div>

        {/* Single testimonial with smooth crossfade */}
        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation buttons */}
          <button
            onClick={prev}
            className="absolute -left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-v3-border/50 bg-white p-2.5 shadow-md transition-all hover:scale-110 hover:shadow-lg md:-left-14"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 text-v3-text-primary" />
          </button>

          <button
            onClick={next}
            className="absolute -right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-v3-border/50 bg-white p-2.5 shadow-md transition-all hover:scale-110 hover:shadow-lg md:-right-14"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 text-v3-text-primary" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="rounded-2xl border border-v3-border/50 bg-white p-8 shadow-sm text-center md:p-12"
            >
              {/* Quote icon */}
              <Quote className="mx-auto mb-6 h-8 w-8 text-brand-accent/40" />

              {/* Quote text */}
              <blockquote className="text-lg font-medium leading-relaxed text-v3-text-primary md:text-xl">
                &ldquo;{t(`items.${currentIndex}.quote`)}&rdquo;
              </blockquote>

              {/* Divider */}
              <div className="mx-auto my-6 h-px w-16 bg-brand-accent/30" />

              {/* Author row */}
              <div className="flex flex-col items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-sm font-bold text-white`}
                >
                  {t(`items.${currentIndex}.initials`)}
                </div>
                <div>
                  <p className="font-semibold text-v3-text-primary">
                    {t(`items.${currentIndex}.name`)}
                  </p>
                  <p className="text-sm text-v3-text-secondary">
                    {t(`items.${currentIndex}.title`)}
                  </p>
                </div>
              </div>

              {/* Metric highlight */}
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-primary/5 px-4 py-2">
                <Star className="h-4 w-4 fill-brand-primary text-brand-primary" />
                <span className="text-sm font-semibold text-brand-primary">
                  {t(`items.${currentIndex}.metric.value`)}
                </span>
                <span className="text-xs text-brand-primary/70">
                  {t(`items.${currentIndex}.metric.label`)}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots indicator */}
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: TOTAL_ITEMS }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-6 bg-brand-primary'
                  : 'w-2 bg-v3-border hover:bg-brand-primary/40'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
