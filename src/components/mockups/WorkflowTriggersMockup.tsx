'use client';

import { BrowserMockup } from './PhoneMockup';
import {
  CalendarCheck,
  LogIn,
  LogOut,
  Clock,
  Star,
  Cake,
  ChevronDown,
  Check,
  Zap,
  MousePointer2,
  Timer,
  Activity,
} from 'lucide-react';

export function WorkflowTriggersMockup() {
  return (
    <BrowserMockup title="Triggers Configuration" className="max-w-lg">
      <div className="p-4 bg-gray-50 min-h-[300px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-primary/10 flex items-center justify-center">
              <Zap className="w-4 h-4 text-brand-primary" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-800">Choisir un declencheur</h4>
              <p className="text-[9px] text-gray-500">Selectionnez l&apos;evenement qui lance le workflow</p>
            </div>
          </div>
          <span className="text-[9px] font-medium text-brand-primary bg-brand-primary/10 px-2 py-1 rounded-full">
            15+ declencheurs
          </span>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mb-3">
          <FilterTab icon={MousePointer2} label="Evenements" active />
          <FilterTab icon={Timer} label="Temporels" />
          <FilterTab icon={Activity} label="Comportement" />
        </div>

        {/* Trigger grid */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <TriggerCard
            icon={CalendarCheck}
            label="Nouvelle reservation"
            selected
          />
          <TriggerCard
            icon={LogIn}
            label="Check-in"
          />
          <TriggerCard
            icon={LogOut}
            label="Check-out"
          />
          <TriggerCard
            icon={Clock}
            label="Date (J-X)"
          />
          <TriggerCard
            icon={Star}
            label="Score satisfaction"
          />
          <TriggerCard
            icon={Cake}
            label="Anniversaire"
          />
        </div>

        {/* Selected trigger configuration */}
        <div className="bg-white rounded-xl border-2 border-brand-primary/30 p-3 space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-brand-primary/10 flex items-center justify-center">
              <CalendarCheck className="w-3 h-3 text-brand-primary" />
            </div>
            <p className="text-[10px] font-semibold text-gray-800">Nouvelle reservation</p>
            <Check className="w-3 h-3 text-brand-primary ml-auto" />
          </div>

          {/* Config fields */}
          <div className="space-y-2">
            <ConfigField label="Type d'evenement">
              <div className="flex items-center justify-between px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg">
                <span className="text-[10px] text-gray-700">Reservation confirmee</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </div>
            </ConfigField>

            <ConfigField label="Conditions">
              <div className="space-y-1">
                <ConditionRow field="Source" operator="=" value="Booking.com" />
                <ConditionRow field="Nb nuits" operator=">=" value="2" />
              </div>
            </ConfigField>

            <div className="flex items-center gap-1.5 pt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
              <span className="text-[9px] text-brand-primary font-medium">Actif - 142 declenchements ce mois</span>
            </div>
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}

function FilterTab({ icon: Icon, label, active }: { icon: React.ComponentType<{ className?: string }>; label: string; active?: boolean }) {
  return (
    <button
      className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-medium transition-colors ${
        active
          ? 'bg-brand-primary text-white'
          : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-primary'
      }`}
    >
      <Icon className="w-3 h-3" />
      {label}
    </button>
  );
}

function TriggerCard({
  icon: Icon,
  label,
  selected,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  selected?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col items-center gap-1 p-2 rounded-xl border cursor-pointer transition-all ${
        selected
          ? 'border-brand-primary bg-brand-primary/5 shadow-sm'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      {selected && (
        <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-brand-primary flex items-center justify-center">
          <Check className="w-2 h-2 text-white" />
        </div>
      )}
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
        selected ? 'bg-brand-primary/10' : 'bg-gray-50'
      }`}>
        <Icon className={`w-4 h-4 ${selected ? 'text-brand-primary' : 'text-gray-500'}`} />
      </div>
      <span className={`text-[8px] text-center leading-tight font-medium ${
        selected ? 'text-brand-primary' : 'text-gray-600'
      }`}>
        {label}
      </span>
    </div>
  );
}

function ConfigField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[9px] font-medium text-gray-500 mb-0.5 block">{label}</label>
      {children}
    </div>
  );
}

function ConditionRow({ field, operator, value }: { field: string; operator: string; value: string }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-mono">{field}</span>
      <span className="text-[9px] text-gray-400 font-mono">{operator}</span>
      <span className="text-[9px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-mono">{value}</span>
    </div>
  );
}
