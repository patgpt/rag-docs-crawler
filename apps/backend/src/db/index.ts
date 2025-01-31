import { drizzle } from 'drizzle-orm/vercel-postgres';

import { crawls, pages } from './schema';
import { sql } from 'drizzle-orm';

const db = drizzle(sql);

export { db, crawls, pages };