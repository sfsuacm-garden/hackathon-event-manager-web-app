import express, { type Application, type Request, type Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import helmet from 'helmet';
import { router } from './features/event/event.routes';


const app: Application = express();

app.use(express.json());
app.use(helmet());
// Swagger docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/events', router)

app.get('/ping', (req: Request, res: Response) => {
  res.status(200).json({ message: 'pong' });
});

export default app;