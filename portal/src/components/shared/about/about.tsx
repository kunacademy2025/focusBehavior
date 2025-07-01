"use server";
import { CustomImage } from "@/components/controls";
import React from "react";
import FadeAnimation from "@/components/animation/FadeAnimation";
import { getTranslation } from "@/i18n";
import { getMediaInfo } from "@/utils";
import { MediaModel } from "@/models/media.model";

export const About = async ({
  title,
  brief,
  about_title,
  about_subtitle,
  about_brief,
  about_image,
  lang,
  disableMoreButton
}: {
  title: string;
  brief: string;
  about_title: string;
  about_subtitle: string;
  about_brief: string;
  about_image: MediaModel;
  lang: string;
  disableMoreButton?: boolean;
}) => {
  const { t } = await getTranslation("common", lang);
  const { imgUrl, alt, width, height } = getMediaInfo(about_image);

  return (
    <section className="bg-veryLightGray">
      <FadeAnimation direction="down" className="container py-10">
        <h2 className="title">{title}</h2>
        <p className="subtitle">{brief}</p>
      </FadeAnimation>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
        <div className="relative overflow-hidden">
          <FadeAnimation direction="left">
            <CustomImage
              src={imgUrl}
              alt={alt}
              width={width}
              height={height}
              className="w-full h-full object-cover max-h-[450px]"
            />
          </FadeAnimation>
        </div>
        <FadeAnimation direction="right" className="narrow-container ml-auto py-16">
          <h2 className="title text-2xl xl:text-3xl">
            <span className="text-xl xl:text-2xl">{about_subtitle}</span>
            <br /> <span className="font-semibold">{about_title}</span>
          </h2>
          <p className="text-secondary mt-4">{about_brief}</p>
          {
            !disableMoreButton &&
            (
              <button className="mt-6 bg-primary text-white hover:bg-primary/85 px-6 py-2 rounded-lg w-fit transition">
                {t("buttons.read_more")}
              </button>
            )
          }
        </FadeAnimation>
      </div>
    </section>
  );
};
