'use client';

import { ArrowDownLeft, ArrowUpRight, CheckCircle2, Clock, RotateCcw, Search, Filter } from 'lucide-react';

export function PaymentTrackingMockup() {
  return (
    <div className="h-full w-full bg-white p-4">
      {/* Quick stats */}
      <div className="mb-3 grid grid-cols-4 gap-1.5">
        <QuickStat label="Payés" value="34" color="green" />
        <QuickStat label="En attente" value="3" color="amber" />
        <QuickStat label="Remboursés" value="2" color="blue" />
        <QuickStat label="Échoués" value="1" color="red" />
      </div>

      {/* Search & filter */}
      <div className="mb-3 flex gap-2">
        <div className="flex flex-1 items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5">
          <Search className="h-3 w-3 text-gray-400" />
          <span className="text-[9px] text-gray-400">Rechercher un paiement...</span>
        </div>
        <button className="flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1.5 text-[9px] text-gray-500">
          <Filter className="h-2.5 w-2.5" />
          Filtrer
        </button>
      </div>

      {/* Transaction list */}
      <div className="rounded-xl border border-gray-200">
        {/* Header */}
        <div className="grid grid-cols-[1fr_80px_70px_70px] gap-2 border-b border-gray-100 px-3 py-1.5">
          <span className="text-[8px] font-medium uppercase text-gray-400">Client</span>
          <span className="text-[8px] font-medium uppercase text-gray-400">Type</span>
          <span className="text-right text-[8px] font-medium uppercase text-gray-400">Montant</span>
          <span className="text-right text-[8px] font-medium uppercase text-gray-400">Statut</span>
        </div>

        <TransactionRow
          name="Sophie Durand"
          date="15 jan 14:09"
          type="Acompte"
          amount="+150€"
          status="paid"
        />
        <TransactionRow
          name="James Wilson"
          date="15 jan 11:23"
          type="Caution"
          amount="300€"
          status="authorized"
        />
        <TransactionRow
          name="Maria García"
          date="14 jan 18:45"
          type="Acompte"
          amount="+220€"
          status="paid"
        />
        <TransactionRow
          name="Thomas Petit"
          date="14 jan 09:12"
          type="Acompte"
          amount="-80€"
          status="refunded"
          refundAction
        />
        <TransactionRow
          name="Lucas Bernard"
          date="13 jan 16:30"
          type="Empreinte"
          amount="+45€"
          status="charged"
        />
      </div>
    </div>
  );
}

function QuickStat({ label, value, color }: { label: string; value: string; color: string }) {
  const colors = {
    green: 'text-green-600 bg-green-50 border-green-100',
    amber: 'text-amber-600 bg-amber-50 border-amber-100',
    blue: 'text-blue-600 bg-blue-50 border-blue-100',
    red: 'text-red-600 bg-red-50 border-red-100',
  };
  return (
    <div className={`rounded-lg border px-2 py-1.5 text-center ${colors[color as keyof typeof colors]}`}>
      <p className="text-sm font-bold">{value}</p>
      <p className="text-[8px]">{label}</p>
    </div>
  );
}

function TransactionRow({ name, date, type, amount, status, refundAction }: {
  name: string;
  date: string;
  type: string;
  amount: string;
  status: 'paid' | 'authorized' | 'refunded' | 'charged';
  refundAction?: boolean;
}) {
  const statusConfig = {
    paid: { label: 'Payé', color: 'text-green-600 bg-green-50', icon: CheckCircle2 },
    authorized: { label: 'Bloqué', color: 'text-blue-600 bg-blue-50', icon: Clock },
    refunded: { label: 'Remboursé', color: 'text-orange-600 bg-orange-50', icon: RotateCcw },
    charged: { label: 'Prélevé', color: 'text-green-600 bg-green-50', icon: ArrowDownLeft },
  };
  const s = statusConfig[status];
  const Icon = s.icon;

  return (
    <div className="grid grid-cols-[1fr_80px_70px_70px] items-center gap-2 border-b border-gray-50 px-3 py-2 last:border-0">
      <div>
        <p className="text-[10px] font-medium text-gray-800">{name}</p>
        <p className="text-[8px] text-gray-400">{date}</p>
      </div>
      <span className="text-[9px] text-gray-600">{type}</span>
      <span className={`text-right text-[10px] font-bold ${
        amount.startsWith('-') ? 'text-orange-600' : 'text-gray-800'
      }`}>{amount}</span>
      <div className="flex justify-end">
        <div className={`flex items-center gap-0.5 rounded-full px-1.5 py-0.5 ${s.color}`}>
          <Icon className="h-2 w-2" />
          <span className="text-[8px] font-medium">{s.label}</span>
        </div>
      </div>
    </div>
  );
}
