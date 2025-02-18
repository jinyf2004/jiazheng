import 'express';
import { UserRole } from '../../models/User';

declare global {
  namespace Express {
    interface User {
      id: string;
      role: UserRole;
    }

    interface Request {
      user?: User; // 保持原有代码不变，仅添加导入语句
    }
  }
}