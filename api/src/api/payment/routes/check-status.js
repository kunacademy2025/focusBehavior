"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/payments/:id/check-status",
      handler: "payment.checkStatus",
    },
    {
      method: "POST",
      path: "/payments/:id/recreate",
      handler: "payment.recreatePaymentLink",
    },
  ],
};
