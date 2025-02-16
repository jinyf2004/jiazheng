declare module 'multer' {
  import { Request, Response, NextFunction } from 'express';
  const multer: any;
  export = multer;
}

declare module 'csv-parser' {
  const csvParser: any;
  export = csvParser;
}

// 扩展 Express.Request 接口
declare global {
  namespace Express {
    interface Request {
      file?: any; // 使用 any 类型来避免类型冲突
    }
  }
}