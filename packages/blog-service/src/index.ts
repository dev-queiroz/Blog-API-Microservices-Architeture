import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/postRoutes';
import swaggerDocs from './swagger'; // Importe o arquivo swagger.ts

// Carrega as variáveis de ambiente
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Rotas de posts
app.use('/api/posts', postRoutes);

// Endpoint de health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Blog-Service OK' });
});

// Integrando Swagger
swaggerDocs(app, Number(process.env.PORTB) || 3002);

const PORT = process.env.PORTB || 3002;
app.listen(PORT, () => {
    console.log(`Blog-Service rodando na porta ${PORT}`);
});
