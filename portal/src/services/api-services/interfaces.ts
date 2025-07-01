export interface RequestParams<T> {
  fields: Array<keyof T>;
  sort: any;
  filters: Partial<{
    [key in keyof T | "$or" | "$and"]: any
  }>;
  locale: any;
  publicationState: string;
  pagination: Partial<{
    page: number | string;
    pageSize: number | string;
    withCount: boolean;
    start: number | string;
    limit: number | string;
  }>;
  populate: any;

  [key: string]: any; // Index signature to allow dynamic keys
}
