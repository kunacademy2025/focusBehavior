"use server";

import { Options } from "@/types";
import { getStrapiId, stringifyFilters } from "@/utils";
import { apiDelete, apiGet, apiPost } from "@/utils/apiFetch";

export async function addToWishlist(userId: number, courseId: number) {
  const data = {
    course: {
      connect: [courseId],
    },
    user: {
      connect: [userId],
    },
  };

  const response = await apiPost(`/api/`, { data: data });
  return response?.data;
}

export async function getMyWishlist(
  pageSize: number = 10,
  pageIndex: number = 0,
  search: string = "",
  userId?: number
) {
  let options: Options = {
    pagination: {
      pageSize,
      page: pageIndex,
    },
    sort: ["createdAt:desc"],
  };

  let filters = {};

  if (search)
    filters = { ...filters, course: { title: { $containsi: search } } };
  if (userId) {
    filters = {
      ...filters,
      user: { $eq: userId },
    };
  }

  options = { ...options, filters };

  const response = await apiGet(`/api/`, stringifyFilters(options));

  const courseData =
    response?.data?.data?.map((item: unknown) => {
      const course = item?.attributes?.course?.data;
      return course;
    }) || [];

  return courseData || {};
}

export async function getWishlist(userId: number) {
  let options: Record<string, unknown> = {};

  options = { ...options, sort: ["createdAt:desc"] };

  let filters = {};

  if (userId) {
    filters = {
      ...filters,
      user: { $eq: userId },
    };
  }

  options = { ...options, filters };

  const response = await apiGet(`/api`, stringifyFilters(options));

  return response || {};
}

export async function removeFromWishlist(userId: number, courseId: number) {
  let options: Record<string, unknown> = {};

  // let filters: Record<string, unknown> = {};

  if (userId && courseId) {
    // filters = {
    //   ...filters,
    //   user: { $eq: userId },
    //   course: { $eq: courseId },
    // };
  }

  options = { ...options, sort: ["createdAt:desc"] };

  const wishlistItems = await apiGet(
    `/api`,
    stringifyFilters(options)
  );

  if (wishlistItems?.data?.data?.length) {
    const wishlistItemId = getStrapiId(wishlistItems?.data?.data[0]);

    await apiDelete(`/api/${wishlistItemId}`);
  }
}
