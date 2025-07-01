import { z } from "zod";

// form zod validation schema
export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    // .min(8, "Password must be more than 8 characters")
    // .max(32, "Password must be less than 32 characters"),
});

// generate form types from zod validation schema
export type LoginSchema = z.infer<typeof loginSchema>;
