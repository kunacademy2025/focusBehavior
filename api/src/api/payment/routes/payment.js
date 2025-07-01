"use strict";

/**
 * payment router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::payment.payment", {
  config: {
    create: {
      middlewares: ["api::payment.sanitize-after-create"],
    },
  },
});
