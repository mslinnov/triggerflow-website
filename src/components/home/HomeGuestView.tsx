import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container, DsButton, SectionHeader } from '@/components/ds';

/**
 * Vraies Guest Apps de clients (captures du 08/11/2026, vue iPhone), chacune à l'identité de l'hôtel.
 * Les noms d'établissements sont affichés avec l'accord de Soufiane.
 */
const APPS = [
  { key: 'sofitel', name: 'Sofitel Marrakech', place: 'Palais Impérial & Spa · Marrakech' },
  { key: 'foliedouce', name: 'La Folie Douce Hôtels', place: 'Chamonix' },
  { key: 'mdm', name: 'Maisons du Monde Hôtel & Suites', place: 'Marseille' },
  { key: 'bellevigne', name: 'Bellevigne', place: 'Chambolle-Musigny · Bourgogne' },
] as const;

/** Ce que voient les clients : la Guest App de quatre hôtels clients, chacune à leurs couleurs. */
export function HomeGuestView() {
  const t = useTranslations('home2.guestView');
  return (
    <section className="relative overflow-hidden bg-mint/45 py-20 md:py-28">
      <Container>
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} titleMuted={t('titleMuted')} subtitle={t('subtitle')} align="left" />

        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {APPS.map((app, i) => (
            <li key={app.key} className={i % 2 === 1 ? 'lg:mt-12' : undefined}>
              <figure>
                <IPhone>
                  <Image
                    src={`/images/guest-apps/${app.key}-iphone.webp`}
                    alt={t('alt', { name: app.name })}
                    width={600}
                    height={1231}
                    sizes="240px"
                    className="block h-auto w-full"
                  />
                </IPhone>
                <figcaption className="mt-5 text-center">
                  <p className="text-[15px] font-semibold text-ink">{app.name}</p>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-2">{app.place}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-[15px] text-ink-2">{t('note')}</p>
          <DsButton href="/produit/guest-app" variant="link" arrow>
            {t('more')}
          </DsButton>
        </div>
      </Container>
    </section>
  );
}

/** Cadre d'iPhone : bord titane fin, écran noir, Dynamic Island, barre d'état, boutons latéraux. */
function IPhone({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[240px]">
      {/* Boutons latéraux */}
      <span aria-hidden className="absolute -left-[3px] top-[18%] h-6 w-[3px] rounded-l bg-[#2A2D2E]" />
      <span aria-hidden className="absolute -left-[3px] top-[26%] h-10 w-[3px] rounded-l bg-[#2A2D2E]" />
      <span aria-hidden className="absolute -left-[3px] top-[35%] h-10 w-[3px] rounded-l bg-[#2A2D2E]" />
      <span aria-hidden className="absolute -right-[3px] top-[30%] h-14 w-[3px] rounded-r bg-[#2A2D2E]" />
      <div className="rounded-[2.6rem] bg-gradient-to-b from-[#3A3D3F] to-[#1C1E1F] p-[3px] shadow-[0_30px_60px_-25px_rgba(0,43,40,0.55),0_8px_20px_-10px_rgba(0,0,0,0.3)]">
        <div className="rounded-[2.45rem] bg-black p-[7px]">
          <div className="relative overflow-hidden rounded-[2rem] bg-white">
            {/* Barre d'état */}
            <div aria-hidden className="relative flex h-9 items-center justify-between bg-white px-6 text-[11px] font-semibold text-black">
              <span>9:41</span>
              <span className="absolute left-1/2 top-2 h-[22px] w-[74px] -translate-x-1/2 rounded-full bg-black" />
              <span className="flex items-center gap-1">
                <span className="flex items-end gap-[1.5px]">
                  <span className="h-1 w-[3px] rounded-[1px] bg-black" />
                  <span className="h-1.5 w-[3px] rounded-[1px] bg-black" />
                  <span className="h-2 w-[3px] rounded-[1px] bg-black" />
                  <span className="h-2.5 w-[3px] rounded-[1px] bg-black" />
                </span>
                <span className="ml-1 flex h-[11px] w-[22px] items-center rounded-[3px] border border-black/40 p-[1.5px]">
                  <span className="h-full w-4/5 rounded-[1.5px] bg-black" />
                </span>
              </span>
            </div>
            {children}
            {/* Barre d'accueil */}
            <span aria-hidden className="absolute bottom-1.5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-black/80" />
          </div>
        </div>
      </div>
    </div>
  );
}
