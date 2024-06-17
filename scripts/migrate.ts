import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

//this will be run outside of the Next.js environment, and will use Node

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
  } catch (error) {
    console.error("Error during migration", error);
    process.exit(1);
  }
};

main();
