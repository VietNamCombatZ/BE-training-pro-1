import express, { Express, Request, Response, NextFunction } from "express";
import authRouter from "./api/auth/auth.router";
import {userRepository} from './api/user/userRepository';
import dataSource from './config/typeorm.config';
import { pino } from 'pino';

const app: Express = express();
const port = 3000;
app.use(express.json());

dataSource
  .initialize()
  .then(() => {
    logger.info('Data Source has been initialized!');
  })
  .catch((err) => {
    const errorMessage = `Error during Data Source initialization:, ${(err as Error).message}`;
    logger.error(errorMessage);
  });
  const logger = pino({ name: 'server start' });

app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});