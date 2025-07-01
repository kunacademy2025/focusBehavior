"use client";
import React, { FC } from "react";
import { Input } from "@nextui-org/react";
import { FaArrowRightLong } from "react-icons/fa6";
import FadeAnimation from "@/components/animation/FadeAnimation";
import { useModal } from "@/context";
import { useTranslation } from "@/i18n/client";

interface Props {
  title: string;
  intro: string;
  lang: string;
}

export const Search: FC<Props> = ({ title, intro, lang }) => {
  const { openModal } = useModal();
  const { t } = useTranslation("common", lang);

  return (
    <section id="search-section" className="bg-veryLightGray">
      <div className="container grid grid-cols-1 lg:grid-cols-2 w-full h-full gap-y-8 gap-x-6 py-16">
        <FadeAnimation direction="left">
          <div className="flex flex-col justify-center gap-y-4 lg:w-9/12">
            <h2 className="text-xl sm:text-2xl font-medium leading-normal text-primary">
              {title}
            </h2>
            <p className="font-medium text-base sm:text-lg text-secondary">
              {intro}
            </p>
          </div>
        </FadeAnimation>
        <FadeAnimation direction="right" className={"flex items-center"}>
          <div className="xl:w-9/12">
            <h4 className="font-bold text-2xl text-black mb-4">
              {t("messages.discover_events")}
            </h4>
            <form
              className="flex items-center gap-x-4 cursor-pointer"
              onClick={() => openModal("search")}
            >
              <Input
                placeholder={`${t("terms.search")}...`}
                classNames={{
                  label: "text-mediumGray",
                  input: [
                    "bg-transparent outline-none border-none shadow-none",
                    "text-darkGray",
                    "placeholder:text-mediumGray",
                    "focus:ring-0",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "bg-white",
                    "!cursor-text",
                    "rounded-lg ring-1 ring-lightGray transition-all duration-300",
                  ],
                }}
              />
              <button
                className="btn-primary inline-flex items-center gap-x-2"
                onClick={() => openModal("search")}
              >
                {t("buttons.search")}
                <FaArrowRightLong className="min-w-[14px] min-h-[14px] rtl:scale-x-[-1]" />
              </button>
            </form>
          </div>
        </FadeAnimation>
      </div>
    </section>
  );
};
