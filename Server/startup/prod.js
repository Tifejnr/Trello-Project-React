const helmet = require("helmet");
const compression = require("compression");

module.exports = function (app) {
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: [
          "'self'",
          "https://www.collabfortrello.com",
          "https://www.google-analytics.com",
          "https://www.youtube.com",
        ],
        scriptSrc: [
          "'self'",
          "https://www.googletagmanager.com",
          "'unsafe-inline'",
        ],

        frameSrc: ["'self'", "https://www.youtube.com"],
      },
    })
  );
  app.use(compression());
};
