export const CRAWLER_CONFIG = {
  baseURL: 'https://nextjs.org/docs/app',
  maxRetries: 3,
  maxConcurrentRequests: 1, // Reduce concurrency to 1 for debugging
  minDelay: 2000,
  maxDelay: 5000,
  outputDir: './output',
};
type CrawlerConfig = {
  baseURL: string;
  maxRetries: number;
  maxConcurrentRequests: number;
  minDelay: number;
  maxDelay: number;
  outputDir: string;
};