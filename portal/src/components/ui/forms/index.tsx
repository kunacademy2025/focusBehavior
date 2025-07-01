import type { Schema } from "zod";
import { startTransition, useEffect, useRef } from "react";
import {
  useForm,
  UseFormReturn,
  UseFormProps,
  FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type ServerErrors<T> = {
  [Property in keyof T]: string;
};

type FormProps<TFormValues extends FieldValues> = {
  action?: any;
  state?: any;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  useFormProps?: UseFormProps<TFormValues>;
  validationSchema?: Schema<TFormValues>;
  fieldErrors?: any[] | null;
  formError?: string | string[] | null | any;
  serverError?: ServerErrors<Partial<TFormValues>> | null;
  resetOnSuccess?: boolean | null;
  suppressToastMessage?: boolean;
  onSuccess?: (args: {
    reset: () => void;
    message?: string;
    state?: any;
    data?: any;
    fields: any;
  }) => void;
  onSubmit?: (data: TFormValues) => void;
  className?: string;
};

export const Form = <
  TFormValues extends Record<string, any> = Record<string, any>,
>({
  action,
  state,
  children,
  useFormProps,
  validationSchema,
  resetOnSuccess,
  className,
  onSuccess,
  onSubmit,
  suppressToastMessage,
  ...formProps
}: FormProps<TFormValues>) => {
  const router = useRouter();
  const methods = useForm<TFormValues>({
    ...useFormProps,
    ...(validationSchema && { resolver: zodResolver(validationSchema) }),
  });

  const formRef = useRef<HTMLFormElement>(null);
  const defaultValuesRef = useRef(useFormProps?.defaultValues);

  const handleSubmit = (data: TFormValues) => {
    startTransition(() => {
      if (onSubmit) {
        onSubmit(data); // override
      } else if (formRef.current) {
        action(new FormData(formRef.current)); // fallback
      }
    });
  };

  const onError = (errors: any) => {
    console.log("Validation errors:", errors);
  };

  useEffect(() => {
    const newDefaultValues = useFormProps?.defaultValues;
    const hasNewDefaults =
      newDefaultValues && newDefaultValues !== defaultValuesRef.current;

    if (resetOnSuccess && hasNewDefaults) {
      methods.reset(newDefaultValues as any);
      defaultValuesRef.current = newDefaultValues;
    }
  }, [methods, resetOnSuccess, useFormProps?.defaultValues]);

  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!methods?.formState.isSubmitSuccessful || hasRunRef.current) return;

    if (state.success) {
      hasRunRef.current = true;

      if (onSuccess) {
        onSuccess({
          reset: methods.reset,
          state,
          data: state?.data,
          fields: state?.fields,
        });
      } else {
        router.refresh();
      }

      if (!suppressToastMessage) {
        toast.success(state.message ?? "Form submitted successfully.");
      }
    } else if (state.message) {
      toast.error(state.message ?? "");
    }
  }, [state, methods, resetOnSuccess, router, onSuccess]);

  return (
    <form
      ref={formRef}
      {...(action ? { action } : {})}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        methods.handleSubmit(handleSubmit, onError)(e);
      }}
      {...formProps}
      className={className}
    >
      {children(methods)}
    </form>
  );
};
