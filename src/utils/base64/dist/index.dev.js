"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var toBase64 = function toBase64(file) {
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

var _default = toBase64;
exports["default"] = _default;