export const CRAWLER_CONFIG: CrawlerConfig = {
  // Base URL for crawling (can be overridden by user input)
  baseURL: 'https://nextjs.org/docs/app',
  // Retry settings
  maxRetries: 3,
  // Concurrency settings
  maxConcurrentRequests: 2,
  // Delay settings (in milliseconds)
  minDelay: 1000, // Minimum delay between requests
  maxDelay: 5000, // Maximum delay between requests
  // Output directory
  outputDir: './output',
  // Default selector for content extraction
  defaultSelector: 'main', // Fallback selector
};

type CrawlerConfig = {
  baseURL: string;
  maxRetries: number;
  maxConcurrentRequests: number;
  minDelay: number;
  maxDelay: number;
  outputDir: string;
  defaultSelector: string; // Add this property
};