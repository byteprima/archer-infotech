import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

// Database file path from environment variable
const dbPath = process.env.DATABASE_URL || "./sqlite.db";

// Create db instance
let db: BetterSQLite3Database<typeof schema>;

try {
  const sqlite = new Database(dbPath);
  // Enable WAL mode for better performance
  sqlite.pragma("journal_mode = WAL");
  db = drizzle(sqlite, { schema });
} catch (error) {
  // Create a placeholder that throws on use - this allows the module to be imported
  // but will fail at runtime if the database cannot be opened
  console.warn("Failed to initialize database:", error);
  db = new Proxy({} as BetterSQLite3Database<typeof schema>, {
    get() {
      throw new Error("Database is not initialized");
    },
  });
}

// Export db
export { db };

// Export schema for easy access
export * from "./schema";
