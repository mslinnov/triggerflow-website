'use client';

import { useTranslations } from 'next-intl';
import { Zap, ArrowRight, Shield, Plug, Headphones } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container, ButtonLink, Badge } from '@/components/ui';
import { HeroDashboard } from './HeroDashboard';
import { heroContainer, heroItem } from '@/lib/animations';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#CCE2E1_0%,#ffffff_35%,#ffffff_65%,#F7FAFA_100%)] pt-12 pb-16 md:pt-16 md:pb-24">
      {/* Subtle grid pattern + teal glow accents */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_15%,rgba(0,111,104,0.08),transparent_55%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_85%,rgba(0,111,104,0.06),transparent_55%)]" />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Text Content with Stagger */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroContainer}
            className="flex flex-col"
          >
            {/* Badge */}
            <motion.div variants={heroItem}>
              <Badge variant="primary" className="mb-6 gap-2 border-brand-primary/20 bg-brand-primary/8 text-xs font-semibold tracking-wide">
                <Zap className="h-3.5 w-3.5 text-brand-primary" />
                {t('badge')}
              </Badge>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              variants={heroItem}
              className="text-3xl font-bold leading-[1.15] tracking-tight text-brand-dark sm:text-4xl md:text-5xl lg:text-[3.25rem]"
            >
              {t('title')}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={heroItem}
              className="mt-5 max-w-lg text-base leading-relaxed text-text-secondary md:text-lg"
            >
              {t('subtitle')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={heroItem}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <ButtonLink
                href="https://app.lemcal.com/@trigger-flow/demo"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="group gap-2 shadow-lg shadow-brand-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-brand-primary/30 hover:scale-105 hover:-translate-y-0.5"
              >
                {t('cta')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={heroItem}
              className="mt-5 flex flex-wrap items-center gap-4"
            >
              {[
                { icon: Shield, key: 'rgpd' },
                { icon: Plug, key: 'pms' },
                { icon: Headphones, key: 'support' },
              ].map(({ icon: Icon, key }) => (
                <div key={key} className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Icon className="h-3.5 w-3.5 text-brand-primary/60" />
                  <span>{t(`trustBadges.${key}`)}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Hero Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <HeroDashboard />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
