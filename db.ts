import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";

const { Pool } = pkg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not found in environment variables!");
}

// PostgreSQL pool setup (Render requires SSL)
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Render માટે જરૂરી છે
  },
});

// Initialize Drizzle ORM
export const db = drizzle(pool);

// Simple connection test (optional)
(async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Database connected successfully at:", result.rows[0].now);
  } catch (err:any) {
    console.error("❌ Database connection failed:", err.message);
  }
})();
