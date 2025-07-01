"use client";
import React, { useEffect, useState } from "react";
import { CustomImage } from "@/components/controls";
import { getMediaInfo } from "@/utils";
import { CiImageOff } from "react-icons/ci";
import Link from "next/link";
import { routes } from "@/config";
import { QRCodeSVG } from "qrcode.react";
import { useTranslation } from "@/i18n/client";
import { useCurrentUrl } from "@/hooks";
import moment from "moment";

export const MyEventCard = ({ item, lang }: { item: any; lang: string }) => {
  const { t } = useTranslation("common", lang);

  const { title, main_image, slug, event_type, type, endDate } =
    item?.event || {};
  const { imgUrl, alt, width, height } = getMediaInfo(main_image);
  const url = useCurrentUrl();
  const [eventLink, setEventLink] = useState("");
  const [bookingId, setBookingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchEncryptedId = async () => {
      const validBooking =
        item.expiry_date &&
        moment(item.expiry_date)
          .endOf("day")
          .isSameOrBefore(moment(endDate).endOf("day"))
          ? item
          : null;

      const validBookingId = validBooking?.id ?? null;
      setBookingId(validBookingId);
      setEventLink(`${url}/attendance/checkin/${validBookingId}`);
    };

    if (item) {
      fetchEncryptedId();
    }
  }, [item, url, endDate]);

  return (
    <>
      <div>
        <div className="group flex w-full items-center justify-between">
          <div className="group w-full flex flex-col sm:flex-row items-center gap-2 sm:gap-4 pt-4">
            {imgUrl ? (
              <Link
                href={routes.events(slug, lang)}
                className="w-full sm:w-auto"
              >
                <CustomImage
                  src={imgUrl}
                  alt={alt}
                  width={width}
                  height={height}
                  className="w-full sm:w-80 h-36 object-cover rounded-lg"
                />
              </Link>
            ) : (
              <div className="grid place-content-center aspect-square bg-gray-200 h-36 object-cover rounded-2xl w-full sm:w-40">
                <CiImageOff className="w-8 h-8 text-gray-400" />
              </div>
            )}

            {/* Ensure Image & Text Stay in One Row on Desktop */}
            <div className="flex flex-col items-center justify-between w-full py-4 px-4 group-hover:bg-white transition-all duration-300 rounded-2xl">
              {/* Event Details */}
              <div className="flex-1">
                {event_type && (
                  <span className="text-sm text-primary uppercase">
                    {event_type?.title}
                  </span>
                )}
                <Link href={routes.events(slug)} className="w-full">
                  <h4 className="line-clamp-2 text-sm sm:text-base font-bold hover:text-primary transition-all duration-300">
                    {title}
                  </h4>
                </Link>
                <div className="mt-1 flex items-center gap-2 text-base">
                  <span className="font-medium">{t("titles.ticket")}:</span>
                  <span>{item.ticket?.title}</span>
                </div>
              </div>

              {/* QR Code (Only for In Person Events) */}
              {bookingId && type === "In Person" && (
                <div className="mt-2 lg:mt-0 w-20 h-20 flex justify-center items-center sm:self-end">
                  <Link href={eventLink} target="_blank">
                    <QRCodeSVG
                      value={eventLink}
                      size={80}
                      level="H"
                      fgColor="#000000"
                      bgColor="#ffffff"
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
