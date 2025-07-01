"use client";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { CustomImage } from "@/components/controls";
import FadeAnimation from "@/components/animation/FadeAnimation";
import { MediaModel } from "@/models/media.model";
import { getMediaInfo } from "@/utils";
import { useModal } from "@/context";
import { useTranslation } from "@/i18n/client";

export const BecomeMember = ({
  title,
  intro,
  image,
  lang,
}: {
  title: string;
  intro: string;
  lang: string;
  image: MediaModel;
}) => {
  return (
    <section className="overflow-hidden bg-white pb-10">
      <div className="relative flex flex-col items-center justify-center px-12 pb-48 pt-12 md:pt-24">
        <Copy title={title} intro={intro} lang={lang} />
        <MockupScreen image={image} />
      </div>
    </section>
  );
};

const Copy = ({
  title,
  intro,
  lang,
}: {
  title: string;
  intro: string;
  lang: string;
}) => {
  const { openModal } = useModal();
  const { t } = useTranslation("common", lang);

  return (
    <div className="pb-[10rem] lg:pb-[24rem]">
      <FadeAnimation direction="down">
        <h1 className="max-w-4xl text-center text-4xl font-black leading-[1.15] md:text-6xl md:leading-[1.15]">
          {title}
        </h1>
      </FadeAnimation>
      <FadeAnimation direction="up">
        <p className="mx-auto my-4 max-w-3xl text-center text-base leading-relaxed md:my-6 md:text-xl md:leading-relaxed">
          {intro}
        </p>
        <div className="mb-1.5 rounded-full bg-secondary w-fit mx-auto">
          <button
            onClick={() => openModal("login")}
            className="flex  origin-top-left items-center rounded-full text-white bg-primary py-3 px-6 text-sm transition-transform hover:-rotate-2"
          >
            <span className="rounded-full bg-white/30 px-2 py-0.5 font-medium ">
              {t("elements.home.hey")}!
            </span>
            <span className="ltr:ml-1.5 rtl:mr-1.5 ltr:mr-1 rtl:ml-1 inline-block">{t("elements.home.become_member")}</span>
            <FiArrowUpRight className="ltr:mr-2 rtl:ml-2 rtl:-scale-x-100 inline-block" />
          </button>
        </div>
      </FadeAnimation>
    </div>
  );
};

const MockupScreen = ({ image }: any) => {
  const { imgUrl, alt, width, height } = getMediaInfo(image);

  return (
    <div className="absolute bottom-0 left-1/2 h-[300px] lg:h-[500px] w-[calc(100vw_-_56px)] max-w-[1100px] -translate-x-1/2 overflow-hidden rounded-t-2xl bg-zinc-900 p-0.5">
      <CustomImage
        src={imgUrl}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover object-bottom"
      />
    </div>
  );
};
