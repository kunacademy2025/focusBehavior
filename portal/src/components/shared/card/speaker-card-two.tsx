"use client";
import { CustomImage } from "@/components/controls";
import { cn, getMediaInfo, getStrapiData } from "@/utils";
import { CiImageOff } from "react-icons/ci";
import React from "react";
import SpeakerModel from "@/services/api/collections/speakers/model";
import { routes } from "@/config";
import Link from "next/link";

export const SpeakerCardTwo = ({
  item,
  lang,
}: {
  item: SpeakerModel;
  lang: string;
}) => {
  const { name, profession, brief, speaker_image, social_links, slug } = item;

  const { imgUrl, alt, width, height } = getMediaInfo(speaker_image);

  return (
    <>
      <div className="group w-full cursor-pointer">
        <div className="relative bg-white rounded-2xl overflow-hidden">
          <div className="absolute inset-0 z-10 bg-black/25 flex flex-col py-8 px-8 group-hover:bg-black/50 transition-all duration-300 rounded-b-2xl">
            <Link href={routes.speakers(slug, lang)}>
              <h4 className="text-white text-sm transition sm:text-base md:text-lg font-bold">
                {name}
              </h4>
            </Link>
            <div className="flex flex-wrap items-center gap-4">
              {profession && (
                <span className="text-sm font-medium text-white py-2 rounded-full uppercase">
                  {profession}
                </span>
              )}
            </div>
            {social_links && social_links.length > 0 && (
              <div className="mt-4 opacity-0 group-hover:opacity-100 text-white transition">
                {brief && <p className="text-sm mt-2">{brief}</p>}
                <ul
                  className={cn(
                    ` flex items-center list-none caret-transparent gap-x-3 mt-2`
                  )}
                >
                  {social_links.map((item: any, index: number) => {
                    const { link, title, icon } = getStrapiData(item);
                    return (
                      <li key={index}>
                        <Link
                          href={link ?? "#"}
                          target="_blank"
                          rel="nofollow"
                          className={cn("transition duration-500 w-9 h-9")}
                          title={title}
                        >
                          <i
                            className={`fa-brands fa-${icon} text-white hover:text-primary transition`}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <div className="relative">
            <Link href={routes.speakers(slug, lang)}>
              {imgUrl ? (
                <CustomImage
                  src={imgUrl}
                  alt={alt}
                  width={width}
                  height={height}
                  className="w-full rounded-2xl"
                />
              ) : (
                <div className="grid place-content-center w-full h-full aspect-square bg-gray-200 rounded-b-2xl group-hover:rounded-b-none rounded-t-2xl transition-all duration-300">
                  <CiImageOff className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
