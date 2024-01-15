import { Pool, PoolConfig } from "pg";
import * as schema from "./schema";
import { sql } from "@vercel/postgres";
import { drizzle as drizzleNode } from "drizzle-orm/node-postgres";
import { drizzle as drizzleVercel } from "drizzle-orm/vercel-postgres";
import { migrate as migrateNode } from "drizzle-orm/node-postgres/migrator";
import { migrate as migrateVercel } from "drizzle-orm/vercel-postgres/migrator";

const DEFAULT_ARGS = {
  host: process.env.POSTGRES_HOST,
  port: 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
};

const MIGRATE_CONFIG = {
  migrationsFolder: "src/database/migrations",
};

// Vercel's Postgres SDK isn't compatible with local postgres
// https://github.com/vercel/storage/issues/123
// https://www.answeroverflow.com/m/1104381976984682516
// Neither do they currently have branching available for remote development
// If you do want to try and set up local dev, it's a complicated Dockerfile with websockets
// https://gal.hagever.com/posts/running-vercel-postgres-locally
const isVercel = process.env.POSTGRES_HOST?.includes("vercel-storage.com");

// For local development, we have the following DB client options:
// A: (1) create Pool for app code and (2) create Client for e.g. migrations, or
// B: (1) create Pool and (2) create Pool with config for migrations
const createPool = (customConfig: PoolConfig = {}) =>
  new Pool({ ...DEFAULT_ARGS, ...customConfig });
export const createDbWithConfig = (c: PoolConfig) => drizzleNode(createPool(c));

export const db = isVercel
  ? drizzleVercel(sql, { schema })
  : drizzleNode(createPool(), { schema });

export const migrate = isVercel
  ? () => migrateVercel(db, MIGRATE_CONFIG)
  : () => migrateNode(createDbWithConfig({ max: 1 }), MIGRATE_CONFIG);
