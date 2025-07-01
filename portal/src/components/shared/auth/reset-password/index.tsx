"use client";

import { Button, Input } from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import { useState } from "react";
import { ResetPassword } from "@/services/api/collections/user/auth";
import { useTranslation } from "@/i18n/client";
import { useUserInfo } from "@/hooks";
import { MdOutlinePassword } from "react-icons/md";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from "./reset-password.schema";

export const ResetPasswordForm = ({
  lang,
  code,
}: {
  lang: string;
  code: string;
}) => {
  const { t } = useTranslation("common", lang);

  const [isLoading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { handleSubmit, control } = useForm<any>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const { jwt } = useUserInfo();

  const onSubmit: SubmitHandler<ResetPasswordSchema> = async (data) => {
    setLoading(true);

    try {
      const result: { status: number } = await ResetPassword(
        code,
        data.password,
        data.passwordConfirmation,
        jwt
      );

      if (result?.status !== 200) {
        toast.error("Invalid username or password.");
      } else {
        toast.success("Password reset link has been sent to your email!");
      }
    } catch (error) {
      toast.error(
        "Could not send you a reset password email. Please contact administrators."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = {
    label: "text-mediumGray",
    input: [
      "bg-transparent outline-none border-none",
      "text-secondary",
      "placeholder:text-mediumGray",
      "focus:ring-0",
    ],
    innerWrapper: "bg-transparent",
    inputWrapper: [
      "bg-veryLightGray",
      "!cursor-text",
      "rounded-lg transition-all duration-300",
    ],
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-y-4"
      >
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              variant={"flat"}
              placeholder={t("forms.enter_password")}
              startContent={
                <MdOutlinePassword className="text-2xl text-default-400 pointer-events-none flex-shrink-0 ltr:mr-1 rtl:ml-1" />
              }
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
                error ? error.message : "Please enter your password"
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
              placeholder={t("forms.confirm_password")}
              startContent={
                <MdOutlinePassword className="text-2xl text-default-400 pointer-events-none flex-shrink-0 ltr:mr-1 rtl:ml-1" />
              }
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
                error ? error.message : "Please confirm your password"
              }
            />
          )}
        />
        <Button
          type="submit"
          variant="solid"
          isLoading={isLoading}
          className="bg-primary text-white font-medium px-4 py-2 rounded-lg"
        >
          {t("forms.reset_password")}
        </Button>
      </form>
    </>
  );
};
