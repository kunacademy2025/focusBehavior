"use server";

import { stringifyFilters } from "@/utils";
import { apiGet } from "@/utils/apiFetch";

export async function doSearch(searchTerm: string) {
  const options = {
    query: searchTerm,
  };
  const response = await apiGet(
    "/api/fuzzy-search/search?populate[services]=deep&populate[blogs]=deep&populate[packages]=deep",
    stringifyFilters(options),
    false
  );

  return response;
}
