import type { TSchema } from "elysia";
import type { TypeCheck } from "elysia/type-system";
import type { ServerWebSocket } from "elysia/ws/bun";


export type CrawlStatusWS = ServerWebSocket<{
  id?: string | undefined;
  validator?: TypeCheck<TSchema> | undefined;
}>;

export type CrawlStatus = {
  status: "running" | "completed" | "error";
  urlsCrawled: number;
  urlsRemaining: number;
  failedPages: number;
  errors: string[];
  crawlId: number;
};
export interface PageResult {
  url: string;
  depth: number;
  status: 'success' | 'failed';
  retries?: number;
  content?: string;
  error?: string;
}

export interface PageError {
  url: string;
  error: any;
  retryCount: number;
  timestamp: Date;
}