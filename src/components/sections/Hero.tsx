'use client';

import { useTranslations } from 'next-intl';
import { Zap, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container, ButtonLink, Badge } from '@/components/ui';
import { HeroDashboard } from './HeroDashboard';
import { heroContainer, heroItem } from '@/lib/animations';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

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
              <Badge variant="primary" className="mb-6 gap-2 text-xs font-semibold tracking-wide">
                <Zap className="h-3.5 w-3.5" />
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
              className="mt-5 max-w-lg text-base leading-relaxed text-zinc-600 md:text-lg"
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
              <motion.a
                href="#modules"
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-brand-dark transition-colors hover:text-brand-primary"
                whileHover={{ x: 3 }}
              >
                {t('ctaSecondary')}
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </motion.div>

            {/* Social Proof - Inline */}
            <motion.div
              variants={heroItem}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="h-7 w-7 rounded-full border-2 border-white bg-gradient-to-br from-brand-primary to-brand-dark"
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium text-zinc-700">
                  {t('socialProof.hotels')}
                </span>
              </div>
              <div className="h-4 w-px bg-zinc-300" />
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium text-zinc-700">
                  {t('socialProof.rating')}
                </span>
              </div>
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
