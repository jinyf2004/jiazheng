"use strict";
exports.__esModule = true;
exports.adminAuth = exports.auth = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var User_1 = require("../models/User");
var auth = function (req, res, next) {
    var _a;
    var token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: '无访问权限' });
    }
    try {
        var decoded = jsonwebtoken_1["default"].verify(token, process.env.JWT_SECRET || 'your-secret-key');
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: '无效的token' });
    }
};
exports.auth = auth;
var adminAuth = function (req, res, next) {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== User_1.UserRole.COMPANY) { // 假设管理员角色是 COMPANY
        return res.status(403).json({ message: '需要管理员权限' });
    }
    next();
};
exports.adminAuth = adminAuth;
