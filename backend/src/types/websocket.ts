import type { TSchema } from "elysia";
import type { TypeCheck } from "elysia/type-system";
import type { ServerWebSocket } from "elysia/ws/bun";


export type CrawlStatusWS = ServerWebSocket<{
  id?: string | undefined;
  validator?: TypeCheck<TSchema> | undefined;
}>;
