import { CRAWLER_CONFIG } from './config';
import { crawlAllRoutes } from './crawler';

// Create a Bun HTTP server
Bun.serve({
  port: process.env.PORT || 3000,
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);

    // Handle POST /crawl endpoint
    if (url.pathname === '/crawl' && req.method === 'POST') {
      try {
        // Parse JSON body
        const body = await req.json();
        const { url: targetUrl, retries, concurrency, minDelay, maxDelay } = body;

        if (!targetUrl) {
          return new Response(JSON.stringify({ message: 'URL is required.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        // Override config with user-provided values
        CRAWLER_CONFIG.baseURL = targetUrl;
        if (retries) CRAWLER_CONFIG.maxRetries = retries;
        if (concurrency) CRAWLER_CONFIG.maxConcurrentRequests = concurrency;
        if (minDelay) CRAWLER_CONFIG.minDelay = minDelay;
        if (maxDelay) CRAWLER_CONFIG.maxDelay = maxDelay;

        // Start crawling
        await crawlAllRoutes(targetUrl);

        return new Response(JSON.stringify({ message: 'Crawling completed successfully!' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Crawling failed.' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Default response for unsupported routes
    return new Response(JSON.stringify({ message: 'Route not found.' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  },
});

console.log(`Backend server running on http://localhost:${process.env.PORT || 3000}`);