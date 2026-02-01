'use client';

import { BrowserMockup } from './PhoneMockup';
import {
  CalendarPlus,
  LogOut,
  LogIn,
  Mail,
  MessageSquare,
  QrCode,
  Bell,
  ArrowRight,
} from 'lucide-react';

export function FormAutoSendMockup() {
  return (
    <BrowserMockup title="Envoi automatique" className="max-w-lg">
      <div className="min-h-[300px] p-4 bg-gray-50">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-gray-800">Règles d&apos;envoi automatique</p>
          <span className="text-[9px] font-medium bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
            3 actives
          </span>
        </div>

        <div className="space-y-2">
          {/* Rule 1 */}
          <RuleCard
            triggerIcon={CalendarPlus}
            triggerLabel="Nouvelle réservation"
            formName="Pré-check-in"
            timing="J-3"
            channelIcon={Mail}
            channelLabel="Email"
            active
            color="green"
          />

          {/* Rule 2 */}
          <RuleCard
            triggerIcon={LogOut}
            triggerLabel="Check-out"
            formName="Enquête satisfaction"
            timing="J+1"
            channelIcon={MessageSquare}
            channelLabel="Email + SMS"
            active
            color="green"
          />

          {/* Rule 3 */}
          <RuleCard
            triggerIcon={LogIn}
            triggerLabel="Check-in"
            formName="Demande de service"
            timing="Immédiat"
            channelIcon={QrCode}
            channelLabel="QR Code"
            active
            color="blue"
          />
        </div>

        {/* Reminder badge */}
        <div className="mt-3 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          <Bell className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
          <div>
            <p className="text-[10px] font-semibold text-amber-800">Rappel automatique</p>
            <p className="text-[10px] text-amber-700">Si non complété : rappel à J-1</p>
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}

function RuleCard({
  triggerIcon: TriggerIcon,
  triggerLabel,
  formName,
  timing,
  channelIcon: ChannelIcon,
  channelLabel,
  active,
  color,
}: {
  triggerIcon: React.ComponentType<{ className?: string }>;
  triggerLabel: string;
  formName: string;
  timing: string;
  channelIcon: React.ComponentType<{ className?: string }>;
  channelLabel: string;
  active?: boolean;
  color: 'green' | 'blue';
}) {
  const colorClasses = color === 'green'
    ? 'border-emerald-200 bg-white'
    : 'border-blue-200 bg-white';

  const dotColor = color === 'green' ? 'bg-emerald-500' : 'bg-blue-500';

  return (
    <div className={`rounded-lg border ${colorClasses} p-2.5 flex items-center gap-2`}>
      {/* Trigger */}
      <div className="flex items-center gap-1.5 min-w-0">
        <div className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
          <TriggerIcon className="w-3.5 h-3.5 text-gray-600" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] text-gray-500 leading-tight">Trigger</p>
          <p className="text-[10px] font-medium text-gray-800 truncate">{triggerLabel}</p>
        </div>
      </div>

      <ArrowRight className="w-3 h-3 text-gray-300 flex-shrink-0" />

      {/* Form + timing */}
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium text-gray-800 truncate">{formName}</p>
        <div className="flex items-center gap-1">
          <span className="text-[9px] bg-gray-100 text-gray-600 px-1 py-px rounded font-mono">
            {timing}
          </span>
          <div className="flex items-center gap-0.5">
            <ChannelIcon className="w-2.5 h-2.5 text-gray-400" />
            <span className="text-[9px] text-gray-500">{channelLabel}</span>
          </div>
        </div>
      </div>

      {/* Toggle */}
      <div className="flex-shrink-0">
        <div
          className={`w-7 h-4 rounded-full flex items-center ${
            active ? (color === 'green' ? 'bg-emerald-500 justify-end' : 'bg-blue-500 justify-end') : 'bg-gray-300 justify-start'
          } px-0.5`}
        >
          <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
        </div>
      </div>

      {/* Active dot */}
      <div className={`w-1.5 h-1.5 rounded-full ${dotColor} flex-shrink-0`} />
    </div>
  );
}
