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
            <li key={app.key} className={i % 2 === 1 ? 'lg:mt-10' : undefined}>
              <figure>
                <div className="mx-auto w-full max-w-[250px] rounded-[2.4rem] border-[7px] border-ink bg-ink p-0.5 shadow-[0_28px_60px_-24px_rgba(0,43,40,0.55)]">
                  <div className="overflow-hidden rounded-[1.9rem] bg-white">
                    <Image
                      src={`/images/guest-apps/${app.key}.webp`}
                      alt={t('alt', { name: app.name })}
                      width={540}
                      height={919}
                      sizes="250px"
                      className="block h-auto w-full"
                    />
                  </div>
                </div>
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
