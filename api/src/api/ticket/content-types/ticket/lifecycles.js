module.exports = {
  async beforeCreate(event) {
    const { initial_quantity = 0, sold_quantity = 0 } = event.params.data;
    event.params.data.remaining_quantity = initial_quantity - sold_quantity;
  },

  async beforeUpdate(event) {
    const { initial_quantity, sold_quantity } = event.params.data;
    if (initial_quantity !== undefined || sold_quantity !== undefined) {
      const existingEntry = await strapi.entityService.findOne(
        "api::ticket.ticket",
        event.params.where.id,
        { fields: ["initial_quantity", "sold_quantity"] }
      );

      const newInitialQuantity =
        initial_quantity ?? existingEntry.initial_quantity;
      const newSoldQuantity = sold_quantity ?? existingEntry.sold_quantity;

      event.params.data.remaining_quantity =
        newInitialQuantity - newSoldQuantity;

      event.params.data.sold_out = event.params.data.remaining_quantity <= 0;
    }
  },
};
