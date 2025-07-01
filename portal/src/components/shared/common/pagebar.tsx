"use client";
import React, { FC } from "react";
import FadeAnimation from "@/components/animation/FadeAnimation";
import { useResponsiveImage } from "@/hooks";
import { CustomImage } from "@/components/controls";
import { BreadcrumbsGroup } from "@/components/ui";
import { PagebarModel } from "@/models/pagebar.model";

interface Props {
  pagebar: PagebarModel;
  breadcrumbs: any[];
}

export const Pagebar: FC<Props> = ({ pagebar, breadcrumbs }) => {
  const { title, bg_desktop, bg_mobile } = pagebar;

  const { imgUrl, alt, width, height } = useResponsiveImage(
    bg_desktop,
    bg_mobile
  );

  return (
    <section className="relative bg-white h-[60vh]">
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-neutral-950/90 to-neutral-950/0 from-[30%]" />

      <div className="relative w-full h-full">
        <CustomImage
          src={imgUrl}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
          priority={true}
        />

        <div className="absolute  z-20 w-full h-fit bottom-0 overflow-hidden">
          <div className="w-full h-fit container flex flex-col items-start justify-end  text-white py-10">
            <FadeAnimation inViewOnce={false} direction="right">
              <h1 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl mt-3">
                {title}
              </h1>
            </FadeAnimation>
            <FadeAnimation
              inViewOnce={false}
              direction="left"
              className={"mt-4"}
            >
              <BreadcrumbsGroup breadcrumbItems={breadcrumbs} />
            </FadeAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};
