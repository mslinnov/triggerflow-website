import type { ReactNode } from 'react';
import { useFormatter } from 'next-intl';
import { Container } from '@/components/ui';

interface LegalPageLayoutProps {
  title: string;
  version?: string;
  effectiveDate?: string;
  lastUpdated?: string;
  children: ReactNode;
}

export function LegalPageLayout({
  title,
  version,
  effectiveDate,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  const format = useFormatter();

  const formatDate = (iso: string) =>
    format.dateTime(new Date(iso), {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const showMeta = Boolean(version || effectiveDate || lastUpdated);
  const showLastUpdated = Boolean(lastUpdated && lastUpdated !== effectiveDate);

  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <article className="prose prose-zinc mx-auto max-w-3xl">
          <header className="not-prose mb-10">
            <h1 className="text-3xl font-bold text-brand-dark md:text-4xl">
              {title}
            </h1>
            {showMeta && (
              <div className="mt-3 space-y-0.5 text-sm text-zinc-500">
                {version && <p>Version {version}</p>}
                {effectiveDate && (
                  <p>En vigueur depuis le {formatDate(effectiveDate)}</p>
                )}
                {showLastUpdated && lastUpdated && (
                  <p>Dernière modification le {formatDate(lastUpdated)}</p>
                )}
              </div>
            )}
          </header>
          {children}
        </article>
      </Container>
    </section>
  );
}
