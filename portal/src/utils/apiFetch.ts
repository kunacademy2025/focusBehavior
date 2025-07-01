"use server";

import {
  NEXT_PUBLIC_STRAPI_API_URL,
  API_ACCESS_TOKEN,
  SITE_URL,
  ENABLE_CACHE,
} from "@/config";
import { stringifyFilters } from "./stringifyFilters";

interface ApiResponse<T = any> {
  ok: boolean;
  status: number;
  data: T | null;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions {
  method: HttpMethod;
  url: string;
  data?: object;
  params?: string | object;
  noCache?: boolean;
  removeAutoPopulate?: boolean;
  useSiteUrl?: boolean;
  useFormData?: boolean;
}

const API_URL = NEXT_PUBLIC_STRAPI_API_URL;
const SITE_URL_ENABLED = SITE_URL;
const ACCESS_TOKEN = API_ACCESS_TOKEN;
const CACHE_ENABLED = ENABLE_CACHE ?? false;

/**
 * Get URL with optional base.
 * @param url - Endpoint URL.
 * @param useSiteUrl - Whether to use the SITE_URL base instead of API_URL.
 */
const getURL = (url: string, useSiteUrl: boolean) =>
  `${useSiteUrl ? SITE_URL_ENABLED : API_URL}${url}`;

/**
 * Generate headers for requests.
 * @param isFormData - Whether the request uses FormData.
 */
const getHeaders = (isFormData: boolean = false): HeadersInit => ({
  Authorization: `Bearer ${ACCESS_TOKEN}`,
  ...(isFormData ? {} : { "Content-Type": "application/json" }),
});

/**
 * Generate cache control headers.
 */
const getNextHeader = () => ({ tags: ["revalidate-collection"] });

/**
 * Build query parameters string.
 * @param params - Query parameters.
 * @param includePopulate - Whether to include Strapi's `populate` parameter.
 */
const buildQueryParams = (
  params?: string | object,
  includePopulate: boolean = true
): string => {
  const queryParams: string[] = includePopulate ? ["populate=deep,6"] : [];
  if (params) {
    const strParams =
      typeof params === "string" ? params : stringifyFilters(params);
    if (strParams) queryParams.push(strParams);
  }
  return queryParams.length ? `?${queryParams.join("&")}` : "";
};

async function fetchRequest<T>({
  method,
  url,
  data,
  params,
  noCache = false,
  removeAutoPopulate = false,
  useSiteUrl = false,
  useFormData = false,
}: FetchOptions): Promise<ApiResponse<T>> {
  try {
    const queryParams = buildQueryParams(params, !removeAutoPopulate);
    const finalURL = getURL(`${url}${queryParams}`, useSiteUrl);
    const body =
      useFormData && data
        ? (data as FormData)
        : data
        ? JSON.stringify(data)
        : undefined;

    const response = await fetch(finalURL, {
      method,
      headers: getHeaders(useFormData),
      next: getNextHeader(),
      cache: CACHE_ENABLED
        ? noCache
          ? "no-store"
          : "force-cache"
        : "no-store",
      body,
    });

    if (response.status !== 200) console.log(response);

    const result = await response.json();
    return {
      ok: response.ok,
      status: response.status,
      data: result,
    };
  } catch (error) {
    console.error(`${method} request to ${url} failed:`, error);
    return { ok: false, status: 500, data: null };
  }
}

/**
 * API wrapper for HTTP methods.
 */
export async function apiGet<T = any>(
  url: string,
  params?: string | object,
  removeAutoPopulate: boolean = false,
  useSiteUrl: boolean = false
) {
  return fetchRequest<T>({
    method: "GET",
    url,
    params,
    removeAutoPopulate,
    useSiteUrl,
  });
}

export async function apiPost<T = any>(
  url: string,
  data?: object,
  useSiteUrl: boolean = false,
  useFormData: boolean = false
) {
  return fetchRequest<T>({
    method: "POST",
    url,
    data,
    useSiteUrl,
    useFormData,
  });
}

export async function apiPut<T = any>(
  url: string,
  data?: object,
  useSiteUrl: boolean = false
) {
  return fetchRequest<T>({ method: "PUT", url, data, useSiteUrl });
}

export async function apiDelete<T = any>(
  url: string,
  params?: string | object,
  useSiteUrl: boolean = false
) {
  return fetchRequest<T>({ method: "DELETE", url, params, useSiteUrl });
}
