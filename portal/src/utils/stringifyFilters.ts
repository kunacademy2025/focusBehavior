import qs from "qs";

export const stringifyFilters = (obj: unknown) => {
  return qs.stringify(obj, { encode: false, encodeValuesOnly: true });
};
