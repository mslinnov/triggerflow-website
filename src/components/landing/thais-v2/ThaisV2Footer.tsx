'use client';

import Image from 'next/image';
import { Container } from '@/components/ui';

export function ThaisV2Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#0A0F1C] py-10">
      <Container>
        <div className="flex flex-col items-center space-y-6">
          {/* Logos */}
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo-white.webp"
              alt="TriggerFlow"
              width={120}
              height={32}
              className="h-7 w-auto"
            />
            <span className="text-xl text-white/30">×</span>
            <Image
              src="/images/partners/thais-logo.svg"
              alt="Thaïs PMS"
              width={100}
              height={32}
              className="h-6 w-auto brightness-0 invert"
            />
          </div>

          {/* Legal Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500">
            <a
              href="/fr/mentions-legales"
              className="transition-colors hover:text-white"
            >
              Mentions légales
            </a>
            <span className="text-zinc-700">•</span>
            <a href="/fr/cgv" className="transition-colors hover:text-white">
              CGV
            </a>
            <span className="text-zinc-700">•</span>
            <a href="/fr/cgu" className="transition-colors hover:text-white">
              CGU
            </a>
            <span className="text-zinc-700">•</span>
            <a
              href="/fr/contrat-prestation"
              className="transition-colors hover:text-white"
            >
              Contrat de prestation
            </a>
            <span className="text-zinc-700">•</span>
            <a href="/fr/dpa" className="transition-colors hover:text-white">
              DPA
            </a>
            <span className="text-zinc-700">•</span>
            <a
              href="/fr/politique-confidentialite"
              className="transition-colors hover:text-white"
            >
              Politique de confidentialité
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-center text-sm text-zinc-600">
            © {currentYear} TriggerFlow. Tous droits réservés.
          </p>
        </div>
      </Container>
    </footer>
  );
}
