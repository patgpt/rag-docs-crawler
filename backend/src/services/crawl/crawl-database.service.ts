import { db } from "@/db";
import { crawls, type crawlsInsertSchema } from "@/models/crawl.model";

import { pages } from "@/models/pages.model";
import { eq } from "drizzle-orm";

export class CrawlDatabaseService {
  async createCrawlRecord(config: typeof crawlsInsertSchema.$type) {
    const [crawl] = await db
      .insert(crawls)
      .values(config)
      .returning({ id: crawls.id }); // ✅ Explicitly return the ID
    return crawl.id; // Returns the crawlId as a number
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
