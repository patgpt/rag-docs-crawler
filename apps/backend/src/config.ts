export const CRAWLER_CONFIG = {
  baseURL: 'https://nextjs.org/docs/app', // Default base URL
  maxRetries: 3,
  maxConcurrentRequests: 2,
  minDelay: 1000, // Minimum delay between requests (ms)
  maxDelay: 5000, // Maximum delay between requests (ms)
  outputDir: './output', // Output directory for Markdown files
  defaultSelector: 'article', // Default selector for content extraction
};

// Type definition for the configuration
type CrawlerConfig = {
  baseURL: string;
  maxRetries: number;
  maxConcurrentRequests: number;
  minDelay: number;
  maxDelay: number;
  outputDir: string;
  defaultSelector: string;
};
