import { crawls, type crawlsInsertSchema } from "@/models/crawl.model";
import { db } from "../../db";

import { eq, type Table } from "drizzle-orm";
import type { createInsertSchema } from "drizzle-typebox";
import { pages } from "@/models/pages.model";

export class CrawlDatabaseService {
  async createCrawlRecord(config: typeof crawlsInsertSchema.$type) {
    const crawl = await db.insert(crawls).values(config).execute();

    return crawl;
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
