'use client';

import { CreditCard, ArrowUpRight, Clock, CheckCircle2, Send, Eye } from 'lucide-react';

export function PaymentHeroMockup() {
  return (
    <div className="h-full w-full bg-[#f8fafb] p-4">
      {/* Top stats row */}
      <div className="mb-4 grid grid-cols-3 gap-2.5">
        <StatCard label="Encaissé ce mois" value="12 450€" trend="+18%" color="green" />
        <StatCard label="En attente" value="3 liens" trend="" color="amber" />
        <StatCard label="Cautions actives" value="8" trend="" color="blue" />
      </div>

      {/* Recent payment links */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-3 py-2">
          <h4 className="text-[10px] font-semibold text-gray-800">Liens de paiement récents</h4>
          <button className="text-[9px] font-medium text-brand-primary">Voir tout</button>
        </div>
        <div className="divide-y divide-gray-50">
          <PaymentRow
            name="Sophie Durand"
            type="Acompte"
            amount="150€"
            status="paid"
            time="Il y a 2h"
          />
          <PaymentRow
            name="James Wilson"
            type="Caution"
            amount="300€"
            status="authorized"
            time="Il y a 4h"
          />
          <PaymentRow
            name="Maria García"
            type="Empreinte"
            amount="-"
            status="registered"
            time="Il y a 6h"
          />
          <PaymentRow
            name="Pierre Martin"
            type="Acompte"
            amount="220€"
            status="pending"
            time="Envoyé"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, color }: { label: string; value: string; trend: string; color: string }) {
  const colors = {
    green: 'bg-green-50 border-green-100',
    amber: 'bg-amber-50 border-amber-100',
    blue: 'bg-blue-50 border-blue-100',
  };
  return (
    <div className={`rounded-xl border p-2.5 ${colors[color as keyof typeof colors]}`}>
      <p className="text-[9px] text-gray-500">{label}</p>
      <div className="mt-0.5 flex items-baseline gap-1.5">
        <span className="text-sm font-bold text-gray-800">{value}</span>
        {trend && <span className="text-[9px] font-semibold text-green-600">{trend}</span>}
      </div>
    </div>
  );
}

function PaymentRow({ name, type, amount, status, time }: {
  name: string;
  type: string;
  amount: string;
  status: 'paid' | 'authorized' | 'registered' | 'pending';
  time: string;
}) {
  const statusConfig = {
    paid: { label: 'Payé', icon: CheckCircle2, color: 'text-green-600 bg-green-50' },
    authorized: { label: 'Bloqué', icon: Clock, color: 'text-blue-600 bg-blue-50' },
    registered: { label: 'Enregistré', icon: CreditCard, color: 'text-purple-600 bg-purple-50' },
    pending: { label: 'En attente', icon: Send, color: 'text-amber-600 bg-amber-50' },
  };
  const s = statusConfig[status];
  const Icon = s.icon;

  return (
    <div className="flex items-center gap-2.5 px-3 py-2">
      <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${s.color}`}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="text-[10px] font-semibold text-gray-800">{name}</p>
          <span className="text-[8px] text-gray-400">{type}</span>
        </div>
        <p className="text-[9px] text-gray-400">{time}</p>
      </div>
      <span className="text-[10px] font-bold text-gray-700">{amount}</span>
      <div className={`rounded-full px-1.5 py-0.5 ${s.color}`}>
        <span className="text-[8px] font-semibold">{s.label}</span>
      </div>
    </div>
  );
}
