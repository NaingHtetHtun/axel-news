type SentimentBadgeProps = {
  sentiment: "positive" | "neutral" | "negative" | null;
};

const sentimentStyles = {
  positive: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  neutral: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  negative: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

export function SentimentBadge({ sentiment }: SentimentBadgeProps) {
  if (!sentiment) return null;

  return (
    <span
      className={`rounded px-1.5 py-0.5 text-xs font-medium ${sentimentStyles[sentiment]}`}
    >
      {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
    </span>
  );
}
