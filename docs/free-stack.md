# Free Stack Plan — Axel News

How Axel News stays **100% free** for a pet project by replacing paid defaults.

## Principle

Prefer open-source and free tiers. Paid tools only if the user **explicitly** opts in.

## Substitution table

| Component | Original paid idea | Free substitute |
|-----------|--------------------|-----------------|
| Framework | Next.js | **Next.js** (Vercel free hosting) |
| Database & vector | Supabase | **Supabase free** (~500MB) |
| Auth | Clerk | **Clerk free** (~10k users) |
| Scraper | **Oxylabs** (paid) | **Playwright / Puppeteer + Chromium** (100% free) |
| AI LLM | **OpenAI / Anthropic** (paid) | **Groq / Gemini free / Ollama** |
| Analytics | PostHog | **PostHog free** (~1M events) |

---

## 1. Scraping — replace Oxylabs

### Best free path: Playwright / Puppeteer + Chromium

- Run headless Chromium on your machine, a cheap VPS free tier, or a background worker.
- Scrape news sites **directly** from your own process or a carefully designed API route.
- **Cost:** $0 (your CPU/RAM only).

**When to use which**

| Tool | Prefer when |
|------|-------------|
| **Playwright** | Default for new code; strong API, multi-browser |
| **Puppeteer** | Existing Chromium/Puppeteer familiarity |

**Serverless caveat:** Full Chromium on Vercel free is painful (bundle size, timeouts). Prefer:

1. Local dev + scheduled worker for production-like runs
2. Thin API routes only for tiny fetches if needed

### Optional free-tier scraping APIs

For tiny experiments only (not the primary architecture):

- **Firecrawl** free tier
- **Apify** free tier

Still prefer first-party Playwright for learning and zero vendor lock-in.

---

## 2. AI — replace OpenAI / Anthropic

Used for **summary**, **sentiment**, and **bias** notes on articles.

### Option A — Ollama (local, fully free)

- Run Llama 3 / Mistral (or similar) on your laptop via Ollama.
- Connect with Vercel AI SDK or direct HTTP to local Ollama.
- **Cost:** $0 (your RAM/GPU).

### Option B — Groq free tier

- Fast inference for Llama / Mixtral-class models.
- Good default for cloud free usage and speed.

### Option C — Google Gemini free (AI Studio)

- Free developer API key from Google AI Studio.
- Solid fallback when Groq limits hit.

### Recommended fallback order

```text
Groq (cloud free, fast)
  → Gemini free (cloud free backup)
  → Ollama (local, offline / unlimited for you)
```

Never default to OpenAI or Anthropic paid APIs in this project.

---

## 3. Full free architecture snapshot

| Component | Paid original | Free usage |
|-----------|---------------|------------|
| Framework | Next.js | Next.js + Vercel free |
| Database & vector | Supabase | Supabase free (~500MB) |
| Auth | Clerk | Clerk free (~10k users) |
| Scraper | Oxylabs | Playwright / Puppeteer |
| AI LLM | OpenAI / Anthropic | Groq / Gemini free / Ollama |
| Analytics | PostHog | PostHog free (~1M events) |

---

## 4. Free-tier honesty

Free is free until you hit limits. Plan for:

| Service | Typical free constraint | Pet-project tip |
|---------|-------------------------|-----------------|
| Supabase | DB size, egress | Store cleaned text, not huge HTML dumps forever |
| Clerk | MAU cap | Fine for personal/demo auth |
| Groq / Gemini | Daily rate limits | Queue enrichment; fallback chain |
| Vercel | Duration / size | Keep scrapers off serverless when heavy |
| PostHog | Event cap | Track key events only |

---

## 5. Myanmar notes (မူရင်း အနှစ်ချုပ်)

> ဒီ Project ကို **၁၀၀% အခမဲ့** စီစဉ်ချင်ရင် paid **Oxylabs** နဲ့ paid AI (OpenAI/Anthropic) ကို အောက်ပါအတိုင်း အစားထိုးနိုင်ပါတယ်။

**၁။ Scraping**

- **Puppeteer / Playwright + Chromium** — server သို့မဟုတ် API route ထဲမှာ headless browser နဲ့ တိုက်ရိုက် scrape (အကောင်းဆုံး free နည်း)။
- Firecrawl / Apify free tier — project သေးသေးအတွက် optional။

**၂။ AI (bias / sentiment / summary)**

- **Ollama** — laptop ပေါ် Llama 3 / Mistral၊ Vercel AI SDK ချိတ်၊ စက် resource သာ ကုန်။
- **Groq** သို့ **Gemini free API** — free tier / daily limits နဲ့ cloud မှာ သုံး။

**၃။ အကြံပြုချက်**

> Pet project ဆိုရင် scraping အတွက် **Playwright**, AI အတွက် **Groq** (သို့) **Gemini free** သုံးရင် တစ်ပြားမှ မကုန်ဘဲ 100% free နီးပါး တည်ဆောက်နိုင်ပါတယ်။

---

## Related

- [architecture.md](architecture.md)
- [context/stack.md](context/stack.md)
- Skill: `axel-free-stack`
