import { MongoClient } from "mongodb";

//const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("MONGO_URI environment variable not set");
}
const dbName = "tripTracker";
let client;
let db;

export async function getDb() {
  if (db) return db;
  client = new MongoClient(uri, { ignoreUndefined: true });
  await client.connect();
  db = client.db(dbName);
  // Ensure unique index on email
  const users = db.collection(process.env.MONGO_USERS_COLLECTION || "users");
  await users.createIndex({ email: 1 }, { unique: true });
  return db;
}

export async function closeDb() {
  if (client) await client.close();
}
