// src/schemas/crawl.ts
import { Elysia, t } from "elysia";

export const crawlConfigSchema = t
  .Object({
    baseUrl: t.String({ format: "uri" }),
    maxDepth: t.Optional(t.Number({ minimum: 1, default: 3 })),
    maxPages: t.Optional(t.Number({ minimum: 1, default: 100 })),
    minDelay: t.Optional(t.Number({ minimum: 0, default: 500 })), // ms
    maxDelay: t.Optional(t.Number({ minimum: 0, default: 2000 })), // ms
    selector: t.Optional(t.String({ default: "body" })),
    maxConcurrency: t.Optional(t.Number({ minimum: 1, default: 5 })),
    userAgent: t.Optional(
      t.String({
        default: "Mozilla/5.0 (compatible; MyCrawler/1.0)",
      }),
    ),
    requestTimeout: t.Optional(t.Number({ minimum: 100, default: 5000 })),
    ignoreRobotsTxt: t.Optional(t.Boolean({ default: false })),
    contentTypes: t.Optional(
      t.Array(t.String(), {
        default: ["text/html", "text/plain"],
      }),
    ),
  })

  .check((value: { minDelay?: number; maxDelay?: number }) => {
    if (value.minDelay && value.maxDelay && value.minDelay > value.maxDelay) {
      throw new Error("minDelay must be less than or equal to maxDelay");
    }
    return true;
  });

export type CrawlConfig = typeof crawlConfigSchema.static;
