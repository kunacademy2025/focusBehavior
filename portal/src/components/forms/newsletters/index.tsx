"use client";
import { CustomImage } from "@/components/controls";
import { Button, Input } from "@nextui-org/react";
import FadeAnimation from "@/components/animation/FadeAnimation";
import { FC, startTransition, useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEnvelope } from "react-icons/fa6";
import { MediaModel } from "@/models/media.model";
import { getMediaInfo } from "@/utils";
import { useTranslation } from "@/i18n/client";
import { newsletterAction } from "./action";
import { newsletterSchema } from "./schema";

interface Props {
  title: string;
  intro: string;
  lang: string;
  image: MediaModel;
}

export const NewsLetter: FC<Props> = ({ title, intro, image, lang }) => {
  const { imgUrl, alt, width, height } = getMediaInfo(image);
  const { t } = useTranslation("common", lang);

  const [formState, formAction] = useActionState(newsletterAction, {
    success: false,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors: rhfErrors },
  } = useForm<z.output<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
      date: new Date().toISOString(),
      ...(formState?.fields ?? {}),
    },
  });

  const handleUnsubscribe = () => {
    const email = watch("email");

    if (!email) {
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("actionType", "unsubscribe");

    startTransition(() => formAction(formData));
  };

  const inputClass = {
    label: "text-mediumGray",
    input: [
      "bg-transparent outline-none border-none",
      "text-darkGray",
      "placeholder:text-mediumGray",
      "focus:ring-0",
    ],
    innerWrapper: "bg-transparent",
    inputWrapper: [
      "bg-white",
      "!cursor-text",
      "rounded-lg transition-all duration-300",
    ],
  };

  return (
    <section className="bg-primary w-full overflow-hidden">
      <div className="container grid grid-cols-1 lg:grid-cols-2 w-full h-full gap-y-2 lg:gap-6 ">
        <FadeAnimation direction="left">
          <div className="text-white flex flex-col justify-center h-full gap-y-4 pt-6 lg:pt-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl leading-normal">
              {intro}
            </h2>
            <p className="font-extrabold text-xl lg:text-2xl uppercase">
              {title}
            </p>
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
              className="flex items-center gap-x-4"
            >
              <Input
                type="email"
                variant={"flat"}
                placeholder={t("terms.email_address")}
                classNames={inputClass}
                startContent={
                  <FaEnvelope className="text-2xl text-default-400 pointer-events-none flex-shrink-0 ltr:mr-1 rtl:ml-1" />
                }
                {...register("email")}
                errorMessage={
                  rhfErrors.email?.message ? (
                    <span className="text-white">
                      {rhfErrors.email?.message || t("messages.valid_email")}
                    </span>
                  ) : null
                }
              />
              <Button
                type="submit"
                variant="light"
                className="bg-white hover:bg-primary text-red-500 hover:text-white hover:ring-2 ring-white font-semibold px-4 py-2 rounded-lg transition-all duration-300"
              >
                {t("buttons.subscribe")}
              </Button>
            </form>
            {formState.message && (
              <div className="mt-2 text-sm text-white flex items-end">
                <p className="mt-1 text-white">{formState.message}</p>
                {formState.message === t("forms.email_already_subscribed") && (
                  <button
                    type="button"
                    onClick={handleUnsubscribe}
                    className="underline font-medium ltr:ml-1 rtl:mr-1"
                  >
                    {t("buttons.unsubscribe")}
                  </button>
                )}
              </div>
            )}
          </div>
        </FadeAnimation>
        <FadeAnimation direction="right" className="h-full lg:px-10 py-8">
          <CustomImage
            src={imgUrl}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-full rounded-2xl object-cover lg:h-80"
          />
        </FadeAnimation>
      </div>
    </section>
  );
};
