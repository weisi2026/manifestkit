import type { APIRoute } from 'astro';
import { createSupabaseServer } from '../../lib/supabase-server';

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

// 新增许愿
export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = createSupabaseServer(cookies, request.headers);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return json({ error: 'Unauthorized' }, 401);

  const body = await request.json().catch(() => null);
  if (!body?.title || !body?.category) {
    return json({ error: 'title and category are required' }, 400);
  }

  // 不传 user_id，由数据库触发器自动填充 auth.uid()
  const { data, error } = await supabase
    .from('wish_journal')
    .insert({
      title: body.title,
      description: body.description || null,
      category: body.category,
      target_date: body.target_date || null,
      is_fulfilled: false,
    })
    .select()
    .single();

  if (error) return json({ error: error.message }, 400);
  return json({ wish: data }, 201);
};

// 更新（切换 is_fulfilled）
export const PATCH: APIRoute = async ({ request, cookies }) => {
  const supabase = createSupabaseServer(cookies, request.headers);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return json({ error: 'Unauthorized' }, 401);

  const body = await request.json().catch(() => null);
  if (!body?.id) return json({ error: 'id is required' }, 400);

  const { error } = await supabase
    .from('wish_journal')
    .update({ is_fulfilled: !!body.is_fulfilled })
    .eq('id', body.id);

  if (error) return json({ error: error.message }, 400);
  return json({ ok: true });
};

// 删除
export const DELETE: APIRoute = async ({ request, cookies }) => {
  const supabase = createSupabaseServer(cookies, request.headers);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return json({ error: 'Unauthorized' }, 401);

  const body = await request.json().catch(() => null);
  if (!body?.id) return json({ error: 'id is required' }, 400);

  const { error } = await supabase.from('wish_journal').delete().eq('id', body.id);
  if (error) return json({ error: error.message }, 400);
  return json({ ok: true });
};