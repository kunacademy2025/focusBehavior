"use client";

import { Button, Input } from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Loader } from "rizzui";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa6";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { signIn } from "next-auth/react";
import { MdOutlinePassword } from "react-icons/md";
import { LoginSchema, loginSchema } from "./login.schema";
import { useTranslation } from "@/i18n/client";
import { loginUser } from "@/services/api/collections/user/auth";
import { useRouter, useSearchParams } from "next/navigation";

export const AdminLoginForm = ({ lang }: { lang: string }) => {
  const { t } = useTranslation("common", lang);

  const [isLoading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/";

  const { handleSubmit, control } = useForm<any>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    setLoading(true);

    const signingInToast = toast(() => (
      <div className="flex items-center">
        <Loader />
        <span className="ltr:ml-2 rtl:mr-2 font-medium">
          {t("forms.signing_in")}
        </span>
      </div>
    ));

    try {
      const result: any = await signIn("credentials", {
        redirect: false,
        ...data,
      });

      if (!result?.ok || result?.error) {
        toast.error(t("forms.invalid_login"));
      } else {
        const response = await loginUser(data?.email, data?.password);

        if (response.success) {
          if (response?.data?.user?.isAdmin) {
            toast.success(t("forms.signed_successfully"));
            router.push(callbackUrl);
          } else {
            toast.error(t("You are not authorized to access this page."));
          }
        }
      }
    } catch (error) {
      toast.error(t("forms.couldnt_login"));
    } finally {
      toast.dismiss(signingInToast);
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
              errorMessage={error ? error.message : t("forms.valid_password")}
            />
          )}
        />

        <Button
          type="submit"
          variant="solid"
          isLoading={isLoading}
          className="bg-primary text-white font-medium px-4 py-2 rounded-lg"
        >
          {t("buttons.login")}
        </Button>
      </form>
    </>
  );
};
