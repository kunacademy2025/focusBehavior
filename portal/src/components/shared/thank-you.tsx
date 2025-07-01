"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FiThumbsUp } from "react-icons/fi";
import PurchaseTracker from "../controls/facebook-pixel/purchase-tracker";
import PaymentModel from "@/services/api/collections/payments/model";
import { useTranslation } from "@/i18n/client";

type Params = Promise<{ lang: string }>;
export const ThankYou = ({ data, lang }: { data: PaymentModel; lang: string }) => {
  const { payment_link, event_booking, customer } = data;

  const { ticket, event } = event_booking;

  const { t } = useTranslation("common", lang);

  const returnUrl = useMemo(() => {
    try {
      const url = new URL(payment_link);
      const pathname = url.pathname.replace(/\/thank-you$/, ""); // remove /thank-you only at end
      return `${url.origin}${pathname}${url.search}`; // preserve query params
    } catch (err) {
      return "/";
    }
  }, [payment_link]);

  const [clientIP, setClientIP] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientIP = async () => {
      try {
        const res = await fetch("https://api64.ipify.org?format=json");
        const data = await res.json();
        setClientIP(data.ip);
      } catch (err) {
        console.error("IP fetch failed", err);
      }
    };

    fetchClientIP();
  }, []);

  return (
    <>
      <PurchaseTracker
        price={Number(ticket?.price)}
        eventId={event.id}
        email={customer?.email}
        phone={customer?.phone_number}
        clientIP={clientIP}
      />

      <section className="relative min-h-screen py-16 flex items-center justify-center text-center bg-gray-50">
        <div className="container max-w-2xl px-4">
          <div className="flex flex-col items-center">
            <div className="size-24 bg-primary/10 text-primary rounded-full text-5xl flex items-center justify-center shadow-md mb-6">
              <FiThumbsUp className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("you_are_all_set")}
            </h1>
            <p className="text-slate-500 mb-8 max-w-xl">
              {t("thank_you_for_your_purchase")} <strong>{event?.title}</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {returnUrl && (
                <Link
                  href={returnUrl}
                  className="inline-block px-6 py-3 rounded-md font-semibold text-white bg-primary hover:bg-primary-dark transition"
                >
                  {t("view_my_events")}
                </Link>
              )}
              <Link
                href="/"
                className="inline-block px-6 py-3 rounded-md font-semibold text-primay border border-primary/20 hover:bg-primary/5 transition"
              >
                {t("back_to_home")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
