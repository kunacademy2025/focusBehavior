"use server";
import { Pagebar } from "@/components/shared/common/pagebar";
import React from "react";
import { NewsLetterSection } from "@/components/shared/common";
import { Faq } from "@/components/shared/faq";
import { FaqPageApis } from "@/services/api/page-services/faq-page";
import { FAQsApis } from "@/services/api/collections/faqs";
import { routes } from "@/config";
import { formatSEO } from "@/utils";
import { Metadata } from "next";
import { headers } from "next/headers";
import { getTranslation } from "@/i18n";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang } = await params;

  const url = (await headers()).get("x-current-path");
  const seo = await FaqPageApis.getSeo({
    queryParams: {
      locale: lang,
    },
  });
  const { metadata } = formatSEO({ seo, lang, currentUrl: url || "" });
  return metadata;
}

const FaqPage = async ({ params }: { params: Params }) => {
  const { lang } = await params;
  const { t } = await getTranslation("common");

  const breadcrumbs = [
    { text: t("breadcrumbs.home"), href: "/" },
    { text: t("breadcrumbs.faq"), href: routes.faq("", lang), isCurrent: true },
  ];

  const [{ data: faqPageData }, { data: faqsData }] = await Promise.all([
    FaqPageApis.get({
      queryParams: {
        populate: "deep",
        locale: lang,
      },
    }),
    FAQsApis.getAll({
      queryParams: {
        populate: "deep",
        locale: lang,
      },
    }),
  ]);

  const { pagebar, seo, title, brief } = faqPageData;
  const { jsonLD } = formatSEO({ seo, lang });

  return (
    <div className="overflow-hidden">
      {jsonLD}
      <Pagebar pagebar={pagebar} breadcrumbs={breadcrumbs} />
      <Faq title={title} brief={brief} data={faqsData} />
    </div>
  );
};

export default FaqPage;
