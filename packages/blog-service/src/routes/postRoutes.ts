import { Router } from 'express';
import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
} from '../controllers/postController';

const router = Router();

// Rota para criar um post
router.post('/', createPost);

// Rota para listar todos os posts
router.get('/', getPosts);

// Rota para buscar um post específico
router.get('/:id', getPostById);

// Rota para atualizar um post
router.put('/:id', updatePost);

// Rota para deletar um post
router.delete('/:id', deletePost);

export default router;
