'use client';

import { BrowserMockup } from './PhoneMockup';
import {
  CheckCircle2,
  RefreshCw,
  Database,
  AlertCircle,
  Zap,
  UserPlus,
  LogIn,
  Receipt,
  Clock,
  ArrowRightLeft,
} from 'lucide-react';

export function CrmPmsSyncMockup() {
  return (
    <BrowserMockup title="Synchronisation PMS" className="max-w-lg">
      <div className="p-4 min-h-[300px]">
        {/* Connected PMS card */}
        <div className="bg-gradient-to-r from-brand-primary to-emerald-500 rounded-xl p-4 text-white mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-bold">Opera PMS</p>
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              </div>
              <p className="text-[10px] text-emerald-100 flex items-center gap-1">
                <RefreshCw className="w-2.5 h-2.5" />
                Derniere synchro il y a 2 min
              </p>
            </div>
          </div>
        </div>

        {/* Sync stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <Database className="w-3.5 h-3.5 text-brand-primary mx-auto mb-1" />
            <p className="text-xs font-bold text-gray-800">2 847</p>
            <p className="text-[10px] text-gray-500">Fiches synchro.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <AlertCircle className="w-3.5 h-3.5 text-green-500 mx-auto mb-1" />
            <p className="text-xs font-bold text-green-600">0</p>
            <p className="text-[10px] text-gray-500">Erreur</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <Zap className="w-3.5 h-3.5 text-amber-500 mx-auto mb-1" />
            <p className="text-xs font-bold text-gray-800">Temps reel</p>
            <p className="text-[10px] text-gray-500">Mode actif</p>
          </div>
        </div>

        {/* Recent sync activity */}
        <div className="bg-gray-50 rounded-xl p-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-700">Activite recente</span>
            <span className="text-[10px] text-brand-primary cursor-pointer font-medium">Voir tout</span>
          </div>
          <div className="space-y-2.5">
            <SyncEntry
              icon={UserPlus}
              iconColor="text-blue-500"
              iconBg="bg-blue-100"
              title="Nouvelle reservation #4521"
              description="M. Bernard - Suite Prestige"
              time="Il y a 2 min"
              statusColor="bg-green-500"
            />
            <SyncEntry
              icon={LogIn}
              iconColor="text-green-600"
              iconBg="bg-green-100"
              title="Check-in #4518"
              description="Mme Petit - Chambre 204"
              time="Il y a 18 min"
              statusColor="bg-green-500"
            />
            <SyncEntry
              icon={Receipt}
              iconColor="text-purple-500"
              iconBg="bg-purple-100"
              title="Mise a jour facturation #4515"
              description="M. Martin - Ajout minibar"
              time="Il y a 45 min"
              statusColor="bg-blue-500"
            />
            <SyncEntry
              icon={ArrowRightLeft}
              iconColor="text-amber-500"
              iconBg="bg-amber-100"
              title="Changement chambre #4512"
              description="Mme Leroy - 301 vers 405"
              time="Il y a 1h"
              statusColor="bg-blue-500"
            />
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}

function SyncEntry({
  icon: Icon,
  iconColor,
  iconBg,
  title,
  description,
  time,
  statusColor,
}: {
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  time: string;
  statusColor: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className={`w-7 h-7 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${statusColor} flex-shrink-0`} />
          <p className="text-[10px] font-medium text-gray-700 truncate">{title}</p>
        </div>
        <p className="text-[9px] text-gray-400 truncate ml-3">{description}</p>
      </div>
      <span className="text-[9px] text-gray-400 flex-shrink-0 flex items-center gap-0.5">
        <Clock className="w-2.5 h-2.5" />
        {time}
      </span>
    </div>
  );
}
