"use server";
import { getTranslation } from "@/i18n";
import { EventBookingApis } from "@/services/api/collections/event-booking";
import { redirect } from "next/navigation";
import React from "react";
import { CheckinCard } from "./_components/card";
import { EventAttendanceApis } from "@/services/api/collections/event-attendance";
import { getUserInfo } from "@/auth";

type Params = Promise<{ lang: string; slug: string }>;
type SearchParams = Promise<{ [key: string]: string | undefined }>;

const CheckinPage = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const { lang, slug } = await params;

  const { t } = await getTranslation("common");

  const { user } = await getUserInfo();

  if (!user?.isAdmin) {
    return redirect(`/signin?callbackUrl=/attendance/checkin/${slug}`);
  }

  const bookingId = Number(slug);

  const { data: bookingData } = await EventBookingApis.getById(
    Number(bookingId),
    {
      queryParams: {
        populate: "deep",
      },
    }
  );

  const { data: attendanceData } = await EventAttendanceApis.getAll({
    queryParams: {
      populate: "deep",
      filters: {
        event_booking: { $eq: bookingId },
      },
    },
  });

  const checkedInRecords = attendanceData.filter((attendance) => {
    return (
      attendance.event_booking?.id === Number(bookingId) && // Match bookingId
      attendance.checked_in_at !== null && // Has checked in
      attendance.checked_out_at === null // Has not checked out
    );
  });

  // Sort checked-in records by checked_in_at in descending order (most recent first)
  const sortedCheckedInRecords = checkedInRecords.sort((a, b) => {
    return new Date(b.checked_in_at) - new Date(a.checked_in_at);
  });

  // Get the last checked-in record (most recent)
  const lastCheckedInRecord = sortedCheckedInRecords[0];

  const lastCheckedInRecordId = lastCheckedInRecord?.id;

  return (
    <div className="overflow-hidden">
      <CheckinCard
        data={bookingData}
        bookingId={slug}
        lastCheckedInRecordId={lastCheckedInRecordId}
      />
    </div>
  );
};

export default CheckinPage;
