import type { APIRoute } from 'astro';
import { createSupabaseServer } from '../../../lib/supabase-server';

export const POST: APIRoute = async ({ cookies, request, redirect }) => {
  const supabase = createSupabaseServer(cookies, request.headers);
  // signOut 会通过 @supabase/ssr 清除会话 cookie
  await supabase.auth.signOut();
  return redirect('/');
};