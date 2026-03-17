'use client';

import {
  Zap,
  Clock,
  Mail,
  GitBranch,
  GripVertical,
  MousePointer2,
  Timer,
  Send,
} from 'lucide-react';

export function WorkflowBuilderFeatureMockup() {
  return (
    <div className="flex h-full w-full">
      {/* Left sidebar - draggable blocks */}
      <div className="w-16 bg-gray-50 border-r border-gray-200 p-2 flex flex-col gap-2">
        <p className="text-[8px] font-semibold text-gray-400 uppercase text-center mb-1">Blocs</p>
        <DraggableBlock icon={Zap} label="Trigger" color="text-emerald-600" bgColor="bg-emerald-50" />
        <DraggableBlock icon={Timer} label="Delai" color="text-blue-600" bgColor="bg-blue-50" />
        <DraggableBlock icon={GitBranch} label="Condition" color="text-purple-600" bgColor="bg-purple-50" />
        <DraggableBlock icon={Send} label="Action" color="text-orange-600" bgColor="bg-orange-50" />
        <div className="mt-auto">
          <div className="border-t border-gray-200 pt-2">
            <DraggableBlock icon={MousePointer2} label="Select" color="text-gray-500" bgColor="bg-gray-100" active />
          </div>
        </div>
      </div>

      {/* Canvas area */}
      <div className="flex-1 p-6 bg-[#fafbfc] relative overflow-hidden">
        {/* Grid dots background */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }} />

        {/* Workflow nodes on canvas */}
        <div className="relative space-y-0 max-w-xs">
          {/* Trigger node */}
          <CanvasNode
            type="trigger"
            icon={Zap}
            title="Nouvelle reservation"
            subtitle="PMS - Reservation confirmee"
            color="emerald"
          />

          {/* Connector line */}
          <CanvasConnector />

          {/* Delay node */}
          <CanvasNode
            type="delay"
            icon={Clock}
            title="Attendre J-3"
            subtitle="3 jours avant arrivee"
            color="blue"
          />

          {/* Connector line */}
          <CanvasConnector />

          {/* Action node */}
          <CanvasNode
            type="action"
            icon={Mail}
            title="Email pre-sejour"
            subtitle="Template: Bienvenue"
            color="orange"
          />

          {/* Connector line */}
          <CanvasConnector />

          {/* Condition node with branches */}
          <div className="relative">
            <CanvasNode
              type="condition"
              icon={GitBranch}
              title="Couple ?"
              subtitle="Si type_sejour = couple"
              color="purple"
            />

            {/* Branching */}
            <div className="flex gap-3 mt-2 ml-4">
              {/* Yes branch */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-3 bg-emerald-400" />
                <span className="text-[8px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full mb-1">Oui</span>
                <div className="w-0.5 h-2 bg-emerald-400" />
                <div className="bg-orange-50 border border-orange-200 rounded-lg px-2 py-1.5 text-center">
                  <Mail className="w-3 h-3 text-orange-500 mx-auto mb-0.5" />
                  <p className="text-[8px] font-medium text-gray-700">Offre romantique</p>
                </div>
              </div>

              {/* No branch */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-3 bg-red-400" />
                <span className="text-[8px] font-medium text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full mb-1">Non</span>
                <div className="w-0.5 h-2 bg-red-400" />
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-center">
                  <Mail className="w-3 h-3 text-gray-500 mx-auto mb-0.5" />
                  <p className="text-[8px] font-medium text-gray-700">Email standard</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Zoom controls */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white border border-gray-200 rounded-lg shadow-sm px-1.5 py-1">
          <button className="text-[10px] text-gray-500 w-5 h-5 flex items-center justify-center hover:bg-gray-100 rounded">-</button>
          <span className="text-[9px] text-gray-400 px-1">100%</span>
          <button className="text-[10px] text-gray-500 w-5 h-5 flex items-center justify-center hover:bg-gray-100 rounded">+</button>
        </div>
      </div>
    </div>
  );
}

function DraggableBlock({
  icon: Icon,
  label,
  color,
  bgColor,
  active,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
  bgColor: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg cursor-grab text-center border ${
        active ? 'border-blue-300 bg-blue-50' : 'border-transparent hover:bg-gray-100'
      }`}
    >
      <div className={`w-7 h-7 rounded-md ${bgColor} flex items-center justify-center`}>
        <Icon className={`w-3.5 h-3.5 ${color}`} />
      </div>
      <span className="text-[7px] leading-tight text-gray-500">{label}</span>
    </div>
  );
}

function CanvasNode({
  icon: Icon,
  title,
  subtitle,
  color,
}: {
  type: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  color: 'emerald' | 'blue' | 'orange' | 'purple';
}) {
  const styles = {
    emerald: { border: 'border-emerald-300', bg: 'bg-emerald-50', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
    blue: { border: 'border-blue-300', bg: 'bg-blue-50', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    orange: { border: 'border-orange-300', bg: 'bg-orange-50', iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
    purple: { border: 'border-purple-300', bg: 'bg-purple-50', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  };

  const s = styles[color];

  return (
    <div className={`${s.bg} border ${s.border} rounded-xl px-3 py-2 flex items-center gap-2 shadow-sm relative group max-w-[280px]`}>
      <div className={`w-7 h-7 rounded-lg ${s.iconBg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-3.5 h-3.5 ${s.iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold text-gray-800 truncate">{title}</p>
        <p className="text-[8px] text-gray-500 truncate">{subtitle}</p>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="w-3 h-3 text-gray-400 cursor-grab" />
      </div>
    </div>
  );
}

function CanvasConnector() {
  return (
    <div className="flex justify-center py-0.5" style={{ marginLeft: '20px' }}>
      <div className="flex flex-col items-center">
        <div className="w-0.5 h-4 bg-gray-300" />
        <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-gray-300" />
      </div>
    </div>
  );
}
