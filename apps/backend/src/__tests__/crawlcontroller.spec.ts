import { describe, it, expect, mock } from 'bun:test';
import { Elysia } from 'elysia';
import { crawlController } from '../controllers/crawlController';

describe('crawlController', () => {
  const app = new Elysia();
  crawlController(app);

  describe('POST /start', () => {
    it('should return success message when crawl starts successfully', async () => {
      // Mock the entire crawlService module
      mock.module('../services/crawlService', () => ({
        startCrawlService: mock((body) => Promise.resolve()),
        getStatusService: mock(() => Promise.resolve({})), // Include other exported functions
      }));

      const response = await app.handle(
        new Request('http://localhost/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ baseUrl: 'https://example.com' }),
        })
      );

      const json = await response.json();
      expect(response.status).toBe(200);
      expect(json).toEqual({ message: 'Crawl started successfully' });
    });

    it('should return error message when crawl fails to start', async () => {
      // Mock the entire crawlService module
      mock.module('../services/crawlService', () => ({
        startCrawlService: mock(() => Promise.reject(new Error('Failed to start crawl'))),
        getStatusService: mock(() => Promise.resolve({})), // Include other exported functions
      }));

      const response = await app.handle(
        new Request('http://localhost/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ baseUrl: 'https://example.com' }),
        })
      );

      const json = await response.json();
      expect(response.status).toBe(200); // Assuming errors are returned with status 200
      expect(json).toEqual({ error: 'Failed to start crawl' });
    });
  });

  describe('GET /status', () => {
    it('should return crawl status successfully', async () => {
      // Mock the entire crawlService module
      mock.module('../services/crawlService', () => ({
        startCrawlService: mock(() => Promise.resolve()),
        getStatusService: mock(() =>
          Promise.resolve({
            status: 'running',
            urlsCrawled: 10,
            urlsRemaining: 5,
            errors: [],
          })
        ),
      }));

      const response = await app.handle(new Request('http://localhost/status'));

      const json = await response.json();
      expect(response.status).toBe(200);
      expect(json).toEqual({
        status: 'running',
        urlsCrawled: 10,
        urlsRemaining: 5,
        errors: [],
      });
    });

    it('should return error message when fetching status fails', async () => {
      // Mock the entire crawlService module
      mock.module('../services/crawlService', () => ({
        startCrawlService: mock(() => Promise.resolve()),
        getStatusService: mock(() => Promise.reject(new Error('Failed to fetch crawl status'))),
      }));

      const response = await app.handle(new Request('http://localhost/status'));

      const json = await response.json();
      expect(response.status).toBe(200); // Assuming errors are returned with status 200
      expect(json).toEqual({ error: 'Failed to fetch crawl status' });
    });
  });
});