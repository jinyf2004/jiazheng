import { Request, Response, NextFunction } from 'express';

export const checkRole = (roles: string[]) => 
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).send('未经授权');
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).send('权限不足');
    }

    next();
  };