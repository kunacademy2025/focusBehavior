"use client";
import { cn, getMediaInfo, getStrapiData, parseContent } from "@/utils";
import { ActionButtons } from "../action-buttons";
import { CustomImage } from "@/components/controls";
import { FC } from "react";
import { TextAndImageModel } from "@/models/dynamic.model";

interface Props {
  options: TextAndImageModel;
}

const DynamicTextAndImage: FC<Props> = ({ options }) => {
  const {
    title,
    subtitle,
    full_width_image,
    content,
    image,
    image_on_left,
    highlights,
    action_buttons,
  } = getStrapiData(options);

  const { imgUrl, alt, width, height } = getMediaInfo(image);

  return (
    <section className="bg-white">
      <div className={cn(full_width_image && "container py-16")}>
        {/* Content */}
        <div
          className={cn(
            !full_width_image ? "" : "container py-16",
            "flex flex-col gap-5 justify-center",
            "grid grid-cols-1 md:grid-cols-2 gap-y-4",
            image_on_left ? "order-2" : "order-1"
          )}
        >
          <div className="flex flex-col gap-y-6 justify-start">
            {title && (
              <h2 className="title text-2xl xl:text-3xl">
                <span className="text-xl xl:text-2xl">{subtitle}</span>
                <br />
                <span className="font-semibold">{title}</span>
              </h2>
            )}
            {content && (
              <div className="text-secondary">{parseContent(content)}</div>
            )}
          </div>
          {highlights && highlights.length > 0 && (
            <div className={"flex items-center flex-wrap gap-4 mt-10"}>
              {highlights.map((item: any, index: number) => {
                const { title, icon, brief } = getStrapiData(item);

                const { imgUrl, alt, width, height } = getMediaInfo(icon);

                return (
                  <div
                    key={index}
                    className="bg-veryLightGray hover:bg-lightGray/80 transition-all duration-300 aspect-square rounded-2xl flex flex-col justify-center items-center p-6"
                  >
                    <CustomImage
                      src={imgUrl}
                      alt={alt}
                      width={width}
                      height={height}
                      className="w-16 h-16  object-contain"
                    />

                    <div className="flex flex-col gap-y-2 items-center justify-center mt-6">
                      {title && (
                        <h4 className="text-sm text-darkGray">{title}</h4>
                      )}
                      {brief && (
                        <p className="text-xs whitespace-pre">{brief}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {action_buttons && action_buttons.length > 0 && (
            <ActionButtons buttons={action_buttons} />
          )}
        </div>

        {/* Image */}
        <div
          className={cn(
            "relative overflow-hidden",
            image_on_left ? "order-1" : "order-2"
          )}
        >
          <CustomImage
            src={imgUrl}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-full object-cover max-h-[500px]"
          />
        </div>
      </div>
    </section>
  );
};
export default DynamicTextAndImage;
