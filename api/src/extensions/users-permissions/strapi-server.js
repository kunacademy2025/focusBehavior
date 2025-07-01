const user = require("./content-types/user");

module.exports = (plugin) => {
  //add the content type
  plugin.contentTypes.user = user;

  return plugin;
};
