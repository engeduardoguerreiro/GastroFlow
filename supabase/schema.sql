create extension if not exists pgcrypto;

create schema if not exists app_private;

create type public.restaurant_role as enum ('owner', 'admin', 'manager', 'cashier', 'kitchen');
create type public.option_type as enum ('single', 'multiple');
create type public.order_source as enum ('pdv', 'mesa', 'delivery', 'site', 'ifood', '99food', 'keeta', 'rappi', 'manual');
create type public.order_type as enum ('dine_in', 'delivery', 'pickup');
create type public.order_status as enum ('pending', 'accepted', 'preparing', 'ready', 'out_for_delivery', 'completed', 'canceled');
create type public.payment_status as enum ('pending', 'paid', 'refunded');
create type public.payment_method as enum ('cash', 'credit_card', 'debit_card', 'pix', 'online', 'other');
create type public.table_status as enum ('available', 'occupied', 'reserved', 'closed');
create type public.cash_register_status as enum ('open', 'closed');
create type public.cash_movement_type as enum ('income', 'expense', 'withdrawal', 'supply');
create type public.integration_provider as enum ('ifood', '99food', 'keeta', 'rappi', 'whatsapp', 'webhook');
create type public.integration_status as enum ('disconnected', 'connected', 'error', 'pending');

create table public.restaurants (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  slug text not null unique,
  description text,
  logo_url text,
  cover_url text,
  phone text,
  whatsapp text,
  email text,
  address text,
  city text,
  state text,
  zip_code text,
  is_open boolean not null default true,
  opening_hours jsonb not null default '{}'::jsonb,
  delivery_enabled boolean not null default true,
  pickup_enabled boolean not null default true,
  table_service_enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.restaurant_users (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.restaurant_role not null default 'cashier',
  created_at timestamptz not null default now(),
  unique (restaurant_id, user_id)
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  name text not null,
  description text,
  display_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  description text,
  price numeric(12,2) not null check (price >= 0),
  image_url text,
  active boolean not null default true,
  preparation_time integer,
  stock_control_enabled boolean not null default false,
  stock_quantity integer,
  created_at timestamptz not null default now()
);

create table public.product_options (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  name text not null,
  type public.option_type not null,
  required boolean not null default false,
  min_choices integer not null default 0,
  max_choices integer,
  created_at timestamptz not null default now()
);

create table public.product_option_items (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  option_id uuid not null references public.product_options(id) on delete cascade,
  name text not null,
  additional_price numeric(12,2) not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  name text not null,
  phone text,
  email text,
  cpf text,
  address text,
  neighborhood text,
  city text,
  state text,
  zip_code text,
  notes text,
  created_at timestamptz not null default now()
);

create table public.tables (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  number integer not null,
  name text,
  status public.table_status not null default 'available',
  created_at timestamptz not null default now(),
  unique (restaurant_id, number)
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  order_number integer not null,
  source public.order_source not null default 'manual',
  type public.order_type not null default 'pickup',
  status public.order_status not null default 'pending',
  payment_status public.payment_status not null default 'pending',
  payment_method public.payment_method not null default 'other',
  subtotal numeric(12,2) not null default 0,
  delivery_fee numeric(12,2) not null default 0,
  discount numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  customer_name text,
  customer_phone text,
  delivery_address text,
  table_id uuid references public.tables(id) on delete set null,
  notes text,
  external_order_id text,
  external_platform text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (restaurant_id, order_number)
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12,2) not null default 0,
  total_price numeric(12,2) not null default 0,
  notes text,
  selected_options jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.cash_registers (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  opened_by uuid not null references auth.users(id),
  closed_by uuid references auth.users(id),
  opening_amount numeric(12,2) not null default 0,
  closing_amount numeric(12,2),
  status public.cash_register_status not null default 'open',
  opened_at timestamptz not null default now(),
  closed_at timestamptz
);

create table public.cash_movements (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  cash_register_id uuid not null references public.cash_registers(id) on delete cascade,
  type public.cash_movement_type not null,
  amount numeric(12,2) not null,
  description text,
  payment_method public.payment_method,
  created_at timestamptz not null default now()
);

create table public.integrations (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  provider public.integration_provider not null,
  enabled boolean not null default false,
  status public.integration_status not null default 'disconnected',
  credentials jsonb not null default '{}'::jsonb,
  settings jsonb not null default '{}'::jsonb,
  last_sync_at timestamptz,
  created_at timestamptz not null default now(),
  unique (restaurant_id, provider)
);

create table public.integration_logs (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  integration_id uuid references public.integrations(id) on delete set null,
  provider public.integration_provider not null,
  event_type text not null,
  status text not null,
  message text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  plan_name text not null,
  status text not null,
  price numeric(12,2) not null default 0,
  started_at timestamptz not null default now(),
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function app_private.is_restaurant_member(target_restaurant_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.restaurant_users ru
    where ru.restaurant_id = target_restaurant_id
      and ru.user_id = auth.uid()
  );
$$;

create or replace function app_private.user_restaurant_role(target_restaurant_id uuid)
returns public.restaurant_role
language sql
security definer
set search_path = public
stable
as $$
  select ru.role from public.restaurant_users ru
  where ru.restaurant_id = target_restaurant_id
    and ru.user_id = auth.uid()
  limit 1;
$$;

create or replace function public.set_order_number()
returns trigger
language plpgsql
as $$
begin
  if new.order_number is null then
    select coalesce(max(order_number), 0) + 1 into new.order_number
    from public.orders
    where restaurant_id = new.restaurant_id;
  end if;
  return new;
end;
$$;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger orders_set_number before insert on public.orders for each row execute function public.set_order_number();
create trigger orders_touch_updated before update on public.orders for each row execute function public.touch_updated_at();

alter table public.restaurants enable row level security;
alter table public.restaurant_users enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_options enable row level security;
alter table public.product_option_items enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.tables enable row level security;
alter table public.cash_registers enable row level security;
alter table public.cash_movements enable row level security;
alter table public.integrations enable row level security;
alter table public.integration_logs enable row level security;
alter table public.subscriptions enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant select on public.restaurants, public.categories, public.products, public.product_options, public.product_option_items to anon;
grant insert on public.orders, public.order_items, public.integration_logs to anon;

create policy "public can read open restaurant sites" on public.restaurants for select using (true);
create policy "owners can create restaurants" on public.restaurants for insert with check (owner_id = auth.uid());
create policy "members manage restaurants" on public.restaurants for update using (app_private.is_restaurant_member(id)) with check (app_private.is_restaurant_member(id));

create policy "users read own memberships" on public.restaurant_users for select using (user_id = auth.uid() or app_private.is_restaurant_member(restaurant_id));
create policy "owner inserts initial membership" on public.restaurant_users for insert with check (user_id = auth.uid() or app_private.user_restaurant_role(restaurant_id) in ('owner','admin'));
create policy "owners manage memberships" on public.restaurant_users for update using (app_private.user_restaurant_role(restaurant_id) in ('owner','admin')) with check (app_private.user_restaurant_role(restaurant_id) in ('owner','admin'));

create policy "public read active categories" on public.categories for select using (active or app_private.is_restaurant_member(restaurant_id));
create policy "members manage categories" on public.categories for all using (app_private.is_restaurant_member(restaurant_id)) with check (app_private.is_restaurant_member(restaurant_id));

create policy "public read active products" on public.products for select using (active or app_private.is_restaurant_member(restaurant_id));
create policy "members manage products" on public.products for all using (app_private.is_restaurant_member(restaurant_id)) with check (app_private.is_restaurant_member(restaurant_id));

create policy "public read active product options" on public.product_options for select using (app_private.is_restaurant_member(restaurant_id) or exists (select 1 from public.products p where p.id = product_id and p.active));
create policy "members manage product options" on public.product_options for all using (app_private.is_restaurant_member(restaurant_id)) with check (app_private.is_restaurant_member(restaurant_id));

create policy "public read active option items" on public.product_option_items for select using (active or app_private.is_restaurant_member(restaurant_id));
create policy "members manage option items" on public.product_option_items for all using (app_private.is_restaurant_member(restaurant_id)) with check (app_private.is_restaurant_member(restaurant_id));

create policy "members manage customers" on public.customers for all using (app_private.is_restaurant_member(restaurant_id)) with check (app_private.is_restaurant_member(restaurant_id));

create policy "members read orders" on public.orders for select using (app_private.is_restaurant_member(restaurant_id));
create policy "members create orders" on public.orders for insert with check (app_private.is_restaurant_member(restaurant_id));
create policy "public creates site orders" on public.orders for insert with check (source = 'site');
create policy "members update orders" on public.orders for update using (app_private.is_restaurant_member(restaurant_id)) with check (app_private.is_restaurant_member(restaurant_id));

create policy "members read order items" on public.order_items for select using (app_private.is_restaurant_member(restaurant_id));
create policy "members create order items" on public.order_items for insert with check (app_private.is_restaurant_member(restaurant_id));
create policy "public creates site order items" on public.order_items for insert with check (exists (select 1 from public.orders o where o.id = order_id and o.restaurant_id = restaurant_id and o.source = 'site'));

create policy "members manage tables" on public.tables for all using (app_private.is_restaurant_member(restaurant_id)) with check (app_private.is_restaurant_member(restaurant_id));
create policy "members manage cash registers" on public.cash_registers for all using (app_private.is_restaurant_member(restaurant_id)) with check (app_private.is_restaurant_member(restaurant_id));
create policy "members manage cash movements" on public.cash_movements for all using (app_private.is_restaurant_member(restaurant_id)) with check (app_private.is_restaurant_member(restaurant_id));
create policy "members manage integrations" on public.integrations for all using (app_private.is_restaurant_member(restaurant_id)) with check (app_private.is_restaurant_member(restaurant_id));
create policy "members read integration logs" on public.integration_logs for select using (app_private.is_restaurant_member(restaurant_id));
create policy "members create integration logs" on public.integration_logs for insert with check (app_private.is_restaurant_member(restaurant_id));
create policy "public creates integration logs" on public.integration_logs for insert with check (true);
create policy "members manage subscriptions" on public.subscriptions for all using (app_private.is_restaurant_member(restaurant_id)) with check (app_private.is_restaurant_member(restaurant_id));

create index categories_restaurant_idx on public.categories (restaurant_id, display_order);
create index products_restaurant_idx on public.products (restaurant_id, category_id, active);
create index orders_restaurant_status_idx on public.orders (restaurant_id, status, created_at desc);
create index order_items_order_idx on public.order_items (order_id);
create index integrations_restaurant_provider_idx on public.integrations (restaurant_id, provider);
