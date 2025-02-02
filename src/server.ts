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

const app = new Elysia({
  name: "Crawl API",
  detail: {
    description: "An API for crawling and archiving web pages",
  },
  serve: {
    hostname: "localhost",
    port: 3000,
  },
}).use(
  swagger({
    path: "/docs",
    documentation: {
      info: {
        title: "Crawl API",
        description: "An API for crawling and archiving web pages",
        version: "1.0.0",
      },
    },
  }),
);

app.use(crawlRoutes(crawlService, crawlStatusService));
app.use(
  html({
    autoDetect: true,
    autoDoctype: true,
    contentType: "text/html",
    isHtml: () => true,
  }),
);
app.state("Theme", {
  dark: false,
  light: true,
});

app
  .get(
    "/",
    async (Html) =>
      `
        <Html>
          <head>
            <title>Crawl API</title>
          </head>
          <body>
            <h1>Crawl API</h1>
            <p>Welcome to the Crawl API. Check out the <a href="/docs">API documentation</a> for more details.</p>
          </body>
        </Html>
      `,
  )
  .listen(3000);

console.log(
  `🦊 Server is running at http://${app.server?.hostname}:${app.server?.port}`,
);
