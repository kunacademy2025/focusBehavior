const HELPER = {
  async createPaymentLink(id) {
    let updateData = {};
    const orderItem = await strapi.entityService.findOne(
      "api::payment.payment",
      id,
      {
        populate: {
          gateways: true,
          customer: true,
          event_booking: true,
        },
      }
    );

    if (!orderItem) return;

    const { createPaymentLink } = require(`./gateways/credit`); // payment processor

    if (!createPaymentLink) return;

    let data = await createPaymentLink(orderItem); //create payment

    if (!data) return;

    if (data.success === false) {
      // Payment creation failed, delete the payment record
      await strapi.entityService.delete("api::payment.payment", id);
      strapi.log.warn(`Deleted payment ID ${id} due to payment link failure.`);
      return;
    }

    let gateways = orderItem.gateways || [];

    // append gateway log to previously saved log
    if (data.gateways && data.gateways.length)
      gateways = [...gateways, ...data.gateways];

    let gatwayEntry = {};

    if (data.request_url)
      //add a creation stop gateway log
      gatwayEntry = {
        gateways: [
          ...gateways,
          {
            title: "Create Payment",
            request_url: data.request_url,
            request_body: data.request_body,
            response_body: data.response_body,
            request_date: new Date(),
            error_message: data.error_message || "",
          },
        ],
      };
    else gatwayEntry = { gateways };

    // formatted update data
    updateData = {
      ...gatwayEntry,
      remote_pay_link: data?.remote_pay_link || "",
      reference_id: data?.reference_id || "",
      payment_status: "Pending",
      payment_lnk_created: data.payment_lnk_created,
      pay_link_msg: data.pay_link_msg,
    };

    //update order if the update data contains info
    if (Object.keys(updateData)?.length)
      await strapi.entityService.update("api::payment.payment", id, {
        data: updateData,
      });
  },

  async getGatewayStatus(order_item) {
    const { id, payment_status } = order_item;

    const { checkPaymentStatus } = require(`./gateways/credit`); // payment processor

    if (checkPaymentStatus) {
      let data = await checkPaymentStatus(order_item);

      order_item = await strapi.entityService.findOne(
        "api::payment.payment",
        id,
        {
          populate: {
            gateways: true,
          },
        }
      );

      const { gateways: newGateway } = order_item;

      await strapi.entityService.update("api::payment.payment", id, {
        data: {
          gateways: [
            ...newGateway,
            {
              title: "Check Status",
              request_url: data.request_url,
              request_body: data.request_body,
              response_body: data.response_body,
              request_date: new Date(),
              error_message: data.error_message,
            },
          ],
          payment_status: data.newStatus,
        },
      });

      return (
        data.success && data.newStatus === "Paid" && payment_status !== "Paid"
      );
    }
  },
};

module.exports = { HELPER };
