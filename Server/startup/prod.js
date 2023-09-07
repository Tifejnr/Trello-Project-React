const helmet = require("helmet");
const compression = require("compression");

module.exports = function (app) {
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "https://www.collabfortrello.com"],
        // Add other directives as needed
      },
    })
  );
  app.use(compression());
};
