-- テーブル定義（RLSは当面OFF/全許可で運用）
create extension if not exists pgcrypto;

create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS方針（認証無しのため）
-- 1) 一時的に RLS OFF で公開書き込みを許可
--    alter table public.todos disable row level security;
-- 2) RLS ON のまま全許可にする場合は以下のようなポリシーを設定
--    alter table public.todos enable row level security;
--    create policy "allow all" on public.todos for all using (true) with check (true);

-- STEP2:ユーザーID列追加＋ポリシーをユーザー毎に制限
alter table public.todos enable row level security;
alter table public.todos drop column if exists user_id;
alter table public.todos add column user_id uuid not null default auth.uid();
create index if not exists todos_user_id_idx on public.todos (user_id, created_at desc);
drop policy if exists "allow all" on public.todos;
create policy todos_select_own on public.todos for select using (user_id = auth.uid());
create policy todos_insert_own on public.todos for insert with check (user_id = auth.uid());
create policy todos_update_own on public.todos for update using (user_id = auth.uid());
create policy todos_delete_own on public.todos for delete using (user_id = auth.uid());
