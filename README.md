# Axel News

Myanmar IT news aggregation and enrichment platform. Free, open, and AI-powered.

## Features

- **News Feed** — Browse articles from Myanmar IT sources
- **AI Enrichment** — Auto-generated summaries, sentiment, bias notes
- **Dark Mode** — Automatic theme switching
- **Responsive** — Works on mobile, tablet, desktop

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Clerk
- **LLM**: Groq (free tier)
- **Scraping**: Playwright
- **Analytics**: PostHog
- **UI**: Tailwind CSS + Framer Motion

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` — Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Your Supabase anon key
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — Your Clerk publishable key
- `CLERK_SECRET_KEY` — Your Clerk secret key

Optional:
- `GROQ_API_KEY` — For AI enrichment
- `NEXT_PUBLIC_POSTHOG_KEY` — For analytics

### 3. Set up database

Run the SQL migration in Supabase SQL Editor:

```sql
-- See: supabase/migrations/001_articles.sql
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run scrape` | Run news scraper |
| `npm run enrich` | Run AI enrichment |
| `npm run scrape:install` | Install Playwright browsers |

## Project Structure

```
axel-news/
├── src/
│   ├── app/           # Next.js pages
│   ├── components/    # React components
│   ├── lib/           # Utilities (Supabase, Clerk, PostHog)
│   ├── scraper/       # Playwright scraper
│   └── ai/            # AI enrichment
├── supabase/          # SQL migrations
├── docs/              # Project documentation
└── .ai/               # Axel agent (installed)
```

## Documentation

- [Project Guide](docs/project-guide.md) — How to use all docs
- [Architecture](docs/architecture.md) — System design
- [Roadmap](docs/roadmap.md) — Build phases
- [UI Conventions](docs/context/ui-conventions.md) — Design patterns

## License

MIT
