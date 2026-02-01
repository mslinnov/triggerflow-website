'use client';

import { BrowserMockup } from './PhoneMockup';
import {
  Crown,
  Heart,
  Users,
  Briefcase,
  Clock,
  Filter,
  Tag,
  ChevronRight,
} from 'lucide-react';

export function CrmSegmentsMockup() {
  return (
    <BrowserMockup title="Segments clients" className="max-w-lg">
      <div className="p-4 min-h-[300px]">
        {/* Active segments */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-gray-700">Segments actifs</p>
            <span className="text-[10px] text-brand-primary font-medium cursor-pointer">+ Nouveau</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <SegmentCard icon={Crown} label="VIP" count={156} color="amber" active />
            <SegmentCard icon={Heart} label="Couples" count={1247} color="pink" />
            <SegmentCard icon={Users} label="Familles" count={892} color="blue" />
            <SegmentCard icon={Briefcase} label="Business" count={634} color="purple" />
          </div>
          <div className="mt-2">
            <SegmentCard icon={Clock} label="Dormants > 6 mois" count={234} color="red" wide />
          </div>
        </div>

        {/* Rule builder for selected segment */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
          <div className="flex items-center gap-2 mb-2.5">
            <Filter className="w-3.5 h-3.5 text-amber-600" />
            <p className="text-[10px] font-semibold text-amber-800">Regles du segment VIP</p>
          </div>
          <div className="space-y-1.5">
            <RuleRow label="Nombre de sejours" operator=">" value="3" />
            <div className="text-[9px] font-bold text-amber-500 pl-2">ET</div>
            <RuleRow label="Depenses totales" operator=">" value="2 000 EUR" />
            <div className="text-[9px] font-bold text-amber-500 pl-2">ET</div>
            <RuleRow label="Dernier sejour" operator="<" value="12 mois" />
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-[9px] text-amber-600">156 contacts correspondent</span>
            <span className="text-[9px] font-medium text-brand-primary cursor-pointer">Modifier</span>
          </div>
        </div>

        {/* Tags */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Tag className="w-3 h-3 text-gray-400" />
            <p className="text-[10px] font-semibold text-gray-600">Tags populaires</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <TagPill label="Spa lover" count={89} />
            <TagPill label="Restaurant regulier" count={214} />
            <TagPill label="Early booker" count={167} />
            <TagPill label="Late checkout" count={93} />
            <TagPill label="Anniversaire" count={45} />
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}

function SegmentCard({
  icon: Icon,
  label,
  count,
  color,
  active = false,
  wide = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  count: number;
  color: 'amber' | 'pink' | 'blue' | 'purple' | 'red';
  active?: boolean;
  wide?: boolean;
}) {
  const colors = {
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', icon: 'text-amber-500' },
    pink: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700', icon: 'text-pink-500' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', icon: 'text-blue-500' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', icon: 'text-purple-500' },
    red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: 'text-red-500' },
  };

  const c = colors[color];

  return (
    <div
      className={`${c.bg} border ${c.border} rounded-xl p-2.5 flex items-center gap-2 ${
        active ? 'ring-2 ring-amber-400 ring-offset-1' : ''
      } ${wide ? 'col-span-2' : ''}`}
    >
      <div className={`w-7 h-7 rounded-lg bg-white flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-3.5 h-3.5 ${c.icon}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-[10px] font-semibold ${c.text}`}>{label}</p>
        <p className="text-[9px] text-gray-500">{count.toLocaleString('fr-FR')} contacts</p>
      </div>
      <ChevronRight className="w-3 h-3 text-gray-300 flex-shrink-0" />
    </div>
  );
}

function RuleRow({ label, operator, value }: { label: string; operator: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 border border-amber-200/50">
      <span className="text-[10px] text-gray-600 flex-1">{label}</span>
      <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded">{operator}</span>
      <span className="text-[10px] font-medium text-gray-800">{value}</span>
    </div>
  );
}

function TagPill({ label, count }: { label: string; count: number }) {
  return (
    <span className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
      {label}
      <span className="text-[9px] text-gray-400">({count})</span>
    </span>
  );
}
