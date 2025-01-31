import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/models/crawlModel.ts",
  dialect: "postgresql",

  dbCredentials: {
    url: process.env.POSTGRES_URL as string,
  },
});
