import { Router } from 'express';
import { createComment, getCommentsByPost } from '../controllers/commentController';

const router = Router();

// Rota para criar um comentário
router.post('/', createComment);

// Rota para listar comentários de um post (usando o parâmetro :post_id)
router.get('/:post_id', getCommentsByPost);

export default router;
