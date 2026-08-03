export function ArticleCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-3 flex gap-2">
        <div className="h-5 w-16 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-5 w-12 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="mb-2 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-4 space-y-2">
        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}
