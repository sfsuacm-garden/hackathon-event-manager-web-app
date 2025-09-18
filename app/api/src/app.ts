import dotenv from 'dotenv';
import express, { type Application, type Request, type Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import helmet from 'helmet';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { trpcRouter } from './features/_app';
import apiRouter from './features/apiApps';
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(express.json());
app.use(helmet());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//TODO seperate the creation of the middleware into its own file.
app.use('/trpc', createExpressMiddleware({
  router: trpcRouter,
  createContext: ({req, res}) => ({req, res})
}))

app.use('/api', apiRouter)

export default app;



