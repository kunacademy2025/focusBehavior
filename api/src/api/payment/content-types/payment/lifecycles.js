const { EMAILS } = require("../../../../utils/emails");
const { encrypt } = require("../../../../utils/encrypt");
const { HELPER } = require("../../../../utils/helper");

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    let createdBooking = null;

    try {
      const bookingPayload = data.bookingData;

      if (!bookingPayload) {
        throw new Error("Missing bookingData in payment payload");
      }

      const parsedBooking =
        typeof bookingPayload === "string"
          ? JSON.parse(bookingPayload)
          : bookingPayload;

      const bookingFormData = {
        data: {
          user: parsedBooking.userId
            ? { connect: [{ id: parsedBooking.userId }] }
            : undefined,
          event: parsedBooking.eventId
            ? { connect: [{ id: parsedBooking.eventId }] }
            : undefined,
          ticket: parsedBooking.ticketId
            ? { connect: [{ id: parsedBooking.ticketId }] }
            : undefined,
          ticket_quantity: Number(parsedBooking.ticket_quantity) || 1,
          booking_date: parsedBooking.booking_date,
          access_type: parsedBooking.access_type,
          status: parsedBooking.status,
          subscription: parsedBooking.subscription,
          expiry_date: parsedBooking.expiry_date,
          publishedAt: new Date().toISOString(),
        },
      };

      createdBooking = await strapi.entityService.create(
        "api::event-booking.event-booking",
        bookingFormData
      );

      // Attach the booking to the payment before creation
      data.event_booking = { connect: [{ id: createdBooking.id }] };
    } catch (err) {
      console.error("[Payment BeforeCreate] Booking failed:", err.message);

      if (createdBooking?.id) {
        await strapi.entityService.delete(
          "api::event-booking.event-booking",
          createdBooking.id
        );
      }

      throw new Error("Failed to create event booking: " + err.message);
    }
  },
  async afterCreate(event) {
    const { result } = event;

    const getOrderCode = (id) => String(id).padStart(6, "0");

    try {
    } catch (err) {
      console.error(
        "[Payment AfterCreate] Booking creation failed:",
        err.message
      );
    }
    //update the order code
    await strapi.entityService.update("api::payment.payment", result.id, {
      data: {
        order_code: `ORD${getOrderCode(result.id)}`,
        payment_link: `${process.env.PUBLIC_URL}/account/events/${await encrypt(
          result.id.toString()
        )}/thank-you`,
      },
    });

    //create payment link
    await HELPER.createPaymentLink(result.id);
  },
  async beforeUpdate(event) {
    const { status } = event.params.data;
    try {
      if (status) {
        const { id } = event.params.where;
        const payment = await strapi.entityService.findOne(
          "api::payment.payment",
          id
        );
        if (status !== payment.status) {
          //send emails
          status === "Paid" && EMAILS.sendPaymentSuccess(id);
          status === "Error" && EMAILS.sendPaymentError(id);
          status === "Cancelled" && EMAILS.sendPaymentCanceled(id);
        }
      }
    } catch (ex) {
      console.error(ex);
    }
  },
};
