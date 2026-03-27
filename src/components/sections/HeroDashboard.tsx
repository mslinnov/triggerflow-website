'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Check, Star, MessageSquare, TrendingUp, MessageCircle } from 'lucide-react';

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return <>{count.toLocaleString('fr-FR')}</>;
}

export function HeroDashboard() {
  const t = useTranslations('heroDashboard');
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative">
      {/* ── Decorative abstract shapes behind photo ── */}
      <div className="absolute inset-0 -z-10">
        {/* Large teal blob — top right */}
        <div className="absolute -right-8 -top-8 h-[70%] w-[55%] rounded-[3rem] bg-brand-primary/10" />
        {/* Tall thin accent — top left-center */}
        <div className="absolute left-[30%] -top-6 h-[45%] w-[12%] rounded-[2rem] bg-brand-primary/8" />
        {/* Wide blob — bottom left */}
        <div className="absolute -bottom-6 -left-6 h-[50%] w-[45%] rounded-[3rem] bg-brand-primary/8" />
      </div>

      {/* ── Central photo ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto w-[85%] max-w-[500px] overflow-hidden"
      >
        <Image
          src="/images/hero-tf.webp"
          alt="TriggerFlow – plateforme CRM et automatisation hôtelière"
          width={1041}
          height={920}
          priority
          className="h-auto w-full"
        />
      </motion.div>

      {/* ── Floating UI cards ── */}

      {/* 1. Mes Flows — top right, Webflow style */}
      <motion.div
        initial={{ opacity: 0, y: -20, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -right-6 -top-2 z-20 md:-right-16 md:-top-4"
      >
        <motion.div
          animate={!prefersReducedMotion ? { y: [0, -6, 0] } : {}}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[220px] rounded-xl border border-white/60 bg-white/95 p-3 shadow-xl backdrop-blur-md"
        >
          <p className="mb-2 text-sm font-bold text-gray-800">Mes Flows</p>
          <div className="mb-1.5 flex items-center justify-between border-b border-gray-100 pb-1.5 text-[10px] text-gray-400">
            <span>Flow</span>
            <span>Statut</span>
          </div>
          <div className="space-y-2">
            <FlowToggleRow label="Confirmation réservation" active />
            <FlowToggleRow label="Proposition services" active />
            <FlowToggleRow label="Questionnaire satisfaction" active />
          </div>
        </motion.div>
      </motion.div>

      {/* 2. Message WhatsApp — bottom left */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-6 bottom-[20%] z-20 md:-left-12 md:bottom-[24%]"
      >
        <motion.div
          animate={!prefersReducedMotion ? { y: [0, 5, 0] } : {}}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/95 px-3 py-2.5 shadow-xl backdrop-blur-md"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-primary">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-800">Hôtel Le Clos</p>
            <p className="text-[10px] text-gray-500">Bonjour Sophie, êtes-vous bi...</p>
          </div>
        </motion.div>
      </motion.div>

      {/* 3. Second message — bottom, slightly right of first */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="absolute -bottom-6 left-[2%] z-20 md:-bottom-8 md:left-[4%]"
      >
        <motion.div
          animate={!prefersReducedMotion ? { y: [0, 4, 0] } : {}}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/95 px-3 py-2.5 shadow-xl backdrop-blur-md"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-primary">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-800">Le Domaine des Pins</p>
            <p className="text-[10px] text-gray-500">N&apos;oubliez pas de vous pré-enr...</p>
          </div>
        </motion.div>
      </motion.div>

      {/* 4. Avis Google — left, upper */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-4 top-[2%] z-10 md:-left-10 md:top-[4%]"
      >
        <motion.div
          animate={!prefersReducedMotion ? { y: [0, 6, 0] } : {}}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-xl border border-white/60 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-md"
        >
          <div className="flex items-center gap-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-50">
              <MessageSquare className="h-3 w-3 text-yellow-600" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-800">{t('floatingCards.newReview')}</p>
              <div className="flex gap-0.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.1, duration: 0.3, ease: 'backOut' }}
                  >
                    <Star className="h-2 w-2 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* 5. CA additionnel — right side, lower */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -right-4 bottom-[4%] z-30 md:-right-12 md:bottom-[6%]"
      >
        <motion.div
          animate={!prefersReducedMotion ? { y: [0, -10, 0] } : {}}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2.5 rounded-full bg-gray-900/90 px-5 py-2.5 shadow-xl backdrop-blur-sm"
        >
          <TrendingUp className="h-4 w-4 text-emerald-400" />
          <span className="text-base font-bold tabular-nums text-white">
            +<AnimatedCounter target={1240} /> €
          </span>
          <span className="text-[10px] text-gray-400">{t('floatingCards.extraRevenue')}</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ── Sub-components ── */

function FlowToggleRow({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[11px] text-gray-700">{label}</span>
      <div className={`flex h-5 w-9 items-center rounded-full px-0.5 ${active ? 'bg-brand-primary' : 'bg-gray-200'}`}>
        <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${active ? 'translate-x-4' : 'translate-x-0'}`} />
      </div>
    </div>
  );
}
