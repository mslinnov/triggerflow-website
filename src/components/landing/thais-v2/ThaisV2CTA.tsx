'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Mail, Sparkles, Check } from 'lucide-react';
import { Container, ButtonLink } from '@/components/ui';

const benefits = ['Configuration en 48h', 'Support 7j/7', 'Conformité RGPD', 'Sans engagement'];

export function ThaisV2CTA() {
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
    <section className="relative overflow-hidden bg-[#0A0F1C] py-24 md:py-32">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          animate={!prefersReducedMotion ? { scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] } : {}}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-emerald-500/20 blur-[150px]"
        />
        <motion.div
          animate={!prefersReducedMotion ? { scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] } : {}}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute -right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px]"
        />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
              <Sparkles className="h-4 w-4" />
              Essai gratuit 14 jours
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            Prêt à automatiser votre{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              relation client
            </span>{' '}
            ?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl"
          >
            Rejoignez les 200+ hôtels qui utilisent TriggerFlow pour gagner du temps et améliorer la
            satisfaction client
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-2 text-zinc-300"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <ButtonLink
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-10 py-5 text-lg font-semibold text-white shadow-2xl shadow-emerald-500/30 transition-all hover:scale-105 hover:shadow-emerald-500/50"
            >
              Réserver une démo gratuite
              <ArrowRight className="ml-2 inline-block h-5 w-5 transition-transform group-hover:translate-x-1" />
            </ButtonLink>

            <ButtonLink
              href="mailto:contact@trigger-flow.com"
              className="flex items-center gap-2 rounded-full border-2 border-white/20 bg-transparent px-8 py-5 text-lg font-medium text-white transition-all hover:border-white/40 hover:bg-white/5"
            >
              <Mail className="h-5 w-5" />
              Nous contacter
            </ButtonLink>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex items-center justify-center gap-4 text-sm text-zinc-500"
          >
            <span>Aucune carte requise</span>
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
            <span>Installation assistée</span>
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
            <span>Annulation facile</span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
