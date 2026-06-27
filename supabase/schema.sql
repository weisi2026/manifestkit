-- ManifestKit 全栈升级 — Supabase Schema (Phase 1)
-- 在 Supabase 控制台 → SQL Editor 里整段粘贴运行
-- 包含：两张表 + RLS 策略 + 自动填充 user_id 触发器

-- ============================================================
-- 1. wish_journal（许愿日记）
-- ============================================================
create table if not exists public.wish_journal (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  description text,
  category text check (
    category in ('health','wealth','relationship','career','spiritual','other')
  ),
  target_date date,
  is_fulfilled boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 2. saved_affirmations（收藏肯定语）
-- ============================================================
create table if not exists public.saved_affirmations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  text text not null,
  category text,
  is_favorite boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 3. 启用 RLS（行级安全）
-- ============================================================
alter table public.wish_journal enable row level security;
alter table public.saved_affirmations enable row level security;

-- ============================================================
-- 4. RLS 策略：用户只能 CRUD 自己的数据
-- ============================================================

-- wish_journal
create policy "wish_journal_select_own"
  on public.wish_journal for select
  using (auth.uid() = user_id);

create policy "wish_journal_insert_own"
  on public.wish_journal for insert
  with check (auth.uid() = user_id);

create policy "wish_journal_update_own"
  on public.wish_journal for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "wish_journal_delete_own"
  on public.wish_journal for delete
  using (auth.uid() = user_id);

-- saved_affirmations
create policy "saved_affirmations_select_own"
  on public.saved_affirmations for select
  using (auth.uid() = user_id);

create policy "saved_affirmations_insert_own"
  on public.saved_affirmations for insert
  with check (auth.uid() = user_id);

create policy "saved_affirmations_update_own"
  on public.saved_affirmations for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "saved_affirmations_delete_own"
  on public.saved_affirmations for delete
  using (auth.uid() = user_id);

-- ============================================================
-- 5. 触发器：插入时自动填充 user_id = auth.uid()
--    前端无需手动传 user_id，杜绝越权写入
-- ============================================================
create or replace function public.set_user_id()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.user_id is null then
    new.user_id := auth.uid();
  end if;
  return new;
end;
$$;

create trigger trg_wish_journal_set_user_id
  before insert on public.wish_journal
  for each row execute function public.set_user_id();

create trigger trg_saved_affirmations_set_user_id
  before insert on public.saved_affirmations
  for each row execute function public.set_user_id();

-- ============================================================
-- 6. 索引（按 user_id + 时间倒序查询优化）
-- ================================
create index if not exists idx_wish_journal_user_created
  on public.wish_journal (user_id, created_at desc);

create index if not exists idx_saved_affirmations_user_created
  on public.saved_affirmations (user_id, created_at desc);

-- ============================================================
-- 完成。整段在 SQL Editor 跑一次即可，可重复执行（幂等）。
-- ============================================================