import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check .env file.');
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// Database types
export type WishEntry = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: 'health' | 'wealth' | 'relationship' | 'career' | 'spiritual' | 'other';
  target_date: string | null;
  is_fulfilled: boolean;
  created_at: string;
};

export type SavedAffirmation = {
  id: string;
  user_id: string;
  text: string;
  category: string | null;
  is_favorite: boolean;
  created_at: string;
};

export type UserProfile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
};