"use client";

import { Button, Input } from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgetPasswordSchema,
  forgetPasswordSchema,
} from "./forget-password.schema";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa6";
import { useModal } from "@/context/modal.context";
import { forgotPassword } from "@/services/api/collections/user/auth";
import { useTranslation } from "@/i18n/client";
import { useUserInfo } from "@/hooks";

export const ForgetPasswordForm = ({ lang }: { lang: string }) => {
  const { t } = useTranslation("common", lang);

  const [isLoading, setLoading] = useState(false);
  const { closeModal } = useModal();

  const { handleSubmit, control } = useForm<any>({
    resolver: zodResolver(forgetPasswordSchema),
    mode: "onChange",
  });

    const { jwt } = useUserInfo();
  

  const onSubmit: SubmitHandler<ForgetPasswordSchema> = async (data) => {
    setLoading(true);

    try {
      const result = await forgotPassword(data.email, jwt);

      if (!result.status === 200) {
        toast.error("Invalid username or password.");
      } else {
        closeModal("forget_password");
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
          name="email"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              type="email"
              variant={"flat"}
              placeholder={t("terms.email_title")}
              classNames={inputClass}
              startContent={
                <FaEnvelope className="text-2xl text-default-400 pointer-events-none flex-shrink-0 ltr:mr-1 rtl:ml-1" />
              }
              isInvalid={invalid}
              errorMessage={error ? error.message : t("forms.valid_email")}
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
