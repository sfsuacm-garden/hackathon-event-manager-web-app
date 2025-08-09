import express, {} from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import helmet from 'helmet';
const app = express();
app.use(express.json());
app.use(helmet());
// Swagger docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Example route
app.get('/users', (req, res) => {
    res.json([{ id: 1, name: 'John Doe' }]);
});
export default app;
//# sourceMappingURL=app.js.map