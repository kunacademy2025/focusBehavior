import { z } from "zod";

export const processPaymentSchema = z.object({
  id: z.any(),
  captcha: z.any(),
});
