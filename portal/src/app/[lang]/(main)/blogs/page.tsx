"use server";
import { Pagebar } from "@/components/shared/common/pagebar";
import React from "react";
import { formatSEO } from "@/utils";
import { headers } from "next/headers";
import { Metadata } from "next";
import { routes } from "@/config";
import { BlogPageApis } from "@/services/api/page-services/blog-page";
import { BlogsApis } from "@/services/api/collections/blogs";
import { FeaturedArticles } from "@/components/shared/blogs/featured-articles";
import { BlogsListing } from "@/components/shared/blogs";
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
  const seo = await BlogPageApis.getSeo({
    queryParams: {
      locale: lang,
    },
  });
  const { metadata } = formatSEO({ seo, lang, currentUrl: url || "" });

  return metadata;
}

const BlogsPage = async ({
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
      text: t("breadcrumbs.blogs"),
      href: routes.blogs("", lang),
      isCurrent: true,
    },
  ];

  const filters: any = {};

  if (search) {
    filters.$or = [
      { title: { $containsi: search } },
      { search_keywords: { $containsi: search } },
    ];
  }

  const [{ data }, { data: blogsData, meta }, { data: featuredBlogs }] =
    await Promise.all([
      BlogPageApis.get({
        queryParams: {
          populate: "deep",
          locale: lang,
        },
      }),
      BlogsApis.getAll({
        queryParams: {
          populate: "deep",
          pagination: {
            page: Number(page ?? 1),
            pageSize: 9,
          },
          locale: lang,
          filters,
          sort: ["date:desc", "createdAt:desc"],
        },
      }),
      BlogsApis.getAll({
        queryParams: {
          populate: "deep",
          filters: {
            featured: { $eq: true },
          },
          locale: lang,
          sort: ["date:desc", "createdAt:desc"],
        },
      }),
    ]);

  const { pagebar, seo, featured_intro, listing_intro } = data;

  const { jsonLD } = formatSEO({ seo, lang });

  return (
    <div className="overflow-hidden">
      {jsonLD}
      <Pagebar pagebar={pagebar} breadcrumbs={breadcrumbs} />
      <FeaturedArticles
        blogs={featuredBlogs}
        featured_intro={featured_intro}
        lang={lang}
      />
      <BlogsListing
        blogs={blogsData}
        listing_intro={listing_intro}
        lang={lang}
        pagination={meta?.pagination}
      />
    </div>
  );
};

export default BlogsPage;
