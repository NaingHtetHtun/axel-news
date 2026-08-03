-- Axel News: Articles table
-- Run this in Supabase SQL Editor

create table articles (
  id uuid primary key default gen_random_uuid(),
  url text unique not null,
  title text not null,
  body text,
  source text not null,
  language text check (language in ('my', 'en', 'mixed')),
  published_at timestamptz,
  scraped_at timestamptz default now(),
  summary text,
  sentiment text check (sentiment in ('positive', 'neutral', 'negative')),
  bias_notes text,
  enrichment_model text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indexes
create index articles_url_idx on articles (url);
create index articles_source_idx on articles (source);
create index articles_published_at_idx on articles (published_at desc);
create index articles_language_idx on articles (language);

-- RLS (Row Level Security)
alter table articles enable row level security;

-- Public read access (anyone can view articles)
create policy "Public read access"
  on articles for select
  using (true);

-- Authenticated insert (only logged-in users can insert)
create policy "Authenticated insert"
  on articles for insert
  with check (auth.role() = 'authenticated');

-- Authenticated update (only logged-in users can update)
create policy "Authenticated update"
  on articles for update
  using (auth.role() = 'authenticated');
