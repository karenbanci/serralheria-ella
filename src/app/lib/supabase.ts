/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

export interface PortfolioItem {
  id: string | number;
  title: string;
  category: string;
  image_url: string;
  created_by?: string | null;
  created_by_name?: string | null;
}
