import { getArticles, Article } from "@/lib/articles";
import { ArticleCard } from "@/components/article-card";
import { ArticleCardSkeleton } from "@/components/article-card-skeleton";

export default async function Home() {
  let articles: Article[] = [];
  let error: string | null = null;

  try {
    articles = await getArticles({ limit: 12 });
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  }

  const isConfigError = error?.includes("Missing Supabase");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Latest News
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Myanmar IT and tech news, curated and enriched
        </p>
      </div>

      {isConfigError && (
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/50">
          <h2 className="mb-2 text-lg font-semibold text-blue-900 dark:text-blue-100">
            Welcome to Axel News!
          </h2>
          <p className="mb-4 text-sm text-blue-800 dark:text-blue-200">
            To get started, configure your Supabase and Clerk environment
            variables in <code className="rounded bg-blue-100 px-1 dark:bg-blue-800">.env.local</code>:
          </p>
          <pre className="overflow-x-auto rounded bg-blue-100 p-3 text-xs text-blue-900 dark:bg-blue-800 dark:text-blue-100">
{`NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-key
CLERK_SECRET_KEY=your-secret`}
          </pre>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.length > 0
          ? articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          : Array.from({ length: 6 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
      </div>
    </div>
  );
}
