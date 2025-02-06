import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User, UserRole } from '../models/User';

const router = express.Router();

// 登录路由
router.post('/login', async (req, res) => {
  const { username, password, role } = req.body;
  
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ success: false, message: '用户名或密码错误' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: '用户名或密码错误' });
    }

    // 检查角色是否匹配
    if (role === UserRole.ADMIN && user.role !== UserRole.ADMIN) {
      return res.status(403).json({ success: false, message: '无权限访问' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    res.json({ 
      success: true, 
      token,
      role: user.role
    });
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 注册路由
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // 检查用户名是否已存在
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: '用户名已存在' });
    }

    // 加密密码
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 创建新用户（默认为普通用户角色）
    const user = new User({
      username,
      password: hashedPassword,
      role: UserRole.USER
    });

    await user.save();
    res.json({ success: true, message: '注册成功' });
  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

export default router; 