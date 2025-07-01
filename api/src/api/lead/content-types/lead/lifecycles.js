const { EMAILS } = require("../../../../utils/emails");

module.exports = {
  async afterCreate(event) {
    const { id } = event.result;
    await EMAILS.sendNewLead(id);
  },
};
