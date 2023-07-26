"use strict";

//Lemon squuezy payment checkou url getting
var express = require("express");

var axios = require("axios");

var crypto = require("crypto");

var router = express.Router();

var _require = require("../../envKeys/allKeys"),
    getKeys = _require.getKeys;

var keysObjects = getKeys(); // Endpoint to handle incoming webhook events

router.post("/", function _callee(req, res) {
  var secret, signature, rawBody, hmac, digest, _req$body, event, data;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("yeahaaaaaaaaaaaaaaaaaaaa");
          secret = keysObjects.webHookSecret;
          signature = Buffer.from(req.get("X-Signature") || "", "utf8");
          _context.next = 5;
          return regeneratorRuntime.awrap(req.text());

        case 5:
          rawBody = _context.sent;
          // Verify the signature
          hmac = crypto.createHmac("sha256", secret);
          digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");

          if (crypto.timingSafeEqual(digest, signature)) {
            _context.next = 11;
            break;
          }

          console.log("invalid signature ma g"); // Invalid signature

          return _context.abrupt("return", res.status(403).json({
            error: "Invalid signature."
          }));

        case 11:
          // Signature is valid, process the webhook event
          _req$body = req.body, event = _req$body.event, data = _req$body.data;

          if (!(event === "order_created")) {
            _context.next = 17;
            break;
          }

          // Handle the successful order payment event
          // You can perform any actions you want here, such as updating your database, sending notifications, etc.
          console.log("Received successful order payment event:", data); // Respond with a 200 status to acknowledge receipt of the webhook

          return _context.abrupt("return", res.sendStatus(200));

        case 17:
          return _context.abrupt("return", res.sendStatus(204));

        case 18:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;