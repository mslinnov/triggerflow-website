import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Home, BookOpen, MessageCircle, CalendarCheck } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-24">
      <p className="text-7xl font-bold text-brand-primary">404</p>
      <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-brand-dark md:text-4xl">
        {t('title')}
      </h1>
      <p className="mt-3 max-w-md text-center text-gray-500">
        {t('description')}
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary/90"
        >
          <Home className="h-4 w-4" />
          {t('backHome')}
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-6 py-3 text-sm font-semibold text-brand-dark transition-colors hover:border-brand-primary hover:text-brand-primary"
        >
          <BookOpen className="h-4 w-4" />
          {t('blog')}
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-6 py-3 text-sm font-semibold text-brand-dark transition-colors hover:border-brand-primary hover:text-brand-primary"
        >
          <MessageCircle className="h-4 w-4" />
          {t('contact')}
        </Link>
        <a
          href="https://app.lemcal.com/@trigger-flow/demo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-6 py-3 text-sm font-semibold text-brand-dark transition-colors hover:border-brand-primary hover:text-brand-primary"
        >
          <CalendarCheck className="h-4 w-4" />
          {t('demo')}
        </a>
      </div>
    </main>
  );
}
