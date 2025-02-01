import { db } from "@/db";
import { crawls, type crawlsInsertSchema } from "@/models/crawl.model";

import { pages } from "@/models/pages.model";
import type { crawlConfigSchema } from "@/schema/crawl";
import { eq } from "drizzle-orm";
import type { Static } from "elysia";

export class CrawlDatabaseService {
  async crawl(config: Static< typeof   crawlsInsertSchema.$type>) {
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
  return crawl.id;
}
}
