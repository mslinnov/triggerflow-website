'use client';

import { useTranslations } from 'next-intl';
import { Check, CheckCheck, Coffee, KeyRound, Phone, Sparkles, UtensilsCrossed, Wifi } from 'lucide-react';
import { Container, SectionHeader } from '@/components/ds';
import { useScenario } from '@/components/ds/useScenario';
import { cn } from '@/lib/utils';

/**
 * Étapes : 0 repos · 1 email · 2-4 WhatsApp (question, réponse, confirmation) · 5-6 formulaire (choix, payé)
 * · 7 Guest App · 8 fin. Hôtel fictif « Hôtel des Tilleuls », aux couleurs de l'hôtel (marque blanche).
 */
const DURATIONS = [500, 1100, 900, 900, 1000, 900, 1000, 1200, 1];

/** Couleur de l'hôtel fictif : montre que chaque écran porte la marque de l'hôtel, pas celle de TriggerFlow. */
const HOTEL = 'bg-[#7A4E2D]';
const HOTEL_TEXT = 'text-[#7A4E2D]';

function PhoneFrame({ children, active, className }: { children: React.ReactNode; active: boolean; className?: string }) {
  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[250px] rounded-[2.2rem] border-[7px] bg-white p-1 transition-all duration-500',
        active ? 'border-ink shadow-[0_24px_60px_-20px_rgba(0,43,40,0.45)]' : 'border-ink/80 shadow-[0_12px_32px_-18px_rgba(0,43,40,0.35)]',
        className
      )}
    >
      <div aria-hidden className="mx-auto mb-1 h-4 w-20 rounded-full bg-ink/90" />
      <div className="h-[420px] overflow-hidden rounded-[1.6rem] bg-paper">{children}</div>
    </div>
  );
}

/** Ce que le client de l'hôtel reçoit, du pré-séjour au séjour. */
export function HomeGuestView() {
  const t = useTranslations('home2.guestView');
  const { ref, step } = useScenario(DURATIONS);
  const steps = t.raw('steps') as { when: string; title: string }[];

  return (
    <section className="relative overflow-hidden bg-mint/45 py-20 md:py-28">
      <Container>
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} titleMuted={t('titleMuted')} subtitle={t('subtitle')} align="left" />

        <div ref={ref} className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* 1. Email de pré-séjour */}
          <figure>
            <Caption when={steps[0].when} title={steps[0].title} active={step >= 1} />
            <PhoneFrame active={step >= 1 && step < 2}>
              <div className={cn('px-4 pb-4 pt-5 text-center text-white', HOTEL)}>
                <p className="font-serif text-[15px] tracking-[0.12em]">HÔTEL DES TILLEULS</p>
              </div>
              <div className="space-y-3 bg-white px-4 py-5">
                <p className="text-[15px] font-semibold text-ink">{t('email.hello')}</p>
                <p className="text-[12.5px] leading-relaxed text-ink-2">{t('email.body')}</p>
                <ul className="space-y-1.5 text-[12px] text-ink">
                  {(t.raw('email.list') as string[]).map((item) => (
                    <li key={item} className="flex items-center gap-1.5">
                      <Check aria-hidden className={cn('h-3.5 w-3.5', HOTEL_TEXT)} />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className={cn('mt-2 block rounded-md py-2.5 text-center text-[12.5px] font-semibold text-white transition-transform duration-500', HOTEL, step === 1 && 'scale-[1.03]')}>
                  {t('email.cta')}
                </span>
              </div>
              <p className="px-4 py-3 text-center text-[10.5px] text-ink-3">{t('email.footer')}</p>
            </PhoneFrame>
          </figure>

          {/* 2. WhatsApp */}
          <figure>
            <Caption when={steps[1].when} title={steps[1].title} active={step >= 2} />
            <PhoneFrame active={step >= 2 && step < 5}>
              <div className="flex items-center gap-2 bg-[#075E54] px-3 py-3 text-white">
                <span className={cn('flex h-7 w-7 items-center justify-center rounded-full font-serif text-[11px]', HOTEL)}>T</span>
                <span className="text-[13px] font-semibold">Hôtel des Tilleuls</span>
              </div>
              <div className="space-y-2.5 bg-[#ECE5DD] px-3 py-4 text-[12.5px] leading-snug">
                <Bubble show={step >= 2} side="in">{t('whatsapp.hotel1')}</Bubble>
                <Bubble show={step >= 3} side="out">{t('whatsapp.guest')}</Bubble>
                <Bubble show={step >= 4} side="in">
                  {t('whatsapp.hotel2')}
                  <span className="mt-1.5 flex items-center justify-between rounded-md bg-white/70 px-2 py-1.5 text-[11.5px] font-semibold text-ink">
                    <span className="flex items-center gap-1"><Coffee aria-hidden className="h-3.5 w-3.5" /> {t('whatsapp.item')}</span>
                    <span className="whitespace-nowrap">36 €</span>
                  </span>
                </Bubble>
              </div>
            </PhoneFrame>
          </figure>

          {/* 3. Formulaire qui vend */}
          <figure>
            <Caption when={steps[2].when} title={steps[2].title} active={step >= 5} />
            <PhoneFrame active={step >= 5 && step < 7}>
              <div className="bg-white px-4 py-5">
                <p className={cn('font-mono text-[10px] uppercase tracking-[0.08em]', HOTEL_TEXT)}>{t('form.label')}</p>
                <p className="mt-1 text-[15px] font-semibold text-ink">{t('form.title')}</p>
                <ul className="mt-4 space-y-2">
                  {(t.raw('form.options') as { name: string; price: string }[]).map((o, i) => {
                    const on = i < 2 && step >= 5;
                    return (
                      <li key={o.name} className={cn('flex items-center justify-between rounded-lg border px-3 py-2.5 text-[12.5px] transition-colors duration-300', on ? 'border-[#7A4E2D] bg-[#7A4E2D]/[0.06]' : 'border-line')}>
                        <span className="flex items-center gap-2 text-ink">
                          <span className={cn('flex h-4 w-4 items-center justify-center rounded border transition-colors', on ? 'border-[#7A4E2D] bg-[#7A4E2D] text-white' : 'border-line')}>
                            {on && <Check aria-hidden className="h-3 w-3" />}
                          </span>
                          {o.name}
                        </span>
                        <span className="font-medium tabular-nums text-ink">{o.price}</span>
                      </li>
                    );
                  })}
                </ul>
                <span
                  className={cn(
                    'mt-5 flex items-center justify-center gap-1.5 rounded-md py-2.5 text-[12.5px] font-semibold text-white transition-colors duration-500',
                    step >= 6 ? 'bg-accent' : HOTEL
                  )}
                >
                  {step >= 6 ? <><Check aria-hidden className="h-4 w-4" /> {t('form.paid')}</> : t('form.pay')}
                </span>
                <p className="mt-3 text-center text-[10.5px] text-ink-3">{t('form.note')}</p>
              </div>
            </PhoneFrame>
          </figure>

          {/* 4. Guest App */}
          <figure>
            <Caption when={steps[3].when} title={steps[3].title} active={step >= 7} />
            <PhoneFrame active={step >= 7}>
              <div className={cn('px-4 pb-5 pt-5 text-white', HOTEL)}>
                <p className="text-[11px] uppercase tracking-[0.1em] text-white/80">{t('app.room')}</p>
                <p className="mt-1 text-[17px] font-semibold">{t('app.hello')}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 p-3">
                {[
                  { Icon: KeyRound, label: t('app.key') },
                  { Icon: Phone, label: t('app.call') },
                  { Icon: Wifi, label: t('app.wifi') },
                  { Icon: UtensilsCrossed, label: t('app.restaurant') },
                ].map(({ Icon, label }, i) => (
                  <span
                    key={label}
                    className={cn(
                      'flex aspect-square flex-col items-center justify-center gap-2 rounded-xl bg-white text-center text-[11.5px] font-medium text-ink transition-all duration-500',
                      step >= 7 && i === 0 && 'ring-2 ring-[#7A4E2D]'
                    )}
                  >
                    <Icon aria-hidden className={cn('h-5 w-5', HOTEL_TEXT)} />
                    {label}
                  </span>
                ))}
              </div>
              <p className="mx-3 flex items-center gap-1.5 rounded-lg bg-white px-3 py-2.5 text-[11.5px] text-ink">
                <Sparkles aria-hidden className={cn('h-3.5 w-3.5 shrink-0', HOTEL_TEXT)} />
                {t('app.offer')}
              </p>
            </PhoneFrame>
          </figure>
        </div>

        <p className="mt-10 max-w-2xl text-[14px] text-ink-2">{t('note')}</p>
      </Container>
    </section>
  );
}

function Caption({ when, title, active }: { when: string; title: string; active: boolean }) {
  return (
    <figcaption className="mb-5 text-center">
      <span className={cn('inline-block rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.06em] transition-colors duration-500', active ? 'bg-ink text-white' : 'bg-white text-ink-2')}>
        {when}
      </span>
      <p className="mt-2 text-[15px] font-semibold text-ink">{title}</p>
    </figcaption>
  );
}

function Bubble({ show, side, children }: { show: boolean; side: 'in' | 'out'; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'max-w-[86%] rounded-lg px-2.5 py-2 shadow-sm transition-all duration-500',
        side === 'in' ? 'bg-white text-ink' : 'ml-auto bg-[#DCF8C6] text-ink',
        show ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      )}
    >
      {children}
      {side === 'out' && (
        <span className="mt-0.5 flex justify-end text-[#34B7F1]">
          <CheckCheck aria-hidden className="h-3.5 w-3.5" />
        </span>
      )}
    </div>
  );
}
