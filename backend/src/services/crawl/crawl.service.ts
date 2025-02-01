import { chromium, type Page } from "playwright";
import { logger } from "../../utils/logger";

import { crawlConfigSchema } from "@/schema/crawl";
import type { Static } from "elysia";

import type { CrawlStatusService } from "@/services/crawl/crawl.status.service";
import { ArchiverService } from "../archive/archiver.service";
import { ContentConverterService } from "../content/content-converter.service";
import { ContentStorageService } from "../content/content-storage.service";
import { CrawlDatabaseService } from "./crawl-database.service";

/**
 * Service responsible for crawling web pages and converting them to markdown content.
 * Manages the crawling process, content conversion, storage, and status updates.
 */
export class CrawlService {
  private requestCount = 0;
  private readonly maxRequestsPerMinute = 100;

  /**
   * Creates an instance of CrawlService.
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
  ) {}

  /**
   * Initiates a web crawling process based on the provided configuration.
   * @param config - Crawl configuration containing baseUrl and other settings
   * @throws Error if unable to launch browser or access pages
   * @returns Promise that resolves when crawling is complete
   */
  async startCrawl(config: Static<typeof crawlConfigSchema>) {
    const crawlId = await this.crawlDatabase.createCrawlRecord(config);
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      let crawledPages = new Set<string>();
      let pagesToCrawl = [config.baseUrl];

      while (pagesToCrawl.length > 0) {
        const url = pagesToCrawl.pop()!;

        await this.throttleRequests();
        const content = await this.fetchPageContent(page, url);
        let markdown: string = "";
        try {
          markdown = this.contentConverter.convertToMarkdown(content);
        } catch (error) {
          logger.error(`Content conversion failed for ${url}`, error);
          // Track failed conversions in DB
        }

        this.contentStorage.saveContent(url, markdown);
        crawledPages.add(url);

        const links = await this.extractLinks(page);
        pagesToCrawl = [...new Set([...pagesToCrawl, ...links])].filter(
          (link) => this.isValidLink(link, config),
        );

        this.statusService.broadcastStatus({
          status: "running",
          urlsCrawled: crawledPages.size,
          urlsRemaining: pagesToCrawl.length,
          errors: [],
        });
      }

      await this.archiver.createArchive(
        this.contentStorage.getOutputDirectory(),
        "crawl-results.zip",
      );

      this.statusService.broadcastStatus({
        status: "completed",
        urlsCrawled: crawledPages.size,
        urlsRemaining: 0,
        errors: [],
      });
    } finally {
      await browser.close();
    }
  }

  /**
   * Records metric data for monitoring crawl performance.
   * @param metric - Name of the metric to track
   * @param value - Numeric value of the metric
   * @private
   */
  private trackMetric(metric: string, value: number) {
    // Implement logic based on actual metrics
  }

  /**
   * Extracts all valid links from the current page.
   * @param page - Playwright Page object representing the current page
   * @returns Promise resolving to array of extracted URLs
   * @private
   */
  private async extractLinks(page: Page) {
    return page.$$eval("a[href]", (anchors: HTMLAnchorElement[]) =>
      anchors.filter((a) => !a.closest("svg")).map((a) => a.href),
    );
  }

  /**
   * Fetches HTML content from a given URL.
   * @param page - Playwright Page object to use for fetching
   * @param url - URL to fetch content from
   * @returns Promise resolving to the page's HTML content
   * @throws Error if unable to fetch or parse page content
   * @private
   */
  private async fetchPageContent(page: any, url: string) {
    try {
      await page.goto(url);
      return await page.content();
    } catch (error) {
      logger.error(`Failed to fetch ${url}:`, error);
      throw error;
    }
  }

  /**
   * Validates if a link should be included in the crawl.
   * @param link - URL to validate
   * @param config - Crawl configuration containing baseUrl
   * @returns boolean indicating if the link is valid for crawling
   * @private
   */
  private isValidLink(link: string, config: Static<typeof crawlConfigSchema>) {
    return link.startsWith(config.baseUrl);
  }

  /**
   * Implements rate limiting for web requests.
   * Ensures crawling doesn't exceed maxRequestsPerMinute.
   * @returns Promise that resolves when it's safe to make the next request
   * @private
   */
  private async throttleRequests() {
    this.requestCount++;
    if (this.requestCount >= this.maxRequestsPerMinute) {
      await new Promise((resolve) => setTimeout(resolve, 60000));
      this.requestCount = 0;
    }
  }
}
