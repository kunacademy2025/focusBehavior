"use client";
import { CustomImage } from "@/components/controls";
import { useModal } from "@/context";
import EventModel from "@/services/api/collections/events/model";
import { getMediaInfo } from "@/utils";
import { t } from "i18next";
import React, { useMemo, useState } from "react";
import { CiImageOff } from "react-icons/ci";
import { FaPlay } from "react-icons/fa6";
import { cn } from "rizzui";

export const ImageAndVideo = ({ data, canAccessContent }: { data: EventModel, canAccessContent: boolean }) => {
  const { openModal } = useModal();

  const { main_image, video, video_url, startDate } = data || {};

  const { imgUrl, alt, width, height } = getMediaInfo(main_image);

  const targetVideoUrl = useMemo(() => {
    const { imgUrl: videoUrl } = getMediaInfo(video);
    return video_url || videoUrl;
  }, [video_url, video]);

  const [openVideo, setOpenVideo] = useState<boolean>(false);

  const handleVideo = () => {
    openModal("video", {
      videoUrl: targetVideoUrl,
      isOpen: openVideo,
      setOpen: setOpenVideo,
    });
  };

  return (
    <div className="relative">
      {imgUrl ? (
        <CustomImage
          src={imgUrl}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full aspect-video object-cover object-center"
        />
      ) : (
        <div className="grid place-content-center w-full h-full aspect-video bg-gray-200 rounded-b-2xl group-hover:rounded-b-none rounded-t-2xl transition-all duration-300">
          <CiImageOff className="w-8 h-8 text-gray-400" />
        </div>
      )}
      {targetVideoUrl && (
        <div
          className={cn(
            "absolute inset-0 bg-black bg-opacity-50",
            "flex items-center justify-center cursor-pointer"
          )}
          onClick={handleVideo}
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
      {canAccessContent && (
        <div className="absolute top-2 ltr:left-2 rtl:!right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
          {t("event_purchased")}
        </div>
      )}
    </div>
  );
};
