import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret';

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    const user = await User.findById(decoded.userId);
  
    if (!user) return res.sendStatus(403);
  
    req.user = {
      id: user._id.toString(),
      role: user.role
    };
  
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err);
    return res.sendStatus(403);
  }
};