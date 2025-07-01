"use server";
import { Metadata } from "next";
import { headers } from "next/headers";
import { routes } from "@/config";
import { Pagebar } from "@/components/shared/common/pagebar";
import { formatSEO } from "@/utils";
import { Content } from "@/components/ui/content";
import { TermsConditionsPageApis } from "@/services/api/page-services/terms-conditions-page";
import { getTranslation } from "@/i18n";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang } = await params;

  const url = (await headers()).get("x-current-path");
  const seo = await TermsConditionsPageApis.getSeo({
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
      text: t("breadcrumbs.terms_conditions"),
      href: routes.termsConditions("", lang),
      isCurrent: true,
    },
  ];

  const { data } = await TermsConditionsPageApis.get({
    queryParams: {
      populate: "deep",
      locale: lang,
    },
  });

  const { pagebar, content, seo } = data;
  const { jsonLD } = formatSEO({ seo, lang });

  return (
    <div>
      {jsonLD}
      <Pagebar pagebar={pagebar} breadcrumbs={breadcrumbs} />
      <Content content={content} className="container py-16" />
    </div>
  );
};
export default PrivacyPolicyPage;
