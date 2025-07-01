"use server";
import React from "react";
import { EventCard } from "../card/event-card";
import FadeAnimation from "@/components/animation/FadeAnimation";
import EventModel from "@/services/api/collections/events/model";
import { SearchListing } from "@/components/ui/search-listing";
import { getTranslation } from "@/i18n";
import { MetaModel } from "@/models/meta.model";
import { routes } from "@/config";
import Pagination from "@/components/ui/pagination";

export const UpcomingEvents: React.FC<{
  data: EventModel[];
  lang: string;
  pagination: MetaModel;
}> = async ({ data, lang, pagination: { pageCount, page } }) => {
  const { t } = await getTranslation("common", lang);

  return (
    <section className="bg-white overflow-hidden">
      <div className="container w-full h-full py-16 overflow-hidden">
        <FadeAnimation direction="down">
          <div className="flex flex-col justify-center mb-6">
            <h2 className="title">{t("titles.upcoming_events")}</h2>
            <p className="subtitle">{t("messages.explore_upcoming_events")}</p>
          </div>
        </FadeAnimation>
        <SearchListing lang={lang} />
        <FadeAnimation
          direction="up"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 "
        >
          {data?.map((item: EventModel, index: number) => (
            <EventCard key={index} item={item} lang={lang} />
          ))}
        </FadeAnimation>
        <Pagination
          pageCount={pageCount}
          pageIndex={page}
          routeName={routes.events("", lang)}
          className="mt-10"
        />
      </div>
    </section>
  );
};
