"use strict";
const { HELPER } = require("../../../utils/helper");

/**
 * payment controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::payment.payment", ({ strapi }) => ({
  async checkStatus(ctx, next) {
    const { id } = await ctx.params;

    const order = await strapi.entityService.findOne(
      "api::payment.payment",
      id
    );

    if (order) {
      const shouldUpdate = await HELPER.getGatewayStatus(order);

      if (shouldUpdate) {
        //send email
      }

      const returnOrder = await strapi.entityService.findOne(
        "api::payment.payment",
        id,
        {
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
        }
      );

      return this.sanitizeOutput(returnOrder, ctx);
    }

    ctx.status = 404;
  },
  async recreatePaymentLink(ctx, next) {
    const { id } = await ctx.params;
    await HELPER.createPaymentLink(id);
    const returnOrder = await strapi.entityService.findOne(
      "api::payment.payment",
      id
    );
    return this.sanitizeOutput(returnOrder, ctx);
  },
}));
