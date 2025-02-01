import { chromium, type Page } from "playwright";
import { logger } from "../../utils/logger";

import { CrawlDatabaseService } from "./crawl-database.service";
import { ContentConverterService } from "../content/content-converter.service";
import { ContentStorageService } from "../content/content-storage.service";
import { ArchiverService } from "../archive/archiver.service";
import type { CrawlStatusService } from "@/services/crawl/crawl.status.service";
import type { CrawlConfig } from "@/schema/crawl";
import type { crawls } from "@/models/crawl.model";

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

  async startCrawl(config: CrawlConfig) {
    const crawlId = await this.crawlDatabase.createCrawlRecord(config);
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      let crawledPages = new Set<string>();
      let pagesToCrawl = [config.baseUrl];
      while (pagesToCrawl.length > 0 && crawledPages.size < config.maxPages) {
        const url = pagesToCrawl.pop()!;

        if (crawledPages.has(url)) continue;

        await this.throttleRequests();
        const content = await this.fetchPageContent(page, url);
        let markdown: string = "";
        try {
          markdown = this.contentConverter.convertToMarkdown(content);
        } catch (error) {
          logger.error(`Content conversion failed for ${url}`, error);
          // Track failed conversions in DB
        }

        await this.contentStorage.saveContent(url, markdown);
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
  private trackMetric(metric: keyof typeof crawls.metrics, value: number) {
    // Update DB metrics column
  }
  private async extractLinks(page: Page) {
    return page.$$eval("a[href]", (anchors: HTMLAnchorElement[]) =>
      anchors.filter((a) => !a.closest("svg")).map((a) => a.href),
    );
  }

  private async fetchPageContent(page: any, url: string) {
    try {
      await page.goto(url);
      return await page.content();
    } catch (error) {
      logger.error(`Failed to fetch ${url}:`, error);
      throw error;
    }
  }

  private isValidLink(link: string, config: CrawlConfig) {
    return link.startsWith(config.baseUrl);
  }

  private async throttleRequests() {
    this.requestCount++;
    if (this.requestCount >= this.maxRequestsPerMinute) {
      await new Promise((resolve) => setTimeout(resolve, 60000));
      this.requestCount = 0;
    }
  }
}
