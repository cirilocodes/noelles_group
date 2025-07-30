import pkg from 'pg';
const { Pool } = pkg;
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Use Replit-provided PostgreSQL database
const isReplit = !!process.env.REPL_ID;

// In Replit, use the provided DATABASE_URL
let DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

console.log(`[DB] Environment: ${isReplit ? 'Replit' : 'Local Development'}`);
console.log(`[DB] Connecting to PostgreSQL database`);

// Configure PostgreSQL connection for Replit database
const poolConfig = {
  connectionString: DATABASE_URL,
  ssl: isReplit && DATABASE_URL?.includes('replit') ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
};

const pool = new Pool(poolConfig);
const db = drizzle(pool, { schema });

// Test PostgreSQL connection
pool.connect()
  .then(client => {
    console.log('[DB] PostgreSQL connection successful');
    client.release();
  })
  .catch(err => {
    console.error('[DB] PostgreSQL connection failed:', err.message);
    console.error('[DB] Please ensure PostgreSQL service is running on Windows');
    console.error('[DB] Run: net start postgresql-x64-15 (as Administrator)');
  });

export { db };