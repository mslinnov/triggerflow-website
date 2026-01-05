'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Mail,
  MessageSquare,
  BarChart3,
  Workflow,
  Settings,
  Users,
  Bell,
  Check,
  Star,
  TrendingUp,
} from 'lucide-react';

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

      {/* Main Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
      >
        {/* Window Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-3 py-1 bg-white rounded-md text-xs text-gray-500 border border-gray-200">
              app.trigger-flow.com
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-14 bg-brand-dark py-4 flex flex-col items-center gap-4">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">TF</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            {[Mail, MessageSquare, Workflow, Users, BarChart3, Settings].map((Icon, i) => (
              <motion.div
                key={i}
                className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                  i === 2 ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                <Icon className="w-4 h-4 text-white/70" />
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">{t('title')}</h3>
                <p className="text-xs text-gray-500">{t('subtitle')}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-gray-500" />
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                  <span className="text-xs font-medium text-brand-primary">JD</span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <StatCard
                icon={Mail}
                value={t('stats.emails.value')}
                label={t('stats.emails.label')}
                trend="+12%"
                color="primary"
              />
              <StatCard
                icon={MessageSquare}
                value={t('stats.sms.value')}
                label={t('stats.sms.label')}
                trend="+8%"
                color="brand"
              />
              <StatCard
                icon={TrendingUp}
                value={t('stats.openRate.value')}
                label={t('stats.openRate.label')}
                trend="+3%"
                color="green"
              />
            </div>

            {/* Workflows List */}
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">{t('workflows.title')}</span>
                <span className="text-[10px] text-brand-primary cursor-pointer">{t('workflows.viewAll')}</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: t('workflows.items.confirmation'), status: 'active', count: '1,234' },
                  { name: t('workflows.items.welcome'), status: 'active', count: '856' },
                  { name: t('workflows.items.satisfaction'), status: 'paused', count: '421' },
                ].map((workflow, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center justify-between py-1.5 px-2 bg-white rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        workflow.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      <span className="text-[11px] text-gray-700">{workflow.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400">{workflow.count}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                        workflow.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {workflow.status === 'active' ? t('workflows.active') : t('workflows.paused')}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
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

function StatCard({
  icon: Icon,
  value,
  label,
  trend,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  trend: string;
  color: 'primary' | 'brand' | 'green';
}) {
  const colorClasses = {
    primary: 'bg-brand-primary/10 text-brand-primary',
    brand: 'bg-brand-dark/10 text-brand-dark',
    green: 'bg-green-100 text-green-600',
  };

  return (
    <div className="bg-white rounded-xl p-2.5 border border-gray-100">
      <div className={`w-6 h-6 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-1.5`}>
        <Icon className="w-3.5 h-3.5" />
      </div>
      <p className="text-sm font-bold text-gray-800">{value}</p>
      <p className="text-[10px] text-gray-500">{label}</p>
      <p className="text-[9px] text-green-600 font-medium">{trend}</p>
    </div>
  );
}
