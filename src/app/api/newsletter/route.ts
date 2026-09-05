import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY?.trim();
// Pas de repli sur une liste par defaut : l'ancien `|| 2` envoyait les
// inscrits vers une liste qui n'existe pas dans le compte, ce qui echouait
// silencieusement. Une configuration absente doit se voir, pas se deviner.
const BREVO_LIST_ID = Number(process.env.BREVO_LIST_ID) || 0;

interface NewsletterBody {
  email: string;
  honeypot?: string;
  locale?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: NewsletterBody = await request.json();
    const { email, honeypot, locale = 'fr' } = body;

    // Honeypot check — if filled, silently reject
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // Email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'invalid_email' },
        { status: 400 }
      );
    }

    // Configuration absente. En developpement on laisse passer pour ne pas
    // bloquer le travail sur le formulaire ; en production on echoue.
    //
    // Renvoyer un succes sans rien enregistrer a masque cinq mois de panne :
    // le visiteur voyait une confirmation, la liste restait vide, et rien ne
    // signalait le probleme. Une inscription perdue doit se voir tout de suite.
    if (!BREVO_API_KEY || !BREVO_LIST_ID) {
      const missing = [
        !BREVO_API_KEY && 'BREVO_API_KEY',
        !BREVO_LIST_ID && 'BREVO_LIST_ID',
      ].filter(Boolean);

      console.error(
        '[newsletter] Configuration manquante:',
        missing.join(', '),
        '— inscription NON enregistree:',
        email
      );

      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          { success: false, error: 'not_configured' },
          { status: 503 }
        );
      }
      return NextResponse.json({ success: true });
    }

    // Call Brevo API to create/update contact
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [BREVO_LIST_ID],
        attributes: {
          LOCALE: locale,
        },
        updateEnabled: true,
      }),
    });

    if (response.ok || response.status === 204) {
      return NextResponse.json({ success: true });
    }

    const errorData = await response.json().catch(() => null);

    // Contact already exists — treat as success
    if (errorData?.code === 'duplicate_parameter') {
      return NextResponse.json({ success: true });
    }

    console.error('[newsletter] Brevo API error:', response.status, errorData);
    // Le code d'erreur Brevo est remonte au client : il decrit la nature du
    // refus (`unauthorized`, `invalid_parameter`...) sans contenir de donnee
    // personnelle, et evite d'avoir besoin des logs serveur pour diagnostiquer.
    return NextResponse.json(
      {
        success: false,
        error: 'api_error',
        brevoStatus: response.status,
        brevoCode: typeof errorData?.code === 'string' ? errorData.code : null,
      },
      { status: 500 }
    );
  } catch (error) {
    console.error('[newsletter] Error:', error);
    return NextResponse.json(
      { success: false, error: 'server_error' },
      { status: 500 }
    );
  }
}
