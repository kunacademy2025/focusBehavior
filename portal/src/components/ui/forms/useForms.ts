"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CountryCode } from "libphonenumber-js";
import useCountry from "./useCountry";
import { MetadataProps, useFormMetadata } from "./useFormMeta";
import { useGoogleReCaptcha } from "@/services/google-recaptcha/use-google-recaptcha";

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
  captcha?: string;
  country?: string;
  countryCode?: CountryCode;
  metadata: MetadataProps | null;
} {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [state, formAction, isPending] = useActionState<T, FormData>(
    action,
    initialState
  );

  const { country } = useCountry();
  const { metadata } = useFormMetadata();

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
    const isSuccess = (state as FormState)?.success;

    if (isSuccess && thankYouUrl) {
      router.push(thankYouUrl);
    }
  }, [state, router, thankYouUrl]);

  return {
    state,
    formAction,
    isPending,
    captcha,
    country: country?.name || "",
    countryCode: country?.code as CountryCode,
    metadata: metadata,
  };
}
