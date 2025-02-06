import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import commentRoutes from './routes/commentRoutes';
import swaggerDocs from './swagger'; // Importe o arquivo swagger.ts

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Rotas dos comentários
app.use('/api/comments', commentRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Comment-Service OK' });
});

// Integrando Swagger
swaggerDocs(app, Number(process.env.PORTC) || 3003);

const PORT = process.env.PORTC || 3003;
app.listen(PORT, () => {
    console.log(`Comment-Service rodando na porta ${PORT}`);
});
