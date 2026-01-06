'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, ArrowLeft, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { solutions } from '@/data/solutions';
import { modules } from '@/data/modules';

interface SolutionPageContentProps {
  solutionSlug: string;
}

export default function SolutionPageContent({ solutionSlug }: SolutionPageContentProps) {
  const t = useTranslations('solutionPage');
  const prefersReducedMotion = useReducedMotion();

  // Fetch full solution data with icons on client side
  const solution = solutions[solutionSlug];

  if (!solution) {
    return null;
  }

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

  const Icon = solution.icon;

  return (
    <main className="min-h-screen bg-white">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('backToHome')}
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-light via-white to-emerald-50/30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <motion.div {...fadeIn} className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 rounded-full mb-6">
                <Icon className="w-5 h-5 text-brand-primary" />
                <span className="text-brand-primary font-medium">
                  {solution.title}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-6 leading-tight">
                {solution.headline}
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {solution.description}
              </p>

              {/* Stats badges */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                {Object.entries(solution.stats).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-100"
                  >
                    <span className="text-brand-primary font-bold text-lg">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="https://app.lemcal.com/@trigger-flow/demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  {t('cta.demo')}
                  <ArrowRight className="w-5 h-5" />
                </a>
                <Link
                  href="/tarifs"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-brand-dark px-8 py-4 rounded-lg font-semibold border border-gray-200 transition-all"
                >
                  {t('cta.pricing')}
                </Link>
              </div>
            </motion.div>

            {/* Illustration */}
            <motion.div
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-gradient-to-br from-brand-primary/5 to-brand-primary/10 rounded-3xl p-8 lg:p-12">
                <div className="flex items-center justify-center">
                  <Icon className="w-32 h-32 lg:w-48 lg:h-48 text-brand-primary/30" />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl" />
              <div className="absolute -top-8 -left-8 w-48 h-48 bg-emerald-100/50 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              {t('challenges.title')}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('challenges.subtitle')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solution.challenges.map((challenge, index) => {
              const ChallengeIcon = challenge.icon;
              return (
                <motion.div
                  key={index}
                  {...stagger}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                    <ChallengeIcon className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-dark mb-2">
                    {challenge.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{challenge.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              {t('features.title')}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solution.features.map((feature, index) => {
              const moduleData = modules[feature.slug];
              const ModuleIcon = moduleData?.icon;

              return (
                <motion.div
                  key={index}
                  {...stagger}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/produit/${feature.slug}` as any}
                    className="group block bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-primary/20 transition-all h-full"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-primary/20 transition-colors">
                        {ModuleIcon && (
                          <ModuleIcon className="w-6 h-6 text-brand-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-brand-dark mb-1 group-hover:text-brand-primary transition-colors">
                          {feature.highlight}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {moduleData?.headline || ''}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-brand-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              {t('useCases.title')}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('useCases.subtitle')}
            </p>
          </motion.div>

          <div className="space-y-8">
            {solution.useCases.map((useCase, index) => (
              <motion.div
                key={index}
                {...stagger}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm"
              >
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary font-bold mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-brand-dark mb-4">
                      {useCase.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>

                  {/* Workflow Steps */}
                  <div className="flex flex-wrap items-center gap-2">
                    {useCase.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-center">
                        <div className="bg-brand-light rounded-lg px-4 py-2">
                          <span className="text-sm font-medium text-brand-dark">
                            {step}
                          </span>
                        </div>
                        {stepIndex < useCase.steps.length - 1 && (
                          <ArrowRight className="w-4 h-4 text-brand-primary mx-2 flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-24 bg-brand-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center">
            <Quote className="w-12 h-12 text-brand-primary mx-auto mb-8 opacity-50" />
            <blockquote className="text-xl md:text-2xl font-light mb-8 leading-relaxed">
              &ldquo;{solution.testimonial.quote}&rdquo;
            </blockquote>
            <div>
              <p className="font-semibold text-lg">
                {solution.testimonial.author}
              </p>
              <p className="text-white/60">
                {solution.testimonial.role}, {solution.testimonial.hotel}
              </p>
              <p className="text-white/40 text-sm">
                {solution.testimonial.location}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              {t('integrations.title')}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('integrations.subtitle')}
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {solution.integrations.map((integration, index) => (
              <motion.div
                key={index}
                {...stagger}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl px-8 py-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-lg font-semibold text-brand-dark">
                  {integration}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeIn} className="text-center mt-8">
            <Link
              href="/integrations"
              className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary/80 font-medium transition-colors"
            >
              {t('integrations.viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-primary to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.lemcal.com/@trigger-flow/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-brand-primary px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                {t('cta.demo')}
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold border-2 border-white/30 transition-all"
              >
                {t('cta.contact')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
