'use client';

import { BrowserMockup } from './PhoneMockup';
import { Star, TrendingUp, BarChart3 } from 'lucide-react';

export function ReviewDashboardMockup() {
  return (
    <BrowserMockup title="Reputation dashboard">
      <div className="p-4 min-h-[300px]">
        {/* Global score */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Note moyenne globale</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">4,6</span>
              <span className="text-sm text-gray-500">/5</span>
              <div className="flex items-center gap-0.5 ml-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400 fill-yellow-400/40'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Platform cards */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          <PlatformCard
            name="Google"
            score="4,6"
            suffix="/5"
            reviews={247}
            trend="+0,3"
            color="#4285F4"
            bgColor="bg-blue-50"
            borderColor="border-blue-200"
          />
          <PlatformCard
            name="TripAdvisor"
            score="4,5"
            suffix="/5"
            reviews={183}
            trend="+0,2"
            color="#00AF87"
            bgColor="bg-emerald-50"
            borderColor="border-emerald-200"
          />
          <PlatformCard
            name="Booking"
            score="9,1"
            suffix="/10"
            reviews={156}
            trend="+0,4"
            color="#003580"
            bgColor="bg-indigo-50"
            borderColor="border-indigo-200"
          />
        </div>

        {/* Monthly chart */}
        <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs font-medium text-gray-700">Avis par mois</span>
            </div>
            <span className="text-[10px] text-gray-500">6 derniers mois</span>
          </div>
          <div className="flex items-end gap-2">
            {[
              { value: 45, label: 'Août' },
              { value: 52, label: 'Sep' },
              { value: 68, label: 'Oct' },
              { value: 58, label: 'Nov' },
              { value: 72, label: 'Déc' },
              { value: 80, label: 'Jan' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[8px] text-gray-500 font-medium">{bar.value}</span>
                <div
                  className="w-full rounded-t-sm"
                  style={{
                    // Hauteur en px : un % ne se résout pas (parent en hauteur auto)
                    height: `${Math.round((bar.value / 80) * 48)}px`,
                    backgroundColor: i === 5 ? '#00875a' : '#00875a40',
                  }}
                />
                <span className="text-[8px] text-gray-400">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}

function PlatformCard({
  name,
  score,
  suffix,
  reviews,
  trend,
  color,
  bgColor,
  borderColor,
}: {
  name: string;
  score: string;
  suffix: string;
  reviews: number;
  trend: string;
  color: string;
  bgColor: string;
  borderColor: string;
}) {
  return (
    <div className={`${bgColor} ${borderColor} border rounded-xl p-2.5`}>
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="text-[10px] font-semibold text-gray-700">{name}</span>
      </div>
      <div className="flex items-baseline gap-0.5">
        <span className="text-lg font-bold" style={{ color }}>{score}</span>
        <span className="text-[10px] text-gray-500">{suffix}</span>
      </div>
      <p className="text-[10px] text-gray-500">{reviews} avis</p>
      <div className="flex items-center gap-1 mt-1">
        <TrendingUp className="w-3 h-3 text-green-500" />
        <span className="text-[10px] font-medium text-green-600">{trend}</span>
      </div>
    </div>
  );
}
