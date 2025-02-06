import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import swaggerDocs from './swagger'; // Importe o arquivo swagger.ts

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

// Configura middlewares
app.use(express.json());
app.use(cors());

// Registra as rotas de autenticação sob o prefixo "/api/auth"
app.use('/api/auth', authRoutes);

// Endpoint de health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Auth-Service OK' });
});

// Integrando Swagger
swaggerDocs(app, Number(process.env.PORTA) || 3001);

const PORT = process.env.PORTA || 3001;
app.listen(PORT, () => {
    console.log(`Auth-Service rodando na porta ${PORT}`);
});
