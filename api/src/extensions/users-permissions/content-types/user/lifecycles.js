module.exports = {
  async beforeCreate(event) {
    const { first_name, last_name } = event.params.data;
    event.params.data.display_name = `${first_name} ${last_name}`;
  },
  async beforeUpdate(event) {
    const { first_name, last_name } = event.params.data;
    if (first_name && last_name)
      event.params.data.display_name = `${first_name} ${last_name}`;
  },
};
