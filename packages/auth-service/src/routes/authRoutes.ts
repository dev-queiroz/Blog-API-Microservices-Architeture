import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';

const router = Router();

// Rota para registro de usuário
router.post('/register', registerUser);

// Rota para login de usuário
router.post('/login', loginUser);

export default router;
