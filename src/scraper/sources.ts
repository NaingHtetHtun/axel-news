export type SourceConfig = {
  name: string;
  url: string;
  rssUrl?: string; // RSS feed URL (preferred if available)
  selector: {
    articleLink: string;
    title: string;
    body: string;
    publishedAt?: string;
  };
  language: "my" | "en" | "mixed";
};

export const sources: SourceConfig[] = [
  {
    name: "Myanmar Tech",
    url: "https://myanmar-tech.com",
    rssUrl: "https://myanmar-tech.com/feed", // Common WordPress RSS path
    selector: {
      articleLink: "article a",
      title: "h1",
      body: "article-content",
      publishedAt: "time",
    },
    language: "my",
  },
  {
    name: "IT Voice Myanmar",
    url: "https://itvoicemyanmar.com",
    rssUrl: "https://itvoicemyanmar.com/feed", // Common WordPress RSS path
    selector: {
      articleLink: ".post-title a",
      title: ".entry-title",
      body: ".entry-content",
      publishedAt: ".post-date",
    },
    language: "en",
  },
];
