import { crawlRoutes } from "@/routes/crawl-routes";
import { ArchiverService } from "@/services/archive/archiver.service";
import { ContentConverterService } from "@/services/content/content-converter.service";
import { ContentStorageService } from "@/services/content/content-storage.service";
import { CrawlDatabaseService } from "@/services/crawl/crawl-database.service";
import { CrawlService } from "@/services/crawl/crawl.service";
import { CrawlStatusService } from "@/services/crawl/crawl.status.service";
import { html } from "@elysiajs/html";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

// Initialize services
const crawlStatusService = new CrawlStatusService();
const crawlDatabaseService = new CrawlDatabaseService();
const contentConverterService = new ContentConverterService();
const contentStorageService = new ContentStorageService();
const archiverService = new ArchiverService();

const crawlService = new CrawlService(
  crawlDatabaseService,
  contentConverterService,
  contentStorageService,
  archiverService,
  crawlStatusService,
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

        config: {
          maxDepth: 2, maxPages: 10, userAgent: "ElysiaBot", delay: 1000, maxConcurrency: 5

        },
        createdAt: new Date(),
        updatedAt: new Date(),

        error: "error",
        metrics: {
          pagesCrawled: 10,
          pagesFailed: 0,
          avgLatency: 1000,
          bandwidthUsage: 1000,
        },

        status: "completed",
        id: 1,
      }),
  )
  .listen(3000);
console.log(
  `🦊 Server is running at http://${app.server?.hostname}:${app.server?.port}`,
);
