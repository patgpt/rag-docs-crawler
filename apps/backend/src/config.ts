// src/config.ts
export const CRAWLER_CONFIG = {
  // Base URL for crawling (can be overridden by user input)
  baseURL: 'https://nextjs.org/docs/app',

  // Retry settings
  maxRetries: 3,

  // Concurrency settings
  maxConcurrentRequests: 5,

  // Delay settings (in milliseconds)
  minDelay: 1000, // Minimum delay between requests
  maxDelay: 5000, // Maximum delay between requests

  // Output directory
  outputDir: './output',
};