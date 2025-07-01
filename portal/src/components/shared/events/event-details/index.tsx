"use server";

import React from "react";
import { SideContent } from "./side-content";
import { EventTabs } from "./event-tabs";
import EventModel from "@/services/api/collections/events/model";
import { cn, formatDate, parseContent } from "@/utils";
import { DynamicZoneComponent } from "@/components/dynamic";
import { ImageAndVideo } from "./image-and-video";
import { getUserInfo } from "@/auth";
import { LockedContent } from "../../common/locked-content";
import { t } from "i18next";
import { usePurchaseAccess } from "@/hooks/usePurchaseAccess";


export async function EventDetails({
  data,
  lang,
  bookings,
}: {
  data?: EventModel;
  lang: string;
  bookings: any;
}) {
  const { title, content, private_content, include_public, tags, old_content } =
    data || {};

  const { user } = await getUserInfo();

  let hasPurchased = false;
  let paymentStatus: any;
  let paymentId: any;
  let bookingData: any = null;

  if (user) {
    hasPurchased = Array.isArray(bookings) && bookings.length > 0;
    bookingData = hasPurchased ? bookings[0] : null;

    if (bookingData) {
      paymentStatus = bookingData.payment.payment_status;
      paymentId = bookingData.payment.id;
    }
  }

  const { canPurchase, canAccessContent } = usePurchaseAccess({
    event: data,
    booking: bookingData,
    hasPurchased,
    paymentStatus,
  });

  const renderContent = () => {
    if (!user || (user && !hasPurchased)) {
      // User not logged in, show public content and locked content if private content exists
      return (
        <>
          <DynamicZoneComponent content={content ?? []} />
          {private_content && private_content.length > 0 && (
            <LockedContent
              buttonLbl={t("buttons.buy_ticket")}
              hasPurchased={hasPurchased}
            />
          )}
        </>
      );
    }
    return (
      <>
        {include_public && <DynamicZoneComponent content={content ?? []} />}
        <DynamicZoneComponent content={private_content ?? []} />
      </>
    );
  };

  return (
    <>
      <article className="bg-white">
        <div className="container py-6 lg:py-10">
          <section className="flex flex-col lg:flex-row py-8 lg:gap-x-10 ">
            {/* Information */}
            <div className="order-2 lg:order-1 w-full h-fit  lg:w-8/12">
              <h2 className="text-primary text-2xl mb-4 font-semibold">
                {title}
              </h2>
              {data && (
                <ImageAndVideo
                  data={data}
                  canAccessContent={canAccessContent}
                />
              )}
              <div className="py-6 bg-veryLightGray rounded-b-lg">
                {renderContent()}

                {tags && tags?.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                    {(tags ?? []).map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-gray-200 text-gray-500 hover:bg-primary hover:text-white py-1 text-sm px-3 inline-flex items-center transition cursor-pointer"
                        >
                          {item?.tag}
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
              <div className="mt-6">
                {data && (
                  <EventTabs
                    data={data}
                    lang={lang}
                    canPurchase={canPurchase}
                    canAccessContent={canAccessContent}
                  />
                )}
              </div>
            </div>

            {/*  Details */}
            {data && (
              <div className="order-1 mb-6 lg:mb-0 lg:order-2 w-full lg:w-4/12">
                <SideContent
                  data={data}
                  lang={lang}
                  hasPurchased={hasPurchased}
                  booking={bookingData}
                  paymentStatus={paymentStatus}
                  paymentId={paymentId}
                />
              </div>
            )}
          </section>
          {/* Old Content */}
          {hasPurchased && old_content && old_content.length > 0 && (
            <div className="pt-10">
              <h3 className="text-primary font-semibold text-3xl mb-6">
                {t("titles.old_events")}
                {lang === "ar" ? "فعاليات قديمة" : "Old Events"}
              </h3>
              {old_content.map((item, index: number) => {
                return (
                  <div key={index} className={cn("w-full")}>
                    {index > 0 && (
                      <hr className="my-2 border-t border-gray-300" />
                    )}
                    <div className="flex flex-col justify-center mb-4">
                      {item.title && (
                        <h2 className="uppercase text-xl font-medium text-primary mb-3">
                          {item.title} - {formatDate(item.date)}
                        </h2>
                      )}
                      {item.content && (
                        <div className="text-base text-darkGray">
                          {parseContent(item.content)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </article>
    </>
  );
}
