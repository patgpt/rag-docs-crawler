import { crawlRoutes } from "@/routes/crawl-routes";
import { ArchiverService } from "@/services/archive/archiver.service";
import { ContentConverterService } from "@/services/content/content-converter.service";
import { ContentStorageService } from "@/services/content/content-storage.service";
import { CrawlDatabaseService } from "@/services/crawl/crawl-database.service";
import { CrawlService } from "@/services/crawl/crawl.service";
import { CrawlStatusService } from "@/services/crawl/crawl.status.service";
import { CrawlQueue } from "@/services/crawl/crawl-queue";
import { html } from "@elysiajs/html";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { crawlConfigSchema } from "@/schema/crawl";

// Initialize services
const crawlStatusService = new CrawlStatusService();
const crawlDatabaseService = new CrawlDatabaseService();
const contentConverterService = new ContentConverterService();
const contentStorageService = new ContentStorageService();
const archiverService = new ArchiverService();
const crawlQueue = new CrawlQueue(crawlConfigSchema.baseUrl, crawlConfigSchema.maxDepth);

const crawlService = new CrawlService(
  crawlDatabaseService,
  contentConverterService,
  contentStorageService,
  archiverService,
  crawlStatusService,
  crawlQueue: crawlQueue,
);

const app = new Elysia().use(swagger({ path: "/docs" }));
app.use(crawlRoutes(crawlService, crawlStatusService));
app.use(
  html({
    autoDetect: true,
    autoDoctype: true,
    contentType: "text/html",
    isHtml: () => true,
  }),
);

app
  .get(
    "/",
    async (html: any) =>
      await crawlDatabaseService.crawl({

        config: JSON.stringify({
          baseUrl: "https://example.com",
          maxDepth: 2,
          maxPages: 10,
          minDelay: 500,
          maxDelay: 2000,
          selector: "body",
          maxConcurrency: 5,
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
          requestTimeout: 5000,
          ignoreRobotsTxt: false,
          contentTypes: ["text/html", "text/plain"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),

        metrics: {
          pagesCrawled: 10,
          pagesFailed: 0,
          avgLatency: 1000,
          bandwidthUsage: 1000,
        },

        status: "completed",
        id: Math.floor(Math.random() * 1000),
      }),
  )
  .listen(3000);
console.log(
  `🦊 Server is running at http://${app.server?.hostname}:${app.server?.port}`,
);
