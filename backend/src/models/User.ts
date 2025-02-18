import { encrypt, decrypt } from '../utils/crypto.js';

export enum UserRole {
  CLIENT = 'client',
  WORKER = 'worker',
  COMPANY = 'company',
  TRAINER = 'trainer'
}

export interface IUser {
  _id: string;
  role: UserRole;
  // 其他用户属性
}

export class User implements IUser {
  _id: string;
  role: UserRole;

  constructor(id: string, role: UserRole) {
    this._id = id;
    this.role = role;
  }

  static async findById(userId: string): Promise<IUser | null> {
    // 这里可以添加从数据库或其他数据源获取用户的逻辑
    // 为了示例，我们假设总是返回一个固定的用户
    if (userId === '123') {
      return new User('123', UserRole.CLIENT);
    }
    return null;
  }
}

// 其他代码保持不变