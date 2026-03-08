'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Check, Star, MessageSquare, TrendingUp } from 'lucide-react';

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
      {/* Glow effect behind */}
      <motion.div
        className="absolute -inset-8 rounded-3xl bg-brand-primary/20 blur-3xl -z-10 scale-110"
        animate={!prefersReducedMotion ? {
          scale: [1.1, 1.15, 1.1],
          opacity: [0.3, 0.5, 0.3],
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main Dashboard Screenshot */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl overflow-hidden"
      >
        <Image
          src="/images/homepage/dashboard-hero.webp"
          alt="TriggerFlow — Dashboard de gestion hôtelière"
          width={1200}
          height={750}
          priority
          className="w-full h-auto"
        />
      </motion.div>

      {/* ── Floating elements — organic diagonal cascade, no corners ── */}

      {/* 1. SMS toast — top, right-of-center (NOT in corner) */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -top-3 right-[10%] z-20 md:-top-5 md:right-[14%]"
      >
        <motion.div
          animate={!prefersReducedMotion ? { y: [0, -6, 0] } : {}}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-md"
        >
          <div className="h-full w-1 self-stretch rounded-full bg-green-500" />
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
            <Check className="h-3.5 w-3.5 text-green-600" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-800">{t('floatingCards.smsSent')}</p>
            <p className="text-[10px] text-gray-500">{t('floatingCards.room')} 302</p>
          </div>
        </motion.div>
      </motion.div>

      {/* 2. Avis Google — left side, upper quarter — smaller, intimate */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-2 top-[22%] z-10 md:-left-6 md:top-[18%]"
      >
        <motion.div
          animate={!prefersReducedMotion ? { y: [0, 5, 0] } : {}}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-xl border border-white/60 bg-white/80 px-2.5 py-2 shadow-md backdrop-blur-md"
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
                    transition={{ delay: 1.4 + i * 0.1, duration: 0.3, ease: 'backOut' }}
                  >
                    <Star className="h-2 w-2 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* 3. CA additionnel — right side, lower area — THE star element, prominent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -right-1 bottom-[22%] z-30 md:-right-8 md:bottom-[16%]"
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

      {/* 4. Compteur messages — bottom, left-of-center (NOT in corner) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="absolute -bottom-3 left-[6%] z-20 md:-bottom-4 md:left-[8%]"
      >
        <motion.div
          animate={!prefersReducedMotion ? { y: [0, 4, 0] } : {}}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 rounded-full bg-gray-900/90 px-3.5 py-1.5 shadow-lg backdrop-blur-sm"
        >
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </div>
          <span className="text-xs font-bold tabular-nums text-white">
            <AnimatedCounter target={1847} />
          </span>
          <span className="text-[9px] text-gray-400">{t('floatingCards.messagesSent')}</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
