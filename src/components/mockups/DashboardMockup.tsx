'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Home,
  BarChart3,
  Mail,
  MessageSquare,
  Smartphone,
  Zap,
  FileText,
  TrendingUp,
  Settings,
  Check,
  Pause,
  Star,
  Clock,
} from 'lucide-react';

export function DashboardMockup() {
  const prefersReducedMotion = useReducedMotion();

  const stats = [
    { value: '1,247', label: 'Emails ce mois', icon: Mail, trend: '+12%', color: 'text-blue-600' },
    { value: '89.2%', label: "Taux d'ouverture", icon: TrendingUp, trend: '+3%', color: 'text-green-600' },
    { value: '+17%', label: 'Panier moyen', icon: BarChart3, trend: '+5%', color: 'text-purple-600' },
  ];

  const workflows = [
    { name: 'Email confirmation réservation', status: 'active', count: '1,234' },
    { name: 'SMS bienvenue J-1', status: 'active', count: '856' },
    { name: 'Enquête satisfaction J+1', status: 'active', count: '421' },
    { name: 'Offre spa personnalisée', status: 'paused', count: '89' },
  ];

  const activities = [
    { icon: Mail, text: 'Email envoyé à M. Dupont', time: 'il y a 2min', color: 'text-blue-500' },
    { icon: Smartphone, text: 'SMS envoyé à Mme Martin', time: 'il y a 5min', color: 'text-green-500' },
    { icon: Star, text: 'Nouvel avis Google (5★)', time: 'il y a 12min', color: 'text-yellow-500' },
  ];

  const sidebarIcons = [
    { icon: Home, active: false },
    { icon: BarChart3, active: false },
    { icon: Mail, active: false },
    { icon: MessageSquare, active: false },
    { icon: Smartphone, active: false },
    { icon: Zap, active: true },
    { icon: FileText, active: false },
    { icon: TrendingUp, active: false },
  ];

  return (
    <div className="relative">
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-8 rounded-3xl bg-brand-primary/20 blur-3xl -z-10"
        animate={!prefersReducedMotion ? {
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Main Dashboard */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Window Header */}
        <div className="h-10 bg-gray-100 flex items-center px-4 gap-2 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 bg-white rounded-md text-xs text-gray-500 border border-gray-200 flex items-center gap-2">
              <Zap className="w-3 h-3 text-brand-primary" />
              TriggerFlow
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <span className="text-xs">─</span>
            <span className="text-xs">□</span>
            <span className="text-xs">✕</span>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-16 bg-gray-50 border-r border-gray-200 py-4 flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center mb-4">
              <span className="text-white text-sm font-bold">TF</span>
            </div>
            <div className="w-8 h-px bg-gray-200 mb-2" />
            {sidebarIcons.map((item, i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                  item.active
                    ? 'bg-brand-primary/10 text-brand-primary'
                    : 'text-gray-400 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
              </div>
            ))}
            <div className="flex-1" />
            <div className="w-8 h-px bg-gray-200 my-2" />
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 cursor-pointer">
              <Settings className="w-5 h-5" />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-gray-800 text-base">
                  Bonjour, Hôtel & Spa du Lac 👋
                </h3>
                <p className="text-sm text-gray-500">Voici votre activité du jour</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                  <span className="text-xs font-medium text-brand-primary">JD</span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <span className="text-xs text-green-600 font-medium">{stat.trend}</span>
                  </div>
                  <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Workflows */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Automatisations actives</span>
                <span className="text-xs text-brand-primary cursor-pointer hover:underline">Voir tout</span>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {workflows.map((workflow, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-4 py-3 ${
                      i !== workflows.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        workflow.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {workflow.status === 'active' ? (
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                          <Pause className="w-3.5 h-3.5 text-gray-400" />
                        )}
                      </div>
                      <span className="text-sm text-gray-700">{workflow.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">{workflow.count}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        workflow.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {workflow.status === 'active' ? 'Actif' : 'Pause'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Dernières activités</span>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {activities.map((activity, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-4 py-3 ${
                      i !== activities.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <activity.icon className={`w-4 h-4 ${activity.color}`} />
                      <span className="text-sm text-gray-700">{activity.text}</span>
                    </div>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Cards */}
      <FloatingCard
        className="absolute -right-4 top-12"
        delay={0}
        prefersReducedMotion={prefersReducedMotion}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">SMS envoyé ✓</p>
            <p className="text-[10px] text-gray-500">Chambre 302</p>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard
        className="absolute -left-4 bottom-16"
        delay={1}
        prefersReducedMotion={prefersReducedMotion}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">+1 avis Google</p>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard
        className="absolute -left-2 top-20"
        delay={2}
        prefersReducedMotion={prefersReducedMotion}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Taux d'ouverture</p>
            <p className="text-sm font-bold text-brand-primary">89%</p>
          </div>
        </div>
      </FloatingCard>
    </div>
  );
}

function FloatingCard({
  children,
  className,
  delay,
  prefersReducedMotion,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
  prefersReducedMotion: boolean | null;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 + delay * 0.2 }}
    >
      <motion.div
        animate={!prefersReducedMotion ? { y: [0, -10, 0] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.5 }}
        className="rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-lg"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
