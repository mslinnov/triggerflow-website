'use client';

import { BrowserMockup } from './PhoneMockup';
import { User, Calendar, BedDouble, Moon, Globe } from 'lucide-react';

export function EmailPersonalizationMockup() {
  return (
    <BrowserMockup title="Personnalisation email" className="max-w-lg">
      <div className="p-4 min-h-[320px]">
        {/* Top bar - variable selector */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
          <span className="text-xs text-gray-500">Insérer :</span>
          <div className="flex flex-wrap gap-1.5">
            <VariableChip icon={User} label="Prénom" active />
            <VariableChip icon={Calendar} label="Date arrivée" />
            <VariableChip icon={Moon} label="Nb nuits" />
            <VariableChip icon={BedDouble} label="Chambre" />
            <VariableChip icon={Globe} label="Langue" />
          </div>
        </div>

        {/* Email preview with highlighted variables */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="space-y-3 text-sm">
            <p className="text-gray-700">
              Bonjour <Variable>Sophie</Variable>,
            </p>
            <p className="text-gray-600">
              Nous sommes ravis de vous accueillir le <Variable>15 mars 2026</Variable> pour{' '}
              <Variable>3</Variable> nuits en <Variable>Suite Deluxe</Variable>.
            </p>
            <p className="text-gray-600">
              Votre chambre dispose d&apos;une vue sur le lac et d&apos;un accès spa inclus.
            </p>

            {/* Conditional content block */}
            <div className="border-l-2 border-amber-400 bg-amber-50 rounded-r-lg p-3 mt-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-medium text-amber-700 bg-amber-200 px-1.5 py-0.5 rounded">
                  SI couple
                </span>
              </div>
              <p className="text-xs text-amber-800">
                Profitez de notre offre romantique : champagne + pétales de rose à{' '}
                <span className="font-semibold">39€</span> au lieu de 65€.
              </p>
            </div>

            {/* Another conditional */}
            <div className="border-l-2 border-blue-400 bg-blue-50 rounded-r-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-medium text-blue-700 bg-blue-200 px-1.5 py-0.5 rounded">
                  SI famille
                </span>
              </div>
              <p className="text-xs text-blue-800">
                Notre Kids Club accueille vos enfants de 3 à 12 ans, gratuitement pendant votre séjour.
              </p>
            </div>
          </div>
        </div>

        {/* Variable mapping indicator */}
        <div className="mt-3 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] text-gray-500">5 variables mappées depuis votre PMS</span>
        </div>
      </div>
    </BrowserMockup>
  );
}

function VariableChip({ icon: Icon, label, active }: { icon: React.ComponentType<{ className?: string }>; label: string; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium cursor-pointer transition-colors ${
        active
          ? 'bg-brand-primary text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-brand-primary/10 hover:text-brand-primary'
      }`}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

function Variable({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-brand-primary/15 text-brand-primary px-1.5 py-0.5 rounded font-medium border border-brand-primary/20">
      {children}
    </span>
  );
}
