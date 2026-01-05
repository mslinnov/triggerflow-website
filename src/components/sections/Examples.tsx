'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Calendar, ClipboardList, ShoppingCart, Check, Send, ArrowRight, Zap, Bell, DoorOpen, LogOut, Star, Gift } from 'lucide-react';
import { Container, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

const examples = [
  {
    key: 'sms',
    icon: MessageSquare,
    color: 'bg-brand-primary',
    workflow: {
      trigger: { icon: DoorOpen, label: 'Check-in détecté' },
      action: { icon: Zap, label: 'TriggerFlow' },
      result: { icon: Send, label: 'SMS envoyé' },
    }
  },
  {
    key: 'event',
    icon: Calendar,
    color: 'bg-blue-500',
    workflow: {
      trigger: { icon: Calendar, label: 'Événement planifié' },
      action: { icon: Zap, label: 'TriggerFlow' },
      result: { icon: Bell, label: 'Clients notifiés' },
    }
  },
  {
    key: 'survey',
    icon: ClipboardList,
    color: 'bg-amber-500',
    workflow: {
      trigger: { icon: LogOut, label: 'Check-out effectué' },
      action: { icon: Zap, label: 'TriggerFlow' },
      result: { icon: Star, label: 'Enquête envoyée' },
    }
  },
  {
    key: 'upsell',
    icon: ShoppingCart,
    color: 'bg-purple-500',
    workflow: {
      trigger: { icon: DoorOpen, label: 'Réservation confirmée' },
      action: { icon: Zap, label: 'TriggerFlow' },
      result: { icon: Gift, label: 'Offres proposées' },
    }
  },
] as const;

export function Examples() {
  const t = useTranslations('examples');
  const [activeTab, setActiveTab] = useState<string>('sms');
  const activeExample = examples.find((e) => e.key === activeTab) || examples[0];

  return (
    <section id="exemples" className="bg-brand-light/30 py-20 md:py-28">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Badge variant="secondary" className="mb-4">
            Cas d'usage
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark md:text-4xl lg:text-[2.75rem]">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 flex flex-wrap justify-center gap-2"
        >
          {examples.map((example) => (
            <button
              key={example.key}
              onClick={() => setActiveTab(example.key)}
              className={cn(
                'flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300',
                activeTab === example.key
                  ? 'bg-brand-dark text-white shadow-lg'
                  : 'bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-300 hover:text-brand-dark'
              )}
            >
              <span className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full',
                activeTab === example.key ? example.color : 'bg-zinc-100'
              )}>
                <example.icon className={cn('h-3.5 w-3.5', activeTab === example.key ? 'text-white' : 'text-zinc-500')} />
              </span>
              {t(`tabs.${example.key}`)}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            {examples.map((example) =>
              activeTab === example.key ? (
                <motion.div
                  key={example.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-lg md:p-10">
                    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                      {/* Text content */}
                      <div className="order-2 lg:order-1">
                        <div className={cn('mb-5 flex h-12 w-12 items-center justify-center rounded-xl shadow-lg', example.color)}>
                          <example.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-dark">
                          {t(`items.${example.key}.title`)}
                        </h3>
                        <p className="mt-3 text-base leading-relaxed text-zinc-600">
                          {t(`items.${example.key}.description`)}
                        </p>
                        <ul className="mt-6 space-y-3">
                          {[1, 2, 3].map((i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary/10">
                                <Check className="h-3 w-3 text-brand-primary" strokeWidth={3} />
                              </span>
                              <span className="text-sm text-zinc-700 leading-relaxed">
                                {t(`items.${example.key}.features.${i}`)}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <button className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand-primary transition-colors hover:text-brand-dark">
                          En savoir plus
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Visual mockup with workflow */}
                      <div className="order-1 lg:order-2 flex flex-col items-center">
                        {/* Workflow indicator */}
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="mb-6 w-full"
                        >
                          <WorkflowIndicator workflow={example.workflow} color={example.color} />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="relative"
                        >
                          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-primary/10 to-transparent blur-xl" />
                          <PhoneMockup type={example.key} />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

function PhoneMockup({ type }: { type: string }) {
  return (
    <div className="relative w-[220px] md:w-[240px]">
      {/* Phone frame - thin bezels, realistic proportions */}
      <div className="rounded-[2.5rem] bg-zinc-900 p-[5px] shadow-2xl ring-1 ring-zinc-800">
        {/* Screen container */}
        <div className="relative overflow-hidden rounded-[2.3rem] bg-white">
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-2.5 z-20 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-zinc-900" />

          {/* Status bar */}
          <div className="relative flex h-10 items-center justify-between bg-white px-5 pt-1">
            <span className="text-[10px] font-semibold text-zinc-900">9:41</span>
            <div className="flex items-center gap-[2px]">
              <svg className="h-[12px] w-[12px] text-zinc-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C7.5 3 3.75 5.25 1.5 8.625L12 21l10.5-12.375C20.25 5.25 16.5 3 12 3z" opacity="0.3"/>
                <path d="M12 6c3 0 5.625 1.5 7.125 3.75L12 18l-7.125-8.25C6.375 7.5 9 6 12 6z"/>
              </svg>
              <svg className="h-[12px] w-[12px] text-zinc-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 17h2v4H2v-4zm4-5h2v9H6v-9zm4-4h2v13h-2V8zm4-4h2v17h-2V4z"/>
              </svg>
              <div className="ml-[2px] flex h-[9px] w-[18px] items-center rounded-[2px] border border-zinc-900 p-[1px]">
                <div className="h-full w-[70%] rounded-[1px] bg-zinc-900" />
              </div>
            </div>
          </div>

          {/* App content based on type */}
          <div className="bg-zinc-50 px-2.5 pb-4 pt-1" style={{ minHeight: '420px' }}>
            {type === 'sms' && <SMSContent />}
            {type === 'event' && <EventContent />}
            {type === 'survey' && <SurveyContent />}
            {type === 'upsell' && <UpsellContent />}
          </div>

          {/* Home indicator */}
          <div className="flex justify-center pb-1.5">
            <div className="h-[4px] w-[100px] rounded-full bg-zinc-900/20" />
          </div>
        </div>
      </div>

      {/* Side buttons */}
      <div className="absolute -left-[2px] top-20 h-6 w-[3px] rounded-l-sm bg-zinc-700" />
      <div className="absolute -left-[2px] top-32 h-10 w-[3px] rounded-l-sm bg-zinc-700" />
      <div className="absolute -left-[2px] top-48 h-10 w-[3px] rounded-l-sm bg-zinc-700" />
      <div className="absolute -right-[2px] top-36 h-14 w-[3px] rounded-r-sm bg-zinc-700" />
    </div>
  );
}

function SMSContent() {
  return (
    <>
      {/* Chat header */}
      <div className="mb-2.5 flex items-center gap-2 rounded-lg bg-white p-2 shadow-sm border border-zinc-100">
        <div className="h-8 w-8 rounded-full bg-brand-primary flex items-center justify-center">
          <Send className="h-3.5 w-3.5 text-white" />
        </div>
        <div>
          <div className="text-[11px] font-semibold text-brand-dark">Hôtel Le Parisien</div>
          <div className="text-[9px] text-brand-primary font-medium">En ligne</div>
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-2">
        <div className="w-[88%]">
          <div className="rounded-xl rounded-tl-sm bg-white p-2 shadow-sm border border-zinc-100">
            <p className="text-[10px] leading-relaxed text-brand-dark">
              Bonjour M. Dupont ! Bienvenue à l'Hôtel Le Parisien. Votre chambre 302 est prête.
            </p>
            <span className="mt-0.5 block text-right text-[8px] text-zinc-400">14:30</span>
          </div>
        </div>

        <div className="ml-auto w-[88%]">
          <div className="rounded-xl rounded-tr-sm bg-brand-primary p-2 shadow-sm">
            <p className="text-[10px] text-white">Parfait, merci ! Code wifi ?</p>
            <span className="mt-0.5 block text-right text-[8px] text-white/70">14:32</span>
          </div>
        </div>

        <div className="w-[88%]">
          <div className="rounded-xl rounded-tl-sm bg-white p-2 shadow-sm border border-zinc-100">
            <p className="text-[10px] leading-relaxed text-brand-dark">
              WiFi: HOTEL_VIP<br />
              Mot de passe: Welcome2024
            </p>
            <span className="mt-0.5 block text-right text-[8px] text-zinc-400">14:32</span>
          </div>
        </div>
      </div>
    </>
  );
}

function EventContent() {
  return (
    <>
      <div className="mb-2 text-center">
        <div className="text-[9px] text-zinc-500 mb-0.5">Événements</div>
        <div className="text-[11px] font-semibold text-brand-dark">Cette semaine</div>
      </div>

      <div className="space-y-2">
        <div className="rounded-lg bg-white p-2.5 shadow-sm border border-zinc-100">
          <div className="h-14 rounded-lg bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 mb-2 flex items-center justify-center">
            <Calendar className="h-6 w-6 text-brand-primary/50" />
          </div>
          <div className="text-[10px] font-semibold text-brand-dark">Concert Jazz</div>
          <div className="text-[9px] text-zinc-500 mt-0.5">Vendredi 20h - Terrasse</div>
          <button className="mt-2 w-full rounded-lg bg-brand-primary py-1.5 text-[9px] font-medium text-white">
            Réserver
          </button>
        </div>

        <div className="rounded-lg bg-white p-2.5 shadow-sm border border-zinc-100">
          <div className="text-[10px] font-semibold text-brand-dark">Brunch du dimanche</div>
          <div className="text-[9px] text-zinc-500 mt-0.5">Dimanche 11h - Restaurant</div>
          <button className="mt-2 w-full rounded-lg bg-zinc-100 py-1.5 text-[9px] font-medium text-brand-dark">
            En savoir plus
          </button>
        </div>
      </div>
    </>
  );
}

function SurveyContent() {
  return (
    <>
      <div className="mb-2 rounded-lg bg-white p-2.5 shadow-sm border border-zinc-100">
        <div className="text-[10px] font-semibold text-brand-dark mb-0.5">Enquête de satisfaction</div>
        <div className="text-[9px] text-zinc-500">Votre avis compte !</div>
      </div>

      <div className="space-y-2">
        <div className="rounded-lg bg-white p-2.5 shadow-sm border border-zinc-100">
          <div className="text-[9px] text-brand-dark mb-2">Comment évaluez-vous votre séjour ?</div>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className={cn(
                  "h-6 w-6 rounded-full flex items-center justify-center text-[10px]",
                  star <= 4 ? "bg-brand-primary text-white" : "bg-zinc-100 text-zinc-400"
                )}
              >
                ★
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-white p-2.5 shadow-sm border border-zinc-100">
          <div className="text-[9px] text-brand-dark mb-1.5">Recommanderiez-vous notre hôtel ?</div>
          <div className="flex gap-1.5">
            <button className="flex-1 rounded-lg bg-brand-primary/10 py-1.5 text-[9px] font-medium text-brand-primary">
              Oui
            </button>
            <button className="flex-1 rounded-lg bg-zinc-100 py-1.5 text-[9px] font-medium text-zinc-500">
              Non
            </button>
          </div>
        </div>

        <button className="w-full rounded-lg bg-brand-primary py-2 text-[9px] font-medium text-white shadow-sm">
          Envoyer
        </button>
      </div>
    </>
  );
}

function UpsellContent() {
  return (
    <>
      <div className="mb-2 text-center">
        <div className="text-[9px] text-zinc-500 mb-0.5">Services</div>
        <div className="text-[11px] font-semibold text-brand-dark">Améliorez votre séjour</div>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        <div className="rounded-lg bg-white p-2 shadow-sm border border-zinc-100">
          <div className="h-10 rounded-md bg-brand-primary/10 mb-1 flex items-center justify-center">
            <span className="text-base">🍳</span>
          </div>
          <div className="text-[9px] font-semibold text-brand-dark">Petit-déj</div>
          <div className="text-[8px] text-zinc-500">+15€/pers</div>
          <button className="mt-1 w-full rounded-md bg-brand-primary py-1 text-[8px] font-medium text-white">
            Ajouter
          </button>
        </div>

        <div className="rounded-lg bg-white p-2 shadow-sm border border-zinc-100">
          <div className="h-10 rounded-md bg-brand-primary/10 mb-1 flex items-center justify-center">
            <span className="text-base">⬆️</span>
          </div>
          <div className="text-[9px] font-semibold text-brand-dark">Upgrade</div>
          <div className="text-[8px] text-zinc-500">+50€/nuit</div>
          <button className="mt-1 w-full rounded-md bg-brand-primary py-1 text-[8px] font-medium text-white">
            Ajouter
          </button>
        </div>

        <div className="rounded-lg bg-white p-2 shadow-sm border border-zinc-100">
          <div className="h-10 rounded-md bg-brand-primary/10 mb-1 flex items-center justify-center">
            <span className="text-base">🧖</span>
          </div>
          <div className="text-[9px] font-semibold text-brand-dark">Spa</div>
          <div className="text-[8px] text-zinc-500">+80€</div>
          <button className="mt-1 w-full rounded-md bg-zinc-100 py-1 text-[8px] font-medium text-zinc-600">
            Voir
          </button>
        </div>

        <div className="rounded-lg bg-white p-2 shadow-sm border border-zinc-100">
          <div className="h-10 rounded-md bg-brand-primary/10 mb-1 flex items-center justify-center">
            <span className="text-base">🚗</span>
          </div>
          <div className="text-[9px] font-semibold text-brand-dark">Late C/O</div>
          <div className="text-[8px] text-zinc-500">+30€</div>
          <button className="mt-1 w-full rounded-md bg-zinc-100 py-1 text-[8px] font-medium text-zinc-600">
            Voir
          </button>
        </div>
      </div>
    </>
  );
}

interface WorkflowStep {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface WorkflowIndicatorProps {
  workflow: {
    trigger: WorkflowStep;
    action: WorkflowStep;
    result: WorkflowStep;
  };
  color: string;
}

function WorkflowIndicator({ workflow, color }: WorkflowIndicatorProps) {
  const steps = [
    { ...workflow.trigger, type: 'trigger' },
    { ...workflow.action, type: 'action' },
    { ...workflow.result, type: 'result' },
  ];

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      {steps.map((step, index) => (
        <div key={step.type} className="flex items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.15 }}
            className="flex flex-col items-center"
          >
            <div
              className={cn(
                'flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl shadow-md transition-all duration-300',
                step.type === 'action' ? 'bg-brand-primary' : 'bg-white border border-zinc-200'
              )}
            >
              <step.icon
                className={cn(
                  'h-4 w-4 md:h-5 md:w-5',
                  step.type === 'action' ? 'text-white' : 'text-brand-dark'
                )}
              />
            </div>
            <span className="mt-2 text-[10px] md:text-xs font-medium text-zinc-600 text-center max-w-[70px] md:max-w-[90px] leading-tight">
              {step.label}
            </span>
          </motion.div>

          {index < steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              transition={{ duration: 0.3, delay: index * 0.15 + 0.1 }}
              className="mx-1 md:mx-2 flex items-center"
            >
              <div className="h-0.5 w-6 md:w-10 bg-gradient-to-r from-zinc-200 to-zinc-300 rounded-full" />
              <ArrowRight className="h-3 w-3 md:h-4 md:w-4 text-zinc-400 -ml-1" />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
