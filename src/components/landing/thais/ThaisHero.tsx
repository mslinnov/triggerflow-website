'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Lightbulb, Check, Mail, MessageSquare, Clock, TrendingUp } from 'lucide-react';
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
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[var(--thais-bg)]/30 pt-20 pb-16 md:pt-28 md:pb-24">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      {/* Subtle Thaïs accent gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[var(--thais-cyan)]/5 to-transparent -z-10 pointer-events-none" />

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
            {/* Badges */}
            <motion.div variants={heroItem} className="mb-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <Badge variant="primary" className="gap-2 text-xs font-semibold tracking-wide bg-[var(--thais-bg)] text-[var(--thais-primary)] border-[var(--thais-primary)]/30">
                <Check className="h-3.5 w-3.5" />
                Partenaire officiel Thaïs
              </Badge>
              <Badge variant="secondary" className="gap-2 text-xs font-semibold tracking-wide bg-purple-100 text-purple-700 border-purple-200">
                <Sparkles className="h-3.5 w-3.5" />
                IA intégrée
              </Badge>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              variants={heroItem}
              className="text-3xl font-bold leading-[1.15] tracking-tight text-brand-dark sm:text-4xl md:text-5xl lg:text-[3.25rem]"
            >
              Le bon message, au bon client,{' '}
              <span className="text-brand-primary">au bon moment</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={heroItem}
              className="mt-5 max-w-lg text-base leading-relaxed text-zinc-600 md:text-lg lg:mx-0 mx-auto"
            >
              TriggerFlow personnalise automatiquement vos communications selon le profil de chaque client Thaïs — <strong>réduisez votre charge mentale</strong> et concentrez-vous sur l'accueil.
            </motion.p>

            {/* Exemple concret */}
            <motion.div
              variants={heroItem}
              className="mt-6 max-w-lg lg:mx-0 mx-auto"
            >
              <div className="rounded-xl bg-gradient-to-br from-brand-primary/10 via-emerald-50 to-teal-50 p-5 border border-brand-primary/20">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-brand-primary" />
                  <span className="text-sm font-semibold text-brand-dark">Exemple concret</span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-[140px_auto] gap-2 items-baseline">
                    <span className="text-brand-primary font-medium">Client soirée étape</span>
                    <span className="text-zinc-700">→ Email court avec accès WiFi + heure petit-déj</span>
                  </div>
                  <div className="grid grid-cols-[140px_auto] gap-2 items-baseline">
                    <span className="text-brand-primary font-medium">Coffret cadeau</span>
                    <span className="text-zinc-700">→ Message chaleureux + surclassement proposé</span>
                  </div>
                  <div className="grid grid-cols-[140px_auto] gap-2 items-baseline">
                    <span className="text-brand-primary font-medium">Arrivée le dimanche</span>
                    <span className="text-zinc-700">→ Alerte que le restaurant est fermé</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={heroItem}
              className="mt-8 flex flex-col items-center gap-3 lg:items-start"
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
              <span className="text-sm text-zinc-500">
                30 min • Sans engagement • En français
              </span>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              variants={heroItem}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative w-full flex justify-center"
          >
            <div className="relative w-full max-w-2xl">
              {/* Main Screenshot Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
              >
                <Image
                  src="/images/assets/thais-hero-demo.webp"
                  alt="TriggerFlow Interface Demo"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  priority
                />
              </motion.div>

              {/* Floating Element 1: Top Left - Intégré à Thaïs */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="hidden md:flex absolute -top-4 -left-4 bg-[var(--thais-primary)] text-white px-4 py-2 rounded-full shadow-lg items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span className="text-sm font-semibold">Intégré à Thaïs PMS</span>
              </motion.div>

              {/* Floating Element 2: Top Right - Deliverability */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute top-2 right-2 md:-top-6 md:-right-6 bg-white rounded-xl md:rounded-2xl shadow-xl p-2 md:p-4 border-2 border-brand-primary/20"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-brand-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 md:w-6 md:h-6 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-lg md:text-2xl font-bold text-brand-dark">98%</p>
                    <p className="text-[10px] md:text-xs text-gray-500">Délivrabilité</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Element 3: Bottom Left - Time Saved */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="hidden md:flex absolute -bottom-4 -left-6 bg-white rounded-xl shadow-lg p-3 items-center gap-2 border border-gray-200"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-brand-dark">4h</p>
                  <p className="text-xs text-gray-500">gagnées/semaine</p>
                </div>
              </motion.div>

              {/* Floating Element 4: Bottom Right - Channels */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="hidden md:block absolute -bottom-6 -right-4 bg-gradient-to-br from-[var(--thais-primary)] to-[var(--thais-cyan)] text-white rounded-xl shadow-lg p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-4 h-4" />
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm font-semibold">Multicanal</span>
                </div>
                <p className="text-xs opacity-90">Email • SMS • WhatsApp</p>
              </motion.div>

              {/* Floating Element 5: Left Side - Performance */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="hidden lg:flex absolute top-1/2 -left-8 -translate-y-1/2 bg-white rounded-full w-14 h-14 items-center justify-center shadow-lg border border-gray-200"
              >
                <div className="text-center">
                  <TrendingUp className="w-5 h-5 text-brand-primary mx-auto" />
                  <p className="text-[10px] text-gray-500 mt-0.5">+45%</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
