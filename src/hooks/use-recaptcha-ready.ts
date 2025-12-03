"use client";

import { useEffect, useState, useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { recaptchaTokenManager } from "@/lib/recaptcha-token-manager";

/**
 * Hook to check if reCAPTCHA is ready to use
 * Returns true when reCAPTCHA is initialized and ready
 */
export function useRecaptchaReady() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (executeRecaptcha) {
      setIsReady(recaptchaTokenManager.isReady());
    }
  }, [executeRecaptcha]);

  return isReady;
}

/**
 * Hook to get reCAPTCHA token
 * Returns a function to generate token for a specific action
 */
export function useRecaptchaToken() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const getToken = useCallback(
    async (action: string = "submit"): Promise<string | null> => {
      if (!executeRecaptcha) {
        console.warn("useRecaptchaToken: reCAPTCHA not available");
        return null;
      }

      try {
        const token = await executeRecaptcha(action);
        return token;
      } catch (error) {
        console.error("useRecaptchaToken: Error generating token", error);
        return null;
      }
    },
    [executeRecaptcha]
  );

  return { getToken, isReady: !!executeRecaptcha };
}
