'use client';

import { CreditCard, Shield, CircleDollarSign, AlertCircle, CheckCircle2, Fingerprint } from 'lucide-react';

export function PaymentEmpreinteMockup() {
  return (
    <div className="h-full w-full bg-white p-4">
      <h4 className="mb-3 text-xs font-semibold text-gray-800">Empreintes carte enregistrées</h4>

      {/* Info banner */}
      <div className="mb-3 flex items-start gap-2 rounded-xl border border-purple-100 bg-purple-50 p-2.5">
        <Fingerprint className="mt-0.5 h-3.5 w-3.5 shrink-0 text-purple-500" />
        <div>
          <p className="text-[10px] font-semibold text-purple-800">Aucun montant débité</p>
          <p className="text-[9px] text-purple-600">La carte est enregistrée pour un prélèvement ultérieur (no-show, dégâts, minibar)</p>
        </div>
      </div>

      {/* Card entries */}
      <div className="space-y-2">
        <CardEntry
          name="Sophie Durand"
          room="204"
          card="Visa •••• 4242"
          date="12 jan"
          status="active"
        />
        <CardEntry
          name="James Wilson"
          room="301"
          card="Mastercard •••• 8901"
          date="13 jan"
          status="active"
        />
        <CardEntry
          name="Thomas Petit"
          room="118"
          card="Visa •••• 1234"
          date="10 jan"
          status="charged"
          chargeAmount="45€"
          chargeReason="Minibar"
        />
      </div>

      {/* Charge dialog preview */}
      <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
        <p className="mb-2 text-[10px] font-semibold text-gray-700">Prélever une empreinte</p>
        <div className="flex gap-2">
          <div className="flex-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5">
            <p className="text-[8px] text-gray-400">Montant</p>
            <p className="text-[10px] font-bold text-gray-800">45,00 €</p>
          </div>
          <div className="flex-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5">
            <p className="text-[8px] text-gray-400">Motif</p>
            <p className="text-[10px] font-medium text-gray-800">Minibar</p>
          </div>
        </div>
        <button className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg bg-brand-primary py-1.5 text-[9px] font-semibold text-white">
          <CircleDollarSign className="h-3 w-3" />
          Prélever 45,00 €
        </button>
      </div>
    </div>
  );
}

function CardEntry({ name, room, card, date, status, chargeAmount, chargeReason }: {
  name: string;
  room: string;
  card: string;
  date: string;
  status: 'active' | 'charged';
  chargeAmount?: string;
  chargeReason?: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white p-2.5">
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
        status === 'active' ? 'bg-purple-50' : 'bg-green-50'
      }`}>
        <CreditCard className={`h-4 w-4 ${
          status === 'active' ? 'text-purple-500' : 'text-green-500'
        }`} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="text-[10px] font-semibold text-gray-800">{name}</p>
          <span className="text-[8px] text-gray-400">Ch. {room}</span>
        </div>
        <p className="text-[9px] text-gray-500">{card} &middot; {date}</p>
      </div>
      {status === 'active' ? (
        <div className="flex items-center gap-1 rounded-full bg-purple-50 px-1.5 py-0.5">
          <Shield className="h-2 w-2 text-purple-500" />
          <span className="text-[8px] font-medium text-purple-600">Active</span>
        </div>
      ) : (
        <div className="text-right">
          <div className="flex items-center gap-1 rounded-full bg-green-50 px-1.5 py-0.5">
            <CheckCircle2 className="h-2 w-2 text-green-500" />
            <span className="text-[8px] font-medium text-green-600">{chargeAmount}</span>
          </div>
          <p className="mt-0.5 text-[8px] text-gray-400">{chargeReason}</p>
        </div>
      )}
    </div>
  );
}
