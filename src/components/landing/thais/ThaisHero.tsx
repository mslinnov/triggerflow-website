'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import Image from 'next/image';
import { Container, ButtonLink, Badge } from '@/components/ui';
import { heroContainer, heroItem } from '@/lib/animations';

export function ThaisHero() {
  const searchParams = useSearchParams();

  // Build Calendly URL with UTM parameters
  const calendlyUrl = useMemo(() => {
    const baseUrl = 'https://app.lemcal.com/@trigger-flow/tf-thais';
    const utmParams = new URLSearchParams();

    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((param) => {
      const value = searchParams.get(param);
      if (value) utmParams.append(param, value);
    });

    return utmParams.toString() ? `${baseUrl}?${utmParams.toString()}` : baseUrl;
  }, [searchParams]);

  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-16 md:pt-28 md:pb-24">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

      <Container>
        {/* Co-branding logos */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-center gap-4 md:mb-12"
        >
          <Image
            src="/images/logo.webp"
            alt="TriggerFlow"
            width={150}
            height={40}
            priority
            className="h-8 w-auto md:h-10"
          />
          <span className="text-2xl font-light text-zinc-300 md:text-3xl">×</span>
          <Image
            src="/images/partners/thais-logo.svg"
            alt="Thaïs PMS"
            width={150}
            height={40}
            priority
            className="h-8 w-auto md:h-10"
            onError={(e) => {
              // Fallback if Thaïs logo is not yet available
              e.currentTarget.style.display = 'none';
            }}
          />
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroContainer}
            className="flex flex-col text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={heroItem} className="mb-6 flex justify-center lg:justify-start">
              <Badge variant="primary" className="gap-2 text-xs font-semibold tracking-wide">
                <Zap className="h-3.5 w-3.5" />
                Partenariat officiel
              </Badge>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              variants={heroItem}
              className="text-3xl font-bold leading-[1.15] tracking-tight text-brand-dark sm:text-4xl md:text-5xl lg:text-[3.25rem]"
            >
              Automatisez vos communications clients avec{' '}
              <span className="text-brand-primary">TriggerFlow</span> et{' '}
              <span className="text-brand-primary">Thaïs</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={heroItem}
              className="mt-5 max-w-lg text-base leading-relaxed text-zinc-600 md:text-lg lg:mx-0 mx-auto"
            >
              L'intégration <strong>1-clic</strong> qui connecte votre PMS Thaïs à une plateforme
              d'automatisation <strong>SMS, Email et WhatsApp</strong>. Accessible directement
              depuis votre interface Thaïs.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={heroItem}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <ButtonLink
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="group gap-2 shadow-lg shadow-brand-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-brand-primary/30 hover:-translate-y-0.5"
              >
                Réserver une démo gratuite
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              variants={heroItem}
              className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <div className="flex items-center gap-2">
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
                  200+ hôtels nous font confiance
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Placeholder for hero visual - can be replaced with a mockup */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-brand-light to-white p-8 shadow-2xl">
              <div className="flex h-full flex-col items-center justify-center space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary/10">
                    <Zap className="h-8 w-8 text-brand-primary" />
                  </div>
                </div>
                <p className="text-center text-lg font-semibold text-brand-dark">
                  Intégration Thaïs × TriggerFlow
                </p>
                <p className="text-center text-sm text-zinc-600">
                  Synchronisation automatique et hub de messagerie unifié
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
