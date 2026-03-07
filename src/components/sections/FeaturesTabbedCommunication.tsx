'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Workflow, Bot, ClipboardList, Zap, GitBranch, ShoppingBag, Star, GitFork } from 'lucide-react';
import {
  HubInboxMockup,
  WhatsAppChatbotMockup,
} from '@/components/mockups';
import { FeaturesTabbed, type TabConfig } from './FeaturesTabbed';

function WorkflowBuilderVisual() {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/images/homepage/workflow-builder.webp"
        alt="TriggerFlow — Éditeur de workflows"
        fill
        className="object-cover object-left-top"
        sizes="(max-width: 1024px) 100vw, 60vw"
      />

      {/* Floating "Action" card — bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute bottom-4 left-4 z-10"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 rounded-xl border border-brand-primary/20 bg-white px-3 py-2 shadow-lg"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary/10">
            <Zap className="h-3.5 w-3.5 text-brand-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Action</p>
            <p className="text-[10px] text-gray-500">Envoyer un email</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating "Condition" card — top right */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute top-4 right-4 z-10"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-3 py-2 shadow-lg"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50">
            <GitBranch className="h-3.5 w-3.5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Condition</p>
            <p className="text-[10px] text-gray-500">Si séjour &gt; 3 nuits</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function FormBuilderVisual() {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/images/homepage/form-builder.webp"
        alt="TriggerFlow — Constructeur de formulaires"
        fill
        className="object-cover object-left-top"
        sizes="(max-width: 1024px) 100vw, 60vw"
      />

      {/* Floating "Logique conditionnelle" — top right */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute top-4 right-4 z-10"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-3 py-2 shadow-lg"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-50">
            <GitFork className="h-3.5 w-3.5 text-violet-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Logique conditionnelle</p>
            <p className="text-[10px] text-gray-500">Adapter selon les réponses</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating "Ventes additionnelles" — bottom left */}
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
            <ShoppingBag className="h-3.5 w-3.5 text-brand-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Upsell intégré</p>
            <p className="text-[10px] text-gray-500">Ventes additionnelles</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating "Collecte d'avis" — bottom right */}
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
            <p className="text-xs font-semibold text-gray-800">Collecte d&apos;avis</p>
            <p className="text-[10px] text-gray-500">Google &amp; TripAdvisor</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

const tabs: TabConfig[] = [
  { key: 'communication', icon: Mail, mockup: <HubInboxMockup /> },
  { key: 'automation', icon: Workflow, mockup: <WorkflowBuilderVisual /> },
  { key: 'chatbot', icon: Bot, mockup: <WhatsAppChatbotMockup /> },
  { key: 'forms', icon: ClipboardList, mockup: <FormBuilderVisual /> },
];

export function FeaturesTabbedCommunication() {
  return (
    <FeaturesTabbed
      translationNamespace="featuresTabbed1"
      tabs={tabs}
      className="bg-white"
    />
  );
}
