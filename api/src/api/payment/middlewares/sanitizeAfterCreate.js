"use strict";

/**
 * `sanitizeAfterCreate` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    await next();

    const id = ctx.body?.data?.id;
    const order = await strapi.entityService.findOne(
      "api::payment.payment",
      id
    );

    if (!order) return;

    ctx.body.data.attributes = {
      ...ctx.body.data.attributes,
      payment_link: order.payment_link,
      order_code: order.order_code,
      remote_pay_link: order.remote_pay_link,
      pay_link_msg: order.pay_link_msg,
      payment_lnk_created: order.payment_lnk_created,
    };
  };
};
