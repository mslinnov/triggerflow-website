'use client';

import { BrowserMockup } from './PhoneMockup';
import { Mail, Eye, Euro, Star, TrendingUp } from 'lucide-react';

export function AnalyticsDashboardMockup() {
  return (
    <BrowserMockup title="Analytics — Dashboard">
      <div className="p-4 min-h-[300px]">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <KpiCard
            icon={<Mail className="w-3.5 h-3.5 text-blue-500" />}
            iconBg="bg-blue-50"
            label="Emails envoyés"
            value="12,450"
            trend="+12%"
          />
          <KpiCard
            icon={<Eye className="w-3.5 h-3.5 text-purple-500" />}
            iconBg="bg-purple-50"
            label="Taux d'ouverture"
            value="45.2%"
            trend="+3.1%"
          />
          <KpiCard
            icon={<Euro className="w-3.5 h-3.5 text-emerald-500" />}
            iconBg="bg-emerald-50"
            label="Revenus générés"
            value="8,720€"
            trend="+22%"
          />
          <KpiCard
            icon={<Star className="w-3.5 h-3.5 text-amber-500" />}
            iconBg="bg-amber-50"
            label="NPS"
            value="58"
            trend="+16"
          />
        </div>

        {/* Bar Chart */}
        <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-700">Ouvertures emails</span>
            <span className="text-[10px] text-gray-500">Cette semaine</span>
          </div>
          <div className="flex items-end gap-2 h-16">
            {[
              { day: 'Lun', value: 45 },
              { day: 'Mar', value: 62 },
              { day: 'Mer', value: 55 },
              { day: 'Jeu', value: 78 },
              { day: 'Ven', value: 70 },
              { day: 'Sam', value: 40 },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                <div
                  className="w-full rounded-t-sm min-h-[2px]"
                  style={{
                    height: `${bar.value}%`,
                    backgroundColor: bar.value === 78 ? '#00875a' : '#00875a40',
                  }}
                />
                <span className="text-[8px] text-gray-400 mt-1 shrink-0">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Performance */}
        <div>
          <h4 className="text-xs font-medium text-gray-700 mb-2">Performance par canal</h4>
          <div className="grid grid-cols-3 gap-2">
            <ChannelCard channel="Email" metric="45% ouverture" color="bg-blue-500" width="45%" />
            <ChannelCard channel="SMS" metric="92% délivré" color="bg-emerald-500" width="92%" />
            <ChannelCard channel="WhatsApp" metric="78% lu" color="bg-green-500" width="78%" />
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}

function KpiCard({
  icon,
  iconBg,
  label,
  value,
  trend,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="bg-white rounded-lg p-2 border border-gray-200">
      <div className={`w-6 h-6 rounded-md ${iconBg} flex items-center justify-center mb-1.5`}>
        {icon}
      </div>
      <p className="text-[10px] text-gray-500 leading-tight">{label}</p>
      <p className="text-sm font-bold text-gray-900 mt-0.5">{value}</p>
      <div className="flex items-center gap-0.5 mt-0.5">
        <TrendingUp className="w-2.5 h-2.5 text-green-500" />
        <span className="text-[10px] font-medium text-green-600">{trend}</span>
      </div>
    </div>
  );
}

function ChannelCard({
  channel,
  metric,
  color,
  width,
}: {
  channel: string;
  metric: string;
  color: string;
  width: string;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
      <p className="text-[10px] font-medium text-gray-700 mb-1">{channel}</p>
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1">
        <div className={`h-full ${color} rounded-full`} style={{ width }} />
      </div>
      <p className="text-[10px] text-gray-500">{metric}</p>
    </div>
  );
}
