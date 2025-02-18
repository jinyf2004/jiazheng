"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var redis = require("redis");
var router = (0, express_1.Router)();
var redisClient = redis.createClient();
router.get('/health', function (req, res) {
    var dbStatus = mongoose_1["default"].connection.readyState === 1 ? 'connected' : 'disconnected';
    var redisStatus = redisClient.isOpen ? 'connected' : 'disconnected';
    res.json({
        status: 'UP',
        db: dbStatus,
        redis: redisStatus,
        timestamp: Date.now()
    });
});
exports["default"] = router;
