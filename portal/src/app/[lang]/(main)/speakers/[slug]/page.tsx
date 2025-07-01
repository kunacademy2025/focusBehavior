"use server";
import React from "react";
import { NewsLetterSection } from "@/components/shared/common";
import { Pagebar } from "@/components/shared/common/pagebar";
import { SpeakerDetails } from "@/components/shared/speakers/speakers-details";
import { SpeakerPageApis } from "@/services/api/page-services/speaker-page";
import { SpeakerApis } from "@/services/api/collections/speakers";
import { routes } from "@/config";
import { EventsApis } from "@/services/api/collections/events";
import { formatSEO } from "@/utils";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getTranslation } from "@/i18n";

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
//   const seo = await SpeakerApis.getSeo(id, {
//     queryParams: {
//       locale: lang,
//     },
//   });
//   const { metadata } = formatSEO({ seo, lang, currentUrl: url || "" });
//   return metadata;
// }

const SpeakersDetailsPage = async ({ params }: { params: Params }) => {
  const { slug, lang } = await params;
  const { t } = await getTranslation("common");

  const breadcrumbs = [
    { text: t("breadcrumbs.home"), href: "/" },
    {
      text: t("breadcrumbs.speakers"),
      href: routes.speakers("", lang),
      isCurrent: true,
    },
  ];

  const [{ data: speakerPageData }, { data }] = await Promise.all([
    SpeakerPageApis.get({
      queryParams: {
        populate: "deep",
      },
    }),
    SpeakerApis.getBySlug(slug, {
      queryParams: {
        populate: "deep",
        locale: lang,
      },
    }),
  ]);

  const { pagebar, seo } = speakerPageData;
  const { jsonLD } = formatSEO({ seo, lang });

  return (
    <div className="overflow-hidden">
      {jsonLD}
      <Pagebar pagebar={pagebar} breadcrumbs={breadcrumbs} />
      <SpeakerDetails data={data} lang={lang} />
    </div>
  );
};

export default SpeakersDetailsPage;
