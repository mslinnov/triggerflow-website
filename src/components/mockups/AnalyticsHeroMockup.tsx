'use client';

import { TrendingUp, Mail, MessageSquare, MessageCircle, Euro, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function AnalyticsHeroMockup() {
  return (
    <div className="h-full w-full bg-[#f8fafb] p-4">
      {/* Top KPI row */}
      <div className="mb-3 grid grid-cols-4 gap-2">
        <KpiCard
          label="Revenus générés"
          value="8 720€"
          trend="+22%"
          up
          color="emerald"
        />
        <KpiCard
          label="Taux ouverture"
          value="45,2%"
          trend="+3,1%"
          up
          color="blue"
        />
        <KpiCard
          label="Satisfaction NPS"
          value="58"
          trend="+16 pts"
          up
          color="amber"
        />
        <KpiCard
          label="Taux rebond"
          value="2,1%"
          trend="-0,8%"
          up
          color="red"
        />
      </div>

      {/* Chart + Channels row */}
      <div className="grid grid-cols-5 gap-2.5">
        {/* Area chart */}
        <div className="col-span-3 rounded-xl border border-gray-200 bg-white p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-gray-700">Revenus générés</span>
            <div className="flex gap-1.5">
              {['7j', '30j', '90j'].map((p) => (
                <button
                  key={p}
                  className={`rounded px-1.5 py-0.5 text-[8px] font-medium ${
                    p === '30j' ? 'bg-brand-primary/10 text-brand-primary' : 'text-gray-400'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          {/* Simplified area chart */}
          <div className="relative h-20">
            <svg viewBox="0 0 300 80" className="h-full w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00875a" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00875a" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,60 L30,55 L60,45 L90,50 L120,35 L150,30 L180,25 L210,20 L240,15 L270,18 L300,10"
                fill="none"
                stroke="#00875a"
                strokeWidth="2"
              />
              <path
                d="M0,60 L30,55 L60,45 L90,50 L120,35 L150,30 L180,25 L210,20 L240,15 L270,18 L300,10 L300,80 L0,80 Z"
                fill="url(#areaGrad)"
              />
            </svg>
            {/* Y-axis labels */}
            <span className="absolute left-0 top-0 text-[7px] text-gray-400">10k€</span>
            <span className="absolute bottom-0 left-0 text-[7px] text-gray-400">0€</span>
          </div>
        </div>

        {/* Channel breakdown */}
        <div className="col-span-2 rounded-xl border border-gray-200 bg-white p-3">
          <span className="mb-2 block text-[10px] font-semibold text-gray-700">Par canal</span>
          <div className="space-y-2">
            <ChannelRow icon={Mail} label="Email" value="45%" barWidth="45%" color="bg-blue-500" />
            <ChannelRow icon={MessageSquare} label="SMS" value="92%" barWidth="92%" color="bg-emerald-500" />
            <ChannelRow icon={MessageCircle} label="WhatsApp" value="78%" barWidth="78%" color="bg-green-500" />
          </div>

          {/* Total */}
          <div className="mt-2.5 flex items-center justify-between border-t border-gray-100 pt-2">
            <div className="flex items-center gap-1">
              <Users className="h-2.5 w-2.5 text-gray-400" />
              <span className="text-[9px] text-gray-500">Contacts touchés</span>
            </div>
            <span className="text-[10px] font-bold text-gray-800">4 280</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ label, value, trend, up, color }: {
  label: string;
  value: string;
  trend: string;
  up: boolean;
  color: string;
}) {
  const borderColors = {
    emerald: 'border-emerald-100',
    blue: 'border-blue-100',
    amber: 'border-amber-100',
    red: 'border-red-100',
  };
  return (
    <div className={`rounded-xl border bg-white p-2 ${borderColors[color as keyof typeof borderColors]}`}>
      <p className="text-[8px] text-gray-500">{label}</p>
      <p className="mt-0.5 text-sm font-bold text-gray-800">{value}</p>
      <div className="mt-0.5 flex items-center gap-0.5">
        {up ? (
          <ArrowUpRight className="h-2.5 w-2.5 text-green-500" />
        ) : (
          <ArrowDownRight className="h-2.5 w-2.5 text-red-500" />
        )}
        <span className="text-[9px] font-semibold text-green-600">{trend}</span>
      </div>
    </div>
  );
}

function ChannelRow({ icon: Icon, label, value, barWidth, color }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  barWidth: string;
  color: string;
}) {
  return (
    <div>
      <div className="mb-0.5 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Icon className="h-2.5 w-2.5 text-gray-500" />
          <span className="text-[9px] font-medium text-gray-700">{label}</span>
        </div>
        <span className="text-[9px] font-bold text-gray-800">{value}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: barWidth }} />
      </div>
    </div>
  );
}
