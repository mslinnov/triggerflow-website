'use client';

import { Activity, ArrowDownRight, ArrowUpRight, Search, RefreshCw } from 'lucide-react';

export function PaymentSuiviMockup() {
  return (
    <div className="h-full w-full p-5 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center">
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800">Suivi des transactions</h4>
            <p className="text-[10px] text-gray-500">Temps réel · Audit trail complet</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-gray-100 rounded-lg px-2.5 py-1.5">
            <Search className="w-3 h-3 text-gray-400" />
            <span className="text-[9px] text-gray-400">Rechercher...</span>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <MiniStat label="Total encaissé" value="12 840 €" color="text-brand-primary" />
        <MiniStat label="Transactions" value="87" color="text-blue-600" />
        <MiniStat label="Remboursés" value="340 €" color="text-amber-600" />
        <MiniStat label="En attente" value="2" color="text-gray-600" />
      </div>

      {/* Transaction log */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
        <LogRow
          type="payment"
          desc="Paiement reçu"
          detail="Acompte séjour — Sophie Durand"
          amount="+250,00 €"
          time="14:32"
          positive
        />
        <LogRow
          type="payment"
          desc="Paiement reçu"
          detail="Late checkout — Marc Lefèvre"
          amount="+45,00 €"
          time="13:15"
          positive
        />
        <LogRow
          type="refund"
          desc="Remboursement partiel"
          detail="Spa annulé — Julie Roux"
          amount="-89,00 €"
          time="11:48"
        />
        <LogRow
          type="payment"
          desc="Caution capturée"
          detail="Minibar — Pierre Martin"
          amount="+32,00 €"
          time="10:20"
          positive
        />
        <LogRow
          type="refund"
          desc="Caution libérée"
          detail="Check-out OK — Elena García"
          amount="0,00 €"
          time="09:05"
        />
      </div>
    </div>
  );
}

function MiniStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-2.5 text-center">
      <p className={`text-sm font-bold ${color}`}>{value}</p>
      <p className="text-[8px] text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}

function LogRow({ type, desc, detail, amount, time, positive }: {
  type: 'payment' | 'refund'; desc: string; detail: string; amount: string; time: string; positive?: boolean;
}) {
  return (
    <div className="px-4 py-2.5 flex items-center gap-3 border-b border-gray-100 last:border-0 bg-white">
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
        positive ? 'bg-green-100' : 'bg-gray-100'
      }`}>
        {positive ? (
          <ArrowDownRight className="w-3.5 h-3.5 text-green-600" />
        ) : (
          <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold text-gray-800">{desc}</p>
        <p className="text-[8px] text-gray-500 truncate">{detail}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className={`text-[10px] font-bold ${positive ? 'text-green-600' : 'text-gray-600'}`}>{amount}</p>
        <p className="text-[8px] text-gray-400">{time}</p>
      </div>
    </div>
  );
}
