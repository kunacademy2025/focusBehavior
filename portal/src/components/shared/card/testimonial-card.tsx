import { CustomImage } from "@/components/controls";
import { cn, getMediaInfo } from "@/utils";
import React from "react";
import { CiImageOff } from "react-icons/ci";

export const TestimonialCard = ({
  name,
  profession,
  feedback,
  image,
  lang,
}: any) => {
  const { imgUrl, alt, width, height } = getMediaInfo(image);

  return (
    <div
      dir={lang === "en" ? "ltr" : "rtl"}
      className="shrink-0 w-[500px] grid grid-cols-[7rem,_1fr] rounded-lg overflow-hidden relative"
    >
      {imgUrl ? (
        <CustomImage
          src={imgUrl}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-44 object-cover"
        />
      ) : (
        <div className="w-full h-44 object-cover flex items-center justify-center bg-gray-200">
          <CiImageOff className="w-8 h-8 text-gray-400" />
        </div>
      )}
      <div className="bg-white w-full h-full max-h-44 p-4 text-secondary">
        <span className="block font-semibold text-lg mb-1 text-primary">
          {name}
        </span>
        <span className="block mb-3 text-sm font-medium">{profession}</span>
        <p className="block text-sm ">{feedback}</p>
      </div>
      <span
        className={cn(
          "text-7xl absolute top-2 text-primary/80",
          lang === "en" ? "right-2" : "left-2"
        )}
      >
        "
      </span>
    </div>
  );
};
