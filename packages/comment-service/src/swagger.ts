import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API do Blog',
            version: '1.0.0',
            description: 'Documentação da API do Blog',
        },
    },
    apis: ['./packages/*/src/routes/*.ts'], // Caminho para seus arquivos de rota
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app: any, port: number) {
    // Rota para a documentação Swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Rota para obter a documentação em formato JSON
    app.get('/api-docs.json', (req: any, res: any) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}

export default swaggerDocs;
