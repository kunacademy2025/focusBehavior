"use server";
import { CustomImage } from "@/components/controls";
import { cn, getMediaInfo, getStrapiData } from "@/utils";
import { CiImageOff } from "react-icons/ci";
import React from "react";
import Link from "next/link";
import { routes } from "@/config";
import SpeakerModel from "@/services/api/collections/speakers/model";

export const SpeakerCard = async ({
  name,
  slug,
  profession,
  brief,
  speaker_image,
  social_links,
  lang,
}: SpeakerModel) => {
  const { imgUrl, alt, width, height } = getMediaInfo(speaker_image);

  return (
    <>
      <div className="group w-full">
        <div className="relative bg-white rounded-2xl overflow-hidden">
          <div className="relative">
            <Link href={routes.speakers(slug, lang)}>
              {speaker_image ? (
                <CustomImage
                  src={imgUrl}
                  alt={alt}
                  width={width}
                  height={height}
                  className="w-full rounded-2xl transition-all duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="grid place-content-center w-full h-full aspect-square bg-gray-200 rounded-b-2xl group-hover:rounded-b-none rounded-t-2xl transition-all duration-300">
                  <CiImageOff className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </Link>
          </div>
        </div>
        <div className="flex flex-col py-4 px-4 group-hover:bg-white transition-all duration-300 rounded-b-2xl">
          <Link
            className="text-black text-sm hover:text-primary transition sm:text-base md:text-lg font-bold"
            href={routes.speakers(slug, lang)}
          >
            <h4>{name}</h4>
          </Link>
          <div className="flex flex-wrap items-center gap-4">
            {profession && (
              <span className="text-sm font-medium text-primary py-2 rounded-full uppercase">
                {profession}
              </span>
            )}
          </div>
          {brief && (
            <p className="text-secondary/85 text-sm mt-2 line-clamp-3">
              {brief}
            </p>
          )}
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
                      className={`fa-brands fa-${icon} text-secondary/85 hover:text-primary transition`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
