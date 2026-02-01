'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Check, X, Plug } from 'lucide-react';
import { cn } from '@/lib/utils';
import { solutions } from '@/data/solutions';
import { modules } from '@/data/modules';
import { AnimatedStat } from '@/components/ui/AnimatedStat';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

// Import mockups
import { DashboardMockup } from '@/components/mockups/DashboardMockup';
import { WorkflowBuilderMockup } from '@/components/mockups/WorkflowBuilderMockup';
import { CampaignMockup } from '@/components/mockups/CampaignMockup';
import { WhatsAppMockup } from '@/components/mockups/WhatsAppMockup';
import { AnalyticsDashboardMockup } from '@/components/mockups/AnalyticsDashboardMockup';
import { ReviewCollectMockup } from '@/components/mockups/ReviewCollectMockup';
import { UpsellOfferMockup } from '@/components/mockups/UpsellOfferMockup';
import { LoyaltyPointsMockup } from '@/components/mockups/LoyaltyPointsMockup';
import { EmailMockup } from '@/components/mockups/EmailMockup';
import { SmsSendMockup } from '@/components/mockups/SmsSendMockup';
import { CRMMockup } from '@/components/mockups/CRMMockup';

const mockupComponents: Record<string, React.ComponentType> = {
  // Hero mockups
  DashboardMockup,
  WorkflowBuilderMockup,
  CampaignMockup,
  WhatsAppMockup,
  AnalyticsDashboardMockup,
  ReviewCollectMockup,
  UpsellOfferMockup,
  LoyaltyPointsMockup,
  // Module hero mockups
  EmailMockup,
  PhoneMockup: SmsSendMockup,
  CRMMockup,
};

interface SolutionPageContentProps {
  solutionSlug: string;
}

export default function SolutionPageContent({ solutionSlug }: SolutionPageContentProps) {
  const t = useTranslations('solutionPage');
  const prefersReducedMotion = useReducedMotion();

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

  const slideLeft = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, x: -40 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
      };

  const slideRight = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, x: 40 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
      };

  const Icon = solution.icon;
  const HeroMockup = solution.heroMockup ? mockupComponents[solution.heroMockup] : null;

  const relatedSolutionsData = (solution.relatedSolutions || [])
    .map((slug) => solutions[slug])
    .filter(Boolean);

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

      {/* ===== 1. HERO SECTION ===== */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-light via-white to-emerald-50/30" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #00875a 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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

            <motion.div
              {...fadeIn}
              transition={{ ...((fadeIn as { transition?: object }).transition || {}), delay: 0.2 }}
              className="relative"
            >
              {HeroMockup ? (
                <div className="relative z-10">
                  <HeroMockup />
                </div>
              ) : (
                <div className="relative z-10 bg-gradient-to-br from-brand-primary/5 to-brand-primary/10 rounded-3xl p-8 lg:p-12">
                  <div className="flex items-center justify-center">
                    <Icon className="w-32 h-32 lg:w-48 lg:h-48 text-brand-primary/30" />
                  </div>
                </div>
              )}
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl" />
              <div className="absolute -top-8 -left-8 w-48 h-48 bg-emerald-100/50 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 2. STATS BAR ===== */}
      {solution.stats && solution.stats.length > 0 && (
        <section className="py-8 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={cn(
              'grid gap-8',
              solution.stats.length === 3 ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4'
            )}>
              {solution.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  {...stagger}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-brand-primary mb-1">
                    <AnimatedStat value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== 3. PERSONA EMPATHY BANNER ===== */}
      {solution.persona && (
        <section className="py-10 md:py-12 bg-gradient-to-r from-brand-primary/5 via-emerald-50/30 to-brand-primary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeIn} className="text-center">
              <p className="text-sm font-medium text-brand-primary mb-2">
                {solution.persona.role}
              </p>
              <p className="text-xl md:text-2xl text-brand-dark font-light italic leading-relaxed">
                &ldquo;{solution.persona.painStatement}&rdquo;
              </p>
              <p className="mt-4 text-brand-primary font-semibold">
                {solution.persona.valueProposition}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* ===== 4. CHALLENGES SECTION ===== */}
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

      {/* ===== 5. AVANT / APRÈS ===== */}
      {solution.painPoints && solution.benefits && (
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeIn} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                {t('beforeAfter.title')}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {t('beforeAfter.subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* BEFORE */}
              <motion.div
                {...slideLeft}
                className="relative bg-gradient-to-br from-red-50 to-orange-50/50 rounded-2xl p-8 border border-red-100 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-100/40 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <X className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-red-900">
                        {t('beforeAfter.before')}
                      </h3>
                      <p className="text-sm text-red-600/70">{t('beforeAfter.beforeSub')}</p>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {solution.painPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-4 h-4 text-red-500" />
                        </span>
                        <span className="text-red-900/80 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* AFTER */}
              <motion.div
                {...slideRight}
                className="relative bg-gradient-to-br from-emerald-50 to-green-50/50 rounded-2xl p-8 border border-emerald-200 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/40 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
                      <Check className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-emerald-900">
                        {t('beforeAfter.after')}
                      </h3>
                      <p className="text-sm text-emerald-600/70">{t('beforeAfter.afterSub')}</p>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {solution.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-brand-primary" />
                        </span>
                        <span className="text-emerald-900/80 leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ===== 6. JOURNEY TIMELINE ===== */}
      {solution.journey && solution.journey.length > 0 && (
        <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'linear-gradient(45deg, #00875a 25%, transparent 25%, transparent 75%, #00875a 75%)',
            backgroundSize: '60px 60px',
          }} />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeIn} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                {t('journey.title')}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {t('journey.subtitle')}
              </p>
            </motion.div>

            <div className="relative">
              <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gray-200" />

              <div className={cn(
                'grid gap-4 md:gap-6',
                solution.journey.length <= 5 ? 'grid-cols-2 md:grid-cols-5' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
              )}>
                {solution.journey.map((step, index) => (
                  <motion.div
                    key={index}
                    {...stagger}
                    transition={{ delay: index * 0.1 }}
                    className="relative text-center"
                  >
                    <div className={cn(
                      'w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center relative z-10 transition-all',
                      step.active
                        ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25'
                        : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                    )}>
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                    <h3 className={cn(
                      'text-sm font-semibold mb-1',
                      step.active ? 'text-brand-dark' : 'text-gray-400'
                    )}>
                      {step.label}
                    </h3>
                    <p className={cn(
                      'text-xs',
                      step.active ? 'text-gray-600' : 'text-gray-400'
                    )}>
                      {step.description}
                    </p>
                    {step.active && (
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full">
                          <Icon className="w-3 h-3" />
                          TriggerFlow
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== 7. FEATURES — Zigzag with persona descriptions ===== */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              {t('features.title')}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </motion.div>

          <div className="space-y-20 md:space-y-28">
            {solution.features.map((feature, index) => {
              const moduleData = modules[feature.slug];
              const ModuleIcon = moduleData?.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
                >
                  <motion.div
                    {...(isEven ? slideLeft : slideRight)}
                    className={cn(!isEven && 'md:order-2')}
                  >
                    {ModuleIcon && (
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-primary/10 mb-5">
                        <ModuleIcon className="w-7 h-7 text-brand-primary" />
                      </div>
                    )}
                    <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4">
                      {feature.highlight}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      {feature.whyForPersona || moduleData?.headline || ''}
                    </p>
                    {feature.bullets && feature.bullets.length > 0 && (
                      <ul className="space-y-3">
                        {feature.bullets.map((bullet, bIndex) => (
                          <li key={bIndex} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-brand-primary" />
                            </div>
                            <span className="text-gray-700">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-6">
                      <Link
                        href={`/produit/${feature.slug}` as string}
                        className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary/80 font-medium transition-colors"
                      >
                        {t('features.learnMore')}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>

                  <motion.div
                    {...(isEven ? slideRight : slideLeft)}
                    className={cn('relative', !isEven && 'md:order-1')}
                  >
                    {moduleData?.mockup && mockupComponents[moduleData.mockup] ? (
                      (() => {
                        const FeatureMockup = mockupComponents[moduleData.mockup];
                        return (
                          <div className="relative">
                            <FeatureMockup />
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl" />
                          </div>
                        );
                      })()
                    ) : (
                      <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl overflow-hidden border border-gray-200">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center p-8">
                            {ModuleIcon && (
                              <ModuleIcon className="w-16 h-16 text-brand-primary/30 mx-auto mb-4" />
                            )}
                            <span className="text-gray-400 text-sm">{feature.highlight}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 8. USE CASES ===== */}
      <section className="py-16 md:py-24 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, #00875a 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('useCases.title')}
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              {t('useCases.subtitle')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solution.useCases.map((useCase, index) => (
              <motion.div
                key={index}
                {...stagger}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-brand-primary/30 hover:bg-white/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-primary/20 flex items-center justify-center mb-4">
                  <span className="text-brand-primary font-bold text-sm">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-brand-primary transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  {useCase.description}
                </p>

                {/* Workflow Steps */}
                <div className="flex flex-wrap items-center gap-1.5 mb-4">
                  {useCase.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center">
                      <span className="text-xs text-white/40 bg-white/5 rounded px-2 py-1">
                        {step}
                      </span>
                      {stepIndex < useCase.steps.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-brand-primary/50 mx-1 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>

                {useCase.result && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-primary/10 border border-brand-primary/20 rounded-full">
                    <div className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                    <span className="text-brand-primary text-xs font-medium">
                      {useCase.result}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9. TESTIMONIAL ===== */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 to-green-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center">
            <div className="text-6xl text-brand-primary/20 font-serif mb-4">&ldquo;</div>

            <blockquote className="text-2xl md:text-3xl font-light text-brand-dark mb-8 leading-relaxed">
              {solution.testimonial.quote}
            </blockquote>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-brand-primary/10 flex items-center justify-center mb-3">
                <span className="text-brand-primary font-bold text-lg">
                  {solution.testimonial.author.charAt(0)}
                </span>
              </div>
              <p className="font-semibold text-lg text-brand-dark">
                {solution.testimonial.author}
              </p>
              <p className="text-gray-500">
                {solution.testimonial.role}, {solution.testimonial.hotel}
              </p>
              <p className="text-gray-400 text-sm">
                {solution.testimonial.location}
              </p>
              {solution.testimonial.metric && (
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 rounded-full">
                  <span className="text-brand-primary text-sm font-semibold">
                    {solution.testimonial.metric}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 10. INTEGRATIONS ===== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 rounded-full mb-4">
              <Plug className="w-4 h-4 text-brand-primary" />
              <span className="text-brand-primary text-sm font-medium">{t('integrations.badge')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              {t('integrations.title')}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('integrations.subtitle')}
            </p>
          </motion.div>

          <motion.div
            {...fadeIn}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
          >
            {solution.integrations.map((name, index) => (
              <div
                key={index}
                className="flex items-center justify-center px-6 py-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-brand-primary/20 hover:shadow-md transition-all"
              >
                <span className="text-sm font-semibold text-gray-700">{name}</span>
              </div>
            ))}
            <div className="flex items-center justify-center px-6 py-4 bg-brand-primary/5 rounded-xl border border-brand-primary/10">
              <span className="text-sm font-semibold text-brand-primary">+20 {t('integrations.others')}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 11. FAQ ===== */}
      {solution.faq && solution.faq.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeIn} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                {t('faq.title')}
              </h2>
              <p className="text-gray-600 text-lg">
                {t('faq.subtitle')}
              </p>
            </motion.div>

            <motion.div {...fadeIn}>
              <FaqAccordion items={solution.faq} />
            </motion.div>
          </div>
        </section>
      )}

      {/* ===== 12. RELATED SOLUTIONS ===== */}
      {relatedSolutionsData.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeIn} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                {t('relatedSolutions.title')}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {t('relatedSolutions.subtitle')}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedSolutionsData.map((related, index) => {
                const RelatedIcon = related.icon;
                return (
                  <motion.div
                    key={related.slug}
                    {...stagger}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={`/solutions/${related.slug}` as string}
                      className="group block bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-primary/20 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-primary/20 transition-colors">
                          <RelatedIcon className="w-6 h-6 text-brand-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors">
                            {related.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {related.headline}
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
      )}

      {/* ===== 13. CTA FINAL ===== */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-primary to-emerald-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {solution.ctaTitle || t('cta.title')}
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {solution.ctaSubtitle || t('cta.subtitle')}
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
