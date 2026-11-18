-- PAROUSIA: estrutura inicial da livraria digital
-- Executar no SQL Editor de um projecto Supabase novo.
-- Depois de criar o primeiro utilizador administrador, atribuir-lhe role='admin'
-- manualmente pelo painel SQL. Nunca permitir que um utilizador altere a própria role.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  author text,
  description text,
  cover_url text,
  file_path text,
  price_aoa integer not null default 0 check (price_aoa >= 0),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.book_categories (
  book_id uuid not null references public.books(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  primary key (book_id, category_id)
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete restrict,
  status text not null default 'pending' check (status in ('pending', 'paid', 'cancelled', 'refunded')),
  subtotal_aoa integer not null check (subtotal_aoa >= 0),
  total_aoa integer not null check (total_aoa >= 0),
  payment_method text,
  payment_reference text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  book_id uuid references public.books(id) on delete set null,
  book_title text not null,
  unit_price_aoa integer not null check (unit_price_aoa >= 0),
  quantity integer not null default 1 check (quantity > 0),
  created_at timestamptz not null default now()
);

create index if not exists books_status_published_idx on public.books(status, published_at desc);
create index if not exists books_featured_idx on public.books(featured) where featured = true;
create index if not exists book_categories_category_idx on public.book_categories(category_id);
create index if not exists orders_user_created_idx on public.orders(user_id, created_at desc);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists order_items_order_idx on public.order_items(order_id);

-- Criar automaticamente o perfil quando alguém se regista no Supabase Auth.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    nullif(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Função auxiliar para políticas administrativas.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.books enable row level security;
alter table public.book_categories enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Perfis: cada utilizador consulta o próprio perfil; administradores gerem todos.
drop policy if exists "Profiles: read own or admin" on public.profiles;
create policy "Profiles: read own or admin"
on public.profiles for select to authenticated
using (id = (select auth.uid()) or (select public.is_admin()));

drop policy if exists "Profiles: admin manages" on public.profiles;
create policy "Profiles: admin manages"
on public.profiles for all to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

-- Catálogo público: apenas categorias activas e livros publicados.
drop policy if exists "Categories: public reads active" on public.categories;
create policy "Categories: public reads active"
on public.categories for select to anon, authenticated
using (is_active = true or (select public.is_admin()));

drop policy if exists "Categories: admin manages" on public.categories;
create policy "Categories: admin manages"
on public.categories for all to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

drop policy if exists "Books: public reads published" on public.books;
create policy "Books: public reads published"
on public.books for select to anon, authenticated
using (status = 'published' or (select public.is_admin()));

drop policy if exists "Books: admin manages" on public.books;
create policy "Books: admin manages"
on public.books for all to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

drop policy if exists "Book categories: public reads published links" on public.book_categories;
create policy "Book categories: public reads published links"
on public.book_categories for select to anon, authenticated
using (
  exists (
    select 1 from public.books b
    where b.id = book_id
      and (b.status = 'published' or (select public.is_admin()))
  )
);

drop policy if exists "Book categories: admin manages" on public.book_categories;
create policy "Book categories: admin manages"
on public.book_categories for all to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

-- Compradores só consultam as próprias encomendas. A confirmação de pagamento
-- deverá ser feita por uma função backend/webhook confiável, nunca pelo browser.
drop policy if exists "Orders: customer reads own" on public.orders;
create policy "Orders: customer reads own"
on public.orders for select to authenticated
using (user_id = (select auth.uid()) or (select public.is_admin()));

drop policy if exists "Orders: customer creates own pending order" on public.orders;
create policy "Orders: customer creates own pending order"
on public.orders for insert to authenticated
with check (
  user_id = (select auth.uid())
  and status = 'pending'
  and paid_at is null
);

drop policy if exists "Orders: admin manages" on public.orders;
create policy "Orders: admin manages"
on public.orders for all to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

drop policy if exists "Order items: customer reads own" on public.order_items;
create policy "Order items: customer reads own"
on public.order_items for select to authenticated
using (
  exists (
    select 1 from public.orders o
    where o.id = order_id
      and (o.user_id = (select auth.uid()) or (select public.is_admin()))
  )
);

drop policy if exists "Order items: admin manages" on public.order_items;
create policy "Order items: admin manages"
on public.order_items for all to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));
