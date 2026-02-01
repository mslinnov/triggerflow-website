'use client';

import { BrowserMockup } from './PhoneMockup';
import { User, Heart, Sparkles, Clock, Send, ChevronDown, EyeOff } from 'lucide-react';

export function UpsellOfferMockup() {
  return (
    <BrowserMockup title="Ventes Additionnelles" className="max-w-lg">
      <div className="p-4 min-h-[300px]">
        {/* Client profile summary */}
        <div className="flex items-center gap-3 mb-4 p-2.5 bg-blue-50 rounded-xl border border-blue-100">
          <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
            <User className="w-4 h-4 text-blue-700" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Sophie Durand</p>
            <p className="text-[10px] text-gray-500">Couple &middot; Chambre Sup&eacute;rieure &middot; 3 nuits</p>
          </div>
        </div>

        {/* Recommended offers */}
        <h4 className="text-xs font-semibold text-gray-800 mb-2.5">Offres recommand&eacute;es</h4>
        <div className="space-y-2">
          <OfferCard
            icon={Heart}
            title="Pack Romantique"
            description="Champagne + p&eacute;tales de roses"
            price="49"
            match={95}
            target="Couples"
          />
          <OfferCard
            icon={Sparkles}
            title="Spa Duo"
            description="Massage 60min x2"
            price="129"
            match={87}
            target="Couples"
          />
          <OfferCard
            icon={Clock}
            title="Late Checkout 14h"
            description="D&eacute;part tardif garanti"
            price="25"
            match={72}
            target="Tous"
          />
        </div>

        {/* Hidden offers section */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-gray-400">
            <EyeOff className="w-3 h-3" />
            <span className="text-[10px] font-medium">Offres non pertinentes (masqu&eacute;es)</span>
            <ChevronDown className="w-3 h-3 ml-auto" />
          </div>
          <div className="mt-1.5 flex items-center justify-between p-2 bg-gray-50 rounded-lg opacity-50">
            <span className="text-[10px] text-gray-400 line-through">Kids Club - Activit&eacute;s enfants</span>
            <span className="text-[9px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded">0 enfant</span>
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}

function OfferCard({
  icon: Icon,
  title,
  description,
  price,
  match,
  target,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  price: string;
  match: number;
  target: string;
}) {
  const matchColor = match >= 90 ? 'bg-green-50 text-green-700 border-green-200' : match >= 80 ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-600 border-gray-200';

  return (
    <div className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-gray-200 hover:border-brand-primary/30 transition-colors">
      <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-brand-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-[10px] font-semibold text-gray-800">{title}</p>
          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full border ${matchColor}`}>{match}%</span>
        </div>
        <p className="text-[9px] text-gray-500">{description}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[10px] font-bold text-brand-primary">{price}&euro;</span>
          <span className="text-[8px] text-gray-400">&middot; Pour : {target}</span>
        </div>
      </div>
      <button className="flex items-center gap-1 px-2 py-1 bg-brand-primary text-white rounded-lg text-[9px] font-medium flex-shrink-0 hover:bg-brand-primary/90 transition-colors">
        <Send className="w-2.5 h-2.5" />
        Envoyer
      </button>
    </div>
  );
}
