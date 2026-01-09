'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Zap, Sparkles, Mail, MessageSquare, Star, TrendingUp } from 'lucide-react';
import { Container, ButtonLink } from '@/components/ui';

const floatingNotifications = [
  { icon: Mail, text: 'Email envoyé', subtext: 'Confirmation résa', color: 'from-blue-500 to-indigo-600', delay: 0 },
  { icon: MessageSquare, text: 'SMS livré', subtext: 'Bienvenue client', color: 'from-emerald-500 to-teal-600', delay: 0.5 },
  { icon: Star, text: '+1 avis Google', subtext: '5 étoiles', color: 'from-amber-500 to-orange-600', delay: 1 },
  { icon: TrendingUp, text: 'Upsell accepté', subtext: 'Late check-out', color: 'from-purple-500 to-violet-600', delay: 1.5 },
];

const exampleMessages = [
  { profile: 'Soirée étape', message: 'Email court avec WiFi + petit-déj' },
  { profile: 'Coffret cadeau', message: 'Message chaleureux + surclassement' },
  { profile: 'Arrivée dimanche', message: 'Alerte restaurant fermé' },
];

export function ThaisV2Hero() {
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
    <section className="relative min-h-screen overflow-hidden bg-[#0A0F1C]">
      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute inset-0">
        <motion.div
          animate={!prefersReducedMotion ? { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] } : {}}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -left-1/4 -top-1/4 h-[700px] w-[700px] rounded-full bg-emerald-500/20 blur-[150px]"
        />
        <motion.div
          animate={!prefersReducedMotion ? { scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] } : {}}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-blue-500/20 blur-[120px]"
        />
        <div className="absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <Container className="relative z-20">
        <div className="flex min-h-screen flex-col justify-center pb-12 pt-24">
          {/* Co-branding logos */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 flex items-center justify-center gap-6"
          >
            <Image
              src="/images/logo-white.webp"
              alt="TriggerFlow"
              width={160}
              height={44}
              priority
              className="h-10 w-auto md:h-12"
            />
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5">
              <span className="text-2xl text-white/60">×</span>
            </div>
            <Image
              src="/images/partners/thais-logo.svg"
              alt="Thaïs PMS"
              width={140}
              height={44}
              priority
              className="h-10 w-auto brightness-0 invert md:h-12"
            />
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
                  <Zap className="h-4 w-4" />
                  Partenariat officiel
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-400">
                  <Sparkles className="h-4 w-4" />
                  IA intégrée
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Le bon message,
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  au bon moment
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 lg:mx-0 md:text-xl"
              >
                TriggerFlow personnalise automatiquement vos communications selon le profil de chaque client Thaïs —{' '}
                <strong className="text-white">sans y passer des heures</strong>.
              </motion.p>

              {/* Example box */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mx-auto mt-8 max-w-xl lg:mx-0"
              >
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-400">
                    Exemple concret
                  </p>
                  <div className="space-y-3">
                    {exampleMessages.map((item, i) => (
                      <motion.div
                        key={item.profile}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <span className="w-32 shrink-0 text-sm font-medium text-emerald-400">{item.profile}</span>
                        <span className="text-zinc-400">→</span>
                        <span className="text-sm text-zinc-300">{item.message}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-10 flex flex-col items-center gap-4 lg:items-start"
              >
                <ButtonLink
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-emerald-500/30 transition-all hover:scale-105 hover:shadow-emerald-500/50"
                >
                  Réserver une démo gratuite
                  <ArrowRight className="ml-2 inline-block h-5 w-5 transition-transform group-hover:translate-x-1" />
                </ButtonLink>
                <p className="text-sm text-zinc-500">30 min • Sans engagement • En français</p>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="h-9 w-9 rounded-full border-2 border-[#0A0F1C] bg-gradient-to-br from-emerald-500 to-teal-600"
                      />
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-white">200+</span>
                    <span className="text-zinc-400"> hôtels</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-sm text-zinc-400">4.8/5</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Floating notifications + Screenshot */}
            <div className="relative hidden lg:block">
              {/* Main screenshot */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm">
                  <Image
                    src="/images/assets/thais-hero-demo.webp"
                    alt="TriggerFlow Interface"
                    width={800}
                    height={600}
                    className="w-full"
                    priority
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C]/80 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Floating notifications */}
              {floatingNotifications.map((notification, index) => (
                <motion.div
                  key={notification.text}
                  initial={{ opacity: 0, x: 50, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.15 }}
                  className="absolute"
                  style={{
                    top: `${15 + index * 22}%`,
                    right: index % 2 === 0 ? '-5%' : '5%',
                  }}
                >
                  <motion.div
                    animate={!prefersReducedMotion ? { y: [0, -8, 0] } : {}}
                    transition={{ duration: 3, repeat: Infinity, delay: notification.delay }}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0A0F1C]/90 px-4 py-3 shadow-xl backdrop-blur-xl"
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${notification.color}`}>
                      <notification.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{notification.text}</p>
                      <p className="text-xs text-zinc-500">{notification.subtext}</p>
                    </div>
                    <div className="ml-2 h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  </motion.div>
                </motion.div>
              ))}

              {/* Stats card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="absolute -bottom-4 -left-4 rounded-2xl border border-white/10 bg-[#0A0F1C]/90 p-5 shadow-xl backdrop-blur-xl"
              >
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { value: '98%', label: 'Délivrabilité' },
                    { value: '4h', label: 'Gagnées/sem' },
                    { value: '+45%', label: 'Avis clients' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-zinc-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
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
