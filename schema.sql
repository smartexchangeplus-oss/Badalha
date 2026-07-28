-- ============================================
-- مخطط قاعدة بيانات موقع "بدّلها"
-- شغّل هذا الملف كامل داخل: Supabase Dashboard -> SQL Editor -> New Query
-- ============================================

create extension if not exists "pgcrypto";

-- الملفات الشخصية (مرتبطة بجدول المصادقة auth.users)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  city text not null,
  created_at timestamptz default now()
);

-- المنتجات المعروضة للتبادل
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  description text not null,
  category text not null,
  location text not null,
  image_url text,
  want_in_exchange text,
  created_at timestamptz default now()
);

-- المحادثات بين طرفين حول منتج معيّن
create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade not null,
  product_title text not null,
  user_a uuid references profiles(id) on delete cascade not null,
  user_b uuid references profiles(id) on delete cascade not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- الرسائل داخل كل محادثة
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade not null,
  sender_id uuid references profiles(id) on delete cascade not null,
  text text not null,
  created_at timestamptz default now()
);

-- ============================================
-- تفعيل الحماية على مستوى الصف (Row Level Security)
-- بدون هذا، أي شخص يقدر يشوف أو يعدل بيانات أي أحد
-- ============================================
alter table profiles enable row level security;
alter table products enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;

-- سياسات profiles: الكل يقرأ، وكل مستخدم يعدل نفسه فقط
create policy "profiles_select_all" on profiles for select using (true);
create policy "profiles_insert_own" on profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on profiles for update using (auth.uid() = id);

-- سياسات products: الكل يشوف، صاحب المنتج فقط يعدّل أو يحذف
create policy "products_select_all" on products for select using (true);
create policy "products_insert_own" on products for insert with check (auth.uid() = owner_id);
create policy "products_update_own" on products for update using (auth.uid() = owner_id);
create policy "products_delete_own" on products for delete using (auth.uid() = owner_id);

-- سياسات conversations: فقط طرفا المحادثة يشوفونها
create policy "conversations_select_participants" on conversations
  for select using (auth.uid() = user_a or auth.uid() = user_b);
create policy "conversations_insert_participant" on conversations
  for insert with check (auth.uid() = user_a or auth.uid() = user_b);
create policy "conversations_update_participants" on conversations
  for update using (auth.uid() = user_a or auth.uid() = user_b);

-- سياسات messages: فقط طرفا المحادثة يقرأون ويرسلون
create policy "messages_select_participants" on messages
  for select using (
    exists (
      select 1 from conversations c
      where c.id = conversation_id
      and (c.user_a = auth.uid() or c.user_b = auth.uid())
    )
  );
create policy "messages_insert_participant" on messages
  for insert with check (
    auth.uid() = sender_id
    and exists (
      select 1 from conversations c
      where c.id = conversation_id
      and (c.user_a = auth.uid() or c.user_b = auth.uid())
    )
  );

-- تفعيل الاستماع اللحظي (Realtime) على الجداول المهمة
alter publication supabase_realtime add table messages;
alter publication supabase_realtime add table products;
