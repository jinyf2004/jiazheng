import type { RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { userService } from '../services/UserService';
import * as Sentry from '@sentry/node';

interface JwtPayload {
  sub: string;
}

export const authGuard: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.ROO_TOKEN;
    if (!token) return res.redirect('/login');

    // 强制类型断言校验
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = await userService.getUserById(payload.sub!); 

    return next();
  } catch (e) {
    Sentry.captureException(e);
    res.clearCookie('ROO_TOKEN').redirect('/auth/error');
  }
};