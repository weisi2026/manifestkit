import type { APIRoute } from 'astro';
import { createSupabaseServer } from '../../../lib/supabase-server';

export const GET: APIRoute = async ({ url, cookies, request, redirect }) => {
  const code = url.searchParams.get('code');

  if (!code) {
    return redirect('/login?error=no_code');
  }

  // 关键：用服务端 client，cookie 由 @supabase/ssr 通过 setAll 自动写入正确的名字
  const supabase = createSupabaseServer(cookies, request.headers);
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  // 不要手动写 cookie —— exchangeCodeForSession 内部已通过 setAll 写好了
  return redirect('/dashboard');
};
