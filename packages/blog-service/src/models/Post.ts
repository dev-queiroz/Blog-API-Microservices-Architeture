export interface Post {
    id?: string;         // Opcional, pois o Supabase pode gerar automaticamente
    title: string;
    content: string;
    author_id: string;
    createdAt?: Date;    // Opcional se o Supabase definir automaticamente
    updatedAt?: Date;
}
