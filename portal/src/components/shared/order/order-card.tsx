"use client";

import Link from "next/link";
import cn from "classnames";
import { formatDate, getStrapiData, path } from "@/utils/index";
import { getOrderStatusColor } from "./order-utils";
import { formatPrice } from "@/utils/formatPrice";
import { MyEventCard } from "../card/my-event-card";
import PaymentModel from "@/services/api/collections/payments/model";
import { useEffect, useState } from "react";
import { encrypt } from "@/services";
import { useTranslation } from "@/i18n/client";

export const OrderCard = ({
  item,
  lang,
}: {
  item: PaymentModel;
  lang: string;
}) => {
  const {
    id,
    event_booking,
    order_code,
    createdAt,
    total,
    payment_status,
    first_name,
    last_name,
  } = getStrapiData(item);

  const { t } = useTranslation("common", lang);
  const [paymentLink, setPaymentLink] = useState("");

  useEffect(() => {
    const fetchEncryptedId = async () => {
      const encryptPaymentId = await encrypt(id.toString());
      setPaymentLink(`/account/events/${encryptPaymentId}`);
    };

    fetchEncryptedId();
  }, [id]);

  const headers = [
    {
      label: t("payment_date"),
      value: formatDate(createdAt, "MMM. D, YYYY HH:mm a"),
    },
    {
      label: t("status"),
      value: (
        <>
          <span
            className={cn("font-bold", getOrderStatusColor(payment_status))}
          >
            {payment_status.toString()}
          </span>
        </>
      ),
    },
    {
      label: t("receipt"),
      value: `${first_name} ${last_name}`,
    },
    {
      label: t("total"),
      value: formatPrice(total),
    },
  ];

  console.log("payment_status", payment_status);

  
  return (
    <div className="mb-10">
      <h2 className="mb-2">
        <Link className="text-primary" href={paymentLink}>
          {order_code}
        </Link>
      </h2>
      <div className="border border-[#ccc] rounded">
        <div className="bg-[#fafafa] py-2 px-5 flex flex-col md:flex-row border-b border-[#e2e2e2] rounded-t items-center">
          {headers.map((item: any, index: number) => (
            <div
              key={index}
              className="text-[#666] font-bold text-[13px] flex flex-col w-full lg:w-1/5 mb-3 md:mb-0"
            >
              <div>{item.label}</div>
              <div className="font-normal truncate">{item.value}</div>
            </div>
          ))}
          <div className="mr-0 ml-auto mb-3 md:mb-0">
            <Link
              href={paymentLink}
              className="py-2 px-3 rounded text-sm text-white bg-primary focus:outline-none transition duration-300 hover:bg-secondary"
            >
              {t("view_details")}
            </Link>
          </div>
        </div>
        <div className="p-5 flex items-center justify-start flex-nowrap overflow-hidden">
          {event_booking && <MyEventCard item={event_booking} lang={lang} />}
        </div>
      </div>
    </div>
  );
};
