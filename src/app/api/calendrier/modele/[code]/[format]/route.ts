import { NextResponse } from 'next/server';
import {
  DEFAULT_MJML_THEME,
  EXAMPLE_VARIABLES,
  isMjmlTheme,
  TEMPS_FORT_CODES,
  type TempsFortCode,
} from '@/data/calendrier-marketing';
import { loadMjmlTemplate, previewFor } from '@/lib/calendrier-mjml';

/**
 * Fichiers d'un modèle MJML du calendrier marketing, servis à la demande plutôt
 * qu'embarqués dans la page (une quinzaine de modèles × MJML + HTML alourdirait
 * d'autant une page ouverte sur mobile depuis un QR) :
 * - `mjml` et `html` : le texte copié par « Copier le MJML » / « Copier le HTML » ;
 * - `apercu` : le HTML rendu dans l'iframe de la page, valeurs d'exemple et champs
 *   surlignés. Encadrable par le site seul (next.config.ts), sans aucun script (CSP).
 *
 * `?theme=` choisit le thème (moderne par défaut) dans une liste fermée : un thème
 * inconnu ou pas encore livré pour ce code répond 404.
 */

const FORMATS = ['mjml', 'html', 'apercu'] as const;
type Format = (typeof FORMATS)[number];

const PREVIEW_CSP =
  "default-src 'none'; img-src https: data:; style-src 'unsafe-inline' https:; font-src https: data:; frame-ancestors 'self'; base-uri 'none'; form-action 'none'";

export async function GET(request: Request, { params }: { params: Promise<{ code: string; format: string }> }) {
  const { code, format } = await params;
  if (!(TEMPS_FORT_CODES as readonly string[]).includes(code) || !(FORMATS as readonly string[]).includes(format)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const theme = new URL(request.url).searchParams.get('theme') ?? DEFAULT_MJML_THEME;
  if (!isMjmlTheme(theme)) return new NextResponse('Not found', { status: 404 });

  const template = loadMjmlTemplate(code as TempsFortCode, theme);
  if (!template) return new NextResponse('Not found', { status: 404 });

  // Cinq minutes : un modèle corrigé puis redéployé n'est pas servi longtemps dans sa version périmée.
  const headers: Record<string, string> = { 'Cache-Control': 'public, max-age=300' };
  switch (format as Format) {
    case 'mjml':
      return new NextResponse(template.mjml, { headers: { ...headers, 'Content-Type': 'text/plain; charset=utf-8' } });
    case 'html':
      return new NextResponse(template.html, { headers: { ...headers, 'Content-Type': 'text/plain; charset=utf-8' } });
    case 'apercu':
      return new NextResponse(previewFor(template, EXAMPLE_VARIABLES), {
        headers: {
          ...headers,
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Security-Policy': PREVIEW_CSP,
          'X-Robots-Tag': 'noindex',
        },
      });
  }
}
