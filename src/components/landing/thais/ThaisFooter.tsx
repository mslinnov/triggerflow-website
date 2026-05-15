'use client';

import Image from 'next/image';
import { Container } from '@/components/ui';

export function ThaisFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white py-8">
      <Container>
        <div className="flex flex-col items-center space-y-6">
          {/* Logos */}
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo.webp"
              alt="TriggerFlow"
              width={120}
              height={32}
              className="h-6 w-auto"
            />
            <span className="text-lg font-light text-zinc-300">×</span>
            <Image
              src="/images/partners/thais-logo.svg"
              alt="Thaïs PMS"
              width={120}
              height={32}
              className="h-6 w-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* Legal Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-600">
            <a
              href="/fr/mentions-legales"
              className="transition-colors hover:text-brand-primary"
            >
              Mentions légales
            </a>
            <span className="text-zinc-300">•</span>
            <a href="/fr/cgv" className="transition-colors hover:text-brand-primary">
              CGV
            </a>
            <span className="text-zinc-300">•</span>
            <a href="/fr/cgu" className="transition-colors hover:text-brand-primary">
              CGU
            </a>
            <span className="text-zinc-300">•</span>
            <a
              href="/fr/contrat-prestation"
              className="transition-colors hover:text-brand-primary"
            >
              Contrat de prestation
            </a>
            <span className="text-zinc-300">•</span>
            <a href="/fr/dpa" className="transition-colors hover:text-brand-primary">
              DPA
            </a>
            <span className="text-zinc-300">•</span>
            <a
              href="/fr/politique-confidentialite"
              className="transition-colors hover:text-brand-primary"
            >
              Politique de confidentialité
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-center text-sm text-zinc-500">
            © {currentYear} TriggerFlow. Tous droits réservés.
          </p>
        </div>
      </Container>
    </footer>
  );
}
