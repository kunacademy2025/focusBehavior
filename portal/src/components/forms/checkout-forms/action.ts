"use server";
import "server-only";
import { checkoutSchema } from "./schema";
import { PaymentApis } from "@/services/api/collections/payments";
import {
  FormState,
  handleFormAction,
} from "@/components/ui/forms/form-handler";

export async function checkoutFormAction(prev: FormState, payload: FormData) {
  return handleFormAction(prev, payload, {
    testing: false,
    schema: checkoutSchema,
    api: PaymentApis,
    transform: (data) => {
      delete data.phone_numberCountry;
      const formdata = {
        ...data,
        discount: Number(data.discount),
        tax: Number(data.tax),
        subtotal: Number(data.subtotal),
        total: Number(data.total),
        ticket_quantity: Number(data.ticket_quantity),
        customer: Number(data.customer),
      };

      return formdata;
    },
    serialize: (data) => {
      const subtotalInAed = Math.round(data.subtotal ?? 0);
      const totalInAed = Math.round(data.total ?? 0);

      const submitData = {
        ...data,
        customer: data.customer ? { connect: [{ id: data.customer }] } : null,
        payment_status: "Pending",
        payment_type: "Credit Card",
        subtotal: subtotalInAed,
        total: totalInAed,
        currencyExchangeRate: 1,
        currencyCode: "AED",
      };

      return submitData;
    },
  });
}
