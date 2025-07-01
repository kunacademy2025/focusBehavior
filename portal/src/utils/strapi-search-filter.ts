type StrapiOperator =
  | "$eq"
  | "$eqi"
  | "$ne"
  | "$nei"
  | "$lt"
  | "$lte"
  | "$gt"
  | "$gte"
  | "$in"
  | "$notIn"
  | "$contains"
  | "$notContains"
  | "$containsi"
  | "$notContainsi"
  | "$null"
  | "$notNull"
  | "$between"
  | "$startsWith"
  | "$startsWithi"
  | "$endsWith"
  | "$endsWithi";

interface StrapiFieldFilter {
  field: string;
  operator?: StrapiOperator;
}

interface BuildStrapiSearchFilterOptions {
  defaultOperator?: StrapiOperator;
  multi?: boolean;
}

export function buildStrapiSearchFilter(
  search: string,
  fields: (string | StrapiFieldFilter)[],
  options: BuildStrapiSearchFilterOptions = {
    defaultOperator: "$containsi",
    multi: true,
  }
) {
  const trimmed = search.trim();
  if (!trimmed) return {};

  const { defaultOperator = "$containsi", multi = true } = options;

  const buildOr = (keyword: string) =>
    fields.map((fieldConfig) => {
      if (typeof fieldConfig === "string") {
        return { [fieldConfig]: { [defaultOperator]: keyword } };
      }

      const { field, operator = defaultOperator } = fieldConfig;
      return { [field]: { [operator]: keyword } };
    });

  if (multi) {
    const keywords = trimmed.toLowerCase().split(/\s+/); // split by spaces
    return {
      $and: keywords.map((word) => ({
        $or: buildOr(word),
      })),
    };
  }

  return {
    $or: buildOr(trimmed),
  };
}
