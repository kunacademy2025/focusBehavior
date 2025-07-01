export function removeEmptyFields<T extends Record<string, any>>(obj: T): T {
  const cleaned = {} as T;

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value !== "" && value !== null && value !== undefined) {
      cleaned[key as keyof T] = value;
    }
  });

  return cleaned;
}
