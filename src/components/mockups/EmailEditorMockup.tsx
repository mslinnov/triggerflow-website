'use client';

import { BrowserMockup } from './PhoneMockup';
import { Type, Image, Columns, MousePointer2 } from 'lucide-react';

export function EmailEditorMockup() {
  return (
    <BrowserMockup title="Éditeur d'email" className="max-w-lg">
      <div className="flex min-h-[320px]">
        {/* Sidebar - block palette */}
        <div className="w-14 bg-gray-50 border-r border-gray-200 p-2 flex flex-col gap-2">
          <SidebarBlock icon={Type} label="Texte" active />
          <SidebarBlock icon={Image} label="Image" />
          <SidebarBlock icon={Columns} label="Cols" />
          <SidebarBlock icon={MousePointer2} label="CTA" />
        </div>

        {/* Email canvas */}
        <div className="flex-1 p-4 bg-gray-100">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Logo block */}
            <div className="p-4 border-b border-dashed border-blue-300 bg-blue-50/30 relative group">
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🏨</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">Hôtel & Spa du Lac</span>
              </div>
              <DragHandle />
            </div>

            {/* Hero image block */}
            <div className="border-b border-dashed border-transparent hover:border-blue-300 relative group">
              <div className="h-24 bg-gradient-to-r from-emerald-100 to-teal-50 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Image 600×200</p>
                  <p className="text-[10px] text-gray-400">Glissez une image ici</p>
                </div>
              </div>
              <DragHandle />
            </div>

            {/* Text block - selected */}
            <div className="p-4 border-2 border-blue-500 bg-blue-50/20 relative">
              <div className="absolute -top-3 left-3 bg-blue-500 text-white text-[9px] px-2 py-0.5 rounded font-medium">
                Texte
              </div>
              <p className="text-sm text-gray-700">
                Bonjour <span className="bg-brand-primary/20 text-brand-primary px-1 rounded text-xs font-mono">{'{{prenom}}'}</span>,
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Nous avons le plaisir de confirmer votre réservation...
              </p>
              <DragHandle />
            </div>

            {/* CTA block */}
            <div className="p-4 border-b border-dashed border-transparent hover:border-blue-300 relative group">
              <button className="w-full bg-brand-primary text-white py-2 px-4 rounded-lg text-xs font-medium">
                Accéder à mon espace client →
              </button>
              <DragHandle />
            </div>

            {/* Footer block */}
            <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
              <p className="text-[10px] text-gray-400">Se désinscrire • Politique de confidentialité</p>
            </div>
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}

function SidebarBlock({ icon: Icon, label, active }: { icon: React.ComponentType<{ className?: string }>; label: string; active?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg cursor-grab text-center ${
        active ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-[8px] leading-tight">{label}</span>
    </div>
  );
}

function DragHandle() {
  return (
    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="w-5 h-5 bg-white border border-gray-200 rounded shadow-sm flex items-center justify-center cursor-grab">
        <div className="grid grid-cols-2 gap-px">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-gray-400 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
