'use client';

import { BrowserMockup } from './PhoneMockup';
import { ArrowUpRight, Calendar, FlaskConical, AlertTriangle, Trophy } from 'lucide-react';

export function AnalyticsCompareMockup() {
  return (
    <BrowserMockup title="Analytics — Comparaison" className="max-w-lg">
      <div className="p-4 min-h-[300px]">
        {/* Period Selector */}
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 rounded-lg border border-gray-200 text-[10px]">
            <span className="font-medium text-gray-800">Décembre 2026</span>
            <span className="text-gray-400">vs</span>
            <span className="font-medium text-gray-800">Novembre 2026</span>
          </div>
        </div>

        {/* Side-by-side Metrics */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 mb-4 overflow-hidden">
          <div className="grid grid-cols-4 gap-0 text-center text-[10px] font-medium text-gray-500 px-3 py-2 border-b border-gray-200">
            <span className="text-left">Métrique</span>
            <span>Déc.</span>
            <span>Nov.</span>
            <span>Variation</span>
          </div>
          <CompareRow label="Ouvertures" current="45.2%" previous="42.1%" diff="+3.1%" />
          <CompareRow label="Clics" current="15.3%" previous="12.8%" diff="+2.5%" />
          <CompareRow label="Revenus" current="8,720€" previous="7,140€" diff="+22%" />
          <CompareRow label="NPS" current="58" previous="52" diff="+6" isLast />
        </div>

        {/* A/B Test Section */}
        <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 mb-4">
          <div className="flex items-center gap-1.5 mb-2.5">
            <FlaskConical className="w-3.5 h-3.5 text-purple-500" />
            <span className="text-xs font-semibold text-gray-800">Test objet email</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white rounded-lg p-2 border border-gray-200">
              <p className="text-[10px] text-gray-500 mb-1">Variant A</p>
              <p className="text-sm font-bold text-gray-700">32%</p>
              <p className="text-[10px] text-gray-400">ouverture</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-2 border border-emerald-300 relative">
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center">
                <Trophy className="w-3 h-3 text-white" />
              </div>
              <p className="text-[10px] text-emerald-700 font-medium mb-1">Variant B</p>
              <p className="text-sm font-bold text-brand-primary">41%</p>
              <p className="text-[10px] text-emerald-600">ouverture</p>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="bg-amber-50 rounded-xl p-3 border border-amber-200">
          <div className="flex items-center gap-1.5 mb-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs font-semibold text-amber-800">Alertes</span>
          </div>
          <p className="text-[10px] text-amber-700">
            Taux de rebond SMS &gt; 5% cette semaine
          </p>
        </div>
      </div>
    </BrowserMockup>
  );
}

function CompareRow({
  label,
  current,
  previous,
  diff,
  isLast = false,
}: {
  label: string;
  current: string;
  previous: string;
  diff: string;
  isLast?: boolean;
}) {
  return (
    <div className={`grid grid-cols-4 gap-0 text-center items-center px-3 py-2 ${!isLast ? 'border-b border-gray-100' : ''}`}>
      <span className="text-[10px] font-medium text-gray-700 text-left">{label}</span>
      <span className="text-xs font-bold text-gray-900">{current}</span>
      <span className="text-xs text-gray-500">{previous}</span>
      <span className="inline-flex items-center justify-center gap-0.5 text-[10px] font-semibold text-green-600">
        <ArrowUpRight className="w-3 h-3" />
        {diff}
      </span>
    </div>
  );
}
