import { describe, expect, it } from 'bun:test';
import { downloadMarkdownService, getStatusService, startCrawlService } from '../../services/crawlService';

describe('Crawl Service', () => {
  it('should start a crawl', async () => {
    const config = { baseUrl: 'https://example.com', depth: 2, timeout: 5000, cssSelector: 'article' };
    await expect(startCrawlService(config)).resolves.not.toThrow();
  });

  it('should download Markdown files', async () => {
    const fileStream = await downloadMarkdownService();
    expect(fileStream).toBeDefined();
  });

  it('should get crawl status', async () => {
    const status = await getStatusService();
    expect(status).toHaveProperty('status');
    expect(status).toHaveProperty('urlsCrawled');
    expect(status).toHaveProperty('urlsRemaining');
    expect(status).toHaveProperty('errors');
  });
});