import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Cross-platform database configuration - fixed for Windows local development
const DATABASE_URL = process.env.DATABASE_URL || 
  (!process.env.REPL_ID 
    ? "postgresql://postgres:password@localhost:5432/noelles_group"
    : "postgresql://neondb_owner:npg_j2mLwlsU5WgX@ep-flat-recipe-a5i78zq1.us-east-2.aws.neon.tech/neondb?sslmode=require");

console.log(`[DB] Connecting to database: ${DATABASE_URL.replace(/:[^:@]*@/, ':***@')}`);
console.log(`[DB] Environment: ${process.env.REPL_ID ? 'Replit' : 'Local'}`);

export const pool = new Pool({ 
  connectionString: DATABASE_URL,
  ssl: process.env.REPL_ID ? { rejectUnauthorized: false } : false,
  // Add connection timeout and retry for Windows
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 10000,
});

export const db = drizzle(pool, { schema });