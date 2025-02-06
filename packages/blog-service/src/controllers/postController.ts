import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import { Post } from '../models/Post';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

// Inicializa o cliente do Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Cria um novo post no banco de dados do Supabase.
 */
export const createPost = async (req: Request, res: Response): Promise<void> => {

    const { title, content, author_id } = req.body;
    if (!title || !content || !author_id) {
        res.status(400).json({ message: 'Title, content e author_id são obrigatórios' });
        return;
    }

    const { data, error } = await supabase
        .from('posts')
        .insert([{ title, content, author_id, created_at: new Date() }])
        .single();

    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }

    res.status(201).json({ message: 'Post criado com sucesso', post: data });
};


/**
 * Retorna todos os posts cadastrados.
 */
export const getPosts = async (req: Request, res: Response): Promise<void> => {
    const { data, error } = await supabase
        .from('posts')
        .select('*');

    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }

    res.status(200).json({ posts: data });
};

/**
 * Retorna um post pelo seu ID.
 */
export const getPostById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        res.status(404).json({ message: error.message });
        return;
    }

    res.status(200).json({ post: data });
};

/**
 * Atualiza um post existente.
 */
export const updatePost = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, content } = req.body;

    // Atualiza os campos desejados e define updatedAt
    const { data, error } = await supabase
        .from('posts')
        .update({ title, content, updated_at: new Date() })
        .eq('id', id)
        .single();

    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }

    res.status(200).json({ message: 'Post atualizado com sucesso', post: data });
};

/**
 * Deleta um post pelo ID.
 */
export const deletePost = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)
        .single();

    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }

    res.status(200).json({ message: 'Post deletado com sucesso', post: data });
};
