import qs from "qs";

// Helper method to build query strings using qs
export function buildQueryString(queryParams?: Record<string, any>): string {
  if (!queryParams) return "";

  return qs.stringify(queryParams, {
    encodeValuesOnly: true,
    encode: false,
    addQueryPrefix: true,
  });
}

export function flattenAttributes(
  data: Record<string, any> | Record<string, any>[]
): Record<string, any> | Record<string, any>[] {
  if (!data || typeof data !== "object") return data;

  if (Array.isArray(data)) {
    // If it's an array, apply the function to each object in the array
    return data.map((item) => flattenAttributes(item)) as Record<string, any>[];
  }

  const flatten = (obj: Record<string, any>): Record<string, any> => {
    let result: Record<string, any> = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key === "data" && Array.isArray(obj[key])) {
          // Directly assign the array to the parent key
          result = obj[key].map((item: any) => flattenAttributes(item));
        } else if (obj[key]?.data === null) {
          // Handle specific case where key contains { data: null }
          result[key] = null;
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
          if (
            (key === "attributes" || key === "data") &&
            !Array.isArray(obj[key])
          ) {
            // Flatten attributes or data objects
            const flattenedAttributes = flatten(obj[key]);
            for (const attrKey in flattenedAttributes) {
              if (flattenedAttributes.hasOwnProperty(attrKey)) {
                result[attrKey] = flattenedAttributes[attrKey];
              }
            }
          } else {
            result[key] = flattenAttributes(obj[key]); // Recursively flatten nested objects
          }
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  };

  return flatten(data);
}
