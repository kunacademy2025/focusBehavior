"use client";

import { getStrapiData } from "@/utils/index";
import { OrderInfoBox } from "./order-info-box";
import { formatPrice } from "@/utils/formatPrice";
import { useTranslation } from "@/i18n/client";

export const OrderPaymentInfo = ({ item, lang }: { item: any; lang: string }) => {
  const { subtotal, tax, total } = getStrapiData(item);

  const { t } = useTranslation("common", lang);
  let values = [
    {
      label: t("Subtotal"),
      value: formatPrice(subtotal),
    },
  ];

  if (tax > 0)
    values = [
      ...values,
      {
        label: t("tax"),
        value: formatPrice(tax),
      },
    ];

  values = [
    ...values,
    {
      label: t("total"),
      value: formatPrice(total),
    },
  ];

  return (
    <OrderInfoBox title={t("payment_information")}>
      <div className="flex flex-col">
        {values.map((item: any, index: number) => (
          <div
            key={index}
            className="flex justify-between mb-2 border-b border-fill-secondary text-sm py-1"
          >
            <span className="font-bold">{item.label}</span>
            <span
              className={
                index === values.length - 1 ? "text-skin font-bold" : ""
              }
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </OrderInfoBox>
  );
};
