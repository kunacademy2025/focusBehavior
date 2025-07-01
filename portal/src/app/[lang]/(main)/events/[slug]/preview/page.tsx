"use server";
import React from "react";
import { EventDetails } from "@/components/shared/events/event-details";
import { EventsApis } from "@/services/api/collections/events";
import { EventHero } from "@/components/shared/events/event-hero";
import { formatSEO } from "@/utils";
import { EventPageApis } from "@/services/api/page-services/event-page";
import { Pagebar } from "@/components/shared/common/pagebar";
import { routes } from "@/config";
import { getTranslation } from "@/i18n";
import { getUserInfo } from "@/auth";

type Params = Promise<{ lang: string; slug: string }>;

// export async function generateMetadata({
//   params,
// }: {
//   params: Params;
// }): Promise<Metadata> {
//   const { lang, slug } = await params;
//   const url = (await headers()).get("x-current-path");
//   const id = (await EventsApis.getBySlug(slug)).data.id;

//   if (!id) notFound();
//   const seo = await EventsApis.getSeo(id, {
//     queryParams: {
//       locale: lang,
//     },
//   });
//   const { metadata } = formatSEO({ seo, lang, currentUrl: url || "" });
//   return metadata;
// }

const EventsPage = async ({ params }: { params: Params }) => {
  const { slug, lang } = await params;
  const { t } = await getTranslation("common");

  const { user } = await getUserInfo();

  if (!user.isAdmin) {
    return null;
  }

  const breadcrumbs = [
    { text: t("breadcrumbs.home"), href: "/" },
    {
      text: t("breadcrumbs.events"),
      href: routes.events("", lang),
      isCurrent: true,
    },
  ];

  const [{ data: eventPage }, { data }] = await Promise.all([
    EventPageApis.get({
      queryParams: {
        populate: "deep",
        locale: lang,
      },
    }),
    EventsApis.getBySlug(slug, {
      queryParams: {
        populate: {
          Hero: { populate: { media: true } },
          main_image: true,
          location: true,
          video: true,
          room: true,
          tags: true,
          event_type: true,
          content: {
            populate: "*",
          },
          private_content: {
            populate: "*",
          },
          training_schedules: {
            populate: {
              event: {
                populate: "deep",
              },
              session: {
                populate: {
                  speakers: { populate: "*" },
                },
              },
            },
          },
          subscription_plans: true,
          tickets: {
            populate: {
              image: true,
            },
          },
          seo: true,
        },
        filters: {
          go_live: { $eq: false },
        },
        locale: lang,
      },
    }),
  ]);

  const { Hero, seo } = data;

  const { jsonLD } = formatSEO({ seo, lang });


  return (
    <div className="overflow-hidden">
      {jsonLD}
      {Hero && Hero.length > 0 ? (
        <EventHero data={Hero} />
      ) : (
        eventPage?.pagebar && (
          <Pagebar pagebar={eventPage?.pagebar} breadcrumbs={breadcrumbs} />
        )
      )}
      <EventDetails data={data} lang={lang} />
    </div>
  );
};

export default EventsPage;
