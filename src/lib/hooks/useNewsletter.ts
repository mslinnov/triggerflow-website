'use client';

import { useState } from 'react';

type NewsletterStatus = 'idle' | 'loading' | 'success' | 'error';

export function useNewsletter() {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<NewsletterStatus>('idle');

  const subscribe = async (locale: string) => {
    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, honeypot, locale }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setStatus('idle');
  };

  return { email, setEmail, honeypot, setHoneypot, status, subscribe, reset };
}
