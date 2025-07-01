"use server";
import { ThankYou } from "@/components/shared/thank-you";
import { checkPaymentStatus } from "@/services/api/collections/payments/actions";
import { decrypt } from "@/services/encrypt";
import { notFound } from "next/navigation";

type Params = Promise<{ lang: string; id: string }>;

const ThankYouPage = async ({ params }: { params: Params }) => {
  const { id, lang } = await params;

  if (!id) notFound();

  const orderId: number = Number(await decrypt(id));

  if (!orderId) notFound();

  const { data } = await checkPaymentStatus({ id: orderId });

  if (!data) notFound();

  return (
    <>
      <ThankYou data={data} />
    </>
  );
};

export default ThankYouPage;
