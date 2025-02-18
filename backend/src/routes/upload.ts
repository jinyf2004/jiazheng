import express, { Request, Response, RequestHandler } from 'express';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });  // 初始化 upload
const router = express.Router();  // 初始化 router

// 其他导入...

router.post('/', upload.single('file') as RequestHandler, async (req: Request, res: Response) => {
  // ...原有逻辑
});

export default router;