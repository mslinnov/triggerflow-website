'use client';

import { Shield, Clock, ArrowDownToLine, Unlock, User, CreditCard, AlertTriangle } from 'lucide-react';

export function PaymentCautionMockup() {
  return (
    <div className="h-full w-full bg-white p-4">
      <h4 className="mb-3 text-xs font-semibold text-gray-800">Cautions actives</h4>

      {/* Active caution card — expanded */}
      <div className="mb-3 rounded-xl border border-blue-200 bg-blue-50/50 p-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100">
              <Shield className="h-3.5 w-3.5 text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-800">Sophie Durand</p>
              <p className="text-[9px] text-gray-500">Chambre 204 &middot; Suite Junior</p>
            </div>
          </div>
          <div className="rounded-full bg-blue-100 px-2 py-0.5">
            <span className="text-[8px] font-bold text-blue-700">PRÉ-AUTORISÉ</span>
          </div>
        </div>

        {/* Amount & countdown */}
        <div className="mb-2.5 flex items-baseline justify-between rounded-lg bg-white p-2.5">
          <div>
            <p className="text-[8px] text-gray-400">Montant bloqué</p>
            <p className="text-lg font-bold text-gray-800">300,00 €</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] text-gray-400">Expire dans</p>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-blue-500" />
              <p className="text-xs font-bold text-blue-600">12j 8h</p>
            </div>
          </div>
        </div>

        {/* Card info */}
        <div className="mb-2.5 flex items-center gap-1.5 text-[9px] text-gray-500">
          <CreditCard className="h-2.5 w-2.5" />
          Visa •••• 4242 &middot; Bloqué le 12 jan à 15:30
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-brand-primary py-1.5 text-[9px] font-semibold text-white">
            <ArrowDownToLine className="h-3 w-3" />
            Capturer 300€
          </button>
          <button className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white py-1.5 text-[9px] font-semibold text-gray-600">
            <Unlock className="h-3 w-3" />
            Libérer
          </button>
        </div>
      </div>

      {/* Other cautions — compact list */}
      <div className="space-y-1.5">
        <CautionRow name="James Wilson" room="301" amount="200€" days="18j" />
        <CautionRow name="Maria García" room="115" amount="500€" days="5j" warn />
        <CautionRow name="Pierre Martin" room="208" amount="300€" days="24j" />
      </div>
    </div>
  );
}

function CautionRow({ name, room, amount, days, warn }: {
  name: string;
  room: string;
  amount: string;
  days: string;
  warn?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 px-2.5 py-1.5">
      <div className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-50">
        <Shield className="h-2.5 w-2.5 text-blue-500" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-medium text-gray-700">{name}</p>
        <p className="text-[8px] text-gray-400">Ch. {room}</p>
      </div>
      <span className="text-[9px] font-bold text-gray-700">{amount}</span>
      <div className={`flex items-center gap-0.5 rounded px-1 py-0.5 ${warn ? 'bg-amber-50' : 'bg-gray-100'}`}>
        {warn && <AlertTriangle className="h-2 w-2 text-amber-500" />}
        <span className={`text-[8px] font-medium ${warn ? 'text-amber-600' : 'text-gray-500'}`}>{days}</span>
      </div>
    </div>
  );
}
