"use client";
import { CustomImage } from "@/components/controls";
import { formatDate, getMediaInfo } from "@/utils";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useModal } from "@/context";
import { routes } from "@/config";
import FadeAnimation from "@/components/animation/FadeAnimation";
import { useTranslation } from "@/i18n/client";

export const EventCardTwo = ({ item, lang, hasPurchased }: any) => {
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

  const { t } = useTranslation("common", lang);
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
    <>
      <div className="bg-white py-10">
        <FadeAnimation
          direction="down"
          className="flex flex-col gap-y-3 text-secondary w-full lg:w-9/12 mb-6"
        >
          <span className="text-xl relative w-fit font-light  pr-4 text-primary uppercase shine-text">
            {t("titles.showing_events")}
            <span className="absolute top-1 right-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/90 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            </span>
          </span>
          <p className="text-2xl md:text-3xl font-semibold">{brief}</p>
        </FadeAnimation>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-x-16 gap-y-4">
          <FadeAnimation direction="left" className="relative overflow-hidden">
            <CustomImage
              src={imgUrl}
              alt={alt}
              width={width}
              height={height}
              className="w-full h-full max-h-[500px] rounded-2xl object-cover"
            />
          </FadeAnimation>
          <FadeAnimation
            direction="right"
            className="flex flex-col justify-center"
          >
            <div className="flex flex-col justify-center">
              {event_type?.title && (
                <span className="mt-4 w-fit text-lg font-medium text-secondary uppercase">
                  {event_type?.title}
                </span>
              )}
              <Link href={routes.events(slug, lang)}>
                <h3 className="mt-2 title font-semibold text-2xl xl:text-3xl">
                  {title}
                </h3>
              </Link>

              <span className="mt-4 text-secondary my-1">
                <i
                  className={`fa-regular fa-calendar text-primary fa-lg ltr:mr-2 rtl:ml-2 w-6`}
                />
                {formatDate(startDate, "dddd D MMMM, YYYY")}
              </span>

              {location?.name && (
                <span className="text-secondary mt-2">
                  <i
                    className={`fa-regular fa-location-dot text-primary fa-lg ltr:mr-2 rtl:ml-2 w-6`}
                  />
                  {location?.name}
                </span>
              )}

              {hasPurchased ? (
                <Link
                  href={routes.events(`${slug}`, lang)}
                  className="mt-6 bg-primary text-white hover:bg-primary/85 px-6 py-2 rounded-lg w-fit transition"
                >
                  {t("buttons.view_event")}
                </Link>
              ) : (
                <Link
                  href={routes.events(`${slug}`, lang)}
                  className="mt-6 bg-primary text-white hover:bg-primary/85 px-6 py-2 rounded-lg w-fit transition"
                >
                  {t("buttons.buy_ticket")}
                </Link>
              )}
            </div>
          </FadeAnimation>
        </div>
      </div>
    </>
  );
};
