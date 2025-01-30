// src/types.ts
import { z } from 'zod';

export const crawlSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL.' }),
});

export type CrawlInput = z.infer<typeof crawlSchema>;