import { Router } from 'express';
import healthRouter from './health/health.routes';

const apiRouter = Router();

apiRouter.use('/health', healthRouter);

export default apiRouter;