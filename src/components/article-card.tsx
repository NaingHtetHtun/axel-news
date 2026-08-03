"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Article } from "@/lib/articles";
import { SentimentBadge } from "./sentiment-badge";
import { LanguageBadge } from "./language-badge";

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
    >
      <Link href={`/article/${article.id}`}>
        <div className="mb-3 flex items-center gap-2">
          <SentimentBadge sentiment={article.sentiment} />
          <LanguageBadge language={article.language} />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {article.source}
          </span>
        </div>

        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
          {article.title}
        </h2>

        {article.summary && (
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {article.summary}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {article.published_at
              ? new Date(article.published_at).toLocaleDateString()
              : "Unknown date"}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
