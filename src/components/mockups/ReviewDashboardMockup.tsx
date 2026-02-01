'use client';

import { BrowserMockup } from './PhoneMockup';
import { Star, TrendingUp, BarChart3 } from 'lucide-react';

export function ReviewDashboardMockup() {
  return (
    <BrowserMockup title="Reputation dashboard" className="max-w-lg">
      <div className="p-4 min-h-[300px]">
        {/* Global score */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Note moyenne globale</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">4.6</span>
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
          <div className="text-right bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-200">
            <p className="text-[10px] text-gray-500">Concurrent principal</p>
            <p className="text-sm font-semibold text-gray-600">4.3/5</p>
          </div>
        </div>

        {/* Platform cards */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          <PlatformCard
            name="Google"
            score="4.6"
            suffix="/5"
            reviews={247}
            trend="+0.3"
            color="#4285F4"
            bgColor="bg-blue-50"
            borderColor="border-blue-200"
            icon={
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            }
          />
          <PlatformCard
            name="TripAdvisor"
            score="4.5"
            suffix="/5"
            reviews={183}
            trend="+0.2"
            color="#00AF87"
            bgColor="bg-emerald-50"
            borderColor="border-emerald-200"
            icon={
              <div className="w-4 h-4 rounded-full bg-[#00AF87] flex items-center justify-center flex-shrink-0">
                <span className="text-[8px] font-bold text-white">TA</span>
              </div>
            }
          />
          <PlatformCard
            name="Booking"
            score="9.1"
            suffix="/10"
            reviews={156}
            trend="+0.4"
            color="#003580"
            bgColor="bg-indigo-50"
            borderColor="border-indigo-200"
            icon={
              <div className="w-4 h-4 rounded-sm bg-[#003580] flex items-center justify-center flex-shrink-0">
                <span className="text-[8px] font-bold text-white">B</span>
              </div>
            }
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
          <div className="flex items-end gap-2 h-14">
            {[
              { value: 45, label: 'Aou' },
              { value: 52, label: 'Sep' },
              { value: 68, label: 'Oct' },
              { value: 58, label: 'Nov' },
              { value: 72, label: 'Dec' },
              { value: 80, label: 'Jan' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[8px] text-gray-500 font-medium">{bar.value}</span>
                <div
                  className="w-full rounded-t-sm transition-all"
                  style={{
                    height: `${(bar.value / 80) * 100}%`,
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
  icon,
}: {
  name: string;
  score: string;
  suffix: string;
  reviews: number;
  trend: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
}) {
  return (
    <div className={`${bgColor} ${borderColor} border rounded-xl p-2.5`}>
      <div className="flex items-center gap-1.5 mb-1.5">
        {icon}
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
