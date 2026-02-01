'use client';

import { PhoneMockup } from './PhoneMockup';
import { Star, Gift, Clock } from 'lucide-react';

export function LoyaltyPortalMockup() {
  return (
    <PhoneMockup>
      <div className="p-4">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 mx-auto mb-2 flex items-center justify-center">
            <Star className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm font-bold text-gray-800">Mon espace fidélité</p>
          <p className="text-[10px] text-amber-600 font-medium">Statut Gold</p>
        </div>

        {/* Points balance */}
        <div className="bg-gray-50 rounded-xl p-3 text-center mb-3">
          <p className="text-2xl font-bold text-gray-800">1,247</p>
          <p className="text-[10px] text-gray-500">points disponibles</p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <QuickAction icon={Gift} label="Mes récompenses" count="3" />
          <QuickAction icon={Clock} label="Historique" count="12" />
        </div>

        {/* Available rewards */}
        <p className="text-[10px] font-medium text-gray-500 mb-2">Récompenses accessibles</p>
        <div className="space-y-2">
          <MiniReward title="Petit-déjeuner offert" points="150 pts" />
          <MiniReward title="Late checkout" points="200 pts" />
          <MiniReward title="Surclassement" points="500 pts" />
        </div>
      </div>
    </PhoneMockup>
  );
}

function QuickAction({ icon: Icon, label, count }: { icon: React.ComponentType<{ className?: string }>; label: string; count: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-2.5 text-center">
      <Icon className="w-4 h-4 text-brand-primary mx-auto mb-1" />
      <p className="text-[10px] font-medium text-gray-700">{label}</p>
      <span className="text-[9px] text-gray-400">{count}</span>
    </div>
  );
}

function MiniReward({ title, points }: { title: string; points: string }) {
  return (
    <div className="flex items-center justify-between p-2.5 bg-white border border-gray-200 rounded-lg">
      <span className="text-[10px] font-medium text-gray-700">{title}</span>
      <button className="text-[9px] bg-brand-primary text-white px-2 py-1 rounded font-medium">{points}</button>
    </div>
  );
}
