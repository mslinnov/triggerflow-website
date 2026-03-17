'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Check, TrendingUp } from 'lucide-react';

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

interface HeroEmailVisualProps {
  heroImage: string;
  heroImageAlt: string;
}

export function HeroEmailVisual({ heroImage, heroImageAlt }: HeroEmailVisualProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative">
      {/* Glow effect behind */}
      <motion.div
        className="absolute -inset-8 -z-10 scale-110 rounded-3xl bg-brand-primary/20 blur-3xl"
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

      {/* Main screenshot */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="overflow-hidden rounded-2xl"
      >
        <Image
          src={heroImage}
          alt={heroImageAlt}
          width={1200}
          height={750}
          priority
          className="h-auto w-full"
        />
      </motion.div>

      {/* ── Floating elements — diagonal cascade ── */}

      {/* 1. Toast "Confirmation envoyée — Ch. 302" — top right-of-center */}
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
            <p className="text-[11px] font-semibold text-gray-800">Confirmation envoyée</p>
            <p className="text-[10px] text-gray-500">Chambre 302</p>
          </div>
        </motion.div>
      </motion.div>

      {/* 2. Dark pill "45% taux d'ouverture" — left upper */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-2 top-[22%] z-10 md:-left-6 md:top-[18%]"
      >
        <motion.div
          animate={!prefersReducedMotion ? { y: [0, 5, 0] } : {}}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 rounded-full bg-gray-900/90 px-4 py-2 shadow-xl backdrop-blur-sm"
        >
          <TrendingUp className="h-4 w-4 text-emerald-400" />
          <span className="text-sm font-bold text-white">45%</span>
          <span className="text-[10px] text-gray-400">taux d&apos;ouverture</span>
        </motion.div>
      </motion.div>

      {/* 3. Counter "1 847 emails ce mois" — bottom right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-3 right-[6%] z-20 md:-bottom-4 md:right-[8%]"
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
          <span className="text-[9px] text-gray-400">emails ce mois</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
