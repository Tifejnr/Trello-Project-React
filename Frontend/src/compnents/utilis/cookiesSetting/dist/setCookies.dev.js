"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setCookies;

var _jsCookie = _interopRequireDefault(require("js-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cookieExpiryDate = {
  expires: 30
};
var cookieName = "cftAuth";

function setCookies(cookieValue) {
  _jsCookie["default"].set(cookieName, cookieValue, cookieExpiryDate);
}