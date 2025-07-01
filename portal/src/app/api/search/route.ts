import { getLanguage } from "@/i18n/utils/getLanguage";
import { BlogsApis } from "@/services/api/collections/blogs";
import { EventsApis } from "@/services/api/collections/events";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim() || "";

  if (!query) return NextResponse.json([]);

  const lang = (await getLanguage()) || "en";

  const [events, blogs] = await Promise.all([
    fetchData(EventsApis, query, lang),
    fetchData(BlogsApis, query, lang),
  ]);

  return NextResponse.json({ events, blogs });
}

const fetchData = async (
  api: typeof EventsApis | typeof BlogsApis,
  query: string,
  lang: string
) => {
  try {
    const { data } = await api.getAll({
      queryParams: {
        populate: "deep",
        locale: lang,
        filters: {
          $or: [
            { title: { $containsi: query } },
            { search_keywords: { $containsi: query } },
          ],
        },
        sort: ["title:asc", "createdAt:desc"],
      },
    });

    return (data ?? []).map((item: any) => ({
      title: item.title,
      slug: item.slug,
      image: item.main_image ?? null,
    }));
  } catch (error) {
    console.error(`Error fetching data from ${api}:`, error);
    return [];
  }
};
