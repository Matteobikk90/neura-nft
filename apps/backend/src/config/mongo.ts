import { ENV } from "@/config/env";
import { Db, MongoClient } from "mongodb";

const client = new MongoClient(ENV.DATABASE_RENDER_URL);

let db: Db;

export async function connectMongo() {
  if (!db) {
    await client.connect();
    db = client.db(ENV.DATABASE_NAME);
    console.log(`✅ Connected to MongoDB: ${ENV.DATABASE_NAME}`);
  }
  return db;
}

export function getDb() {
  if (!db) throw new Error("❌ MongoDB not connected yet!");
  return db;
}
