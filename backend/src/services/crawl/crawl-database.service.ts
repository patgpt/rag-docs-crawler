import { crawls, pages } from "@/models/crawl.model";
import { db } from "../../db";

import { eq } from "drizzle-orm";
import type { CrawlConfig } from "@/schema/crawl";

export class CrawlDatabaseService {
  async createCrawlRecord(config: CrawlConfig) {
    const [crawl] = await db
      .insert(crawls)
      .values({
        baseUrl: config.baseUrl,
        config: config,
        status: "running",
      })
      .returning();
    return crawl.id;
  }

  async getPagesToCrawl(crawlId: number) {
    return db.select().from(pages).where(eq(pages.crawlId, crawlId)).execute();
  }

  async updatePageContent(pageId: number, content: string, etag: string) {
    return db
      .update(pages)
      .set({ content, etag, lastCrawledAt: new Date() })
      .where(eq(pages.id, pageId))
      .execute();
  }
}
