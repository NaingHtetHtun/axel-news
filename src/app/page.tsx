export default function Home() {
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <article
            key={i}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                Tech
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                2 hours ago
              </span>
            </div>

            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Article Title Placeholder #{i}
            </h2>

            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              This is a placeholder for the article summary. The actual content
              will be fetched from Myanmar IT news sources and enriched with AI.
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Source Name
              </span>
              <div className="flex items-center gap-1">
                <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-700 dark:bg-green-900 dark:text-green-300">
                  Positive
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
