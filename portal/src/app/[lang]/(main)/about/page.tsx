"use server";
import { DynamicZoneComponent } from "@/components/dynamic";
import { About, MissionVision } from "@/components/shared/about";
import { NewsLetterSection } from "@/components/shared/common";
import { Pagebar } from "@/components/shared/common/pagebar";
import { routes } from "@/config";
import { getTranslation } from "@/i18n";
import { AboutPageApis } from "@/services/api/page-services/AboutPage";
import { formatSEO } from "@/utils";
import { Metadata } from "next";
import { headers } from "next/headers";
import React from "react";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang } = await params;

  const url = (await headers()).get("x-current-path");
  const seo = await AboutPageApis.getSeo({
    queryParams: {
      locale: lang,
    },
  });
  const { metadata } = formatSEO({ seo, lang, currentUrl: url || "" });
  return metadata;
}

const AboutPage = async ({ params }: { params: Params }) => {
  const { lang } = await params;
  const { t } = await getTranslation("common");

  const breadcrumbs = [
    { text: t("breadcrumbs.home"), href: "/" },
    {
      text: t("breadcrumbs.about"),
      href: routes.about("", lang),
      isCurrent: true,
    },
  ];

  const { data } = await AboutPageApis.get({
    queryParams: {
      populate: "deep",
      locale: lang,
    },
  });

  const {
    pagebar,
    seo,
    title,
    brief,
    mission_title,
    mission_brief,
    mission_image,
    vision_title,
    vision_brief,
    vision_image,
    content,
    about_title,
    about_subtitle,
    about_brief,
    about_image,
  } = data;

  const { jsonLD } = formatSEO({ seo, lang });

  return (
    <div className="overflow-hidden">
      {jsonLD}
      <Pagebar pagebar={pagebar} breadcrumbs={breadcrumbs} />
      <About
        title={title}
        brief={brief}
        about_title={about_title}
        about_subtitle={about_subtitle}
        about_brief={about_brief}
        about_image={about_image}
        lang={lang}
        disableMoreButton={true}
      />
      <div className="my-10">
        <DynamicZoneComponent content={content} />
      </div>
      <MissionVision
        mission_title={mission_title}
        mission_brief={mission_brief}
        mission_image={mission_image}
        vision_title={vision_title}
        vision_brief={vision_brief}
        vision_image={vision_image}
        lang={lang}
      />
    </div>
  );
};

export default AboutPage;
