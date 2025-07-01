module.exports = {
  routes: [
    {
      method: "POST",
      path: "/leads/register",
      handler: "lead.registerLead",
    },
  ],
};
