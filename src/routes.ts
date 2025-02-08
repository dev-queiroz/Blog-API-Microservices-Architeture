import { Router } from 'express';
import { createUserController } from './useCases/CreateUser';

const router = Router();

router.post('/users', (req, res) => {
    createUserController.handle(req, res);
});

export { router };