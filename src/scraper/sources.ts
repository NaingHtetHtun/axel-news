export type SourceConfig = {
  name: string;
  url: string;
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
    selector: {
      articleLink: ".post-title a",
      title: ".entry-title",
      body: ".entry-content",
      publishedAt: ".post-date",
    },
    language: "en",
  },
];
