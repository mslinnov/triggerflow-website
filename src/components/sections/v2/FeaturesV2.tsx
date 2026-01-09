'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  LogIn,
  LogOut,
  Gift,
  Clock,
  Mail,
  MessageSquare,
  Send,
  FileText,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Check,
} from 'lucide-react';
import { Container } from '@/components/ui';

const triggers = [
  { id: 'reservation', icon: Calendar, label: 'Réservation' },
  { id: 'checkin', icon: LogIn, label: 'Check-in' },
  { id: 'checkout', icon: LogOut, label: 'Check-out' },
  { id: 'birthday', icon: Gift, label: 'Anniversaire' },
  { id: 'delay', icon: Clock, label: 'Délai' },
];

const actions = [
  { id: 'email', icon: Mail, label: 'Email', color: 'bg-blue-500' },
  { id: 'sms', icon: MessageSquare, label: 'SMS', color: 'bg-emerald-500' },
  { id: 'whatsapp', icon: Send, label: 'WhatsApp', color: 'bg-green-500' },
  { id: 'form', icon: FileText, label: 'Formulaire', color: 'bg-purple-500' },
  { id: 'upsell', icon: ShoppingBag, label: 'Upsell', color: 'bg-orange-500' },
];

export function FeaturesV2() {
  const t = useTranslations('communicationFlow');
  const [selectedTrigger, setSelectedTrigger] = useState(triggers[1]);
  const [selectedAction, setSelectedAction] = useState(actions[1]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTriggerSelect = (trigger: typeof triggers[0]) => {
    setSelectedTrigger(trigger);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handleActionSelect = (action: typeof actions[0]) => {
    setSelectedAction(action);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <section id="features" className="relative overflow-hidden bg-brand-dark py-24 md:py-32">
      {/* Background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow effects */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-brand-primary/20 blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-brand-accent/20 blur-[120px]" />

      <Container className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {t('title')}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Interactive Flow Builder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl"
        >
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-12">
            {/* Decorative corners */}
            <div className="absolute -left-px -top-px h-8 w-8 border-l-2 border-t-2 border-brand-primary rounded-tl-3xl" />
            <div className="absolute -right-px -top-px h-8 w-8 border-r-2 border-t-2 border-brand-primary rounded-tr-3xl" />
            <div className="absolute -bottom-px -left-px h-8 w-8 border-b-2 border-l-2 border-brand-primary rounded-bl-3xl" />
            <div className="absolute -bottom-px -right-px h-8 w-8 border-b-2 border-r-2 border-brand-primary rounded-br-3xl" />

            <div className="grid gap-8 md:grid-cols-3">
              {/* Triggers Column */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-brand-primary" />
                  <span className="text-sm font-medium uppercase tracking-wider text-zinc-400">
                    {t('triggers.label')}
                  </span>
                </div>
                <div className="space-y-2">
                  {triggers.map((trigger) => (
                    <motion.button
                      key={trigger.id}
                      onClick={() => handleTriggerSelect(trigger)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                        selectedTrigger.id === trigger.id
                          ? 'border-brand-primary bg-brand-primary/20 text-white'
                          : 'border-white/10 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <trigger.icon className="h-5 w-5" />
                      <span className="font-medium">{trigger.label}</span>
                      {selectedTrigger.id === trigger.id && (
                        <motion.div
                          layoutId="trigger-check"
                          className="ml-auto"
                        >
                          <Check className="h-4 w-4 text-brand-primary" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Center - Animation Flow */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative flex h-full flex-col items-center justify-center gap-6">
                  {/* Animated Connection Line */}
                  <div className="absolute left-1/2 h-full w-px -translate-x-1/2 bg-gradient-to-b from-brand-primary via-brand-accent to-brand-primary opacity-30" />

                  {/* From Trigger */}
                  <motion.div
                    animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
                    className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary shadow-lg shadow-brand-primary/30"
                  >
                    <selectedTrigger.icon className="h-7 w-7 text-white" />
                  </motion.div>

                  {/* Arrow */}
                  <motion.div
                    animate={isAnimating ? { y: [0, 5, 0] } : {}}
                    className="relative z-10"
                  >
                    <ArrowRight className="h-6 w-6 rotate-90 text-brand-accent" />
                  </motion.div>

                  {/* Sparkle Effect */}
                  <AnimatePresence>
                    {isAnimating && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                      >
                        <Sparkles className="h-10 w-10 text-brand-accent" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* To Action */}
                  <motion.div
                    animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ delay: 0.2 }}
                    className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl ${selectedAction.color} shadow-lg`}
                  >
                    <selectedAction.icon className="h-7 w-7 text-white" />
                  </motion.div>
                </div>
              </div>

              {/* Actions Column */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-brand-accent" />
                  <span className="text-sm font-medium uppercase tracking-wider text-zinc-400">
                    {t('actions.label')}
                  </span>
                </div>
                <div className="space-y-2">
                  {actions.map((action) => (
                    <motion.button
                      key={action.id}
                      onClick={() => handleActionSelect(action)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                        selectedAction.id === action.id
                          ? `border-transparent ${action.color}/20 text-white`
                          : 'border-white/10 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10'
                      }`}
                      style={{
                        backgroundColor:
                          selectedAction.id === action.id
                            ? `color-mix(in srgb, ${action.color.replace('bg-', '')} 20%, transparent)`
                            : undefined,
                      }}
                    >
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${action.color}`}>
                        <action.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium">{action.label}</span>
                      {selectedAction.id === action.id && (
                        <motion.div layoutId="action-check" className="ml-auto">
                          <Check className="h-4 w-4" style={{ color: action.color.replace('bg-', '') }} />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result Preview */}
            <motion.div
              animate={isAnimating ? { opacity: [0.5, 1] } : {}}
              className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-center"
            >
              <div className="flex items-center justify-center gap-3">
                <motion.div
                  animate={isAnimating ? { rotate: [0, 360] } : {}}
                  transition={{ duration: 0.5 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500"
                >
                  <Check className="h-5 w-5 text-white" />
                </motion.div>
                <div className="text-left">
                  <p className="font-medium text-white">{t('result.title')}</p>
                  <p className="text-sm text-emerald-400">
                    {selectedTrigger.label} → {selectedAction.label}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
