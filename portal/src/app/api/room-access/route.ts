import { NextRequest, NextResponse } from "next/server";
import { EventBookingApis } from "@/services/api/collections/event-booking";
import { getUserInfo } from "@/auth";
import { generateSecureToken } from "@/utils/generateSecureToken";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get("eventId");

  // Authenticate the user (e.g., using session or token)
  const session = await getUserInfo();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if the user has purchased access
  const { data } = await EventBookingApis.getAll({
    queryParams: {
      filters: {
        user: { id: { $eq: session.user.id } },
        payment: { payment_status: { $eq: "Paid" } },
        event: { id: { $eq: eventId } },
      },
    },
  });

  if (!data.length) {
    return NextResponse.json({ error: "Access Denied" }, { status: 403 });
  }

  // Generate a secure token (implement this function securely)
  const token = generateSecureToken({
    userId: session.user.id,
    eventId,
  });

  return NextResponse.json({ token });
}
