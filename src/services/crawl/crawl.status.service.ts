// src/services/crawl/crawl-status.service.ts
import type { CrawlStatus, CrawlStatusWS } from "@/types/types";

import { logger } from "@/utils/logger";
import type { ServerWebSocket } from "elysia/ws/bun";

export class CrawlStatusService {
  private clients = new Set<ServerWebSocket<CrawlStatusWS>>();

  addClient(client: ServerWebSocket<CrawlStatusWS>) {
    logger.info("Client connected", { id: client });
    this.clients.add(client);
  }

  removeClient(client: ServerWebSocket<CrawlStatusWS>) {
    logger.info("Client disconnected", { id: client });
    this.clients.delete(client);
  }

  broadcastStatus(status: CrawlStatus) {
    for (const client of this.clients) {
      if (client.readyState === 1) {
        logger.info("Broadcasting status", { status });
        client.send(JSON.stringify(status));
      }
    }
  }
}
