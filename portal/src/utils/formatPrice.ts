"use client"
import { useApp } from "@/context";
import { fallbackLng } from "@/i18n/settings";

export function formatPrice(amount: number, lang: string = fallbackLng) {
  const { state } = useApp();
  const { currency } = state;

  if (!currency) return amount.toFixed(2);

  const convertedAmount =
    currency.code?.toLocaleLowerCase() !== "aed" ? amount * currency.exchange_rate : amount;
  return formatCurrency(convertedAmount, currency.code, { locale: lang });
}

const formatCurrency = (
  amount: number,
  currency: string,
  { locale }: { locale: string }
) => {
  let currencyReplaced = false;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "code",
    minimumFractionDigits: 2,
  })
    .formatToParts(amount)
    .map((item, idx, arr) => {
      if (
        (item.type === "currency" || item.type === "literal") &&
        currencyReplaced
      )
        return "";
      const nextCurrency =
        arr[idx + 1] && arr[idx + 1].type === "currency" && arr[idx + 1].value;
      if (item.type === "minusSign" && nextCurrency && !currencyReplaced) {
        currencyReplaced = true;
        return `${nextCurrency} ${item.value}`;
      }
      return `${item.value}`;
    })
    .join("");
};
