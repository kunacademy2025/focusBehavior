"use server"
import { CustomImage } from "@/components/controls";
import React from "react";
import FadeAnimation from "@/components/animation/FadeAnimation";
import { MediaModel } from "@/models/media.model";
import { getMediaInfo } from "@/utils";
import { getTranslation } from "@/i18n";
import Link from "next/link";
import { routes } from "@/config";

export const About = async ({
  title,
  subtitle,
  brief,
  image,
  lang,
}: {
  title: string;
  subtitle: string;
  lang: string;
  brief: string;
  image: MediaModel;
}) => {
  const { t } = await getTranslation("common", lang);
  const { imgUrl, alt, width, height } = getMediaInfo(image);

  return (
    <section className="bg-veryLightGray">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
        <div className="relative overflow-hidden">
          <FadeAnimation direction="left">
            <CustomImage
              src={imgUrl}
              alt={alt}
              width={width}
              height={height}
              className="w-full h-full object-cover max-h-[500px]"
            />
          </FadeAnimation>
        </div>
        <FadeAnimation
          direction="right"
          className="flex flex-col gap-5 justify-center narrow-container mr-auto py-16"
        >
          <h2 className="title text-2xl xl:text-3xl">
            <span className="text-xl xl:text-2xl">{subtitle}</span>
            <br />
            <span className="font-semibold">{title}</span>
          </h2>
          <p className="text-secondary">{brief}</p>
          <Link href={routes.about("", lang)} className="btn-primary">{t("buttons.read_more")}</Link>
        </FadeAnimation>
      </div>
    </section>
  );
};
