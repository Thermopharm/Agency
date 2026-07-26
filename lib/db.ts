import { PrismaClient } from "@prisma/client";

// Optimize connection parameters for Supabase in serverless environments (Vercel)
if (process.env.DATABASE_URL) {
  let url = process.env.DATABASE_URL;
  
  // Ensure connection limit is capped per serverless lambda to avoid exhausting Supabase pool
  if (!url.includes("connection_limit=")) {
    url += (url.includes("?") ? "&" : "?") + "connection_limit=5&pool_timeout=15";
  }
  
  process.env.DATABASE_URL = url;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

export const prisma = db;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// Helper to execute Prisma queries with automatic retry on transient connection failures
export async function dbRetry<T>(
  queryFn: (client: PrismaClient) => Promise<T>,
  retries = 3,
  delayMs = 400
): Promise<T> {
  let lastErr: any;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await queryFn(db);
    } catch (err: any) {
      lastErr = err;
      const isConnError =
        err?.message?.includes("Can't reach database server") ||
        err?.message?.includes("Timed out") ||
        err?.message?.includes("Connection pool");

      if (isConnError && attempt < retries) {
        console.warn(`[DB Connection Retry ${attempt}/${retries}] Retrying in ${delayMs * attempt}ms...`);
        await new Promise((res) => setTimeout(res, delayMs * attempt));
        continue;
      }
      throw err;
    }
  }
  throw lastErr;
}
