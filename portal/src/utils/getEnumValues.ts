export function getEnumValues<T extends object>(enumType: T): string[] {
  return Object.keys(enumType).filter(
    (key) => typeof enumType[key as keyof T] !== "string"
  );
}

export function getEnumValue<T>(enumType: T, value: keyof T): string {
  return enumType[value] as string;
}

export function getEnumKeyValuePairs<T extends object>(
  enumType: T
): { name: string; value: string }[] {
  return getEnumValues(enumType).map((item: string) => ({
    name: item,
    value: item,
  }));
}
