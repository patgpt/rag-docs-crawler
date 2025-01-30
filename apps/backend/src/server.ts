import { CRAWLER_CONFIG } from './config';
import { crawlAllRoutes } from './crawler';
import logger from './logger';

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
        const { url: targetUrl, selector } = body;

        if (!targetUrl) {
          return new Response(JSON.stringify({ message: 'URL is required.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        // Override config with user-provided values
        CRAWLER_CONFIG.baseURL = targetUrl;
        if (selector) CRAWLER_CONFIG.defaultSelector = selector;

        // Start crawling
        await crawlAllRoutes(targetUrl, selector);

        return new Response(JSON.stringify({ message: 'Crawling completed successfully!' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        logger.error(error);
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

logger.info(`Backend server running on http://localhost:${process.env.PORT || 3000}`);