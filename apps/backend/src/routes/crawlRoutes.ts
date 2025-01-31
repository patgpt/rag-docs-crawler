import type Elysia from "elysia";
import { startCrawlService, downloadMarkdownService, getStatusService } from "../services/crawlService";

export const crawlPlugin = (app: Elysia) =>
  app.group('/api', group =>
    group
      .post('/crawl', startCrawlService)
      .get('/download', downloadMarkdownService)
      .get('/status', getStatusService)
  )
