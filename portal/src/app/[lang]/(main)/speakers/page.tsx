"use server";
import { Pagebar } from "@/components/shared/common/pagebar";
import React from "react";
import { routes } from "@/config";
import { SpeakersListing } from "@/components/shared/speakers";
import { SpeakerPageApis } from "@/services/api/page-services/speaker-page";
import { SpeakerApis } from "@/services/api/collections/speakers";
import { formatSEO } from "@/utils";
import { Metadata } from "next";
import { headers } from "next/headers";
import { getTranslation } from "@/i18n";

type Params = Promise<{ lang: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang } = await params;
  const url = (await headers()).get("x-current-path");
  const seo = await SpeakerPageApis.getSeo({
    queryParams: {
      locale: lang,
    },
  });
  const { metadata } = formatSEO({ seo, lang, currentUrl: url || "" });

  return metadata;
}

const SpeakersPage = async ({
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
      text: t("breadcrumbs.speakers"),
      href: routes.speakers("", lang),
      isCurrent: true,
    },
  ];

  const filters: any = {};

  if (search) {
    filters.$or = [
      { name: { $containsi: search } },
      { profession: { $containsi: search } },
      { search_keywords: { $containsi: search } },
    ];
  }

  const [{ data: speakerPageData }, { data: speakersData, meta }] =
    await Promise.all([
      SpeakerPageApis.get({
        queryParams: {
          populate: "deep",
          locale: lang,
        },
      }),
      SpeakerApis.getAll({
        queryParams: {
          populate: "deep",
          locale: lang,
          pagination: {
            page: Number(page ?? 1),
            pageSize: 12,
          },
          filters,
        },
      }),
    ]);

  const { pagebar, seo, title, brief } = speakerPageData;
  const { jsonLD } = formatSEO({ seo, lang });

  return (
    <div className="overflow-hidden">
      {jsonLD}
      <Pagebar pagebar={pagebar} breadcrumbs={breadcrumbs} />
      <SpeakersListing
        title={title}
        brief={brief}
        data={speakersData}
        lang={lang}
        pagination={meta?.pagination}
      />
    </div>
  );
};

export default SpeakersPage;
