'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, Star, BarChart3, Heart, CalendarCheck, TrendingUp, Euro, Sparkles, MessageSquareText, ThumbsUp } from 'lucide-react';
import {
  AnalyticsDashboardMockup,
} from '@/components/mockups';
import { FeaturesTabbed, type TabConfig } from './FeaturesTabbed';

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

      {/* Floating "Préférences client" — top right */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute top-4 right-4 z-10"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
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

      {/* Floating "Historique séjours" — bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute bottom-4 left-4 z-10"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 rounded-xl border border-brand-primary/20 bg-white px-3 py-2 shadow-lg"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary/10">
            <CalendarCheck className="h-3.5 w-3.5 text-brand-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">12 séjours</p>
            <p className="text-[10px] text-gray-500">Client fidèle depuis 2022</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating "Satisfaction" — bottom right */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-4 right-4 z-10"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 rounded-xl border border-yellow-200 bg-white px-3 py-2 shadow-lg"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-50">
            <Star className="h-3.5 w-3.5 text-yellow-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Satisfaction</p>
            <p className="text-[10px] text-gray-500">Dernier avis : 5/5</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

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

      {/* Floating "Revenu généré" — top right */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute top-4 right-4 z-10"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 rounded-xl border border-brand-primary/20 bg-white px-3 py-2 shadow-lg"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary/10">
            <TrendingUp className="h-3.5 w-3.5 text-brand-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">+4 200 &euro;</p>
            <p className="text-[10px] text-gray-500">Revenu additionnel ce mois</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating "Offre acceptée" — bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute bottom-4 left-4 z-10"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-3 py-2 shadow-lg"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50">
            <Euro className="h-3.5 w-3.5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Surclassement</p>
            <p className="text-[10px] text-gray-500">Accepté — +45 &euro;/nuit</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating "Offre personnalisée" — bottom right */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
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

      {/* Floating "Note moyenne" — top right */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute top-4 right-4 z-10"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 rounded-xl border border-yellow-200 bg-white px-3 py-2 shadow-lg"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-50">
            <Star className="h-3.5 w-3.5 text-yellow-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">4.7 / 5</p>
            <p className="text-[10px] text-gray-500">Note moyenne Google</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating "Réponse IA" — bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute bottom-4 left-4 z-10"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-3 py-2 shadow-lg"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-50">
            <MessageSquareText className="h-3.5 w-3.5 text-violet-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Réponse IA</p>
            <p className="text-[10px] text-gray-500">Générée en 1 clic</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating "Taux de réponse" — bottom right */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-4 right-4 z-10"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 rounded-xl border border-brand-primary/20 bg-white px-3 py-2 shadow-lg"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary/10">
            <ThumbsUp className="h-3.5 w-3.5 text-brand-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">98% répondus</p>
            <p className="text-[10px] text-gray-500">Tous les avis traités</p>
          </div>
        </motion.div>
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
