import { BlogsApis } from "@/services/api/collections/blogs";
import { EventsApis } from "@/services/api/collections/events";
import { SponsorApis } from "@/services/api/collections/sponsors";
import { TestimonialsApis } from "@/services/api/collections/testimonials";
import { HomePageApis } from "@/services/api/page-services/home-page";

export const fetchHomePageData = async (lang: string) => {
  const today = new Date().toISOString();
  
  const [
    { data: homePageData },
    { data: testimonialsData },
    { data: blogsData },
    { data: sponsorsData },
    { data: showingEvents },
    { data: upcomingEvents },
    { data: featuredEvents },
    { data: oldEvents },
  ] = await Promise.all([
    HomePageApis.get({
      queryParams: {
        populate: "deep",
        locale: lang,
      },
    }),
    TestimonialsApis.getAll({
      queryParams: {
        populate: "deep",
        locale: lang,
      },
    }),
    BlogsApis.getAll({
      queryParams: {
        populate: "main_image",
        locale: lang,
        filters: {
          featured: { $eq: true },
        },
      },
    }),
    SponsorApis.getAll({
      queryParams: {
        populate: "deep",
        locale: lang,
        sort: ["sort_order:asc"],
      },
    }),
    EventsApis.getAll({
      queryParams: {
        populate: "deep",
        locale: lang,
        sort: ["startDate:desc", "createdAt:desc"],
        filters: {
          go_live: { $eq: true },
          startDate: {
            $lte: today,
          },
          endDate: {
            $gte: today,
          },
        },
      },
    }),
    EventsApis.getAll({
      queryParams: {
        populate: "deep",
        pagination: {
          pageSize: 6,
        },
        locale: lang,
        sort: ["startDate:desc", "createdAt:desc"],
        filters: {
          startDate: {
            $gt: today,
          },
          go_live: { $eq: true },
        },
      },
    }),
    EventsApis.getAll({
      queryParams: {
        populate: "deep",
        locale: lang,
        filters: {
          featured_in_hero: { $eq: true },
        },
        go_live: { $eq: true },
      },
    }),
    EventsApis.getAll({
      queryParams: {
        populate: "deep",
        pagination: {
          pageSize: 6,
        },
        locale: lang,
        sort: ["startDate:desc", "createdAt:desc"],
      },
    }),
  ]);

  return {
    homePageData,
    testimonialsData,
    blogsData,
    sponsorsData,
    showingEvents,
    upcomingEvents,
    featuredEvents,
    oldEvents,
  };
};
