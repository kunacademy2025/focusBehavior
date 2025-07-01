"use client";
import { CustomImage } from "@/components/controls";
import { routes } from "@/config";
import SpeakerModel from "@/services/api/collections/speakers/model";
import { getMediaInfo } from "@/utils";
import Link from "next/link";
import React from "react";

export const SpeakerCardThree = ({
  item,
  lang,
}: {
  item: SpeakerModel;
  lang: string;
}) => {
  const { name, slug, profession, speaker_image } = item;

  const { imgUrl, alt, width, height } = getMediaInfo(speaker_image);

  return (
    <>
      <Link href={routes.speakers(slug, lang)}>
        <div className="group w-fit cursor-pointer rounded-lg flex items-center px-3 gap-x-3 bg-veryLightGray hover:bg-primary transition">
          <CustomImage
            src={imgUrl}
            alt={alt}
            width={width}
            height={height}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col py-4 px-4  rounded-b-2xl">
            <h4 className="text-black text-xs group-hover:text-white transition font-medium">
              {name}
            </h4>
            {/* {profession && (
              <span className="text-xs text-gray-500 py-1 group-hover:text-white transition rounded-full uppercase">
                {profession}
              </span>
            )} */}
          </div>
        </div>
      </Link>
    </>
  );
};
