"use server";

import { Data, Options } from "@/types";
import { stringifyFilters } from "@/utils";
import { apiDelete, apiGet, apiPost } from "@/utils/apiFetch";

const api_name = '';
export async function subscribeToNewsletter(data: Data) {
  const resp = await apiPost(`/api/${api_name}`, {
    data,
  });
  return resp;
}

export async function isEmailSubscribedToNewsletter(data: Data) {
  const options: Options = {
    filters: {
      email: {
        $eq: data?.email,
      },
    },
  };

  const response = await apiGet(`/api/${api_name}`, stringifyFilters(options));

  if (response?.ok && response?.data?.data && response.data?.data.length > 0) {
    return true;
  }
  return false;
}

export async function unsubscribeToNewsletter(email: string) {
  const options: Options = {
    filters: {
      email: {
        $eq: email,
      },
    },
  };

  const response = await apiDelete(
    `/api/${api_name}`,
    stringifyFilters(options)
  );

  return response;
}
