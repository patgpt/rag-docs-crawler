// packages/shared/src/crawlSchema.ts
import { z } from 'zod';

export const crawlSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL.' }),
});

export type CrawlFormData = z.infer<typeof crawlSchema>;