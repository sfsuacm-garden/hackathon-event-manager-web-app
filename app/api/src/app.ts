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

app.post('/notion-webhook', express.json(), async (req, res) => {
  const data = req.body || {};
  const r = await fetch(process.env.DISCORD_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: 'NEW ISSUE SUBMITTED\n' +
      `Bug: ${String(data.data.properties['What’s the issue?'].title[0].plain_text).slice(0, 1900)}\n` +
      `Link: ${data.data.url}`
    })
  });
  res.status(r.ok ? 200 : 502).send(await r.text());
});

export default app;
