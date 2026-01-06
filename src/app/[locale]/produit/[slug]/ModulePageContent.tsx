'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Check, X, ArrowLeft, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { modules } from '@/data/modules';

// Import mockups
import { DashboardMockup } from '@/components/mockups/DashboardMockup';
import { EmailMockup } from '@/components/mockups/EmailMockup';
import { WorkflowBuilderMockup } from '@/components/mockups/WorkflowBuilderMockup';
import { CampaignMockup } from '@/components/mockups/CampaignMockup';
import { CRMMockup } from '@/components/mockups/CRMMockup';
import { WhatsAppMockup } from '@/components/mockups/WhatsAppMockup';

interface ModulePageContentProps {
  moduleSlug: string;
}

// Map mockup names to components (only those that don't require children)
const mockupComponents: Record<string, React.ComponentType> = {
  DashboardMockup,
  EmailMockup,
  WorkflowBuilderMockup,
  CampaignMockup,
  CRMMockup,
  WhatsAppMockup,
  PhoneMockup: DashboardMockup, // Fallback to DashboardMockup for PhoneMockup
};

export default function ModulePageContent({ moduleSlug }: ModulePageContentProps) {
  const t = useTranslations('modulePage');
  const prefersReducedMotion = useReducedMotion();

  // Fetch full module data with icons on client side
  const module = modules[moduleSlug];

  if (!module) {
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

  const MockupComponent = mockupComponents[module.mockup] || DashboardMockup;
  const Icon = module.icon;

  const relatedModulesData = module.relatedModules
    .map((slug) => modules[slug])
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-white">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/produit"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('backToProduct')}
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
                  {module.title}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-6 leading-tight">
                {module.headline}
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {module.description}
              </p>

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

            {/* Mockup */}
            <motion.div
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 transform perspective-1000">
                <MockupComponent />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl" />
              <div className="absolute -top-8 -left-8 w-48 h-48 bg-emerald-100/50 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem / Solution Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              {t('problemSolution.title')}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('problemSolution.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pain Points (Before) */}
            <motion.div
              {...stagger}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark">
                  {t('problemSolution.before')}
                </h3>
              </div>
              <ul className="space-y-4">
                {module.painPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-4 h-4 text-red-500" />
                    </span>
                    <span className="text-gray-600">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Benefits (After) */}
            <motion.div
              {...stagger}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 border border-brand-primary/20 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
                  <Check className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark">
                  {t('problemSolution.after')}
                </h3>
              </div>
              <ul className="space-y-4">
                {module.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-brand-primary" />
                    </span>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section (Zigzag) */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              {t('features.title')}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </motion.div>

          <div className="space-y-24">
            {module.features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  {...stagger}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    'grid md:grid-cols-2 gap-12 items-center',
                    !isEven && 'md:flex-row-reverse'
                  )}
                >
                  {/* Content */}
                  <div className={cn(!isEven && 'md:order-2')}>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-primary/10 mb-6">
                      <FeatureIcon className="w-8 h-8 text-brand-primary" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Visual Placeholder */}
                  <div
                    className={cn(
                      'relative aspect-video bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl overflow-hidden border border-gray-200',
                      !isEven && 'md:order-1'
                    )}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <FeatureIcon className="w-16 h-16 text-brand-primary/30 mx-auto mb-4" />
                        <span className="text-gray-400 text-sm">
                          {feature.title}
                        </span>
                      </div>
                    </div>
                    {/* Decorative dots pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage:
                            'radial-gradient(circle, #00875a 1px, transparent 1px)',
                          backgroundSize: '20px 20px',
                        }}
                      />
                    </div>
                  </div>
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {module.useCases.map((useCase, index) => (
              <motion.div
                key={index}
                {...stagger}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-4">
                  <span className="text-brand-primary font-bold">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-brand-dark mb-2">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 text-sm">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-24 bg-brand-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-8">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <blockquote className="text-2xl md:text-3xl font-light mb-8 leading-relaxed">
              &ldquo;{t('testimonial.quote')}&rdquo;
            </blockquote>
            <div>
              <p className="font-semibold text-lg">{t('testimonial.author')}</p>
              <p className="text-white/60">{t('testimonial.role')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Modules Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              {t('related.title')}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('related.subtitle')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedModulesData.map((relatedModule, index) => {
              const RelatedIcon = relatedModule.icon;
              return (
                <motion.div
                  key={relatedModule.slug}
                  {...stagger}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/produit/${relatedModule.slug}`}
                    className="group block bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-primary/20 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-primary/20 transition-colors">
                        <RelatedIcon className="w-6 h-6 text-brand-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors">
                          {relatedModule.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {relatedModule.headline}
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
