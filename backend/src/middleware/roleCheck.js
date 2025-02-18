"use strict";
exports.__esModule = true;
exports.requireRole = void 0;
var requireRole = function () {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    return function (req, res, next) {
        if (!req.user) {
            return res.status(401).json({ error: '用户未认证' });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: '权限不足' });
        }
        next();
    };
};
exports.requireRole = requireRole;
