import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import type { AstroCookies } from 'astro';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check .env file.');
}

// 每个请求创建一个独立的服务端 client，自动读写会话 cookie 并刷新过期 token。
// 这样 SSR 页面和 API 路由都能正确携带用户 JWT，RLS 正常放行。
export function createSupabaseServer(cookies: AstroCookies, headers: Headers) {
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(headers.get('Cookie') ?? '');
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookies.set(name, value, {
            ...options,
            // 本地 http 下不能强制 secure，否则 cookie 写不进
            secure: import.meta.env.PROD,
          });
        });
      },
    },
  });
}