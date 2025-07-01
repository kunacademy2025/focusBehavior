
interface PurchaseCheckParams {
  customerId: number;
  eventId?: number;
  ticketId?: number;
}

// export async function getPurchasedEvents({
//   customerId,
// }: PurchaseCheckParams): Promise<boolean> {
//   try {
//     const { data } = await UserEventAccessApis.get({
//       queryParams: {
//         populate: "deep",
//         // filters: {
//         //   user: { id: { $eq: customerId } },
//         // },
//       },
//     });


//     return data;
//   } catch (error) {
//     console.error("Error fetching purchased items:", error);
//     throw error;
//   }
// }
