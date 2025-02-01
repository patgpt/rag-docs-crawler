// src/routes/crawl-routes.ts
import { Elysia, t } from "elysia";
import type { CrawlService } from "@/services/crawl/crawl.service";
import type { CrawlStatusService } from "@/services/crawl/crawl.status.service";

import type { ServerWebSocket } from "elysia/ws/bun";
import type { CrawlStatusWS } from "@/types/websocket";
import { crawlConfigSchema } from "@/schema/crawl";

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
            await crawlService.startCrawl(body);
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
        ws.send(message);
      },
      close(ws) {
        statusService.removeClient(ws.raw as ServerWebSocket<CrawlStatusWS>);
      },
    });
};
