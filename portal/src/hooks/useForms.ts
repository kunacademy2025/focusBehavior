"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CountryCode } from "libphonenumber-js";
import { useGoogleReCaptcha } from "@/services/google-recaptcha/use-google-recaptcha";
import useCountry from "./useCountry";
type FormState = {
  success: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
  message?: string;
};

export function useForms<T>(
  action: (prevState: T, data: FormData) => Promise<T>,
  initialState: Awaited<T>,
  thankYouUrl?: string
): {
  state: T;
  formAction: (data: FormData) => void;
  isPending: boolean;
  countryCode?: CountryCode;
  captcha?: string;
  country?: string;
} {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [state, formAction, isPending] = useActionState<T, FormData>(
    action,
    initialState
  );

  const { country } = useCountry();

  const [captcha, setCaptcha] = useState<string | undefined>(undefined);

  const router = useRouter();

  useEffect(() => {
    const handleCaptcha = async () => {
      if (executeRecaptcha) {
        const token = await executeRecaptcha("onSubmit");
        setCaptcha(token);
        
      }
    };
    handleCaptcha();
  }, [executeRecaptcha]);

  useEffect(() => {
    if ((state as FormState).success && thankYouUrl) router.push(thankYouUrl);
  }, [(state as FormState)?.success]);

  return {
    state,
    formAction,
    isPending,
    countryCode: country?.code as CountryCode,
    captcha,
    country: country?.name || "",
  };
}
