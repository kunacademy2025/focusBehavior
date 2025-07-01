import { isPhoneValid } from "@/utils";
import { z } from "zod";

export const checkoutSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  country: z.string().min(1, "Country is required"),
  phone_number: z
    .string()
    .optional()
    .refine((val) => val?.length, {
      message: "Phone number is required",
    })
    .refine((val) => !val || isPhoneValid(val), {
      message: "Looks like this is not a valid phone number!",
    }),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Looks like this is not a valid email address."),
  address_line_1: z.string().min(1, "Street address 1 is required"),
  address_line_2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().optional(),
  zip: z.string().min(1, "ZIP code is required"),
  notes: z.string().optional(),
  subtotal: z.any(),
  discount: z.any(),
  tax: z.any(),
  payment_status: z.any(),
  payment_type: z.string().optional(),
  customer: z.any(),
  ticket_quantity: z.any(),
  total: z.any(),
  // captcha: z.string().optional(),
  bookingData: z.any(),
});

export type CheckoutFormInput = z.infer<typeof checkoutSchema>;

export const defaultValue = (
  user: any,
  defaultCountry: {
    code: string;
    name: string;
  }
) => {
  const { first_name, last_name, email } = user;

  const phone = user?.phone_number?.startsWith("+")
    ? user.phone_number?.replace(/\s+/g, "")
    : "";

  return {
    first_name: first_name ?? "",
    last_name: last_name ?? "",
    email: email ?? "",
    phone_number: phone,
    country: defaultCountry?.name ?? "",
  };
};
