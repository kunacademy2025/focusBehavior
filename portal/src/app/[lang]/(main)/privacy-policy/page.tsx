"use server";
import { Metadata } from "next";
import { headers } from "next/headers";
import { PrivacyPolicyPageApis } from "@/services/api/page-services/privacy-policy-page";
import { routes } from "@/config";
import { Pagebar } from "@/components/shared/common/pagebar";
import { formatSEO } from "@/utils";
import { Content } from "@/components/ui/content";
import { DynamicZoneComponent } from "@/components/dynamic";
import { getTranslation } from "@/i18n";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang } = await params;

  const url = (await headers()).get("x-current-path");
  const seo = await PrivacyPolicyPageApis.getSeo({
    queryParams: {
      locale: lang,
    },
  });
  const { metadata } = formatSEO({ seo, lang, currentUrl: url || "" });
  return metadata;
}

const PrivacyPolicyPage = async ({ params }: { params: Params }) => {
  const { lang } = await params;
  const { t } = await getTranslation("common");

  const breadcrumbs = [
    { text: t("breadcrumbs.home"), href: "/" },
    {
      text: t("breadcrumbs.privacy_policy"),
      href: routes.privacyPolicy("", lang),
      isCurrent: true,
    },
  ];

  const { data } = await PrivacyPolicyPageApis.get({
    queryParams: {
      populate: "deep",
      locale: lang,
    },
  });

  const { pagebar, seo, content } = data;
  const { jsonLD } = formatSEO({ seo, lang });


  return (
    <div>
      {jsonLD}
      <Pagebar pagebar={pagebar} breadcrumbs={breadcrumbs} />
      <div className="my-10">
        <DynamicZoneComponent content={content} />
      </div>
    </div>
  );
};
export default PrivacyPolicyPage;
