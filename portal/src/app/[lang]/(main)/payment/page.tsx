"use server";

import { notFound } from "next/navigation";
import Script from "next/script";
import { decrypt } from "@/services";
import { checkPaymentStatus } from "@/services/api/collections/payments/actions";
import { ProcessPayment } from "@/components/shared/checkout/process-payment/process-payment-content";

export default async function ProcessPaymentPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { id } = (await searchParams) || {};
  if (!id) notFound();

  const payment_id = await decrypt(id as string);

  if (!payment_id) notFound();

  const resp = await checkPaymentStatus({ id: Number(payment_id) });

  return (
    <>
      <div className="relative w-full h-[25vh] py-10">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-neutral-950/90 to-neutral-950/0 from-[15%]" />
      </div>
      <div className="inset-0 mx-auto lg:max-w-screen-2xl px-6 sm:px-8 lg:px-10 py-10">
        <Script id="gtagconversion">{`gtag('event', 'conversion', {'send_to': 'AW-10961596124/QzJjCKH80KIZENzd8uoo'});`}</Script>
        <ProcessPayment data={resp?.data} />
      </div>
    </>
  );
}
