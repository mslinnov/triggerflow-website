'use client';

import { BrowserMockup } from './PhoneMockup';
import { Gift, BedDouble, Coffee, Sparkles } from 'lucide-react';

export function LoyaltyRewardsMockup() {
  return (
    <BrowserMockup title="Récompenses" className="max-w-lg">
      <div className="p-4 min-h-[300px]">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-semibold text-gray-800">Catalogue de récompenses</h4>
          <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">1,247 pts disponibles</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <RewardCard icon={Coffee} title="Petit-déjeuner offert" points="150" available />
          <RewardCard icon={BedDouble} title="Late checkout 14h" points="200" available />
          <RewardCard icon={Sparkles} title="Surclassement" points="500" available />
          <RewardCard icon={Gift} title="Nuit gratuite" points="2000" locked />
        </div>

        {/* Tiers config */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-[10px] font-medium text-gray-500 mb-2">Configuration des paliers</p>
          <div className="flex gap-2">
            <TierBadge name="Bronze" min="0" color="bg-orange-100 text-orange-700" />
            <TierBadge name="Silver" min="500" color="bg-gray-200 text-gray-700" />
            <TierBadge name="Gold" min="1000" color="bg-amber-100 text-amber-700" active />
            <TierBadge name="Platinum" min="2000" color="bg-purple-100 text-purple-700" />
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}

function RewardCard({ icon: Icon, title, points, available, locked }: { icon: React.ComponentType<{ className?: string }>; title: string; points: string; available?: boolean; locked?: boolean }) {
  return (
    <div className={`p-3 rounded-xl border ${locked ? 'bg-gray-50 border-gray-200 opacity-60' : 'bg-white border-gray-200 hover:border-brand-primary/30'} transition-colors`}>
      <Icon className={`w-5 h-5 mb-2 ${locked ? 'text-gray-400' : 'text-brand-primary'}`} />
      <p className="text-[10px] font-medium text-gray-800 mb-1">{title}</p>
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold text-brand-primary">{points} pts</span>
        {available && <span className="text-[8px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded">Disponible</span>}
        {locked && <span className="text-[8px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">🔒</span>}
      </div>
    </div>
  );
}

function TierBadge({ name, min, color, active }: { name: string; min: string; color: string; active?: boolean }) {
  return (
    <div className={`flex-1 text-center p-1.5 rounded-lg ${color} ${active ? 'ring-2 ring-brand-primary ring-offset-1' : ''}`}>
      <p className="text-[9px] font-bold">{name}</p>
      <p className="text-[7px] opacity-70">{min}+ pts</p>
    </div>
  );
}
