"use server";
import { Pagebar } from "@/components/shared/common/pagebar";
import React from "react";
import { UpcomingEvents } from "@/components/shared/events";
import { EventsApis } from "@/services/api/collections/events";
import { EventPageApis } from "@/services/api/page-services/event-page";
import { formatSEO, getStrapiId } from "@/utils";
import { headers } from "next/headers";
import { Metadata } from "next";
import { routes } from "@/config";
import { ShowingEvents } from "@/components/shared/events/showing-events";
import { OldEvents } from "@/components/shared/events/old-events";
import moment from "moment";
import { getTranslation } from "@/i18n";
import { getUserInfo } from "@/auth";
import { EventBookingApis } from "@/services/api/collections/event-booking";

type Params = Promise<{ lang: string }>;
type SearchParams = Promise<{ [key: string]: string | undefined }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang } = await params;
  const url = (await headers()).get("x-current-path");
  const seo = await EventPageApis.getSeo({
    queryParams: {
      locale: lang,
    },
  });
  const { metadata } = formatSEO({ seo, lang, currentUrl: url || "" });

  return metadata;
}

const EventsPage = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const { lang } = await params;
  const { page, search } = await searchParams;
  const { t } = await getTranslation("common");

  const breadcrumbs = [
    { text: t("breadcrumbs.home"), href: "/" },
    {
      text: t("breadcrumbs.events"),
      href: routes.events("", lang),
      isCurrent: true,
    },
  ];

  const today = moment().toISOString();

  const filters: any = {
    startDate: {
      $gt: today,
    },
    go_live: { $eq: true },
  };

  if (search) {
    filters.$or = [
      { title: { $containsi: search } },
      { search_keywords: { $containsi: search } },
    ];
  }

  const [
    { data },
    { data: showingEvents },
    { data: upcomingEvents, meta: upcomingEventsMeta },
    { data: oldEvents, meta: oldEventsMeta },
  ] = await Promise.all([
    EventPageApis.get({
      queryParams: {
        populate: "deep",
        locale: lang,
      },
    }),
    EventsApis.getAll({
      queryParams: {
        populate: "deep",
        locale: lang,
        sort: ["startDate:desc", "createdAt:desc"],
        filters: {
          startDate: {
            $lte: today,
          },
          endDate: {
            $gte: today,
          },
          go_live: { $eq: true },
        },
      },
    }),
    EventsApis.getAll({
      queryParams: {
        populate: "deep",
        pagination: {
          page: Number(page ?? 1),
          pageSize: 9,
        },
        locale: lang,
        sort: ["startDate:desc", "createdAt:desc"],
        filters,
      },
    }),
    EventsApis.getAll({
      queryParams: {
        populate: "deep",
        pagination: {
          page: Number(page ?? 1),
          pageSize: 9,
        },
        locale: lang,
        sort: ["startDate:desc", "createdAt:desc"],
        filters: {
          endDate: {
            $lt: today,
          },
          go_live: { $eq: true },
          $or: [
            { title: { $containsi: search } },
            { search_keywords: { $containsi: search } },
          ],
        },
      },
    }),
  ]);

  const { pagebar, seo } = data;

  const { jsonLD } = formatSEO({ seo, lang });
  // const { pageCount, page: pageIndex } = meta?.pagination || {};

  const eventId = getStrapiId(data);
  const { user } = await getUserInfo();

  let hasPurchased = false;

  if (user) {
    const { data } = await EventBookingApis.get({
      queryParams: {
        populate: "deep",
        filters: {
          user: { id: { $eq: user?.id } },
          payment: { payment_status: { $eq: "Paid" } },
          event: { id: { $eq: eventId } },
        },
      },
    });
    hasPurchased = !!data;
  }

  return (
    <div className="overflow-hidden">
      {jsonLD}
      <Pagebar pagebar={pagebar} breadcrumbs={breadcrumbs} />
      {showingEvents?.length > 0 && (
        <ShowingEvents
          events={showingEvents}
          lang={lang}
          hasPurchased={hasPurchased}
        />
      )}
      {upcomingEvents?.length > 0 && (
        <UpcomingEvents
          data={upcomingEvents}
          lang={lang}
          pagination={upcomingEventsMeta?.pagination}
        />
      )}
      {oldEvents?.length > 0 && (
        <OldEvents
          data={oldEvents}
          lang={lang}
          pagination={oldEventsMeta?.pagination}
        />
      )}
    </div>
  );
};

export default EventsPage;
