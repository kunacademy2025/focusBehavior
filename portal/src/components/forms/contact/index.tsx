"use client";

import { cn, getMediaInfo } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { contactFormSchema } from "./schema";
import { Button } from "@nextui-org/react";
import { Input, Textarea } from "rizzui";
import { CustomImage } from "@/components/controls";
import FadeAnimation from "@/components/animation/FadeAnimation";
import { MediaModel } from "@/models/media.model";
import { useTranslation } from "@/i18n/client";
import { useForms } from "@/hooks/useForms";
import { contactFormAction } from "./action";
import { z } from "zod";
import toast from "react-hot-toast";
import { routes } from "@/config";
import { PhoneInput } from "@/components/ui/forms/phone-input";

export const ContactForm = ({
  image,
  lang,
}: {
  image: MediaModel;
  lang: string;
}) => {
  const { t } = useTranslation("common");

  const { imgUrl, alt, width, height } = getMediaInfo(image);

  const {
    state: formState,
    formAction,
    isPending,
    countryCode,
    captcha,
    country,
  } = useForms(
    contactFormAction,
    { success: false },
    routes.thank_you("", lang)
  );

  const formRef = useRef<HTMLFormElement>(null);

  const {
    formState: { errors, isSubmitSuccessful },
    control,
    setValue,
    register,
    handleSubmit,
    reset,
  } = useForm<z.output<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    setValue("captcha", captcha);
    setValue("country", country);
  }, [captcha, country]);

  useEffect(() => {
    if (isSubmitSuccessful && formState.success) {
      toast.success(t("forms.submit_message"));
      reset();
    }
  }, [reset, isSubmitSuccessful, formState.success, t, formState.message]);

  return (
    <div className={cn("w-full h-full bg-veryLightGray")}>
      <div
        className={cn(
          "grid gris-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6 lg:max-h-[650px] "
        )}
      >
        <FadeAnimation direction={"left"}>
          <div
            className={cn(
              "lg:ml-auto w-full lg:max-w-[650px]",
              "px-6 sm:px-8 lg:px-10 py-8"
            )}
          >
            <h2 className="capitalize text-xl md:text-2xl lg:text-3xl leading-normal font-semibold text-primary mb-6">
              {t("contact.contact_us")}
            </h2>

            <form
              ref={formRef}
              action={formAction}
              onSubmit={(evt) => {
                evt.preventDefault();
                handleSubmit(() => {
                  startTransition(() =>
                    formAction(new FormData(formRef.current!))
                  );
                })(evt);
              }}
              className={cn("flex flex-grow flex-col w-full", "mt-4")}
            >
              <div className="flex flex-col gap-4">
                <div className={cn("grid gap-x-2 gap-y-4", "md:grid-cols-2")}>
                  <Input
                    placeholder={t("forms.first_name")}
                    {...register("first_name")}
                    className="bg-white"
                    error={errors?.first_name?.message as string}
                  />
                  <Input
                    placeholder={t("forms.last_name")}
                    {...register("last_name")}
                    className="bg-white"
                    error={errors?.last_name?.message as string}
                  />
                </div>
                <Input
                  placeholder={t("forms.email")}
                  type="email"
                  {...register("email")}
                  className="bg-white"
                  error={errors?.email?.message as string}
                />
                <PhoneInput
                  control={control}
                  id="phone_number"
                  placeholder={t("forms.phone_number")}
                  error={errors?.phone_number?.message as string}
                  defaultCountry={countryCode ?? "LB"}
                />

                <Textarea
                  placeholder={t("forms.your_message")}
                  {...register(`message`)}
                  className="bg-white"
                  error={errors?.message?.message as string}
                />
              </div>
              <Button
                type="submit"
                isLoading={isPending}
                className={cn("bg-primary text-white mt-6")}
              >
                {t("buttons.submit")}
              </Button>
              <input type="hidden" id="country" {...register(`country`)} />
              <input type="hidden" id="captcha" {...register(`captcha`)} />
            </form>
          </div>
        </FadeAnimation>

        <FadeAnimation direction={"right"}>
          <div className={cn("w-full h-full")}>
            <CustomImage
              src={imgUrl}
              alt={alt}
              width={width}
              height={height}
              className="w-full h-full lg:max-h-[700px] object-cover object-center"
            />
          </div>
        </FadeAnimation>
      </div>
    </div>
  );
};
