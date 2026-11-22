'use client';

import { useEffect, useRef } from 'react';

interface MailPreviewProps {
  /** Adresse de l'aperçu (iframe) ; null tant que le modèle n'est pas exporté : aperçu de repli. */
  src: string | null;
  title: string;
  fallback: { title: string; objet: string; periode: string };
}

/**
 * Aperçu d'un e-mail : l'iframe de 600 px natifs est mise à l'échelle de son cadre (transform),
 * sans script dans l'iframe (sandbox). Sans export du modèle, un repli propre : jamais d'iframe cassée.
 */
export function MailPreview({ src, title, fallback }: MailPreviewProps) {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frameRef.current;
    if (!el || !src) return;
    // La hauteur de l'iframe suit --s en CSS (campagnes-fetes.css) : seule l'échelle est posée ici.
    const observer = new ResizeObserver(() => {
      const scale = el.clientWidth / 600;
      if (scale) el.style.setProperty('--s', String(scale));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  if (!src) {
    return (
      <div className="cf-mail">
        <div className="cf-mail-fb">
          <small>{fallback.periode}</small>
          <strong>{fallback.objet}</strong>
          <span>{fallback.title}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="cf-mail" ref={frameRef}>
      <iframe className="cf-mail-if" title={title} src={src} loading="lazy" sandbox="" referrerPolicy="no-referrer" tabIndex={-1} aria-hidden="true" scrolling="no" />
    </div>
  );
}
