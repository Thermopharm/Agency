import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const industries = await prisma.industry.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(industries);
  } catch (error) {
    console.error("Error fetching public industries:", error);
    return NextResponse.json({ error: "Failed to fetch industries" }, { status: 500 });
  }
}
