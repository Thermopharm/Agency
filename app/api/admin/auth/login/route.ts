import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/session";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const envEmail = (process.env.ADMIN_EMAIL || "ashish@thermopharm.in").trim().toLowerCase();
    const envPassword = process.env.ADMIN_PASSWORD || "Ashish@1998";

    // Auto-seed or update default admin account if logging in with matching env credentials
    if (cleanEmail === envEmail && password === envPassword) {
      let adminUser = await prisma.user.findUnique({
        where: { email: envEmail },
      });

      if (!adminUser) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(envPassword, salt);
        adminUser = await prisma.user.create({
          data: {
            email: envEmail,
            passwordHash,
          },
        });
      }

      await createSession(adminUser.id, adminUser.email);
      return NextResponse.json({ success: true, message: "Logged in successfully" });
    }

    // Otherwise check against database users
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: cleanEmail,
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    await createSession(user.id, user.email);
    return NextResponse.json({ success: true, message: "Logged in successfully" });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
