import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from '../models/crawlModel'; // Import the schema definitions

// Create a Drizzle ORM database client with schema awareness
export const db = drizzle(sql, { schema });