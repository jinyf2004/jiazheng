import express from 'express';
import { authenticateToken } from './middleware/auth.js';
import { connectRedis } from './config/redis.js';

const app = express();
const PORT = process.env.PORT || 3001; // 更改端口为3001

// 全局中间件注册
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

// 身份验证中间件
app.use(authenticateToken);

// 在应用启动时调用
connectRedis().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// 其他路由...