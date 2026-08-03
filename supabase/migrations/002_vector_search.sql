-- Axel News: Vector Search
-- Run this in Supabase SQL Editor
-- Requires pgvector extension (available on Supabase free tier)

-- Enable pgvector extension
create extension if not exists vector with schema extensions;

-- Add embedding column to articles table
-- Using 1536 dimensions for OpenAI-compatible embeddings
-- Can be changed to 768 for other models
alter table articles add column if not exists embedding vector(1536);

-- Create index for vector similarity search
-- Using ivfflat for faster approximate nearest neighbor search
-- Adjust lists based on your data size (start with sqrt(total_rows))
create index articles_embedding_idx on articles
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- Function: Search articles by semantic similarity
-- Takes a query embedding and returns similar articles
create or replace function search_articles(
  query_embedding vector(1536),
  match_count int default 10,
  match_threshold float default 0.5
)
returns table (
  id uuid,
  url text,
  title text,
  body text,
  source text,
  language text,
  published_at timestamptz,
  summary text,
  sentiment text,
  similarity float
)
language sql
stable
as $$
  select
    id,
    url,
    title,
    body,
    source,
    language,
    published_at,
    summary,
    sentiment,
    1 - (articles.embedding <=> query_embedding) as similarity
  from articles
  where articles.embedding is not null
    and 1 - (articles.embedding <=> query_embedding) > match_threshold
  order by articles.embedding <=> query_embedding
  limit match_count;
$$;

-- Function: Get article embedding status
-- Shows how many articles have embeddings
create or replace function get_embedding_status()
returns table (
  total_articles bigint,
  articles_with_embeddings bigint,
  percentage numeric
)
language sql
stable
as $$
  select
    count(*) as total_articles,
    count(embedding) as articles_with_embeddings,
    case
      when count(*) = 0 then 0
      else round(count(embedding)::numeric / count(*)::numeric * 100, 2)
    end as percentage
  from articles;
$$;

-- RLS policies for search function
-- The function already respects existing RLS on articles table
-- Public can search (read access), only authenticated can update embeddings

-- Grant execute permissions
grant execute on function search_articles to anon;
grant execute on function search_articles to authenticated;
grant execute on function get_embedding_status to anon;
grant execute on function get_embedding_status to authenticated;
