import express from 'express';
import jwt from 'jsonwebtoken';
import { getCache, setCache } from '../config/redis';
import bcrypt from 'bcryptjs';
import { User, UserRole } from '../models/User';

const router = express.Router();

// 登录路由
router.post('/login', async (req, res) => {
  const { username, password, role } = req.body;
  const cacheKey = `user:${username}`;
  const cachedToken = await getCache(cacheKey);
  let user; // 声明 user 变量

  if (cachedToken) {
    user = await User.findOne({ username }); // 赋值
    if (user) {
      return res.json({ success: true, token: cachedToken, role: user.roles[0] });
    }
  }

  try {
    user = await User.findOne({ username }); // 赋值
    if (!user) {
      return res.status(401).json({ success: false, message: '用户名或密码错误' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: '用户名或密码错误' });
    }

    // 检查角色是否匹配
    if (role === UserRole.COMPANY && !user.roles.includes(UserRole.COMPANY)) { // 假设管理员角色是 COMPANY
      return res.status(403).json({ success: false, message: '无权限访问' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.roles[0] }, // 使用用户的角色数组中的第一个角色
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    await setCache(cacheKey, token, 3600); // 缓存1小时
    res.json({ 
      success: true, 
      token,
      role: user.roles[0]
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
      roles: [UserRole.CLIENT] // 默认为 CLIENT 角色
    });

    await user.save();
    res.json({ success: true, message: '注册成功' });
  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

export default router;