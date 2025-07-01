export type SitemapItem = {
  url: string;
  lastModified: Date;
  changeFrequency: string;
  priority: number;
  alternates?: {
    languages: { [lang: string]: string };
  };
};

// This represents the structure of each item returned by the API (assumed structure).
export type ItemData = {
  attributes: {
    slug: string;
  };
};

// This represents the pagination metadata.
export type Meta = {
  pagination: {
    pageCount: number;
  };
};

// The type for the response from the fetcher function.
export type FetcherResponse = {
  data: ItemData[];
  meta: Meta;
};

// `fetcher` function type.
export type FetcherFunction = (
  lang: string,
  pageSize: number,
  pageIndex: number
) => Promise<FetcherResponse>;
