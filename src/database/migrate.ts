import { db } from "./db";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const migrateScript = async () => {
  await migrate(db, { migrationsFolder: "src/database/migrations" });
};

migrateScript();
