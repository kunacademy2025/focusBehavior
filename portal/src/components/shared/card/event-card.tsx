"use client";
import { CustomImage } from "@/components/controls";
import { cn, formatDate, getMediaInfo } from "@/utils";
import { CiImageOff } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import React, { useMemo, useState } from "react";
import moment from "moment";
import Link from "next/link";
import { useModal } from "@/context";
import { routes } from "@/config";
import { useTranslation } from "@/i18n/client";

export const EventCard = ({ item, lang }: any) => {
  const { t } = useTranslation("common", lang);

  const { openModal } = useModal();
  const {
    title,
    brief,
    main_image,
    video_url,
    startDate,
    slug,
    location,
    event_type,
    video,
  } = item;

  const { imgUrl, alt, width, height } = getMediaInfo(main_image);

  const targetVideoUrl = useMemo(() => {
    const { imgUrl: videoUrl } = getMediaInfo(video);
    return video_url || videoUrl;
  }, [video_url, video]);

  const isInFuture = moment(startDate).isAfter(moment());

  const [openVideo, setOpenVideo] = useState<boolean>(false);

  const handleVideo = () => {
    openModal("video", {
      videoUrl: targetVideoUrl,
      isOpen: openVideo,
      setOpen: setOpenVideo,
    });
  };

  return (
    <>
      <div className="group w-full">
        <div className="relative aspect-[3/2] bg-white rounded-2xl overflow-hidden">
          <>
            <div className="relative h-full bg-red-500">
              <Link href={routes.events(slug, lang)}>
                {imgUrl ? (
                  <CustomImage
                    src={imgUrl}
                    alt={alt}
                    width={width}
                    height={height}
                    className="w-full h-full rounded-2xl object-cover transition-all duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="grid place-content-center w-full h-full bg-gray-200">
                    <CiImageOff className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </Link>
              {targetVideoUrl && (
                <div
                  className={cn(
                    "absolute inset-0 bg-black bg-opacity-50",
                    "flex items-center justify-center "
                  )}
                >
                  <button
                    title="play"
                    className={cn(
                      "bg-transparent hover:bg-transparent text-white py-2"
                    )}
                    onClick={handleVideo}
                  >
                    <FaPlay className="w-8 h-8" />
                  </button>
                </div>
              )}
            </div>
            <div className="bg-primary rounded-lg py-2 px-4 absolute bottom-3 left-3 text-white text-sm">
              {isInFuture ? t("titles.upcoming") : t("titles.past")}
            </div>
          </>
        </div>
        <div className="flex flex-col py-4 px-4 group-hover:bg-white transition-all duration-300 rounded-b-2xl">
          <Link href={routes.events(slug, lang)}>
            <h4 className="text-black hover:text-primary transition text-sm sm:text-base md:text-lg font-bold">
              {title}
            </h4>
          </Link>
          <div className="flex flex-wrap items-center mt-4 gap-4">
            {event_type?.title && (
              <span className="text-xs bg-primary py-2 px-4 rounded-full text-white uppercase">
                {event_type?.title}
              </span>
            )}
            {startDate && (
              <span className="text-secondary text-xs md:text-sm">
                <i
                  className={`fa-regular fa-calendar text-primary fa-lg ltr:mr-2 rtl:ml-2`}
                />
                {formatDate(startDate)}
              </span>
            )}
            {location?.name && (
              <span className="text-secondary text-xs md:text-sm">
                <i
                  className={`fa-regular fa-location-dot text-primary fa-lg ltr:mr-2 rtl:ml-2`}
                />
                {location?.name}
              </span>
            )}
          </div>
          {brief && <p className="text-secondary/85 text-xs mt-4">{brief}</p>}
        </div>
      </div>
    </>
  );
};
