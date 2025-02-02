import { db } from "@/db";
import { crawls, type crawlsInsertSchema } from "@/models/crawl.model";

import { pages, type pagesInsertSchema } from "@/models/pages.model";
import type { crawlConfigSchema } from "@/schema/crawl";
import { CrawlStatusService } from "@/services/crawl/crawl.status.service";
import { logger } from "@/utils/logger";
import { eq } from "drizzle-orm";
import { type Static } from "elysia";

export class CrawlDatabaseService {
  private crawlStatusService: CrawlStatusService;

  constructor() {
    this.crawlStatusService = new CrawlStatusService();
  }

  async crawl(config: Static<typeof crawlsInsertSchema>) {
    const [crawl] = await db
      .insert(crawls)
      .values(config)
      .returning({ id: crawls.id }); // ✅ Explicitly return the ID
    return crawl.id; // Returns the crawlId as a number
  }

  async getPagesToCrawl(crawlId: number) {
    const result = await db
      .select()
      .from(pages)
      .where(eq(pages.crawlId, crawlId))
      .execute();
    logger.info(`Pages to crawl: ${result.length}`);
    return result;
  }

  async updateCrawlStatus(crawlId: number, status: string) {
    try {
      const result = await db
        .update(crawls)
        .set({ status })
        .where(eq(crawls.id, crawlId))
        .execute();
      logger.info(`Crawl status updated in db: ${result}`);
      return result;
    } catch (error) {
      logger.error(`Failed to update crawl status: ${error}`);
    }
  }
  // TODO: Implement the updateCrawlMetrics method
  async updateCrawlMetrics(crawlId: number, metrics: Record<string, number>) {
    // const result = await db
    //   .update(crawls)
    //   .set({ metrics: JSON.stringify(metrics) })
    //   .where(eq(crawls.id, crawlId))
    //   .execute();
    // logger.info(`Crawl metrics updated: ${result}`);
    // return result;
  }

  async updatePageContent(pageId: number, content: string, etag: string) {
    const result = await db
      .update(pages)
      .set({ content, etag, lastCrawledAt: new Date() })
      .where(eq(pages.id, pageId))
      .execute();
    logger.info(`Page content updated: ${result}`);
    return result;
  }
  async createCrawlRecord(config: Static<typeof crawlConfigSchema>) {
    try {
      logger.info("Creating new crawl record", {
        config: JSON.stringify(config),
      });

      const [crawl] = await db
        .insert(crawls)
        .values({
          config: JSON.stringify(config),
          status: "running",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning({ id: crawls.id });

      logger.info("Crawl record created successfully", { crawlId: crawl.id });

      try {
        await this.crawlStatusService.broadcastStatus({
          status: "running",
          urlsCrawled: 0,
          urlsRemaining: 0,
          failedPages: 0,
          errors: [],
          crawlId: crawl.id,
        });
      } catch (broadcastError) {
        logger.error("Failed to broadcast crawl status", {
          error: broadcastError,
        });
      }

      return crawl.id;
    } catch (error) {
      logger.error("Failed to create crawl record", { error });
      throw error;
    }
  }
  // Add to CrawlDatabaseService class
  async upsertPage(pageData: Static<typeof pagesInsertSchema>) {
    try {
      logger.info("Upserting page data", { url: pageData.url });

      const existing = await db
        .select()
        .from(pages)
        .where(eq(pages.url, pageData.url!))
        .execute();

      let result;
      if (existing.length > 0) {
        logger.debug("Updating existing page", { pageId: existing[0].id });
        result = await db
          .update(pages)
          .set(pageData)
          .where(eq(pages.id, existing[0].id))
          .execute();
      } else {
        logger.debug("Inserting new page");
        result = await db.insert(pages).values(pageData).execute();
      }

      try {
        this.crawlStatusService.broadcastStatus({
          status: "running",
          urlsCrawled: 0,
          urlsRemaining: 1,
          failedPages: 0,
          errors: [],
          crawlId: pageData.crawlId,
        });
      } catch (broadcastError) {
        logger.error("Failed to broadcast page status", {
          error: broadcastError,
        });
      }

      return result;
    } catch (error) {
      logger.error("Failed to upsert page", { error, pageData });
      throw error;
    }
  }

  async getPageByUrl(url: string) {
    try {
      logger.info("Fetching page by URL", { url });

      const result = await db
        .select()
        .from(pages)
        .where(eq(pages.url, url))
        .execute();

      logger.debug("Page fetch result", { found: result.length > 0 });
      return result[0];
    } catch (error) {
      logger.error("Failed to fetch page by URL", { error, url });
      throw error;
    }
  }
}
