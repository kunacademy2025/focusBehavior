import { getStrapiData, isPhoneValid } from "@/utils";
import { z } from "zod";

// form zod validation schema
export const accountFormSchema = z.object({
  first_name: z.string().min(1, "First Name is required"),
  last_name: z.string().min(1, "Last Name is required"),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .refine(isPhoneValid, {
      message: "Looks like this is not a valid phone number!",
    }),
  country: z.string().optional(),
  captcha: z.string().optional(),
  id: z.any(),
});

export const defaultValues = (data: any) => {
  if (!data) {
    return {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
    };
  }

  const { id, first_name, last_name, email } = getStrapiData(data);

  const phone = data?.phone_number?.startsWith("+")
    ? data.phone_number?.replace(/\s+/g, "")
    : "";

  return {
    id: id ?? "",
    first_name: first_name ?? "",
    last_name: last_name ?? "",
    email: email ?? "",
    phone_number: phone,
  };
};
