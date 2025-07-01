"use strict";

const { HELPER } = require("../../../utils/helper");

/**
 * lead controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::lead.lead", ({ strapi }) => ({
  async registerLead(ctx) {
    const data = ctx.request.body.data;
    try {
      const {
        first_name,
        last_name,
        email,
        phone_number,
        source,
        related_items,
      } = data;
      const actualSource =
        source && Array.isArray(source) && source.length > 0
          ? source[0]
          : typeof source === "string" || source instanceof String
          ? source
          : "Contacts";
      const result = await HELPER.registerLead(
        first_name,
        last_name,
        email,
        phone_number,
        actualSource,
        related_items
      );
      ctx.status = 200;
      ctx.body = { success: result };
    } catch (ex) {
      console.log(ex);
      ctx.status = 500;
      ctx.body = ex;
    }
  },
}));
