"use server";
import "server-only";
import { getTranslation } from "@/i18n";
import { verifyCaptchaAction } from "@/services/google-recaptcha/verify-captcha-service";
import { processPaymentSchema } from "./schema";
import { recreatePaymentLink } from "@/services/api/collections/payments/actions";

type FormState = {
  success: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
  message?: string;
  payment_link?: string;
  remote_pay_link?: string;
  payment_lnk_created?: string;
  pay_link_msg?: string;
};

export async function processPaymentAction(
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

  const parsed = processPaymentSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      fields: Object.fromEntries(payload.entries()) as Record<string, string>,
      errors: parsed.error.flatten().fieldErrors,
      message: "Please check the fields below and correct any errors.",
    };
  }

  try {
    const { captcha, id, ...formData } = parsed.data;

    if (!id) {
      throw new Error("ID is missing");
    }

    const response = await recreatePaymentLink(Number(id));

    if (response.success) {
      const {
        payment_link,
        remote_pay_link,
        payment_lnk_created,
        pay_link_msg,
      } = response.data;

      return {
        ...parsed.data,
        success: true,
        message: t("forms.submit_message"),
        payment_link,
        remote_pay_link,
        payment_lnk_created,
        pay_link_msg,
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
