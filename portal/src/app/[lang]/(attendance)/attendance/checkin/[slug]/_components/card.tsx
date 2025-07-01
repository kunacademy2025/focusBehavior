"use client";
import { CustomImage } from "@/components/controls";
import { routes } from "@/config";
import { useCurrentUrl } from "@/hooks";
import { useTranslation } from "@/i18n/client";
import { encrypt } from "@/services";
import { cn, formatDate, getMediaInfo, getStrapiId } from "@/utils";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiImageOff } from "react-icons/ci";
import { FiExternalLink } from "react-icons/fi";

export const CheckinCard = ({
  data,
  bookingId,
  lastCheckedInRecordId,
}: any) => {
  const {
    event,
    booking_date,
    ticket,
    ticket_quantity,
    access_type,
    status,
    payment,
    user,
  } = data || {};

  const { t } = useTranslation("common");

  const { payment_status } = payment || {};

  const { title, main_image, event_type } = event || {};
  const { imgUrl, alt, width, height } = getMediaInfo(main_image);

  const url = useCurrentUrl();

  // const url = process.env.SITE_URL || "https://focusbehevior.com";
  const checkInUrl = `${url}/api/event-check-in/${bookingId}`;
  const checkOutUrl = `${url}/api/event-check-out/${lastCheckedInRecordId}`;


  const [paymentEncryptId, setPaymentEncryptId] = useState("");

  useEffect(() => {
    const fetchEncryptedId = async () => {
      const paymentEncryptedId = await encrypt(getStrapiId(payment).toString());
      setPaymentEncryptId(paymentEncryptedId);
    };

    fetchEncryptedId();
  }, []);


  return (
    <div className="container max-w-3xl flex items-center justify-center min-h-screen">
      <div className="group w-full flex flex-col items-center gap-2 pt-4">
        {imgUrl ? (
          <CustomImage
            src={imgUrl}
            alt={alt}
            width={width}
            height={height}
            className="w-full max-h-60 aspect-video object-cover rounded-2xl"
          />
        ) : (
          <div className="grid place-content-center aspect-square bg-gray-200 h-36 object-cover rounded-2xl">
            <CiImageOff className="w-8 h-8 text-gray-400" />
          </div>
        )}
        <div className="flex justify-center items-center w-full py-4 px-4 group-hover:bg-white transition-all duration-300 rounded-b-2xl">
          <div className="flex flex-col justify-center items-center">
            {booking_date && (
              <span className="text-sm text-primary uppercase">
                {formatDate(booking_date)}
              </span>
            )}
            {access_type && (
              <span className="text-lg text-secondary">
                Access Type:{" "}
                <span className="font-semibold capitalize">{access_type}</span>
              </span>
            )}
            <h4 className="text-darkGray line-clamp-2 text-sm sm:text-base font-bold mt-2">
              {title}
            </h4>
            <div className="mt-1 flex items-center gap-2 text-sm">
              <span className="font-medium">{t("titles.ticket")}:</span>
              <span>{ticket?.title}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">{t("titles.quantity")}:</span>
              <span>{ticket_quantity}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">{t("titles.total")}:</span>
              <span className="text-primary font-semibold">
                {formatPrice(Number(ticket?.price) * Number(ticket_quantity))}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="font-medium">{t("titles.payment")}:</span>
              <Link
                href={`${routes.payment("")}?id=${paymentEncryptId}`}
                target="_blank"
                className={cn(
                  "font-medium flex items-center gap-1 underline",
                  payment_status?.toLowerCase() === "pending"
                    ? "text-amber-600"
                    : payment_status?.toLowerCase() === "pending"
                      ? "text-green-600"
                      : payment_status?.toLowerCase() === "error" ||
                          payment_status?.toLowerCase() === "cancelled"
                        ? "text-red-600"
                        : ""
                )}
              >
                {payment_status}
                <FiExternalLink />
              </Link>
            </div>
            <div className="text-lg mt-6">
              <span className="ltr:mr-3 rtl:ml-3">User:</span>
              {user?.display_name}
            </div>
            {lastCheckedInRecordId ? (
              <Link
                href={checkOutUrl}
                target="_blank"
                className="mt-4 bg-red-600 text-lg rounded-lg px-4 py-2 text-white"
              >
                {/* {t("titles.check_out")} */} Check Out
              </Link>
            ) : (
              <Link
                href={checkInUrl}
                target="_blank"
                className="mt-4 bg-primary text-lg rounded-lg px-4 py-2 text-white"
              >
                {/* {t("titles.check_in")} */} Check In
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
