import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import authRouter from './routes/auth';

const app = express();
const port = process.env.PORT || 3001;

// 连接数据库
connectDB();

// 中间件
app.use(cors());
app.use(express.json());

// API路由
app.use('/api/auth', authRouter);

// 根路由
app.get('/', (req, res) => {
  res.json({ message: 'API服务器运行正常' });
});

// 错误处理中间件
app.use((req, res) => {
  res.status(404).json({ message: '未找到请求的资源' });
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: '服务器内部错误' });
});

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
}); 