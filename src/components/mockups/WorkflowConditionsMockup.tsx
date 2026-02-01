'use client';

import { BrowserMockup } from './PhoneMockup';
import {
  GitBranch,
  Heart,
  Baby,
  Briefcase,
  Mail,
  HelpCircle,
  ArrowDown,
} from 'lucide-react';

export function WorkflowConditionsMockup() {
  return (
    <BrowserMockup title="Conditions & Branches" className="max-w-lg">
      <div className="p-4 bg-gray-50 min-h-[300px]">
        {/* Header context */}
        <div className="flex items-center gap-2 mb-3 px-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
          <span className="text-[9px] text-gray-500">Workflow: <span className="font-medium text-gray-700">Offres personnalisees post-reservation</span></span>
        </div>

        {/* Incoming connector */}
        <div className="flex justify-center mb-1">
          <div className="flex flex-col items-center">
            <div className="text-[8px] text-gray-400 mb-1">... etapes precedentes</div>
            <div className="w-0.5 h-4 bg-gray-300" />
            <ArrowDown className="w-3 h-3 text-gray-300" />
          </div>
        </div>

        {/* Condition node */}
        <div className="flex justify-center mb-2">
          <div className="bg-purple-50 border-2 border-purple-300 rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-sm relative">
            {/* Diamond shape indicator */}
            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-purple-400 rotate-45 rounded-sm" />
            <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center">
              <GitBranch className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-purple-800">Type de sejour ?</p>
              <p className="text-[8px] text-purple-500">Variable: reservation.type_sejour</p>
            </div>
          </div>
        </div>

        {/* Branch connectors and cards */}
        <div className="grid grid-cols-4 gap-2">
          {/* Couple branch */}
          <BranchCard
            condition="Couple"
            icon={Heart}
            action="Offre romantique"
            actionDetail="Email + spa -20%"
            color="pink"
            connectorColor="bg-pink-400"
          />

          {/* Famille branch */}
          <BranchCard
            condition="Famille"
            icon={Baby}
            action="Offre kids club"
            actionDetail="Email + kids -15%"
            color="blue"
            connectorColor="bg-blue-400"
          />

          {/* Business branch */}
          <BranchCard
            condition="Business"
            icon={Briefcase}
            action="Offre business lounge"
            actionDetail="Email + lounge pass"
            color="purple"
            connectorColor="bg-purple-400"
          />

          {/* Default branch */}
          <BranchCard
            condition="Sinon"
            icon={HelpCircle}
            action="Offre generique"
            actionDetail="Email de bienvenue"
            color="gray"
            connectorColor="bg-gray-400"
            isDefault
          />
        </div>

        {/* Merge point */}
        <div className="flex justify-center mt-2">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <div className="w-8 h-0.5 bg-pink-300" />
              <div className="w-8 h-0.5 bg-blue-300" />
              <div className="w-8 h-0.5 bg-purple-300" />
              <div className="w-8 h-0.5 bg-gray-300" />
            </div>
            <div className="w-0.5 h-3 bg-gray-300 mt-0.5" />
            <ArrowDown className="w-3 h-3 text-gray-300" />
            <div className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 mt-0.5">
              <p className="text-[8px] text-gray-500 text-center">Suite du workflow...</p>
            </div>
          </div>
        </div>

        {/* Stats footer */}
        <div className="mt-3 pt-2 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StatBadge label="Couple" value="38%" color="bg-pink-100 text-pink-700" />
            <StatBadge label="Famille" value="29%" color="bg-blue-100 text-blue-700" />
            <StatBadge label="Business" value="22%" color="bg-purple-100 text-purple-700" />
            <StatBadge label="Autre" value="11%" color="bg-gray-100 text-gray-600" />
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}

function BranchCard({
  condition,
  icon: Icon,
  action,
  actionDetail,
  color,
  connectorColor,
  isDefault,
}: {
  condition: string;
  icon: React.ComponentType<{ className?: string }>;
  action: string;
  actionDetail: string;
  color: 'pink' | 'blue' | 'purple' | 'gray';
  connectorColor: string;
  isDefault?: boolean;
}) {
  const colorStyles = {
    pink: { bg: 'bg-pink-50', border: 'border-pink-200', iconBg: 'bg-pink-100', iconColor: 'text-pink-600', badge: 'bg-pink-100 text-pink-700' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', badge: 'bg-purple-100 text-purple-700' },
    gray: { bg: 'bg-gray-50', border: 'border-gray-200', iconBg: 'bg-gray-100', iconColor: 'text-gray-500', badge: 'bg-gray-200 text-gray-600' },
  };

  const s = colorStyles[color];

  return (
    <div className="flex flex-col items-center">
      {/* Connector */}
      <div className={`w-0.5 h-4 ${connectorColor}`} />
      {/* Condition label */}
      <span className={`text-[7px] font-semibold px-1.5 py-0.5 rounded-full mb-1 ${s.badge}`}>
        {isDefault ? 'Sinon' : `Si "${condition}"`}
      </span>
      <div className={`w-0.5 h-2 ${connectorColor}`} />
      {/* Action card */}
      <div className={`${s.bg} border ${s.border} rounded-xl p-2 text-center w-full`}>
        <div className={`w-6 h-6 rounded-lg ${s.iconBg} flex items-center justify-center mx-auto mb-1`}>
          <Icon className={`w-3 h-3 ${s.iconColor}`} />
        </div>
        <p className="text-[8px] font-semibold text-gray-800 leading-tight">{action}</p>
        <div className="flex items-center justify-center gap-0.5 mt-0.5">
          <Mail className="w-2 h-2 text-gray-400" />
          <p className="text-[7px] text-gray-500">{actionDetail}</p>
        </div>
      </div>
    </div>
  );
}

function StatBadge({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-medium ${color}`}>
      <span>{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
