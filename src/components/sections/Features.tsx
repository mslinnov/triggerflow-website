'use client';

import { useTranslations } from 'next-intl';
import { Clock, Send, Share2, CheckCircle, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container, Badge } from '@/components/ui';

const features = [
  { key: 'manual', icon: Clock },
  { key: 'communication', icon: Send },
  { key: 'connection', icon: Share2 },
] as const;

export function Features() {
  const t = useTranslations('features');

  return (
    <section id="features" className="bg-white py-20 md:py-28 overflow-hidden">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Column - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-4">
                Fonctionnalités
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-brand-dark md:text-4xl lg:text-[2.75rem] lg:leading-tight">
                {t('title')}
              </h2>
              <p className="mt-4 text-lg text-zinc-600 leading-relaxed">{t('subtitle')}</p>
            </motion.div>

            <div className="mt-10 space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="group flex items-start gap-4 rounded-xl border border-zinc-100 bg-white p-5 transition-all duration-300 hover:border-brand-primary/20 hover:shadow-lg">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-dark shadow-lg">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-brand-dark">
                        {t(`${feature.key}.title`)}
                      </h3>
                      <p className="mt-1.5 text-sm text-zinc-600 leading-relaxed">
                        {t(`${feature.key}.description`)}
                      </p>
                    </div>
                    <CheckCircle className="h-5 w-5 shrink-0 text-brand-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Stats Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-primary/20 via-brand-primary/5 to-transparent blur-2xl" />

              {/* Main card */}
              <div className="relative rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-xl">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-brand-dark">Tableau de bord</h3>
                    <p className="text-sm text-zinc-500">Performances temps réel</p>
                  </div>
                  <div className="rounded-lg bg-brand-primary/10 px-3 py-1.5">
                    <span className="text-xs font-semibold text-brand-primary">Live</span>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <StatCard icon={Send} label="SMS envoyés" value="1,247" trend="+12%" />
                  <StatCard icon={TrendingUp} label="Taux ouverture" value="98%" trend="+3%" />
                  <StatCard icon={Users} label="Clients actifs" value="856" trend="+8%" />
                </div>

                {/* Activity chart placeholder */}
                <div className="rounded-xl bg-zinc-50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-brand-dark">Activité cette semaine</span>
                    <span className="text-xs text-zinc-500">7 derniers jours</span>
                  </div>
                  <div className="flex items-end gap-2 h-24">
                    {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                        className={`flex-1 rounded-t-md ${i === 5 ? 'bg-brand-primary' : 'bg-brand-primary/30'}`}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] text-zinc-400">
                    <span>Lun</span>
                    <span>Mar</span>
                    <span>Mer</span>
                    <span>Jeu</span>
                    <span>Ven</span>
                    <span>Sam</span>
                    <span>Dim</span>
                  </div>
                </div>

                {/* Recent activity */}
                <div className="mt-4">
                  <div className="mb-2 text-sm font-medium text-brand-dark">Derniers envois</div>
                  {[
                    { name: 'Check-in M. Dupont', time: '2 min', type: 'sms' },
                    { name: 'Rappel départ Chambre 302', time: '15 min', type: 'email' },
                    { name: 'Enquête satisfaction', time: '1h', type: 'sms' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 border-t border-zinc-100 py-2.5">
                      <div className={`h-2 w-2 rounded-full ${i === 0 ? 'bg-brand-primary' : 'bg-zinc-300'}`} />
                      <span className="flex-1 text-sm text-zinc-700">{item.name}</span>
                      <span className="text-xs text-zinc-400">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-4 top-8 rounded-xl border border-zinc-100 bg-white px-4 py-2.5 shadow-lg md:-right-8"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-primary" />
                  <span className="text-sm font-medium text-brand-dark">Automatisé</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function StatCard({ icon: Icon, label, value, trend }: { icon: React.ElementType; label: string; value: string; trend: string }) {
  return (
    <div className="rounded-xl bg-zinc-50 p-3 text-center">
      <Icon className="mx-auto mb-2 h-5 w-5 text-brand-primary" />
      <div className="text-xl font-bold text-brand-dark">{value}</div>
      <div className="text-[10px] text-zinc-500">{label}</div>
      <div className="mt-1 text-[10px] font-medium text-brand-primary">{trend}</div>
    </div>
  );
}
