CREATE TABLE "crawls" (
	"id" integer PRIMARY KEY NOT NULL,
	"base_url" text NOT NULL,
	"config" text NOT NULL,
	"status" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pages" (
	"id" integer PRIMARY KEY NOT NULL,
	"crawl_id" integer NOT NULL,
	"url" text NOT NULL,
	"content" text NOT NULL,
	"etag" text,
	"last_crawled_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "pages" ADD CONSTRAINT "pages_crawl_id_crawls_id_fk" FOREIGN KEY ("crawl_id") REFERENCES "public"."crawls"("id") ON DELETE cascade ON UPDATE no action;