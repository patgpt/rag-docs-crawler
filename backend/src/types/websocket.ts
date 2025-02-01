import type { TSchema } from "elysia";
import type { TypeCheck } from "elysia/dist/type-system";
import type { ElysiaWS } from "elysia/dist/ws";

export type CrawlStatusWS = ElysiaWS<{
  id?: string | undefined;
  validator?: TypeCheck<TSchema> | undefined;
}>;
