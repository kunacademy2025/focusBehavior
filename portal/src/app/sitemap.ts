"use server";

import { MetadataRoute } from "next";

import { languages, fallbackLng } from "@i18n/settings";
import { SITE_URL } from "@/config";
import { modules } from "@/utils/modules";
import { path } from "@/utils/path";
import { FetcherFunction, ItemData, SitemapItem } from "@/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let results: Array<SitemapItem> = [];

  type Formatter = keyof typeof path;

  //add static pages
  const staticPages = Object.keys(path)
    .filter((item: string) => item !== "search")
    .map((itemStr: string) => {
      const item: Formatter = itemStr as Formatter;
      const formatter: (slug: string, lang: string) => string = path[item];
      return getItem(formatter, "", "weekly", 1);
    });
  results = [...results, ...staticPages];

  let i: number = 0;
  for (i; i < modules.length; i++) {
    const urls = await getURLS(modules[i].fetcher);
    results = [
      ...results,
      ...urls.map(({ slug, lang }: { slug: string; lang: string }) =>
        getLocalizedItem(modules[i].formatter, lang, slug, "monthly", 0.8)
      ),
    ];
  }

  return results;
}

function getItem(
  formatter: (slug: string, lang: string) => string,
  slug: string = "",
  frequency: string = "weekly",
  priorty: number = 1
) {
  const mainURL = `${SITE_URL}${formatter(slug, fallbackLng).replace(
    `/${fallbackLng}`,
    ""
  )}`;
  let alts = {};
  languages
    .filter((lang: string) => lang !== fallbackLng)
    .forEach((lang: string) => {
      alts = { ...alts, [lang]: `${SITE_URL}${formatter(slug, lang)}` };
    });
  return {
    url: mainURL,
    lastModified: new Date(),
    changeFrequency: frequency,
    priority: priorty,
    alternates: {
      languages: alts,
    },
  };
}

function getLocalizedItem(
  formatter: (slug: string, lang: string) => string,
  lang: string,
  slug: string = "",
  frequency: string = "weekly",
  priority: number = 1
) {
  return {
    url: `${SITE_URL}${formatter(slug, lang).replace(`/${fallbackLng}`, "")}`,
    lastModified: new Date(),
    changeFrequency: frequency,
    priority: priority,
  };
}
async function getURLS(
  fetcher: FetcherFunction
): Promise<Array<{ slug: string; lang: string }>> {
  let pageCounts: number = 1;
  let indx: number = 1;
  let urls: Array<{ slug: string; lang: string }> = [];

  let i: number = 0;
  for (i; i < languages.length; i++) {
    const lang = languages[i];
    while (indx <= pageCounts) {
      const data = await fetcher(lang, 25, indx);
      pageCounts = data?.meta?.pagination?.pageCount || pageCounts;
      if (data?.data?.length)
        urls = [
          ...urls,
          ...data?.data?.map((item: ItemData) => ({
            slug: item?.attributes?.slug,
            lang,
          })),
        ];
      indx++;
    }
    indx = 1;
    i++;
  }

  return urls;
}
