'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, Star, BarChart3, Heart, Check, Loader2, CalendarCheck, Sparkles } from 'lucide-react';
import {
  AnalyticsDashboardMockup,
} from '@/components/mockups';
import { FeaturesTabbed, type TabConfig } from './FeaturesTabbed';

/* ─── Helpers ─── */

function AnimatedCounter({ target, prefix = '', suffix = '', duration = 2 }: { target: number; prefix?: string; suffix?: string; duration?: number }) {
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
  return <>{prefix}{count.toLocaleString('fr-FR')}{suffix}</>;
}

/* ─── CRM: Avatar + action + Carte préférences ─── */

function CrmClientCardVisual() {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/images/homepage/crm-client-card.webp"
        alt="TriggerFlow — Fiche client CRM hôtelier"
        fill
        className="object-cover object-left-top"
        sizes="(max-width: 1024px) 100vw, 60vw"
      />

      {/* Avatar + action feed — top right */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-4 right-4 z-10"
      >
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-md"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-dark text-[10px] font-bold text-white">
            LD
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-800">L. Dupont — Check-in</p>
            <p className="text-[10px] text-gray-500">Suite Deluxe &middot; 3 nuits</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Carte préférences — bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute bottom-4 left-4 z-10"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-3 py-2 shadow-lg"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-50">
            <Heart className="h-3.5 w-3.5 text-rose-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Préférences</p>
            <p className="text-[10px] text-gray-500">Chambre calme, étage élevé</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Compteur séjours — bottom right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-4 right-4 z-10"
      >
        <div className="flex items-center gap-2 rounded-full bg-gray-900/90 px-3.5 py-2 shadow-lg backdrop-blur-sm">
          <CalendarCheck className="h-3.5 w-3.5 text-brand-primary" />
          <span className="text-sm font-bold tabular-nums text-white">
            <AnimatedCounter target={12} duration={1.5} />
          </span>
          <span className="text-[10px] text-gray-400">séjours</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Upsell: Compteur live (revenu) + Notification toast (offre acceptée) ─── */

function UpsellOfferVisual() {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/images/homepage/upsell-offer.webp"
        alt="TriggerFlow — Ventes additionnelles hôtelières"
        fill
        className="object-cover object-left-top"
        sizes="(max-width: 1024px) 100vw, 60vw"
      />

      {/* Compteur live revenu — top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute top-4 right-4 z-10"
      >
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 rounded-full bg-gray-900/90 px-4 py-2 shadow-lg backdrop-blur-sm"
        >
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </div>
          <span className="text-sm font-bold tabular-nums text-white">
            +<AnimatedCounter target={4200} suffix=" €" />
          </span>
          <span className="text-[10px] text-gray-400">ce mois</span>
        </motion.div>
      </motion.div>

      {/* Notification toast offre acceptée — bottom left, slide-in */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-4 left-4 z-10"
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-md"
        >
          <div className="h-full w-1 self-stretch rounded-full bg-emerald-500" />
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
            <Check className="h-3.5 w-3.5 text-emerald-600" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-800">Surclassement accepté</p>
            <p className="text-[10px] text-gray-500">+45 €/nuit — Chambre 302</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Chip offre proposée — bottom right */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-4 right-4 z-10"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-3 py-2 shadow-lg"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Late check-out</p>
            <p className="text-[10px] text-gray-500">Proposé automatiquement</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── Avis: Mini bar chart (notes par plateforme) + Pulse statut (réponse IA) ─── */

function ReviewDashboardVisual() {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/images/homepage/review-dashboard.webp"
        alt="TriggerFlow — Gestion des avis clients"
        fill
        className="object-cover object-left-top"
        sizes="(max-width: 1024px) 100vw, 60vw"
      />

      {/* Mini bar chart par plateforme — top right */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute top-4 right-4 z-10"
      >
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-xl border border-white/60 bg-white/80 px-3 py-2.5 shadow-lg backdrop-blur-md"
        >
          <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-wider text-gray-500">Notes par plateforme</p>
          <div className="flex items-end gap-2">
            {[
              { label: 'Google', value: 4.7, color: 'bg-blue-500' },
              { label: 'Booking', value: 9.1, color: 'bg-blue-700', max: 10 },
              { label: 'TripAdv.', value: 4.5, color: 'bg-emerald-500' },
            ].map((platform) => {
              const max = platform.max || 5;
              const height = (platform.value / max) * 28;
              return (
                <div key={platform.label} className="flex flex-col items-center gap-0.5">
                  <span className="text-[9px] font-bold text-gray-700">{platform.value}</span>
                  <motion.div
                    className={`w-5 rounded-t-sm ${platform.color}`}
                    initial={{ height: 0 }}
                    animate={{ height }}
                    transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                  />
                  <span className="text-[7px] text-gray-500">{platform.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* Pulse statut — réponse IA en cours — bottom left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute bottom-4 left-4 z-10"
      >
        <div className="flex items-center gap-2.5 rounded-full bg-gray-900/90 px-3.5 py-2 shadow-lg backdrop-blur-sm">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 className="h-3.5 w-3.5 text-violet-400" />
          </motion.div>
          <span className="text-[11px] font-medium text-white">Réponse IA en cours...</span>
          <div className="flex gap-0.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-1 w-1 rounded-full bg-violet-400"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const tabs: TabConfig[] = [
  { key: 'crm', icon: Users, mockup: <CrmClientCardVisual /> },
  { key: 'upsell', icon: ShoppingBag, mockup: <UpsellOfferVisual /> },
  { key: 'reviews', icon: Star, mockup: <ReviewDashboardVisual /> },
  { key: 'analytics', icon: BarChart3, mockup: <AnalyticsDashboardMockup /> },
];

export function FeaturesTabbedCRM() {
  return (
    <FeaturesTabbed
      translationNamespace="featuresTabbed2"
      tabs={tabs}
      inverted
      className="bg-surface-secondary"
    />
  );
}
