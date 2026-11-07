'use client';

import { useTranslations } from 'next-intl';
import { BarChart3, BedDouble, Building2, CalendarDays, Check, IdCard, KeyRound, Lock, LockOpen, Mail, MessageSquare, ScanLine, Send, ShoppingBag, Sparkles, Users } from 'lucide-react';
import { useScenario } from '@/components/ds/useScenario';
import { cn } from '@/lib/utils';
import { Reveal } from './shared';

/** Campagne : segment ciblé → email assemblé → envoyé → ouvertures et réservations. */
export function CampaignScenario() {
  const t = useTranslations('visuals.campaign');
  const { ref, step } = useScenario([900, 900, 900, 1100, 1]);
  return (
    <div ref={ref} className="grid gap-5 p-5 sm:p-8 md:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-xl border border-line bg-white p-5">
        <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3"><Users aria-hidden className="h-3.5 w-3.5" />{t('segment')}</p>
        <div className="mt-4 space-y-2">
          <Reveal show={step >= 1}><div className="h-16 rounded-lg bg-mint/50" /></Reveal>
          <Reveal show={step >= 1}><p className="text-[14px] font-semibold text-ink">{t('subject')}</p></Reveal>
          <Reveal show={step >= 2}><div className="space-y-1.5"><div className="h-2 w-full rounded bg-paper" /><div className="h-2 w-5/6 rounded bg-paper" /><div className="h-2 w-2/3 rounded bg-paper" /></div></Reveal>
          <Reveal show={step >= 2}><span className="mt-2 inline-block rounded-md bg-accent px-3 py-1.5 font-mono text-[10.5px] uppercase text-white">{t('book')}</span></Reveal>
        </div>
      </div>
      <div className="space-y-3">
        <Reveal show={step >= 3}><p className="flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-3 text-[13px] text-ink"><Send aria-hidden className="h-4 w-4 text-accent" />{t('sent')}</p></Reveal>
        <Reveal show={step >= 4}>
          <div className="grid grid-cols-3 gap-2">
            {[[t('opens'), '41 %'], [t('clicks'), '9 %'], [t('bookings'), '12']].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-line bg-white p-3"><p className="text-[1.25rem] font-medium tabular-nums text-ink">{v}</p><p className="text-[11px] text-ink-3">{k}</p></div>
            ))}
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase text-ink-3">{t('demo')}</p>
        </Reveal>
      </div>
    </div>
  );
}

/** Guest App : livret dans le téléphone, commande d'un service, la demande arrive à l'équipe. */
export function GuestAppScenario() {
  const t = useTranslations('visuals.guestApp');
  const { ref, step } = useScenario([900, 1000, 1000, 1]);
  const tiles = [t('t1'), t('t2'), t('t3'), t('t4')];
  return (
    <div ref={ref} className="grid items-center gap-6 p-5 sm:p-8 md:grid-cols-2">
      <div className="mx-auto w-full max-w-[250px] rounded-[28px] border border-line bg-paper p-2.5">
        <div className="overflow-hidden rounded-[22px] bg-white">
          <div className="bg-ink px-4 py-4 text-white"><p className="font-mono text-[10px] uppercase text-white/60">{t('welcome')}</p><p className="text-[14px] font-semibold">Hôtel des Tilleuls</p></div>
          <div className="grid grid-cols-2 gap-2 p-3">
            {tiles.map((tile, i) => (
              <div key={tile} className={cn('rounded-lg border p-3 text-[12px] font-medium transition-colors', step >= 1 && i === 1 ? 'border-accent bg-mint/40 text-ink' : 'border-line text-ink-2')}>{tile}</div>
            ))}
          </div>
          <Reveal show={step >= 2} className="px-3 pb-3"><p className="rounded-lg bg-accent px-3 py-2 text-center font-mono text-[10.5px] uppercase text-white">{t('order')}</p></Reveal>
        </div>
      </div>
      <Reveal show={step >= 3}>
        <div className="rounded-xl border border-accent bg-white p-4 shadow-[0_0_0_3px_rgba(0,111,104,0.10)]">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase text-accent"><ShoppingBag aria-hidden className="h-3.5 w-3.5" />{t('newRequest')}</p>
          <p className="mt-2 text-[14px] font-semibold text-ink">{t('request')}</p>
          <p className="text-[12px] text-ink-3">{t('room')}</p>
        </div>
      </Reveal>
    </div>
  );
}

/** Événements : participants qui confirment, régimes, rooming list. */
export function EventsScenario() {
  const t = useTranslations('visuals.events');
  const { ref, step } = useScenario([800, 800, 800, 1000, 1]);
  const people = [
    { n: 'Claire Fontaine', d: t('veg'), at: 1 },
    { n: 'Thomas Girard', d: '', at: 2 },
    { n: 'Océane François', d: t('kosher'), at: 3 },
  ];
  const confirmed = 19 + people.filter((p) => step >= p.at).length;
  return (
    <div ref={ref} className="grid gap-5 p-5 sm:p-8 md:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-xl border border-line bg-white p-4">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-ink"><CalendarDays aria-hidden className="h-4 w-4 text-accent" />{t('event')}</p>
        <ul className="mt-3 divide-y divide-line">
          {people.map((p) => (
            <li key={p.n} className="flex items-center justify-between py-2.5 text-[12.5px]">
              <span className="text-ink">{p.n}{p.d && <span className="ml-2 text-ink-3">· {p.d}</span>}</span>
              <span className={cn('rounded-full px-2 py-0.5 font-mono text-[10px] uppercase transition-colors', step >= p.at ? 'bg-mint text-ink' : 'bg-paper text-ink-3')}>{step >= p.at ? t('confirmed') : t('invited')}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-3">
        <div className="rounded-xl border border-line bg-white p-4"><p className="text-[2rem] font-medium tabular-nums tracking-[-0.03em] text-ink">{confirmed}</p><p className="text-[12px] text-ink-3">{t('count')}</p></div>
        <Reveal show={step >= 4}><p className="flex items-center gap-2 rounded-xl bg-peach px-4 py-3 text-[12.5px] font-semibold text-ink"><BedDouble aria-hidden className="h-4 w-4" />{t('rooming')}</p></Reveal>
      </div>
    </div>
  );
}

/** B2B : la fiche société regroupe ses collaborateurs et leurs séjours. */
export function B2bScenario() {
  const t = useTranslations('visuals.b2b');
  const { ref, step } = useScenario([900, 800, 800, 900, 1]);
  const rows = [['Karim Benali', '3'], ['Sophie Martin', '2'], ['Paul Henry', '1']];
  return (
    <div ref={ref} className="p-5 sm:p-8">
      <div className="mx-auto max-w-[560px] rounded-xl border border-line bg-white p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink text-white"><Building2 aria-hidden className="h-5 w-5" /></span>
          <div><p className="text-[15px] font-semibold text-ink">Cabinet Durand & Associés</p><p className="font-mono text-[10px] uppercase text-accent">{t('detected')}</p></div>
        </div>
        <ul className="mt-4 space-y-2">
          {rows.map(([n, s], i) => (
            <Reveal as="li" key={n} show={step >= i + 1} from="left">
              <div className="flex items-center justify-between rounded-lg bg-paper px-3 py-2 text-[12.5px]"><span className="text-ink">{n}</span><span className="font-mono text-ink-3">{s} {t('stays')}</span></div>
            </Reveal>
          ))}
        </ul>
        <Reveal show={step >= 4} className="mt-3"><p className="rounded-lg border border-accent px-3 py-2 text-[12.5px] text-ink">{t('next')}</p></Reveal>
      </div>
    </div>
  );
}

/** Check-in en ligne : pièce d'identité scannée, champs remplis, renvoyés au PMS. */
export function CheckinScenario() {
  const t = useTranslations('visuals.checkin');
  const { ref, step } = useScenario([900, 900, 700, 700, 900, 1]);
  const fields = [[t('name'), 'Camille Laurent'], [t('birth'), '12/04/1989'], [t('nationality'), t('nationalityValue')]];
  return (
    <div ref={ref} className="grid items-center gap-5 p-5 sm:p-8 md:grid-cols-2">
      <div className={cn('relative flex aspect-[1.6] items-center justify-center rounded-xl border bg-paper transition-colors', step >= 1 ? 'border-accent' : 'border-line')}>
        <IdCard aria-hidden className="h-12 w-12 text-ink-3" strokeWidth={1.25} />
        {step === 1 && <span className="absolute inset-x-6 top-1/2 h-0.5 animate-pulse bg-accent" />}
        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 font-mono text-[10px] uppercase text-ink-3"><ScanLine aria-hidden className="h-3.5 w-3.5" />{step >= 1 ? t('scanned') : t('scan')}</span>
      </div>
      <div className="rounded-xl border border-line bg-white p-4">
        {fields.map(([k, v], i) => (
          <div key={k} className="mb-3">
            <p className="text-[11.5px] text-ink-3">{k}</p>
            <p className={cn('mt-1 rounded-lg border border-line px-3 py-2 text-[13px] transition-colors', step >= i + 2 ? 'text-ink' : 'text-transparent')}>{v}</p>
          </div>
        ))}
        <Reveal show={step >= 5}><p className="flex items-center gap-2 font-mono text-[11px] uppercase text-accent"><Check aria-hidden className="h-3.5 w-3.5" />{t('done')}</p></Reveal>
      </div>
    </div>
  );
}

/** Ménage : statuts des chambres qui changent, renvoyés au PMS. */
export function HousekeepingScenario() {
  const t = useTranslations('visuals.housekeeping');
  const { ref, step } = useScenario([900, 900, 900, 1000, 1]);
  const rooms = ['101', '102', '103', '104', '201', '202', '203', '204'];
  const status = (i: number) => {
    if (i < step * 2) return 'clean';
    if (i < step * 2 + 2) return 'progress';
    return 'dirty';
  };
  const tone = { clean: 'bg-mint text-ink', progress: 'bg-peach text-ink', dirty: 'bg-paper text-ink-3' } as const;
  return (
    <div ref={ref} className="p-5 sm:p-8">
      <div className="mx-auto max-w-[620px] rounded-xl border border-line bg-white p-5">
        <div className="grid grid-cols-4 gap-2">
          {rooms.map((r, i) => {
            const s = step >= 4 ? 'clean' : status(i);
            return (
              <div key={r} className={cn('rounded-lg px-3 py-3 transition-colors duration-500', tone[s])}>
                <p className="text-[14px] font-semibold">{r}</p>
                <p className="font-mono text-[10px] uppercase">{t(s)}</p>
              </div>
            );
          })}
        </div>
        <Reveal show={step >= 4} className="mt-3"><p className="flex items-center gap-2 font-mono text-[11px] uppercase text-accent"><Sparkles aria-hidden className="h-3.5 w-3.5" />{t('synced')}</p></Reveal>
      </div>
    </div>
  );
}

/** Clé digitale : la clé part par message, la serrure s'ouvre. */
export function KeysScenario() {
  const t = useTranslations('visuals.keys');
  const { ref, step } = useScenario([900, 1100, 1000, 1]);
  return (
    <div ref={ref} className="grid items-center gap-6 p-5 sm:p-8 md:grid-cols-2">
      <div className="rounded-xl border border-line bg-white p-4">
        <p className="flex items-center gap-2 font-mono text-[10px] uppercase text-ink-3"><MessageSquare aria-hidden className="h-3.5 w-3.5" />SMS · {t('arrivalDay')}</p>
        <Reveal show={step >= 1} className="mt-3">
          <p className="rounded-lg bg-paper px-3 py-2 text-[13px] text-ink">{t('message')}</p>
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 font-mono text-[10.5px] uppercase text-white"><KeyRound aria-hidden className="h-3.5 w-3.5" />{t('open')}</span>
        </Reveal>
      </div>
      <div className="flex flex-col items-center gap-3">
        <span className={cn('flex h-24 w-24 items-center justify-center rounded-2xl transition-all duration-500', step >= 2 ? 'bg-accent text-white' : 'bg-paper text-ink-3')}>
          {step >= 2 ? <LockOpen aria-hidden className="h-10 w-10" strokeWidth={1.5} /> : <Lock aria-hidden className="h-10 w-10" strokeWidth={1.5} />}
        </span>
        <p className="font-mono text-[11px] uppercase text-ink-3">{t('room')} · {step >= 2 ? t('unlocked') : t('locked')}</p>
      </div>
    </div>
  );
}

/** Statistiques : la courbe se dessine, les chiffres se mettent en place (données de démo). */
export function AnalyticsScenario() {
  const t = useTranslations('visuals.analytics');
  const { ref, step } = useScenario([1400, 800, 1]);
  const d = 'M0,70 C40,64 60,50 100,52 C140,54 160,30 200,32 C240,34 260,18 300,14';
  return (
    <div ref={ref} className="grid gap-5 p-5 sm:p-8 md:grid-cols-[1.4fr_0.6fr]">
      <div className="rounded-xl border border-line bg-white p-5">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-ink"><BarChart3 aria-hidden className="h-4 w-4 text-accent" />{t('chart')}</p>
        <svg viewBox="0 0 300 80" className="mt-4 h-32 w-full">
          <path d={d} fill="none" stroke="#E4E8E7" strokeWidth="2" />
          <path d={d} fill="none" stroke="#006F68" strokeWidth="2.5" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={step >= 1 ? 0 : 1} style={{ transition: 'stroke-dashoffset 1.2s ease' }} />
        </svg>
      </div>
      <div className="space-y-3">
        {[[t('k1'), '1 247'], [t('k2'), '4 280 €']].map(([k, v], i) => (
          <Reveal key={k} show={step >= i + 1}><div className="rounded-xl border border-line bg-white p-4"><p className="text-[1.5rem] font-medium tabular-nums text-ink">{v}</p><p className="text-[11.5px] text-ink-3">{k}</p></div></Reveal>
        ))}
        <p className="font-mono text-[10px] uppercase text-ink-3">{t('demo')}</p>
      </div>
    </div>
  );
}

/** Demandes de réservation : un créneau choisi sur la page publique, la demande arrive à l'équipe. */
export function BookingScenario() {
  const t = useTranslations('visuals.booking');
  const { ref, step } = useScenario([900, 900, 1000, 1]);
  const slots = ['10:00', '11:30', '14:00', '15:30'];
  return (
    <div ref={ref} className="grid items-center gap-5 p-5 sm:p-8 md:grid-cols-2">
      <div className="rounded-xl border border-line bg-white p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3">{t('place')}</p>
        <p className="mt-1 text-[15px] font-semibold text-ink">{t('date')}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {slots.map((s, i) => (
            <span key={s} className={cn('rounded-lg border px-3 py-2 text-center font-mono text-[12px] transition-colors', step >= 1 && i === 2 ? 'border-accent bg-accent text-white' : i === 1 ? 'border-line bg-paper text-ink-3 line-through' : 'border-line text-ink')}>{s}</span>
          ))}
        </div>
        <Reveal show={step >= 2} className="mt-3"><p className="rounded-lg bg-accent px-3 py-2 text-center font-mono text-[11px] uppercase text-white">{t('send')}</p></Reveal>
      </div>
      <Reveal show={step >= 3}>
        <div className="rounded-xl border border-accent bg-white p-4 shadow-[0_0_0_3px_rgba(0,111,104,0.10)]">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase text-accent"><CalendarDays aria-hidden className="h-3.5 w-3.5" />{t('request')}</p>
          <p className="mt-2 text-[14px] font-semibold text-ink">{t('detail')}</p>
          <p className="text-[12px] text-ink-3">Camille Laurent · {t('linked')}</p>
        </div>
      </Reveal>
    </div>
  );
}
