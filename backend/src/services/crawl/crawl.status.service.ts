// src/services/crawl/crawl-status.service.ts
import type { CrawlStatus } from "@/types/crawl-status";
import type { CrawlStatusWS } from "@/types/websocket";
import type { ServerWebSocket } from "elysia/dist/ws/bun";

export class CrawlStatusService {
  private clients = new Set<ServerWebSocket<CrawlStatusWS>>();

  addClient(client: ServerWebSocket<CrawlStatusWS>) {
    this.clients.add(client);
  }

  removeClient(client: ServerWebSocket<CrawlStatusWS>) {
    this.clients.delete(client);
  }

  broadcastStatus(status: CrawlStatus) {
    for (const client of this.clients) {
      if (client.readyState === 1) {
        client.send(JSON.stringify(status));
      }
    }
  }
}
