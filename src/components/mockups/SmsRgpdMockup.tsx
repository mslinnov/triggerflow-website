'use client';

import { Shield, Check, Clock, UserX, Lock, BarChart3 } from 'lucide-react';

export function SmsRgpdMockup() {
  return (
    <div className="h-full w-full p-5 bg-gray-50">
      {/* Header with status */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800">Conformité RGPD</h4>
            <p className="text-[10px] text-gray-500">Gestion automatique du consentement</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 px-2.5 py-1 bg-green-50 border border-green-200 rounded-full">
            <Check className="w-3 h-3 text-green-600" />
            <span className="text-[9px] font-semibold text-green-700">100% conforme</span>
          </span>
          <span className="px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-full text-[9px] font-semibold text-blue-700">
            CNIL
          </span>
        </div>
      </div>

      {/* Compliance cards - 2 column layout */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {/* Opt-in */}
        <div className="bg-white rounded-xl border border-gray-200 p-3.5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-green-600" />
              </div>
              <p className="text-[10px] font-semibold text-gray-800">Consentement opt-in</p>
            </div>
            <ToggleSwitch active />
          </div>
          <p className="text-[9px] text-gray-500 leading-relaxed">Collecté automatiquement à la réservation via votre PMS</p>
          <div className="mt-2.5 flex items-center gap-1.5">
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '94%' }} />
            </div>
            <span className="text-[9px] font-bold text-green-600">94%</span>
          </div>
        </div>

        {/* Désabonnement */}
        <div className="bg-white rounded-xl border border-gray-200 p-3.5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center">
                <UserX className="w-3.5 h-3.5 text-orange-600" />
              </div>
              <p className="text-[10px] font-semibold text-gray-800">Désabonnement STOP</p>
            </div>
            <ToggleSwitch active />
          </div>
          <p className="text-[9px] text-gray-500 leading-relaxed">Lien STOP inclus automatiquement dans chaque SMS envoyé</p>
          <div className="mt-2.5 flex items-center gap-1.5">
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-400 rounded-full" style={{ width: '0,3%', minWidth: '3px' }} />
            </div>
            <span className="text-[9px] font-bold text-orange-600">0,3%</span>
          </div>
        </div>

        {/* Plages horaires */}
        <div className="bg-white rounded-xl border border-gray-200 p-3.5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <p className="text-[10px] font-semibold text-gray-800">Plages horaires légales</p>
            </div>
            <ToggleSwitch active />
          </div>
          <p className="text-[9px] text-gray-500 leading-relaxed">Envoi uniquement entre 8h et 20h, fuseau client respecté</p>
          <div className="mt-2.5 flex items-center gap-2">
            <span className="text-[9px] font-mono text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">08:00</span>
            <div className="flex-1 h-1.5 bg-blue-100 rounded-full">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }} />
            </div>
            <span className="text-[9px] font-mono text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">20:00</span>
          </div>
        </div>

        {/* Données chiffrées */}
        <div className="bg-white rounded-xl border border-gray-200 p-3.5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center">
                <Lock className="w-3.5 h-3.5 text-purple-600" />
              </div>
              <p className="text-[10px] font-semibold text-gray-800">Données protégées</p>
            </div>
            <ToggleSwitch active />
          </div>
          <p className="text-[9px] text-gray-500 leading-relaxed">Chiffrement bout en bout, hébergement UE, logs d&apos;audit</p>
          <div className="mt-2.5 flex items-center gap-1">
            <span className="text-[8px] font-medium bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded-full">AES-256</span>
            <span className="text-[8px] font-medium bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded-full">UE</span>
            <span className="text-[8px] font-medium bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded-full">Audit</span>
          </div>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-gray-400" />
          <span className="text-[10px] font-medium text-gray-600">Statistiques conformité</span>
        </div>
        <div className="flex items-center gap-5">
          <div className="text-center">
            <p className="text-sm font-bold text-green-600">94%</p>
            <p className="text-[8px] text-gray-500">Taux opt-in</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="text-center">
            <p className="text-sm font-bold text-gray-800">0,3%</p>
            <p className="text-[8px] text-gray-500">Désabonnements</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="text-center">
            <p className="text-sm font-bold text-brand-primary">0</p>
            <p className="text-[8px] text-gray-500">Plaintes CNIL</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="text-center">
            <p className="text-sm font-bold text-gray-800">100%</p>
            <p className="text-[8px] text-gray-500">Heures légales</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleSwitch({ active }: { active?: boolean }) {
  return (
    <div className={`w-9 h-5 rounded-full relative flex-shrink-0 ${active ? 'bg-green-500' : 'bg-gray-300'}`}>
      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${active ? 'right-0.5' : 'left-0.5'}`} />
    </div>
  );
}
