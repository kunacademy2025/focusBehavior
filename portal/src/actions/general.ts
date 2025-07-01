"use server";

import { Options } from "@/types";
import { getStrapiData, stringifyFilters } from "@/utils";
import { apiGet } from "@/utils/apiFetch";

export async function getItemSEO(api_name: string, id?: number, lang?: string) {
  let options: Options = {
    populate: {
      seo: {
        populate: { metaImage: true },
      },
    },
  };
  if (lang) options = { ...options, filters: { locale: lang } };
  const data = await apiGet(
    `/api/${api_name}${id ? `/${id}` : ""}`,
    stringifyFilters(options),
    true
  );

  const { seo } = getStrapiData(data?.data);
  return seo;
}

export async function getPageData(
  api_name: string,
  id?: number,
  lang?: string
) {
  const data = await apiGet(
    `/api/${api_name}${id ? `/${id}` : ""}`,
    `locale=${lang}`
  );
  return data?.data;
}
