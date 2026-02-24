/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

console.log("meta", import.meta.env);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnonKey);

if (!hasSupabaseEnv) {
  console.error(
    'Supabase não configurado: defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no ambiente de deploy.',
  );
}

const safeSupabaseUrl = supabaseUrl || 'https://placeholder.supabase.co';
const safeSupabaseAnonKey = supabaseAnonKey || 'public-anon-key-not-configured';

export const supabase = createClient(safeSupabaseUrl, safeSupabaseAnonKey);

export default supabase;

export interface PortfolioItem {
  id: string | number;
  title: string;
  category: string;
  image_url: string;
  created_by?: string | null;
  created_by_name?: string | null;
}
