import express, { Request, Response } from 'express';
import { User } from '../models/User';

const router = express.Router();

// 特征提取函数
const extractFeatures = (user: any) => {
  // 这里可以添加具体的特征提取逻辑
  return {
    skills: user.profile.skills,
    experience: user.profile.experience,
  };
};

// 调用 DeepSeek 模型的模拟函数
const callDeepSeekModel = async (features: any) => {
  try {
    // 这里可以添加调用 DeepSeek API 的逻辑
    // 返回模拟的匹配结果
    return [
      { id: 1, score: 0.8 },
      { id: 2, score: 0.7 },
      { id: 3, score: 0.9 },
    ];
  } catch (error) {
    console.error('DeepSeek API 调用失败:', error);
    throw new Error('DeepSeek API 不可用');
  }
};

// 排序匹配结果
const sortResults = (results: any[]) => {
  return results.sort((a, b) => b.score - a.score);
};

router.post('/match', async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: '用户未找到' });
    }

    const features = extractFeatures(user);
    try {
      const rawResults = await callDeepSeekModel(features);
      const sortedResults = sortResults(rawResults);
      res.json(sortedResults);
    } catch (error) {
      return res.status(500).json({ error: 'DeepSeek API 不可用' });
    }
  } catch (error) {
    res.status(500).json({ error: '内部服务器错误' });
  }
});

export { router as default };