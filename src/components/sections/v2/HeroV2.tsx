'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Mail, MessageSquare, Star, Bell, Zap } from 'lucide-react';
import { Container, ButtonLink } from '@/components/ui';

const floatingCards = [
  { icon: Mail, label: 'Email envoyé', color: 'bg-emerald-500', delay: 0 },
  { icon: MessageSquare, label: 'SMS confirmé', color: 'bg-blue-500', delay: 0.5 },
  { icon: Star, label: '+1 avis Google', color: 'bg-amber-500', delay: 1 },
  { icon: Bell, label: 'Check-in détecté', color: 'bg-purple-500', delay: 1.5 },
];

export function HeroV2() {
  const t = useTranslations('hero');
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100vh] overflow-hidden bg-brand-dark">
      {/* Grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute -left-1/4 -top-1/4 h-[800px] w-[800px] rounded-full bg-brand-primary/30 blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-brand-accent/20 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[80px]" />
      </div>

      {/* Diagonal accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-[40%] h-[2px] w-full origin-left bg-gradient-to-r from-brand-primary via-brand-accent to-transparent"
      />

      <Container className="relative z-20">
        <div className="flex min-h-[100vh] flex-col justify-center pb-16 pt-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left content */}
            <div className="lg:col-span-7">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 px-4 py-2 text-sm font-medium text-brand-primary backdrop-blur-sm">
                  <Zap className="h-4 w-4" />
                  {t('badge')}
                </span>
              </motion.div>

              {/* Main title with editorial typography */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight text-white"
              >
                <span className="block">{t('title').split(' ').slice(0, 2).join(' ')}</span>
                <span className="block bg-gradient-to-r from-brand-primary via-emerald-400 to-brand-accent bg-clip-text text-transparent">
                  {t('title').split(' ').slice(2, 4).join(' ')}
                </span>
                <span className="block">{t('title').split(' ').slice(4).join(' ')}</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl"
              >
                {t('subtitle')}
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <ButtonLink
                  href="https://app.lemcal.com/@trigger-flow/demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-base font-semibold text-brand-dark transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,111,104,0.3)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t('cta')}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-brand-primary to-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {t('cta')}
                    <ArrowRight className="h-5 w-5 translate-x-0 transition-transform group-hover:translate-x-1" />
                  </span>
                </ButtonLink>

                <a
                  href="#features"
                  className="group flex items-center gap-2 rounded-full border border-white/20 px-6 py-4 text-base font-medium text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/5"
                >
                  {t('ctaSecondary')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-12 flex flex-wrap items-center gap-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        className="h-10 w-10 rounded-full border-2 border-brand-dark bg-gradient-to-br from-brand-primary to-emerald-600"
                        style={{
                          backgroundImage: `linear-gradient(${45 + i * 30}deg, var(--brand-primary), #10b981)`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-white">200+</span>
                    <span className="text-zinc-400"> hôtels</span>
                  </div>
                </div>

                <div className="h-8 w-px bg-white/20" />

                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm text-zinc-400">4.8/5 note moyenne</span>
                </div>
              </motion.div>
            </div>

            {/* Right side - Floating notification cards */}
            <div className="relative hidden lg:col-span-5 lg:block">
              <div className="relative h-[500px]">
                {floatingCards.map((card, index) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 50, x: 50 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + index * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute"
                    style={{
                      top: `${10 + index * 22}%`,
                      left: `${index % 2 === 0 ? 10 : 30}%`,
                      transform: `rotate(${index % 2 === 0 ? -3 : 3}deg)`,
                    }}
                  >
                    <motion.div
                      animate={
                        !prefersReducedMotion
                          ? {
                              y: [0, -10, 0],
                            }
                          : {}
                      }
                      transition={{
                        duration: 3 + index * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: card.delay,
                      }}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-2xl backdrop-blur-xl"
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.color}`}>
                        <card.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{card.label}</p>
                        <p className="text-xs text-zinc-400">Il y a quelques secondes</p>
                      </div>
                      <div className="ml-2 h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    </motion.div>
                  </motion.div>
                ))}

                {/* Central dashboard preview */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="absolute bottom-0 right-0 w-[280px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 shadow-2xl backdrop-blur-xl"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-medium text-white/60">Performances</span>
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">+23%</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: 'Taux d\'ouverture', value: 68, color: 'bg-brand-primary' },
                      { label: 'Taux de clic', value: 42, color: 'bg-emerald-500' },
                      { label: 'Satisfaction', value: 94, color: 'bg-amber-500' },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="text-zinc-400">{stat.label}</span>
                          <span className="font-medium text-white">{stat.value}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${stat.value}%` }}
                            transition={{ duration: 1.5, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            className={`h-full rounded-full ${stat.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1"
        >
          <div className="h-2 w-1 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
