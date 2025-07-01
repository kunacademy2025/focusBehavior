"use client";

import { Button, Input } from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { FaEnvelope, FaUser } from "react-icons/fa6";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useModal } from "@/context/modal.context";
import { MdOutlinePassword } from "react-icons/md";
import { fetchCountryData } from "@/services";
import { signIn } from "next-auth/react";
import { RegisterSchema, registerSchema } from "./register.schema";
import { createUser } from "@/services/api/collections/user/auth";
import { useTranslation } from "@/i18n/client";
import { PhoneInput } from "@/components/ui/forms/phone-input";

export const RegisterForm = ({ lang }: { lang: string }) => {
  const { t } = useTranslation("common", lang);

  const { openModal, closeModal } = useModal();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isLoading, setLoading] = useState(false);
  const [defaultCountry, setDefaultCountry] = useState<string>("LB");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCountryData();
        const countryCode = data?.code;
        setDefaultCountry(countryCode);
      } catch (error) {
        console.error("Error fetching IP information:", error);
      }
    };
    fetchData();
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    setLoading(true);

    const { first_name, last_name, email, phone_number, password } = data;

    try {
      const response: any = await createUser(
        first_name,
        last_name,
        email,
        phone_number,
        password
      );

      if (!response?.success) {
        throw new Error("User name or email are already taken!");
      }

      const formData = { email: email, password: password };
      const loginResult: any = await signIn("credentials", {
        redirect: false,
        ...formData,
      });

      if (loginResult?.error) {
        throw new Error("Sign-in failed after registration.");
      }

      closeModal("register");
      toast.success(t("forms.register_successfully"));
      window.location.reload();
    } catch (error: any) {
      const errorMessage =
        error?.message === "500"
          ? t("forms.server_error")
          : t("forms.couldnt_register");

      toast.error(error?.message);
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
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-y-4"
      >
        <Controller
          name="first_name"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              variant={"flat"}
              placeholder={t("forms.first_name")}
              classNames={inputClass}
              startContent={
                <FaUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0 ltr:mr-1 rtl:ml-1" />
              }
              isInvalid={invalid}
              errorMessage={error ? error.message : t("forms.valid_email")}
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
              placeholder={t("forms.last_name")}
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
              placeholder={t("terms.email_title")}
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
          placeholder={t("forms.phone_number")}
          error={errors?.phone_number?.message as string}
          defaultCountry={defaultCountry ?? "LB"}
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
              errorMessage={
                error ? error.message : "Please enter your password"
              }
            />
          )}
        />
        <Controller
          name="confirmPassword"
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
          {t("forms.sign_up")}
        </Button>
      </form>
      <div className="border-t border-gray-200 mt-8 py-4">
        <div className="flex flex-col gap-y-2 text-base">
          <p className="text-secondary">{t("forms.already_have_account")}</p>
          <button
            type="button"
            onClick={() => {
              closeModal("register");
              openModal("login");
            }}
            className="w-fit"
          >
            <p className="text-primary hover:underline">
              {t("forms.login_now")}
            </p>
          </button>
        </div>
      </div>
    </>
  );
};
