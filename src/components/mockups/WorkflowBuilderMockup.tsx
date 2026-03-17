'use client';

import { BrowserMockup } from './PhoneMockup';
import {
  CalendarCheck,
  Clock,
  MessageSquare,
  Plus,
  Mail,
  Gift,
  Zap,
  MoreHorizontal,
  Play,
} from 'lucide-react';

export function WorkflowBuilderMockup() {
  return (
    <BrowserMockup title="Workflow Builder">
      <div className="p-4 bg-gray-50 min-h-[320px]">
        {/* Workflow header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
              <Zap className="w-4 h-4 text-brand-primary" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800">Bienvenue client</h4>
              <p className="text-[10px] text-gray-500">3 étapes • Actif</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-500">
              <MoreHorizontal className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-brand-primary text-white text-xs font-medium rounded-lg">
              <Play className="w-3 h-3" />
              Actif
            </button>
          </div>
        </div>

        {/* Workflow nodes */}
        <div className="space-y-3">
          {/* Trigger node */}
          <WorkflowNode
            type="trigger"
            icon={CalendarCheck}
            title="Déclencheur"
            description="Nouvelle réservation confirmée"
          />

          {/* Connector */}
          <Connector />

          {/* Wait node */}
          <WorkflowNode
            type="wait"
            icon={Clock}
            title="Attendre"
            description="1 jour avant l'arrivée"
          />

          {/* Connector */}
          <Connector />

          {/* Action node */}
          <WorkflowNode
            type="action"
            icon={MessageSquare}
            title="Action SMS"
            description="Envoyer SMS 'Bienvenue au {{hotel}}...'"
          />

          {/* Connector */}
          <Connector />

          {/* Add node button */}
          <button className="w-full border-2 border-dashed border-gray-300 rounded-xl p-3 flex items-center justify-center gap-2 text-gray-400 hover:border-brand-primary hover:text-brand-primary transition-colors">
            <Plus className="w-4 h-4" />
            <span className="text-sm">Ajouter une étape</span>
          </button>
        </div>

        {/* Quick add actions */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <p className="text-[10px] text-gray-500 mb-2">Ajouter rapidement :</p>
          <div className="flex gap-2">
            <QuickAddButton icon={Mail} label="Email" />
            <QuickAddButton icon={MessageSquare} label="SMS" />
            <QuickAddButton icon={Clock} label="Délai" />
            <QuickAddButton icon={Gift} label="Offre" />
          </div>
        </div>
      </div>
    </BrowserMockup>
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
    <div className={`${style.border} ${style.bg} rounded-xl p-3 flex items-center gap-3`}>
      <div className={`w-10 h-10 rounded-lg ${style.iconBg} flex items-center justify-center`}>
        <Icon className={`w-5 h-5 ${style.iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-700">{title}</p>
        <p className="text-sm text-gray-600 truncate">{description}</p>
      </div>
      <button className="p-1 rounded hover:bg-white/50 text-gray-400">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex justify-center">
      <div className="w-0.5 h-4 bg-gray-300" />
    </div>
  );
}

function QuickAddButton({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button className="flex items-center gap-1.5 px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-brand-primary hover:text-brand-primary transition-colors">
      <Icon className="w-3 h-3" />
      {label}
    </button>
  );
}
