"use server";

import { EventCard } from "../card/event-card";
import FadeAnimation from "@/components/animation/FadeAnimation";
import { routes } from "@/config";
import Link from "next/link";
import EventModel from "@/services/api/collections/events/model";
import { getTranslation } from "@/i18n";

export const OldEventsHome = async ({
  data,
  lang,
}: {
  data: EventModel[];
  lang: string;
}) => {
  const { t } = await getTranslation("common", lang);

  return (
    <section className="bg-white overflow-hidden">
      <div className="container w-full h-full py-16 overflow-hidden">
        <FadeAnimation direction="left">
          <div className="flex flex-col justify-center mb-6">
            <h2 className="title">{t("titles.old_events")}</h2>
            <p className="subtitle">{t("messages.explore_old_events")}</p>
          </div>
        </FadeAnimation>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
          {data?.map((item: any, index: number) => (
            <FadeAnimation key={index} direction="up" delay={0.1 * index}>
              <EventCard item={item} lang={lang} />
            </FadeAnimation>
          ))}
        </div>
        <div className="mt-6 grid place-content-center">
          <Link href={routes.events("", lang)} className="btn-secondary mt-6 ">
            {t("buttons.explore_more")}
          </Link>
        </div>
      </div>
    </section>
  );
};
