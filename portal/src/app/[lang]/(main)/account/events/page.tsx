"use server";

import { getUserInfo } from "@/auth/getUserInfo";
import { OrdersPagination } from "@/components/shared/order/orders-pagination";
import { getPaymentsByCustomer } from "@/services/api/collections/payments/actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = Promise<{ lang: string }>;
type SearchParams = Promise<{ [key: string]: string | undefined }>;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "My Events",
  };
}

export default async function MyEventsPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { lang } = await params;

  const { user } = await getUserInfo();

  if (!user) return notFound();

  const { data, meta } = await getPaymentsByCustomer(user?.id, searchParams);

  return <OrdersPagination data={data} meta={meta?.pagination} lang={lang} />;
}
