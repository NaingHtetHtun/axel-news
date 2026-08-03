-- Axel News: Sources table
-- Run this in Supabase SQL Editor

create table sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text unique not null,
  rss_url text,
  language text check (language in ('my', 'en', 'mixed')) not null,
  is_active boolean default true,
  last_scraped_at timestamptz,
  scrape_error text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indexes
create index sources_url_idx on sources (url);
create index sources_is_active_idx on sources (is_active);

-- RLS (Row Level Security)
alter table sources enable row level security;

-- Public read access (anyone can view sources)
create policy "Public read access"
  on sources for select
  using (true);

-- Authenticated insert (only logged-in users can insert)
create policy "Authenticated insert"
  on sources for insert
  with check (auth.role() = 'authenticated');

-- Authenticated update (only logged-in users can update)
create policy "Authenticated update"
  on sources for update
  using (auth.role() = 'authenticated');

-- Authenticated delete (only logged-in users can delete)
create policy "Authenticated delete"
  on sources for delete
  using (auth.role() = 'authenticated');

-- Function to update updated_at timestamp
create or replace function update_sources_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Trigger to auto-update updated_at
create trigger sources_updated_at
  before update on sources
  for each row
  execute function update_sources_updated_at();
