"use server";
import "server-only";
import { removeEmptyFields } from "./removeEmptyFields";

export type FormState = {
  success: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
  message?: string;
  data?: any;
};

type Mode = "post" | "put" | "auto";

type ActionOptions<TParsed> = {
  schema: Zod.ZodSchema<TParsed>;
  testing?: boolean;
  api?: {
    post: (data: any) => Promise<any>;
    put: (id: string | number, data: any) => Promise<any>;
  };
  transform?: (formData: Record<string, any>) => Record<string, any>;
  serialize?: (data: Partial<TParsed>) => Record<string, any>;
  mode?: Mode;
  beforeSubmit?: (parsedData: TParsed) => Promise<FormState | void>;
  onSubmit?: (parsedData: TParsed) => Promise<any>; // override post/put
  customSuccessMessage?: string | ((data: any) => string);
  customFailureMessage?: string;
  onSuccess?: (response: any, parsedData: TParsed) => Promise<FormState | void>;
  onError?: (response: any, parsedData: TParsed) => Promise<FormState | void>;
  onCatchError?: (error: any, parsedData: TParsed) => FormState;
  wrapData?: boolean;
  noAuth?: boolean;
};

export async function handleFormAction<TParsed>(
  prevState: FormState,
  payload: FormData,
  options: ActionOptions<TParsed>
): Promise<FormState> {
  if (options.testing) {
    console.log("[PAYLOAD] -> ", payload);
  }

  if (!(payload instanceof FormData)) {
    return {
      success: false,
      data: null,
      errors: { form: ["Invalid Form Data"] },
    };
  }

  let formData: Record<string, any> = Object.fromEntries(
    (payload as any).entries()
  );

  // Optional transformation (cast strings to numbers, booleans, connect objects, etc.)
  if (options.transform) {
    formData = options.transform(formData);
  }

  if (options.testing) {
    console.log("[FORMDATA] -> ", formData);
  }

  const parsed = options.schema.safeParse(formData);

  if (!parsed.success) {
    console.log("[VALIDATION::ERRORS]", parsed.error);
    return {
      success: false,
      data: null,
      fields: Object.fromEntries((payload as any).entries()) as Record<
        string,
        string
      >,
      errors: Object.fromEntries(
        Object.entries(parsed.error.flatten().fieldErrors).map(
          ([key, value]) => [key, (value as string[]) ?? []]
        )
      ),
      message: "Please check the fields below and correct any errors.",
    };
  }

  try {
    const { id, ...rest } = parsed.data as TParsed & { id?: string | number };

    const serializedData = options.serialize
      ? options.serialize(removeEmptyFields(rest) as Partial<TParsed>)
      : removeEmptyFields(rest);

    const requestData =
      (options.wrapData ?? true) ? { data: serializedData } : serializedData;

    if (options.testing) {
      console.log("[REQUEST DATA] -> ", requestData);

      return {
        success: false,
        data: null,
        errors: {
          api: ["API submission failed"],
        },
        message: "Submission failed, please try again.",
      };
    }

    if (typeof options.beforeSubmit === "function") {
      const earlyResult = await options.beforeSubmit(parsed.data);
      if (earlyResult) {
        return earlyResult;
      }
    }

    const response = options.onSubmit
      ? await options.onSubmit(parsed.data)
      : await defaultSubmit({
          id,
          mode: options.mode || "auto",
          api: options.api!,
          data: requestData,
          noAuth: options.noAuth,
        });

    if (response.success) {
      if (typeof options.onSuccess === "function") {
        const handledSuccess = await options.onSuccess(response, parsed.data);
        if (handledSuccess) return handledSuccess;
      }

      return {
        fields: serializeFields(parsed.data as Record<string, any>),
        success: true,
        data: response?.data,
        message:
          typeof options.customSuccessMessage === "function"
            ? options.customSuccessMessage(response)
            : options.customSuccessMessage ||
              "Your request submitted successfully!",
      };
    }

    if (typeof options.onError === "function") {
      const handledError = await options.onError(response, parsed.data);
      if (handledError) return handledError;
    }

    return {
      success: false,
      data: null,
      fields: serializeFields(parsed.data as Record<string, any>),
      errors: {
        api: ["API submission failed", response.status, response.error].filter(
          Boolean
        ),
      },
      message:
        options.customFailureMessage || "Submission failed, please try again.",
    };
  } catch (error) {
    console.error(`[Error] Form submission failed:`, error);
    return (
      options.onCatchError?.(error, parsed.data) ?? {
        success: false,
        data: null,
        fields: serializeFields(parsed.data as Record<string, any>),
        errors: {
          server: ["An unexpected error occurred during form submission."],
        },
        message: "Unexpected error, please try again.",
      }
    );
  }
}

function serializeFields(obj: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      k,
      typeof v === "object" ? JSON.stringify(v) : String(v),
    ])
  );
}

async function defaultSubmit({
  id,
  api,
  mode,
  data,
  noAuth,
}: {
  id?: string | number;
  api: {
    post: (data: any, options?: Record<string, any>) => Promise<any>;
    put: (
      id: string | number,
      data: any,
      options?: Record<string, any>
    ) => Promise<any>;
  };
  mode: Mode;
  data: any;
  noAuth?: boolean;
}) {
  const options = noAuth ? { noAuth: true } : {};

  switch (mode) {
    case "put":
      return api.put(id!, data, options);
    case "post":
      return api.post(data, options);
    case "auto":
    default:
      return !!id ? api.put(id, data, options) : api.post(data, options);
  }
}
