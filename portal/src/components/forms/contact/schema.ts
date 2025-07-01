import { isPhoneValid } from "@/utils";
import { z } from "zod";

export const contactFormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Looks like this is not a valid email address."),
  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .refine(isPhoneValid, {
      message: "Looks like this is not a valid phone number!",
    }),
  message: z.string().min(1, "Message is required"),
  submit_date: z.string().datetime().optional(),
  status: z.enum(["New", "Resolved"]).default("New").optional(),
  country: z.string().optional(),
  captcha: z.string().optional(),
});
