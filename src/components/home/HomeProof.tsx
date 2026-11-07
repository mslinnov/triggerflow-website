import { useTranslations } from 'next-intl';
import { Container, LogoWall } from '@/components/ds';
import { brand } from '@/data/brand';
import { homeClients } from '@/data/clients';

export function HomeProof() {
  const t = useTranslations('home2.proof');
  const shown = brand.pms.slice(0, 5);
  return (
    <section className="border-y border-line bg-white py-12 md:py-16" aria-labelledby="proof-title">
      <Container>
        <p id="proof-title" className="text-center font-mono text-eyebrow font-medium uppercase text-ink-3">
          {t('title')}
        </p>
        <LogoWall names={homeClients} className="mt-8" />
        <p className="mt-6 text-center text-[14px] text-ink-3">
          {t('pms', { list: shown.join(', '), rest: brand.pms.length - shown.length })}
        </p>
      </Container>
    </section>
  );
}
