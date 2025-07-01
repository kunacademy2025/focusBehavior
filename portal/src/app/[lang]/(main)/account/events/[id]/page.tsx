"use server";
import { getUserInfo } from "@/auth";
import { MyEventCard } from "@/components/shared/card/my-event-card";
import { Container } from "@/components/shared/order/container";
import { OrderActions } from "@/components/shared/order/order-actions";
import { OrderInfo } from "@/components/shared/order/order-info";
import { OrderPaymentInfo } from "@/components/shared/order/order-payment-info";
import { OrderStatusProgress } from "@/components/shared/order/order-status-progress";
import {
  checkPaymentStatus,
  getPaymentById,
} from "@/services/api/collections/payments/actions";
import { decrypt } from "@/services/encrypt";
import { getStrapiId } from "@/utils/getStrapiId";
import { notFound } from "next/navigation";

type Params = Promise<{ lang: string; id: string }>;

export default async function OrderPage({ params }: { params: Params }) {
  const { id, lang } = await params;
  if (!id) notFound();

  const orderId: number = Number(await decrypt(id));

  if (!orderId) notFound();

  const { user } = await getUserInfo();

  const { data } = await getPaymentById({ id: orderId });

  if (!data) notFound();

  if (data?.payment_status !== "Cancelled") {
    await checkPaymentStatus({ id: orderId });
  }

  const { customer: orderCustomer } = data;

  if (!orderCustomer) return notFound();

  const orderCustomerId = getStrapiId(orderCustomer);

  if (orderCustomerId !== user?.id) notFound();

  const { order_code, payment_status, event_booking } = data;

  console.log("payment_status", payment_status);

  return (
    <>
      <Container className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <h2 className="font-bold text-2xl text-primary">{order_code}</h2>
          <div className="flex justify-end gap-x-1">
            <OrderActions item={data} id={orderId} lang={lang} />
          </div>
        </div>
        <div className="my-5 bg-white">
          <OrderStatusProgress status={payment_status} lang={lang} />
        </div>
        <div className="my-5 grid grid-cols-1 lg:grid-cols-3 gap-3">
          <OrderInfo item={data} lang={lang} />
          <OrderPaymentInfo item={data} lang={lang} />
        </div>
        <div className="my-5">
          <div className="grid grid-cols-12 bg-secondary py-3 rounded-[3px] text-white text-[12px] md:text-[14px]">
            <div className="col-span-1"></div>
            <div className="col-span-7">
              {" "}
              {lang === "ar" ? "فعالياتي" : "Event"}
            </div>
          </div>
          <div className="bg-white">
            {event_booking && <MyEventCard item={event_booking} lang={lang} />}
          </div>
        </div>
      </Container>
    </>
  );
}
