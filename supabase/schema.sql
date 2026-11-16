-- MR TradLab ZERO | Pré-cadastro público
-- Execute no SQL Editor do projeto Supabase.
create extension if not exists pgcrypto;

create table if not exists public.preregistrations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  whatsapp text not null check (char_length(whatsapp) between 8 and 20),
  email text not null check (char_length(email) <= 180),
  city text not null check (char_length(city) between 1 and 100),
  state text not null check (state ~ '^[A-Z]{2}$'),
  consent boolean not null default false check (consent = true),
  source text not null default 'portal-publico',
  status text not null default 'novo' check (status in ('novo','em_analise','aprovado','recusado','contatado')),
  created_at timestamptz not null default now()
);

create unique index if not exists preregistrations_email_unique
  on public.preregistrations (lower(email));
create unique index if not exists preregistrations_whatsapp_unique
  on public.preregistrations (whatsapp);

alter table public.preregistrations enable row level security;

-- Visitantes podem somente enviar um cadastro. Não podem ler, editar ou apagar cadastros.
drop policy if exists "Public can submit preregistration" on public.preregistrations;
create policy "Public can submit preregistration"
on public.preregistrations for insert
to anon, authenticated
with check (
  consent = true
  and status = 'novo'
  and source = 'portal-publico'
);

-- Não criar políticas públicas de SELECT/UPDATE/DELETE.
-- Administrador consulta e gerencia pelo painel do Supabase com conta autorizada.
