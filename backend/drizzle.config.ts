import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/schema/crawl.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "sqlite.db",
  },
});
