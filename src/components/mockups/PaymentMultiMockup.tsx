'use client';

import { RefreshCw, Check, Clock } from 'lucide-react';

export function PaymentMultiMockup() {
  return (
    <div className="h-full w-full p-5 bg-white">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-primary/10 flex items-center justify-center">
            <RefreshCw className="w-4 h-4 text-brand-primary" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800">Prestataires de paiement</h4>
            <p className="text-[10px] text-gray-500">Changez sans migration ni interruption</p>
          </div>
        </div>
      </div>

      {/* Provider cards */}
      <div className="space-y-3 mb-5">
        <ProviderCard
          name="Stripe"
          logo="stripe"
          color="#635BFF"
          status="active"
          transactions="87 transactions"
          volume="12 840 €"
        />
        <ProviderCard
          name="Mollie"
          logo="mollie"
          color="#000"
          status="soon"
          transactions=""
          volume=""
        />
        <ProviderCard
          name="Payline"
          logo="payline"
          color="#0066CC"
          status="soon"
          transactions=""
          volume=""
        />
      </div>

      {/* Architecture info */}
      <div className="bg-brand-primary/5 border border-brand-primary/15 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <RefreshCw className="w-4 h-4 text-brand-primary" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-gray-800 mb-1">Architecture extensible</p>
            <p className="text-[9px] text-gray-600 leading-relaxed">
              Commencez avec Stripe. Ajoutez Mollie ou Payline quand vous voulez. Vos liens de paiement existants continuent de fonctionner — aucune migration nécessaire.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProviderCard({ name, color, status, transactions, volume }: {
  name: string; logo: string; color: string; status: 'active' | 'soon';
  transactions: string; volume: string;
}) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border ${
      status === 'active' ? 'border-brand-primary/20 bg-brand-primary/[0.02]' : 'border-gray-200 bg-gray-50/50'
    }`}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + '15' }}>
        <span className="text-xs font-bold" style={{ color }}>{name.charAt(0)}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-gray-800">{name}</p>
          {status === 'active' ? (
            <span className="flex items-center gap-0.5 text-[8px] font-medium bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
              <Check className="w-2.5 h-2.5" /> Connecté
            </span>
          ) : (
            <span className="flex items-center gap-0.5 text-[8px] font-medium bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
              <Clock className="w-2.5 h-2.5" /> Bientôt
            </span>
          )}
        </div>
        {status === 'active' && (
          <p className="text-[9px] text-gray-500 mt-0.5">{transactions} · {volume} ce mois</p>
        )}
      </div>
      {status === 'active' && (
        <button className="text-[8px] font-medium text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-lg">
          Configurer
        </button>
      )}
    </div>
  );
}
