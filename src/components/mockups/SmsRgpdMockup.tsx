'use client';

import { BrowserMockup } from './PhoneMockup';
import { Shield, Check, Clock, UserX } from 'lucide-react';

export function SmsRgpdMockup() {
  return (
    <BrowserMockup title="Conformité RGPD" className="max-w-lg">
      <div className="p-4 min-h-[280px]">
        {/* Status badges */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
            <Shield className="w-3.5 h-3.5 text-green-600" />
            <span className="text-[10px] font-medium text-green-700">100% conforme</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full">
            <span className="text-[10px] font-medium text-blue-700">RGPD · CNIL</span>
          </div>
        </div>

        {/* Compliance checklist */}
        <div className="space-y-3">
          <ComplianceRow
            icon={Check}
            title="Consentement opt-in"
            description="Collecté automatiquement à la réservation"
            status="active"
          />
          <ComplianceRow
            icon={UserX}
            title="Désabonnement"
            description="Lien STOP inclus dans chaque SMS"
            status="active"
          />
          <ComplianceRow
            icon={Clock}
            title="Plages horaires légales"
            description="Envoi uniquement entre 8h et 20h"
            status="active"
          />
        </div>

        {/* Stats */}
        <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-3 gap-3">
          <MiniStat label="Opt-in" value="94%" />
          <MiniStat label="Désabo" value="0.3%" />
          <MiniStat label="Plaintes" value="0" />
        </div>
      </div>
    </BrowserMockup>
  );
}

function ComplianceRow({ icon: Icon, title, description, status }: { icon: React.ComponentType<{ className?: string }>; title: string; description: string; status: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${status === 'active' ? 'bg-green-100' : 'bg-gray-200'}`}>
        <Icon className={`w-4 h-4 ${status === 'active' ? 'text-green-600' : 'text-gray-500'}`} />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-800">{title}</p>
        <p className="text-[10px] text-gray-500">{description}</p>
      </div>
      <div className="ml-auto flex-shrink-0">
        <div className={`w-8 h-4 rounded-full relative ${status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}>
          <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all ${status === 'active' ? 'right-0.5' : 'left-0.5'}`} />
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-sm font-bold text-gray-800">{value}</p>
      <p className="text-[9px] text-gray-500">{label}</p>
    </div>
  );
}
