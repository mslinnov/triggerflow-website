'use client';

import { BrowserMockup } from './PhoneMockup';
import { ArrowUp, Clock, Mail, Zap, CalendarCheck, BedDouble, Heart, Utensils, LogOut, TrendingUp } from 'lucide-react';

export function UpsellTimingMockup() {
  return (
    <BrowserMockup title="Timing d'envoi">
      <div className="p-4 min-h-[300px]">
        <h4 className="text-xs font-semibold text-gray-800 mb-3">Timeline d&apos;envoi automatique</h4>

        {/* Timeline */}
        <div className="relative ml-3 mb-4">
          {/* Vertical line */}
          <div className="absolute left-0 top-1 bottom-1 w-px bg-gray-200" />

          <TimelineItem
            label="R&eacute;servation (J0)"
            offer="Surclassement"
            icon={ArrowUp}
            active={false}
          />
          <TimelineItem
            label="J-3"
            offer="Pack romantique / Kids club"
            icon={Heart}
            active
            expanded
          />
          <TimelineItem
            label="J-1"
            offer="Restaurant, Spa"
            icon={Utensils}
            active={false}
          />
          <TimelineItem
            label="Check-in"
            offer="Late checkout"
            icon={LogOut}
            active={false}
          />
          <TimelineItem
            label="S&eacute;jour J+1"
            offer="Offres flash"
            icon={Zap}
            active={false}
            isLast
          />
        </div>

        {/* Performance metrics */}
        <div className="p-2.5 bg-green-50 rounded-xl border border-green-100 mb-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <TrendingUp className="w-3 h-3 text-green-600" />
            <span className="text-[10px] font-semibold text-green-700">Meilleur timing : J-3 &agrave; 10h (23% conversion)</span>
          </div>
        </div>

        {/* Heatmap */}
        <div>
          <p className="text-[10px] font-medium text-gray-500 mb-1.5">Taux d&apos;ouverture par cr&eacute;neau</p>
          <div className="grid grid-cols-7 gap-0.5">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
              <div key={day} className="text-center">
                <p className="text-[7px] text-gray-400 mb-0.5">{day}</p>
              </div>
            ))}
            {/* Heatmap cells - 4 rows (8h, 10h, 14h, 18h) x 7 days */}
            {['8h', '10h', '14h', '18h'].map((hour) => (
              <HeatmapRow key={hour} hour={hour} />
            ))}
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}

function TimelineItem({
  label,
  offer,
  icon: Icon,
  active,
  expanded,
  isLast,
}: {
  label: string;
  offer: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  expanded?: boolean;
  isLast?: boolean;
}) {
  return (
    <div className={`relative pl-5 ${isLast ? '' : 'pb-2.5'}`}>
      {/* Dot */}
      <div className={`absolute left-0 top-1 w-2 h-2 rounded-full -translate-x-[3.5px] ${active ? 'bg-brand-primary ring-2 ring-brand-primary/20' : 'bg-gray-300'}`} />

      <div className={`${expanded ? 'p-2 bg-brand-primary/5 rounded-lg border border-brand-primary/20' : ''}`}>
        <div className="flex items-center gap-1.5">
          <span className={`text-[10px] font-semibold ${active ? 'text-brand-primary' : 'text-gray-600'}`}>{label}</span>
          <Icon className={`w-3 h-3 ${active ? 'text-brand-primary' : 'text-gray-400'}`} />
          <span className="text-[9px] text-gray-500">{offer}</span>
        </div>

        {expanded && (
          <div className="mt-1.5 space-y-1">
            <div className="flex items-center gap-3 text-[9px]">
              <span className="flex items-center gap-1 text-gray-500">
                <Clock className="w-2.5 h-2.5" /> Envoi &agrave; <strong className="text-gray-700">10:00</strong>
              </span>
              <span className="flex items-center gap-1 text-gray-500">
                <Mail className="w-2.5 h-2.5" /> Canal <strong className="text-gray-700">Email</strong>
              </span>
              <span className="flex items-center gap-1 text-gray-500">
                <CalendarCheck className="w-2.5 h-2.5" /> A/B test <strong className="text-gray-700">Objet A vs B</strong>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HeatmapRow({ hour }: { hour: string }) {
  // Simulated intensity values per day for the heatmap
  const intensityMap: Record<string, number[]> = {
    '8h':  [2, 3, 2, 3, 2, 1, 1],
    '10h': [4, 5, 4, 5, 4, 3, 2],
    '14h': [3, 3, 3, 3, 2, 2, 1],
    '18h': [2, 2, 3, 2, 3, 4, 3],
  };

  const intensities = intensityMap[hour] || [1, 1, 1, 1, 1, 1, 1];
  const colors = ['bg-green-50', 'bg-green-100', 'bg-green-200', 'bg-green-300', 'bg-green-500'];

  return (
    <>
      {intensities.map((intensity, i) => (
        <div key={`${hour}-${i}`} className="relative group">
          <div className={`aspect-square rounded-sm ${colors[intensity - 1]}`} />
          {i === 0 && (
            <span className="absolute -left-5 top-1/2 -translate-y-1/2 text-[7px] text-gray-400">{hour}</span>
          )}
        </div>
      ))}
    </>
  );
}
