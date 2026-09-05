'use client';

import { Check, CreditCard, Mail, Clock } from 'lucide-react';

export function PaymentImmediateMockup() {
  return (
    <div className="h-full w-full p-5 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h4 className="text-sm font-semibold text-gray-800">Transactions récentes</h4>
          <p className="text-[10px] text-gray-500">Paiements immédiats encaissés</p>
        </div>
        <span className="text-[9px] font-medium text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded-full flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          En ligne
        </span>
      </div>

      {/* Transactions list */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-2 border-b border-gray-200 bg-gray-100/50 grid grid-cols-5 gap-2">
          <span className="text-[8px] font-semibold text-gray-500 uppercase">Client</span>
          <span className="text-[8px] font-semibold text-gray-500 uppercase">Montant</span>
          <span className="text-[8px] font-semibold text-gray-500 uppercase">Objet</span>
          <span className="text-[8px] font-semibold text-gray-500 uppercase">Heure</span>
          <span className="text-[8px] font-semibold text-gray-500 uppercase">Statut</span>
        </div>
        <TransactionRow name="Sophie Durand" amount="250,00 €" object="Acompte séjour" time="Il y a 3 min" status="success" />
        <TransactionRow name="Marc Lefèvre" amount="89,00 €" object="Spa duo" time="Il y a 12 min" status="success" />
        <TransactionRow name="Julie Roux" amount="45,00 €" object="Late checkout" time="Il y a 28 min" status="success" />
        <TransactionRow name="Pierre Martin" amount="180,00 €" object="Surclassement" time="Il y a 1h" status="success" />
        <TransactionRow name="Elena García" amount="320,00 €" object="Acompte séjour" time="Il y a 2h" status="pending" />
      </div>

      {/* Stats footer */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-green-700">884 €</p>
          <p className="text-[8px] text-green-600">Encaissé aujourd&apos;hui</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-blue-700">12</p>
          <p className="text-[8px] text-blue-600">Transactions</p>
        </div>
        <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-brand-primary">2 min</p>
          <p className="text-[8px] text-brand-primary/70">Temps moyen</p>
        </div>
      </div>
    </div>
  );
}

function TransactionRow({ name, amount, object, time, status }: {
  name: string; amount: string; object: string; time: string; status: 'success' | 'pending';
}) {
  return (
    <div className="px-4 py-2.5 grid grid-cols-5 gap-2 items-center border-b border-gray-100 last:border-0 bg-white hover:bg-gray-50/50">
      <span className="text-[10px] font-medium text-gray-800 truncate">{name}</span>
      <span className="text-[10px] font-bold text-gray-800">{amount}</span>
      <span className="text-[10px] text-gray-600 truncate">{object}</span>
      <span className="text-[9px] text-gray-500">{time}</span>
      <span className={`text-[8px] font-medium px-2 py-0.5 rounded-full w-fit ${
        status === 'success' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
      }`}>
        {status === 'success' ? '✓ Payé' : '⏳ En attente'}
      </span>
    </div>
  );
}
