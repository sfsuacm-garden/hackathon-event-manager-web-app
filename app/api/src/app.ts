import express, { type Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import helmet from 'helmet';
import eventRouter from './features/event/event.routes';

const app: Application = express();

app.use(express.json());
app.use(helmet());
// Swagger docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/events', eventRouter)
export default app;