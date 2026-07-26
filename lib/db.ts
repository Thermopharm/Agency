import { PrismaClient } from "@prisma/client";

// Auto-fix connection string for Supabase on serverless/Vercel (Force port 6543 PGBouncer pooler)
if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes("supabase.co:5432")) {
  let fixedUrl = process.env.DATABASE_URL.replace("supabase.co:5432", "supabase.co:6543");
  if (!fixedUrl.includes("pgbouncer=true")) {
    fixedUrl += (fixedUrl.includes("?") ? "&" : "?") + "pgbouncer=true";
  }
  process.env.DATABASE_URL = fixedUrl;
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
