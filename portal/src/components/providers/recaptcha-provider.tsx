"use client";

import { RECAPTCHA_SITE_KEY } from "@/config";
import { GoogleReCaptchaProvider } from "@/services/google-recaptcha";

export function RecaptchaProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const site_key = RECAPTCHA_SITE_KEY;
  return (
    <GoogleReCaptchaProvider reCaptchaKey={site_key}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
