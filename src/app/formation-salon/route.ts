import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_MAX_AGE, COOKIE_NAME, isValidPassword, isValidSession, sessionToken } from '@/lib/formation-salon/auth';
import { FORMATION_HTML } from '@/lib/formation-salon/html';

/**
 * Formation de l'équipe du stand Equip'Hôtel, protégée par un mot de passe
 * partagé (voir src/lib/formation-salon/auth.ts).
 *
 * Hors de [locale] et exclue du middleware next-intl : c'est un document
 * interne en français, pas une page du site.
 */

export const dynamic = 'force-dynamic';

// `.trim()` : un secret collé avec un retour à la ligne ne correspondrait à
// aucune saisie.
const PASSWORD = process.env.FORMATION_SALON_PASSWORD?.trim();

const PATH = '/formation-salon';

// Rien de cette route ne doit être indexé ni gardé en cache partagé : la
// formation est derrière un cookie, une copie en cache la servirait à tous.
const PRIVATE_HEADERS = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'private, no-store',
  'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
};

function loginPage(error: boolean, status: number): NextResponse {
  const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow, noarchive">
<title>Formation stand Equip'Hôtel</title>
<style>
  :root { --paper: #F3F6F5; --surface: #FFFFFF; --ink: #132624; --muted: #536461; --line: #D7E0DD; --brand: #006F68; --ko: #B42318; }
  @media (prefers-color-scheme: dark) { :root { --paper: #0E1A19; --surface: #152422; --ink: #E7EFED; --muted: #9DB0AC; --line: #2A3B39; --brand: #3FB8AE; --ko: #F97066; } }
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 16px; background: var(--paper); color: var(--ink); font-family: system-ui, -apple-system, sans-serif; }
  form { width: 100%; max-width: 380px; display: grid; gap: 14px; padding: 24px; background: var(--surface); border: 1px solid var(--line); border-radius: 16px; }
  h1 { margin: 0; font-size: 24px; line-height: 1.15; }
  p { margin: 0; color: var(--muted); }
  label { font-weight: 600; font-size: 15px; }
  input { width: 100%; font: inherit; font-size: 17px; padding: 12px 14px; min-height: 48px; border-radius: 12px; border: 1.5px solid var(--line); background: var(--paper); color: var(--ink); }
  button { min-height: 52px; border: 0; border-radius: 12px; background: var(--brand); color: #fff; font: inherit; font-weight: 700; font-size: 16.5px; cursor: pointer; }
  .error { color: var(--ko); font-weight: 600; }
</style>
</head>
<body>
<form method="post" action="${PATH}">
  <h1>Formation stand Equip'Hôtel</h1>
  <p>Réservée à l'équipe du stand TriggerFlow.</p>
  ${error ? '<p class="error" role="alert">Mot de passe incorrect.</p>' : ''}
  <label for="password">Mot de passe</label>
  <input id="password" name="password" type="password" autocomplete="current-password" required autofocus>
  <button type="submit">Entrer</button>
</form>
</body>
</html>`;
  return new NextResponse(html, { status, headers: PRIVATE_HEADERS });
}

// Sans secret configuré, la route reste fermée : jamais la formation par défaut.
function notConfigured(): NextResponse {
  return new NextResponse('Formation indisponible.', {
    status: 503,
    headers: { ...PRIVATE_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  if (!PASSWORD) return notConfigured();

  if (await isValidSession(request.cookies.get(COOKIE_NAME)?.value, PASSWORD)) {
    return new NextResponse(FORMATION_HTML, { status: 200, headers: PRIVATE_HEADERS });
  }

  return loginPage(false, 401);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!PASSWORD) return notConfigured();

  const form = await request.formData().catch(() => null);
  const input = form?.get('password');

  if (typeof input !== 'string' || !(await isValidPassword(input.trim(), PASSWORD))) {
    return loginPage(true, 401);
  }

  // 303 : le rechargement de la page ne renvoie pas le formulaire.
  const response = NextResponse.redirect(new URL(PATH, request.url), 303);
  response.headers.set('Cache-Control', 'private, no-store');
  response.cookies.set(COOKIE_NAME, await sessionToken(PASSWORD), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: PATH,
    maxAge: COOKIE_MAX_AGE,
  });
  return response;
}
