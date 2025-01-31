import { db, crawls, pages } from './index';

async function migrate() {
  await db.schema.createTable(crawls).execute();
  await db.schema.createTable(pages).execute();
  console.log('Database migrated successfully');
}

migrate().catch(console.error);