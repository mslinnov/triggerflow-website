import { NextResponse } from 'next/server';
import {
  DEFAULT_MJML_THEME,
  EXAMPLE_VARIABLES,
  isMjmlTheme,
  TEMPS_FORT_CODES,
  templateFileName,
  type TempsFortCode,
} from '@/data/calendrier-marketing';
import { loadMjmlTemplate, previewFor, signTemplate } from '@/lib/calendrier-mjml';

/**
 * Fichiers d'un modèle MJML du calendrier marketing, servis à la demande plutôt
 * qu'embarqués dans la page (une quinzaine de modèles × MJML + HTML alourdirait
 * d'autant une page ouverte sur mobile depuis un QR) :
 * - `mjml` et `html` : le texte copié par « Copier le MJML » / « Copier le HTML »,
 *   signé « Modèle créé avec TriggerFlow » (signTemplate) ;
 * - `apercu` : le HTML rendu dans l'iframe de la page, valeurs d'exemple et champs
 *   surlignés. Encadrable par le site seul (next.config.ts), sans aucun script (CSP).
 *
 * `?theme=` choisit le thème (moderne par défaut) dans une liste fermée : un thème
 * inconnu ou pas encore livré pour ce code répond 404. `?telecharger=1` (mjml, html) :
 * le même texte, en pièce jointe `<code>-<thème>.<format>`, pour « Télécharger ».
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

  const query = new URL(request.url).searchParams;
  const theme = query.get('theme') ?? DEFAULT_MJML_THEME;
  if (!isMjmlTheme(theme)) return new NextResponse('Not found', { status: 404 });

  const template = loadMjmlTemplate(code as TempsFortCode, theme);
  if (!template) return new NextResponse('Not found', { status: 404 });

  // Cinq minutes : un modèle corrigé puis redéployé n'est pas servi longtemps dans sa version périmée.
  const headers: Record<string, string> = { 'Cache-Control': 'public, max-age=300' };
  switch (format as Format) {
    case 'mjml':
    case 'html': {
      const text = signTemplate(template)[format as 'mjml' | 'html'];
      if (query.get('telecharger') !== '1') {
        return new NextResponse(text, { headers: { ...headers, 'Content-Type': 'text/plain; charset=utf-8' } });
      }
      // Type neutre : Safari ajouterait « .txt » à un fichier text/plain nommé .mjml.
      const filename = templateFileName(code as TempsFortCode, theme, format as 'mjml' | 'html');
      return new NextResponse(text, {
        headers: { ...headers, 'Content-Type': 'application/octet-stream', 'Content-Disposition': `attachment; filename="${filename}"` },
      });
    }
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
