"use strict";
exports.__esModule = true;
require("./patcher");
var express_1 = require("express");
var cors_1 = require("cors");
var redis_1 = require("./config/redis");
var database_1 = require("./config/database");
var auth_1 = require("./routes/auth"); // 确保这里使用默认导出
var match_1 = require("./routes/match"); // 导入匹配路由
var upload_1 = require("./routes/upload"); // 导入上传路由
var app = (0, express_1["default"])();
var port = process.env.PORT || 3001;
// 连接数据库
(0, database_1.connectDB)();
(0, redis_1.connectRedis)();
// 中间件
app.use((0, cors_1["default"])());
app.use(express_1["default"].json());
// API路由
app.use('/api/auth', auth_1["default"]);
app.use('/api/match', match_1["default"]); // 使用匹配路由
app.use('/api/upload', upload_1["default"]); // 使用上传路由
// 根路由
app.get('/', function (req, res) {
    res.json({ message: 'API服务器运行正常' });
});
// 错误处理中间件
app.use(function (req, res) {
    res.status(404).json({ message: '未找到请求的资源' });
});
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ message: '服务器内部错误' });
});
app.listen(port, function () {
    console.log("\u670D\u52A1\u5668\u8FD0\u884C\u5728 http://localhost:".concat(port));
});
