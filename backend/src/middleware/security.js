"use strict";
exports.__esModule = true;
exports.csrfProtection = exports.securityHeaders = exports.apiLimiter = void 0;
var express_rate_limit_1 = require("express-rate-limit");
var helmet_1 = require("helmet");
// 请求频率限制（每个IP 100次/分钟）
exports.apiLimiter = (0, express_rate_limit_1["default"])({
    windowMs: 60 * 1000,
    max: 100,
    message: '请求过于频繁，请稍后再试'
});
// 安全头设置
exports.securityHeaders = (0, helmet_1["default"])({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "trusted.cdn.com"]
        }
    }
});
// CSRF防护中间件
var csrfProtection = function (req, res, next) {
    // 实现CSRF令牌验证逻辑
    // 这里需要具体的CSRF令牌生成和验证逻辑
    // 例如可以使用csurf库来实现
    next();
};
exports.csrfProtection = csrfProtection;
