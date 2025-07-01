"use client";
import { Button, Divider } from "@nextui-org/react";
import { GoShareAndroid } from "react-icons/go";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { routes } from "@/config";
import { useModal } from "@/context";
import { ShiftingCountdown } from "./shifting-countdown";
import { formatDate, formatEmail } from "@/utils";
import EventModel from "@/services/api/collections/events/model";
import { formatPrice } from "@/utils/formatPrice";
import { Link as ScrollLink } from "react-scroll";
import { EmailLink, PhoneLink } from "@/components/controls";
import { useTranslation } from "@/i18n/client";
import { useCurrentUrl } from "@/hooks";
import { QRCodeSVG } from "qrcode.react";
import { encrypt } from "@/services";
import { usePurchaseAccess } from "@/hooks/usePurchaseAccess";

export const SideContent = ({
  data,
  lang,
  hasPurchased,
  booking,
  paymentStatus,
  paymentId,
}: {
  data: EventModel;
  lang: string;
  hasPurchased?: boolean;
  booking: any;
  paymentStatus: string;
  paymentId: number;
}) => {
  const { openModal } = useModal();
  const { t } = useTranslation("common", lang);
  const url = useCurrentUrl();
  const [eventLink, setEventLink] = useState("");
  const [paymentLink, setPaymentLink] = useState("");

  const {
    id,
    startDate,
    endDate,
    door_time,
    phone_number,
    email,
    event_type,
    price,
    discounted_price,
    type,
    tickets,
    room,
  } = data || {};

  const {
    isFutureEvent,
    isOngoingEvent,
    isPastEvent,
    canPurchase,
    canAccessContent,
    shouldPayAgain,
  } = usePurchaseAccess({
    event: data,
    booking,
    hasPurchased,
    paymentStatus,
  });


  useEffect(() => {
    const fetchEncryptedId = async () => {
      const encryptPaymentId = await encrypt(paymentId.toString());
      setPaymentLink(`/account/events/${encryptPaymentId}`);
      const validBooking = canAccessContent ? booking : null;

      const validBookingId = validBooking?.id ?? null;
      setEventLink(`${url}/attendance/checkin/${validBookingId}`);
    };

    if (booking) {
      fetchEncryptedId();
    }
  }, [booking, url, endDate]);

  const startingPrice = tickets?.length
    ? Math.min(
      ...tickets.map((ticket) =>
        typeof ticket.price === "number" ? ticket.price : Infinity
      )
    )
    : null;

  let status;

  if (isOngoingEvent) {
    status = "Showing";
  } else if (isFutureEvent) {
    status = "Upcoming";
  } else if (isPastEvent) {
    status = "Past";
  } else {
    status = "Not Showing";
  }


  const renderLiveContent = () => {
    return (
      canAccessContent && (
        <div className="py-4 px-2 bg-primary flex items-center justify-between">
          <span className="text-xl relative w-fit font-normal pr-6 text-white uppercase shine-text">
            {t("terms.live_now")}
            <span className="absolute top-1 right-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/90 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
            </span>
          </span>
          {type === "In Person" ? (
            <QRCodeSVG
              value={eventLink}
              size={80}
              level="H"
              fgColor="#000000"
              bgColor="#ffffff"
            />
          ) : type === "Online" && room ? (
            <div className="bg-white rounded-lg py-2 px-4 text-primary cursor-pointer">
              <Link
                target="_blank"
                href={`/room?roomCode=${room?.room_code}&eventId=${id}`}
              >
                {t("terms.join_now")}
              </Link>
            </div>
          ) : (
            <ScrollLink
              to="session-section"
              smooth={true}
              duration={500}
              offset={-143}
              className="bg-white rounded-lg py-2 px-4 text-primary cursor-pointer"
              onClick={() => {
                const event = new CustomEvent("changeTab", { detail: 0 });
                window.dispatchEvent(event);
              }}
            >
              {t("terms.join_now")}
            </ScrollLink>
          )}
        </div>
      )
    );
  };

  const renderPurchaseButton = () => {
    return canAccessContent ? (
      <Link
        href={paymentLink}
        className="w-full mt-4 text-white bg-green-500 font-medium rounded-lg text-center py-2 px-4"
      >
        {t("buttons.ticket_purchased")}
      </Link>
    ) : shouldPayAgain ? (
      <Link
        href={paymentLink}
        className="w-full mt-4 text-white bg-primary font-medium rounded-lg text-center py-2 px-4 cursor-pointer"
      >
        {t("elements.payment.retry_payment")}
      </Link>
    ) : (
      canPurchase && (
        <ScrollLink
          to="ticket-section"
          smooth={true}
          duration={500}
          offset={-143}
          className="w-full mt-4 text-white bg-primary font-medium rounded-lg text-center py-2 px-4 cursor-pointer"
          onClick={() => {
            const event = new CustomEvent("changeTab", { detail: 1 });
            window.dispatchEvent(event);
          }}
        >
          {t("buttons.buy_ticket")}
        </ScrollLink>
      )
    );
  };

  return (
    <>
      <div className="bg-white flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-6 bg-veryLightGray rounded-lg">
          {/* title and share */}
          {renderLiveContent()}
          <div className="flex gap-4 flex-wrap items-center justify-between  p-4">
            <h3 className="text-lg lg:text-xl font-bold text-secondary">
              {t("titles.event_details")}
            </h3>
            <div className="flex items-center gap-x-2 ">
              <Button
                startContent={<GoShareAndroid className="w-5 h-5" />}
                variant="solid"
                className="text-primary bg-white font-medium rounded-lg"
                onPress={() =>
                  openModal("share", { title: "Megeve Winter Party" })
                }
              >
                {t("terms.share")}
              </Button>
            </div>
          </div>

          {/* countdown */}
          {status === "Upcoming" && <ShiftingCountdown date={startDate} />}

          <div className="flex flex-col gap-y-4 p-4">
            {/* description */}
            <div className="flex flex-wrap gap-4 w-full items-start justify-between sm:text-lg">
              <div className="flex flex-col">
                <>
                  <p className="text-secondary">{t("terms.category")}</p>
                  {event_type && (
                    <p className="text-primary">{event_type?.title}</p>
                  )}
                </>
              </div>
              <div className="flex flex-col lg:items-end">
                <>
                  <p className="text-secondary">{t("titles.starting_price")}</p>
                  <p className="text-primary text-lg sm:text-xl font-bold">
                    {formatPrice(startingPrice || discounted_price || price)}
                  </p>
                </>
              </div>
            </div>
            <Divider className="my-2" />
            {/* Description */}
            <div className="flex flex-wrap gap-4 w-full sm:flex-row items-start justify-between sm:text-lg">
              <InfoSection
                title={t("terms.start_date")}
                icon="fa-duotone fa-light fa-calendar"
                text={formatDate(startDate)}
              />
              <InfoSection
                title={t("terms.end_date")}
                icon="fa-duotone fa-light fa-calendar"
                text={formatDate(endDate)}
              />
            </div>
            {renderPurchaseButton()}
          </div>
        </div>
        <div className="flex flex-col gap-y-6 bg-veryLightGray rounded-lg p-4 lg:p-8">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-3 w-full">
              <div className="flex items-center justify-between">
                <h4 className="text-primary font-semibold text-lg">
                  {t("titles.details")}
                </h4>
              </div>
              <div className="flex flex-col gap-4 w-full items-start justify-between sm:text-lg">
                <div className="flex flex-col gap-y-2 border-b border-gray-300 w-full pb-4">
                  <h4 className="text-secondary font-semibold text-base lg:text-lg">
                    {t("titles.type")}
                  </h4>
                  <div className={`text-secondary`}>
                    <i
                      className={`fa-regular fa-check text-primary fa-lg ltr:mr-2 rtl:ml-2`}
                    />
                    {type}
                  </div>
                </div>
                {door_time && (
                  <div className="flex flex-col gap-y-2 border-b border-gray-300 w-full pb-4">
                    <h4 className="text-secondary font-semibold text-base lg:text-lg">
                      {t("titles.door_time")}
                    </h4>
                    <div className={`text-secondary`}>
                      <i
                        className={`fa-regular fa-timer text-primary fa-lg ltr:mr-2 rtl:ml-2`}
                      />
                      {door_time}
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-y-2 border-b border-gray-300 w-full pb-4">
                  <h4 className="text-secondary font-semibold text-base lg:text-lg">
                    {t("titles.status")}
                  </h4>
                  <div className={`text-secondary`}>
                    <i
                      className={`fa-regular fa-circle-check text-primary fa-lg ltr:mr-2 rtl:ml-2`}
                    />
                    {status}
                  </div>
                </div>
                {phone_number && (
                  <div className="flex flex-col gap-y-2 border-b border-gray-300 w-full pb-4">
                    <h4 className="text-secondary font-semibold text-base lg:text-lg">
                      {t("titles.phone")}
                    </h4>
                    <div className={`flex text-secondary`}>
                      <i
                        className={`fa-regular fa-phone text-primary fa-lg ltr:mr-2 rtl:ml-2`}
                      />
                      <PhoneLink phone_number={phone_number} />
                    </div>
                  </div>
                )}
                {email && (
                  <div className="flex flex-col gap-y-2 w-full pb-4">
                    <h4 className="text-secondary font-semibold text-base lg:text-lg">
                      {t("titles.email")}
                    </h4>
                    <div className={`flex text-secondary`}>
                      <i
                        className={`fa-regular fa-envelope text-primary fa-lg ltr:mr-2 rtl:ml-2`}
                      />
                      <EmailLink email={email}>{formatEmail(email)}</EmailLink>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-6 bg-veryLightGray rounded-lg p-4 lg:p-8">
          <div className="flex flex-col gap-y-3">
            <p className="text-primary text-xl font-semibold">
              {t("contact.contact_us")}
            </p>
            <p className="text-secondary"> {t("messages.reach_out")}</p>
          </div>
          <div className="mt-2 mb-2">
            <Link
              href={routes.contact("", lang)}
              className="btn-primary text-base lg:text-lg"
            >
              {t("buttons.speak_with_us")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const InfoSection = ({
  title,
  icon,
  text,
  className,
}: {
  title: string;
  icon: string;
  text: string;
  className?: string;
}) => (
  <div className="flex flex-col gap-y-2">
    <h4 className="text-secondary font-semibold text-lg">{title}</h4>
    <div className={`text-secondary text-sm ${className}`}>
      <i className={`${icon} text-primary fa-lg ltr:mr-2 rtl:ml-2`} />
      {text}
    </div>
  </div>
);
