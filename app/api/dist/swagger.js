import swaggerJsdoc from 'swagger-jsdoc';
// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API for HEM',
            version: '1.0.0',
            description: 'A simple Express API with TypeScript'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ]
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'] // Path to files containing OpenAPI definitions
};
export const swaggerSpec = swaggerJsdoc(swaggerOptions);
//# sourceMappingURL=swagger.js.map