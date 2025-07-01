"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { useTranslation } from "@/i18n/client";
import { useForms } from "@/hooks/useForms";
import { z } from "zod";
import toast from "react-hot-toast";
import { accountFormAction } from "./action";
import { accountFormSchema, defaultValues } from "./schema";
import { Input } from "@nextui-org/react";
import { FaEnvelope, FaUser } from "react-icons/fa6";
import UserModel from "@/services/api/collections/user/model";
import { PhoneInput } from "@/components/ui/forms/phone-input";

export const AccountDetailsForm = ({
  lang,
  userData,
}: {
  lang: string;
  userData: UserModel;
}) => {
  const { t } = useTranslation("common");

  const {
    state: formState,
    formAction,
    isPending,
    countryCode,
    captcha,
    country,
  } = useForms(accountFormAction, { success: false });

  const formRef = useRef<HTMLFormElement>(null);

  const {
    formState: { errors, isSubmitSuccessful },
    control,
    setValue,
    register,
    handleSubmit,
    reset,
  } = useForm<z.output<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: defaultValues(userData),
    mode: "onChange",
  });

  useEffect(() => {
    setValue("captcha", "");
    setValue("country", country);
  }, [captcha, country]);

  useEffect(() => {
    if (isSubmitSuccessful && formState.success) {
      toast.success(t("forms.submit_message"));
      reset();
      window.location.reload();
    }
  }, [reset, isSubmitSuccessful, formState.success, t, formState.message]);

  const inputClass = {
    label: "text-mediumGray",
    input: [
      "bg-transparent outline-none border-none",
      "text-darkGray",
      "placeholder:text-mediumGray",
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Controller
              name="first_name"
              control={control}
              render={({ field, fieldState: { invalid, error } }) => (
                <Input
                  {...field}
                  variant={"flat"}
                  placeholder="First Name"
                  classNames={inputClass}
                  startContent={
                    <FaUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0 ltr:mr-1 rtl:ml-1" />
                  }
                  isInvalid={invalid}
                  errorMessage={
                    error ? error.message : "Please enter your first name"
                  }
                />
              )}
            />
            <Controller
              name="last_name"
              control={control}
              render={({ field, fieldState: { invalid, error } }) => (
                <Input
                  {...field}
                  variant={"flat"}
                  placeholder="Last Name"
                  classNames={inputClass}
                  startContent={
                    <FaUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0 ltr:mr-1 rtl:ml-1" />
                  }
                  isInvalid={invalid}
                  errorMessage={
                    error ? error.message : "Please enter your last name"
                  }
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { invalid, error } }) => (
                <Input
                  {...field}
                  type="email"
                  variant={"flat"}
                  placeholder="Email Address"
                  classNames={inputClass}
                  startContent={
                    <FaEnvelope className="text-2xl text-default-400 pointer-events-none flex-shrink-0 ltr:mr-1 rtl:ml-1" />
                  }
                  isInvalid={invalid}
                  errorMessage={
                    error ? error.message : "Please enter a valid email"
                  }
                />
              )}
            />
            <PhoneInput
              control={control}
              id="phone_number"
              placeholder="Phone Number"
              error={errors?.phone_number?.message as string}
              defaultCountry={countryCode ?? "LB"}
            />
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
          <input type="hidden" id="country" {...register(`country`)} />
          <input type="hidden" id="captcha" {...register(`captcha`)} />
          <input
            type="hidden"
            id="id"
            {...register(`id`)}
            value={userData.id}
          />
        </div>
      </form>
    </div>
  );
};
