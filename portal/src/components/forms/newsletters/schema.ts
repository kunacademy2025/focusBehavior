import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Looks like this is not a valid email address."),
  date: z.string().datetime().optional(),
});
