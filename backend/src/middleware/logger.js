"use strict";
exports.__esModule = true;
exports.requestLogger = void 0;
var morgan_1 = require("morgan");
var fs_1 = require("fs");
var accessLogStream = (0, fs_1.createWriteStream)('./logs/access.log', { flags: 'a' });
exports.requestLogger = (0, morgan_1["default"])('combined', {
    stream: accessLogStream,
    skip: function (req) { return req.path === '/healthcheck'; }
});
