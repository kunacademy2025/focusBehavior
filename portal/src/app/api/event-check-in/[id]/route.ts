import { decrypt } from "@/services";
import { EventAttendanceApis } from "@/services/api/collections/event-attendance";
import { NextResponse, type NextRequest } from "next/server";
export const revalidate = 0;

type Params = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
): Promise<any> {
  const { id } = await params;

  try {
    if (!id) {
      return new Response(
        JSON.stringify({
          data: [],
        }),
        { status: 200 }
      );
    }

    // const bookingId = await decrypt(id);
    const bookingId = id;

    const response = await EventAttendanceApis.post(
      {
        data: {
          event_booking: bookingId ? { connect: [{ id: bookingId }] } : null,
          checked_in_at: new Date(),
        },
      },
      { queryParams: { populate: "deep" } }
    );

    if (!response.success) {
      return new Response(
        JSON.stringify({
          data: [],
        }),
        { status: 200 }
      );
    }

    const { event } = response?.data?.event_booking;

    if (event?.slug) {
      return NextResponse.redirect(
        `${process.env.SITE_URL}/attendance/${event.slug}`
      );
    } else {
      return new Response(JSON.stringify({ error: "Event not found." }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        data: event,
        message: "Checked in successfully.",
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify(JSON.stringify({ error: error.message })),
      { status: 403 }
    );
  }
}
