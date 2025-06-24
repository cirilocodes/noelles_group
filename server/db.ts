import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Cross-platform database configuration
const DATABASE_URL = process.env.DATABASE_URL || 
  (process.env.REPL_ID 
    ? "postgresql://neondb_owner:npg_j2mLwlsU5WgX@ep-flat-recipe-a5i78zq1.us-east-2.aws.neon.tech/neondb?sslmode=require"
    : "postgresql://postgres:password@localhost:5432/noelles_group");

export const pool = new Pool({ connectionString: DATABASE_URL });
export const db = drizzle({ client: pool, schema });