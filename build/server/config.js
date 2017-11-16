'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.faviconPath = exports.publicDir = exports.viewDir = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.__SERVER__ = true;
global.__CLIENT__ = false;

var viewDir = exports.viewDir = _path2.default.join(__dirname, '../../build/server/views');

var publicDir = exports.publicDir = _path2.default.join(__dirname, '../../build/public');

var faviconPath = exports.faviconPath = _path2.default.join(__dirname, '../../build/public/favicon.ico');