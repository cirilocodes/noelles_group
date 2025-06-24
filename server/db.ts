import pkg from 'pg';
const { Pool } = pkg;
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Always use user's PostgreSQL database with provided credentials
const DATABASE_URL = "postgresql://postgres:Chris%40ko74@localhost:5432/noelles_group";
const isReplit = !!process.env.REPL_ID;

console.log(`[DB] Environment: ${isReplit ? 'Replit' : 'Local Development'}`);
console.log(`[DB] Connecting to PostgreSQL database: noelles_group at localhost:5432`);

// Configure PostgreSQL connection for local database
const poolConfig = {
  connectionString: DATABASE_URL,
  ssl: false, // No SSL for local PostgreSQL
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