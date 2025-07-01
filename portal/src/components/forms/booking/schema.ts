import { z } from "zod";

export const bookingSchema = z.object({
  event: z.any(),
  user: z.any(),
  booking_date: z.any(),
  ticket: z.any(),
  ticket_quantity: z.any(),
  access_type: z.any(),
  status: z.any(),
  subscription: z.any(),
});
