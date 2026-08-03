export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 dark:text-white">
              Axel News
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Myanmar IT News
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              GitHub
            </a>
            <span className="text-sm text-gray-400 dark:text-gray-500">
              Built with Next.js
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
