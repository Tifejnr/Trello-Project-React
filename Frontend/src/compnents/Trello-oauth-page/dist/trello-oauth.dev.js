"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = trelloAuthRedirect;

var _axios = _interopRequireDefault(require("axios"));

var _websiteUrl = require("../../JS functions/websiteUrl");

var _getCookies = _interopRequireDefault(require("../utilis/cookiesSetting/getCookies"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function trelloAuthRedirect() {
  var trelloAuthEndpoint, token, response, data, errorMessage;
  return regeneratorRuntime.async(function trelloAuthRedirect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          trelloAuthEndpoint = "".concat(_websiteUrl.websiteUrl, "/authorize");
          token = (0, _getCookies["default"])();
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(_axios["default"].post(trelloAuthEndpoint, {
            token: token
          }));

        case 5:
          response = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(response.data);

        case 8:
          data = _context.sent;

          if (data.authorizationUrl) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", false);

        case 11:
          return _context.abrupt("return", window.location.href = data.authorizationUrl);

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](2);
          errorMessage = _context.t0.response.data;
          console.log(errorMessage);
          return _context.abrupt("return", false);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 14]]);
}