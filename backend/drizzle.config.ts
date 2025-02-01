import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "src/models/crawl-model.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "db.sqlite",
  },
});
