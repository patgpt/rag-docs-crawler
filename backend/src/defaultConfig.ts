const defaultConfig: Config = {
  baseUrl: "https://vercel.com",
  maxRequestsPerMinute: 100,
  conncurrentRequests: 10,
  minCrawlDelay: 1000,
  maxCrawlDelay: 3000,
  crawlDepth: 3, // How deep to crawl (e.g., follow links up to 3 levels deep)
  includeSubdomains: false, // Whether to crawl subdomains
};

type Config = {
  baseUrl: string;
  maxRequestsPerMinute: number;
  crawlDepth: number;
  conncurrentRequests: number;
  minCrawlDelay: number;
  maxCrawlDelay: number;
  includeSubdomains: boolean;
  selector?: {};
};
