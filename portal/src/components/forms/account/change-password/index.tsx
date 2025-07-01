"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { useTranslation } from "@/i18n/client";
import { useForms } from "@/hooks/useForms";
import { z } from "zod";
import toast from "react-hot-toast";
import { changePasswordFormAction } from "./action";
import { changePasswordSchema } from "./schema";
import { Input } from "@nextui-org/react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

export const ChangePasswordForm = ({ lang }: { lang: string }) => {
  const { t } = useTranslation("common");
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    state: formState,
    formAction,
    isPending,
    captcha,
  } = useForms(changePasswordFormAction, { success: false });

  const formRef = useRef<HTMLFormElement>(null);

  const {
    formState: { errors, isSubmitSuccessful },
    control,
    setValue,
    register,
    handleSubmit,
    reset,
  } = useForm<z.output<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });

  useEffect(() => {
    setValue("captcha", "");
  }, [captcha]);

  useEffect(() => {
    if (isSubmitSuccessful && formState.success) {
      toast.success(t("forms.submit_message"));
      reset();
      // window.location.reload();
    }
  }, [reset, isSubmitSuccessful, formState.success, t, formState.message]);

  const inputClass = {
    label: "text-secondary",
    input: [
      "bg-transparent outline-none border-none",
      "text-darkGray",
      "placeholder:text-secondary",
      "focus:ring-0 focus:outline-none",
    ],
    innerWrapper: "bg-transparent",
    inputWrapper: [
      "bg-veryLightGray ring-1 ring-gray-200 rounded-lg",
      "!cursor-text transition-all duration-300",
      "focus-within:ring-2 focus-within:ring-primary",
    ],
  };

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-primary font-medium text-xl lg:text-2xl mb-4">
        {t("elements.account.account_info")}
      </h3>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={(evt) => {
          evt.preventDefault();
          handleSubmit(() => {
            startTransition(() => formAction(new FormData(formRef.current!)));
          })(evt);
        }}
      >
        <div className="pb-7 md:pb-8 lg:pb-10 px-2 pt-4">
          <div className="flex flex-col gap-y-4 sm:gap-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="currentPassword"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <Input
                    {...field}
                    variant={"flat"}
                    placeholder={t("forms.enter_your_current_password")}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label="toggle password visibility"
                      >
                        {isVisible ? (
                          <RiEyeOffFill className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <RiEyeFill className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    classNames={inputClass}
                    isInvalid={invalid}
                    errorMessage={
                      error?.message || t("forms.enter_your_current_password")
                    }
                  />
                )}
              />
              <Controller
                name="newPassword"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <Input
                    {...field}
                    variant={"flat"}
                    placeholder={t("forms.enter_your_new_password")}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label="toggle password visibility"
                      >
                        {isVisible ? (
                          <RiEyeOffFill className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <RiEyeFill className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    classNames={inputClass}
                    isInvalid={invalid}
                    errorMessage={
                      error?.message || t("forms.enter_your_new_password")
                    }
                  />
                )}
              />
              <Controller
                name="passwordConfirmation"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <Input
                    {...field}
                    variant={"flat"}
                    placeholder={t("forms.confirm_your_new_password")}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label="toggle password visibility"
                      >
                        {isVisible ? (
                          <RiEyeOffFill className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <RiEyeFill className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    classNames={inputClass}
                    isInvalid={invalid}
                    errorMessage={
                      error?.message || t("forms.confirm_your_new_password")
                    }
                  />
                )}
              />
            </div>
          </div>
        </div>

        <div className="relative flex justify-end w-full pb-2 mt-5 sm:ltr:ml-auto sm:rtl:mr-auto lg:pb-0">
          <Button
            type="submit"
            variant="solid"
            isLoading={isPending}
            className="bg-primary text-white font-medium px-8 py-2 rounded-lg"
          >
            {t("elements.account.apply")}
          </Button>
          <input type="hidden" id="captcha" {...register(`captcha`)} />
        </div>
      </form>
    </div>
  );
};
