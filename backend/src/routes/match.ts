import express, { Request, Response } from 'express';

const router = express.Router();  // 初始化 router

// 其他导入...

router.post('/match', async (req: Request, res: Response) => {
  // ...原有逻辑
});

export default router;