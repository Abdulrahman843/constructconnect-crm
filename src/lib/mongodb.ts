import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// ✅ Add this small patch to fix TypeScript complaints
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "constructconnect-crm", // 👈 optional but cleaner
    }).then((mongoose) => {
      console.log("✅ [MongoDB] Connected successfully");
      return mongoose;
    }).catch((error) => {
      console.error("❌ [MongoDB] Connection failed:", error.message);
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
