type LanguageBadgeProps = {
  language: "my" | "en" | "mixed" | null;
};

const languageLabels = {
  my: "Myanmar",
  en: "English",
  mixed: "Mixed",
};

export function LanguageBadge({ language }: LanguageBadgeProps) {
  if (!language) return null;

  return (
    <span className="rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
      {languageLabels[language]}
    </span>
  );
}
