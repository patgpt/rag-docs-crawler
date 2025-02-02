import { chromium, type Page } from "playwright";
import { logger } from "../../utils/logger";

import { crawlConfigSchema } from "@/schema/crawl";
import { type Static } from "elysia";

import { CrawlQueue } from "@/services/crawl/crawl-queue";
import type { CrawlStatusService } from "@/services/crawl/crawl.status.service";
import type { PageError, PageResult } from "@/types/types";
import { ArchiverService } from "../archive/archiver.service";
import { ContentConverterService } from "../content/content-converter.service";
import { ContentStorageService } from "../content/content-storage.service";
import { CrawlDatabaseService } from "./crawl-database.service";
const MAX_RETRIES = 3;
/**
 * Service responsible for crawling web pages and converting them to markdown content.
 * Manages the entire crawling lifecycle including content fetching, conversion, and storage.
 *
 * @remarks
 * This service implements rate limiting and validates URLs before crawling.
 * It also handles archiving of crawled content and broadcasts status updates.
 *
 * @example
 * ```typescript
 * const crawler = new CrawlService(database, converter, storage, archiver, status);
 * await crawler.startCrawl({
 *   baseUrl: 'https://example.com',
 *   selector: 'main',
 *   requestTimeout: 30000
 * });
 * ```
 */
export class CrawlService {
  private requestCount = 0;
  private readonly maxRequestsPerMinute = 100;

  /**
   * Creates a new instance of the CrawlService.
   *
   * @param crawlDatabase - Service for managing crawl-related database operations
   * @param contentConverter - Service for converting HTML content to markdown
   * @param contentStorage - Service for storing converted content
   * @param archiver - Service for creating archives of crawled content
   * @param statusService - Service for broadcasting crawl status updates
   */
  constructor(
    private readonly crawlDatabase: CrawlDatabaseService,
    private readonly contentConverter: ContentConverterService,
    private readonly contentStorage: ContentStorageService,
    private readonly archiver: ArchiverService,
    private readonly statusService: CrawlStatusService,
    private readonly crawlQueue: CrawlQueue,
  ) {}

  /**
   * Initiates a web crawling process based on the provided configuration.
   *
   * @param config - Configuration object for the crawl
   * @param config.baseUrl - Starting URL for the crawl
   * @param config.selector - CSS selector to target specific content
   * @param config.requestTimeout - Timeout in milliseconds for each request
   *
   * @throws {Error} If browser launch fails
   * @throws {Error} If page navigation fails
   *
   * @returns Promise that resolves when crawling is complete
   */
// crawl.service.ts
async startCrawl(config: Static<typeof crawlConfigSchema>) {
  const crawlId = await this.crawlDatabase.createCrawlRecord(config);
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    const queue = new CrawlQueue(config.baseUrl, config.maxDepth);
    const crawledPages = new Map<string, PageResult>();
    const failedPages: PageError[] = [];

    while (!queue.isEmpty()) {
      const { url, depth } = queue.next()!;

      if (crawledPages.has(url)) continue;

      await this.throttleRequests();

      try {
        const content = await this.getPageContent(page, config);
        const links = await this.extractAndFilterLinks(page, config.baseUrl);
        const pageContent = await page.content()
        // Store page content and metadata
        const markdown = this.contentConverter.convertToMarkdown(pageContent);
        const filename = this.generateFilename(content.title || url);
        this.contentStorage.saveContent(filename, markdown);

        // Update database records
        await this.crawlDatabase.upsertPage({
          url,
          crawlId,
          content:pageContent,
          statusCode: 200,
          crawledAt: new Date()
        });


        queue.add(links, depth + 1);
        crawledPages.set(url, { url, depth, status: 'success' });

      } catch (error) {
        const retryCount = await this.handleCrawlError(url, crawlId, error, depth);
        failedPages.push({
        url,
        error,
        retryCount,
        timestamp: new Date()
      });
        crawledPages.set(url, { url, depth, status: 'failed' });
      }

      this.crawlDatabase.updateCrawlStatus(crawlId, crawledPages.get(url)?.status || "unknown:fix this");
    }

    await this.finalizeCrawl(crawlId, crawledPages.size, failedPages.length, queue.size());

  } finally {
    await browser.close();
    await this.cleanupOutputDirectory();
  }
}
 private async getPageContent(page: Page, config: Static<typeof crawlConfigSchema>) {
  const content =   config.selector
    ? (await page.$(config.selector))?.innerHTML() || ''
    : await page.content();
  const title = await page.title() || new URL(page.url()).hostname;
  return { content, title };
}

  private generateFilename(url: string) {
    return url.replace(/https?:\/\//, "").replace(/\//g, "-") + ".md";
  }
  private async handleCrawlError(url: string, crawlId: number, error: any, depth: number) {
  const existingPage = await this.crawlDatabase.getPageByUrl(url);
  const retryCount = (existingPage?.retryCount || 0) + 1;

  await this.crawlDatabase.upsertPage({
    url,
    crawlId,
    error: error.message,
    retryCount,
    statusCode: error instanceof error.statusCode ? error.statusCode : 500,
    crawledAt: new Date()
  });

    if (retryCount <= MAX_RETRIES) {

this.crawlQueue.add([url],  depth);
  }

  return retryCount;
}

  /**
   * Records metric data for monitoring crawl performance.
   *
   * @param metric - Name of the metric to track
   * @param value - Numeric value of the metric
   *
   * @internal
   */
  private trackMetric(metric: string, value: number) {
    // Implement logic based on actual metrics
  }

  /**
   * Extracts all valid links from the current page.
   * Filters out SVG links and invalid URLs.
   *
   * @param page - Playwright Page object representing the current page
   * @returns Promise resolving to array of valid URLs found on the page
   *
   * @internal
   */
  private async extractLinks(page: Page) {
    const links = page.$$eval("a[href]", (anchors: HTMLAnchorElement[]) =>
      anchors.filter((a) => !a.closest("svg")).map((a) => a.href),
    );
    logger.info(`Extracted ${links} links`);
    return links;
  }

  /**
   * Fetches HTML content from a given URL and processes it according to configuration.
   *
   * @param page - Playwright Page object to use for fetching
   * @param config - Configuration object containing selector and timeout settings
   * @param crawlId - Unique identifier for the current crawl session
   *
   * @throws {Error} If page fetch fails or timeout occurs
   * @returns Promise resolving to the page's HTML content
   *
   * @internal
   */


  /**
   * Validates if a link should be included in the crawl.
   * Currently checks if the link starts with https://.
   *
   * @param link - URL to validate
   * @returns boolean indicating if the link is valid for crawling
   *
   * @internal
   */
  private isValidLink(link: string) {
    const valid = link.startsWith("https://")
    if (!valid) {
      logger.warn(`Invalid link: ${link}`);
    }
    logger.debug(`Link ${link} is ${valid ? "valid" : "invalid"}`);
    return valid;
  }
// Add to CrawlService class
private async extractAndFilterLinks(page: Page, baseUrl: string) {
  const links = await this.extractLinks(page);
  return links.filter(link => this.isValidLink(link) && link.startsWith(baseUrl));
}

private async finalizeCrawl(crawlId: number, successCount: number, errorCount: number, urlsRemaining:number) {
  await this.crawlDatabase.updateCrawlStatus(crawlId, "completed");
  await this.crawlDatabase.updateCrawlMetrics(crawlId, { successCount, errorCount });
  // Update status broadcast:
  this.statusService.broadcastStatus({
  status: "completed",
  urlsCrawled: successCount,
  urlsRemaining: urlsRemaining,
  failedPages: errorCount,
  errors: [],
  crawlId: crawlId
  });
}
private async cleanupOutputDirectory() {
  await this.contentStorage.cleanupOutputDirectory();
}
  /**
   * Implements rate limiting for web requests.
   * Ensures crawling doesn't exceed maxRequestsPerMinute (100 requests/minute).
   *
   * @remarks
   * If the request limit is reached, this method will pause execution for 60 seconds
   * before allowing more requests.
   *
   * @returns Promise that resolves when it's safe to make the next request
   *
   * @internal
   */
  private async throttleRequests() {
    this.requestCount++;
    logger.debug(`Request count: ${this.requestCount}`);
    if (this.requestCount >= this.maxRequestsPerMinute) {
      await new Promise((resolve) => setTimeout(resolve, 60000));
      this.requestCount = 0;
    }
  }

}
