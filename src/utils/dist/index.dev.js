"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserId = exports.refeshUI = exports.imageToBase64 = exports.validateEmail = exports.getRouteName = exports.capitalize = void 0;

var _jsCookie = _interopRequireDefault(require("js-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var capitalize = function capitalize(s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

exports.capitalize = capitalize;

var getRouteName = function getRouteName(name) {
  if (typeof name !== 'string') return '';
  return name.toLowerCase().replace(/\s/g, '');
};

exports.getRouteName = getRouteName;

var validateEmail = function validateEmail(email) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return reg.test(email);
};

exports.validateEmail = validateEmail;

var imageToBase64 = function imageToBase64(file) {
  return new Promise(function (resolve, reject) {
    var reader = new window.FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      resolve(reader.result);
    };

    reader.onerror = function (error) {
      reject(error);
    };
  });
};

exports.imageToBase64 = imageToBase64;

var refeshUI = function refeshUI() {
  window.location.reload();
};

exports.refeshUI = refeshUI;

var getUserId = function getUserId() {
  return _jsCookie["default"].get('userId');
};

exports.getUserId = getUserId;