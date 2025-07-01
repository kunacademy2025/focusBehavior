import { EventAttendanceApis } from "@/services/api/collections/event-attendance";
import { NextResponse, type NextRequest } from "next/server";
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<any> {
  const id = params.id;

  try {
    if (!id) {
      return new Response(
        JSON.stringify({
          data: [],
        }),
        { status: 200 }
      );
    }

    const response = await EventAttendanceApis.put(
      id,
      {
        data: {
          checked_out_at: new Date(),
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
  } catch (error: any) {
    return new Response(
      JSON.stringify(JSON.stringify({ error: error.message })),
      { status: 403 }
    );
  }
}
