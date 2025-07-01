"use client";

import Link from "next/link";

import { formatDate, getStrapiData } from "@/utils/index";
import { OrderInfoBox } from "./order-info-box";
import { useTranslation } from "@/i18n/client";

type Params = Promise<{ lang: string }>;
export const OrderInfo = ({ item, lang }: { item: any; lang: string }) => {
  const { createdAt, payment_type, tracking_code, tracking_link } =
    getStrapiData(item);

  const { t } = useTranslation("common", lang);
  let values = [
    {
      label: t("order_date"),
      value: formatDate(createdAt, "MMM. D, YYYY HH:mm a"),
    },
    {
      label: t("payment_method"),
      value: payment_type,
    },
  ];
  if (tracking_code)
    values = [
      ...values,
      {
        label: "Tracking Code",
        value: (
          <>
            {tracking_link && (
              <Link href={tracking_link} target="_blank" rel="nofollow">
                {tracking_code}
              </Link>
            )}
            {!tracking_link && <span>{tracking_code}</span>}
          </>
        ),
      },
    ];

  return (
    <OrderInfoBox title={t("information")}>
      <div className="flex flex-col text-sm">
        {values.map((item: any, index: number) => (
          <div className="flex justify-between items-center mb-2" key={index}>
            <span className="font-bold">{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </OrderInfoBox>
  );
};
