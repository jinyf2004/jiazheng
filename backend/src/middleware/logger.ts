import morgan from 'morgan';
import { createWriteStream } from 'fs';
import { Request, Response, NextFunction } from 'express';

const accessLogStream = createWriteStream('./logs/access.log', { flags: 'a' });

export const requestLogger = morgan('combined', {
  stream: accessLogStream,
  skip: (req: Request) => req.path === '/healthcheck'
});