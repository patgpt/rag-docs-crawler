import { crawlConfigSchema } from "@/schema/crawl";
import { CrawlQueue } from "@/services/crawl/crawl-queue";
import type { CrawlStatusService } from "@/services/crawl/crawl.status.service";
import type { PageError, PageResult } from "@/types/types";
import { type Static } from "elysia";
import { chromium, type Page } from "playwright";
import { logger } from "../../utils/logger";
import { ArchiverService } from "../archive/archiver.service";
import { ContentConverterService } from "../content/content-converter.service";
import { ContentStorageService } from "../content/content-storage.service";
import { CrawlDatabaseService } from "./crawl-database.service";

const MAX_RETRIES = 3;
interface IExtractAndFilterLinksParams {
  extractAndFilterLinks(): Promise<string[]>;
}
export class CrawlService {
  private requestCount = 0;
  private readonly maxRequestsPerMinute = 100;

  constructor(
    private readonly crawlDatabase: CrawlDatabaseService,
    private readonly contentConverter: ContentConverterService,
    private readonly contentStorage: ContentStorageService,
    private readonly archiver: ArchiverService,
    private readonly statusService: CrawlStatusService,
  ) {}

  async startCrawl({
    config,
  }: {
    config: Static<typeof crawlConfigSchema>;
  }): Promise<void> {
    let browser;
    try {
      logger.info("Starting new crawl operation", { config });
      const crawlId = await this.crawlDatabase.createCrawlRecord(config);
      logger.info("Crawl record created", { crawlId });

      browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      const queue = new CrawlQueue(config.baseUrl, config.maxDepth);

      logger.info("Browser and queue initialized", { baseUrl: config.baseUrl });

      const crawledPages = new Map<string, PageResult>();
      const failedPages: PageError[] = [];

      while (!queue.isEmpty()) {
        const nextItem = queue.next();
        if (!nextItem) break;
        const { url, depth } = nextItem;
        logger.info("Processing URL", { url, depth });

        if (crawledPages.has(url)) {
          logger.debug("Skipping already processed URL", { url });
          continue;
        }

        await this.processUrl({
          page,
          url,
          depth,
          config,
          crawlId,
          queue,
          crawledPages,
          failedPages,
        });
      }

      const successCount = [...crawledPages.values()].filter(
        (p) => p.status === "success",
      ).length;
      const errorCount = [...crawledPages.values()].filter(
        (p) => p.status === "failed",
      ).length;
      await this.finalizeCrawl({
        crawlId,
        successCount,
        errorCount,
        urlsRemaining: queue.size(),
      });
    } catch (error) {
      logger.error("Critical error in crawl operation", { error });
      throw error;
    } finally {
      try {
        if (browser) {
          logger.info("Closing browser");
          await browser.close();
        }
        await this.cleanupOutputDirectory({ config });
      } catch (error) {
        logger.error("Error during cleanup", { error });
      }
    }
  }

  private async processUrl({
    page,
    url,
    depth,
    config,
    crawlId,
    queue,
    crawledPages,
    failedPages,
  }: {
    page: Page;
    url: string;
    depth: number;
    config: Static<typeof crawlConfigSchema>;
    crawlId: number;
    queue: CrawlQueue;
    crawledPages: Map<string, PageResult>;
    failedPages: PageError[];
  }): Promise<void> {
    try {
      logger.info("Navigating to page", { url });
      await page.goto(url, {
        waitUntil: "networkidle",
        timeout: config.requestTimeout,
      });

      // Log the current URL after navigation to debug hash behavior.
      const navigatedUrl = page.url();
      logger.debug("Navigated URL", { navigatedUrl });

      // If the URL includes a hash and the expected selector isn't visible, wait and then reload.
      if (url.includes("#")) {
        try {
          // Wait a bit to let client-side routing update the DOM.
          await page.waitForSelector(config.selector, { timeout: 2000 });
        } catch (e) {
          logger.info(
            "Content selector not found promptly for hash URL, forcing reload",
            { url },
          );
          await page.reload({
            waitUntil: "networkidle",
            timeout: config.requestTimeout,
          });
        }
      }

      await this.throttleRequests();

      const contentObj = await this.getPageContent({ page, config });
      logger.info("Content fetched successfully", {
        url,
        contentLength: contentObj.content.length,
      });

      const links = await this.extractAndFilterLinks({
        page,
        baseUrl: config.baseUrl,
        queue,
        crawledPages,
        config,
      });
      logger.info("Links extracted", { url, linkCount: links.length });

      const markdown = this.contentConverter.convertToMarkdown(
        contentObj.content,
      );
      const filename = this.generateFilename({ url: contentObj.title });
      await this.contentStorage.saveContent({
        url: filename,
        content: markdown,
      });
      logger.info("Content saved", { filename });

      await this.crawlDatabase.upsertPage({
        url,
        crawlId,
        content: contentObj.content,
        statusCode: 200,
        crawledAt: new Date(),
      });

      queue.add(links, depth + 1);
      crawledPages.set(url, { url, depth, status: "success" });
    } catch (error: any) {
      logger.error("Error processing URL", { url, error: error.message });
      const retryCount = await this.handleCrawlError({
        url,
        crawlId,
        error,
        depth,
        queue,
      });
    }
    try {
      logger.info("Navigating to page", { url });
      await page.goto(url, {
        waitUntil: "networkidle",
        timeout: config.requestTimeout,
      });

      // Log the current URL after navigation to debug hash behavior.
      const navigatedUrl = page.url();
      logger.debug("Navigated URL", { navigatedUrl });

      // If the URL includes a hash and the expected selector isn't visible, wait and then reload.
      if (url.includes("#")) {
        try {
          // Wait a bit to let client-side routing update the DOM.
          await page.waitForSelector(config.selector, { timeout: 2000 });
        } catch (e) {
          logger.info(
            "Content selector not found promptly for hash URL, forcing reload",
            { url },
          );
          await page.reload({
            waitUntil: "networkidle",
            timeout: config.requestTimeout,
          });
        }
      }

      await this.throttleRequests();

      const contentObj = await this.getPageContent({ page, config });
      logger.info("Content fetched successfully", {
        url,
        contentLength: contentObj.content.length,
      });

      const links = await this.extractAndFilterLinks({
        page,
        baseUrl: config.baseUrl,
        queue,
        crawledPages,
        config,
      });
      logger.info("Links extracted", { url, linkCount: links.length });

      const markdown = this.contentConverter.convertToMarkdown(
        contentObj.content,
      );
      const filename = this.generateFilename({ url: contentObj.title });
      this.contentStorage.saveContent({ url: filename, content: markdown });
      logger.info("Content saved", { filename });

      await this.crawlDatabase.upsertPage({
        url,
        crawlId,
        content: contentObj.content,
        statusCode: 200,
        crawledAt: new Date(),
      });

      queue.add(links, depth + 1);
      crawledPages.set(url, { url, depth, status: "success" });
    } catch (error: any) {
      logger.error("Error processing URL", { url, error: error.message });
      const retryCount = await this.handleCrawlError({
        url,
        crawlId,
        error,
        depth,
        queue,
      });
      failedPages.push({
        url,
        error: error instanceof Error ? error.message : "Unknown error",
        retryCount,
        timestamp: new Date(),
      });
      crawledPages.set(url, { url, depth, status: "failed" });
    }
  }

  private async getPageContent({
    page,
    config,
  }: {
    page: Page;
    config: Static<typeof crawlConfigSchema>;
  }): Promise<{ content: string; title: string }> {
    try {
      logger.info("Waiting for content selector", {
        selector: config.selector,
      });
      await page.waitForSelector(config.selector, {
        timeout: config.requestTimeout,
      });

      const element = await page.$(config.selector);
      const content = element
        ? await element.innerHTML()
        : await page.content();

      if (!content) {
        throw new Error("Content not found");
      }
      const url = new URL(page.url());
      const title = url.href + url.hash;

      logger.info("Content extracted successfully", {
        title,
        contentLength: content.length,
      });
      return { content, title };
    } catch (error) {
      logger.error("Failed to get page content", { error });
      throw error;
    }
  }

  private generateFilename({ url }: { url: string }): string {
    return url.replace(/https?:\/\//, "").replace(/\//g, "-") + ".md";
  }

  private async handleCrawlError({
    url,
    crawlId,
    error,
    depth,
    queue,
  }: {
    url: string;
    crawlId: number;
    error: any;
    depth: number;
    queue: CrawlQueue;
  }): Promise<number> {
    const existingPage = await this.crawlDatabase.getPageByUrl(url);
    const retryCount = (existingPage?.retryCount || 0) + 1;

    await this.crawlDatabase.upsertPage({
      url,
      crawlId,
      error: error.message,
      retryCount,
      statusCode: typeof error.statusCode === "number" ? error.statusCode : 500,
      crawledAt: new Date(),
    });

    if (retryCount <= MAX_RETRIES) {
      // Re-add the URL to the queue for a retry.
      queue.add([url], depth);
    }
    return retryCount;
  }

  private async extractLinks({ page }: { page: Page }): Promise<string[]> {
    const links = await page.$$eval("a[href]", (anchors: HTMLAnchorElement[]) =>
      anchors.filter((a) => !a.closest("svg")).map((a) => a.href),
    );
    logger.info(`Extracted ${links.length} links`);
    return links;
  }

  private isValidLink({ link }: { link: string }): boolean {
    const valid = link.startsWith("https://");
    if (!valid) {
      logger.warn(`Invalid link: ${link}`);
    }
    logger.debug(`Link ${link} is ${valid ? "valid" : "invalid"}`);
    return valid;
  }

  private async extractAndFilterLinks({
    page,
    baseUrl,
    queue,
    crawledPages,
    config,
  }: {
    page: Page;
    baseUrl: string;
    queue: CrawlQueue;
    crawledPages: Map<string, PageResult>;
    config: Static<typeof crawlConfigSchema>;
  }): Promise<string[]> {
    const links = await this.extractLinks({ page });
    const currentPageUrl = page.url();

    return links.filter((link) => {
      // Already in queue or processed, or is the current page.
      if (
        queue.has(link) ||
        crawledPages.has(link) ||
        link === currentPageUrl
      ) {
        return false;
      }
      if (!this.isValidLink({ link }) || !link.startsWith(baseUrl)) {
        return false;
      }
      // Exclude URLs containing any text in excludeText (if provided)
      if (config.excludeText && config.excludeText.length > 0) {
        for (const word of config.excludeText) {
          if (link.includes(word)) {
            return false;
          }
        }
      }
      // If includeText is provided and non-empty, only allow URLs that include at least one word.
      if (config.includeText && config.includeText.length > 0) {
        let found = false;
        for (const word of config.includeText) {
          if (link.includes(word)) {
            found = true;
            break;
          }
        }
        if (!found) return false;
      }
      return true;
    });
  }

  private async finalizeCrawl({
    crawlId,
    successCount,
    errorCount,
    urlsRemaining,
  }: {
    crawlId: number;
    successCount: number;
    errorCount: number;
    urlsRemaining: number;
  }): Promise<void> {
    await this.crawlDatabase.updateCrawlStatus(crawlId, "completed");
    await this.crawlDatabase.updateCrawlMetrics(crawlId, {
      successCount,
      errorCount,
    });
    this.statusService.broadcastStatus({
      status: "completed",
      urlsCrawled: successCount,
      urlsRemaining,
      failedPages: errorCount,
      errors: [errorCount > 0 ? "Some pages failed to load" : ""],
      crawlId,
    });
  }

  private async cleanupOutputDirectory({
    config,
  }: {
    config: Static<typeof crawlConfigSchema>;
  }): Promise<void> {
    const zip = await this.archiver.createArchive(
      "../../",
      `crawl-${config.baseUrl.toLowerCase().toString()}.zip`,
    );
    logger.info("Archive created", { zip });
    try {
      await this.contentStorage.cleanupOutputDirectory();
    } catch (error) {
      logger.error("Error during output directory cleanup", { error });
    }
  }

  private async throttleRequests(): Promise<void> {
    this.requestCount++;
    logger.debug("Request counter incremented", { count: this.requestCount });
    if (this.requestCount >= this.maxRequestsPerMinute) {
      logger.info("Rate limit reached, pausing requests", {
        maxRequests: this.maxRequestsPerMinute,
      });
      await new Promise((resolve) => setTimeout(resolve, 60000));
      this.requestCount = 0;
      logger.info("Request counter reset after pause");
    }
  }
}
