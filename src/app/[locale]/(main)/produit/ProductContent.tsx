'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Mail,
  MessageSquare,
  MessageCircle,
  Newspaper,
  Gift,
  Zap,
  Users,
  FileText,
  Star,
  BarChart3,
  ArrowRight,
} from 'lucide-react';
import { Container, ButtonLink } from '@/components/ui';
import { DashboardMockup } from '@/components/mockups/DashboardMockup';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { TestimonialFeatured } from '@/components/sections/TestimonialFeatured';
import { fadeInUp, staggerContainer, staggerItem, slideInLeft, slideInRight, defaultViewport } from '@/lib/animations';

const modules = [
  {
    key: 'email',
    icon: Mail,
    href: '#',
    category: 'communication',
  },
  {
    key: 'sms',
    icon: MessageSquare,
    href: '#',
    category: 'communication',
  },
  {
    key: 'whatsapp',
    icon: MessageCircle,
    href: '#',
    category: 'communication',
  },
  {
    key: 'newsletter',
    icon: Newspaper,
    href: '#',
    category: 'marketing',
  },
  {
    key: 'loyalty',
    icon: Gift,
    href: '#',
    category: 'marketing',
  },
  {
    key: 'automation',
    icon: Zap,
    href: '#',
    category: 'automation',
  },
  {
    key: 'crm',
    icon: Users,
    href: '#',
    category: 'tools',
  },
  {
    key: 'forms',
    icon: FileText,
    href: '#',
    category: 'tools',
  },
  {
    key: 'reviews',
    icon: Star,
    href: '#',
    category: 'tools',
  },
  {
    key: 'analytics',
    icon: BarChart3,
    href: '#',
    category: 'tools',
  },
];

export function ProductContent() {
  const t = useTranslations('product');
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-light/30 to-white pt-32 pb-16 md:pt-40 md:pb-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={prefersReducedMotion ? 'visible' : 'hidden'}
              animate="visible"
              variants={slideInLeft}
            >
              <h1 className="text-3xl font-bold tracking-tight text-brand-dark md:text-4xl lg:text-5xl">
                {t('hero.title')}
              </h1>
              <p className="mt-4 text-lg text-zinc-600">
                {t('hero.subtitle')}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <ButtonLink
                  href="https://app.lemcal.com/@trigger-flow/demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                  className="gap-2"
                >
                  {t('hero.cta.demo')}
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink
                  href="/tarifs"
                  variant="secondary"
                  size="lg"
                >
                  {t('hero.cta.pricing')}
                </ButtonLink>
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? 'visible' : 'hidden'}
              animate="visible"
              variants={slideInRight}
              className="relative"
            >
              <DashboardMockup />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Modules Grid Section */}
      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-brand-dark md:text-3xl">
              {t('modules.title')}
            </h2>
            <p className="mt-2 text-zinc-600">
              {t('modules.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={staggerContainer}
            viewport={defaultViewport}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {modules.map((module) => (
              <motion.div
                key={module.key}
                variants={staggerItem}
                whileHover={!prefersReducedMotion ? { scale: 1.02, y: -5 } : {}}
              >
                <a
                  href={module.href}
                  className="block bg-white rounded-2xl shadow-lg border border-zinc-100 p-8 hover:shadow-xl hover:border-brand-primary/30 transition-all group"
                >
                  <div className="w-14 h-14 rounded-full bg-brand-primary/10 flex items-center justify-center mb-6">
                    <module.icon className="h-7 w-7 text-brand-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">
                    {t(`modules.items.${module.key}.title`)}
                  </h3>
                  <p className="text-zinc-600 mb-4">
                    {t(`modules.items.${module.key}.description`)}
                  </p>
                  <span className="inline-flex items-center gap-1 text-brand-primary font-medium group-hover:gap-2 transition-all">
                    {t('modules.learnMore')}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonial Section */}
      <TestimonialFeatured />

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
            className="rounded-3xl bg-brand-primary/10 p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl font-bold text-brand-dark md:text-3xl">
              {t('cta.title')}
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <ButtonLink
                href="https://app.lemcal.com/@trigger-flow/demo"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="gap-2"
              >
                {t('cta.demo')}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href="/tarifs"
                variant="secondary"
                size="lg"
              >
                {t('cta.pricing')}
              </ButtonLink>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
