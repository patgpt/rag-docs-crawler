export const CRAWLER_CONFIG = {
  baseURL: 'https://nextjs.org/docs/app', // Default base URL
  maxRetries: 3,
  maxConcurrentRequests: 2,
  minDelay: 1000, // Minimum delay between requests (ms)
  maxDelay: 5000, // Maximum delay between requests (ms)
  outputDir: './output', // Output directory for Markdown files
  defaultSelector: 'main', // Default selector for content extraction
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

// Function to validate the configuration
export function validateConfig(config: CrawlerConfig): asserts config is CrawlerConfig {
    if (!config) throw new Error('CRAWLER_CONFIG is required.');

  if (!config.baseURL) throw new Error('baseURL is required in CRAWLER_CONFIG.');
  if (!config.outputDir) throw new Error('outputDir is required in CRAWLER_CONFIG.');
  if (config.maxConcurrentRequests != null && config.maxConcurrentRequests <= 0) throw new Error('maxConcurrentRequests must be greater than 0.');
  if (config.minDelay!= null && config.minDelay  < 0 || config.maxDelay < 0) throw new Error('Delays must be non-negative.');
  if (config.minDelay > config.maxDelay) throw new Error('minDelay cannot be greater than maxDelay.');
}

// Validate the configuration on startup
validateConfig(CRAWLER_CONFIG);