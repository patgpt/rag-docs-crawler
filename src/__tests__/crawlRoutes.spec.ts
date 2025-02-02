import { crawlPlugin } from '@/routes/crawl-routes';
import { describe, it, expect, mock } from 'bun:test';
import { Elysia } from 'elysia';


describe('crawlRoutes', () => {
  const app = new Elysia().use(crawlPlugin);

  describe('POST /api/crawl', () => {
    it('should handle crawl request successfully', async () => {
      // Mock the entire crawlService module
      mock.module('../services/crawlService', () => ({
        startCrawlService: mock(() => Promise.resolve({ success: true })),
        downloadMarkdownService: mock(() => Promise.resolve({})),
        getStatusService: mock(() => Promise.resolve({})),
      }));

      const response = await app.handle(
        new Request('http://localhost/api/crawl', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ baseUrl: 'https://example.com' }),
        })
      );

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true); // Use direct property access
    });
  });

  describe('GET /api/download', () => {
    it('should handle markdown download request', async () => {
      const mockMarkdown = '# Test Document';

      // Mock the entire crawlService module
      mock.module('../services/crawlService', () => ({
        startCrawlService: mock(() => Promise.resolve({})),
        downloadMarkdownService: mock(() => Promise.resolve({ content: mockMarkdown })),
        getStatusService: mock(() => Promise.resolve({})),
      }));

      const response = await app.handle(new Request('http://localhost/api/download'));

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.content).toBe(mockMarkdown); // Use direct property access
    });
  });

  describe('GET /api/status', () => {
    it('should return current crawl status', async () => {
      const mockStatus = {
        status: 'running',
        urlsCrawled: 5,
        urlsRemaining: 10,
        errors: [],
      };

      // Mock the entire crawlService module
      mock.module('../services/crawlService', () => ({
        startCrawlService: mock(() => Promise.resolve({})),
        downloadMarkdownService: mock(() => Promise.resolve({})),
        getStatusService: mock(() => Promise.resolve(mockStatus)),
      }));

      const response = await app.handle(new Request('http://localhost/api/status'));

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toEqual(mockStatus); // Compare the entire object
    });

    it('should handle errors gracefully', async () => {
      // Mock the entire crawlService module
      mock.module('../services/crawlService', () => ({
        startCrawlService: mock(() => Promise.resolve({})),
        downloadMarkdownService: mock(() => Promise.resolve({})),
        getStatusService: mock(() => Promise.reject(new Error('Status check failed'))),
      }));

      const response = await app.handle(new Request('http://localhost/api/status'));

      expect(response.status).toBe(500); // Ensure this matches your error handling logic
      const data = await response.json();
      expect(data.error).toBeDefined(); // Check that an error message exists
    });
  });
});