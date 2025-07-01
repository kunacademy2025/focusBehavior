"use server";
import { buildStrapiSearchFilter } from "@/utils/strapi-search-filter";
import { PaymentApis } from ".";
import { EventBookingApis } from "../event-booking";
import PaymentModel from "./model";

interface PurchaseCheckParams {
  customerId: number;
  eventId?: number;
}

export async function hasCustomerPurchasedItem({
  customerId,
  eventId = 0,
}: PurchaseCheckParams): Promise<boolean> {
  try {
    const { data } = await EventBookingApis.get({
      queryParams: {
        populate: "deep",
        filters: {
          user: { id: { $eq: customerId } },
          payment: { payment_status: { $eq: "Paid" } },
          event: { id: { $eq: eventId } },
        },
      },
    });

    return Array.isArray(data) && data.length > 0;
  } catch (error) {
    console.error("Error fetching purchased items:", error);
    throw error;
  }
}

export async function checkPaymentStatus({ id }: { id: number }) {
  try {
    const response = await PaymentApis.get([id, `check-status`]);

    return response;
  } catch (error) {
    console.error("Error fetching purchased items:", error);
    throw error;
  }
}

export async function getPaymentById({ id }: { id: number }) {
  try {
    const response = await PaymentApis.getById(id, {
      queryParams: {
        populate: {
          customer: true,
          event_booking: {
            populate: {
              ticket: true,
              event: {
                populate: {
                  main_image: true,
                  event_type: true,
                },
              },
            },
          },
        },
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching purchased items:", error);
    throw error;
  }
}

export const getPaymentNumber = async (id: number) => {
  const { data } = await PaymentApis.getById<PaymentModel>(id, {
    queryParams: {
      fields: ["order_code"],
    },
  });

  return data?.order_code;
};

export async function recreatePaymentLink(id: number) {
  try {
    const response = await PaymentApis.post({}, [id, "recreate"], {
      queryParams: {
        populate: "deep",
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching purchased items:", error);
    throw error;
  }
}

export const cancelPayment = async (id: number) => {
  const data = {
    payment_status: "Cancelled",
  };

  const response = await PaymentApis.put(id, { data });

  return response;
};

export const getPaymentsByCustomer = async (
  userId: number,
  searchParams: Promise<Record<string, any>>
) => {
  const resolvedParams = await searchParams;
  const { page, size, search } = resolvedParams;

  const searchFilter =
    search &&
    buildStrapiSearchFilter(search, [
      "order_number",
      { field: "event_booking.event.title" },
    ]);

  const response = await PaymentApis.getAll({
    queryParams: {
      sort: ["createdAt:desc"],
      populate: {
        event_booking: {
          populate: {
            ticket: true,
            event: {
              populate: {
                main_image: true,
                event_type: true,
              },
            },
          },
        },
      },
      pagination: {
        page,
        pageSize: size,
      },
      filters: {
        customer: {
          id: { $eq: userId },
          ...searchFilter,
        },
      },
    },
  });

  return response;
};
