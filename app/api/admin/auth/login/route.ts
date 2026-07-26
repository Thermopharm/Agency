import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createSession } from "@/lib/session";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const envEmail = (process.env.ADMIN_EMAIL || "Ashish@thermopharm.in").trim().toLowerCase();
    const envPassword = process.env.ADMIN_PASSWORD || "Ashish@1998";

    // 1. Direct Env Credentials Match (Master Admin Bypass)
    if (cleanEmail === envEmail && password === envPassword) {
      let userId = "master-admin-id";

      try {
        let adminUser = await (db as any).user.findFirst({
          where: { email: envEmail },
        });

        if (!adminUser) {
          const salt = await bcrypt.genSalt(10);
          const passwordHash = await bcrypt.hash(envPassword, salt);
          adminUser = await (db as any).user.create({
            data: {
              email: envEmail,
              passwordHash,
            },
          });
        }
        if (adminUser?.id) userId = adminUser.id;
      } catch (dbErr) {
        console.warn("Database user seed warning (bypassing DB check for Master Admin):", dbErr);
      }

      await createSession(userId, envEmail);
      return NextResponse.json({ success: true, message: "Logged in successfully" });
    }

    // 2. Database User Match
    try {
      const user = await (db as any).user.findFirst({
        where: {
          email: {
            equals: cleanEmail,
            mode: "insensitive",
          },
        },
      });

      if (!user) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
      }

      await createSession(user.id, user.email);
      return NextResponse.json({ success: true, message: "Logged in successfully" });
    } catch (dbErr: any) {
      console.error("Database authentication query error:", dbErr);
      return NextResponse.json(
        { error: dbErr.message || "Database connection failure. Please check Vercel DATABASE_URL environment variable." },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
