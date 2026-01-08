'use client';

import { motion } from 'framer-motion';
import { Calendar, Building, Star, Megaphone, Zap } from 'lucide-react';
import { Container } from '@/components/ui';

const JOURNEY_STEPS = [
  {
    id: 'before',
    icon: Calendar,
    title: 'Avant',
    subtitle: 'le séjour',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-100',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-600',
    position: 'top',
    examples: [
      'Email de confirmation',
      'Proposition d\'upsell',
      'Infos pratiques',
    ],
  },
  {
    id: 'during',
    icon: Building,
    title: 'Pendant',
    subtitle: 'le séjour',
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-100',
    borderColor: 'border-emerald-500',
    textColor: 'text-emerald-600',
    position: 'right',
    examples: [
      'Message de bienvenue',
      'Infos restaurant',
      'Room service',
    ],
  },
  {
    id: 'after',
    icon: Star,
    title: 'Après',
    subtitle: 'le séjour',
    color: 'bg-amber-500',
    lightColor: 'bg-amber-100',
    borderColor: 'border-amber-500',
    textColor: 'text-amber-600',
    position: 'bottom',
    examples: [
      'Demande d\'avis',
      'Programme fidélité',
      'Offre de retour',
    ],
  },
  {
    id: 'marketing',
    icon: Megaphone,
    title: 'Marketing',
    subtitle: 'continu',
    color: 'bg-purple-500',
    lightColor: 'bg-purple-100',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-600',
    position: 'left',
    examples: [
      'Newsletter',
      'Offres saisonnières',
      'Campagnes ciblées',
    ],
  },
];

export function ThaisJourneyHub() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-brand-light/20 to-white">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-brand-primary/10 rounded-full mb-6">
            <span className="text-sm font-semibold text-purple-600">Version Hub Central</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl md:text-5xl">
            Une solution pour <span className="text-brand-primary">chaque moment</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            TriggerFlow au centre de votre relation client
          </p>
        </motion.div>

        {/* Hub Layout - Desktop */}
        <div className="hidden lg:block">
          <div className="relative max-w-4xl mx-auto" style={{ height: '500px' }}>
            {/* Central Hub */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-primary to-emerald-600 flex items-center justify-center shadow-2xl">
                <div className="text-center text-white">
                  <Zap className="w-10 h-10 mx-auto mb-1" />
                  <span className="text-xs font-bold">TriggerFlow</span>
                </div>
              </div>
            </motion.div>

            {/* Connection Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
              {/* Top line */}
              <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="#e5e7eb" strokeWidth="3" strokeDasharray="8 4" />
              {/* Right line */}
              <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="#e5e7eb" strokeWidth="3" strokeDasharray="8 4" />
              {/* Bottom line */}
              <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="#e5e7eb" strokeWidth="3" strokeDasharray="8 4" />
              {/* Left line */}
              <line x1="50%" y1="50%" x2="15%" y2="50%" stroke="#e5e7eb" strokeWidth="3" strokeDasharray="8 4" />
            </svg>

            {/* Top - Avant */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="absolute left-1/2 -translate-x-1/2 top-0"
            >
              <div className="bg-white rounded-2xl shadow-lg p-5 border-2 border-blue-200 hover:border-blue-500 transition-colors w-56">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-600">Avant</h3>
                    <p className="text-xs text-zinc-500">le séjour</p>
                  </div>
                </div>
                <ul className="space-y-1">
                  {JOURNEY_STEPS[0].examples.map((ex) => (
                    <li key={ex} className="text-xs text-zinc-600 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-500" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right - Pendant */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute right-0 top-1/2 -translate-y-1/2"
            >
              <div className="bg-white rounded-2xl shadow-lg p-5 border-2 border-emerald-200 hover:border-emerald-500 transition-colors w-56">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Building className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-600">Pendant</h3>
                    <p className="text-xs text-zinc-500">le séjour</p>
                  </div>
                </div>
                <ul className="space-y-1">
                  {JOURNEY_STEPS[1].examples.map((ex) => (
                    <li key={ex} className="text-xs text-zinc-600 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-emerald-500" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Bottom - Après */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-0"
            >
              <div className="bg-white rounded-2xl shadow-lg p-5 border-2 border-amber-200 hover:border-amber-500 transition-colors w-56">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Star className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-amber-600">Après</h3>
                    <p className="text-xs text-zinc-500">le séjour</p>
                  </div>
                </div>
                <ul className="space-y-1">
                  {JOURNEY_STEPS[2].examples.map((ex) => (
                    <li key={ex} className="text-xs text-zinc-600 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-amber-500" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Left - Marketing */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute left-0 top-1/2 -translate-y-1/2"
            >
              <div className="bg-white rounded-2xl shadow-lg p-5 border-2 border-purple-200 hover:border-purple-500 transition-colors w-56">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Megaphone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-600">Marketing</h3>
                    <p className="text-xs text-zinc-500">continu</p>
                  </div>
                </div>
                <ul className="space-y-1">
                  {JOURNEY_STEPS[3].examples.map((ex) => (
                    <li key={ex} className="text-xs text-zinc-600 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-purple-500" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hub Layout - Mobile/Tablet */}
        <div className="lg:hidden">
          {/* Central Hub Mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-primary to-emerald-600 flex items-center justify-center shadow-xl">
              <div className="text-center text-white">
                <Zap className="w-8 h-8 mx-auto" />
                <span className="text-[10px] font-bold">TriggerFlow</span>
              </div>
            </div>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            {JOURNEY_STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`bg-white rounded-xl shadow-lg p-4 border-2 ${step.borderColor.replace('border-', 'border-').replace('500', '200')} hover:${step.borderColor} transition-colors h-full`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-10 h-10 rounded-lg ${step.lightColor} flex items-center justify-center`}>
                      <step.icon className={`w-5 h-5 ${step.textColor}`} />
                    </div>
                    <div>
                      <h3 className={`font-bold text-sm ${step.textColor}`}>{step.title}</h3>
                      <p className="text-[10px] text-zinc-500">{step.subtitle}</p>
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {step.examples.map((ex) => (
                      <li key={ex} className="text-xs text-zinc-600 flex items-center gap-2">
                        <span className={`w-1 h-1 rounded-full ${step.color}`} />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
