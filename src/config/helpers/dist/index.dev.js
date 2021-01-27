"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServiceId = exports.getEmailId = exports.getStatus = exports.getClientName = exports.getPromoCode = exports.getOffer = exports.getIsActive = exports.getService = exports.getPromoPic = exports.getDescription = exports.getPromoName = exports.getRecId = exports.getUserId = exports.refeshUI = void 0;

var _jsCookie = _interopRequireDefault(require("js-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var refeshUI = function refeshUI() {
  window.location.reload();
};

exports.refeshUI = refeshUI;

var getUserId = function getUserId() {
  return _jsCookie["default"].get('userId');
};

exports.getUserId = getUserId;

var getRecId = function getRecId() {
  return _jsCookie["default"].get('recId');
};

exports.getRecId = getRecId;

var getPromoName = function getPromoName() {
  return _jsCookie["default"].get('promoName');
};

exports.getPromoName = getPromoName;

var getDescription = function getDescription() {
  return _jsCookie["default"].get('description');
};

exports.getDescription = getDescription;

var getPromoPic = function getPromoPic() {
  return _jsCookie["default"].get('promoPic');
};

exports.getPromoPic = getPromoPic;

var getService = function getService() {
  return _jsCookie["default"].get('serviceId');
};

exports.getService = getService;

var getIsActive = function getIsActive() {
  return _jsCookie["default"].get('isActive');
};

exports.getIsActive = getIsActive;

var getOffer = function getOffer() {
  return _jsCookie["default"].get('offer');
};

exports.getOffer = getOffer;

var getPromoCode = function getPromoCode() {
  return _jsCookie["default"].get('promoCode');
};

exports.getPromoCode = getPromoCode;

var getClientName = function getClientName() {
  return _jsCookie["default"].get('clientName');
};

exports.getClientName = getClientName;

var getStatus = function getStatus() {
  return _jsCookie["default"].get('status');
};

exports.getStatus = getStatus;

var getEmailId = function getEmailId() {
  return _jsCookie["default"].get('emailId');
};

exports.getEmailId = getEmailId;

var getServiceId = function getServiceId() {
  return _jsCookie["default"].get('service');
};

exports.getServiceId = getServiceId;