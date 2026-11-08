import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { CheckCheck, Crown, Mail, MessageCircle, MessageSquareText, Smartphone } from 'lucide-react';
import { Container, DsButton, SectionHeader } from '@/components/ds';
import { cn } from '@/lib/utils';

/**
 * Ce que voient les clients, canal par canal.
 * Email : modèle réel de l'Hôtel Beaucour (Strasbourg), variables remplies avec un nom fictif.
 * WhatsApp et SMS : contenus réels du compte de démo « Hôtel Le Jardin » (relevés le 08/11/2026).
 * Guest App : vraie app d'un client. Fidélité : carte d'exemple aux couleurs de l'hôtel de démo.
 */
export function HomeGuestView() {
  const t = useTranslations('home2.guestView');
  const whatsapp = t.raw('whatsapp.messages') as { from: 'hotel' | 'guest'; text: string; time: string }[];
  return (
    <section className="relative overflow-hidden bg-mint/45 py-20 md:py-28">
      <Container>
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} titleMuted={t('titleMuted')} subtitle={t('subtitle')} align="left" />

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {/* Email */}
          <Block icon={<Mail className="h-4 w-4" />} label={t('email.label')} caption={t('email.caption')} className="lg:col-span-5 lg:row-span-2">
            <div className="overflow-hidden rounded-xl border border-line bg-white">
              <div className="border-b border-line px-4 py-3 text-[12.5px]">
                <p className="text-ink-3">
                  {t('email.from')} <span className="font-semibold text-ink">Hôtel Beaucour</span>
                </p>
                <p className="mt-0.5 font-semibold text-ink">{t('email.subject')}</p>
              </div>
              <div className="relative max-h-[520px] overflow-hidden">
                <Image src="/images/guest-apps/email-beaucour.webp" alt={t('email.alt')} width={640} height={1260} sizes="(min-width: 1024px) 40vw, 100vw" className="h-auto w-full" />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />
              </div>
            </div>
          </Block>

          {/* WhatsApp */}
          <Block icon={<MessageCircle className="h-4 w-4" />} label="WhatsApp" caption={t('whatsapp.caption')} className="lg:col-span-4">
            <div className="space-y-2 rounded-xl bg-[#ECE5DD] p-3 text-[13px] leading-snug">
              {whatsapp.map((m) => (
                <div
                  key={m.time}
                  className={cn(
                    'max-w-[88%] rounded-lg px-3 py-2 text-ink shadow-sm',
                    m.from === 'hotel' ? 'ml-auto rounded-tr-sm bg-[#DCF8C6]' : 'rounded-tl-sm bg-white'
                  )}
                >
                  {m.text}
                  <span className="mt-1 flex items-center justify-end gap-1 text-[10.5px] text-ink-3">
                    {m.time}
                    {m.from === 'hotel' && <CheckCheck aria-hidden className="h-3.5 w-3.5 text-[#34B7F1]" />}
                  </span>
                </div>
              ))}
            </div>
          </Block>

          {/* Guest App */}
          <Block icon={<Smartphone className="h-4 w-4" />} label={t('app.label')} caption={t('app.caption')} className="lg:col-span-3 lg:row-span-2">
            <div className="mx-auto w-full max-w-[220px] rounded-[2.2rem] bg-gradient-to-b from-[#3A3D3F] to-[#1C1E1F] p-[3px] shadow-[0_24px_50px_-24px_rgba(0,43,40,0.55)]">
              <div className="rounded-[2.05rem] bg-black p-[6px]">
                <div className="relative overflow-hidden rounded-[1.75rem] bg-white">
                  <span aria-hidden className="absolute left-1/2 top-2 z-10 h-[18px] w-[62px] -translate-x-1/2 rounded-full bg-black" />
                  <Image src="/images/guest-apps/sofitel-iphone.webp" alt={t('app.alt')} width={600} height={1231} sizes="220px" className="h-auto w-full pt-7" />
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-[13px] font-semibold text-ink">Sofitel Marrakech</p>
          </Block>

          {/* SMS */}
          <Block icon={<MessageSquareText className="h-4 w-4" />} label="SMS" caption={t('sms.caption')} className="lg:col-span-4">
            <div className="rounded-xl bg-white p-3">
              <p className="text-center text-[10.5px] text-ink-3">{t('sms.when')}</p>
              <p className="mt-2 max-w-[90%] rounded-2xl rounded-bl-sm bg-[#E9E9EB] px-3.5 py-2.5 text-[13px] leading-snug text-black">{t('sms.text')}</p>
            </div>
          </Block>

          {/* Fidélité */}
          <Block icon={<Crown className="h-4 w-4" />} label={t('loyalty.label')} caption={t('loyalty.caption')} className="lg:col-span-12">
            <div className="grid items-center gap-6 md:grid-cols-[1fr_340px]">
              <ul className="grid gap-3 sm:grid-cols-3">
                {(t.raw('loyalty.points') as { title: string; text: string }[]).map((p) => (
                  <li key={p.title} className="rounded-xl bg-white p-4">
                    <p className="text-[14px] font-semibold text-ink">{p.title}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-2">{p.text}</p>
                  </li>
                ))}
              </ul>
              <div className="relative overflow-hidden rounded-2xl bg-ink p-5 text-white shadow-[0_20px_40px_-20px_rgba(0,43,40,0.6)]">
                <div aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-mint/15" />
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Hôtel Le Jardin</p>
                <p className="mt-1 text-[17px] font-semibold">{t('loyalty.card.name')}</p>
                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.08em] text-white/60">{t('loyalty.card.pointsLabel')}</p>
                    <p className="text-[26px] font-medium tabular-nums">2 450</p>
                  </div>
                  <span className="rounded-full bg-peach px-2.5 py-1 text-[11px] font-semibold text-ink">{t('loyalty.card.tier')}</span>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full w-[72%] rounded-full bg-mint" />
                </div>
                <p className="mt-2 text-[11.5px] text-white/75">{t('loyalty.card.next')}</p>
              </div>
            </div>
          </Block>
        </div>

        <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-[14px] text-ink-2">{t('note')}</p>
          <DsButton href="/produit/guest-app" variant="link" arrow>
            {t('more')}
          </DsButton>
        </div>
      </Container>
    </section>
  );
}

function Block({ icon, label, caption, className, children }: { icon: React.ReactNode; label: string; caption: string; className?: string; children: React.ReactNode }) {
  return (
    <article className={cn('flex flex-col rounded-2xl bg-white/70 p-5 ring-1 ring-ink/5', className)}>
      <header className="mb-4">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-mint/70">{icon}</span>
          {label}
        </p>
        <p className="mt-2 text-[14px] leading-snug text-ink-2">{caption}</p>
      </header>
      <div className="flex-1">{children}</div>
    </article>
  );
}
