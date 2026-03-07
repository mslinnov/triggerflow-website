'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Mail, Check, Star } from 'lucide-react';

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

      {/* Floating Cards */}

      {/* SMS Sent Card - Top Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute -right-2 top-8 md:-right-4 md:top-12"
      >
        <motion.div
          animate={!prefersReducedMotion ? { y: [0, -8, 0] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-xl border border-green-200 bg-white px-3 py-2 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">{t('floatingCards.smsSent')}</p>
              <p className="text-[10px] text-gray-500">{t('floatingCards.room')} 302</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Google Review Card - Bottom Left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute -left-2 bottom-8 md:-left-4 md:bottom-12"
      >
        <motion.div
          animate={!prefersReducedMotion ? { y: [0, 6, 0] } : {}}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-xl border border-yellow-200 bg-white px-3 py-2 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-yellow-100 flex items-center justify-center">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">{t('floatingCards.newReview')}</p>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Email Opened Card - Middle Right */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute -right-2 top-1/2 -translate-y-1/2 md:-right-6"
      >
        <motion.div
          animate={!prefersReducedMotion ? { y: [0, -5, 0] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-xl border border-blue-200 bg-white px-3 py-2 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
              <Mail className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">{t('floatingCards.emailOpened')}</p>
              <p className="text-[10px] text-gray-500">M. Dupont</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
