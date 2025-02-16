import express from 'express';
import multer from 'multer';
import { User } from '../models/User';
import { processCSV } from '../utils/processCSV';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '未上传文件' });
    }

    const results = await processCSV(req.file.path);
    await User.insertMany(results);
    res.status(200).json({ message: '文件上传成功并已处理' });
  } catch (error) {
    res.status(500).json({
      error: '文件处理失败',
      details: error instanceof Error ? error.message : '未知错误'
    });
  }
});

export default router;