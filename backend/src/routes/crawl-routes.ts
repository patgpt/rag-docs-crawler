// src/routes/crawl-routes.ts
import { Elysia } from "elysia";
import type { CrawlService } from "@/services/crawl/crawl.service";
import type { CrawlStatusService } from "@/services/crawl/crawl.status.service";
import { crawlConfigSchema } from "@/schema/crawl";
import type { ServerWebSocket } from "elysia/dist/ws/bun";
import type { CrawlStatusWS } from "@/types/websocket";

export const crawlRoutes = (
  crawlService: CrawlService,
  statusService: CrawlStatusService,
) => {
  return new Elysia()
    .group("/api", (group) =>
      group
        .post(
          "/crawl",
          async ({ body }) => {
            const validated = crawlConfigSchema.parse(body);
            await crawlService.startCrawl(validated);
            return { message: "Crawl started successfully" };
          },
          {
            body: crawlConfigSchema,
          },
        )
        .get("/download", () => "Download endpoint"),
    )
    .ws("/status", {
      open(ws) {
        ws;
        // Directly use Bun's WebSocket type via ws.raw
        statusService.addClient(ws.raw as ServerWebSocket<CrawlStatusWS>);
      },
      message(ws, message) {
        // Handle messages if needed
      },
      close(ws) {
        statusService.removeClient(ws.raw as ServerWebSocket<CrawlStatusWS>);
      },
    });
};
