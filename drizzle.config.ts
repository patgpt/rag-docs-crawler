import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: ["./src/models/crawl.model.ts", "./src/models/pages.model.ts"],
  dialect: "sqlite",
  dbCredentials: {
    url: "sqlite.db",
  },
});
