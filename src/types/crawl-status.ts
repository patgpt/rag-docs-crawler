export type CrawlStatus = {
  status: "running" | "completed" | "error";
  urlsCrawled: number;
  urlsRemaining: number;
  errors: string[];
};
