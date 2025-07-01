"use strict";

/**
 * ticket router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/tickets/:id/update-sold",
      handler: "ticket.updateSoldQuantity",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
