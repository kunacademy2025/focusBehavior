"use server";
import { Pagebar } from "@/components/shared/common/pagebar";
import React from "react";
import { NewsLetterSection } from "@/components/shared/common";
import { SlidePricing } from "@/components/shared/plans";
import { routes } from "@/config";
import { Metadata } from "next";
import { SubscriptionPageApis } from "@/services/api/page-services/subscription-page";
import { headers } from "next/headers";
import { formatSEO } from "@/utils";
import { getTranslation } from "@/i18n";
import { SubscriptionApis } from "@/services/api/collections/subscriptions";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang } = await params;
  const url = (await headers()).get("x-current-path");
  const seo = await SubscriptionPageApis.getSeo({
    queryParams: {
      locale: lang,
    },
  });
  const { metadata } = formatSEO({ seo, lang, currentUrl: url || "" });

  return metadata;
}

const SubscriptionsPage = async ({ params }: { params: Params }) => {
  const { lang } = await params;
  const { t } = await getTranslation("common");

  const breadcrumbs = [
    { text: t("breadcrumbs.home"), href: "/" },
    {
      text: t("breadcrumbs.subscriptions"),
      href: routes.subscriptions("", lang),
      isCurrent: true,
    },
  ];

  const [{ data: subscriptionPageData }, { data: subscriptionsData }] =
    await Promise.all([
      SubscriptionPageApis.get({
        queryParams: {
          populate: "deep",
        },
      }),
      SubscriptionApis.getAll({
        queryParams: {
          populate: "deep",
          locale: lang,
        },
      }),
    ]);

  const { pagebar, seo, title, brief } = subscriptionPageData;
  const { jsonLD } = formatSEO({ seo, lang });

  return (
    <div className="overflow-hidden">
      {jsonLD}
      <Pagebar pagebar={pagebar} breadcrumbs={breadcrumbs} />
      <SlidePricing title={title} brief={brief} />
    </div>
  );
};

export default SubscriptionsPage;
