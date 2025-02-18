import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();  // 初始化 router

// 其他导入...

router.post('/login', async (req: Request, res: Response) => {
  // ...原有逻辑
});

router.post('/register', async (req: Request, res: Response) => {
  // ...原有逻辑
});

export default router;