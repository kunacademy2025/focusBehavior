import { z } from "zod";

const isStrongPassword = (password: string) => {
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return strongPasswordRegex.test(password);
};

// form zod validation schema
export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string({
        required_error: "New password is required",
      })
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters")
      .refine(isStrongPassword, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    passwordConfirmation: z.string({
      required_error: "Password confirmation is required",
    }),
  })
  .refine((data) => data.newPassword === data.passwordConfirmation, {
    message: "Passwords must match",
    path: ["passwordConfirmation"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
