import { migrate } from "./db";

const MIGRATE_CONFIG = {
  migrationsFolder: "src/database/migrations",
};

const migrateScript = async () => {
  await migrate();
};

migrateScript();
