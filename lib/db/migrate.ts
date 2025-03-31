import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as path from "path";

async function runMigrations() {
  console.log("Running migrations...");

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL is not defined");
    process.exit(1);
  }

  // Use a non-pooled client for migrations
  const sql = postgres(connectionString, { max: 1 });
  const db = drizzle(sql);

  // Update this path to match your actual migrations folder
  const migrationsFolder = path.join(process.cwd(), "lib/db/migrations");
  console.log(`Using migrations folder: ${migrationsFolder}`);

  try {
    await migrate(db, { migrationsFolder });
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }

  await sql.end();
  process.exit(0);
}

runMigrations();
