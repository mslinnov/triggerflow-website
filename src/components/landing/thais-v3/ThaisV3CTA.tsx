'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Mail } from 'lucide-react';
import { Container, ButtonLink } from '@/components/ui';

const benefits = ['Configuration en 48h', 'Support 7j/7', 'Conformité RGPD', 'Sans engagement'];

export function ThaisV3CTA() {
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
    <section className="relative overflow-hidden bg-[var(--v3-bg-secondary)] py-20 md:py-28">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[var(--v3-accent-gold-light)] opacity-50 blur-[100px]" />
        <div className="absolute -right-20 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[var(--v3-accent-green)]/5 blur-[100px]" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--v3-accent-green)]/20 bg-[var(--v3-accent-green)]/10 px-4 py-2 text-sm font-medium text-[var(--v3-accent-green)]">
              <Check className="h-4 w-4" />
              Essai gratuit 14 jours
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold tracking-tight text-[var(--v3-text-primary)] md:text-4xl lg:text-5xl"
          >
            Prêt à simplifier votre{' '}
            <span className="text-[var(--v3-accent-green)]">quotidien</span> ?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-lg text-[var(--v3-text-secondary)]"
          >
            Rejoignez les 200+ hôteliers qui ont choisi TriggerFlow pour gagner du temps et améliorer
            leur relation client.
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--v3-accent-green)]">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span className="text-[var(--v3-text-secondary)]">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <ButtonLink
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-full bg-[var(--v3-accent-green)] px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl"
            >
              Réserver une démo gratuite
              <ArrowRight className="ml-2 inline-block h-5 w-5 transition-transform group-hover:translate-x-1" />
            </ButtonLink>

            <ButtonLink
              href="mailto:contact@trigger-flow.com"
              className="flex items-center gap-2 rounded-full border-2 border-[var(--v3-border)] bg-transparent px-8 py-4 text-lg font-medium text-[var(--v3-text-primary)] transition-all hover:border-[var(--v3-text-muted)] hover:bg-[var(--v3-bg-card)]"
            >
              <Mail className="h-5 w-5" />
              Nous contacter
            </ButtonLink>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex items-center justify-center gap-4 text-sm text-[var(--v3-text-muted)]"
          >
            <span>Aucune carte requise</span>
            <span className="h-1 w-1 rounded-full bg-[var(--v3-border)]" />
            <span>Installation assistée</span>
            <span className="h-1 w-1 rounded-full bg-[var(--v3-border)]" />
            <span>Annulation facile</span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
