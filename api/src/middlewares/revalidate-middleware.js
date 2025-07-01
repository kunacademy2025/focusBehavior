module.exports = (config, { strapi }) => {
  return async (context, next) => {
    await next();
    const enable = process.env.ENABLE_REVALIDATE;
    if (enable) {
      try {
        if (
          context.request.method !== "GET" &&
          (context.request.url.toString().startsWith("/content-manager") ||
            context.request.url.toString().startsWith("/api"))
        ) {
          const parts = context.request.url.split("/");
          let api_name = "";
          if (context.request.url.toString().startsWith("/content-manager")) {
            //content manager apis
            parts.forEach((item) => {
              if (
                item.toString().startsWith("api") ||
                item.toString().startsWith("plugin")
              ) {
                let identifiers = item.split(".");
                if (identifiers.length > 0)
                  api_name = identifiers[identifiers.length - 1];
              }
            });
          } else {
            // public apis
            parts.forEach((item, index) => {
              if (item === "api") api_name = parts[index + 1];
            });
            if (api_name === "auth") api_name = "user"; // auth is a part of user collections
          }
          api_name.length > 0 &&
            (await fetch(
              `${process.env.PUBLIC_URL}/api/revalidate/${api_name}`
            ));
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
};
