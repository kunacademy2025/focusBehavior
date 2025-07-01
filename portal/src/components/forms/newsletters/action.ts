"use server";
import "server-only";
import { newsletterSchema } from "./schema";
import { getTranslation } from "@/i18n";
import { NewsletterApis } from "@/services/api/collections/newsletters";

type FormState = {
  success: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
  message?: string;
};

export async function newsletterAction(
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
  const actionType = String(payload.get("actionType"));

  const parsed = newsletterSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      fields: Object.fromEntries(payload.entries()) as Record<string, string>,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  if (actionType === "unsubscribe") {
    try {
      const response = await NewsletterApis.getAll({
        queryParams: {
          filters: { email: { $eq: parsed.data.email } },
        },
      });

      if (response.success && response.data.length > 0) {
        const id = response.data[0].id;
        const deleteResponse = await NewsletterApis.delete(id);

        if (deleteResponse.success) {
          return {
            success: true,
            message: t("forms.unsubscribed"),
          };
        } else {
          return {
            success: false,
            message: t("forms.error_unsubscribe"),
          };
        }
      } else {
        return {
          success: false,
          message: t("forms.email_not_found"),
        };
      }
    } catch (error) {
      console.error("Error unsubscribing", error);
      return {
        success: false,
        message: t("forms.error_unsubscribe"),
      };
    }
  }

  try {
    const isSubscribed = await checkIfEmailSubscribed(parsed.data.email);

    if (isSubscribed) {
      return {
        success: false,
        message: t("forms.email_already_subscribed"),
      };
    }

    const response = await NewsletterApis.post({
      data: {
        ...parsed.data,
        date: new Date(),
      },
    });

    if (response.success) {
      return {
        ...parsed.data,
        success: true,
        message: t("forms.subscribed_message"),
      };
    } else {
      return {
        success: false,
        fields: parsed.data,
        errors: { api: ["API submission failed"] },
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
    };
  }
}

const checkIfEmailSubscribed = async (email: string) => {
  try {
    const response = await NewsletterApis.getAll({
      queryParams: {
        filters: {
          email: { $eq: email },
        },
      },
    });

    return response.success && response.data[0].email;
  } catch (error) {
    console.error("Error checking email subscription", error);
    return false;
  }
};
