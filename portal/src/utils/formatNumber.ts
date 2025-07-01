export function formatNumber(number: number, lang: string) {
  const formatter = new Intl.NumberFormat(lang);
  return formatter.format(number);
}
