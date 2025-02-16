import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { encrypt, decrypt } from '@/utils/crypto';

export enum UserRole {
  CLIENT = 'client',
  WORKER = 'worker',
  COMPANY = 'company',
  TRAINER = 'trainer',
}

export interface User extends Document {
  roles: UserRole[];
  profile: {
    skills: string[];
    certifications: string[];
    experience: string; // 修改为字符串类型
  };
  password: string; // 添加密码字段
}

const userSchema = new Schema<User>({
  roles: [{ type: String, enum: Object.values(UserRole) }],
  profile: {
    skills: [String],
    certifications: [String],
    experience: String, // 修改为字符串类型
  },
  password: { type: String, required: true }, // 添加密码字段
});

// 密码加密中间件
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // 加密认证和经验字段
  if (this.profile && this.isModified('profile')) {
    this.profile.certifications = this.profile.certifications.map(cert => encrypt(cert).encrypted);
    this.profile.experience = encrypt(this.profile.experience.toString()).encrypted; // 转换为字符串后再加密
  }

  next();
});

// 解密认证和经验字段
userSchema.post('find', (docs: any[]) => {
  if (docs) {
    docs.forEach((doc: any) => {
      if (doc.profile) {
        doc.profile.certifications = doc.profile.certifications.map((cert: string) => decrypt({ iv: '', encrypted: cert }));
        doc.profile.experience = parseInt(decrypt({ iv: '', encrypted: doc.profile.experience }), 10); // 解密后转换为数字
      }
    });
  }
});

userSchema.index({ 'profile.skills': 1, 'profile.experience': -1 });

export const User = model<User>('User', userSchema);
export default User;