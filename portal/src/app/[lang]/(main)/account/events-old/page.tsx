"use server";

import { getUserInfo } from "@/auth";
import { MyEvents } from "@/components/shared/my-accounts";
import { EventBookingApis } from "@/services/api/collections/event-booking";

type Params = Promise<{ lang: string }>;
type SearchParams = Promise<{ [key: string]: string | undefined }>;

const Page = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const { lang } = await params;
  const { page, search } = await searchParams;

  const user = await getUserInfo();

  const { data, meta } = await EventBookingApis.getAll({
    queryParams: {
      populate: "deep",
      filters: {
        user: { id: { $eq: user?.user?.id } },
      },
      // pagination: {
      //   page: Number(page ?? 1),
      //   pageSize: 5,
      // },
      sort: ["booking_date:desc", "createdAt:desc"],
    },
  });

  const groupedData = Object.values(
    data.reduce((acc: any, curr: any) => {
      const event = curr?.event;

      if (!event || !event.id) {
        console.warn(
          "Skipping booking due to missing event or event ID",
          curr
        );
        return acc; // Skip this item if event is null or id is missing
      }

      const eventId = event.id;

      if (!acc[eventId]) {
        acc[eventId] = {
          event: curr.event,
          bookings: [],
        };
      }

      acc[eventId].bookings.push(curr);

      return acc;
    }, {})
  );

  const payments = data
    .filter((booking: any) => booking.payment)
    .map((booking: any) => booking.payment);

  return (
    <div className="overflow-hidden min-h-screen w-full h-full">
      <MyEvents
        data={!user?.user ? [] : groupedData}
        payments={!user?.user ? [] : payments}
        lang={lang}
        pagination={meta?.pagination}
      />
    </div>
  );
};

export default Page;
