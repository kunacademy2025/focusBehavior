"use server";
import { Pagebar } from "@/components/shared/common/pagebar";
import React from "react";
import { ContactInfo } from "@/components/shared/contact";
import { ContactPageApis } from "@/services/api/page-services/contact-page";
import { routes } from "@/config";
import { headers } from "next/headers";
import { formatSEO } from "@/utils";
import { Metadata } from "next";
import { getTranslation } from "@/i18n";
import { ContactForm } from "@/components/forms/contact";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang } = await params;

  const url = (await headers()).get("x-current-path");
  const seo = await ContactPageApis.getSeo({
    queryParams: {
      locale: lang,
    },
  });
  const { metadata } = formatSEO({ seo, lang, currentUrl: url || "" });
  return metadata;
}

const ContactPage = async ({ params }: { params: Params }) => {
  const { lang } = await params;
  const { t } = await getTranslation("common", lang);

  const breadcrumbs = [
    { text: t("breadcrumbs.home"), href: "/" },
    {
      text: t("breadcrumbs.contact"),
      href: routes.contact(""),
      isCurrent: true,
    },
  ];

  const { data } = await ContactPageApis.get({
    queryParams: {
      populate: "deep",
      locale: lang,
    },
  });

  const { pagebar, form_image } = data;

  return (
    <div className="overflow-hidden">
      <Pagebar pagebar={pagebar} breadcrumbs={breadcrumbs} />
      <ContactInfo data={data} lang={lang} />
      <ContactForm image={form_image} lang={lang} />
    </div>
  );
};

export default ContactPage;
