import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// 请求频率限制（每个IP 100次/分钟）
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: '请求过于频繁，请稍后再试'
});

// 安全头设置
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted.cdn.com"]
    }
  }
});

// CSRF防护中间件
export const csrfProtection = (req: Request, res: Response, next: NextFunction) => {
  // 实现CSRF令牌验证逻辑
  // 这里需要具体的CSRF令牌生成和验证逻辑
  // 例如可以使用csurf库来实现
  next();
};