'use client';

import { BrowserMockup } from './PhoneMockup';
import { Calendar, Moon, BedDouble, ArrowRight } from 'lucide-react';

export function EmailMockup() {
  return (
    <BrowserMockup title="Composer un email" className="max-w-lg">
      <div className="p-4">
        {/* Email header */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-500 w-12">À:</span>
            <span className="text-gray-700">reservation@hotel-du-lac.com</span>
          </div>
          <div className="h-px bg-gray-100" />
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-500 w-12">Objet:</span>
            <span className="text-gray-700">Votre réservation est confirmée ✓</span>
          </div>
          <div className="h-px bg-gray-100" />
        </div>

        {/* Email preview */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          {/* Hotel header */}
          <div className="text-center mb-4 pb-4 border-b border-gray-200">
            <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center mx-auto mb-2">
              <span className="text-white text-lg">🏨</span>
            </div>
            <h4 className="font-semibold text-gray-800">Hôtel & Spa du Lac</h4>
          </div>

          {/* Email content */}
          <div className="space-y-3 text-sm">
            <p className="text-gray-700">
              Bonjour <Variable>{'{{prenom}}'}</Variable>,
            </p>

            <p className="text-gray-700 font-medium">
              Votre réservation est confirmée !
            </p>

            <div className="space-y-2 py-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4 text-brand-primary" />
                <span>Arrivée : <Variable>{'{{date_arrivee}}'}</Variable></span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Moon className="w-4 h-4 text-brand-primary" />
                <span>Durée : <Variable>{'{{nombre_nuits}}'}</Variable> nuits</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <BedDouble className="w-4 h-4 text-brand-primary" />
                <span>Chambre : <Variable>{'{{type_chambre}}'}</Variable></span>
              </div>
            </div>

            <button className="w-full bg-brand-primary text-white py-2.5 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 mt-4">
              Accéder à mon espace client
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Variables footer */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Variables disponibles :</p>
          <div className="flex flex-wrap gap-1">
            {['prenom', 'nom', 'date_arrivee', 'date_depart', 'type_chambre'].map((v) => (
              <span
                key={v}
                className="text-[10px] bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded"
              >
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}

function Variable({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-brand-primary/20 text-brand-primary px-1 rounded font-mono text-xs">
      {children}
    </span>
  );
}
