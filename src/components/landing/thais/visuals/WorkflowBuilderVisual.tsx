'use client';

import { motion } from 'framer-motion';
import {
  CalendarCheck,
  Clock,
  MessageSquare,
  Mail,
  Plus,
  MoreHorizontal,
  Play,
  Zap,
} from 'lucide-react';

export function WorkflowBuilderVisual() {
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
            app.trigger-flow.com/workflows
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-gradient-to-br from-gray-50 to-white min-h-[400px]">
        {/* Workflow header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-800">Confirmation de réservation</h4>
              <p className="text-xs text-gray-500">4 étapes • 1,247 envois</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-200 text-gray-500 transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg shadow-md"
            >
              <Play className="w-4 h-4" />
              Actif
            </motion.button>
          </div>
        </div>

        {/* Workflow nodes */}
        <div className="space-y-3">
          {/* Trigger node */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <WorkflowNode
              type="trigger"
              icon={CalendarCheck}
              title="Déclencheur"
              description="Nouvelle réservation confirmée dans Thaïs"
            />
          </motion.div>

          <Connector />

          {/* Wait node */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <WorkflowNode
              type="wait"
              icon={Clock}
              title="Attendre"
              description="1 heure après confirmation"
            />
          </motion.div>

          <Connector />

          {/* Email action */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <WorkflowNode
              type="action"
              icon={Mail}
              title="Envoyer Email"
              description="Email de confirmation avec détails séjour"
            />
          </motion.div>

          <Connector />

          {/* SMS action */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <WorkflowNode
              type="action"
              icon={MessageSquare}
              title="Envoyer SMS"
              description="SMS : 'Merci {{prenom}}, à bientôt !'"
            />
          </motion.div>

          {/* Add step button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.02 }}
            className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-center gap-2 text-gray-400 hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span className="text-sm font-medium">Ajouter une étape</span>
          </motion.button>
        </div>

        {/* Stats footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500"
        >
          <span>📊 Taux d'ouverture : 78%</span>
          <span>✅ 1,247 clients contactés</span>
          <span>⚡ Dernière exécution : il y a 5 min</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

interface WorkflowNodeProps {
  type: 'trigger' | 'wait' | 'action';
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

function WorkflowNode({ type, icon: Icon, title, description }: WorkflowNodeProps) {
  const styles = {
    trigger: {
      border: 'border-l-4 border-orange-500',
      bg: 'bg-orange-50',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    wait: {
      border: 'border-l-4 border-blue-500',
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    action: {
      border: 'border-l-4 border-green-500',
      bg: 'bg-green-50',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
  };

  const style = styles[type];

  return (
    <div
      className={`${style.border} ${style.bg} rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer group`}
    >
      <div className={`w-12 h-12 rounded-lg ${style.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
        <Icon className={`w-6 h-6 ${style.iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{title}</p>
        <p className="text-sm text-gray-800 font-medium mt-0.5">{description}</p>
      </div>
      <button className="p-2 rounded-lg hover:bg-white/70 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex justify-center py-1">
      <motion.div
        className="w-0.5 h-6 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
