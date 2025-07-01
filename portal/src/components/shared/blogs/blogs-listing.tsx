import React from "react";
import FadeAnimation from "@/components/animation/FadeAnimation";
import { BlogCard } from "../card";
import BlogModel from "@/services/api/collections/blogs/model";
import { useTranslation } from "@/i18n/client";
import Pagination from "@/components/ui/pagination";
import { routes } from "@/config";
import { MetaModel } from "@/models/meta.model";
import SearchInput from "@/components/forms/search";
import { getTranslation } from "@/i18n";

export const BlogsListing: React.FC<{
  blogs: BlogModel[];
  listing_intro: string;
  lang: string;
  pagination: MetaModel;
}> = async ({
  blogs,
  listing_intro,
  lang,
  pagination: { pageCount, page },
}) => {
  const { t } = await getTranslation("common", lang);
  ("Search...");
  return (
    <section className="bg-white overflow-hidden">
      <div className="container w-full h-full py-16 overflow-hidden">
        <FadeAnimation direction="left">
          <div className="flex flex-col justify-center mb-6">
            <h2 className="title">{t("titles.recent_blogs")}</h2>
            <p className="subtitle">{listing_intro}</p>
          </div>
        </FadeAnimation>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between lg:justify-start pb-6">
          <div className="flex items-center gap-x-4 cursor-pointer">
            <SearchInput />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 ">
          {blogs?.map((item: any, index: number) => (
            <BlogCard key={index} {...item} lang={lang} />
          ))}
        </div>
        <Pagination
          pageCount={pageCount}
          pageIndex={page}
          routeName={routes.blogs("", lang)}
          className="mt-10"
        />
      </div>
    </section>
  );
};
