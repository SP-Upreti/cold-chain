"use client";

import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { ReactNode, useEffect } from 'react';
import { recaptchaTokenManager } from '@/lib/recaptcha-token-manager';

function RecaptchaInitializer() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    if (executeRecaptcha) {
      recaptchaTokenManager.setExecuteRecaptcha(executeRecaptcha);
    } else {
      console.warn('RecaptchaProvider: executeRecaptcha not available yet');
    }

    return () => {
      recaptchaTokenManager.clearExecuteRecaptcha();
    };
  }, [executeRecaptcha]);

  return null;
}

export default function RecaptchaProvider({ children }: { children: ReactNode }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
  
  if (!siteKey) {
    console.error('RecaptchaProvider: NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set');
  }
  
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: false, // Load synchronously to ensure it's ready
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
      container={{
        parameters: {
          badge: 'inline', // Hide the floating badge
          theme: 'light',
        }
      }}
    >
      <RecaptchaInitializer />
      {children}
    </GoogleReCaptchaProvider>
  );
}
