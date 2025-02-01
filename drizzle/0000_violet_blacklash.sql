CREATE TABLE `crawls` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`config` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`metrics` text
);
--> statement-breakpoint
CREATE TABLE `pages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`crawl_id` integer NOT NULL,
	`url` text NOT NULL,
	`content` text,
	`etag` text,
	`selector_content` text,
	`status_code` integer,
	`error` text,
	`last_crawled_at` integer,
	`headers` text,
	`latency` integer,
	`retry_count` integer DEFAULT 0,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`crawl_id`) REFERENCES `crawls`(`id`) ON UPDATE no action ON DELETE no action
);
