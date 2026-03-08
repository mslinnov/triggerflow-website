'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Workflow, Bot, ClipboardList, Zap, Activity, Check, Send } from 'lucide-react';
import {
  WhatsAppChatbotMockup,
} from '@/components/mockups';
import { FeaturesTabbed, type TabConfig } from './FeaturesTabbed';

/* ─── Helpers ─── */

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

/* ─── Hub Inbox: Notification toast + Compteur live ─── */

function HubInboxVisual() {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/images/homepage/hub-inbox.webp"
        alt="TriggerFlow — Hub de messagerie multicanale"
        fill
        className="object-cover object-left-top"
        sizes="(max-width: 1024px) 100vw, 60vw"
      />

      {/* Notification toast — slides in from right */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-4 right-4 z-10"
      >
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-md"
        >
          <div className="h-full w-1 self-stretch rounded-full bg-blue-500" />
          <Mail className="h-4 w-4 text-blue-600" />
          <div>
            <p className="text-[11px] font-semibold text-gray-800">Nouvel email reçu</p>
            <p className="text-[10px] text-gray-500">M. Laurent — Chambre 204</p>
          </div>
          <span className="text-[9px] text-gray-400">2s</span>
        </motion.div>
      </motion.div>

      {/* Compteur live — dark pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-4 left-4 z-10"
      >
        <div className="flex items-center gap-2 rounded-full bg-gray-900/90 px-4 py-2 shadow-lg backdrop-blur-sm">
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </div>
          <span className="text-sm font-bold tabular-nums text-white">
            <AnimatedCounter target={247} />
          </span>
          <span className="text-[10px] text-gray-400">messages traités aujourd&apos;hui</span>
        </div>
      </motion.div>

      {/* SMS notification — bottom right */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-4 right-4 z-10"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-md"
        >
          <div className="h-full w-1 self-stretch rounded-full bg-green-500" />
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
            <Check className="h-3.5 w-3.5 text-green-600" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-800">SMS délivré</p>
            <p className="text-[10px] text-gray-500">Check-in J-1 — Mme Bernard</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── Workflow: Connexion animée (PMS → Action) + Pulse statut ─── */

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

      {/* Connexion animée PMS → Action — top right */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute top-4 right-4 z-10"
      >
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-0 rounded-xl border border-white/60 bg-white/80 p-2 shadow-lg backdrop-blur-md"
        >
          {/* PMS badge */}
          <div className="flex items-center gap-1.5 rounded-lg bg-brand-dark px-2.5 py-1.5">
            <span className="text-[10px] font-bold text-white">PMS</span>
          </div>
          {/* Animated connector */}
          <div className="relative mx-1 flex w-10 items-center">
            <div className="h-px w-full bg-gray-300" />
            <motion.div
              className="absolute left-0 h-2 w-2 rounded-full bg-brand-primary shadow-sm shadow-brand-primary/50"
              animate={{ x: [0, 32, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          {/* Action badge */}
          <div className="flex items-center gap-1.5 rounded-lg bg-brand-primary px-2.5 py-1.5">
            <Zap className="h-3 w-3 text-white" />
            <span className="text-[10px] font-bold text-white">Email</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Pulse statut — bottom left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute bottom-4 left-4 z-10"
      >
        <div className="flex items-center gap-2.5 rounded-full bg-gray-900/90 px-3.5 py-2 shadow-lg backdrop-blur-sm">
          <div className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="h-3 w-3 text-green-400" />
            <span className="text-[11px] font-medium text-white">3 workflows actifs</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Formulaires: Tag chips empilés + Mini bar chart ─── */

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

      {/* Tag chips empilés — top right */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute top-4 right-4 z-10"
      >
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col gap-1 rounded-xl border border-white/60 bg-white/80 p-2.5 shadow-lg backdrop-blur-md"
        >
          <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-500">Types de champs</p>
          <div className="flex flex-wrap gap-1">
            {[
              { label: 'Satisfaction', color: 'bg-yellow-100 text-yellow-700' },
              { label: 'Upsell', color: 'bg-brand-primary/10 text-brand-primary' },
              { label: 'Préférences', color: 'bg-rose-100 text-rose-700' },
              { label: 'Consent', color: 'bg-blue-100 text-blue-700' },
            ].map((chip) => (
              <span key={chip.label} className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${chip.color}`}>
                {chip.label}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Mini bar chart — bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute bottom-4 left-4 z-10"
      >
        <div className="flex items-end gap-3 rounded-xl border border-white/60 bg-white/80 px-3 py-2.5 shadow-lg backdrop-blur-md">
          <div className="flex items-end gap-1">
            {[60, 85, 45, 92, 78].map((h, i) => (
              <motion.div
                key={i}
                className="w-2 rounded-t-sm bg-brand-primary"
                initial={{ height: 0 }}
                animate={{ height: `${h * 0.3}px` }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
              />
            ))}
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800">87%</p>
            <p className="text-[9px] text-gray-500">complétion</p>
          </div>
        </div>
      </motion.div>

      {/* Notification toast — formulaire soumis — bottom right */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-4 right-4 z-10"
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-md"
        >
          <div className="h-full w-1 self-stretch rounded-full bg-brand-primary" />
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary/10">
            <Send className="h-3 w-3 text-brand-primary" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-800">Formulaire soumis</p>
            <p className="text-[10px] text-gray-500">Pré-checkin — Ch. 118</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

const tabs: TabConfig[] = [
  { key: 'communication', icon: Mail, mockup: <HubInboxVisual /> },
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
