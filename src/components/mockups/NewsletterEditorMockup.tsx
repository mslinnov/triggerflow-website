'use client';

import { BrowserMockup } from './PhoneMockup';
import { Image, Type, Gift, MapPin } from 'lucide-react';

export function NewsletterEditorMockup() {
  return (
    <BrowserMockup title="Éditeur newsletter" className="max-w-lg">
      <div className="flex min-h-[320px]">
        {/* Sidebar blocks */}
        <div className="w-14 bg-gray-50 border-r border-gray-200 p-2 flex flex-col gap-2">
          <SideBlock icon={Type} label="Texte" />
          <SideBlock icon={Image} label="Image" active />
          <SideBlock icon={Gift} label="Offre" />
          <SideBlock icon={MapPin} label="Lieu" />
        </div>

        {/* Newsletter preview */}
        <div className="flex-1 p-3 bg-gray-100">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden text-center">
            {/* Header image */}
            <div className="h-20 bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center">
              <p className="text-white text-sm font-semibold">🌿 Hôtel & Spa du Lac</p>
            </div>

            <div className="p-3 space-y-3">
              <div>
                <h3 className="text-xs font-bold text-gray-800">Les nouvelles de décembre</h3>
                <p className="text-[9px] text-gray-500 mt-0.5">Découvrez nos offres de fin d&apos;année</p>
              </div>

              {/* Article block */}
              <div className="border-2 border-blue-400 rounded-lg p-2 bg-blue-50/30 relative">
                <div className="absolute -top-2 left-2 bg-blue-500 text-white text-[7px] px-1.5 py-0.5 rounded">Image</div>
                <div className="h-14 bg-gradient-to-r from-amber-100 to-orange-100 rounded flex items-center justify-center">
                  <span className="text-[9px] text-orange-500">🎄 Photo ambiance Noël</span>
                </div>
              </div>

              {/* Offer block */}
              <div className="bg-brand-primary/5 rounded-lg p-2.5 border border-brand-primary/10">
                <p className="text-[10px] font-semibold text-brand-primary">Offre Saint-Sylvestre</p>
                <p className="text-[9px] text-gray-600">Séjour 2 nuits + dîner gala à partir de 299€</p>
                <button className="mt-1.5 bg-brand-primary text-white text-[9px] px-3 py-1 rounded font-medium">
                  Réserver →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}

function SideBlock({ icon: Icon, label, active }: { icon: React.ComponentType<{ className?: string }>; label: string; active?: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg cursor-grab text-center ${active ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}>
      <Icon className="w-4 h-4" />
      <span className="text-[8px] leading-tight">{label}</span>
    </div>
  );
}
