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
app
  .use(
    html({
      autoDetect: true,
      autoDoctype: true,
      contentType: "text/html",
      isHtml: () => true,
    }),
  )
  .post(
    "/",
    ({ body }) =>
      `<html lang="en">
            <head>
                <title>Hello World</title>
            </head>
            <body>
                <h1 safe>${body}</h1>
            </body>
        </html>`,
    {
      body: t.String(),
    },
  );
app
  .get("/", (html: any) =>
    html("<html><body><h2>Hello world!</h2></body></html>"),
  )
  .listen(3000);
console.log(
  `🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`,
);
