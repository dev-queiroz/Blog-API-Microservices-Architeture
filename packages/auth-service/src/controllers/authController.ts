import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

// Obtém as variáveis de ambiente
const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

// Inicializa o cliente do Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Registra um novo usuário utilizando o Supabase Auth.
 */
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    // Verifica se os campos foram fornecidos
    if (!email || !password) {
        res.status(400).json({ message: 'Email e senha são obrigatórios' });
        return;
    }

    // Cria o usuário via Supabase Auth
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }
    res.status(201).json({ message: 'Usuário registrado com sucesso', user: data.user });
};

/**
 * Realiza o login do usuário utilizando o Supabase Auth.
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Email e senha são obrigatórios' });
        return;
    }

    // Realiza o login via Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        res.status(401).json({ message: error.message });
        return;
    }
    res.status(200).json({ message: 'Login realizado com sucesso', session: data.session });
};
