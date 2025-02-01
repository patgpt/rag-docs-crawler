import { crawlRoutes } from "@/routes/crawl-routes";
import { ArchiverService } from "@/services/archive/archiver.service";
import { ContentConverterService } from "@/services/content/content-converter.service";
import { ContentStorageService } from "@/services/content/content-storage.service";
import { CrawlDatabaseService } from "@/services/crawl/crawl-database.service";
import { CrawlService } from "@/services/crawl/crawl.service";
import { CrawlStatusService } from "@/services/crawl/crawl.status.service";
import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { type Html, html, type HtmlOptions } from "@elysiajs/html";

import { db } from "@/db";
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
      await crawlDatabaseService.createCrawlRecord({
        baseUrl: "https://example.com",
        maxDepth: 3,
        maxPages: 100,
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
  )
  .listen(3000);
console.log(
  `🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`,
);
