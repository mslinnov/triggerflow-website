'use client';

import { motion } from 'framer-motion';
import { Users, Filter, TrendingUp, X } from 'lucide-react';

export function SegmentationVisual() {
  const filters = [
    { label: 'Séjours > 3', active: true, color: 'brand' },
    { label: 'VIP', active: true, color: 'purple' },
    { label: 'Paris', active: false, color: 'gray' },
    { label: 'Séjour < 6 mois', active: true, color: 'blue' },
  ];

  const segments = [
    { name: 'Clients fidèles', count: 1247, percentage: 83, color: 'bg-brand-primary' },
    { name: 'Nouveaux clients', count: 832, percentage: 55, color: 'bg-blue-500' },
    { name: 'À réengager', count: 156, percentage: 10, color: 'bg-orange-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-w-2xl mx-auto"
    >
      {/* Browser Header */}
      <div className="h-10 bg-gray-100 flex items-center px-4 gap-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-4 py-1 bg-white rounded-md text-xs text-gray-500 border border-gray-200">
            app.trigger-flow.com/segments
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-gradient-to-br from-brand-light/10 to-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
              <Filter className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-800">Segmentation clients</h4>
              <p className="text-xs text-gray-500">2,235 contacts • Mis à jour en temps réel</p>
            </div>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white text-sm font-medium rounded-lg shadow-md"
          >
            <Users className="w-4 h-4" />
            2,235
          </motion.div>
        </div>

        {/* Filters section */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
            Filtres actifs
          </p>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter, index) => (
              <motion.div
                key={filter.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <FilterChip filter={filter} />
              </motion.div>
            ))}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-full text-xs font-medium text-gray-400 hover:border-brand-primary hover:text-brand-primary transition-colors"
            >
              + Ajouter un filtre
            </motion.button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6" />

        {/* Segments section */}
        <div>
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4">
            Résultats de segmentation
          </p>

          <div className="space-y-4">
            {segments.map((segment, index) => (
              <motion.div
                key={segment.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.15 }}
                className="group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${segment.color}`} />
                    <span className="text-sm font-medium text-gray-800">{segment.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gray-500">{segment.count} contacts</span>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs font-semibold">+8%</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${segment.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${segment.percentage}%` }}
                    transition={{ delay: 0.8 + index * 0.15, duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between"
        >
          <button className="text-sm text-brand-primary font-medium hover:text-brand-dark transition-colors">
            Exporter la liste
          </button>
          <button className="px-4 py-2 bg-brand-primary text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors shadow-md">
            Créer une campagne
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

function FilterChip({ filter }: { filter: { label: string; active: boolean; color: string } }) {
  const colorClasses = {
    brand: 'bg-brand-primary text-white border-brand-primary',
    purple: 'bg-purple-500 text-white border-purple-500',
    blue: 'bg-blue-500 text-white border-blue-500',
    gray: 'bg-gray-200 text-gray-500 border-gray-300',
  };

  const activeClass = filter.active
    ? colorClasses[filter.color as keyof typeof colorClasses]
    : 'bg-gray-100 text-gray-500 border-gray-200';

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border-2 transition-all ${activeClass} ${
        filter.active ? 'shadow-sm' : ''
      }`}
    >
      <span>{filter.label}</span>
      {filter.active && (
        <button className="hover:bg-white/20 rounded-full p-0.5 transition-colors">
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
