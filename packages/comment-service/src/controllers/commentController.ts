import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import { Comment } from '../models/Comment';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Cria um novo comentário na tabela "comments" do Supabase.
 */
export const createComment = async (req: Request, res: Response): Promise<void> => {
    const { post_id, author_id, content } = req.body;
    if (!post_id || !author_id || !content) {
        res.status(400).json({ message: 'post_id, author_id e content são obrigatórios' });
        return;
    }

    const { data, error } = await supabase
        .from('comments')
        .insert([{ post_id, author_id, content, created_at: new Date() }])
        .single();

    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }

    res.status(201).json({ message: 'Comentário criado com sucesso', comment: data });
};

/**
 * Lista todos os comentários de um post específico.
 */
export const getCommentsByPost = async (req: Request, res: Response): Promise<void> => {
    const { post_id } = req.params;
    if (!post_id) {
        res.status(400).json({ message: 'post_id é obrigatório' });
        return;
    }

    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', post_id);

    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }

    res.status(200).json({ comments: data });
};
