"use server";
import FadeAnimation from "@/components/animation/FadeAnimation";
import { EventAttendanceApis } from "@/services/api/collections/event-attendance";
import { EventsApis } from "@/services/api/collections/events";
import React from "react";
import { EventAttendanceTable } from "../_components/table";
import { getUserInfo } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "rizzui";
import toast from "react-hot-toast";

type Params = Promise<{ lang: string; slug: string }>;

const AttendancePage = async ({ params }: { params: Params }) => {
  const { lang, slug } = await params;

  const { user } = await getUserInfo();

  if (!user.isAdmin) {
    return redirect("/signin");
  }

  const { data: eventData } = await EventsApis.getBySlug(slug, {
    queryParams: { fields: ["id", "title"], locale: lang },
  });

  const { data: attendanceData } = await EventAttendanceApis.getAll({
    queryParams: {
      populate: "deep",
      filters: {
        event_booking: {
          event: {
            id: eventData?.id,
          },
        },
      },
    },
  });

  const groupedData = attendanceData.reduce((acc, entry) => {
    const { first_name, last_name } = entry.event_booking.user;
    const existingUser = acc.find(
      (user) => user.first_name === first_name && user.last_name === last_name
    );

    const checkInOut = {
      id: entry.id,
      checked_in_at: entry.checked_in_at,
      checked_out_at: entry.checked_out_at,
    };

    if (existingUser) {
      existingUser.check_ins.push(checkInOut);
    } else {
      acc.push({
        first_name,
        last_name,
        check_ins: [checkInOut],
      });
    }

    return acc;
  }, []);

  const handleCheckOut = async (id: string) => {
    try {
      const response = await EventAttendanceApis.put(id, {
        data: {
          checked_out_at: new Date(),
        },
      });

      if (response) {
        toast.success("Checked out successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error checking out:", error);
    }
  };

  const handleBulkCheckOut = () => {
    groupedData.forEach((user) => {
      user.check_ins.forEach(async (entry) => {
        await handleCheckOut(entry.id);
      });
    });
  };

  return (
    <div className="overflow-hidden">
      <div className="relative bg-white h-[20vh]">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-neutral-950/90 to-neutral-950/0 from-[30%]" />
      </div>

      <div className="container pt-10">
        <FadeAnimation
          inViewOnce={false}
          direction="right"
          className="flex gap-4 flex-wrap items-center justify-between pb-6"
        >
          <h1 className="text-2xl md:text-3xl xl:text-4xl mt-3 text-primary">
            {eventData?.title}
          </h1>
          <Button
            variant="outline"
            onClick={() => handleBulkCheckOut()}
            className="px-6 uppercase "
          >
            Check Out All
          </Button>
        </FadeAnimation>
        <div dir="ltr">
          <EventAttendanceTable data={groupedData} />
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
