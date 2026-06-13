-- =============================================
-- DELPHI MVP DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- =============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =============================================
-- INSTITUTIONS (schools/colleges)
-- =============================================
create table institutions (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  type text check (type in ('school', 'college', 'university')) not null,
  city text,
  state text,
  contact_name text,
  contact_email text unique not null,
  contact_phone text,
  logo_url text,
  plan text default 'starter' check (plan in ('starter', 'growth', 'enterprise')),
  is_verified boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =============================================
-- PROGRAMS (workshops, training, internships)
-- =============================================
create table programs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  type text check (type in ('workshop', 'training', 'internship', 'custom')) not null,
  description text,
  duration text,
  mode text check (mode in ('online', 'offline', 'hybrid')) default 'hybrid',
  price numeric(10,2) default 0,
  max_seats integer default 30,
  tags text[],
  is_active boolean default true,
  created_at timestamptz default now()
);

-- =============================================
-- BOOKINGS (institution books a program)
-- =============================================
create table bookings (
  id uuid default uuid_generate_v4() primary key,
  institution_id uuid references institutions(id) on delete cascade,
  program_id uuid references programs(id) on delete cascade,
  status text check (status in ('pending', 'confirmed', 'completed', 'cancelled')) default 'pending',
  scheduled_date date,
  seats_booked integer default 1,
  total_amount numeric(10,2) default 0,
  payment_id text,
  payment_status text check (payment_status in ('unpaid', 'paid', 'refunded')) default 'unpaid',
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =============================================
-- LEADS (demo requests / contact form)
-- =============================================
create table leads (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text,
  institution_name text,
  city text,
  message text,
  source text default 'landing_page',
  status text check (status in ('new', 'contacted', 'qualified', 'converted', 'lost')) default 'new',
  created_at timestamptz default now()
);

-- =============================================
-- USERS (Supabase auth linked)
-- =============================================
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  institution_id uuid references institutions(id),
  full_name text,
  role text check (role in ('admin', 'institution_admin', 'staff')) default 'institution_admin',
  avatar_url text,
  created_at timestamptz default now()
);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
alter table institutions enable row level security;
alter table bookings enable row level security;
alter table profiles enable row level security;
alter table leads enable row level security;
alter table programs enable row level security;

-- Profiles: users can read/update their own
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Programs: publicly readable
create policy "Programs are publicly readable"
  on programs for select using (true);

-- Institutions: admins see all, institution_admin sees own
create policy "Admins see all institutions"
  on institutions for select
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Institution admins see own institution"
  on institutions for select
  using (id = (select institution_id from profiles where id = auth.uid()));

-- Bookings: institution sees own bookings
create policy "Institutions see own bookings"
  on bookings for select
  using (institution_id = (select institution_id from profiles where id = auth.uid()));

-- Leads: only admins
create policy "Only admins can view leads"
  on leads for select
  using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- Anyone can insert a lead (contact form)
create policy "Anyone can submit a lead"
  on leads for insert with check (true);

-- =============================================
-- SEED: Sample programs
-- =============================================
insert into programs (title, type, description, duration, mode, price, tags) values
  ('AI & ML Fundamentals Workshop', 'workshop', 'Hands-on introduction to Artificial Intelligence and Machine Learning for students.', '2 days', 'offline', 15000, ARRAY['AI', 'ML', 'technology']),
  ('Leadership & Soft Skills Training', 'training', 'Communication, teamwork, and leadership skills for final-year students.', '3 days', 'hybrid', 12000, ARRAY['leadership', 'soft skills', 'career']),
  ('Full Stack Web Development Bootcamp', 'training', 'Intensive bootcamp covering React, Node.js, and deployment.', '5 days', 'online', 20000, ARRAY['web', 'coding', 'technology']),
  ('Industry Internship Program', 'internship', '8-week structured internship with leading companies across domains.', '8 weeks', 'offline', 5000, ARRAY['internship', 'placement', 'industry']),
  ('Entrepreneurship & Startup Workshop', 'workshop', 'From idea to MVP — practical entrepreneurship for college students.', '1 day', 'offline', 8000, ARRAY['startup', 'entrepreneurship', 'business']),
  ('Data Analytics with Excel & Python', 'training', 'Practical data analysis skills using Excel, Python, and visualization tools.', '3 days', 'online', 10000, ARRAY['data', 'analytics', 'python']);
