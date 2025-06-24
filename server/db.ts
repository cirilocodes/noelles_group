import Database from 'better-sqlite3';
import { drizzle as drizzleSQLite } from 'drizzle-orm/better-sqlite3';
import { Pool } from 'pg';
import { drizzle as drizzlePostgres } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Detect environment and use appropriate database configuration
const isReplit = !!process.env.REPL_ID;
const DATABASE_URL = process.env.DATABASE_URL || (isReplit 
  ? "postgresql://neondb_owner:npg_j2mLwlsU5WgX@ep-flat-recipe-a5i78zq1.us-east-2.aws.neon.tech/neondb?sslmode=require"
  : "file:./database.sqlite");

console.log(`[DB] Environment: ${isReplit ? 'Replit' : 'Local Development'}`);
console.log(`[DB] Database type: ${DATABASE_URL.startsWith('file:') ? 'SQLite' : 'PostgreSQL'}`);

let db: any;

if (DATABASE_URL.startsWith('file:') || DATABASE_URL.includes('sqlite')) {
  // Use SQLite for local development
  const sqlite = new Database(DATABASE_URL.replace('file:', ''));
  db = drizzleSQLite(sqlite, { schema });
  console.log('[DB] SQLite database initialized successfully');
} else {
  // Use PostgreSQL for Replit/production
  const poolConfig = {
    connectionString: DATABASE_URL,
    ssl: isReplit ? { rejectUnauthorized: false } : false,
    max: isReplit ? 20 : 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  };

  const pool = new Pool(poolConfig);
  db = drizzlePostgres(pool, { schema });
  
  // Test PostgreSQL connection
  pool.connect()
    .then(client => {
      console.log('[DB] PostgreSQL connection successful');
      client.release();
    })
    .catch(err => {
      console.error('[DB] PostgreSQL connection failed:', err.message);
    });
}

export { db };