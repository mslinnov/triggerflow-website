'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Mail, Clock } from 'lucide-react';
import { Container, ButtonLink } from '@/components/ui';

export function ThaisV3Hero() {
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();

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
    <section className="relative min-h-screen overflow-hidden bg-[var(--v3-bg-primary)] pt-20">
      {/* Subtle warm gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[var(--v3-accent-gold-light)] opacity-50 blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-[var(--v3-bg-secondary)] opacity-70 blur-[100px]" />
      </div>

      {/* Subtle texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <Container className="relative">
        <div className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
          {/* Text Content */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--v3-border)] bg-[var(--v3-bg-card)] px-4 py-2"
            >
              <Check className="h-4 w-4 text-[var(--v3-accent-green)]" />
              <span className="text-sm font-medium text-[var(--v3-text-secondary)]">
                Sans code • Sans formation
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-semibold leading-tight tracking-tight text-[var(--v3-text-primary)] md:text-5xl lg:text-6xl">
              Vos emails clients,
              <br />
              <span className="text-[var(--v3-accent-green)]">envoyés automatiquement</span>
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-[var(--v3-text-secondary)] lg:mx-0">
              Configurez une fois, TriggerFlow s'occupe du reste.{' '}
              <strong className="font-semibold text-[var(--v3-text-primary)]">
                Même quand vous n'êtes pas là.
              </strong>
            </p>

            {/* CTA Group */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
              <ButtonLink
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full bg-[var(--v3-accent-green)] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl"
              >
                Voir une démo en 30 min
                <ArrowRight className="ml-2 inline-block h-5 w-5 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
              <span className="text-sm text-[var(--v3-text-muted)]">
                Gratuit • En français • Sans engagement
              </span>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-10 flex flex-col items-center gap-6 lg:flex-row lg:items-start"
            >
              {/* Avatar stack + count */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-[var(--v3-bg-primary)] bg-gradient-to-br from-[var(--v3-bg-card)] to-[var(--v3-border)]"
                    />
                  ))}
                </div>
                <span className="text-sm text-[var(--v3-text-secondary)]">
                  <strong className="font-semibold text-[var(--v3-text-primary)]">200+</strong>{' '}
                  hôteliers nous font confiance
                </span>
              </div>

              {/* Thaïs badge */}
              <div className="flex items-center gap-2 rounded-full border border-[var(--v3-border)] bg-[var(--v3-bg-secondary)] px-4 py-2">
                <Image
                  src="/images/partners/thais-logo.svg"
                  alt="Thaïs PMS"
                  width={60}
                  height={20}
                  className="h-4 w-auto"
                />
                <span className="text-xs font-medium text-[var(--v3-text-secondary)]">
                  Partenaire officiel
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main visual container */}
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Hero image */}
              <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--v3-bg-card)] to-[var(--v3-border)] shadow-[var(--v3-shadow-lg)]">
                <Image
                  src="/images/assets/hero-v3.webp"
                  alt="Interface TriggerFlow - Automatisation emails hôtel"
                  width={800}
                  height={600}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Floating notification card */}
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="absolute -bottom-6 -left-6 rounded-2xl border border-[var(--v3-border)] bg-[var(--v3-bg-primary)] p-4 shadow-[var(--v3-shadow-lg)] md:-left-12"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--v3-accent-green)]/10">
                    <Mail className="h-5 w-5 text-[var(--v3-accent-green)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--v3-text-primary)]">
                      Email envoyé
                    </p>
                    <p className="text-xs text-[var(--v3-text-muted)]">
                      Confirmation de réservation
                    </p>
                  </div>
                  <div className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--v3-accent-green)]">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Second floating card - time saved */}
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="absolute -right-4 -top-4 rounded-2xl border border-[var(--v3-border)] bg-[var(--v3-bg-primary)] p-4 shadow-[var(--v3-shadow-lg)] md:-right-8"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--v3-accent-gold)]/10">
                    <Clock className="h-5 w-5 text-[var(--v3-accent-gold)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--v3-text-primary)]">4h gagnées</p>
                    <p className="text-xs text-[var(--v3-text-muted)]">cette semaine</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
