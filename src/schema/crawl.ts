import { t } from "elysia";

// Define a schema for the crawl configurations

export const crawlConfigSchema = t.Object({
  baseUrl: t.String({ format: "uri", pattern: "^https?://" }),
  maxDepth: t.Number({ minimum: 1, default: 3 }),
  maxPages: t.Number({ minimum: 1, default: 100 }),
  minDelay: t.Number({ minimum: 0, default: 500 }), // ms
  maxDelay: t.Number({ minimum: 0, default: 2000 }), // ms
  selector: t.String({ default: "main" }),
  maxConcurrency: t.Optional(t.Number({ minimum: 1, default: 5 })),
  userAgent: t.String({
    default:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  }),
  requestTimeout: t.Number({ minimum: 100, default: 5000 }),
  ignoreRobotsTxt: t.Boolean({ default: false }),
  contentTypes: t.Array(t.String(), {
    default: ["text/html", "text/plain"],
  }),
  // Optional fields to filter URLs based on text:
  includeText: t.Optional(t.Array(t.String(), { default: [] })),
  excludeText: t.Optional(t.Array(t.String(), { default: [] })),
});

export const table = {
  crawlConfigSchema,
} as const;

export type Table = typeof table;
