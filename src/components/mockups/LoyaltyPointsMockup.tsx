'use client';

import { BrowserMockup } from './PhoneMockup';
import { Star, TrendingUp } from 'lucide-react';

interface LoyaltyPointsMockupProps {
  memberName?: string;
  hotelName?: string;
}

export function LoyaltyPointsMockup({
  memberName = 'Sophie Durand',
  hotelName,
}: LoyaltyPointsMockupProps = {}) {
  return (
    <BrowserMockup title="Programme fidélité" className="max-w-lg">
      <div className="p-4 min-h-[300px]">
        {/* Client card */}
        <div className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl p-4 text-white mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-200" />
                <span className="text-xs font-bold text-yellow-100">GOLD</span>
              </div>
              <span className="text-[10px] text-yellow-200">Depuis mars 2025</span>
            </div>
            {hotelName && (
              <p className="text-[10px] font-semibold uppercase tracking-wide text-yellow-100">{hotelName}</p>
            )}
            <p className="text-lg font-bold">{memberName}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-2xl font-bold">1 247</span>
              <span className="text-xs text-yellow-200">points</span>
            </div>
          </div>
        </div>

        {/* Points history */}
        <h4 className="text-xs font-semibold text-gray-800 mb-2">Dernières transactions</h4>
        <div className="space-y-2">
          <PointRow label="Séjour 3 nuits Suite" points="+450" date="15 jan" />
          <PointRow label="Restaurant Le Jardin" points="+87" date="16 jan" />
          <PointRow label="Spa Duo réservé" points="+120" date="16 jan" />
          <PointRow label="Récompense : Late checkout" points="-200" date="17 jan" />
        </div>

        {/* Progress to next tier */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-gray-500">Prochain palier : Platinum</span>
            <span className="text-[10px] font-medium text-amber-600">753 pts restants</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full">
            <div className="h-full bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full" style={{ width: '62%' }} />
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}

function PointRow({ label, points, date }: { label: string; points: string; date: string }) {
  const isPositive = points.startsWith('+');
  return (
    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
      <TrendingUp className={`w-3.5 h-3.5 ${isPositive ? 'text-green-500' : 'text-red-400'} ${!isPositive && 'rotate-180'}`} />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-medium text-gray-700 truncate">{label}</p>
      </div>
      <span className={`text-xs font-bold ${isPositive ? 'text-green-600' : 'text-red-500'}`}>{points}</span>
      <span className="text-[9px] text-gray-400">{date}</span>
    </div>
  );
}
