'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Check, X, Star, Quote } from 'lucide-react';
import { IntegrationsShowcase, FeaturesTabbed } from '@/components/sections';
import type { TabConfig, FeaturesTabbedDirectData } from '@/components/sections';
import { cn } from '@/lib/utils';
import { modules } from '@/data/modules';
import { AnimatedStat } from '@/components/ui/AnimatedStat';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { Container, Badge, ButtonLink } from '@/components/ui';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  slideInLeft,
  slideInRight,
  defaultViewport,
} from '@/lib/animations';

// Import mockups — Hero mockups
import { DashboardMockup } from '@/components/mockups/DashboardMockup';
import { EmailMockup } from '@/components/mockups/EmailMockup';
import { WorkflowBuilderMockup } from '@/components/mockups/WorkflowBuilderMockup';
import { CampaignMockup } from '@/components/mockups/CampaignMockup';
import { CRMMockup } from '@/components/mockups/CRMMockup';
import { WhatsAppMockup } from '@/components/mockups/WhatsAppMockup';
// Email feature mockups
import { EmailEditorMockup } from '@/components/mockups/EmailEditorMockup';
import { EmailPersonalizationMockup } from '@/components/mockups/EmailPersonalizationMockup';
import { EmailAnalyticsMockup } from '@/components/mockups/EmailAnalyticsMockup';
// SMS feature mockups
import { SmsSendMockup } from '@/components/mockups/SmsSendMockup';
import { SmsBidirectionalMockup } from '@/components/mockups/SmsBidirectionalMockup';
import { SmsRgpdMockup } from '@/components/mockups/SmsRgpdMockup';
// WhatsApp feature mockups
import { WhatsAppChatbotMockup } from '@/components/mockups/WhatsAppChatbotMockup';
import { WhatsAppTemplateMockup } from '@/components/mockups/WhatsAppTemplateMockup';
import { WhatsAppHistoryMockup } from '@/components/mockups/WhatsAppHistoryMockup';
// Newsletter feature mockups
import { NewsletterEditorMockup } from '@/components/mockups/NewsletterEditorMockup';
import { NewsletterSegmentMockup } from '@/components/mockups/NewsletterSegmentMockup';
import { NewsletterScheduleMockup } from '@/components/mockups/NewsletterScheduleMockup';
// Fidélité feature mockups
import { LoyaltyPointsMockup } from '@/components/mockups/LoyaltyPointsMockup';
import { LoyaltyRewardsMockup } from '@/components/mockups/LoyaltyRewardsMockup';
import { LoyaltyPortalMockup } from '@/components/mockups/LoyaltyPortalMockup';
// Automatisations feature mockups
import { WorkflowBuilderFeatureMockup } from '@/components/mockups/WorkflowBuilderFeatureMockup';
import { WorkflowTriggersMockup } from '@/components/mockups/WorkflowTriggersMockup';
import { WorkflowConditionsMockup } from '@/components/mockups/WorkflowConditionsMockup';
// CRM feature mockups
import { CrmClientCardMockup } from '@/components/mockups/CrmClientCardMockup';
import { CrmPmsSyncMockup } from '@/components/mockups/CrmPmsSyncMockup';
import { CrmSegmentsMockup } from '@/components/mockups/CrmSegmentsMockup';
// Formulaires feature mockups
import { FormBuilderMockup } from '@/components/mockups/FormBuilderMockup';
import { FormAutoSendMockup } from '@/components/mockups/FormAutoSendMockup';
import { FormAnalysisMockup } from '@/components/mockups/FormAnalysisMockup';
// Avis feature mockups
import { ReviewCollectMockup } from '@/components/mockups/ReviewCollectMockup';
import { ReviewDashboardMockup } from '@/components/mockups/ReviewDashboardMockup';
import { ReviewAiResponseMockup } from '@/components/mockups/ReviewAiResponseMockup';
// Analytics feature mockups
import { AnalyticsDashboardMockup } from '@/components/mockups/AnalyticsDashboardMockup';
import { AnalyticsReportMockup } from '@/components/mockups/AnalyticsReportMockup';
import { AnalyticsCompareMockup } from '@/components/mockups/AnalyticsCompareMockup';
// Hub Messagerie feature mockups
import { HubInboxMockup } from '@/components/mockups/HubInboxMockup';
import { HubClientViewMockup } from '@/components/mockups/HubClientViewMockup';
import { HubTemplatesMockup } from '@/components/mockups/HubTemplatesMockup';
// Ventes Additionnelles feature mockups
import { UpsellOfferMockup } from '@/components/mockups/UpsellOfferMockup';
import { UpsellTimingMockup } from '@/components/mockups/UpsellTimingMockup';
import { UpsellCheckoutMockup } from '@/components/mockups/UpsellCheckoutMockup';

interface ModulePageContentProps {
  moduleSlug: string;
}

const mockupComponents: Record<string, React.ComponentType> = {
  DashboardMockup,
  EmailMockup,
  WorkflowBuilderMockup,
  CampaignMockup,
  CRMMockup,
  WhatsAppMockup,
  PhoneMockup: DashboardMockup,
  EmailEditorMockup,
  EmailPersonalizationMockup,
  EmailAnalyticsMockup,
  SmsSendMockup,
  SmsBidirectionalMockup,
  SmsRgpdMockup,
  WhatsAppChatbotMockup,
  WhatsAppTemplateMockup,
  WhatsAppHistoryMockup,
  NewsletterEditorMockup,
  NewsletterSegmentMockup,
  NewsletterScheduleMockup,
  LoyaltyPointsMockup,
  LoyaltyRewardsMockup,
  LoyaltyPortalMockup,
  WorkflowBuilderFeatureMockup,
  WorkflowTriggersMockup,
  WorkflowConditionsMockup,
  CrmClientCardMockup,
  CrmPmsSyncMockup,
  CrmSegmentsMockup,
  FormBuilderMockup,
  FormAutoSendMockup,
  FormAnalysisMockup,
  ReviewCollectMockup,
  ReviewDashboardMockup,
  ReviewAiResponseMockup,
  AnalyticsDashboardMockup,
  AnalyticsReportMockup,
  AnalyticsCompareMockup,
  HubInboxMockup,
  HubClientViewMockup,
  HubTemplatesMockup,
  UpsellOfferMockup,
  UpsellTimingMockup,
  UpsellCheckoutMockup,
};


export default function ModulePageContent({ moduleSlug }: ModulePageContentProps) {
  const t = useTranslations('modulePage');
  const prefersReducedMotion = useReducedMotion();
  const module = modules[moduleSlug];

  if (!module) {
    return null;
  }

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: defaultViewport,
      };

  const MockupComponent = mockupComponents[module.mockup] || DashboardMockup;
  const Icon = module.icon;

  const relatedModulesData = module.relatedModules
    .map((slug) => modules[slug])
    .filter(Boolean);

  // Build FeaturesTabbed config from module.features
  const featureTabs: TabConfig[] = module.features.map((feature, i) => {
    const MockupComp = feature.mockup ? mockupComponents[feature.mockup] : null;
    return {
      key: `feature_${i}`,
      icon: feature.icon,
      mockup: MockupComp ? <MockupComp /> : <div className="flex h-full items-center justify-center"><span className="text-sm text-text-muted">{feature.title}</span></div>,
    };
  });

  const featuresDirectData: FeaturesTabbedDirectData = {
    badge: t('features.title'),
    title: t('features.title'),
    subtitle: t('features.subtitle'),
    cta: t('cta.demo'),
    items: Object.fromEntries(
      module.features.map((feature, i) => [
        `feature_${i}`,
        { title: feature.title, description: feature.description },
      ])
    ),
  };

  return (
    <main className="min-h-screen bg-white">
      {/* ===== 1. HERO (light gradient — homepage style) ===== */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#CCE2E1_0%,#ffffff_35%,#ffffff_65%,#F7FAFA_100%)] pt-12 pb-16 md:pt-16 md:pb-24">
        {/* Grid pattern + teal glow accents */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_15%,rgba(0,111,104,0.08),transparent_55%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_85%,rgba(0,111,104,0.06),transparent_55%)]" />

        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div {...motionProps} variants={fadeInUp} className="flex flex-col text-center lg:text-left">
              <Badge variant="primary" className="mb-6 gap-2 self-center border-brand-primary/20 bg-brand-primary/8 text-xs font-semibold tracking-wide lg:self-start">
                <Icon className="h-3.5 w-3.5 text-brand-primary" />
                {module.title}
              </Badge>

              <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-brand-dark sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                {module.headline}
              </h1>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-text-secondary md:text-lg">
                {module.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <ButtonLink
                  href="https://app.lemcal.com/@trigger-flow/demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                  className="group gap-2 shadow-lg shadow-brand-primary/20 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-primary/30"
                >
                  {t('cta.demo')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </ButtonLink>
                <ButtonLink
                  href="/tarifs"
                  variant="secondary"
                  size="lg"
                  className="gap-2"
                >
                  {t('cta.pricing')}
                </ButtonLink>
              </div>
            </motion.div>

            <motion.div
              {...motionProps}
              variants={fadeInUp}
              className="relative"
            >
              <div className="relative z-10 overflow-hidden rounded-2xl border border-border-light bg-white shadow-[var(--shadow-lg)]">
                <MockupComponent />
              </div>
              <div className="pointer-events-none absolute -bottom-8 -right-8 h-64 w-64 rounded-full bg-brand-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -left-8 -top-8 h-48 w-48 rounded-full bg-brand-primary/5 blur-2xl" />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== 2. STATS BAR ===== */}
      {module.stats && module.stats.length > 0 && (
        <section className="relative border-b border-border-light bg-white py-10">
          <Container>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {module.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  {...motionProps}
                  variants={staggerItem}
                  className="group text-center"
                >
                  <div className="font-serif text-4xl font-bold text-brand-primary transition-colors md:text-5xl">
                    <AnimatedStat value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ===== 3. JOURNEY TIMELINE ===== */}
      {module.journey && module.journey.length > 0 && (
        <section className="relative overflow-hidden bg-surface-secondary py-20 md:py-28">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />
          <Container className="relative">
            <motion.div {...motionProps} variants={fadeInUp} className="mb-14 text-center">
              <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                Parcours client
              </span>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
                {t('journey.title')}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
                {t('journey.subtitle')}
              </p>
            </motion.div>

            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-0 right-0 top-8 hidden h-px bg-border-default md:block" />

              <motion.div
                {...motionProps}
                variants={staggerContainer}
                className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 md:gap-6"
              >
                {module.journey.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="relative text-center"
                  >
                    <div className={cn(
                      'relative z-10 mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full transition-all',
                      step.active
                        ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25'
                        : 'border-2 border-border-default bg-white text-text-muted'
                    )}>
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                    <h3 className={cn(
                      'text-sm font-semibold',
                      step.active ? 'text-text-primary' : 'text-text-muted'
                    )}>
                      {step.label}
                    </h3>
                    <p className={cn(
                      'mt-1 text-xs',
                      step.active ? 'text-text-secondary' : 'text-text-muted'
                    )}>
                      {step.description}
                    </p>
                    {step.active && (
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-primary/10 px-2 py-0.5 text-[10px] font-medium text-brand-primary">
                          <Icon className="h-3 w-3" />
                          {module.title}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Container>
        </section>
      )}

      {/* ===== 4. AVANT / APRES ===== */}
      <section className="py-20 md:py-28">
        <Container>
          <motion.div {...motionProps} variants={fadeInUp} className="mb-14 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
              Transformation
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              {t('problemSolution.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
              {t('problemSolution.subtitle')}
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {/* BEFORE */}
            <motion.div
              {...motionProps}
              variants={slideInLeft}
              className="group relative overflow-hidden rounded-2xl border border-red-200/60 bg-gradient-to-br from-red-50/80 to-orange-50/30 p-8"
            >
              <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-red-100/40" />
              <div className="relative">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <X className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-red-900">
                      {t('problemSolution.before')}
                    </h3>
                    <p className="text-sm text-red-600/60">La realite de nombreux hotels</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {module.painPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                        <X className="h-4 w-4 text-red-500" />
                      </span>
                      <span className="leading-relaxed text-red-900/70">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* AFTER */}
            <motion.div
              {...motionProps}
              variants={slideInRight}
              className="group relative overflow-hidden rounded-2xl border border-brand-primary/15 bg-gradient-to-br from-brand-primary/[0.06] to-brand-primary/[0.02] p-8"
            >
              <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/[0.06]" />
              <div className="relative">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10">
                    <Check className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-text-primary">
                      {t('problemSolution.after')}
                    </h3>
                    <p className="text-sm text-text-muted">Ce que TriggerFlow change</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {module.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary/10">
                        <Check className="h-4 w-4 text-brand-primary" />
                      </span>
                      <span className="leading-relaxed text-text-secondary">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== 5. FEATURES — Tabbed (exact homepage component) ===== */}
      <FeaturesTabbed
        directData={featuresDirectData}
        tabs={featureTabs}
        className="bg-white"
      />

      {/* ===== 6. USE CASES ===== */}
      <section className="relative overflow-hidden bg-surface-dark py-20 md:py-28">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(0,111,104,0.1),transparent_70%)]" />

        <Container className="relative">
          <motion.div {...motionProps} variants={fadeInUp} className="mb-14 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
              Cas d&apos;usage
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white md:text-4xl">
              {t('useCases.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60">
              {t('useCases.subtitle')}
            </p>
          </motion.div>

          <motion.div
            {...motionProps}
            variants={staggerContainer}
            className="grid gap-5 sm:grid-cols-2"
          >
            {module.useCases.map((useCase, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.05] p-6 backdrop-blur-sm transition-all duration-200 hover:border-white/15 hover:bg-white/[0.08]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-primary/15 font-serif text-sm font-bold text-brand-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white transition-colors group-hover:text-brand-primary">
                      {useCase.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                      {useCase.description}
                    </p>
                    {useCase.result && (
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                        <span className="text-xs font-medium text-brand-primary">
                          {useCase.result}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ===== 7. INTEGRATIONS — Homepage PMS showcase ===== */}
      <IntegrationsShowcase />

      {/* ===== 8. TESTIMONIAL ===== */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#F7FAFA_0%,#EFF5F5_50%,#F7FAFA_100%)]" />
        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] bg-[radial-gradient(ellipse,rgba(0,111,104,0.06),transparent_70%)]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[20rem] font-bold leading-none text-brand-primary/[0.03]">
          &ldquo;
        </div>

        <Container className="relative">
          <motion.div {...motionProps} variants={fadeInUp} className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10">
              <Quote className="h-6 w-6 text-brand-primary" />
            </div>

            {/* Stars */}
            <div className="mb-6 flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-brand-accent text-brand-accent" />
              ))}
            </div>

            <blockquote className="font-serif text-xl font-medium leading-relaxed text-text-primary md:text-2xl lg:text-[1.75rem] lg:leading-relaxed">
              &ldquo;{module.testimonial ? module.testimonial.quote : t('testimonial.quote')}&rdquo;
            </blockquote>

            <div className="mt-10 flex flex-col items-center gap-1">
              <div className="mb-4 h-px w-12 bg-border-default" />
              <p className="text-sm font-semibold text-text-primary">
                {module.testimonial?.author || t('testimonial.author')}
              </p>
              <p className="text-xs tracking-wide text-text-muted">
                {module.testimonial
                  ? `${module.testimonial.role}, ${module.testimonial.hotel}`
                  : t('testimonial.role')
                }
              </p>
              {module.testimonial?.metric && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-brand-primary/15 bg-brand-primary/5 px-4 py-1.5">
                  <span className="text-xs font-semibold text-brand-primary">
                    {module.testimonial.metric}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ===== 9. FAQ ===== */}
      {module.faq && module.faq.length > 0 && (
        <section className="py-20 md:py-28">
          <Container className="max-w-3xl">
            <motion.div {...motionProps} variants={fadeInUp} className="mb-14 text-center">
              <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                FAQ
              </span>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
                {t('faq.title')}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
                {t('faq.subtitle')}
              </p>
            </motion.div>

            <motion.div {...motionProps} variants={fadeInUp}>
              <FaqAccordion items={module.faq} />
            </motion.div>
          </Container>
        </section>
      )}

      {/* ===== 10. RELATED MODULES ===== */}
      <section className="relative bg-surface-secondary py-20 md:py-28">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />
        <Container>
          <motion.div {...motionProps} variants={fadeInUp} className="mb-12">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
              Ecosystem
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              {t('related.title')}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
              {t('related.subtitle')}
            </p>
          </motion.div>

          <motion.div
            {...motionProps}
            variants={staggerContainer}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {relatedModulesData.map((relatedModule) => {
              const RelatedIcon = relatedModule.icon;
              return (
                <motion.div
                  key={relatedModule.slug}
                  variants={staggerItem}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <Link
                    href={`/produit/${relatedModule.slug}`}
                    className="group relative block overflow-hidden rounded-2xl border border-border-default bg-white p-6 transition-all duration-200 hover:border-brand-primary/20 hover:shadow-lg"
                    style={{ boxShadow: 'var(--shadow-sm)' }}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-primary/[0.02] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 transition-colors group-hover:bg-brand-primary/15">
                        <RelatedIcon className="h-6 w-6 text-brand-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary transition-colors group-hover:text-brand-primary">
                          {relatedModule.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-text-muted line-clamp-2">
                          {relatedModule.headline}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 flex-shrink-0 text-text-muted/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-primary" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ===== 11. CTA FINAL ===== */}
      <section className="relative overflow-hidden bg-surface-dark py-24 md:py-32">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(0,111,104,0.18),transparent_70%)]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] bg-[radial-gradient(ellipse,rgba(255,207,162,0.06),transparent_70%)]" />
        <div className="absolute left-1/4 top-0 h-[200px] w-[200px] bg-[radial-gradient(ellipse,rgba(0,111,104,0.08),transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <Container className="relative">
          <motion.div {...motionProps} variants={fadeInUp} className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-4xl font-bold tracking-tight text-white md:text-5xl">
              {module.ctaTitle || t('cta.title')}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/60">
              {module.ctaSubtitle || t('cta.subtitle')}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <ButtonLink
                href="https://app.lemcal.com/@trigger-flow/demo"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="group gap-2 shadow-lg shadow-brand-primary/25"
              >
                {t('cta.demo')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="ghost"
                size="lg"
                className="border border-white/15 text-white backdrop-blur-sm hover:bg-white/10"
              >
                {t('cta.contact')}
              </ButtonLink>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}


