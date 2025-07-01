"use server";
import "server-only";
import { contactFormSchema } from "./schema";
import { getTranslation } from "@/i18n";
import { verifyCaptchaAction } from "@/services/google-recaptcha/verify-captcha-service";
import { ContactRequestApis } from "@/services/api/collections/contact-requests";

type FormState = {
  success: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
  message?: string;
};

export async function contactFormAction(
  prevState: FormState,
  payload: FormData
): Promise<FormState> {
  const { t } = await getTranslation("common");

  if (!(payload instanceof FormData)) {
    return {
      success: false,
      errors: { error: ["Invalid Form Data"] },
    };
  }

  const formData = Object.fromEntries(payload);

  // const captcha: string = String(payload.get("captcha"));
  // const verifyCaptcha = await verifyCaptchaAction(captcha);

  // if (!verifyCaptcha) {
  //   return {
  //     fields: Object.fromEntries(payload.entries()) as Record<string, string>,
  //     success: false,
  //     errors: { captcha: ["Captcha verification failed"] },
  //     message: "Captcha verification failed",
  //   };
  // }

  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      fields: Object.fromEntries(payload.entries()) as Record<string, string>,
      errors: parsed.error.flatten().fieldErrors,
      message: "Please check the fields below and correct any errors.",
    };
  }

  try {
    const { captcha, country, ...formData } = parsed.data;

    const submitData = {
      data: { ...formData, submit_date: new Date(), status: "New," },
    };

    const response = await ContactRequestApis.post(submitData);

    if (response.success) {
      return {
        ...parsed.data,
        success: true,
        message: t("forms.submit_message"),
      };
    } else {
      return {
        success: false,
        fields: parsed.data,
        errors: {
          api: ["API submission failed", response.status, response.error],
        },
        message: "Submission failed, please try again.",
      };
    }
  } catch (error: unknown) {
    console.error(`[Error] Form submission failed:`, error);
    return {
      success: false,
      fields: parsed.data,
      errors: {
        server: ["An unexpected error occurred during form submission."],
      },
      message: "Unexpected error, please try again.",
    };
  }
}
