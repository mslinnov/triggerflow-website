'use client';

import { BrowserMockup } from './PhoneMockup';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function EmailAnalyticsMockup() {
  return (
    <BrowserMockup title="Analytics email" className="max-w-lg">
      <div className="p-4 min-h-[320px]">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <StatCard label="Taux d'ouverture" value="47.2%" trend="+3.1%" positive />
          <StatCard label="Taux de clic" value="12.8%" trend="+1.4%" positive />
          <StatCard label="Rebonds" value="1.2%" trend="-0.3%" positive />
        </div>

        {/* Mini chart */}
        <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-700">Ouvertures (7 derniers jours)</span>
            <span className="text-[10px] text-gray-500">+12% vs semaine précédente</span>
          </div>
          <div className="flex items-end gap-1.5 h-16">
            {[35, 42, 38, 55, 48, 62, 58].map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-sm transition-all"
                  style={{
                    height: `${value}%`,
                    backgroundColor: i === 5 ? '#00875a' : i === 6 ? '#00875a' : '#00875a40',
                  }}
                />
                <span className="text-[8px] text-gray-400">
                  {['L', 'M', 'M', 'J', 'V', 'S', 'D'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top performing emails */}
        <div>
          <h4 className="text-xs font-medium text-gray-700 mb-2">Meilleurs emails</h4>
          <div className="space-y-2">
            <EmailRow
              name="Confirmation réservation"
              opens="92%"
              clicks="34%"
              rank={1}
            />
            <EmailRow
              name="Rappel pré-séjour J-3"
              opens="67%"
              clicks="28%"
              rank={2}
            />
            <EmailRow
              name="Offre spa personnalisée"
              opens="51%"
              clicks="18%"
              rank={3}
            />
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}

function StatCard({ label, value, trend, positive }: { label: string; value: string; trend: string; positive: boolean }) {
  return (
    <div className="bg-white rounded-lg p-2.5 border border-gray-200">
      <p className="text-[10px] text-gray-500 mb-1">{label}</p>
      <p className="text-lg font-bold text-gray-900">{value}</p>
      <div className="flex items-center gap-1 mt-0.5">
        {positive ? (
          <TrendingUp className="w-3 h-3 text-green-500" />
        ) : (
          <TrendingDown className="w-3 h-3 text-red-500" />
        )}
        <span className={`text-[10px] font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}

function EmailRow({ name, opens, clicks, rank }: { name: string; opens: string; clicks: string; rank: number }) {
  return (
    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
      <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
        <span className="text-[10px] font-bold text-brand-primary">{rank}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-700 truncate">{name}</p>
      </div>
      <div className="flex items-center gap-3 text-[10px] text-gray-500">
        <span>📬 {opens}</span>
        <span>👆 {clicks}</span>
      </div>
    </div>
  );
}
