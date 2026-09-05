'use client';

import { BrowserMockup } from './PhoneMockup';
import {
  CheckCircle2,
  Star,
  MessageSquareText,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';

export function FormAnalysisMockup() {
  return (
    <BrowserMockup title="Résultats" className="max-w-lg">
      <div className="min-h-[300px] p-4 bg-gray-50">
        {/* Top stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <StatCard
            icon={CheckCircle2}
            value="75%"
            label="Taux de complétion"
            color="emerald"
          />
          <StatCard
            icon={Star}
            value="4,2/5"
            label="NPS moyen"
            color="amber"
          />
          <StatCard
            icon={MessageSquareText}
            value="892"
            label="Réponses ce mois"
            color="blue"
          />
        </div>

        {/* Bar chart - satisfaction scores */}
        <div className="bg-white rounded-lg border border-gray-200 p-3 mb-3">
          <p className="text-[10px] font-semibold text-gray-700 mb-2">Distribution des scores de satisfaction</p>
          <div className="flex items-end gap-2 h-16">
            <Bar label="1" height={12} color="bg-red-400" />
            <Bar label="2" height={20} color="bg-orange-400" />
            <Bar label="3" height={32} color="bg-amber-400" />
            <Bar label="4" height={55} color="bg-emerald-400" />
            <Bar label="5" height={80} color="bg-brand-primary" />
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              <Star className="w-2.5 h-2.5 text-gray-300" />
            </div>
            <span className="text-[9px] text-gray-500">Moyenne : 4,2 / 5</span>
          </div>
        </div>

        {/* Alert card */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-2.5 mb-3 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-red-800">
              3 réponses avec score &lt; 3/5 cette semaine
            </p>
            <p className="text-[10px] text-red-600 mt-0.5">
              Nécessite une attention immédiate
            </p>
          </div>
          <button className="text-[9px] text-red-700 font-medium flex items-center gap-0.5 flex-shrink-0 hover:underline">
            Voir détails <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Recent responses */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-[10px] font-semibold text-gray-700">Réponses récentes</p>
          </div>
          <ResponseRow name="Marie Laurent" score={5} date="Aujourd'hui, 14:32" />
          <ResponseRow name="Thomas Blanc" score={2} date="Aujourd'hui, 11:15" alert />
          <ResponseRow name="Sophie Martin" score={4} date="Hier, 18:47" last />
        </div>
      </div>
    </BrowserMockup>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  color: 'emerald' | 'amber' | 'blue';
}) {
  const bgMap = {
    emerald: 'bg-emerald-50 border-emerald-200',
    amber: 'bg-amber-50 border-amber-200',
    blue: 'bg-blue-50 border-blue-200',
  };
  const iconMap = {
    emerald: 'text-emerald-600',
    amber: 'text-amber-600',
    blue: 'text-blue-600',
  };

  return (
    <div className={`rounded-lg border p-2 ${bgMap[color]}`}>
      <Icon className={`w-3.5 h-3.5 ${iconMap[color]} mb-1`} />
      <p className="text-sm font-bold text-gray-900">{value}</p>
      <p className="text-[9px] text-gray-500 leading-tight">{label}</p>
    </div>
  );
}

function Bar({ label, height, color }: { label: string; height: number; color: string }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-0.5">
      <div
        className={`w-full ${color} rounded-t-sm min-w-[16px]`}
        style={{ height: `${height}%` }}
      />
      <span className="text-[8px] text-gray-500">{label}</span>
    </div>
  );
}

function ResponseRow({
  name,
  score,
  date,
  alert,
  last,
}: {
  name: string;
  score: number;
  date: string;
  alert?: boolean;
  last?: boolean;
}) {
  const scoreBg =
    score >= 4
      ? 'bg-emerald-100 text-emerald-800'
      : score >= 3
        ? 'bg-amber-100 text-amber-800'
        : 'bg-red-100 text-red-800';

  return (
    <div className={`px-3 py-2 flex items-center gap-2 ${!last ? 'border-b border-gray-50' : ''}`}>
      <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
        <span className="text-[8px] font-medium text-gray-600">
          {name.split(' ').map((n) => n[0]).join('')}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-medium text-gray-800">{name}</p>
        <p className="text-[9px] text-gray-400">{date}</p>
      </div>
      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${scoreBg}`}>
        {score}/5
      </span>
      {alert && (
        <AlertTriangle className="w-3 h-3 text-red-500" />
      )}
    </div>
  );
}
