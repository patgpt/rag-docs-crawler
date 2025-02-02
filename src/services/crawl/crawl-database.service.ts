import { db } from "@/db";
import { crawls, type crawlsInsertSchema } from "@/models/crawl.model";

import { pages, type pagesInsertSchema } from "@/models/pages.model";
import type { crawlConfigSchema } from "@/schema/crawl";
import { logger } from "@/utils/logger";
import { eq } from "drizzle-orm";
import type { Static } from "elysia";

export class CrawlDatabaseService {
  async crawl(config: Static< typeof   crawlsInsertSchema>) {
    const [crawl] = await db
      .insert(crawls)
      .values(config)
      .returning({ id: crawls.id }); // ✅ Explicitly return the ID
    return crawl.id; // Returns the crawlId as a number
  }

  async getPagesToCrawl(crawlId: number) {
    const result = await db.select().from(pages).where(eq(pages.crawlId, crawlId)).execute();
    logger.info(`Pages to crawl: ${result.length}`);
    return result;
  }

  async updateCrawlStatus(crawlId: number, status: string) {
    const result = await db
      .update(crawls)
      .set({ status })
      .where(eq(crawls.id, crawlId))
      .execute();
    logger.info(`Crawl status updated: ${result}`);
    return result;
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
  const [crawl] = await db
    .insert(crawls)
    .values({
      config: JSON.stringify(config), // ✅ Serialize to JSON
      status: "running",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning({ id: crawls.id });
    logger.info(`Crawl record created: ${crawl.id}`);
  return crawl.id;
  }
  // Add to CrawlDatabaseService class
async upsertPage(pageData: Static<typeof pagesInsertSchema>) {
  const existing = await db.select()
    .from(pages)
    .where(eq(pages.url, pageData.url!))
    .execute();

  if (existing.length > 0) {
    return db.update(pages)
      .set(pageData)
      .where(eq(pages.id, existing[0].id))
      .execute();
  }
  return db.insert(pages).values(pageData).execute();
}

async getPageByUrl(url: string) {
  const result = await db.select()
    .from(pages)
    .where(eq(pages.url, url))
    .execute();
  return result[0];
}


}
