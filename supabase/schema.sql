-- Corgi Immortal Web V1 — Supabase schema + RLS
-- Run this entire file once in Supabase > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  role text not null default 'member' check (role in ('member','admin','developer')),
  created_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null,
  cover_url text,
  author_id uuid not null references public.profiles(id) on delete restrict,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.article_likes (
  article_id uuid not null references public.articles(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(article_id,user_id)
);

create table if not exists public.article_comments (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text not null check (char_length(content) between 1 and 3000),
  created_at timestamptz not null default now()
);

create table if not exists public.forum_topics (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 180),
  category text not null,
  body text not null check (char_length(body) between 1 and 12000),
  author_id uuid not null references public.profiles(id) on delete cascade,
  pinned boolean not null default false,
  locked boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.forum_replies (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.forum_topics(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 6000),
  created_at timestamptz not null default now()
);

create table if not exists public.contact_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null,
  subject text not null check (char_length(subject) between 2 and 180),
  message text not null check (char_length(message) between 1 and 8000),
  status text not null default 'open' check (status in ('open','processing','resolved')),
  created_at timestamptz not null default now()
);

create table if not exists public.bot_commands (
  id uuid primary key default gen_random_uuid(),
  category text not null default 'Hệ thống',
  name text not null unique,
  description text not null,
  usage text not null default '',
  example text not null default '',
  permissions text not null default 'Mọi thành viên',
  active boolean not null default true,
  sort_order int not null default 100,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path=public
as $$
  select exists(
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin','developer')
  );
$$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path=public
as $$
begin
  insert into public.profiles(id,display_name,avatar_url)
  values(
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name',new.raw_user_meta_data->>'name','Member'),
    coalesce(new.raw_user_meta_data->>'avatar_url',new.raw_user_meta_data->>'picture')
  )
  on conflict(id) do update set
    display_name=excluded.display_name,
    avatar_url=excluded.avatar_url;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert or update of raw_user_meta_data on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.articles enable row level security;
alter table public.article_likes enable row level security;
alter table public.article_comments enable row level security;
alter table public.forum_topics enable row level security;
alter table public.forum_replies enable row level security;
alter table public.contact_tickets enable row level security;
alter table public.bot_commands enable row level security;

drop policy if exists "profiles public read" on public.profiles;
create policy "profiles public read" on public.profiles for select using (true);

drop policy if exists "articles public read" on public.articles;
create policy "articles public read" on public.articles for select using (published or public.is_admin());
drop policy if exists "articles admin insert" on public.articles;
create policy "articles admin insert" on public.articles for insert with check (public.is_admin() and author_id=auth.uid());
drop policy if exists "articles admin update" on public.articles;
create policy "articles admin update" on public.articles for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists "articles admin delete" on public.articles;
create policy "articles admin delete" on public.articles for delete using (public.is_admin());

drop policy if exists "likes public read" on public.article_likes;
create policy "likes public read" on public.article_likes for select using (true);
drop policy if exists "likes own insert" on public.article_likes;
create policy "likes own insert" on public.article_likes for insert with check (auth.uid()=user_id);
drop policy if exists "likes own delete" on public.article_likes;
create policy "likes own delete" on public.article_likes for delete using (auth.uid()=user_id or public.is_admin());

drop policy if exists "comments public read" on public.article_comments;
create policy "comments public read" on public.article_comments for select using (true);
drop policy if exists "comments own insert" on public.article_comments;
create policy "comments own insert" on public.article_comments for insert with check (auth.uid()=user_id);
drop policy if exists "comments own delete" on public.article_comments;
create policy "comments own delete" on public.article_comments for delete using (auth.uid()=user_id or public.is_admin());

drop policy if exists "topics public read" on public.forum_topics;
create policy "topics public read" on public.forum_topics for select using (true);
drop policy if exists "topics own insert" on public.forum_topics;
create policy "topics own insert" on public.forum_topics for insert with check (auth.uid()=author_id);
drop policy if exists "topics admin update" on public.forum_topics;
create policy "topics admin update" on public.forum_topics for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists "topics owner admin delete" on public.forum_topics;
create policy "topics owner admin delete" on public.forum_topics for delete using (auth.uid()=author_id or public.is_admin());

drop policy if exists "replies public read" on public.forum_replies;
create policy "replies public read" on public.forum_replies for select using (true);
drop policy if exists "replies own insert" on public.forum_replies;
create policy "replies own insert" on public.forum_replies for insert with check (
  auth.uid()=author_id and exists(select 1 from public.forum_topics t where t.id=topic_id and not t.locked)
);
drop policy if exists "replies owner admin delete" on public.forum_replies;
create policy "replies owner admin delete" on public.forum_replies for delete using (auth.uid()=author_id or public.is_admin());

drop policy if exists "tickets own read" on public.contact_tickets;
create policy "tickets own read" on public.contact_tickets for select using (auth.uid()=user_id or public.is_admin());
drop policy if exists "tickets own insert" on public.contact_tickets;
create policy "tickets own insert" on public.contact_tickets for insert with check (auth.uid()=user_id);
drop policy if exists "tickets admin update" on public.contact_tickets;
create policy "tickets admin update" on public.contact_tickets for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists "tickets admin delete" on public.contact_tickets;
create policy "tickets admin delete" on public.contact_tickets for delete using (public.is_admin());

drop policy if exists "commands public read" on public.bot_commands;
create policy "commands public read" on public.bot_commands for select using (active or public.is_admin());
drop policy if exists "commands admin insert" on public.bot_commands;
create policy "commands admin insert" on public.bot_commands for insert with check (public.is_admin());
drop policy if exists "commands admin update" on public.bot_commands;
create policy "commands admin update" on public.bot_commands for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists "commands admin delete" on public.bot_commands;
create policy "commands admin delete" on public.bot_commands for delete using (public.is_admin());

insert into public.bot_commands(category,name,description,usage,example,permissions,sort_order)
values
('Hệ thống','/help','Mở trung tâm hướng dẫn của bot.','/help','/help','Mọi thành viên',10),
('Developer','/dev','Mở Developer Control Panel dành cho tài khoản Developer.','/dev','/dev','Developer',999)
on conflict(name) do nothing;
