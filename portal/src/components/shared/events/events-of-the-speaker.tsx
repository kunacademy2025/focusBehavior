"use server";
import React from "react";
import { EventCard } from "../card/event-card";
import FadeAnimation from "@/components/animation/FadeAnimation";
import EventModel from "@/services/api/collections/events/model";
import { getTranslation } from "@/i18n";

export const EventsOfTheSpeaker = async ({
  events,
  lang,
}: {
  events: EventModel[];
  lang: string;
}) => {
  const { t } = await getTranslation("common", lang);

  return (
    <section className="bg-white overflow-hidden">
      <div className="container w-full h-full pb-16 overflow-hidden">
        <FadeAnimation direction="left">
          <div className="flex flex-col justify-center mb-6">
            <h2 className="title">{t("titles.event_of_speakers")}</h2>
            <p className="subtitle">{t("messages.might_love_events")}</p>
          </div>
        </FadeAnimation>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 pt-6">
          {events?.map((item: any, index: number) => (
            <EventCard key={index} item={item} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
};
