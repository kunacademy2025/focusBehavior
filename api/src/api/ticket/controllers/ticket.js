"use strict";

/**
 * ticket controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::ticket.ticket", ({ strapi }) => ({
  async updateSoldQuantity(ctx) {
    try {
      const { id } = ctx.params; // Ticket ID
      const { quantity } = ctx.request.body; // Quantity of tickets sold

      if (!quantity || quantity <= 0) {
        return ctx.badRequest("Quantity must be greater than zero.");
      }

      // Fetch the existing ticket data
      const ticket = await strapi.entityService.findOne(
        "api::ticket.ticket",
        id,
        {
          fields: ["initial_quantity", "sold_quantity"],
        }
      );

      if (!ticket) {
        return ctx.notFound("Ticket not found.");
      }

      // Calculate the new sold quantity
      const newSoldQuantity = ticket.sold_quantity + quantity;
      const remainingQuantity = ticket.initial_quantity - newSoldQuantity;
      const soldOut = remainingQuantity <= 0;

      // Update the ticket
      const updatedTicket = await strapi.entityService.update(
        "api::ticket.ticket",
        id,
        {
          data: {
            sold_quantity: newSoldQuantity,
            remaining_quantity: remainingQuantity,
            sold_out: soldOut,
          },
        }
      );

      return ctx.send({
        message: "Sold quantity updated successfully",
        data: updatedTicket,
      });
    } catch (error) {
      console.error("Error updating sold quantity:", error);
      return ctx.internalServerError(
        "An error occurred while updating the sold quantity."
      );
    }
  },
}));
