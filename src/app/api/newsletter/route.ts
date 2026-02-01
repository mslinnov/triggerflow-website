import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = Number(process.env.BREVO_LIST_ID) || 2;

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

    // If Brevo API key is not configured, return success (dev mode)
    if (!BREVO_API_KEY) {
      console.warn('[newsletter] BREVO_API_KEY not set — skipping actual subscription');
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
    return NextResponse.json(
      { success: false, error: 'api_error' },
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
