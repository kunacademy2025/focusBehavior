"use server";
import React from "react";
import { NewsLetterSection } from "@/components/shared/common";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { formatSEO } from "@/utils";
import { BlogsApis } from "@/services/api/collections/blogs";
import { BlogPageApis } from "@/services/api/page-services/blog-page";
import { Pagebar } from "@/components/shared/common/pagebar";
import { routes } from "@/config";
import { BlogsDetails } from "@/components/shared/blogs";
import { getTranslation } from "@/i18n";

type Params = Promise<{ lang: string; slug: string }>;

// export async function generateMetadata({
//   params,
// }: {
//   params: Params;
// }): Promise<Metadata> {
//   const { lang, slug } = await params;
//   const url = (await headers()).get("x-current-path");
//   const id = (await BlogsApis.getBySlug(slug)).data.id;
//   if (!id) notFound();
//   const seo = await BlogsApis.getSeo(id, {
//     queryParams: {
//       locale: lang,
//     },
//   });
//   const { metadata } = formatSEO({ seo, lang, currentUrl: url || "" });
//   return metadata;
// }

const BlogsDetailsPage = async ({ params }: { params: Params }) => {
  const { slug, lang } = await params;
  const { t } = await getTranslation("common");

  const breadcrumbs = [
    { text: t("breadcrumbs.home"), href: "/" },
    {
      text: t("breadcrumbs.blogs"),
      href: routes.blogs("", lang),
      isCurrent: true,
    },
  ];

  const [{ data: blogPage }, { data }] = await Promise.all([
    BlogPageApis.get({
      queryParams: {
        populate: "deep",
        locale: lang,
      },
    }),
    BlogsApis.getBySlug(slug, {
      queryParams: {
        populate: "deep",
        locale: lang,
      },
    }),
  ]);

  const { pagebar } = blogPage;

  const { seo } = data;

  const { jsonLD } = formatSEO({ seo, lang });

  return (
    <div className="overflow-hidden">
      {jsonLD}
      <Pagebar pagebar={pagebar} breadcrumbs={breadcrumbs} />
      <BlogsDetails data={data} />
    </div>
  );
};

export default BlogsDetailsPage;
