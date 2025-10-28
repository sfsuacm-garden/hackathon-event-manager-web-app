import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { type Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import helmet from 'helmet';
import { trpcRouter } from './core/_app';
import apiRouter from './core/apiApps';
import emailRoutes from './email/email.routes';
import { createContext } from './core/context';

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(helmet());
app.use('/email', emailRoutes);

app.use(
  cors({
    origin: [
      'http://localhost:3000', 
      'http://localhost:3001', 
      'https://localhost:3000',
      'https://frontend-production-18ef.up.railway.app'
    ],
    credentials: true // if you're sending cookies or auth headers
  })
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//TODO seperate the creation of the middleware into its own file.
app.use(
  '/trpc',
  createExpressMiddleware({
    router: trpcRouter,
    createContext: createContext
  })
);

app.use('/api', apiRouter);

export default app;
